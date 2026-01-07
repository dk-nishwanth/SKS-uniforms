const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      'Please provide a valid email'
    ]
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters'],
    select: false // Don't include password in queries by default
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
  organizationType: {
    type: String,
    enum: ['school', 'healthcare', 'corporate', 'individual', 'other'],
    default: 'individual'
  },
  address: {
    street: { type: String, trim: true },
    city: { type: String, trim: true },
    state: { type: String, trim: true },
    pincode: { type: String, trim: true },
    country: { type: String, trim: true, default: 'India' }
  },
  role: {
    type: String,
    enum: ['customer', 'admin', 'staff'],
    default: 'customer'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  isEmailVerified: {
    type: Boolean,
    default: false
  },
  emailVerificationToken: String,
  emailVerificationExpire: Date,
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  lastLogin: Date,
  loginCount: {
    type: Number,
    default: 0
  },
  preferences: {
    newsletter: {
      type: Boolean,
      default: true
    },
    smsNotifications: {
      type: Boolean,
      default: false
    },
    categories: [{
      type: String,
      enum: ['schools', 'healthcare', 'corporate', 'accessories']
    }]
  },
  wishlist: [{
    productId: String,
    addedAt: {
      type: Date,
      default: Date.now
    }
  }],
  cart: [{
    productId: String,
    quantity: {
      type: Number,
      default: 1,
      min: 1
    },
    size: String,
    color: String,
    addedAt: {
      type: Date,
      default: Date.now
    }
  }]
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes
userSchema.index({ email: 1 });
userSchema.index({ role: 1 });
userSchema.index({ isActive: 1 });
userSchema.index({ createdAt: -1 });

// Virtual for full address
userSchema.virtual('fullAddress').get(function() {
  const addr = this.address;
  if (!addr.street) return '';
  
  return [addr.street, addr.city, addr.state, addr.pincode, addr.country]
    .filter(Boolean)
    .join(', ');
});

// Pre-save middleware to hash password
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    next();
  }
  
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Instance method to check password
userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Instance method to generate JWT token
userSchema.methods.getSignedJwtToken = function() {
  return jwt.sign(
    { id: this._id, role: this.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRE || '30d' }
  );
};

// Instance method to generate email verification token
userSchema.methods.getEmailVerificationToken = function() {
  const verificationToken = Math.random().toString(36).substring(2, 15) + 
                           Math.random().toString(36).substring(2, 15);
  
  this.emailVerificationToken = verificationToken;
  this.emailVerificationExpire = Date.now() + 24 * 60 * 60 * 1000; // 24 hours
  
  return verificationToken;
};

// Instance method to generate password reset token
userSchema.methods.getResetPasswordToken = function() {
  const resetToken = Math.random().toString(36).substring(2, 15) + 
                    Math.random().toString(36).substring(2, 15);
  
  this.resetPasswordToken = resetToken;
  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000; // 10 minutes
  
  return resetToken;
};

// Instance methods for cart management
userSchema.methods.addToCart = function(productId, quantity = 1, size, color) {
  const existingItem = this.cart.find(item => 
    item.productId === productId && 
    item.size === size && 
    item.color === color
  );
  
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    this.cart.push({ productId, quantity, size, color });
  }
  
  return this.save();
};

userSchema.methods.removeFromCart = function(productId, size, color) {
  this.cart = this.cart.filter(item => 
    !(item.productId === productId && item.size === size && item.color === color)
  );
  return this.save();
};

userSchema.methods.clearCart = function() {
  this.cart = [];
  return this.save();
};

// Instance methods for wishlist management
userSchema.methods.addToWishlist = function(productId) {
  if (!this.wishlist.find(item => item.productId === productId)) {
    this.wishlist.push({ productId });
  }
  return this.save();
};

userSchema.methods.removeFromWishlist = function(productId) {
  this.wishlist = this.wishlist.filter(item => item.productId !== productId);
  return this.save();
};

// Static methods
userSchema.statics.getActiveCustomers = function() {
  return this.find({ role: 'customer', isActive: true });
};

userSchema.statics.getByOrganizationType = function(type) {
  return this.find({ organizationType: type, isActive: true });
};

module.exports = mongoose.model('User', userSchema);