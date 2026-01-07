const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true,
    maxlength: [200, 'Product name cannot exceed 200 characters']
  },
  description: {
    type: String,
    required: [true, 'Product description is required'],
    trim: true,
    maxlength: [2000, 'Description cannot exceed 2000 characters']
  },
  shortDescription: {
    type: String,
    trim: true,
    maxlength: [500, 'Short description cannot exceed 500 characters']
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['schools', 'healthcare', 'corporate', 'accessories', 'men', 'women'],
    lowercase: true
  },
  subcategory: {
    type: String,
    trim: true,
    lowercase: true
  },
  price: {
    base: {
      type: Number,
      required: [true, 'Base price is required'],
      min: [0, 'Price cannot be negative']
    },
    discounted: {
      type: Number,
      min: [0, 'Discounted price cannot be negative']
    },
    currency: {
      type: String,
      default: 'INR'
    }
  },
  images: [{
    url: {
      type: String,
      required: true
    },
    alt: {
      type: String,
      required: true
    },
    isPrimary: {
      type: Boolean,
      default: false
    }
  }],
  sizes: [{
    name: {
      type: String,
      required: true,
      enum: ['XS', 'S', 'M', 'L', 'XL', 'XXL', '28', '30', '32', '34', '36', '38', '40', '42', '44', '46', 'Free Size']
    },
    stock: {
      type: Number,
      required: true,
      min: [0, 'Stock cannot be negative'],
      default: 0
    },
    price: {
      type: Number,
      min: [0, 'Size-specific price cannot be negative']
    }
  }],
  colors: [{
    name: {
      type: String,
      required: true
    },
    code: {
      type: String,
      required: true,
      match: [/^#[0-9A-F]{6}$/i, 'Color code must be a valid hex color']
    },
    stock: {
      type: Number,
      required: true,
      min: [0, 'Stock cannot be negative'],
      default: 0
    }
  }],
  materials: [{
    type: String,
    trim: true
  }],
  features: [{
    type: String,
    trim: true
  }],
  specifications: {
    fabric: String,
    weight: String,
    care: [String],
    origin: {
      type: String,
      default: 'India'
    }
  },
  tags: [{
    type: String,
    trim: true,
    lowercase: true
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  isCustomizable: {
    type: Boolean,
    default: true
  },
  minimumOrderQuantity: {
    type: Number,
    default: 1,
    min: [1, 'Minimum order quantity must be at least 1']
  },
  leadTime: {
    type: String,
    default: '7-10 business days'
  },
  weight: {
    value: Number,
    unit: {
      type: String,
      enum: ['g', 'kg'],
      default: 'g'
    }
  },
  dimensions: {
    length: Number,
    width: Number,
    height: Number,
    unit: {
      type: String,
      enum: ['cm', 'm'],
      default: 'cm'
    }
  },
  seo: {
    metaTitle: String,
    metaDescription: String,
    keywords: [String],
    slug: {
      type: String,
      unique: true,
      sparse: true
    }
  },
  ratings: {
    average: {
      type: Number,
      default: 0,
      min: [0, 'Rating cannot be less than 0'],
      max: [5, 'Rating cannot be more than 5']
    },
    count: {
      type: Number,
      default: 0,
      min: [0, 'Rating count cannot be negative']
    }
  },
  reviews: [{
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User'
    },
    name: String,
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5
    },
    comment: String,
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  relatedProducts: [{
    type: String,
    ref: 'Product'
  }],
  viewCount: {
    type: Number,
    default: 0
  },
  salesCount: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for better query performance
productSchema.index({ id: 1 });
productSchema.index({ category: 1 });
productSchema.index({ isActive: 1 });
productSchema.index({ isFeatured: 1 });
productSchema.index({ 'price.base': 1 });
productSchema.index({ tags: 1 });
productSchema.index({ name: 'text', description: 'text', tags: 'text' });
productSchema.index({ createdAt: -1 });
productSchema.index({ salesCount: -1 });
productSchema.index({ 'ratings.average': -1 });

// Virtual for effective price (discounted or base)
productSchema.virtual('effectivePrice').get(function() {
  return this.price.discounted || this.price.base;
});

// Virtual for discount percentage
productSchema.virtual('discountPercentage').get(function() {
  if (!this.price.discounted) return 0;
  return Math.round(((this.price.base - this.price.discounted) / this.price.base) * 100);
});

// Virtual for total stock
productSchema.virtual('totalStock').get(function() {
  return this.sizes.reduce((total, size) => total + size.stock, 0);
});

// Virtual for primary image
productSchema.virtual('primaryImage').get(function() {
  const primary = this.images.find(img => img.isPrimary);
  return primary || this.images[0];
});

// Virtual for availability status
productSchema.virtual('availability').get(function() {
  const totalStock = this.totalStock;
  if (totalStock === 0) return 'out-of-stock';
  if (totalStock <= 5) return 'low-stock';
  return 'in-stock';
});

// Pre-save middleware
productSchema.pre('save', function(next) {
  // Generate slug from name if not provided
  if (!this.seo.slug && this.name) {
    this.seo.slug = this.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }
  
  // Ensure at least one image is marked as primary
  if (this.images.length > 0 && !this.images.some(img => img.isPrimary)) {
    this.images[0].isPrimary = true;
  }
  
  next();
});

// Static methods
productSchema.statics.getByCategory = function(category) {
  return this.find({ category, isActive: true }).sort({ createdAt: -1 });
};

productSchema.statics.getFeatured = function(limit = 10) {
  return this.find({ isFeatured: true, isActive: true })
    .sort({ salesCount: -1, 'ratings.average': -1 })
    .limit(limit);
};

productSchema.statics.getBestSellers = function(limit = 10) {
  return this.find({ isActive: true })
    .sort({ salesCount: -1 })
    .limit(limit);
};

productSchema.statics.getTopRated = function(limit = 10) {
  return this.find({ isActive: true, 'ratings.count': { $gte: 1 } })
    .sort({ 'ratings.average': -1, 'ratings.count': -1 })
    .limit(limit);
};

productSchema.statics.searchProducts = function(query, options = {}) {
  const {
    category,
    minPrice,
    maxPrice,
    sizes,
    colors,
    tags,
    sortBy = 'relevance',
    limit = 20,
    skip = 0
  } = options;

  let searchQuery = { isActive: true };

  // Text search
  if (query) {
    searchQuery.$text = { $search: query };
  }

  // Category filter
  if (category) {
    searchQuery.category = category;
  }

  // Price range filter
  if (minPrice || maxPrice) {
    searchQuery['price.base'] = {};
    if (minPrice) searchQuery['price.base'].$gte = minPrice;
    if (maxPrice) searchQuery['price.base'].$lte = maxPrice;
  }

  // Size filter
  if (sizes && sizes.length > 0) {
    searchQuery['sizes.name'] = { $in: sizes };
  }

  // Color filter
  if (colors && colors.length > 0) {
    searchQuery['colors.name'] = { $in: colors };
  }

  // Tags filter
  if (tags && tags.length > 0) {
    searchQuery.tags = { $in: tags };
  }

  // Sorting
  let sort = {};
  switch (sortBy) {
    case 'price-low':
      sort = { 'price.base': 1 };
      break;
    case 'price-high':
      sort = { 'price.base': -1 };
      break;
    case 'newest':
      sort = { createdAt: -1 };
      break;
    case 'popular':
      sort = { salesCount: -1 };
      break;
    case 'rating':
      sort = { 'ratings.average': -1, 'ratings.count': -1 };
      break;
    default:
      sort = query ? { score: { $meta: 'textScore' } } : { createdAt: -1 };
  }

  return this.find(searchQuery)
    .sort(sort)
    .skip(skip)
    .limit(limit);
};

// Instance methods
productSchema.methods.addReview = function(userId, name, rating, comment) {
  // Remove existing review from same user
  this.reviews = this.reviews.filter(review => 
    review.user.toString() !== userId.toString()
  );
  
  // Add new review
  this.reviews.push({ user: userId, name, rating, comment });
  
  // Recalculate average rating
  const totalRating = this.reviews.reduce((sum, review) => sum + review.rating, 0);
  this.ratings.average = totalRating / this.reviews.length;
  this.ratings.count = this.reviews.length;
  
  return this.save();
};

productSchema.methods.incrementView = function() {
  this.viewCount += 1;
  return this.save();
};

productSchema.methods.incrementSales = function(quantity = 1) {
  this.salesCount += quantity;
  return this.save();
};

productSchema.methods.updateStock = function(size, color, quantity) {
  const sizeObj = this.sizes.find(s => s.name === size);
  if (sizeObj) {
    sizeObj.stock = Math.max(0, sizeObj.stock - quantity);
  }
  
  const colorObj = this.colors.find(c => c.name === color);
  if (colorObj) {
    colorObj.stock = Math.max(0, colorObj.stock - quantity);
  }
  
  return this.save();
};

module.exports = mongoose.model('Product', productSchema);