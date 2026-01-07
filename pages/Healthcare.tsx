import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useApp, ALL_PRODUCTS } from '../contexts/AppContext';
import { Heart, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const Healthcare: React.FC = () => {
  const { 
    addToEnquiry, 
    addToWishlist, 
    removeFromWishlist, 
    isInWishlist, 
    setSelectedProduct,
    enquiryCount 
  } = useApp();

  // Filter products for Healthcare category
  const healthcareProducts = ALL_PRODUCTS.filter(product => product.category === 'Healthcare');

  const handleAddToEnquiry = (product: any) => {
    addToEnquiry(product);
  };

  const handleWishlistToggle = (product: any) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const handleViewDetails = (product: any) => {
    setSelectedProduct(product);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar enquiryCount={enquiryCount} />
      
      <main className="flex-grow pt-20">
        {/* Hero Section */}
        <section className="relative h-[70vh] w-full flex items-center justify-center border-b border-black">
          <div className="absolute inset-0">
            <img 
              src="/images/Medical Uniform 1.png" 
              alt="Healthcare Uniforms" 
              className="w-full h-full object-cover grayscale brightness-60"
            />
            <div className="absolute inset-0 bg-black/30" />
          </div>
          <div className="relative z-10 text-center text-white">
            <div className="bg-white text-black inline-block px-4 py-2 text-[10px] font-bold tracking-widest uppercase border border-black mb-6">
              MEDICAL PROFESSIONALS
            </div>
            <h1 className="font-heading text-8xl md:text-[140px] leading-[0.85] mb-8 drop-shadow-lg">
              HEALTHCARE <br/> UNIFORMS
            </h1>
            <p className="text-xl max-w-2xl mx-auto leading-relaxed mb-8">
              Professional medical uniforms for hospitals, clinics, and healthcare facilities
            </p>
            <Link 
              to="/catalog?filter=healthcare"
              className="bg-amber-600 text-white px-10 py-4 text-[11px] font-bold tracking-widest uppercase hover:bg-black transition-colors inline-block"
            >
              EXPLORE COLLECTION
            </Link>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-zinc-50 border-b border-black">
          <div className="max-w-[1200px] mx-auto px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold mb-2">200+</div>
                <div className="text-[11px] font-bold tracking-widest uppercase text-zinc-500">Healthcare Facilities</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">25,000+</div>
                <div className="text-[11px] font-bold tracking-widest uppercase text-zinc-500">Medical Professionals</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">ISO</div>
                <div className="text-[11px] font-bold tracking-widest uppercase text-zinc-500">Quality Certified</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">24/7</div>
                <div className="text-[11px] font-bold tracking-widest uppercase text-zinc-500">Support Available</div>
              </div>
            </div>
          </div>
        </section>

        {/* Product Grid */}
        <section className="py-24 border-b border-black">
          <div className="max-w-[1400px] mx-auto px-8">
            <div className="text-center mb-16">
              <h2 className="font-heading text-5xl tracking-tight mb-6">MEDICAL UNIFORM COLLECTION</h2>
              <p className="text-zinc-600 max-w-2xl mx-auto">
                Comprehensive range of healthcare uniforms designed for comfort, hygiene, and professional standards
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {healthcareProducts.map((product) => (
                <div key={product.id} className="group cursor-pointer border border-black hover:shadow-lg transition-all">
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                      onClick={() => handleViewDetails(product)}
                    />
                    {product.isNew && (
                      <div className="absolute top-4 left-4 bg-amber-600 text-white text-[9px] font-bold px-2 py-1 tracking-widest">
                        NEW
                      </div>
                    )}
                    <button
                      onClick={() => handleWishlistToggle(product)}
                      className="absolute top-4 right-4 p-2 bg-white/90 rounded-full hover:bg-white transition-colors"
                    >
                      <Heart size={16} className={isInWishlist(product.id) ? 'fill-red-500 text-red-500' : ''} />
                    </button>
                    
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                      <button 
                        onClick={() => handleViewDetails(product)}
                        className="bg-white text-black px-6 py-2 text-[10px] font-bold tracking-widest uppercase border border-black transform translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 hover:bg-black hover:text-white"
                      >
                        VIEW DETAILS
                      </button>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="font-heading text-lg mb-2 group-hover:text-amber-600 transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-zinc-600 text-sm mb-4 leading-relaxed line-clamp-2">
                      {product.description}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-amber-600">REQUEST QUOTE</span>
                      <button 
                        onClick={() => handleAddToEnquiry(product)}
                        className="flex items-center gap-2 bg-black text-white px-4 py-2 text-[9px] font-bold tracking-widest uppercase hover:bg-amber-600 transition-colors"
                      >
                        <MessageCircle size={12} />
                        ADD TO ENQUIRY
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Standards Section */}
        <section className="py-24 bg-zinc-50 border-b border-black">
          <div className="max-w-[1200px] mx-auto px-8">
            <div className="text-center mb-16">
              <h2 className="font-heading text-5xl tracking-tight mb-6">MEDICAL STANDARDS</h2>
              <p className="text-zinc-600 max-w-2xl mx-auto">
                Our healthcare uniforms meet the highest medical and safety standards
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-black text-white flex items-center justify-center text-xl font-bold mb-4 mx-auto">
                  ✓
                </div>
                <h3 className="font-heading text-lg mb-2">ANTIMICROBIAL</h3>
                <p className="text-zinc-600 text-sm">
                  Fabric treated with antimicrobial properties for enhanced hygiene
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-black text-white flex items-center justify-center text-xl font-bold mb-4 mx-auto">
                  ✓
                </div>
                <h3 className="font-heading text-lg mb-2">FLUID RESISTANT</h3>
                <p className="text-zinc-600 text-sm">
                  Protection against fluid penetration and staining
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-black text-white flex items-center justify-center text-xl font-bold mb-4 mx-auto">
                  ✓
                </div>
                <h3 className="font-heading text-lg mb-2">EASY CARE</h3>
                <p className="text-zinc-600 text-sm">
                  Machine washable with industrial-grade durability
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-black text-white flex items-center justify-center text-xl font-bold mb-4 mx-auto">
                  ✓
                </div>
                <h3 className="font-heading text-lg mb-2">COMFORT FIT</h3>
                <p className="text-zinc-600 text-sm">
                  Ergonomic design for long shifts and active movement
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-24 border-b border-black">
          <div className="max-w-[1200px] mx-auto px-8">
            <div className="text-center mb-16">
              <h2 className="font-heading text-5xl tracking-tight mb-6">HEALTHCARE SERVICES</h2>
              <p className="text-zinc-600 max-w-2xl mx-auto">
                Specialized services for medical institutions and healthcare professionals
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-8 border border-black">
                <h3 className="font-heading text-2xl mb-4">HOSPITAL PARTNERSHIPS</h3>
                <p className="text-zinc-600 mb-6 leading-relaxed">
                  Long-term partnerships with hospitals and clinics for consistent 
                  uniform supply and maintenance programs.
                </p>
                <Link 
                  to="/contact"
                  className="text-[11px] font-bold tracking-widest uppercase border-b border-black pb-1 hover:text-amber-600 hover:border-amber-600 transition-all"
                >
                  PARTNER WITH US →
                </Link>
              </div>
              
              <div className="bg-white p-8 border border-black">
                <h3 className="font-heading text-2xl mb-4">CUSTOM EMBROIDERY</h3>
                <p className="text-zinc-600 mb-6 leading-relaxed">
                  Hospital logos, department names, and individual name tags 
                  embroidered with medical-grade threads.
                </p>
                <Link 
                  to="/contact"
                  className="text-[11px] font-bold tracking-widest uppercase border-b border-black pb-1 hover:text-amber-600 hover:border-amber-600 transition-all"
                >
                  CUSTOMIZE NOW →
                </Link>
              </div>
              
              <div className="bg-white p-8 border border-black">
                <h3 className="font-heading text-2xl mb-4">RAPID DELIVERY</h3>
                <p className="text-zinc-600 mb-6 leading-relaxed">
                  Emergency uniform supply and rapid delivery services for 
                  urgent healthcare facility requirements.
                </p>
                <Link 
                  to="/contact"
                  className="text-[11px] font-bold tracking-widest uppercase border-b border-black pb-1 hover:text-amber-600 hover:border-amber-600 transition-all"
                >
                  URGENT ORDER →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-black text-white">
          <div className="max-w-[1200px] mx-auto px-8 text-center">
            <h2 className="font-heading text-6xl tracking-tight mb-8">EQUIP YOUR HEALTHCARE TEAM</h2>
            <p className="text-xl mb-12 max-w-2xl mx-auto">
              Professional medical uniforms that meet the highest standards of quality and hygiene
            </p>
            <div className="flex gap-6 justify-center">
              <Link 
                to="/contact"
                className="bg-white text-black px-10 py-4 text-[11px] font-bold tracking-widest uppercase hover:bg-amber-600 hover:text-white transition-all"
              >
                REQUEST QUOTE
              </Link>
              <Link 
                to="/catalog"
                className="border border-white text-white px-10 py-4 text-[11px] font-bold tracking-widest uppercase hover:bg-white hover:text-black transition-all"
              >
                MEDICAL CATALOG
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Healthcare;