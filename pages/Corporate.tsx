import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Product } from '../types';
import { useApp, ALL_PRODUCTS } from '../contexts/AppContext';
import { Link } from 'react-router-dom';

const Corporate: React.FC = () => {
  const { 
    addToCart, 
    cartCount, 
    requestQuote, 
    downloadCatalog, 
    bookConsultation,
    setSelectedProduct 
  } = useApp();

  // Filter corporate products from ALL_PRODUCTS
  const CORPORATE_PRODUCTS = ALL_PRODUCTS.filter(product => product.category === 'Corporate');

  const handleExploreCollection = () => {
    // Navigate to catalog with corporate filter
    window.location.href = '/catalog?category=Corporate';
  };

  const handleBrandConsultation = async () => {
    const contactInfo = {
      name: 'Corporate Brand Consultation',
      email: 'duraikannan73@gmail.com',
      phone: '+91 7338031038',
      organization: 'Corporate Client'
    };
    
    try {
      await bookConsultation('Brand Integration', contactInfo);
    } catch (error) {
      console.error('Consultation booking failed:', error);
    }
  };

  const handleBookFitting = async () => {
    const contactInfo = {
      name: 'Executive Fitting',
      email: 'duraikannan73@gmail.com',
      phone: '+91 9980667425',
      organization: 'Corporate Executive'
    };
    
    try {
      await bookConsultation('Executive Tailoring', contactInfo);
    } catch (error) {
      console.error('Fitting booking failed:', error);
    }
  };

  const handleGetPackage = async () => {
    const sampleProducts = CORPORATE_PRODUCTS.slice(0, 3).map(p => p.id);
    const message = 'Interested in corporate uniform packages for our organization. Please provide pricing and package details.';
    const contactInfo = {
      name: 'Corporate Package Request',
      email: 'duraikannan73@gmail.com',
      phone: '+91 7338031038',
      organization: 'Corporate Organization'
    };
    
    try {
      await requestQuote(sampleProducts, message, contactInfo);
    } catch (error) {
      console.error('Package request failed:', error);
    }
  };

  const handleRequestProposal = async () => {
    const sampleProducts = CORPORATE_PRODUCTS.map(p => p.id);
    const message = 'Request for corporate uniform proposal. Please include pricing, customization options, and delivery timelines.';
    const contactInfo = {
      name: 'Corporate Proposal Request',
      email: 'duraikannan73@gmail.com',
      phone: '+91 9980667425',
      organization: 'Corporate Organization'
    };
    
    try {
      await requestQuote(sampleProducts, message, contactInfo);
    } catch (error) {
      console.error('Proposal request failed:', error);
    }
  };

  const handleCorporateCatalog = () => {
    downloadCatalog();
  };

  const handleViewProduct = (product: Product) => {
    setSelectedProduct(product);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar cartCount={cartCount} />
      
      <main className="flex-grow pt-20">
        {/* Hero Section */}
        <section className="relative h-[70vh] w-full flex items-center justify-center border-b border-black">
          <div className="absolute inset-0">
            <img 
              src="/images/Business Suit 1.png" 
              alt="Corporate Uniforms" 
              className="w-full h-full object-cover grayscale brightness-60"
            />
            <div className="absolute inset-0 bg-black/30" />
          </div>
          <div className="relative z-10 text-center text-white">
            <div className="bg-white text-black inline-block px-4 py-2 text-[10px] font-bold tracking-widest uppercase border border-black mb-6">
              BUSINESS SOLUTIONS
            </div>
            <h1 className="font-heading text-8xl md:text-[140px] leading-[0.85] mb-8 drop-shadow-lg">
              CORPORATE <br/> UNIFORMS
            </h1>
            <p className="text-xl max-w-2xl mx-auto leading-relaxed mb-8">
              Professional business attire for corporations, hotels, and service industries
            </p>
            <button 
              onClick={handleExploreCollection}
              className="bg-amber-600 text-white px-10 py-4 text-[11px] font-bold tracking-widest uppercase hover:bg-black transition-colors"
            >
              EXPLORE COLLECTION
            </button>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-zinc-50 border-b border-black">
          <div className="max-w-[1200px] mx-auto px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold mb-2">300+</div>
                <div className="text-[11px] font-bold tracking-widest uppercase text-zinc-500">Corporate Clients</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">75,000+</div>
                <div className="text-[11px] font-bold tracking-widest uppercase text-zinc-500">Professionals Dressed</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">20+</div>
                <div className="text-[11px] font-bold tracking-widest uppercase text-zinc-500">Industries Served</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">99%</div>
                <div className="text-[11px] font-bold tracking-widest uppercase text-zinc-500">Client Satisfaction</div>
              </div>
            </div>
          </div>
        </section>

        {/* Product Grid */}
        <section className="py-24 border-b border-black">
          <div className="max-w-[1400px] mx-auto px-8">
            <div className="text-center mb-16">
              <h2 className="font-heading text-5xl tracking-tight mb-6">CORPORATE UNIFORM COLLECTION</h2>
              <p className="text-zinc-600 max-w-2xl mx-auto">
                Professional business attire designed to enhance corporate image and employee confidence
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {CORPORATE_PRODUCTS.map((product) => (
                <div key={product.id} className="group cursor-pointer border border-black hover:shadow-lg transition-all">
                  <div className="aspect-[3/4] overflow-hidden" onClick={() => handleViewProduct(product)}>
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover grayscale group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="p-6">
                    {product.isNew && (
                      <div className="bg-amber-600 text-white text-[9px] font-bold px-2 py-1 inline-block mb-3 tracking-widest">
                        NEW
                      </div>
                    )}
                    <h3 className="font-heading text-xl mb-2 group-hover:text-amber-600 transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-zinc-600 text-sm mb-4 leading-relaxed">
                      {product.description}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-2xl font-bold">{product.price}</span>
                      <button 
                        onClick={() => addToCart(product)}
                        className="bg-black text-white px-6 py-2 text-[10px] font-bold tracking-widest uppercase hover:bg-amber-600 transition-colors"
                      >
                        ADD TO CART
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Industries Section */}
        <section className="py-24 bg-zinc-50 border-b border-black">
          <div className="max-w-[1200px] mx-auto px-8">
            <div className="text-center mb-16">
              <h2 className="font-heading text-5xl tracking-tight mb-6">INDUSTRIES WE SERVE</h2>
              <p className="text-zinc-600 max-w-2xl mx-auto">
                Professional uniform solutions across diverse business sectors
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center p-6 border border-black bg-white">
                <div className="w-16 h-16 bg-black text-white flex items-center justify-center text-2xl font-bold mb-4 mx-auto">
                  🏢
                </div>
                <h3 className="font-heading text-lg mb-2">CORPORATE OFFICES</h3>
                <p className="text-zinc-600 text-sm">
                  Executive suits and business attire for corporate environments
                </p>
              </div>
              
              <div className="text-center p-6 border border-black bg-white">
                <div className="w-16 h-16 bg-black text-white flex items-center justify-center text-2xl font-bold mb-4 mx-auto">
                  🏨
                </div>
                <h3 className="font-heading text-lg mb-2">HOSPITALITY</h3>
                <p className="text-zinc-600 text-sm">
                  Hotel uniforms and service industry professional wear
                </p>
              </div>
              
              <div className="text-center p-6 border border-black bg-white">
                <div className="w-16 h-16 bg-black text-white flex items-center justify-center text-2xl font-bold mb-4 mx-auto">
                  🏦
                </div>
                <h3 className="font-heading text-lg mb-2">BANKING</h3>
                <p className="text-zinc-600 text-sm">
                  Professional banking attire and financial sector uniforms
                </p>
              </div>
              
              <div className="text-center p-6 border border-black bg-white">
                <div className="w-16 h-16 bg-black text-white flex items-center justify-center text-2xl font-bold mb-4 mx-auto">
                  ✈️
                </div>
                <h3 className="font-heading text-lg mb-2">AVIATION</h3>
                <p className="text-zinc-600 text-sm">
                  Airline uniforms and aviation industry professional wear
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-24 border-b border-black">
          <div className="max-w-[1200px] mx-auto px-8">
            <div className="text-center mb-16">
              <h2 className="font-heading text-5xl tracking-tight mb-6">CORPORATE SERVICES</h2>
              <p className="text-zinc-600 max-w-2xl mx-auto">
                Comprehensive uniform solutions for corporate organizations
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-8 border border-black">
                <h3 className="font-heading text-2xl mb-4">BRAND INTEGRATION</h3>
                <p className="text-zinc-600 mb-6 leading-relaxed">
                  Corporate logos, colors, and branding elements seamlessly 
                  integrated into uniform designs for consistent brand identity.
                </p>
                <button 
                  onClick={handleBrandConsultation}
                  className="text-[11px] font-bold tracking-widest uppercase border-b border-black pb-1 hover:text-amber-600 hover:border-amber-600 transition-all"
                >
                  BRAND CONSULTATION →
                </button>
              </div>
              
              <div className="bg-white p-8 border border-black">
                <h3 className="font-heading text-2xl mb-4">EXECUTIVE TAILORING</h3>
                <p className="text-zinc-600 mb-6 leading-relaxed">
                  Custom tailoring services for executives and senior management 
                  with premium fabrics and personalized fitting.
                </p>
                <button 
                  onClick={handleBookFitting}
                  className="text-[11px] font-bold tracking-widest uppercase border-b border-black pb-1 hover:text-amber-600 hover:border-amber-600 transition-all"
                >
                  BOOK FITTING →
                </button>
              </div>
              
              <div className="bg-white p-8 border border-black">
                <h3 className="font-heading text-2xl mb-4">CORPORATE PACKAGES</h3>
                <p className="text-zinc-600 mb-6 leading-relaxed">
                  Complete uniform packages for entire organizations with 
                  volume pricing and ongoing maintenance programs.
                </p>
                <button 
                  onClick={handleGetPackage}
                  className="text-[11px] font-bold tracking-widest uppercase border-b border-black pb-1 hover:text-amber-600 hover:border-amber-600 transition-all"
                >
                  GET PACKAGE →
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-black text-white">
          <div className="max-w-[1200px] mx-auto px-8 text-center">
            <h2 className="font-heading text-6xl tracking-tight mb-8">ELEVATE YOUR CORPORATE IMAGE</h2>
            <p className="text-xl mb-12 max-w-2xl mx-auto">
              Professional corporate uniforms that reflect your company's values and enhance your brand presence
            </p>
            <div className="flex gap-6 justify-center">
              <button 
                onClick={handleRequestProposal}
                className="bg-white text-black px-10 py-4 text-[11px] font-bold tracking-widest uppercase hover:bg-amber-600 hover:text-white transition-all"
              >
                REQUEST PROPOSAL
              </button>
              <button 
                onClick={handleCorporateCatalog}
                className="border border-white text-white px-10 py-4 text-[11px] font-bold tracking-widest uppercase hover:bg-white hover:text-black transition-all"
              >
                CORPORATE CATALOG
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Corporate;