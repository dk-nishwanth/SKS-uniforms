const twilio = require('twilio');

class SMSService {
  constructor() {
    this.isConfigured = false;
    
    // Check if Twilio credentials are properly configured
    if (process.env.TWILIO_ACCOUNT_SID && 
        process.env.TWILIO_AUTH_TOKEN && 
        process.env.TWILIO_PHONE_NUMBER &&
        process.env.TWILIO_ACCOUNT_SID.startsWith('AC')) {
      
      try {
        this.client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
        this.fromNumber = process.env.TWILIO_PHONE_NUMBER;
        this.isConfigured = true;
        console.log('📱 SMS service configured successfully');
      } catch (error) {
        console.warn('⚠️ SMS service configuration failed:', error.message);
        this.isConfigured = false;
      }
    } else {
      console.warn('⚠️ SMS service not configured - missing Twilio credentials');
      console.warn('   Please set TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, and TWILIO_PHONE_NUMBER in .env');
    }
    
    this.contactNumbers = [
      process.env.CONTACT_PHONE_1,
      process.env.CONTACT_PHONE_2,
      process.env.CONTACT_PHONE_3
    ].filter(Boolean); // Remove any undefined numbers
  }

  async sendSMS(message, to) {
    if (!this.isConfigured) {
      console.log('📱 SMS not sent (service not configured):', { to, message: message.substring(0, 50) + '...' });
      return { success: false, error: 'SMS service not configured' };
    }

    try {
      const result = await this.client.messages.create({
        body: message,
        from: this.fromNumber,
        to: to
      });
      
      console.log(`📱 SMS sent successfully to ${to}:`, result.sid);
      return { success: true, to, sid: result.sid };
    } catch (error) {
      console.error(`❌ Error sending SMS to ${to}:`, error.message);
      return { success: false, to, error: error.message };
    }
  }

  async sendContactNotification(formData) {
    const { name, email, phone, organization, category, message, inquiryType } = formData;
    
    const smsMessage = `🔔 NEW ${inquiryType.toUpperCase()} - SKS Uniforms

👤 Name: ${name}
📧 Email: ${email}
${phone ? `📞 Phone: ${phone}` : ''}
${organization ? `🏢 Org: ${organization}` : ''}
${category ? `📋 Category: ${category}` : ''}

💬 Message: ${message.substring(0, 100)}${message.length > 100 ? '...' : ''}

⏰ ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}

Reply to customer at: ${email}`;

    const results = [];

    for (const contactNumber of this.contactNumbers) {
      const result = await this.sendSMS(smsMessage, contactNumber);
      results.push(result);
    }

    return results;
  }

  async sendEnquiryNotification(contactInfo, enquiryItems, message) {
    const { name, email, phone, company } = contactInfo;
    
    const itemsList = enquiryItems.slice(0, 3).map(item => 
      `• ${item.name} ${item.selectedSize ? `(${item.selectedSize})` : ''} ${item.quantity ? `x${item.quantity}` : ''}`
    ).join('\n');
    
    const moreItems = enquiryItems.length > 3 ? `\n...and ${enquiryItems.length - 3} more items` : '';
    
    const smsMessage = `🛍️ NEW ENQUIRY - SKS Uniforms

👤 ${name}
📧 ${email}
${phone ? `📞 ${phone}` : ''}
${company ? `🏢 ${company}` : ''}

📋 Items (${enquiryItems.length}):
${itemsList}${moreItems}

💬 ${message ? message.substring(0, 50) + (message.length > 50 ? '...' : '') : 'No message'}

⏰ ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}

Action: Prepare quote and respond to customer`;

    const results = [];

    for (const contactNumber of this.contactNumbers) {
      const result = await this.sendSMS(smsMessage, contactNumber);
      results.push(result);
    }

    return results;
  }

  async sendQuoteNotification(formData, productIds) {
    const { name, email, phone, organization } = formData;
    
    const smsMessage = `💰 QUOTE REQUEST - SKS Uniforms

👤 ${name}
📧 ${email}
${phone ? `📞 ${phone}` : ''}
${organization ? `🏢 ${organization}` : ''}

🛍️ Products: ${productIds.length} items
⏰ ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}

Urgent: Prepare quote for customer`;

    const results = [];

    for (const contactNumber of this.contactNumbers) {
      const result = await this.sendSMS(smsMessage, contactNumber);
      results.push(result);
    }

    return results;
  }

  async sendSampleRequestNotification(formData, productIds) {
    const { name, email, phone, address } = formData;
    
    const smsMessage = `📦 SAMPLE REQUEST - SKS Uniforms

👤 ${name}
📧 ${email}
${phone ? `📞 ${phone}` : ''}

📍 Address: ${address}
🛍️ Products: ${productIds.length} items
⏰ ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}

Action: Prepare samples for shipping`;

    const results = [];

    for (const contactNumber of this.contactNumbers) {
      const result = await this.sendSMS(smsMessage, contactNumber);
      results.push(result);
    }

    return results;
  }

  async sendConsultationNotification(consultationType, contactInfo) {
    const { name, email, phone, organization } = contactInfo;
    
    const smsMessage = `📅 CONSULTATION BOOKING - SKS Uniforms

🎯 Type: ${consultationType}
👤 ${name}
📧 ${email}
${phone ? `📞 ${phone}` : ''}
${organization ? `🏢 ${organization}` : ''}

⏰ ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}

Action: Schedule consultation call`;

    const results = [];

    for (const contactNumber of this.contactNumbers) {
      const result = await this.sendSMS(smsMessage, contactNumber);
      results.push(result);
    }

    return results;
  }

  // Test SMS functionality
  async sendTestSMS() {
    const testMessage = `🧪 TEST MESSAGE - SKS Uniforms API

This is a test message to verify SMS functionality.
⏰ ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}

If you receive this, SMS service is working correctly! ✅`;

    const results = [];

    for (const contactNumber of this.contactNumbers) {
      const result = await this.sendSMS(testMessage, contactNumber);
      results.push(result);
    }

    return results;
  }
}

module.exports = new SMSService();