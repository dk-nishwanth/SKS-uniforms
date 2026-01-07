import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Product } from '../types';

const HEALTHCARE_PRODUCTS: Product[] = [
  {
    id: 'h1',
    name: 'MEDICAL SCRUBS - WHITE',
    price: '₹1,800',
    category: 'Healthcare',
    image: '/images/Medical Uniform 1.png',
    description: 'Comfortable and durable medical scrubs for healthcare professionals.',
    isNew: true
  },
  {
    id: 'h2',
    name: 'HOSPITAL UNIFORM - WHITE',
    price: '₹2,200',
    category: 'Healthcare',
    image: '/images/Hospital Uniform 1.png',
    description: 'Classic hospital uniform with modern cut and professional finish.',
    isNew: true
  },
  {
    id: 'h3',
    name: 'DOCTOR COAT - WHITE',
    price: '₹2,800',
    category: 'Healthcare',
    image: '/images/Medical Uniform 1.png',
    description: 'Professional doctor coat with multiple pockets and comfortable fit.',
    isNew: false
  },
  {
    id: 'h4',
    name: 'NURSE UNIFORM - BLUE TRIM',
    price: '₹2,000',
    category: 'Healthcare',
    image: '/images/Hospital Uniform 1.png',
    description: 'Modern nurse uniform with blue trim and ergonomic design.',
    isNew: false
  },
  {
    id: 'h5',
    name: 'SURGICAL SCRUBS - GREEN',
    price: '₹2,100',
    category: 'Healthcare',
    image: '/images/Medical Uniform 1.png',
    description: 'Sterile surgical scrubs for operating room professionals.',
    isNew: true
  },
  {
    id: 'h6',
    name: 'LAB COAT - LONG SLEEVE',
    price: '₹1,900',
    category: 'Healthcare',
    image: '/images/Hospital Uniform 1.png',
    description: 'Laboratory coat with chemical-resistant fabric and secure closures.',
    isNew: false
  }
];

const Healthcare: React.FC = () => {
  const [cartItems, setCartItems] = useState<Product[]>([]);

  const addToCart = (product: Product) => {
    setCartItems(prev => [...prev, product]);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar cartCount={cartItems.length} />
      
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
            <button className="bg-amber-600 text-white px-10 py-4 text-[11px] font-bold tracking-widest uppercase hover:bg-black transition-colors">
              EXPLORE COLLECTION
            </button>
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
              {HEALTHCARE_PRODUCTS.map((product) => (
                <div key={product.id} className="group cursor-pointer border border-black hover:shadow-lg transition-all">
                  <div className="aspect-[3/4] overflow-hidden">
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
                <button className="text-[11px] font-bold tracking-widest uppercase border-b border-black pb-1 hover:text-amber-600 hover:border-amber-600 transition-all">
                  PARTNER WITH US →
                </button>
              </div>
              
              <div className="bg-white p-8 border border-black">
                <h3 className="font-heading text-2xl mb-4">CUSTOM EMBROIDERY</h3>
                <p className="text-zinc-600 mb-6 leading-relaxed">
                  Hospital logos, department names, and individual name tags 
                  embroidered with medical-grade threads.
                </p>
                <button className="text-[11px] font-bold tracking-widest uppercase border-b border-black pb-1 hover:text-amber-600 hover:border-amber-600 transition-all">
                  CUSTOMIZE NOW →
                </button>
              </div>
              
              <div className="bg-white p-8 border border-black">
                <h3 className="font-heading text-2xl mb-4">RAPID DELIVERY</h3>
                <p className="text-zinc-600 mb-6 leading-relaxed">
                  Emergency uniform supply and rapid delivery services for 
                  urgent healthcare facility requirements.
                </p>
                <button className="text-[11px] font-bold tracking-widest uppercase border-b border-black pb-1 hover:text-amber-600 hover:border-amber-600 transition-all">
                  URGENT ORDER →
                </button>
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
              <button className="bg-white text-black px-10 py-4 text-[11px] font-bold tracking-widest uppercase hover:bg-amber-600 hover:text-white transition-all">
                REQUEST QUOTE
              </button>
              <button className="border border-white text-white px-10 py-4 text-[11px] font-bold tracking-widest uppercase hover:bg-white hover:text-black transition-all">
                MEDICAL CATALOG
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Healthcare;