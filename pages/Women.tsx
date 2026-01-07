import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useApp, ALL_PRODUCTS } from '../contexts/AppContext';
import { Heart, ShoppingBag, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const Women: React.FC = () => {
  const { 
    addToCart, 
    addToWishlist, 
    removeFromWishlist, 
    isInWishlist, 
    setSelectedProduct,
    cartCount 
  } = useApp();

  // Filter products for Women's category
  const womenProducts = ALL_PRODUCTS.filter(product => 
    product.gender === 'women' || (product.gender === 'unisex' && product.category !== 'Accessories')
  );

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
              src="./components/Assets/Medical Uniform 1.png" 
              alt="Women's Uniforms" 
              className="w-full h-full object-cover grayscale brightness-60"
            />
            <div className="absolute inset-0 bg-black/30" />
          </div>
          <div className="relative z-10 text-center text-white">
            <div className="bg-white text-black inline-block px-4 py-2 text-[10px] font-bold tracking-widest uppercase border border-black mb-6">
              PROFESSIONAL WOMENSWEAR
            </div>
            <h1 className="font-heading text-8xl md:text-[140px] leading-[0.85] mb-8 drop-shadow-lg">
              WOMEN'S <br/> UNIFORMS
            </h1>
            <p className="text-xl max-w-2xl mx-auto leading-relaxed mb-8">
              Professional uniforms designed specifically for women across all industries
            </p>
            <Link 
              to="/catalog?filter=women"
              className="bg-amber-600 text-white px-10 py-4 text-[11px] font-bold tracking-widest uppercase hover:bg-black transition-colors inline-block"
            >
              EXPLORE WOMEN'S COLLECTION
            </Link>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-zinc-50 border-b border-black">
          <div className="max-w-[1200px] mx-auto px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold mb-2">Elegant Fit</div>
                <div className="text-[11px] font-bold tracking-widest uppercase text-zinc-500">Feminine Styling</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">Comfortable</div>
                <div className="text-[11px] font-bold tracking-widest uppercase text-zinc-500">All Day Wear</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">Professional</div>
                <div className="text-[11px] font-bold tracking-widest uppercase text-zinc-500">Career Ready</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">Versatile</div>
                <div className="text-[11px] font-bold tracking-widest uppercase text-zinc-500">Multi-Purpose</div>
              </div>
            </div>
          </div>
        </section>

        {/* Products Section */}
        <section className="py-24 border-b border-black">
          <div className="max-w-[1400px] mx-auto px-8">
            <div className="text-center mb-16">
              <h2 className="font-heading text-5xl tracking-tight mb-6">WOMEN'S UNIFORM COLLECTION</h2>
              <p className="text-zinc-600 max-w-2xl mx-auto">
                From professional blouses to complete uniform sets, our women's collection combines style, comfort, and functionality.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {womenProducts.map((product) => (
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
                    <div className="flex justify-between items-start mb-3">
                      <div className="text-[9px] font-bold tracking-widest uppercase text-zinc-400">
                        {product.category}
                      </div>
                      {product.sizes && (
                        <div className="text-[9px] font-bold tracking-widest uppercase text-zinc-400">
                          {product.sizes.length} SIZES
                        </div>
                      )}
                    </div>
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

        {/* CTA Section */}
        <section className="py-24 bg-black text-white">
          <div className="max-w-[1200px] mx-auto px-8 text-center">
            <h2 className="font-heading text-6xl tracking-tight mb-8">PROFESSIONAL WOMENSWEAR</h2>
            <p className="text-xl mb-12 max-w-2xl mx-auto">
              Discover our complete range of women's professional uniforms designed for the modern workplace
            </p>
            <div className="flex gap-6 justify-center">
              <Link 
                to="/contact#quote"
                className="bg-white text-black px-10 py-4 text-[11px] font-bold tracking-widest uppercase hover:bg-amber-600 hover:text-white transition-all"
              >
                GET CUSTOM QUOTE
              </Link>
              <Link 
                to="/catalog"
                className="border border-white text-white px-10 py-4 text-[11px] font-bold tracking-widest uppercase hover:bg-white hover:text-black transition-all"
              >
                VIEW ALL PRODUCTS
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Women;