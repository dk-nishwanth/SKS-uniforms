// Simple API test script for SKS Uniforms Backend
// Run this after starting the server to test basic functionality

const baseURL = 'http://localhost:5000/api';

async function testAPI() {
  console.log('🧪 Testing SKS Uniforms API...\n');

  // Test 1: Health Check
  try {
    const response = await fetch(`${baseURL}/health`);
    const data = await response.json();
    console.log('✅ Health Check:', data.message);
  } catch (error) {
    console.log('❌ Health Check failed:', error.message);
  }

  // Test 2: Get Products
  try {
    const response = await fetch(`${baseURL}/products?limit=5`);
    const data = await response.json();
    console.log(`✅ Products API: Retrieved ${data.data?.products?.length || 0} products`);
  } catch (error) {
    console.log('❌ Products API failed:', error.message);
  }

  // Test 3: Get Featured Products
  try {
    const response = await fetch(`${baseURL}/products/featured?limit=3`);
    const data = await response.json();
    console.log(`✅ Featured Products: Retrieved ${data.data?.products?.length || 0} featured products`);
  } catch (error) {
    console.log('❌ Featured Products failed:', error.message);
  }

  // Test 4: Contact Form Submission (Test Data)
  try {
    const contactData = {
      name: 'Test User',
      email: 'test@example.com',
      phone: '+919876543210',
      organization: 'Test School',
      category: 'schools',
      message: 'This is a test message from the API test script.',
      inquiryType: 'general'
    };

    const response = await fetch(`${baseURL}/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(contactData)
    });

    const data = await response.json();
    if (response.ok) {
      console.log('✅ Contact Form: Submission successful');
      console.log(`   📧 Email sent: ${data.data?.emailSent}`);
      console.log(`   📱 SMS sent: ${data.data?.smsSent}`);
    } else {
      console.log('⚠️  Contact Form: Validation or server error');
    }
  } catch (error) {
    console.log('❌ Contact Form failed:', error.message);
  }

  // Test 5: Newsletter Subscription (Test Data)
  try {
    const newsletterData = {
      email: 'newsletter-test@example.com',
      name: 'Newsletter Test User',
      categories: ['schools', 'corporate']
    };

    const response = await fetch(`${baseURL}/newsletter/subscribe`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newsletterData)
    });

    const data = await response.json();
    if (response.ok) {
      console.log('✅ Newsletter: Subscription successful');
    } else {
      console.log('⚠️  Newsletter: Validation or server error');
    }
  } catch (error) {
    console.log('❌ Newsletter failed:', error.message);
  }

  // Test 6: Product Search
  try {
    const response = await fetch(`${baseURL}/products?search=shirt&limit=3`);
    const data = await response.json();
    console.log(`✅ Product Search: Found ${data.data?.products?.length || 0} products for "shirt"`);
  } catch (error) {
    console.log('❌ Product Search failed:', error.message);
  }

  // Test 7: Filter Options
  try {
    const response = await fetch(`${baseURL}/products/filters/options`);
    const data = await response.json();
    console.log(`✅ Filter Options: ${data.data?.categories?.length || 0} categories available`);
  } catch (error) {
    console.log('❌ Filter Options failed:', error.message);
  }

  console.log('\n🎉 API testing completed!');
  console.log('\n📝 Notes:');
  console.log('   - Make sure the server is running on http://localhost:5000');
  console.log('   - Configure your .env file with valid email and SMS credentials');
  console.log('   - Run "npm run seed" to populate the database with sample products');
  console.log('   - Check server logs for detailed email/SMS delivery status');
}

// Check if fetch is available (Node.js 18+)
if (typeof fetch === 'undefined') {
  console.log('❌ This test requires Node.js 18+ or install node-fetch');
  console.log('   Run: npm install node-fetch');
  process.exit(1);
}

testAPI().catch(console.error);