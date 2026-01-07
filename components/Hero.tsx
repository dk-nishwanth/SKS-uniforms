import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';

const Hero: React.FC = () => {
  const { requestQuote } = useApp();

  const handleGetQuote = async () => {
    // Sample quote request
    const sampleProducts = ['s1', 'c1', 'h1']; // Sample product IDs
    const message = 'Interested in getting a quote for uniform requirements. Please contact me with pricing and availability.';
    const contactInfo = {
      name: 'Potential Customer',
      email: 'duraikannan73@gmail.com',
      phone: '+91 7338031038',
      organization: 'Sample Organization'
    };
    
    try {
      await requestQuote(sampleProducts, message, contactInfo);
    } catch (error) {
      console.error('Quote request failed:', error);
      // Fallback to contact page
      window.location.href = '/contact#quote';
    }
  };

  return (
    <section className="relative h-screen w-full flex flex-col md:flex-row border-b border-black">
      {/* Left Pane */}
      <div className="relative flex-1 h-1/2 md:h-full overflow-hidden group">
        <img 
          src="/images/Business Suit 1.png" 
          alt="Professional Uniforms" 
          className="w-full h-full object-cover grayscale brightness-75 transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/20" />
        
        {/* Content Overlay */}
        <div className="absolute bottom-16 left-12 max-w-lg z-10">
          <div className="bg-white text-black inline-block px-3 py-1 text-[10px] font-bold tracking-widest uppercase border border-black mb-6">
            ARKOLU
          </div>
          <h1 className="font-heading text-8xl md:text-[140px] leading-[0.85] text-white mb-8 drop-shadow-lg">
            SKS <br/> UNIFORMS
          </h1>
          <div className="flex gap-3">
            <button 
              onClick={handleGetQuote}
              className="bg-[#b38e5d] text-white px-8 py-3 text-[11px] font-bold tracking-widest uppercase hover:bg-black transition-colors"
            >
              GET QUOTE
            </button>
            <Link 
              to="/catalog"
              className="bg-transparent border border-white text-white px-8 py-3 text-[11px] font-bold tracking-widest uppercase hover:bg-white hover:text-black transition-all inline-block"
            >
              VIEW CATALOG
            </Link>
          </div>
        </div>
        
        {/* Navigation Dots (Visual Only) */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
            <div className="w-2 h-2 rounded-full bg-white" />
            <div className="w-2 h-2 rounded-full bg-white/30" />
        </div>
      </div>

      {/* Right Pane (Image Only) */}
      <div className="hidden md:block flex-1 h-full overflow-hidden">
        <img 
          src="/images/School Uniform 1.png" 
          alt="School Uniforms" 
          className="w-full h-full object-cover grayscale brightness-50"
        />
      </div>
    </section>
  );
};

export default Hero;