const express = require('express');
const { query, param, validationResult } = require('express-validator');
const Product = require('../models/Product');

const router = express.Router();

// GET /api/products - Get all products with filtering and pagination
router.get('/', [
  query('category')
    .optional()
    .isIn(['schools', 'healthcare', 'corporate', 'accessories', 'men', 'women'])
    .withMessage('Invalid category'),
  
  query('search')
    .optional()
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Search query must be between 1 and 100 characters'),
  
  query('minPrice')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Minimum price must be a positive number'),
  
  query('maxPrice')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Maximum price must be a positive number'),
  
  query('sortBy')
    .optional()
    .isIn(['relevance', 'price-low', 'price-high', 'newest', 'popular', 'rating'])
    .withMessage('Invalid sort option'),
  
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
      category,
      search,
      minPrice,
      maxPrice,
      sizes,
      colors,
      tags,
      sortBy = 'relevance',
      page = 1,
      limit = 20
    } = req.query;

    const skip = (page - 1) * limit;

    // Parse array parameters
    const sizesArray = sizes ? sizes.split(',') : undefined;
    const colorsArray = colors ? colors.split(',') : undefined;
    const tagsArray = tags ? tags.split(',') : undefined;

    // Use the searchProducts static method
    const products = await Product.searchProducts(search, {
      category,
      minPrice: minPrice ? parseFloat(minPrice) : undefined,
      maxPrice: maxPrice ? parseFloat(maxPrice) : undefined,
      sizes: sizesArray,
      colors: colorsArray,
      tags: tagsArray,
      sortBy,
      limit: parseInt(limit),
      skip
    });

    // Get total count for pagination
    let countQuery = { isActive: true };
    if (search) countQuery.$text = { $search: search };
    if (category) countQuery.category = category;
    if (minPrice || maxPrice) {
      countQuery['price.base'] = {};
      if (minPrice) countQuery['price.base'].$gte = parseFloat(minPrice);
      if (maxPrice) countQuery['price.base'].$lte = parseFloat(maxPrice);
    }

    const totalProducts = await Product.countDocuments(countQuery);
    const totalPages = Math.ceil(totalProducts / limit);

    res.status(200).json({
      success: true,
      message: 'Products retrieved successfully',
      data: {
        products,
        pagination: {
          currentPage: parseInt(page),
          totalPages,
          totalProducts,
          hasNextPage: page < totalPages,
          hasPrevPage: page > 1
        },
        filters: {
          category,
          search,
          minPrice,
          maxPrice,
          sortBy
        }
      }
    });

  } catch (error) {
    console.error('❌ Get products error:', error);
    res.status(500).json({
      success: false,
      message: 'Error retrieving products',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// GET /api/products/featured - Get featured products
router.get('/featured', [
  query('limit')
    .optional()
    .isInt({ min: 1, max: 20 })
    .withMessage('Limit must be between 1 and 20')
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

    const limit = parseInt(req.query.limit) || 10;
    const products = await Product.getFeatured(limit);

    res.status(200).json({
      success: true,
      message: 'Featured products retrieved successfully',
      data: {
        products,
        count: products.length
      }
    });

  } catch (error) {
    console.error('❌ Get featured products error:', error);
    res.status(500).json({
      success: false,
      message: 'Error retrieving featured products',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// GET /api/products/bestsellers - Get best selling products
router.get('/bestsellers', [
  query('limit')
    .optional()
    .isInt({ min: 1, max: 20 })
    .withMessage('Limit must be between 1 and 20')
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

    const limit = parseInt(req.query.limit) || 10;
    const products = await Product.getBestSellers(limit);

    res.status(200).json({
      success: true,
      message: 'Best selling products retrieved successfully',
      data: {
        products,
        count: products.length
      }
    });

  } catch (error) {
    console.error('❌ Get bestsellers error:', error);
    res.status(500).json({
      success: false,
      message: 'Error retrieving best selling products',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// GET /api/products/categories - Get products by category
router.get('/categories/:category', [
  param('category')
    .isIn(['schools', 'healthcare', 'corporate', 'accessories', 'men', 'women'])
    .withMessage('Invalid category'),
  
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

    const { category } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const products = await Product.find({ category, isActive: true })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const totalProducts = await Product.countDocuments({ category, isActive: true });
    const totalPages = Math.ceil(totalProducts / limit);

    res.status(200).json({
      success: true,
      message: `${category} products retrieved successfully`,
      data: {
        products,
        category,
        pagination: {
          currentPage: page,
          totalPages,
          totalProducts,
          hasNextPage: page < totalPages,
          hasPrevPage: page > 1
        }
      }
    });

  } catch (error) {
    console.error('❌ Get category products error:', error);
    res.status(500).json({
      success: false,
      message: 'Error retrieving category products',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// GET /api/products/:id - Get single product by ID
router.get('/:id', [
  param('id')
    .trim()
    .notEmpty()
    .withMessage('Product ID is required')
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

    const product = await Product.findOne({ 
      $or: [{ id }, { _id: id }], 
      isActive: true 
    }).populate('reviews.user', 'name');

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    // Increment view count
    await product.incrementView();

    // Get related products
    const relatedProducts = await Product.find({
      category: product.category,
      _id: { $ne: product._id },
      isActive: true
    }).limit(4);

    res.status(200).json({
      success: true,
      message: 'Product retrieved successfully',
      data: {
        product,
        relatedProducts
      }
    });

  } catch (error) {
    console.error('❌ Get product error:', error);
    res.status(500).json({
      success: false,
      message: 'Error retrieving product',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// GET /api/products/search/suggestions - Get search suggestions
router.get('/search/suggestions', [
  query('q')
    .trim()
    .isLength({ min: 1, max: 50 })
    .withMessage('Query must be between 1 and 50 characters')
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

    const { q } = req.query;

    // Get product name suggestions
    const products = await Product.find({
      name: { $regex: q, $options: 'i' },
      isActive: true
    })
    .select('name category')
    .limit(5);

    // Get category suggestions
    const categories = ['schools', 'healthcare', 'corporate', 'accessories', 'men', 'women']
      .filter(cat => cat.toLowerCase().includes(q.toLowerCase()));

    // Get tag suggestions
    const tagProducts = await Product.find({
      tags: { $regex: q, $options: 'i' },
      isActive: true
    })
    .select('tags')
    .limit(10);

    const tags = [...new Set(
      tagProducts.flatMap(p => p.tags)
        .filter(tag => tag.toLowerCase().includes(q.toLowerCase()))
    )].slice(0, 5);

    res.status(200).json({
      success: true,
      message: 'Search suggestions retrieved successfully',
      data: {
        products: products.map(p => ({ name: p.name, category: p.category })),
        categories,
        tags,
        query: q
      }
    });

  } catch (error) {
    console.error('❌ Get search suggestions error:', error);
    res.status(500).json({
      success: false,
      message: 'Error retrieving search suggestions',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// GET /api/products/filters/options - Get available filter options
router.get('/filters/options', async (req, res) => {
  try {
    // Get unique categories
    const categories = await Product.distinct('category', { isActive: true });

    // Get price range
    const priceRange = await Product.aggregate([
      { $match: { isActive: true } },
      {
        $group: {
          _id: null,
          minPrice: { $min: '$price.base' },
          maxPrice: { $max: '$price.base' }
        }
      }
    ]);

    // Get unique sizes
    const sizes = await Product.aggregate([
      { $match: { isActive: true } },
      { $unwind: '$sizes' },
      { $group: { _id: '$sizes.name' } },
      { $sort: { _id: 1 } }
    ]);

    // Get unique colors
    const colors = await Product.aggregate([
      { $match: { isActive: true } },
      { $unwind: '$colors' },
      { $group: { _id: { name: '$colors.name', code: '$colors.code' } } },
      { $sort: { '_id.name': 1 } }
    ]);

    // Get popular tags
    const tags = await Product.aggregate([
      { $match: { isActive: true } },
      { $unwind: '$tags' },
      { $group: { _id: '$tags', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 20 }
    ]);

    res.status(200).json({
      success: true,
      message: 'Filter options retrieved successfully',
      data: {
        categories,
        priceRange: priceRange[0] || { minPrice: 0, maxPrice: 0 },
        sizes: sizes.map(s => s._id),
        colors: colors.map(c => c._id),
        tags: tags.map(t => t._id)
      }
    });

  } catch (error) {
    console.error('❌ Get filter options error:', error);
    res.status(500).json({
      success: false,
      message: 'Error retrieving filter options',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

module.exports = router;