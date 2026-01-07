import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductCarousel from './components/ProductGrid';
import InfoGrid from './components/InfoGrid';
import Footer from './components/Footer';
import EnquiryDrawer from './components/EnquiryDrawer';
import ProductModal from './components/ProductModal';
import { useApp, ALL_PRODUCTS } from './contexts/AppContext';
import { Link } from 'react-router-dom';

const App: React.FC = () => {
  const { enquiryCount } = useApp();

  // Get first 8 products for the carousel
  const featuredProducts = ALL_PRODUCTS.slice(0, 8);

  return (
    <div className="min-h-screen flex flex-col bg-white overflow-x-hidden">
      <Navbar enquiryCount={enquiryCount} />
      
      <main className="flex-grow">
        <Hero />
        
        {/* Dynamic Reviews Section */}
        <section className="bg-white border-b border-black py-4 overflow-hidden whitespace-nowrap">
            <div className="flex gap-20 animate-marquee text-[11px] font-bold tracking-[0.5em] uppercase text-zinc-300">
                {[...Array(10)].map((_, i) => (
                    <span key={i}>QUALITY • PRECISION • TRUST • PROFESSIONAL SOLUTIONS FOR EVERY INSTITUTION</span>
                ))}
            </div>
        </section>

        <ProductCarousel products={featuredProducts} />
        
        <InfoGrid />

        {/* Editorial Content: Large Featured Sections */}
        <section className="border-b border-black">
            <div className="flex flex-col lg:flex-row divide-y lg:divide-y-0 lg:divide-x divide-black">
                <div className="flex-1 group relative overflow-hidden aspect-square lg:aspect-auto h-[600px] lg:h-[800px] cursor-pointer">
                    <img src="/images/School Uniform 2.png" className="w-full h-full object-cover grayscale brightness-75 group-hover:scale-105 transition-all duration-1000" alt="School Uniforms" />
                    <div className="absolute bottom-16 left-12">
                        <h3 className="font-heading text-8xl text-white mb-6 tracking-tighter drop-shadow-lg">SCHOOL <br/> UNIFORMS</h3>
                        <Link 
                          to="/schools"
                          className="bg-white text-black px-10 py-4 text-[11px] font-bold tracking-widest uppercase hover:bg-black hover:text-white transition-all border border-black inline-block"
                        >
                          VIEW COLLECTION
                        </Link>
                    </div>
                </div>
                <div className="flex-1 flex flex-col">
                    <div className="flex-1 p-16 md:p-24 flex flex-col justify-center border-b border-black bg-zinc-50">
                        <div className="text-[10px] font-bold tracking-[0.5em] text-amber-600 mb-6 uppercase">Our Heritage</div>
                        <h3 className="font-heading text-6xl tracking-tight leading-none mb-8">PROFESSIONAL <br/> SOLUTIONS</h3>
                        <p className="text-zinc-500 max-w-md leading-relaxed mb-10 italic">
                            From our facility in Ooty, The Nilgiris, we provide quality uniforms for schools, healthcare institutions, and corporate organizations across India.
                        </p>
                        <Link 
                          to="/about"
                          className="text-[11px] font-bold tracking-[0.3em] uppercase border-b border-black pb-1 self-start hover:text-amber-600 hover:border-amber-600 transition-all"
                        >
                          LEARN MORE →
                        </Link>
                    </div>
                    <div className="h-[400px] overflow-hidden">
                        <img src="/images/Corporate Uniform 2.png" className="w-full h-full object-cover grayscale brightness-50" alt="Corporate Uniforms" />
                    </div>
                </div>
            </div>
        </section>

        <section className="py-24 border-b border-black">
            <h2 className="font-heading text-5xl text-center mb-16 tracking-tight">SHOP BY CATEGORY</h2>
            <div className="max-w-[1400px] mx-auto px-8">
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        { title: "SCHOOLS", img: "/images/College Uniform 1.png", subtitle: "Educational Excellence", link: "/schools" },
                        { title: "HEALTHCARE", img: "/images/Hospital Uniform 1.png", subtitle: "Medical Professionals", link: "/healthcare" },
                        { title: "CORPORATE", img: "/images/Business Uniform 1.png", subtitle: "Business Solutions", link: "/corporate" }
                    ].map((cat, i) => (
                        <Link 
                          key={i} 
                          to={cat.link}
                          className="group relative aspect-[3/4] overflow-hidden border border-black cursor-pointer block"
                        >
                            <img src={cat.img} alt={cat.title} className="w-full h-full object-cover grayscale brightness-90 group-hover:scale-105 transition-transform duration-700" />
                            <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="absolute inset-x-0 bottom-12 flex flex-col items-center justify-center text-center p-4">
                                <span className="text-[9px] font-bold tracking-[0.5em] text-white uppercase mb-2 opacity-0 group-hover:opacity-100 transition-all transform translate-y-4 group-hover:translate-y-0">{cat.subtitle}</span>
                                <span className="font-heading text-6xl text-white tracking-tighter uppercase">{cat.title}</span>
                                <div className="mt-6 opacity-0 group-hover:opacity-100 transition-all transform translate-y-4 group-hover:translate-y-0">
                                    <span className="bg-white text-black px-6 py-2 text-[10px] font-bold tracking-widest uppercase border border-black">EXPLORE</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                 </div>
            </div>
        </section>

        {/* Editorial Grids */}
        <section className="bg-white">
            <div className="grid grid-cols-1 md:grid-cols-3 divide-x divide-black border-b border-black">
                {[
                    { title: "QUALITY ASSURANCE", text: "Every uniform undergoes rigorous quality checks to ensure durability and comfort. Our commitment to excellence means your institution gets the best.", img: "/images/Medical Uniform 1.png", link: "/about" },
                    { title: "CUSTOM EMBROIDERY", text: "Personalize your uniforms with institutional logos, names, and badges. Our precision embroidery services add that professional touch.", img: "/images/Corporate Uniform 1.png", link: "/contact" },
                    { title: "BULK ORDERS", text: "Special pricing for institutional bulk orders. Contact us for customized solutions that fit your budget and requirements.", img: "/images/Hotel Uniform 1.png", link: "/contact" }
                ].map((item, i) => (
                    <div key={i} className="flex flex-col group cursor-pointer">
                        <div className="aspect-video overflow-hidden border-b border-black bg-zinc-100">
                            <img src={item.img} alt={item.title} className="w-full h-full object-cover grayscale group-hover:scale-110 transition-transform duration-1000" />
                        </div>
                        <div className="p-10 space-y-4">
                            <h3 className="font-heading text-2xl tracking-tight leading-none">{item.title}</h3>
                            <p className="text-[12px] text-zinc-600 leading-relaxed italic">{item.text}</p>
                            <Link 
                              to={item.link}
                              className="text-[11px] font-bold tracking-widest uppercase border-b border-black pb-1 group-hover:text-amber-600 group-hover:border-amber-600 transition-all inline-block"
                            >
                                LEARN MORE →
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </section>
      </main>

      <Footer />

      {/* Overlays */}
      <EnquiryDrawer />
      <ProductModal />

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default App;