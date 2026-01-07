import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const About: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar cartCount={0} />
      
      <main className="flex-grow pt-20">
        {/* Hero Section */}
        <section className="relative h-[60vh] w-full flex items-center justify-center border-b border-black">
          <div className="absolute inset-0">
            <img 
              src="/images/Corporate Uniform 2.png" 
              alt="About SKS Uniforms" 
              className="w-full h-full object-cover grayscale brightness-50"
            />
            <div className="absolute inset-0 bg-black/40" />
          </div>
          <div className="relative z-10 text-center text-white">
            <h1 className="font-heading text-8xl md:text-[120px] leading-[0.85] mb-8 drop-shadow-lg">
              ABOUT <br/> SKS UNIFORMS
            </h1>
            <p className="text-xl max-w-2xl mx-auto leading-relaxed">
              Professional Solutions for Every Institution
            </p>
          </div>
        </section>

        {/* Company Story */}
        <section className="py-24 border-b border-black">
          <div className="max-w-[1200px] mx-auto px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <div className="text-[10px] font-bold tracking-[0.5em] text-amber-600 mb-6 uppercase">Our Story</div>
                <h2 className="font-heading text-6xl tracking-tight leading-none mb-8">CRAFTING PROFESSIONAL IDENTITY</h2>
                <p className="text-zinc-600 leading-relaxed mb-6">
                  Located in the heart of Ooty, The Nilgiris, SKS Uniforms has been dedicated to providing 
                  high-quality professional uniforms for educational institutions, healthcare facilities, 
                  and corporate organizations across India.
                </p>
                <p className="text-zinc-600 leading-relaxed mb-8">
                  Our commitment to quality, precision, and trust has made us a preferred partner for 
                  institutions seeking professional uniform solutions that reflect their values and standards.
                </p>
                <div className="flex gap-4">
                  <button className="bg-black text-white px-8 py-3 text-[11px] font-bold tracking-widest uppercase hover:bg-amber-600 transition-colors">
                    OUR SERVICES
                  </button>
                  <button className="border border-black text-black px-8 py-3 text-[11px] font-bold tracking-widest uppercase hover:bg-black hover:text-white transition-all">
                    CONTACT US
                  </button>
                </div>
              </div>
              <div className="relative">
                <img 
                  src="/images/Business Uniform 1.png" 
                  alt="Professional Uniforms" 
                  className="w-full h-[500px] object-cover grayscale"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-24 bg-zinc-50 border-b border-black">
          <div className="max-w-[1200px] mx-auto px-8">
            <div className="text-center mb-16">
              <h2 className="font-heading text-5xl tracking-tight mb-6">OUR VALUES</h2>
              <p className="text-zinc-600 max-w-2xl mx-auto">
                The principles that guide everything we do at SKS Uniforms
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="text-center">
                <div className="w-20 h-20 bg-black text-white flex items-center justify-center text-2xl font-bold mb-6 mx-auto">
                  Q
                </div>
                <h3 className="font-heading text-2xl mb-4">QUALITY</h3>
                <p className="text-zinc-600 leading-relaxed">
                  Every uniform undergoes rigorous quality checks to ensure durability, 
                  comfort, and professional appearance that lasts.
                </p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 bg-black text-white flex items-center justify-center text-2xl font-bold mb-6 mx-auto">
                  P
                </div>
                <h3 className="font-heading text-2xl mb-4">PRECISION</h3>
                <p className="text-zinc-600 leading-relaxed">
                  Attention to detail in every stitch, measurement, and finish. 
                  We deliver uniforms that meet exact specifications.
                </p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 bg-black text-white flex items-center justify-center text-2xl font-bold mb-6 mx-auto">
                  T
                </div>
                <h3 className="font-heading text-2xl mb-4">TRUST</h3>
                <p className="text-zinc-600 leading-relaxed">
                  Building long-term relationships with institutions through 
                  reliable service, timely delivery, and consistent quality.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-24 border-b border-black">
          <div className="max-w-[1200px] mx-auto px-8">
            <div className="text-center mb-16">
              <h2 className="font-heading text-5xl tracking-tight mb-6">OUR EXPERTISE</h2>
              <p className="text-zinc-600 max-w-2xl mx-auto">
                Specialized services for different sectors
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="group cursor-pointer">
                <div className="aspect-[4/5] overflow-hidden border border-black mb-6">
                  <img 
                    src="/images/School Uniform 2.png" 
                    alt="Educational Uniforms" 
                    className="w-full h-full object-cover grayscale group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <h3 className="font-heading text-2xl mb-3">EDUCATIONAL INSTITUTIONS</h3>
                <p className="text-zinc-600 text-sm leading-relaxed">
                  School blazers, shirts, skirts, trousers, and complete uniform sets 
                  for primary, secondary, and higher education institutions.
                </p>
              </div>
              <div className="group cursor-pointer">
                <div className="aspect-[4/5] overflow-hidden border border-black mb-6">
                  <img 
                    src="/images/Hospital Uniform 1.png" 
                    alt="Healthcare Uniforms" 
                    className="w-full h-full object-cover grayscale group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <h3 className="font-heading text-2xl mb-3">HEALTHCARE FACILITIES</h3>
                <p className="text-zinc-600 text-sm leading-relaxed">
                  Medical scrubs, hospital uniforms, lab coats, and specialized 
                  healthcare apparel for doctors, nurses, and medical staff.
                </p>
              </div>
              <div className="group cursor-pointer">
                <div className="aspect-[4/5] overflow-hidden border border-black mb-6">
                  <img 
                    src="/images/Hotel Uniform 1.png" 
                    alt="Corporate Uniforms" 
                    className="w-full h-full object-cover grayscale group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <h3 className="font-heading text-2xl mb-3">CORPORATE ORGANIZATIONS</h3>
                <p className="text-zinc-600 text-sm leading-relaxed">
                  Business suits, corporate uniforms, hotel uniforms, and 
                  professional attire for various industries and service sectors.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="py-24 bg-black text-white">
          <div className="max-w-[1200px] mx-auto px-8 text-center">
            <h2 className="font-heading text-6xl tracking-tight mb-8">READY TO GET STARTED?</h2>
            <p className="text-xl mb-12 max-w-2xl mx-auto">
              Contact us today for a consultation and discover how SKS Uniforms 
              can provide the perfect professional solution for your institution.
            </p>
            <div className="flex gap-6 justify-center">
              <button className="bg-white text-black px-10 py-4 text-[11px] font-bold tracking-widest uppercase hover:bg-amber-600 hover:text-white transition-all">
                GET QUOTE
              </button>
              <button className="border border-white text-white px-10 py-4 text-[11px] font-bold tracking-widest uppercase hover:bg-white hover:text-black transition-all">
                VIEW CATALOG
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;