import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useApp } from '../contexts/AppContext';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';

const Contact: React.FC = () => {
  const { cartCount } = useApp();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    organization: '',
    category: '',
    message: '',
    inquiryType: 'general'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  // Check for URL hash to scroll to specific sections
  useEffect(() => {
    const hash = window.location.hash;
    if (hash === '#quote') {
      setFormData(prev => ({ ...prev, inquiryType: 'quote' }));
      setTimeout(() => {
        document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else if (hash === '#samples') {
      setFormData(prev => ({ ...prev, inquiryType: 'samples' }));
      setTimeout(() => {
        document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Import API service
      const { default: apiService } = await import('../services/api');
      
      // Submit form data to backend
      const response = await apiService.submitContactForm(formData);
      
      if (response.success) {
        setSubmitMessage('Thank you for your inquiry! We will get back to you within 24 hours. Your message has been sent to our team and SMS notifications have been dispatched.');
        setFormData({
          name: '',
          email: '',
          phone: '',
          organization: '',
          category: '',
          message: '',
          inquiryType: 'general'
        });
      }
    } catch (error) {
      console.error('Contact form submission error:', error);
      setSubmitMessage('There was an error submitting your message. Please try again or contact us directly at duraikannan73@gmail.com or call +91 7338031038.');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitMessage(''), 8000);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar cartCount={cartCount} />
      
      <main className="flex-grow pt-20">
        {/* Hero Section */}
        <section className="relative h-[50vh] w-full flex items-center justify-center border-b border-black">
          <div className="absolute inset-0">
            <img 
              src="./components/Assets/Corporate Uniform 1.png" 
              alt="Contact SKS Uniforms" 
              className="w-full h-full object-cover grayscale brightness-40"
            />
            <div className="absolute inset-0 bg-black/50" />
          </div>
          <div className="relative z-10 text-center text-white">
            <h1 className="font-heading text-8xl md:text-[120px] leading-[0.85] mb-8 drop-shadow-lg">
              CONTACT <br/> US
            </h1>
            <p className="text-xl max-w-2xl mx-auto leading-relaxed">
              Get in touch for professional uniform solutions
            </p>
          </div>
        </section>

        {/* Contact Information */}
        <section className="py-24 border-b border-black">
          <div className="max-w-7xl mx-auto px-8 lg:px-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center p-8 border border-black">
                <MapPin size={32} className="mx-auto mb-4" />
                <h3 className="font-heading text-xl mb-4">VISIT US</h3>
                <p className="text-sm text-zinc-600 leading-relaxed">
                  SKS Uniforms<br/>
                  Arkolu, Ooty<br/>
                  The Nilgiris, Tamil Nadu<br/>
                  India - 643004
                </p>
              </div>
              
              <div className="text-center p-8 border border-black">
                <Phone size={32} className="mx-auto mb-4" />
                <h3 className="font-heading text-xl mb-4">CALL US</h3>
                <p className="text-sm text-zinc-600 leading-relaxed">
                  +91 7338031038<br/>
                  +91 9980667425<br/>
                  <span className="text-xs text-zinc-400">Mon-Sat: 9AM-6PM</span>
                </p>
              </div>
              
              <div className="text-center p-8 border border-black">
                <Mail size={32} className="mx-auto mb-4" />
                <h3 className="font-heading text-xl mb-4">EMAIL US</h3>
                <p className="text-sm text-zinc-600 leading-relaxed">
                  duraikannan73@gmail.com<br/>
                  duraikannan73@gmail.com<br/>
                  <span className="text-xs text-zinc-400">24/7 Support</span>
                </p>
              </div>
              
              <div className="text-center p-8 border border-black">
                <Clock size={32} className="mx-auto mb-4" />
                <h3 className="font-heading text-xl mb-4">HOURS</h3>
                <p className="text-sm text-zinc-600 leading-relaxed">
                  Monday - Friday<br/>
                  9:00 AM - 6:00 PM<br/>
                  Saturday: 9:00 AM - 4:00 PM<br/>
                  <span className="text-xs text-zinc-400">Sunday: Closed</span>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section id="contact-form" className="py-24 bg-zinc-50 border-b border-black">
          <div className="max-w-4xl mx-auto px-8 lg:px-12">
            <div className="text-center mb-16">
              <h2 className="font-heading text-5xl tracking-tight mb-6">GET IN TOUCH</h2>
              <p className="text-zinc-600 max-w-2xl mx-auto">
                Ready to discuss your uniform requirements? Fill out the form below and we'll get back to you within 24 hours.
              </p>
            </div>

            {submitMessage && (
              <div className="mb-8 p-4 bg-green-50 border border-green-200 text-green-800 text-center">
                {submitMessage}
              </div>
            )}

            <form onSubmit={handleSubmit} className="bg-white border border-black p-8 md:p-12">
              {/* Inquiry Type */}
              <div className="mb-8">
                <label className="block text-xs font-bold tracking-widest uppercase mb-4">
                  INQUIRY TYPE
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { value: 'general', label: 'General Inquiry' },
                    { value: 'quote', label: 'Request Quote' },
                    { value: 'samples', label: 'Request Samples' }
                  ].map((type) => (
                    <label key={type.value} className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="inquiryType"
                        value={type.value}
                        checked={formData.inquiryType === type.value}
                        onChange={handleInputChange}
                        className="w-4 h-4"
                      />
                      <span className="text-sm font-medium">{type.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-xs font-bold tracking-widest uppercase mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-black text-sm focus:outline-none focus:ring-2 focus:ring-black focus:ring-inset"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-xs font-bold tracking-widest uppercase mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-black text-sm focus:outline-none focus:ring-2 focus:ring-black focus:ring-inset"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-xs font-bold tracking-widest uppercase mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-black text-sm focus:outline-none focus:ring-2 focus:ring-black focus:ring-inset"
                  />
                </div>
                
                <div>
                  <label className="block text-xs font-bold tracking-widest uppercase mb-2">
                    Organization/Institution
                  </label>
                  <input
                    type="text"
                    name="organization"
                    value={formData.organization}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-black text-sm focus:outline-none focus:ring-2 focus:ring-black focus:ring-inset"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-xs font-bold tracking-widest uppercase mb-2">
                  Uniform Category
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-black text-sm focus:outline-none focus:ring-2 focus:ring-black focus:ring-inset"
                >
                  <option value="">Select Category</option>
                  <option value="schools">School Uniforms</option>
                  <option value="healthcare">Healthcare Uniforms</option>
                  <option value="corporate">Corporate Uniforms</option>
                  <option value="accessories">Accessories</option>
                  <option value="multiple">Multiple Categories</option>
                </select>
              </div>

              <div className="mb-8">
                <label className="block text-xs font-bold tracking-widest uppercase mb-2">
                  Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={6}
                  placeholder="Please provide details about your requirements, quantity needed, timeline, and any specific customization needs..."
                  className="w-full px-4 py-3 border border-black text-sm focus:outline-none focus:ring-2 focus:ring-black focus:ring-inset resize-none"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-black text-white py-4 text-sm font-bold tracking-widest uppercase hover:bg-zinc-800 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    SENDING MESSAGE...
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    SEND MESSAGE
                  </>
                )}
              </button>
            </form>
          </div>
        </section>

        {/* Map Section */}
        <section className="py-24 border-b border-black">
          <div className="max-w-7xl mx-auto px-8 lg:px-12">
            <div className="text-center mb-16">
              <h2 className="font-heading text-5xl tracking-tight mb-6">FIND US</h2>
              <p className="text-zinc-600 max-w-2xl mx-auto">
                Located in the beautiful hills of Ooty, The Nilgiris. Visit our facility to see our production process and quality standards.
              </p>
            </div>
            
            <div className="bg-zinc-200 h-96 border border-black flex items-center justify-center">
              <div className="text-center">
                <MapPin size={48} className="mx-auto mb-4 text-zinc-500" />
                <p className="text-zinc-600 font-medium">Interactive Map Coming Soon</p>
                <p className="text-sm text-zinc-500 mt-2">
                  SKS Uniforms, Arkolu, Ooty, The Nilgiris, Tamil Nadu - 643004
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;