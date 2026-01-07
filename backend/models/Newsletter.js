const mongoose = require('mongoose');

const newsletterSchema = new mongoose.Schema({
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
  name: {
    type: String,
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  categories: [{
    type: String,
    enum: ['schools', 'healthcare', 'corporate', 'accessories', 'general'],
    lowercase: true
  }],
  preferences: {
    frequency: {
      type: String,
      enum: ['daily', 'weekly', 'monthly'],
      default: 'weekly'
    },
    productUpdates: {
      type: Boolean,
      default: true
    },
    promotions: {
      type: Boolean,
      default: true
    },
    industryNews: {
      type: Boolean,
      default: false
    }
  },
  status: {
    type: String,
    enum: ['active', 'unsubscribed', 'bounced', 'complained'],
    default: 'active'
  },
  source: {
    type: String,
    enum: ['website', 'social', 'referral', 'event', 'manual'],
    default: 'website'
  },
  subscriptionDate: {
    type: Date,
    default: Date.now
  },
  unsubscriptionDate: Date,
  lastEmailSent: Date,
  emailsSent: {
    type: Number,
    default: 0
  },
  emailsOpened: {
    type: Number,
    default: 0
  },
  emailsClicked: {
    type: Number,
    default: 0
  },
  bounceCount: {
    type: Number,
    default: 0
  },
  complaintCount: {
    type: Number,
    default: 0
  },
  tags: [{
    type: String,
    trim: true,
    lowercase: true
  }],
  customFields: {
    organization: String,
    organizationType: {
      type: String,
      enum: ['school', 'healthcare', 'corporate', 'individual', 'other']
    },
    location: {
      city: String,
      state: String,
      country: {
        type: String,
        default: 'India'
      }
    },
    interests: [String]
  },
  engagement: {
    score: {
      type: Number,
      default: 0,
      min: 0,
      max: 100
    },
    lastActivity: Date,
    totalInteractions: {
      type: Number,
      default: 0
    }
  },
  ipAddress: String,
  userAgent: String,
  referrer: String
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes
newsletterSchema.index({ email: 1 });
newsletterSchema.index({ status: 1 });
newsletterSchema.index({ categories: 1 });
newsletterSchema.index({ subscriptionDate: -1 });
newsletterSchema.index({ 'engagement.score': -1 });
newsletterSchema.index({ tags: 1 });

// Virtual for subscription duration
newsletterSchema.virtual('subscriptionDuration').get(function() {
  const endDate = this.unsubscriptionDate || new Date();
  return Math.floor((endDate - this.subscriptionDate) / (1000 * 60 * 60 * 24));
});

// Virtual for open rate
newsletterSchema.virtual('openRate').get(function() {
  if (this.emailsSent === 0) return 0;
  return Math.round((this.emailsOpened / this.emailsSent) * 100);
});

// Virtual for click rate
newsletterSchema.virtual('clickRate').get(function() {
  if (this.emailsSent === 0) return 0;
  return Math.round((this.emailsClicked / this.emailsSent) * 100);
});

// Virtual for engagement level
newsletterSchema.virtual('engagementLevel').get(function() {
  const score = this.engagement.score;
  if (score >= 80) return 'high';
  if (score >= 50) return 'medium';
  if (score >= 20) return 'low';
  return 'inactive';
});

// Pre-save middleware
newsletterSchema.pre('save', function(next) {
  // Calculate engagement score
  if (this.emailsSent > 0) {
    const openRate = (this.emailsOpened / this.emailsSent) * 100;
    const clickRate = (this.emailsClicked / this.emailsSent) * 100;
    const recencyScore = this.lastEmailSent ? 
      Math.max(0, 100 - Math.floor((Date.now() - this.lastEmailSent) / (1000 * 60 * 60 * 24))) : 0;
    
    this.engagement.score = Math.min(100, Math.round(
      (openRate * 0.4) + (clickRate * 0.4) + (recencyScore * 0.2)
    ));
  }
  
  // Set unsubscription date if status changed to unsubscribed
  if (this.isModified('status') && this.status === 'unsubscribed' && !this.unsubscriptionDate) {
    this.unsubscriptionDate = new Date();
  }
  
  next();
});

// Static methods
newsletterSchema.statics.getActiveSubscribers = function() {
  return this.find({ status: 'active' });
};

newsletterSchema.statics.getByCategory = function(category) {
  return this.find({ 
    categories: category, 
    status: 'active' 
  });
};

newsletterSchema.statics.getHighEngagement = function() {
  return this.find({ 
    'engagement.score': { $gte: 70 },
    status: 'active'
  }).sort({ 'engagement.score': -1 });
};

newsletterSchema.statics.getInactive = function(days = 90) {
  const cutoffDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000);
  return this.find({
    status: 'active',
    $or: [
      { lastEmailSent: { $lt: cutoffDate } },
      { lastEmailSent: { $exists: false } }
    ]
  });
};

newsletterSchema.statics.getSubscriptionStats = function() {
  return this.aggregate([
    {
      $group: {
        _id: '$status',
        count: { $sum: 1 }
      }
    }
  ]);
};

newsletterSchema.statics.getCategoryStats = function() {
  return this.aggregate([
    { $unwind: '$categories' },
    {
      $group: {
        _id: '$categories',
        count: { $sum: 1 }
      }
    },
    { $sort: { count: -1 } }
  ]);
};

// Instance methods
newsletterSchema.methods.unsubscribe = function(reason) {
  this.status = 'unsubscribed';
  this.unsubscriptionDate = new Date();
  if (reason) {
    this.tags.push(`unsubscribe-reason-${reason}`);
  }
  return this.save();
};

newsletterSchema.methods.resubscribe = function() {
  this.status = 'active';
  this.unsubscriptionDate = undefined;
  return this.save();
};

newsletterSchema.methods.recordEmailSent = function() {
  this.emailsSent += 1;
  this.lastEmailSent = new Date();
  return this.save();
};

newsletterSchema.methods.recordEmailOpened = function() {
  this.emailsOpened += 1;
  this.engagement.lastActivity = new Date();
  this.engagement.totalInteractions += 1;
  return this.save();
};

newsletterSchema.methods.recordEmailClicked = function() {
  this.emailsClicked += 1;
  this.engagement.lastActivity = new Date();
  this.engagement.totalInteractions += 2; // Clicks are worth more than opens
  return this.save();
};

newsletterSchema.methods.recordBounce = function() {
  this.bounceCount += 1;
  if (this.bounceCount >= 3) {
    this.status = 'bounced';
  }
  return this.save();
};

newsletterSchema.methods.recordComplaint = function() {
  this.complaintCount += 1;
  this.status = 'complained';
  return this.save();
};

newsletterSchema.methods.addTag = function(tag) {
  if (!this.tags.includes(tag.toLowerCase())) {
    this.tags.push(tag.toLowerCase());
  }
  return this.save();
};

newsletterSchema.methods.removeTag = function(tag) {
  this.tags = this.tags.filter(t => t !== tag.toLowerCase());
  return this.save();
};

newsletterSchema.methods.updatePreferences = function(preferences) {
  Object.assign(this.preferences, preferences);
  return this.save();
};

module.exports = mongoose.model('Newsletter', newsletterSchema);