const twilio = require('twilio');

class SMSService {
  constructor() {
    this.client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
    this.fromNumber = process.env.TWILIO_PHONE_NUMBER;
    this.contactNumbers = [
      process.env.CONTACT_PHONE_1,
      process.env.CONTACT_PHONE_2
    ].filter(Boolean); // Remove any undefined numbers
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
      try {
        const result = await this.client.messages.create({
          body: smsMessage,
          from: this.fromNumber,
          to: contactNumber
        });
        
        console.log(`📱 SMS sent successfully to ${contactNumber}:`, result.sid);
        results.push({
          success: true,
          to: contactNumber,
          sid: result.sid
        });
      } catch (error) {
        console.error(`❌ Error sending SMS to ${contactNumber}:`, error.message);
        results.push({
          success: false,
          to: contactNumber,
          error: error.message
        });
      }
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
      try {
        const result = await this.client.messages.create({
          body: smsMessage,
          from: this.fromNumber,
          to: contactNumber
        });
        
        console.log(`📱 Quote SMS sent successfully to ${contactNumber}:`, result.sid);
        results.push({
          success: true,
          to: contactNumber,
          sid: result.sid
        });
      } catch (error) {
        console.error(`❌ Error sending quote SMS to ${contactNumber}:`, error.message);
        results.push({
          success: false,
          to: contactNumber,
          error: error.message
        });
      }
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
      try {
        const result = await this.client.messages.create({
          body: smsMessage,
          from: this.fromNumber,
          to: contactNumber
        });
        
        console.log(`📱 Sample request SMS sent successfully to ${contactNumber}:`, result.sid);
        results.push({
          success: true,
          to: contactNumber,
          sid: result.sid
        });
      } catch (error) {
        console.error(`❌ Error sending sample request SMS to ${contactNumber}:`, error.message);
        results.push({
          success: false,
          to: contactNumber,
          error: error.message
        });
      }
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
      try {
        const result = await this.client.messages.create({
          body: smsMessage,
          from: this.fromNumber,
          to: contactNumber
        });
        
        console.log(`📱 Consultation SMS sent successfully to ${contactNumber}:`, result.sid);
        results.push({
          success: true,
          to: contactNumber,
          sid: result.sid
        });
      } catch (error) {
        console.error(`❌ Error sending consultation SMS to ${contactNumber}:`, error.message);
        results.push({
          success: false,
          to: contactNumber,
          error: error.message
        });
      }
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
      try {
        const result = await this.client.messages.create({
          body: testMessage,
          from: this.fromNumber,
          to: contactNumber
        });
        
        console.log(`📱 Test SMS sent successfully to ${contactNumber}:`, result.sid);
        results.push({
          success: true,
          to: contactNumber,
          sid: result.sid
        });
      } catch (error) {
        console.error(`❌ Error sending test SMS to ${contactNumber}:`, error.message);
        results.push({
          success: false,
          to: contactNumber,
          error: error.message
        });
      }
    }

    return results;
  }
}

module.exports = new SMSService();