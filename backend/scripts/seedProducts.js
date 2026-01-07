const mongoose = require('mongoose');
const Product = require('../models/Product');
require('dotenv').config();

// Sample products data
const sampleProducts = [
  // School Uniforms
  {
    id: 'school-shirt-001',
    name: 'Premium School Shirt - White',
    description: 'High-quality cotton school shirt with perfect fit and durability. Designed for daily wear with comfort and style.',
    shortDescription: 'Premium white cotton school shirt',
    category: 'schools',
    subcategory: 'shirts',
    price: { base: 450, currency: 'INR' },
    images: [
      { url: '/images/school-shirt-white.jpg', alt: 'White School Shirt', isPrimary: true }
    ],
    sizes: [
      { name: 'S', stock: 50, price: 450 },
      { name: 'M', stock: 75, price: 450 },
      { name: 'L', stock: 60, price: 450 },
      { name: 'XL', stock: 40, price: 450 }
    ],
    colors: [
      { name: 'White', code: '#FFFFFF', stock: 100 },
      { name: 'Light Blue', code: '#ADD8E6', stock: 75 }
    ],
    materials: ['100% Cotton', 'Breathable Fabric'],
    features: ['Wrinkle Resistant', 'Easy Care', 'Comfortable Fit'],
    specifications: {
      fabric: '100% Cotton',
      weight: '150 GSM',
      care: ['Machine Wash', 'Iron Medium Heat'],
      origin: 'India'
    },
    tags: ['school', 'uniform', 'shirt', 'cotton', 'white'],
    isActive: true,
    isFeatured: true,
    minimumOrderQuantity: 10
  },
  {
    id: 'school-trouser-001',
    name: 'School Trouser - Navy Blue',
    description: 'Durable navy blue school trousers made from premium fabric. Perfect for daily school wear.',
    shortDescription: 'Navy blue school trousers',
    category: 'schools',
    subcategory: 'trousers',
    price: { base: 650, currency: 'INR' },
    images: [
      { url: '/images/school-trouser-navy.jpg', alt: 'Navy School Trouser', isPrimary: true }
    ],
    sizes: [
      { name: '28', stock: 30, price: 650 },
      { name: '30', stock: 45, price: 650 },
      { name: '32', stock: 50, price: 650 },
      { name: '34', stock: 40, price: 650 },
      { name: '36', stock: 35, price: 650 }
    ],
    colors: [
      { name: 'Navy Blue', code: '#000080', stock: 120 },
      { name: 'Black', code: '#000000', stock: 80 }
    ],
    materials: ['Poly-Cotton Blend', 'Durable Fabric'],
    features: ['Reinforced Stitching', 'Fade Resistant', 'Comfortable Waistband'],
    specifications: {
      fabric: '65% Polyester, 35% Cotton',
      weight: '200 GSM',
      care: ['Machine Wash', 'Iron Medium Heat'],
      origin: 'India'
    },
    tags: ['school', 'uniform', 'trouser', 'navy', 'formal'],
    isActive: true,
    isFeatured: true,
    minimumOrderQuantity: 10
  },

  // Healthcare Uniforms
  {
    id: 'nurse-scrub-001',
    name: 'Medical Scrub Set - Sky Blue',
    description: 'Professional medical scrub set designed for healthcare professionals. Comfortable, breathable, and easy to maintain.',
    shortDescription: 'Sky blue medical scrub set',
    category: 'healthcare',
    subcategory: 'scrubs',
    price: { base: 1200, currency: 'INR' },
    images: [
      { url: '/images/nurse-scrub-blue.jpg', alt: 'Sky Blue Medical Scrub', isPrimary: true }
    ],
    sizes: [
      { name: 'S', stock: 25, price: 1200 },
      { name: 'M', stock: 40, price: 1200 },
      { name: 'L', stock: 35, price: 1200 },
      { name: 'XL', stock: 20, price: 1200 }
    ],
    colors: [
      { name: 'Sky Blue', code: '#87CEEB', stock: 60 },
      { name: 'Green', code: '#008000', stock: 40 },
      { name: 'White', code: '#FFFFFF', stock: 20 }
    ],
    materials: ['Antimicrobial Fabric', 'Moisture Wicking'],
    features: ['Multiple Pockets', 'Stain Resistant', 'Comfortable Fit', 'Easy Care'],
    specifications: {
      fabric: '65% Polyester, 35% Cotton with Antimicrobial Treatment',
      weight: '180 GSM',
      care: ['Machine Wash Hot', 'Tumble Dry Low'],
      origin: 'India'
    },
    tags: ['healthcare', 'medical', 'scrub', 'nurse', 'doctor'],
    isActive: true,
    isFeatured: true,
    minimumOrderQuantity: 5
  },

  // Corporate Uniforms
  {
    id: 'corporate-shirt-001',
    name: 'Executive Formal Shirt - White',
    description: 'Premium executive formal shirt perfect for corporate environments. Crisp, professional, and comfortable.',
    shortDescription: 'Executive white formal shirt',
    category: 'corporate',
    subcategory: 'shirts',
    price: { base: 850, currency: 'INR' },
    images: [
      { url: '/images/corporate-shirt-white.jpg', alt: 'Executive White Shirt', isPrimary: true }
    ],
    sizes: [
      { name: 'S', stock: 30, price: 850 },
      { name: 'M', stock: 50, price: 850 },
      { name: 'L', stock: 45, price: 850 },
      { name: 'XL', stock: 25, price: 850 },
      { name: 'XXL', stock: 15, price: 850 }
    ],
    colors: [
      { name: 'White', code: '#FFFFFF', stock: 80 },
      { name: 'Light Blue', code: '#ADD8E6', stock: 60 },
      { name: 'Light Pink', code: '#FFB6C1', stock: 25 }
    ],
    materials: ['Premium Cotton', 'Wrinkle Free'],
    features: ['Non-Iron', 'Slim Fit', 'French Seams', 'Mother of Pearl Buttons'],
    specifications: {
      fabric: '100% Premium Cotton',
      weight: '120 GSM',
      care: ['Dry Clean Recommended', 'Machine Wash Cold'],
      origin: 'India'
    },
    tags: ['corporate', 'formal', 'shirt', 'executive', 'business'],
    isActive: true,
    isFeatured: true,
    minimumOrderQuantity: 5
  },

  // Accessories
  {
    id: 'leather-belt-001',
    name: 'Premium Leather Belt - Black',
    description: 'High-quality genuine leather belt perfect for formal and casual wear. Durable and stylish.',
    shortDescription: 'Premium black leather belt',
    category: 'accessories',
    subcategory: 'belts',
    price: { base: 750, currency: 'INR' },
    images: [
      { url: '/images/leather-belt-black.jpg', alt: 'Black Leather Belt', isPrimary: true }
    ],
    sizes: [
      { name: '28', stock: 20, price: 750 },
      { name: '30', stock: 25, price: 750 },
      { name: '32', stock: 30, price: 750 },
      { name: '34', stock: 25, price: 750 },
      { name: '36', stock: 20, price: 750 },
      { name: '38', stock: 15, price: 750 }
    ],
    colors: [
      { name: 'Black', code: '#000000', stock: 80 },
      { name: 'Brown', code: '#8B4513', stock: 55 }
    ],
    materials: ['Genuine Leather', 'Metal Buckle'],
    features: ['Adjustable', 'Durable', 'Classic Design', 'Scratch Resistant'],
    specifications: {
      fabric: '100% Genuine Leather',
      weight: '200g',
      care: ['Wipe Clean', 'Leather Conditioner'],
      origin: 'India'
    },
    tags: ['accessories', 'belt', 'leather', 'formal', 'casual'],
    isActive: true,
    isFeatured: false,
    minimumOrderQuantity: 1
  },

  // Men's Collection
  {
    id: 'mens-polo-001',
    name: 'Men\'s Polo T-Shirt - Navy',
    description: 'Classic men\'s polo t-shirt in navy blue. Perfect for casual corporate wear and team uniforms.',
    shortDescription: 'Navy blue men\'s polo t-shirt',
    category: 'men',
    subcategory: 'polo',
    price: { base: 550, currency: 'INR' },
    images: [
      { url: '/images/mens-polo-navy.jpg', alt: 'Navy Men\'s Polo', isPrimary: true }
    ],
    sizes: [
      { name: 'S', stock: 35, price: 550 },
      { name: 'M', stock: 50, price: 550 },
      { name: 'L', stock: 45, price: 550 },
      { name: 'XL', stock: 30, price: 550 },
      { name: 'XXL', stock: 20, price: 550 }
    ],
    colors: [
      { name: 'Navy Blue', code: '#000080', stock: 90 },
      { name: 'White', code: '#FFFFFF', stock: 70 },
      { name: 'Black', code: '#000000', stock: 60 },
      { name: 'Red', code: '#FF0000', stock: 40 }
    ],
    materials: ['Cotton Pique', 'Breathable Fabric'],
    features: ['Collar Design', 'Button Placket', 'Side Vents', 'Comfortable Fit'],
    specifications: {
      fabric: '100% Cotton Pique',
      weight: '180 GSM',
      care: ['Machine Wash', 'Iron Medium Heat'],
      origin: 'India'
    },
    tags: ['men', 'polo', 'casual', 'corporate', 'navy'],
    isActive: true,
    isFeatured: true,
    minimumOrderQuantity: 10
  },

  // Women's Collection
  {
    id: 'womens-blouse-001',
    name: 'Women\'s Formal Blouse - White',
    description: 'Elegant women\'s formal blouse designed for professional environments. Comfortable and stylish.',
    shortDescription: 'White women\'s formal blouse',
    category: 'women',
    subcategory: 'blouse',
    price: { base: 750, currency: 'INR' },
    images: [
      { url: '/images/womens-blouse-white.jpg', alt: 'White Women\'s Blouse', isPrimary: true }
    ],
    sizes: [
      { name: 'S', stock: 40, price: 750 },
      { name: 'M', stock: 55, price: 750 },
      { name: 'L', stock: 45, price: 750 },
      { name: 'XL', stock: 30, price: 750 },
      { name: 'XXL', stock: 20, price: 750 }
    ],
    colors: [
      { name: 'White', code: '#FFFFFF', stock: 95 },
      { name: 'Light Blue', code: '#ADD8E6', stock: 70 },
      { name: 'Cream', code: '#F5F5DC', stock: 25 }
    ],
    materials: ['Premium Cotton', 'Wrinkle Resistant'],
    features: ['Tailored Fit', 'Professional Design', 'Easy Care', 'Comfortable'],
    specifications: {
      fabric: '100% Cotton',
      weight: '130 GSM',
      care: ['Machine Wash', 'Iron Low Heat'],
      origin: 'India'
    },
    tags: ['women', 'blouse', 'formal', 'professional', 'white'],
    isActive: true,
    isFeatured: true,
    minimumOrderQuantity: 5
  }
];

async function seedProducts() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('📦 Connected to MongoDB');

    // Clear existing products
    await Product.deleteMany({});
    console.log('🗑️  Cleared existing products');

    // Insert sample products
    const products = await Product.insertMany(sampleProducts);
    console.log(`✅ Inserted ${products.length} sample products`);

    // Display inserted products
    products.forEach(product => {
      console.log(`   - ${product.name} (${product.category})`);
    });

    console.log('\n🎉 Database seeding completed successfully!');
    process.exit(0);

  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

// Run the seeding function
seedProducts();