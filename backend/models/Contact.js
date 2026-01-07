const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    lowercase: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      'Please provide a valid email'
    ]
  },
  phone: {
    type: String,
    trim: true,
    match: [/^[\+]?[1-9][\d]{0,15}$/, 'Please provide a valid phone number']
  },
  organization: {
    type: String,
    trim: true,
    maxlength: [200, 'Organization name cannot exceed 200 characters']
  },
  category: {
    type: String,
    enum: ['schools', 'healthcare', 'corporate', 'accessories', 'multiple'],
    lowercase: true
  },
  message: {
    type: String,
    required: [true, 'Message is required'],
    trim: true,
    maxlength: [2000, 'Message cannot exceed 2000 characters']
  },
  inquiryType: {
    type: String,
    required: true,
    enum: ['general', 'quote', 'samples', 'consultation', 'enquiry'],
    default: 'general'
  },
  consultationType: {
    type: String,
    trim: true
  },
  productIds: [{
    type: String,
    trim: true
  }],
  enquiryItems: [{
    id: String,
    name: String,
    category: String,
    selectedSize: String,
    quantity: Number,
    notes: String,
    image: String
  }],
  shippingAddress: {
    type: String,
    trim: true,
    maxlength: [500, 'Address cannot exceed 500 characters']
  },
  status: {
    type: String,
    enum: ['pending', 'in-progress', 'completed', 'cancelled'],
    default: 'pending'
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium'
  },
  assignedTo: {
    type: String,
    trim: true
  },
  notes: {
    type: String,
    trim: true,
    maxlength: [1000, 'Notes cannot exceed 1000 characters']
  },
  followUpDate: {
    type: Date
  },
  ipAddress: {
    type: String,
    trim: true
  },
  userAgent: {
    type: String,
    trim: true
  },
  source: {
    type: String,
    default: 'website',
    enum: ['website', 'phone', 'email', 'social', 'referral', 'other']
  },
  isRead: {
    type: Boolean,
    default: false
  },
  emailSent: {
    type: Boolean,
    default: false
  },
  smsSent: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for better query performance
contactSchema.index({ email: 1 });
contactSchema.index({ createdAt: -1 });
contactSchema.index({ status: 1 });
contactSchema.index({ inquiryType: 1 });
contactSchema.index({ isRead: 1 });

// Virtual for formatted creation date
contactSchema.virtual('formattedDate').get(function() {
  return this.createdAt.toLocaleString('en-IN', { 
    timeZone: 'Asia/Kolkata',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
});

// Pre-save middleware
contactSchema.pre('save', function(next) {
  // Auto-set priority based on inquiry type
  if (this.inquiryType === 'quote' || this.inquiryType === 'enquiry') {
    this.priority = 'high';
  } else if (this.inquiryType === 'samples') {
    this.priority = 'medium';
  } else if (this.inquiryType === 'consultation') {
    this.priority = 'high';
  }
  
  // Set follow-up date (24 hours from creation for high priority, 48 hours for others)
  if (!this.followUpDate) {
    const hours = this.priority === 'high' || this.priority === 'urgent' ? 24 : 48;
    this.followUpDate = new Date(Date.now() + hours * 60 * 60 * 1000);
  }
  
  next();
});

// Static methods
contactSchema.statics.getUnreadCount = function() {
  return this.countDocuments({ isRead: false });
};

contactSchema.statics.getPendingCount = function() {
  return this.countDocuments({ status: 'pending' });
};

contactSchema.statics.getByInquiryType = function(type) {
  return this.find({ inquiryType: type }).sort({ createdAt: -1 });
};

// Instance methods
contactSchema.methods.markAsRead = function() {
  this.isRead = true;
  return this.save();
};

contactSchema.methods.updateStatus = function(status, notes) {
  this.status = status;
  if (notes) this.notes = notes;
  return this.save();
};

module.exports = mongoose.model('Contact', contactSchema);