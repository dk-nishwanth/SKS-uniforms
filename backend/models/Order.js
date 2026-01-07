const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  orderId: {
    type: String,
    required: true,
    unique: true
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  items: [{
    product: {
      type: mongoose.Schema.ObjectId,
      ref: 'Product',
      required: true
    },
    productId: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true,
      min: [0, 'Price cannot be negative']
    },
    quantity: {
      type: Number,
      required: true,
      min: [1, 'Quantity must be at least 1']
    },
    size: {
      type: String,
      required: true
    },
    color: {
      type: String,
      required: true
    },
    customization: {
      embroidery: String,
      logoPlacement: String,
      specialInstructions: String
    }
  }],
  customerInfo: {
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      lowercase: true
    },
    phone: {
      type: String,
      required: true,
      trim: true
    },
    organization: {
      type: String,
      trim: true
    }
  },
  shippingAddress: {
    street: {
      type: String,
      required: true,
      trim: true
    },
    city: {
      type: String,
      required: true,
      trim: true
    },
    state: {
      type: String,
      required: true,
      trim: true
    },
    pincode: {
      type: String,
      required: true,
      trim: true
    },
    country: {
      type: String,
      required: true,
      default: 'India'
    },
    landmark: {
      type: String,
      trim: true
    }
  },
  billingAddress: {
    street: {
      type: String,
      required: true,
      trim: true
    },
    city: {
      type: String,
      required: true,
      trim: true
    },
    state: {
      type: String,
      required: true,
      trim: true
    },
    pincode: {
      type: String,
      required: true,
      trim: true
    },
    country: {
      type: String,
      required: true,
      default: 'India'
    }
  },
  pricing: {
    subtotal: {
      type: Number,
      required: true,
      min: [0, 'Subtotal cannot be negative']
    },
    tax: {
      type: Number,
      required: true,
      min: [0, 'Tax cannot be negative']
    },
    shipping: {
      type: Number,
      required: true,
      min: [0, 'Shipping cost cannot be negative']
    },
    discount: {
      type: Number,
      default: 0,
      min: [0, 'Discount cannot be negative']
    },
    total: {
      type: Number,
      required: true,
      min: [0, 'Total cannot be negative']
    }
  },
  payment: {
    method: {
      type: String,
      required: true,
      enum: ['cod', 'online', 'bank_transfer', 'cheque']
    },
    status: {
      type: String,
      required: true,
      enum: ['pending', 'completed', 'failed', 'refunded', 'partial_refund'],
      default: 'pending'
    },
    transactionId: String,
    paidAmount: {
      type: Number,
      default: 0,
      min: [0, 'Paid amount cannot be negative']
    },
    paidAt: Date,
    refundAmount: {
      type: Number,
      default: 0,
      min: [0, 'Refund amount cannot be negative']
    },
    refundedAt: Date
  },
  status: {
    type: String,
    required: true,
    enum: [
      'pending',
      'confirmed',
      'processing',
      'manufacturing',
      'quality_check',
      'shipped',
      'delivered',
      'cancelled',
      'returned'
    ],
    default: 'pending'
  },
  tracking: {
    carrier: String,
    trackingNumber: String,
    estimatedDelivery: Date,
    actualDelivery: Date,
    updates: [{
      status: String,
      message: String,
      location: String,
      timestamp: {
        type: Date,
        default: Date.now
      }
    }]
  },
  timeline: [{
    status: {
      type: String,
      required: true
    },
    message: String,
    timestamp: {
      type: Date,
      default: Date.now
    },
    updatedBy: {
      type: String,
      default: 'system'
    }
  }],
  notes: {
    customer: String,
    internal: String,
    manufacturing: String
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium'
  },
  source: {
    type: String,
    enum: ['website', 'phone', 'email', 'whatsapp', 'referral'],
    default: 'website'
  },
  assignedTo: {
    type: String,
    trim: true
  },
  estimatedCompletionDate: Date,
  actualCompletionDate: Date,
  qualityCheckStatus: {
    type: String,
    enum: ['pending', 'passed', 'failed', 'rework'],
    default: 'pending'
  },
  customerSatisfaction: {
    rating: {
      type: Number,
      min: 1,
      max: 5
    },
    feedback: String,
    reviewDate: Date
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes
orderSchema.index({ orderId: 1 });
orderSchema.index({ user: 1 });
orderSchema.index({ status: 1 });
orderSchema.index({ createdAt: -1 });
orderSchema.index({ 'payment.status': 1 });
orderSchema.index({ 'customerInfo.email': 1 });
orderSchema.index({ 'customerInfo.phone': 1 });

// Virtual for formatted order ID
orderSchema.virtual('formattedOrderId').get(function() {
  return `SKS-${this.orderId}`;
});

// Virtual for total items count
orderSchema.virtual('totalItems').get(function() {
  return this.items.reduce((total, item) => total + item.quantity, 0);
});

// Virtual for order age in days
orderSchema.virtual('orderAge').get(function() {
  return Math.floor((Date.now() - this.createdAt) / (1000 * 60 * 60 * 24));
});

// Virtual for full shipping address
orderSchema.virtual('fullShippingAddress').get(function() {
  const addr = this.shippingAddress;
  return [
    addr.street,
    addr.landmark,
    addr.city,
    addr.state,
    addr.pincode,
    addr.country
  ].filter(Boolean).join(', ');
});

// Virtual for payment balance
orderSchema.virtual('paymentBalance').get(function() {
  return this.pricing.total - this.payment.paidAmount;
});

// Pre-save middleware
orderSchema.pre('save', function(next) {
  // Generate order ID if not exists
  if (!this.orderId) {
    const timestamp = Date.now().toString().slice(-8);
    const random = Math.random().toString(36).substring(2, 6).toUpperCase();
    this.orderId = `${timestamp}${random}`;
  }
  
  // Add timeline entry for status changes
  if (this.isModified('status')) {
    this.timeline.push({
      status: this.status,
      message: `Order status changed to ${this.status}`,
      timestamp: new Date()
    });
  }
  
  // Set estimated completion date based on status
  if (this.status === 'confirmed' && !this.estimatedCompletionDate) {
    this.estimatedCompletionDate = new Date(Date.now() + 10 * 24 * 60 * 60 * 1000); // 10 days
  }
  
  // Set actual completion date when delivered
  if (this.status === 'delivered' && !this.actualCompletionDate) {
    this.actualCompletionDate = new Date();
  }
  
  next();
});

// Static methods
orderSchema.statics.generateOrderId = function() {
  const timestamp = Date.now().toString().slice(-8);
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `${timestamp}${random}`;
};

orderSchema.statics.getByStatus = function(status) {
  return this.find({ status }).sort({ createdAt: -1 });
};

orderSchema.statics.getByUser = function(userId) {
  return this.find({ user: userId }).sort({ createdAt: -1 });
};

orderSchema.statics.getByDateRange = function(startDate, endDate) {
  return this.find({
    createdAt: {
      $gte: startDate,
      $lte: endDate
    }
  }).sort({ createdAt: -1 });
};

orderSchema.statics.getPendingOrders = function() {
  return this.find({
    status: { $in: ['pending', 'confirmed', 'processing', 'manufacturing'] }
  }).sort({ createdAt: 1 });
};

orderSchema.statics.getOverdueOrders = function() {
  return this.find({
    estimatedCompletionDate: { $lt: new Date() },
    status: { $nin: ['delivered', 'cancelled', 'returned'] }
  }).sort({ estimatedCompletionDate: 1 });
};

// Instance methods
orderSchema.methods.updateStatus = function(newStatus, message, updatedBy = 'system') {
  this.status = newStatus;
  this.timeline.push({
    status: newStatus,
    message: message || `Order status updated to ${newStatus}`,
    timestamp: new Date(),
    updatedBy
  });
  return this.save();
};

orderSchema.methods.addTrackingUpdate = function(status, message, location) {
  this.tracking.updates.push({
    status,
    message,
    location,
    timestamp: new Date()
  });
  return this.save();
};

orderSchema.methods.processPayment = function(amount, transactionId, method) {
  this.payment.paidAmount += amount;
  this.payment.transactionId = transactionId;
  this.payment.method = method;
  this.payment.paidAt = new Date();
  
  if (this.payment.paidAmount >= this.pricing.total) {
    this.payment.status = 'completed';
  }
  
  return this.save();
};

orderSchema.methods.processRefund = function(amount) {
  this.payment.refundAmount += amount;
  this.payment.refundedAt = new Date();
  
  if (this.payment.refundAmount >= this.payment.paidAmount) {
    this.payment.status = 'refunded';
  } else {
    this.payment.status = 'partial_refund';
  }
  
  return this.save();
};

orderSchema.methods.canBeCancelled = function() {
  return ['pending', 'confirmed'].includes(this.status);
};

orderSchema.methods.canBeReturned = function() {
  return this.status === 'delivered' && 
         this.actualCompletionDate && 
         (Date.now() - this.actualCompletionDate) <= (30 * 24 * 60 * 60 * 1000); // 30 days
};

module.exports = mongoose.model('Order', orderSchema);