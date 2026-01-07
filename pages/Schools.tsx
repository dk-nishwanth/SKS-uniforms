import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useApp, ALL_PRODUCTS } from '../contexts/AppContext';
import { Heart, ShoppingBag, GraduationCap } from 'lucide-react';
import { Link } from 'react-router-dom';

const Schools: React.FC = () => {
  const { 
    addToCart, 
    addToWishlist, 
    removeFromWishlist, 
    isInWishlist, 
    setSelectedProduct,
    cartCount 
  } = useApp();

  // Filter products for Schools category
  const schoolProducts = ALL_PRODUCTS.filter(product => product.category === 'Schools');

  const handleAddToCart = (product: any) => {
    addToCart(product);
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
      <Navbar cartCount={cartCount} />
      
      <main className="flex-grow pt-20">
        {/* Hero Section */}
        <section className="relative h-[70vh] w-full flex items-center justify-center border-b border-black">
          <div className="absolute inset-0">
            <img 
              src="/images/School Uniform 1.png" 
              alt="School Uniforms" 
              className="w-full h-full object-cover grayscale brightness-60"
            />
            <div className="absolute inset-0 bg-black/30" />
          </div>
          <div className="relative z-10 text-center text-white">
            <div className="bg-white text-black inline-block px-4 py-2 text-[10px] font-bold tracking-widest uppercase border border-black mb-6">
              EDUCATIONAL EXCELLENCE
            </div>
            <h1 className="font-heading text-8xl md:text-[140px] leading-[0.85] mb-8 drop-shadow-lg">
              SCHOOL <br/> UNIFORMS
            </h1>
            <p className="text-xl max-w-2xl mx-auto leading-relaxed mb-8">
              Professional uniforms for primary schools, secondary schools, and colleges
            </p>
            <Link 
              to="/catalog?filter=schools"
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
                <div className="text-3xl font-bold mb-2">500+</div>
                <div className="text-[11px] font-bold tracking-widest uppercase text-zinc-500">Schools Served</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">50,000+</div>
                <div className="text-[11px] font-bold tracking-widest uppercase text-zinc-500">Students Uniformed</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">15+</div>
                <div className="text-[11px] font-bold tracking-widest uppercase text-zinc-500">Years Experience</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">100%</div>
                <div className="text-[11px] font-bold tracking-widest uppercase text-zinc-500">Quality Assured</div>
              </div>
            </div>
          </div>
        </section>

        {/* Products Section */}
        <section className="py-24 border-b border-black">
          <div className="max-w-[1400px] mx-auto px-8">
            <div className="text-center mb-16">
              <h2 className="font-heading text-5xl tracking-tight mb-6">SCHOOL UNIFORM COLLECTION</h2>
              <p className="text-zinc-600 max-w-2xl mx-auto">
                From primary school to college, we provide complete uniform solutions that combine comfort, durability, and professional appearance.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {schoolProducts.map((product) => (
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
                      <span className="text-xl font-bold">{product.price}</span>
                      <button 
                        onClick={() => handleAddToCart(product)}
                        className="flex items-center gap-2 bg-black text-white px-4 py-2 text-[9px] font-bold tracking-widest uppercase hover:bg-amber-600 transition-colors"
                      >
                        <ShoppingBag size={12} />
                        ADD TO CART
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-24 bg-zinc-50 border-b border-black">
          <div className="max-w-[1200px] mx-auto px-8">
            <div className="text-center mb-16">
              <h2 className="font-heading text-5xl tracking-tight mb-6">SPECIALIZED SERVICES</h2>
              <p className="text-zinc-600 max-w-2xl mx-auto">
                Complete uniform solutions tailored for educational institutions
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="text-center p-8 bg-white border border-black">
                <GraduationCap size={48} className="mx-auto mb-6" />
                <h3 className="font-heading text-xl mb-4">CUSTOM SCHOOL CRESTS</h3>
                <p className="text-zinc-600 text-sm leading-relaxed">
                  Professional embroidery services for school logos, crests, and badges with precision and quality.
                </p>
              </div>
              
              <div className="text-center p-8 bg-white border border-black">
                <div className="w-12 h-12 bg-black text-white flex items-center justify-center text-xl font-bold mb-6 mx-auto">
                  📏
                </div>
                <h3 className="font-heading text-xl mb-4">SIZE FITTING SERVICES</h3>
                <p className="text-zinc-600 text-sm leading-relaxed">
                  On-site fitting services for bulk orders to ensure perfect fit for all students.
                </p>
              </div>
              
              <div className="text-center p-8 bg-white border border-black">
                <div className="w-12 h-12 bg-black text-white flex items-center justify-center text-xl font-bold mb-6 mx-auto">
                  📦
                </div>
                <h3 className="font-heading text-xl mb-4">BULK SCHOOL ORDERS</h3>
                <p className="text-zinc-600 text-sm leading-relaxed">
                  Special pricing and handling for large school orders with flexible payment terms.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-black text-white">
          <div className="max-w-[1200px] mx-auto px-8 text-center">
            <h2 className="font-heading text-6xl tracking-tight mb-8">PARTNER WITH US</h2>
            <p className="text-xl mb-12 max-w-2xl mx-auto">
              Join hundreds of schools that trust SKS Uniforms for their complete uniform needs
            </p>
            <div className="flex gap-6 justify-center">
              <Link 
                to="/contact#quote"
                className="bg-white text-black px-10 py-4 text-[11px] font-bold tracking-widest uppercase hover:bg-amber-600 hover:text-white transition-all"
              >
                GET SCHOOL QUOTE
              </Link>
              <Link 
                to="/catalog"
                className="border border-white text-white px-10 py-4 text-[11px] font-bold tracking-widest uppercase hover:bg-white hover:text-black transition-all"
              >
                VIEW FULL CATALOG
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Schools;