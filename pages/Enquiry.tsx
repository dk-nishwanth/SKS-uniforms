import React, { useState } from 'react';
import { ArrowLeft, MessageCircle, Send, Shield, Check } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Enquiry: React.FC = () => {
  const { enquiryItems, clearEnquiry, enquiryCount, submitEnquiry } = useApp();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [enquiryComplete, setEnquiryComplete] = useState(false);
  const [formData, setFormData] = useState({
    // Contact Information
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    designation: '',
    
    // Address Information
    address: '',
    city: '',
    state: '',
    pincode: '',
    
    // Enquiry Details
    enquiryType: 'bulk_order',
    timeline: '',
    budget: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      await submitEnquiry(formData, formData.message);
      setEnquiryComplete(true);
      clearEnquiry();
      setIsProcessing(false);
    } catch (error) {
      alert('Failed to submit enquiry. Please try again.');
      setIsProcessing(false);
    }
  };

  if (enquiryItems.length === 0 && !enquiryComplete) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar enquiryCount={enquiryCount} />
        <div className="pt-20 flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <h1 className="font-heading text-3xl tracking-tight mb-4">Your enquiry list is empty</h1>
            <p className="text-zinc-600 mb-8">Add some items to your enquiry list before submitting.</p>
            <Link 
              to="/catalog"
              className="inline-block bg-black text-white px-8 py-3 text-sm font-bold tracking-widest uppercase hover:bg-zinc-800 transition-colors"
            >
              BROWSE PRODUCTS
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (enquiryComplete) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar enquiryCount={enquiryCount} />
        <div className="pt-20 flex items-center justify-center min-h-[60vh]">
          <div className="text-center max-w-md">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check size={32} className="text-green-600" />
            </div>
            <h1 className="font-heading text-3xl tracking-tight mb-4">Enquiry Submitted!</h1>
            <p className="text-zinc-600 mb-8">
              Thank you for your enquiry. Our team will review your requirements and contact you within 24 hours with a detailed quote and timeline.
            </p>
            <div className="space-y-3">
              <Link 
                to="/catalog"
                className="block bg-black text-white px-8 py-3 text-sm font-bold tracking-widest uppercase hover:bg-zinc-800 transition-colors"
              >
                CONTINUE BROWSING
              </Link>
              <Link 
                to="/"
                className="block border border-black px-8 py-3 text-sm font-bold tracking-widest uppercase hover:bg-black hover:text-white transition-colors"
              >
                BACK TO HOME
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar enquiryCount={enquiryCount} />
      
      <div className="pt-20">
        {/* Header */}
        <div className="border-b border-black">
          <div className="max-w-7xl mx-auto px-8 lg:px-12 py-8">
            <div className="flex items-center gap-4 mb-4">
              <Link 
                to="/catalog" 
                className="flex items-center gap-2 text-sm hover:underline"
              >
                <ArrowLeft size={16} />
                Back to Catalog
              </Link>
            </div>
            <h1 className="font-heading text-4xl tracking-tight">SUBMIT ENQUIRY</h1>
            <p className="text-zinc-600 mt-2">Get a customized quote for your uniform requirements</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="max-w-7xl mx-auto px-8 lg:px-12 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left Column - Forms */}
            <div className="lg:col-span-2 space-y-8">
              {/* Contact Information */}
              <div className="border border-black p-6">
                <h2 className="font-heading text-2xl tracking-tight mb-6 flex items-center gap-3">
                  <MessageCircle size={24} />
                  CONTACT INFORMATION
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold tracking-widest uppercase mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-black text-sm focus:outline-none focus:ring-2 focus:ring-black focus:ring-inset"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs font-bold tracking-widest uppercase mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
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
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-black text-sm focus:outline-none focus:ring-2 focus:ring-black focus:ring-inset"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs font-bold tracking-widest uppercase mb-2">
                      Company/Institution *
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-black text-sm focus:outline-none focus:ring-2 focus:ring-black focus:ring-inset"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs font-bold tracking-widest uppercase mb-2">
                      Designation
                    </label>
                    <input
                      type="text"
                      name="designation"
                      value={formData.designation}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-black text-sm focus:outline-none focus:ring-2 focus:ring-black focus:ring-inset"
                    />
                  </div>
                </div>
              </div>

              {/* Address Information */}
              <div className="border border-black p-6">
                <h2 className="font-heading text-2xl tracking-tight mb-6">ADDRESS INFORMATION</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold tracking-widest uppercase mb-2">
                      Address *
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-black text-sm focus:outline-none focus:ring-2 focus:ring-black focus:ring-inset"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs font-bold tracking-widest uppercase mb-2">
                      City *
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-black text-sm focus:outline-none focus:ring-2 focus:ring-black focus:ring-inset"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs font-bold tracking-widest uppercase mb-2">
                      State *
                    </label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-black text-sm focus:outline-none focus:ring-2 focus:ring-black focus:ring-inset"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs font-bold tracking-widest uppercase mb-2">
                      PIN Code *
                    </label>
                    <input
                      type="text"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-black text-sm focus:outline-none focus:ring-2 focus:ring-black focus:ring-inset"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Enquiry Details */}
              <div className="border border-black p-6">
                <h2 className="font-heading text-2xl tracking-tight mb-6">ENQUIRY DETAILS</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold tracking-widest uppercase mb-2">
                      Enquiry Type *
                    </label>
                    <select
                      name="enquiryType"
                      value={formData.enquiryType}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-black text-sm focus:outline-none focus:ring-2 focus:ring-black focus:ring-inset"
                      required
                    >
                      <option value="bulk_order">Bulk Order</option>
                      <option value="sample_request">Sample Request</option>
                      <option value="custom_design">Custom Design</option>
                      <option value="quote_request">Quote Request</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-xs font-bold tracking-widest uppercase mb-2">
                      Required Timeline
                    </label>
                    <input
                      type="text"
                      name="timeline"
                      value={formData.timeline}
                      onChange={handleInputChange}
                      placeholder="e.g., 2-3 weeks, ASAP, etc."
                      className="w-full px-4 py-3 border border-black text-sm focus:outline-none focus:ring-2 focus:ring-black focus:ring-inset"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs font-bold tracking-widest uppercase mb-2">
                      Budget Range
                    </label>
                    <input
                      type="text"
                      name="budget"
                      value={formData.budget}
                      onChange={handleInputChange}
                      placeholder="e.g., ₹50,000 - ₹1,00,000"
                      className="w-full px-4 py-3 border border-black text-sm focus:outline-none focus:ring-2 focus:ring-black focus:ring-inset"
                    />
                  </div>
                </div>
                
                <div className="mt-4">
                  <label className="block text-xs font-bold tracking-widest uppercase mb-2">
                    Additional Requirements
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Please provide details about quantities, customizations, embroidery requirements, special instructions, etc."
                    rows={6}
                    className="w-full px-4 py-3 border border-black text-sm focus:outline-none focus:ring-2 focus:ring-black focus:ring-inset resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Right Column - Enquiry Summary */}
            <div className="lg:col-span-1">
              <div className="border border-black p-6 sticky top-24">
                <h2 className="font-heading text-2xl tracking-tight mb-6">ENQUIRY SUMMARY</h2>
                
                <div className="space-y-4 mb-6">
                  {enquiryItems.map((item) => (
                    <div key={`${item.id}-${item.selectedSize}`} className="flex gap-4">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-16 h-16 object-cover border border-zinc-200 grayscale"
                      />
                      <div className="flex-grow">
                        <h3 className="text-sm font-medium">{item.name}</h3>
                        {item.selectedSize && (
                          <p className="text-xs text-zinc-500">Size: {item.selectedSize}</p>
                        )}
                        {item.quantity && (
                          <p className="text-xs text-zinc-500">Qty: {item.quantity}</p>
                        )}
                        {item.notes && (
                          <p className="text-xs text-zinc-600 italic">"{item.notes}"</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-zinc-200 pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Total Items:</span>
                    <span>{enquiryCount}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Enquiry Type:</span>
                    <span className="capitalize">{formData.enquiryType.replace('_', ' ')}</span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full mt-6 bg-black text-white py-4 text-sm font-bold tracking-widest uppercase hover:bg-zinc-800 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isProcessing ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      SUBMITTING...
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      SUBMIT ENQUIRY
                    </>
                  )}
                </button>

                <div className="mt-4 text-xs text-zinc-500 text-center">
                  <Shield size={12} className="inline mr-1" />
                  Your information is secure and will only be used to process your enquiry
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>

      <Footer />
    </div>
  );
};

export default Enquiry;