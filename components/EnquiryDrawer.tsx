import React, { useState } from 'react';
import { X, MessageCircle, ArrowRight, Plus, Minus, Send } from 'lucide-react';
import { useApp } from '../contexts/AppContext';

const EnquiryDrawer: React.FC = () => {
  const { 
    enquiryItems, 
    isEnquiryOpen, 
    setIsEnquiryOpen, 
    removeFromEnquiry, 
    updateEnquiryItem, 
    enquiryCount,
    submitEnquiry,
    clearEnquiry
  } = useApp();

  const [contactInfo, setContactInfo] = useState({
    name: '',
    email: '',
    phone: '',
    company: ''
  });
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const handleSubmitEnquiry = async () => {
    if (!contactInfo.name || !contactInfo.email || !contactInfo.phone) {
      alert('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);
    try {
      await submitEnquiry(contactInfo, message);
      alert('Enquiry submitted successfully! We will contact you soon.');
      clearEnquiry();
      setContactInfo({ name: '', email: '', phone: '', company: '' });
      setMessage('');
      setShowForm(false);
      setIsEnquiryOpen(false);
    } catch (error) {
      alert('Failed to submit enquiry. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Overlay */}
      <div 
        className={`fixed inset-0 bg-black/40 z-[100000] transition-opacity duration-300 ${isEnquiryOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`} 
        onClick={() => setIsEnquiryOpen(false)}
      />
      
      {/* Drawer */}
      <div className={`fixed top-0 right-0 h-full w-full max-w-md bg-white z-[100001] transition-transform duration-500 transform border-l border-black ${isEnquiryOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-black">
            <h2 className="font-heading text-3xl tracking-tight">ENQUIRY LIST</h2>
            <button onClick={() => setIsEnquiryOpen(false)} className="p-2 hover:rotate-90 transition-transform">
              <X size={24} />
            </button>
          </div>

          {/* Content */}
          <div className="flex-grow overflow-y-auto p-6 space-y-6">
            {enquiryItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center space-y-6">
                <MessageCircle size={48} strokeWidth={1} className="text-zinc-300" />
                <p className="text-[11px] font-bold tracking-widest uppercase text-zinc-400">Your enquiry list is empty</p>
                <button 
                  onClick={() => setIsEnquiryOpen(false)}
                  className="bg-black text-white px-8 py-3 text-[11px] font-bold tracking-widest uppercase hover:bg-zinc-800 transition-colors"
                >
                  BROWSE PRODUCTS
                </button>
              </div>
            ) : (
              <>
                {!showForm ? (
                  <>
                    {enquiryItems.map((item) => (
                      <div key={`${item.id}-${item.selectedSize || 'default'}`} className="flex gap-4 p-4 border border-zinc-200">
                        <img 
                          src={item.image} 
                          alt={item.name}
                          className="w-20 h-20 object-cover border border-zinc-200 grayscale"
                        />
                        <div className="flex-grow">
                          <h3 className="text-sm font-bold tracking-tight uppercase leading-snug mb-1">
                            {item.name}
                          </h3>
                          {item.selectedSize && (
                            <p className="text-xs text-zinc-500 mb-1">Size: {item.selectedSize}</p>
                          )}
                          {item.quantity && (
                            <p className="text-xs text-zinc-500 mb-2">Qty: {item.quantity}</p>
                          )}
                          {item.notes && (
                            <p className="text-xs text-zinc-600 mb-2 italic">"{item.notes}"</p>
                          )}
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => updateEnquiryItem(item.id, { quantity: Math.max(1, (item.quantity || 1) - 1) })}
                                className="w-8 h-8 border border-black flex items-center justify-center hover:bg-black hover:text-white transition-colors"
                              >
                                <Minus size={12} />
                              </button>
                              <span className="w-8 text-center text-sm font-medium">{item.quantity || 1}</span>
                              <button
                                onClick={() => updateEnquiryItem(item.id, { quantity: (item.quantity || 1) + 1 })}
                                className="w-8 h-8 border border-black flex items-center justify-center hover:bg-black hover:text-white transition-colors"
                              >
                                <Plus size={12} />
                              </button>
                            </div>
                            
                            <button
                              onClick={() => removeFromEnquiry(item.id)}
                              className="text-xs text-red-600 hover:underline"
                            >
                              REMOVE
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </>
                ) : (
                  <div className="space-y-4">
                    <h3 className="font-heading text-xl tracking-tight mb-4">Contact Information</h3>
                    
                    <div>
                      <label className="block text-xs font-bold tracking-widest uppercase mb-2">Name *</label>
                      <input
                        type="text"
                        value={contactInfo.name}
                        onChange={(e) => setContactInfo(prev => ({ ...prev, name: e.target.value }))}
                        className="w-full px-3 py-2 border border-black text-sm focus:outline-none focus:ring-2 focus:ring-black focus:ring-inset"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-xs font-bold tracking-widest uppercase mb-2">Email *</label>
                      <input
                        type="email"
                        value={contactInfo.email}
                        onChange={(e) => setContactInfo(prev => ({ ...prev, email: e.target.value }))}
                        className="w-full px-3 py-2 border border-black text-sm focus:outline-none focus:ring-2 focus:ring-black focus:ring-inset"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-xs font-bold tracking-widest uppercase mb-2">Phone *</label>
                      <input
                        type="tel"
                        value={contactInfo.phone}
                        onChange={(e) => setContactInfo(prev => ({ ...prev, phone: e.target.value }))}
                        className="w-full px-3 py-2 border border-black text-sm focus:outline-none focus:ring-2 focus:ring-black focus:ring-inset"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-xs font-bold tracking-widest uppercase mb-2">Company</label>
                      <input
                        type="text"
                        value={contactInfo.company}
                        onChange={(e) => setContactInfo(prev => ({ ...prev, company: e.target.value }))}
                        className="w-full px-3 py-2 border border-black text-sm focus:outline-none focus:ring-2 focus:ring-black focus:ring-inset"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-xs font-bold tracking-widest uppercase mb-2">Message</label>
                      <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        rows={4}
                        placeholder="Please provide details about your requirements, timeline, and any specific customizations needed..."
                        className="w-full px-3 py-2 border border-black text-sm focus:outline-none focus:ring-2 focus:ring-black focus:ring-inset resize-none"
                      />
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Footer */}
          {enquiryItems.length > 0 && (
            <div className="border-t border-black p-6 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-bold tracking-widest uppercase">TOTAL ITEMS</span>
                <span className="text-lg font-bold">{enquiryCount}</span>
              </div>
              
              {!showForm ? (
                <>
                  <p className="text-xs text-zinc-500">Ready to submit your enquiry?</p>
                  
                  <button
                    onClick={() => setShowForm(true)}
                    className="w-full bg-black text-white py-4 text-[11px] font-bold tracking-widest uppercase hover:bg-zinc-800 transition-colors flex items-center justify-center gap-2"
                  >
                    PROCEED TO ENQUIRY
                    <ArrowRight size={16} />
                  </button>
                </>
              ) : (
                <div className="space-y-3">
                  <button
                    onClick={handleSubmitEnquiry}
                    disabled={isSubmitting}
                    className="w-full bg-black text-white py-4 text-[11px] font-bold tracking-widest uppercase hover:bg-zinc-800 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isSubmitting ? (
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
                  
                  <button 
                    onClick={() => setShowForm(false)}
                    className="w-full border border-black py-3 text-[11px] font-bold tracking-widest uppercase hover:bg-black hover:text-white transition-colors"
                  >
                    BACK TO ITEMS
                  </button>
                </div>
              )}
              
              <button 
                onClick={() => setIsEnquiryOpen(false)}
                className="w-full border border-black py-3 text-[11px] font-bold tracking-widest uppercase hover:bg-black hover:text-white transition-colors"
              >
                CONTINUE BROWSING
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default EnquiryDrawer;