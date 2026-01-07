const express = require('express');
const { body, query, param, validationResult } = require('express-validator');
const rateLimit = require('express-rate-limit');
const Newsletter = require('../models/Newsletter');
const emailService = require('../services/emailService');

const router = express.Router();

// Rate limiting for newsletter subscription
const newsletterLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 newsletter actions per windowMs
  message: {
    success: false,
    message: 'Too many newsletter requests. Please try again in 15 minutes.'
  }
});

// Validation rules for newsletter subscription
const subscribeValidation = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address'),
  
  body('name')
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters'),
  
  body('categories')
    .optional()
    .isArray()
    .withMessage('Categories must be an array'),
  
  body('categories.*')
    .optional()
    .isIn(['schools', 'healthcare', 'corporate', 'accessories', 'general'])
    .withMessage('Invalid category selected')
];

// POST /api/newsletter/subscribe - Subscribe to newsletter
router.post('/subscribe', newsletterLimiter, subscribeValidation, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const {
      email,
      name,
      categories = ['general'],
      preferences = {},
      customFields = {}
    } = req.body;

    // Check if already subscribed
    let subscriber = await Newsletter.findOne({ email });

    if (subscriber) {
      if (subscriber.status === 'active') {
        return res.status(400).json({
          success: false,
          message: 'You are already subscribed to our newsletter!'
        });
      } else {
        // Reactivate subscription
        subscriber.status = 'active';
        subscriber.categories = categories;
        subscriber.preferences = { ...subscriber.preferences, ...preferences };
        subscriber.customFields = { ...subscriber.customFields, ...customFields };
        subscriber.subscriptionDate = new Date();
        subscriber.unsubscriptionDate = undefined;
        await subscriber.save();
      }
    } else {
      // Create new subscription
      subscriber = await Newsletter.create({
        email,
        name,
        categories,
        preferences: {
          frequency: 'weekly',
          productUpdates: true,
          promotions: true,
          industryNews: false,
          ...preferences
        },
        customFields,
        ipAddress: req.ip,
        userAgent: req.get('User-Agent'),
        referrer: req.get('Referer')
      });
    }

    // Send confirmation email
    await emailService.sendNewsletterConfirmation(email, categories);

    res.status(200).json({
      success: true,
      message: 'Successfully subscribed to newsletter! Check your email for confirmation.',
      data: {
        email: subscriber.email,
        categories: subscriber.categories,
        subscriptionDate: subscriber.subscriptionDate
      }
    });

  } catch (error) {
    console.error('❌ Newsletter subscription error:', error);
    res.status(500).json({
      success: false,
      message: 'Error subscribing to newsletter. Please try again.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// POST /api/newsletter/unsubscribe - Unsubscribe from newsletter
router.post('/unsubscribe', newsletterLimiter, [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address'),
  
  body('reason')
    .optional()
    .trim()
    .isLength({ max: 200 })
    .withMessage('Reason cannot exceed 200 characters')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { email, reason } = req.body;

    const subscriber = await Newsletter.findOne({ email });

    if (!subscriber) {
      return res.status(404).json({
        success: false,
        message: 'Email address not found in our newsletter list'
      });
    }

    if (subscriber.status === 'unsubscribed') {
      return res.status(400).json({
        success: false,
        message: 'You are already unsubscribed from our newsletter'
      });
    }

    // Unsubscribe
    await subscriber.unsubscribe(reason);

    res.status(200).json({
      success: true,
      message: 'Successfully unsubscribed from newsletter. We\'re sorry to see you go!',
      data: {
        email: subscriber.email,
        unsubscriptionDate: subscriber.unsubscriptionDate
      }
    });

  } catch (error) {
    console.error('❌ Newsletter unsubscription error:', error);
    res.status(500).json({
      success: false,
      message: 'Error unsubscribing from newsletter. Please try again.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// PUT /api/newsletter/preferences - Update newsletter preferences
router.put('/preferences', newsletterLimiter, [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address'),
  
  body('categories')
    .optional()
    .isArray()
    .withMessage('Categories must be an array'),
  
  body('categories.*')
    .optional()
    .isIn(['schools', 'healthcare', 'corporate', 'accessories', 'general'])
    .withMessage('Invalid category selected'),
  
  body('preferences.frequency')
    .optional()
    .isIn(['daily', 'weekly', 'monthly'])
    .withMessage('Invalid frequency option'),
  
  body('preferences.productUpdates')
    .optional()
    .isBoolean()
    .withMessage('Product updates preference must be boolean'),
  
  body('preferences.promotions')
    .optional()
    .isBoolean()
    .withMessage('Promotions preference must be boolean'),
  
  body('preferences.industryNews')
    .optional()
    .isBoolean()
    .withMessage('Industry news preference must be boolean')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { email, categories, preferences, customFields } = req.body;

    const subscriber = await Newsletter.findOne({ email });

    if (!subscriber) {
      return res.status(404).json({
        success: false,
        message: 'Email address not found in our newsletter list'
      });
    }

    if (subscriber.status !== 'active') {
      return res.status(400).json({
        success: false,
        message: 'Cannot update preferences for inactive subscription'
      });
    }

    // Update preferences
    if (categories) subscriber.categories = categories;
    if (preferences) await subscriber.updatePreferences(preferences);
    if (customFields) {
      subscriber.customFields = { ...subscriber.customFields, ...customFields };
    }

    await subscriber.save();

    res.status(200).json({
      success: true,
      message: 'Newsletter preferences updated successfully!',
      data: {
        email: subscriber.email,
        categories: subscriber.categories,
        preferences: subscriber.preferences,
        updatedAt: subscriber.updatedAt
      }
    });

  } catch (error) {
    console.error('❌ Update newsletter preferences error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating newsletter preferences. Please try again.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// GET /api/newsletter/status/:email - Check subscription status
router.get('/status/:email', [
  param('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { email } = req.params;

    const subscriber = await Newsletter.findOne({ email });

    if (!subscriber) {
      return res.status(404).json({
        success: false,
        message: 'Email address not found in our newsletter list'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Subscription status retrieved successfully',
      data: {
        email: subscriber.email,
        status: subscriber.status,
        categories: subscriber.categories,
        preferences: subscriber.preferences,
        subscriptionDate: subscriber.subscriptionDate,
        unsubscriptionDate: subscriber.unsubscriptionDate,
        engagementLevel: subscriber.engagementLevel,
        stats: {
          emailsSent: subscriber.emailsSent,
          emailsOpened: subscriber.emailsOpened,
          emailsClicked: subscriber.emailsClicked,
          openRate: subscriber.openRate,
          clickRate: subscriber.clickRate
        }
      }
    });

  } catch (error) {
    console.error('❌ Get newsletter status error:', error);
    res.status(500).json({
      success: false,
      message: 'Error retrieving subscription status',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// GET /api/newsletter/subscribers - Get subscribers list (admin only)
router.get('/subscribers', [
  query('status')
    .optional()
    .isIn(['active', 'unsubscribed', 'bounced', 'complained'])
    .withMessage('Invalid status'),
  
  query('category')
    .optional()
    .isIn(['schools', 'healthcare', 'corporate', 'accessories', 'general'])
    .withMessage('Invalid category'),
  
  query('engagement')
    .optional()
    .isIn(['high', 'medium', 'low', 'inactive'])
    .withMessage('Invalid engagement level'),
  
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer'),
  
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limit must be between 1 and 100')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const {
      status,
      category,
      engagement,
      search,
      page = 1,
      limit = 50
    } = req.query;

    const skip = (page - 1) * limit;
    let query = {};

    // Build query filters
    if (status) query.status = status;
    if (category) query.categories = category;
    if (search) {
      query.$or = [
        { email: { $regex: search, $options: 'i' } },
        { name: { $regex: search, $options: 'i' } }
      ];
    }

    // Engagement filter
    if (engagement) {
      switch (engagement) {
        case 'high':
          query['engagement.score'] = { $gte: 80 };
          break;
        case 'medium':
          query['engagement.score'] = { $gte: 50, $lt: 80 };
          break;
        case 'low':
          query['engagement.score'] = { $gte: 20, $lt: 50 };
          break;
        case 'inactive':
          query['engagement.score'] = { $lt: 20 };
          break;
      }
    }

    const subscribers = await Newsletter.find(query)
      .sort({ subscriptionDate: -1 })
      .skip(skip)
      .limit(parseInt(limit))
      .select('-ipAddress -userAgent -referrer');

    const totalSubscribers = await Newsletter.countDocuments(query);
    const totalPages = Math.ceil(totalSubscribers / limit);

    // Get summary statistics
    const stats = await Newsletter.getSubscriptionStats();
    const categoryStats = await Newsletter.getCategoryStats();

    res.status(200).json({
      success: true,
      message: 'Subscribers retrieved successfully',
      data: {
        subscribers,
        pagination: {
          currentPage: parseInt(page),
          totalPages,
          totalSubscribers,
          hasNextPage: page < totalPages,
          hasPrevPage: page > 1
        },
        stats: {
          byStatus: stats,
          byCategory: categoryStats
        },
        filters: {
          status,
          category,
          engagement,
          search
        }
      }
    });

  } catch (error) {
    console.error('❌ Get subscribers error:', error);
    res.status(500).json({
      success: false,
      message: 'Error retrieving subscribers',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// GET /api/newsletter/stats - Get newsletter statistics
router.get('/stats', async (req, res) => {
  try {
    const totalSubscribers = await Newsletter.countDocuments();
    const activeSubscribers = await Newsletter.countDocuments({ status: 'active' });
    const unsubscribed = await Newsletter.countDocuments({ status: 'unsubscribed' });
    const bounced = await Newsletter.countDocuments({ status: 'bounced' });

    const highEngagement = await Newsletter.countDocuments({
      'engagement.score': { $gte: 70 },
      status: 'active'
    });

    const recentSubscriptions = await Newsletter.countDocuments({
      subscriptionDate: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
      status: 'active'
    });

    const categoryStats = await Newsletter.getCategoryStats();
    const subscriptionStats = await Newsletter.getSubscriptionStats();

    // Calculate growth rate (last 30 days vs previous 30 days)
    const last30Days = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const previous30Days = new Date(Date.now() - 60 * 24 * 60 * 60 * 1000);

    const currentPeriod = await Newsletter.countDocuments({
      subscriptionDate: { $gte: last30Days },
      status: 'active'
    });

    const previousPeriod = await Newsletter.countDocuments({
      subscriptionDate: { $gte: previous30Days, $lt: last30Days },
      status: 'active'
    });

    const growthRate = previousPeriod > 0 ? 
      Math.round(((currentPeriod - previousPeriod) / previousPeriod) * 100) : 0;

    res.status(200).json({
      success: true,
      message: 'Newsletter statistics retrieved successfully',
      data: {
        overview: {
          totalSubscribers,
          activeSubscribers,
          unsubscribed,
          bounced,
          highEngagement,
          recentSubscriptions,
          growthRate
        },
        breakdown: {
          byStatus: subscriptionStats,
          byCategory: categoryStats
        },
        engagement: {
          highEngagement,
          engagementRate: totalSubscribers > 0 ? 
            Math.round((highEngagement / totalSubscribers) * 100) : 0
        }
      }
    });

  } catch (error) {
    console.error('❌ Get newsletter stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Error retrieving newsletter statistics',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

module.exports = router;