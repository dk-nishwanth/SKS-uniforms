const nodemailer = require('nodemailer');

class EmailService {
  constructor() {
    this.transporter = nodemailer.createTransporter({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      },
      tls: {
        rejectUnauthorized: false
      }
    });
  }

  async sendContactFormEmail(formData) {
    const { name, email, phone, organization, category, message, inquiryType } = formData;
    
    const subject = `New ${inquiryType} from SKS Uniforms Website - ${name}`;
    
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #000; color: white; padding: 20px; text-align: center; }
          .content { padding: 20px; background-color: #f9f9f9; }
          .field { margin-bottom: 15px; }
          .label { font-weight: bold; color: #000; }
          .value { margin-top: 5px; padding: 8px; background-color: white; border-left: 4px solid #000; }
          .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>SKS UNIFORMS</h1>
            <p>New Contact Form Submission</p>
          </div>
          
          <div class="content">
            <div class="field">
              <div class="label">Inquiry Type:</div>
              <div class="value">${inquiryType.toUpperCase()}</div>
            </div>
            
            <div class="field">
              <div class="label">Full Name:</div>
              <div class="value">${name}</div>
            </div>
            
            <div class="field">
              <div class="label">Email Address:</div>
              <div class="value">${email}</div>
            </div>
            
            ${phone ? `
            <div class="field">
              <div class="label">Phone Number:</div>
              <div class="value">${phone}</div>
            </div>
            ` : ''}
            
            ${organization ? `
            <div class="field">
              <div class="label">Organization/Institution:</div>
              <div class="value">${organization}</div>
            </div>
            ` : ''}
            
            ${category ? `
            <div class="field">
              <div class="label">Uniform Category:</div>
              <div class="value">${category}</div>
            </div>
            ` : ''}
            
            <div class="field">
              <div class="label">Message:</div>
              <div class="value">${message}</div>
            </div>
          </div>
          
          <div class="footer">
            <p>This email was sent from the SKS Uniforms website contact form.</p>
            <p>Submitted on: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</p>
            <p>SKS Uniforms - Professional Solutions for Every Institution</p>
            <p>📧 duraikannan73@gmail.com | 📞 7338031038 | 9980667425</p>
          </div>
        </div>
      </body>
      </html>
    `;

    const mailOptions = {
      from: `"SKS Uniforms Website" <${process.env.EMAIL_FROM}>`,
      to: process.env.EMAIL_FROM,
      subject: subject,
      html: htmlContent,
      replyTo: email
    };

    try {
      const result = await this.transporter.sendMail(mailOptions);
      console.log('📧 Contact form email sent successfully:', result.messageId);
      return { success: true, messageId: result.messageId };
    } catch (error) {
      console.error('❌ Error sending contact form email:', error);
      throw error;
    }
  }

  async sendAutoReplyEmail(customerEmail, customerName, inquiryType) {
    const subject = `Thank you for contacting SKS Uniforms - ${customerName}`;
    
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #000; color: white; padding: 20px; text-align: center; }
          .content { padding: 20px; background-color: #f9f9f9; }
          .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
          .contact-info { background-color: white; padding: 15px; margin: 20px 0; border-left: 4px solid #000; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>SKS UNIFORMS</h1>
            <p>Professional Solutions for Every Institution</p>
          </div>
          
          <div class="content">
            <h2>Dear ${customerName},</h2>
            
            <p>Thank you for your ${inquiryType} through our website. We have received your message and will get back to you within 24 hours.</p>
            
            <p>At SKS Uniforms, we are committed to providing high-quality professional uniforms for educational institutions, healthcare facilities, and corporate organizations across India.</p>
            
            <div class="contact-info">
              <h3>Our Contact Information:</h3>
              <p><strong>📧 Email:</strong> duraikannan73@gmail.com</p>
              <p><strong>📞 Phone:</strong> +91 7338031038 | +91 9980667425</p>
              <p><strong>📍 Address:</strong> #1, 1st Floor, Sattar Building, Behind BSC Bata, Commercial Road, Ooty, The Nilgiris - 643001, Tamil Nadu, India</p>
              <p><strong>🌐 Website:</strong> www.sksuniforms.com</p>
            </div>
            
            <p>For urgent inquiries, please feel free to call us directly at the numbers above.</p>
            
            <p>Thank you for choosing SKS Uniforms!</p>
            
            <p>Best regards,<br>
            <strong>SKS Uniforms Team</strong><br>
            Quality • Precision • Trust</p>
          </div>
          
          <div class="footer">
            <p>This is an automated response. Please do not reply to this email.</p>
            <p>SKS Uniforms - Professional Solutions for Every Institution</p>
          </div>
        </div>
      </body>
      </html>
    `;

    const mailOptions = {
      from: `"SKS Uniforms" <${process.env.EMAIL_FROM}>`,
      to: customerEmail,
      subject: subject,
      html: htmlContent
    };

    try {
      const result = await this.transporter.sendMail(mailOptions);
      console.log('📧 Auto-reply email sent successfully:', result.messageId);
      return { success: true, messageId: result.messageId };
    } catch (error) {
      console.error('❌ Error sending auto-reply email:', error);
      throw error;
    }
  }

  async sendNewsletterConfirmation(email, categories) {
    const subject = 'Welcome to SKS Uniforms Newsletter!';
    
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #000; color: white; padding: 20px; text-align: center; }
          .content { padding: 20px; background-color: #f9f9f9; }
          .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>SKS UNIFORMS</h1>
            <p>Welcome to Our Newsletter!</p>
          </div>
          
          <div class="content">
            <h2>Thank you for subscribing!</h2>
            <p>You have successfully subscribed to the SKS Uniforms newsletter.</p>
            <p><strong>Selected Categories:</strong> ${categories.join(', ')}</p>
            <p>You'll receive updates about new products, special offers, and industry news.</p>
          </div>
          
          <div class="footer">
            <p>SKS Uniforms - Professional Solutions for Every Institution</p>
          </div>
        </div>
      </body>
      </html>
    `;

    const mailOptions = {
      from: `"SKS Uniforms" <${process.env.EMAIL_FROM}>`,
      to: email,
      subject: subject,
      html: htmlContent
    };

    try {
      const result = await this.transporter.sendMail(mailOptions);
      console.log('📧 Newsletter confirmation email sent successfully:', result.messageId);
      return { success: true, messageId: result.messageId };
    } catch (error) {
      console.error('❌ Error sending newsletter confirmation email:', error);
      throw error;
    }
  }
}

module.exports = new EmailService();