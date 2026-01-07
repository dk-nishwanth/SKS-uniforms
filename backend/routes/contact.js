const express = require('express');
const { body, validationResult } = require('express-validator');
const rateLimit = require('express-rate-limit');
const mongoose = require('mongoose');
const emailService = require('../services/emailService');
const smsService = require('../services/smsService');
const Contact = require('../models/Contact');

const router = express.Router();

// Rate limiting for contact form - more restrictive
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 contact form submissions per windowMs
  message: {
    success: false,
    message: 'Too many contact form submissions. Please try again in 15 minutes.'
  }
});

// Validation rules for contact form
const contactValidation = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters')
    .matches(/^[a-zA-Z\s.'-]+$/)
    .withMessage('Name can only contain letters, spaces, dots, apostrophes, and hyphens'),
  
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address'),
  
  body('phone')
    .optional()
    .matches(/^[\+]?[1-9][\d]{0,15}$/)
    .withMessage('Please provide a valid phone number'),
  
  body('organization')
    .optional()
    .trim()
    .isLength({ max: 200 })
    .withMessage('Organization name cannot exceed 200 characters'),
  
  body('category')
    .optional()
    .isIn(['schools', 'healthcare', 'corporate', 'accessories', 'multiple'])
    .withMessage('Invalid category selected'),
  
  body('message')
    .trim()
    .isLength({ min: 10, max: 2000 })
    .withMessage('Message must be between 10 and 2000 characters'),
  
  body('inquiryType')
    .isIn(['general', 'quote', 'samples'])
    .withMessage('Invalid inquiry type')
];

// POST /api/contact - Submit contact form
router.post('/', contactLimiter, contactValidation, async (req, res) => {
  try {
    console.log('📝 Contact form submission received:', req.body);
    
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log('❌ Validation errors:', errors.array());
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { name, email, phone, organization, category, message, inquiryType } = req.body;
    
    console.log('✅ Validation passed, processing contact form...');

    // Save contact form submission to database (if available)
    let contactSubmission = null;
    try {
      if (mongoose.connection.readyState === 1) {
        contactSubmission = new Contact({
          name,
          email,
          phone,
          organization,
          category,
          message,
          inquiryType,
          ipAddress: req.ip,
          userAgent: req.get('User-Agent')
        });

        await contactSubmission.save();
        console.log('💾 Contact form saved to database');
      } else {
        console.log('⚠️ Database not available - contact form not saved');
      }
    } catch (dbError) {
      console.error('❌ Database save error:', dbError.message);
      // Continue without database save
    }

    // Send email notification to business
    let emailResult = { success: false };
    try {
      emailResult = await emailService.sendContactFormEmail({
        name,
        email,
        phone,
        organization,
        category,
        message,
        inquiryType
      });
      console.log('📧 Email result:', emailResult.success);
    } catch (emailError) {
      console.log('⚠️ Email sending failed (expected in development):', emailError.message);
    }

    // Send auto-reply email to customer
    try {
      await emailService.sendAutoReplyEmail(email, name, inquiryType);
      console.log('📧 Auto-reply sent');
    } catch (emailError) {
      console.log('⚠️ Auto-reply failed (expected in development):', emailError.message);
    }

    // Send SMS notification to business numbers
    let smsResults = [];
    try {
      smsResults = await smsService.sendContactNotification({
        name,
        email,
        phone,
        organization,
        category,
        message,
        inquiryType
      });
      console.log('📱 SMS results:', smsResults);
    } catch (smsError) {
      console.log('⚠️ SMS sending failed (expected in development):', smsError.message);
    }

    // Log the results
    console.log('📧 Email sent:', emailResult.success);
    console.log('📱 SMS results:', smsResults);

    res.status(200).json({
      success: true,
      message: 'Thank you for your message! We will get back to you within 24 hours.',
      data: {
        submissionId: contactSubmission?._id || 'no-db',
        emailSent: emailResult.success,
        smsSent: smsResults.some(result => result.success)
      }
    });

  } catch (error) {
    console.error('❌ Contact form submission error:', error);
    res.status(500).json({
      success: false,
      message: 'Sorry, there was an error processing your request. Please try again or contact us directly.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// POST /api/contact/quote - Request quote
router.post('/quote', contactLimiter, [
  body('productIds')
    .isArray({ min: 1 })
    .withMessage('At least one product must be selected'),
  body('message')
    .trim()
    .isLength({ min: 10, max: 2000 })
    .withMessage('Message must be between 10 and 2000 characters'),
  body('contactInfo.name')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Name is required'),
  body('contactInfo.email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Valid email is required'),
  body('contactInfo.phone')
    .optional()
    .matches(/^[\+]?[1-9][\d]{0,15}$/)
    .withMessage('Please provide a valid phone number')
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

    const { productIds, message, contactInfo } = req.body;

    // Save quote request to database
    const quoteRequest = new Contact({
      name: contactInfo.name,
      email: contactInfo.email,
      phone: contactInfo.phone,
      organization: contactInfo.organization,
      message: `QUOTE REQUEST: ${message}`,
      inquiryType: 'quote',
      productIds,
      ipAddress: req.ip,
      userAgent: req.get('User-Agent')
    });

    await quoteRequest.save();

    // Send SMS notification for quote request
    const smsResults = await smsService.sendQuoteNotification(contactInfo, productIds);

    // Send email notification
    const emailResult = await emailService.sendContactFormEmail({
      name: contactInfo.name,
      email: contactInfo.email,
      phone: contactInfo.phone,
      organization: contactInfo.organization,
      message: `QUOTE REQUEST for ${productIds.length} products: ${message}`,
      inquiryType: 'quote'
    });

    // Send auto-reply
    await emailService.sendAutoReplyEmail(contactInfo.email, contactInfo.name, 'quote request');

    res.status(200).json({
      success: true,
      message: `Quote request submitted successfully! We'll get back to you within 24 hours at ${contactInfo.email}.`,
      data: {
        requestId: quoteRequest._id,
        productCount: productIds.length
      }
    });

  } catch (error) {
    console.error('❌ Quote request error:', error);
    res.status(500).json({
      success: false,
      message: 'Error processing quote request. Please try again.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// POST /api/contact/samples - Request samples
router.post('/samples', contactLimiter, [
  body('productIds')
    .isArray({ min: 1 })
    .withMessage('At least one product must be selected'),
  body('contactInfo.name')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Name is required'),
  body('contactInfo.email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Valid email is required'),
  body('contactInfo.address')
    .trim()
    .isLength({ min: 10, max: 500 })
    .withMessage('Complete address is required for sample delivery')
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

    const { productIds, contactInfo } = req.body;

    // Save sample request to database
    const sampleRequest = new Contact({
      name: contactInfo.name,
      email: contactInfo.email,
      phone: contactInfo.phone,
      message: `SAMPLE REQUEST for ${productIds.length} products. Delivery address: ${contactInfo.address}`,
      inquiryType: 'samples',
      productIds,
      shippingAddress: contactInfo.address,
      ipAddress: req.ip,
      userAgent: req.get('User-Agent')
    });

    await sampleRequest.save();

    // Send SMS notification for sample request
    const smsResults = await smsService.sendSampleRequestNotification(contactInfo, productIds);

    // Send email notification
    const emailResult = await emailService.sendContactFormEmail({
      name: contactInfo.name,
      email: contactInfo.email,
      phone: contactInfo.phone,
      message: `SAMPLE REQUEST for ${productIds.length} products. Shipping address: ${contactInfo.address}`,
      inquiryType: 'samples'
    });

    // Send auto-reply
    await emailService.sendAutoReplyEmail(contactInfo.email, contactInfo.name, 'sample request');

    res.status(200).json({
      success: true,
      message: `Sample request submitted successfully! Samples will be shipped to ${contactInfo.address} within 3-5 business days.`,
      data: {
        requestId: sampleRequest._id,
        productCount: productIds.length
      }
    });

  } catch (error) {
    console.error('❌ Sample request error:', error);
    res.status(500).json({
      success: false,
      message: 'Error processing sample request. Please try again.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// POST /api/contact/enquiry - Submit enquiry from enquiry drawer
router.post('/enquiry', contactLimiter, [
  body('contactInfo.name')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Name is required'),
  body('contactInfo.email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Valid email is required'),
  body('contactInfo.phone')
    .matches(/^[\+]?[1-9][\d]{0,15}$/)
    .withMessage('Valid phone number is required'),
  body('message')
    .trim()
    .isLength({ min: 1, max: 2000 })
    .withMessage('Message cannot be empty'),
  body('enquiryItems')
    .isArray({ min: 1 })
    .withMessage('At least one item must be in the enquiry')
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

    const { contactInfo, message, enquiryItems } = req.body;

    // Create detailed message with enquiry items
    const itemsList = enquiryItems.map(item => 
      `• ${item.name} ${item.selectedSize ? `(Size: ${item.selectedSize})` : ''} ${item.quantity ? `(Qty: ${item.quantity})` : ''} ${item.notes ? `- ${item.notes}` : ''}`
    ).join('\n');

    const fullMessage = `ENQUIRY SUBMISSION:

Items Requested:
${itemsList}

Customer Message:
${message || 'No additional message provided.'}`;

    // Save enquiry to database (if available)
    let enquirySubmission = null;
    try {
      if (mongoose.connection.readyState === 1) {
        enquirySubmission = new Contact({
          name: contactInfo.name,
          email: contactInfo.email,
          phone: contactInfo.phone,
          organization: contactInfo.company,
          message: fullMessage,
          inquiryType: 'enquiry',
          enquiryItems: enquiryItems,
          ipAddress: req.ip,
          userAgent: req.get('User-Agent')
        });

        await enquirySubmission.save();
        console.log('💾 Enquiry saved to database');
      } else {
        console.log('⚠️ Database not available - enquiry not saved');
      }
    } catch (dbError) {
      console.error('❌ Database save error:', dbError.message);
      // Continue without database save
    }

    // Send email notification to business
    const emailResult = await emailService.sendContactFormEmail({
      name: contactInfo.name,
      email: contactInfo.email,
      phone: contactInfo.phone,
      organization: contactInfo.company,
      message: fullMessage,
      inquiryType: 'enquiry'
    });

    // Send auto-reply email to customer
    await emailService.sendAutoReplyEmail(contactInfo.email, contactInfo.name, 'enquiry');

    // Send SMS notification to business numbers
    const smsResults = await smsService.sendEnquiryNotification(contactInfo, enquiryItems, message);

    // Log the results
    console.log('📧 Enquiry email sent:', emailResult.success);
    console.log('📱 Enquiry SMS results:', smsResults);

    res.status(200).json({
      success: true,
      message: 'Thank you for your enquiry! We will get back to you within 24 hours with detailed information and pricing.',
      data: {
        submissionId: enquirySubmission?._id || 'no-db',
        itemCount: enquiryItems.length,
        emailSent: emailResult.success,
        smsSent: smsResults.some(result => result.success)
      }
    });

  } catch (error) {
    console.error('❌ Enquiry submission error:', error);
    res.status(500).json({
      success: false,
      message: 'Sorry, there was an error processing your enquiry. Please try again or contact us directly.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// POST /api/contact/consultation - Book consultation
router.post('/consultation', contactLimiter, [
  body('consultationType')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Consultation type is required'),
  body('contactInfo.name')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Name is required'),
  body('contactInfo.email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Valid email is required'),
  body('contactInfo.phone')
    .matches(/^[\+]?[1-9][\d]{0,15}$/)
    .withMessage('Valid phone number is required for consultation booking')
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

    const { consultationType, contactInfo } = req.body;

    // Save consultation request to database
    const consultationRequest = new Contact({
      name: contactInfo.name,
      email: contactInfo.email,
      phone: contactInfo.phone,
      organization: contactInfo.organization,
      message: `CONSULTATION REQUEST: ${consultationType}. Preferred time: ${contactInfo.preferredTime || 'Not specified'}`,
      inquiryType: 'consultation',
      consultationType,
      ipAddress: req.ip,
      userAgent: req.get('User-Agent')
    });

    await consultationRequest.save();

    // Send SMS notification for consultation
    const smsResults = await smsService.sendConsultationNotification(consultationType, contactInfo);

    // Send email notification
    const emailResult = await emailService.sendContactFormEmail({
      name: contactInfo.name,
      email: contactInfo.email,
      phone: contactInfo.phone,
      organization: contactInfo.organization,
      message: `CONSULTATION REQUEST: ${consultationType}`,
      inquiryType: 'consultation'
    });

    // Send auto-reply
    await emailService.sendAutoReplyEmail(contactInfo.email, contactInfo.name, 'consultation request');

    res.status(200).json({
      success: true,
      message: `${consultationType} consultation booked successfully! We'll contact you at ${contactInfo.phone} to schedule the appointment.`,
      data: {
        requestId: consultationRequest._id,
        consultationType
      }
    });

  } catch (error) {
    console.error('❌ Consultation booking error:', error);
    res.status(500).json({
      success: false,
      message: 'Error booking consultation. Please try again.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// GET /api/contact/test-sms - Test SMS functionality (development only)
router.get('/test-sms', async (req, res) => {
  if (process.env.NODE_ENV !== 'development') {
    return res.status(404).json({ message: 'Not found' });
  }

  try {
    const results = await smsService.sendTestSMS();
    res.status(200).json({
      success: true,
      message: 'Test SMS sent',
      results
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error sending test SMS',
      error: error.message
    });
  }
});

module.exports = router;