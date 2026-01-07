const express = require('express');
const { body, param, query, validationResult } = require('express-validator');
const rateLimit = require('express-rate-limit');
const Order = require('../models/Order');
const User = require('../models/User');
const Product = require('../models/Product');
const emailService = require('../services/emailService');
const smsService = require('../services/smsService');

const router = express.Router();

// Rate limiting for order creation
const orderLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 3, // limit each IP to 3 order submissions per windowMs
  message: {
    success: false,
    message: 'Too many order submissions. Please try again in 15 minutes.'
  }
});

// Validation rules for order creation
const createOrderValidation = [
  body('items')
    .isArray({ min: 1 })
    .withMessage('At least one item is required'),
  
  body('items.*.productId')
    .trim()
    .notEmpty()
    .withMessage('Product ID is required for each item'),
  
  body('items.*.quantity')
    .isInt({ min: 1 })
    .withMessage('Quantity must be at least 1'),
  
  body('items.*.size')
    .trim()
    .notEmpty()
    .withMessage('Size is required for each item'),
  
  body('items.*.color')
    .trim()
    .notEmpty()
    .withMessage('Color is required for each item'),
  
  body('customerInfo.name')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Customer name is required'),
  
  body('customerInfo.email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Valid email is required'),
  
  body('customerInfo.phone')
    .matches(/^[\+]?[1-9][\d]{0,15}$/)
    .withMessage('Valid phone number is required'),
  
  body('shippingAddress.street')
    .trim()
    .notEmpty()
    .withMessage('Street address is required'),
  
  body('shippingAddress.city')
    .trim()
    .notEmpty()
    .withMessage('City is required'),
  
  body('shippingAddress.state')
    .trim()
    .notEmpty()
    .withMessage('State is required'),
  
  body('shippingAddress.pincode')
    .matches(/^[1-9][0-9]{5}$/)
    .withMessage('Valid pincode is required'),
  
  body('payment.method')
    .isIn(['cod', 'online', 'bank_transfer', 'cheque'])
    .withMessage('Invalid payment method')
];

// POST /api/orders - Create new order
router.post('/', orderLimiter, createOrderValidation, async (req, res) => {
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
      items,
      customerInfo,
      shippingAddress,
      billingAddress,
      payment,
      notes
    } = req.body;

    // Validate products and calculate pricing
    let subtotal = 0;
    const validatedItems = [];

    for (const item of items) {
      const product = await Product.findOne({ 
        $or: [{ id: item.productId }, { _id: item.productId }],
        isActive: true 
      });

      if (!product) {
        return res.status(400).json({
          success: false,
          message: `Product not found: ${item.productId}`
        });
      }

      // Check stock availability
      const sizeObj = product.sizes.find(s => s.name === item.size);
      const colorObj = product.colors.find(c => c.name === item.color);

      if (!sizeObj || sizeObj.stock < item.quantity) {
        return res.status(400).json({
          success: false,
          message: `Insufficient stock for ${product.name} in size ${item.size}`
        });
      }

      if (!colorObj || colorObj.stock < item.quantity) {
        return res.status(400).json({
          success: false,
          message: `Insufficient stock for ${product.name} in color ${item.color}`
        });
      }

      const itemPrice = product.effectivePrice;
      const itemTotal = itemPrice * item.quantity;
      subtotal += itemTotal;

      validatedItems.push({
        product: product._id,
        productId: product.id,
        name: product.name,
        image: product.primaryImage?.url || product.images[0]?.url,
        price: itemPrice,
        quantity: item.quantity,
        size: item.size,
        color: item.color,
        customization: item.customization || {}
      });
    }

    // Calculate tax and shipping
    const tax = Math.round(subtotal * 0.18); // 18% GST
    const shipping = subtotal >= 2000 ? 0 : 100; // Free shipping above ₹2000
    const total = subtotal + tax + shipping;

    // Find or create user
    let user = await User.findOne({ email: customerInfo.email });
    if (!user) {
      // Create guest user
      const tempPassword = Math.random().toString(36).substring(2, 15);
      user = await User.create({
        name: customerInfo.name,
        email: customerInfo.email,
        password: tempPassword,
        phone: customerInfo.phone,
        organization: customerInfo.organization,
        role: 'customer'
      });
    }

    // Create order
    const order = await Order.create({
      user: user._id,
      items: validatedItems,
      customerInfo,
      shippingAddress,
      billingAddress: billingAddress || shippingAddress,
      pricing: {
        subtotal,
        tax,
        shipping,
        total
      },
      payment: {
        method: payment.method,
        status: payment.method === 'cod' ? 'pending' : 'pending'
      },
      notes: {
        customer: notes?.customer,
        internal: `Order created via website. Payment method: ${payment.method}`
      }
    });

    // Update product stock
    for (const item of validatedItems) {
      const product = await Product.findById(item.product);
      await product.updateStock(item.size, item.color, item.quantity);
      await product.incrementSales(item.quantity);
    }

    // Send order confirmation email
    // await emailService.sendOrderConfirmationEmail(customerInfo.email, order);

    // Send SMS notification to business
    // await smsService.sendOrderNotification(order);

    res.status(201).json({
      success: true,
      message: 'Order placed successfully!',
      data: {
        order: {
          orderId: order.formattedOrderId,
          _id: order._id,
          status: order.status,
          total: order.pricing.total,
          paymentMethod: order.payment.method,
          estimatedDelivery: order.estimatedCompletionDate,
          items: order.items.length,
          createdAt: order.createdAt
        }
      }
    });

  } catch (error) {
    console.error('❌ Create order error:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating order. Please try again.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// GET /api/orders/:id - Get order by ID
router.get('/:id', [
  param('id')
    .trim()
    .notEmpty()
    .withMessage('Order ID is required')
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

    const { id } = req.params;

    const order = await Order.findOne({
      $or: [{ orderId: id }, { _id: id }]
    }).populate('user', 'name email phone');

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Order retrieved successfully',
      data: {
        order
      }
    });

  } catch (error) {
    console.error('❌ Get order error:', error);
    res.status(500).json({
      success: false,
      message: 'Error retrieving order',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// GET /api/orders - Get orders with filtering
router.get('/', [
  query('status')
    .optional()
    .isIn(['pending', 'confirmed', 'processing', 'manufacturing', 'quality_check', 'shipped', 'delivered', 'cancelled', 'returned'])
    .withMessage('Invalid status'),
  
  query('email')
    .optional()
    .isEmail()
    .normalizeEmail()
    .withMessage('Invalid email format'),
  
  query('phone')
    .optional()
    .matches(/^[\+]?[1-9][\d]{0,15}$/)
    .withMessage('Invalid phone format'),
  
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer'),
  
  query('limit')
    .optional()
    .isInt({ min: 1, max: 50 })
    .withMessage('Limit must be between 1 and 50')
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
      email,
      phone,
      startDate,
      endDate,
      page = 1,
      limit = 20
    } = req.query;

    const skip = (page - 1) * limit;
    let query = {};

    // Build query filters
    if (status) query.status = status;
    if (email) query['customerInfo.email'] = email;
    if (phone) query['customerInfo.phone'] = phone;

    if (startDate || endDate) {
      query.createdAt = {};
      if (startDate) query.createdAt.$gte = new Date(startDate);
      if (endDate) query.createdAt.$lte = new Date(endDate);
    }

    const orders = await Order.find(query)
      .populate('user', 'name email phone')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const totalOrders = await Order.countDocuments(query);
    const totalPages = Math.ceil(totalOrders / limit);

    res.status(200).json({
      success: true,
      message: 'Orders retrieved successfully',
      data: {
        orders,
        pagination: {
          currentPage: parseInt(page),
          totalPages,
          totalOrders,
          hasNextPage: page < totalPages,
          hasPrevPage: page > 1
        },
        filters: {
          status,
          email,
          phone,
          startDate,
          endDate
        }
      }
    });

  } catch (error) {
    console.error('❌ Get orders error:', error);
    res.status(500).json({
      success: false,
      message: 'Error retrieving orders',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// PUT /api/orders/:id/status - Update order status
router.put('/:id/status', [
  param('id')
    .trim()
    .notEmpty()
    .withMessage('Order ID is required'),
  
  body('status')
    .isIn(['pending', 'confirmed', 'processing', 'manufacturing', 'quality_check', 'shipped', 'delivered', 'cancelled', 'returned'])
    .withMessage('Invalid status'),
  
  body('message')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Message cannot exceed 500 characters')
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

    const { id } = req.params;
    const { status, message } = req.body;

    const order = await Order.findOne({
      $or: [{ orderId: id }, { _id: id }]
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    // Update order status
    await order.updateStatus(status, message, 'admin');

    // Send status update notification
    // await emailService.sendOrderStatusUpdateEmail(order);
    // await smsService.sendOrderStatusUpdateSMS(order);

    res.status(200).json({
      success: true,
      message: 'Order status updated successfully',
      data: {
        order: {
          orderId: order.formattedOrderId,
          status: order.status,
          updatedAt: order.updatedAt
        }
      }
    });

  } catch (error) {
    console.error('❌ Update order status error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating order status',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// POST /api/orders/:id/tracking - Add tracking information
router.post('/:id/tracking', [
  param('id')
    .trim()
    .notEmpty()
    .withMessage('Order ID is required'),
  
  body('carrier')
    .trim()
    .notEmpty()
    .withMessage('Carrier is required'),
  
  body('trackingNumber')
    .trim()
    .notEmpty()
    .withMessage('Tracking number is required'),
  
  body('estimatedDelivery')
    .optional()
    .isISO8601()
    .withMessage('Invalid estimated delivery date')
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

    const { id } = req.params;
    const { carrier, trackingNumber, estimatedDelivery } = req.body;

    const order = await Order.findOne({
      $or: [{ orderId: id }, { _id: id }]
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    // Update tracking information
    order.tracking.carrier = carrier;
    order.tracking.trackingNumber = trackingNumber;
    if (estimatedDelivery) {
      order.tracking.estimatedDelivery = new Date(estimatedDelivery);
    }

    // Update status to shipped if not already
    if (order.status !== 'shipped' && order.status !== 'delivered') {
      await order.updateStatus('shipped', `Order shipped via ${carrier}. Tracking: ${trackingNumber}`);
    }

    await order.save();

    // Send tracking notification
    // await emailService.sendTrackingNotificationEmail(order);

    res.status(200).json({
      success: true,
      message: 'Tracking information added successfully',
      data: {
        order: {
          orderId: order.formattedOrderId,
          tracking: order.tracking,
          status: order.status
        }
      }
    });

  } catch (error) {
    console.error('❌ Add tracking error:', error);
    res.status(500).json({
      success: false,
      message: 'Error adding tracking information',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// GET /api/orders/stats/summary - Get order statistics
router.get('/stats/summary', async (req, res) => {
  try {
    const stats = await Order.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
          totalValue: { $sum: '$pricing.total' }
        }
      }
    ]);

    const totalOrders = await Order.countDocuments();
    const totalRevenue = await Order.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: '$pricing.total' }
        }
      }
    ]);

    const pendingOrders = await Order.countDocuments({
      status: { $in: ['pending', 'confirmed', 'processing', 'manufacturing'] }
    });

    const overdueOrders = await Order.countDocuments({
      estimatedCompletionDate: { $lt: new Date() },
      status: { $nin: ['delivered', 'cancelled', 'returned'] }
    });

    res.status(200).json({
      success: true,
      message: 'Order statistics retrieved successfully',
      data: {
        totalOrders,
        totalRevenue: totalRevenue[0]?.total || 0,
        pendingOrders,
        overdueOrders,
        statusBreakdown: stats
      }
    });

  } catch (error) {
    console.error('❌ Get order stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Error retrieving order statistics',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

module.exports = router;