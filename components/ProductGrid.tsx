import React, { useState } from 'react';
import { Product } from '../types';
import { Heart, Star, ShoppingBag } from 'lucide-react';
import { useApp, ALL_PRODUCTS } from '../contexts/AppContext';
import { Link } from 'react-router-dom';

interface ProductGridProps {
  products: Product[];
}

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist, setSelectedProduct } = useApp();
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product);
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const handleViewDetails = () => {
    setSelectedProduct(product);
  };

  return (
    <div className="flex-none w-[320px] md:w-[420px] border-r border-black flex flex-col group cursor-pointer" onClick={handleViewDetails}>
      <div className="relative aspect-[4/5] overflow-hidden bg-[#f5f5f5]">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
        />
        {product.isNew && (
          <div className="absolute top-4 left-4 border border-black bg-white text-black text-[9px] font-bold px-3 py-1.5 uppercase tracking-tighter z-10">
            NEW
          </div>
        )}
        
        {/* Hover Action Overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
            <button 
              onClick={handleViewDetails}
              className="bg-white text-black px-8 py-3 text-[10px] font-bold tracking-widest uppercase border border-black transform translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 hover:bg-black hover:text-white"
            >
                VIEW DETAILS
            </button>
        </div>

        <button 
          onClick={handleWishlistToggle}
          className="absolute top-4 right-4 p-2.5 bg-white/70 backdrop-blur rounded-full hover:bg-white transition-colors z-10 border border-black/10"
        >
            <Heart size={16} className={isInWishlist(product.id) ? 'fill-red-500 text-red-500' : ''} />
        </button>
      </div>
      
      <div className="p-5 border-t border-black bg-white flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-4">
            <h3 className="text-[12px] font-bold tracking-tight uppercase leading-snug group-hover:text-amber-700 transition-colors">{product.name}</h3>
        </div>
        <div className="mt-auto flex justify-between items-center">
            <div className="flex flex-col">
                <span className="text-[14px] font-bold">{product.price}</span>
                <span className="text-[9px] font-bold text-zinc-400 tracking-widest uppercase">FREE SHIPPING</span>
            </div>
            <button 
                onClick={handleAddToCart}
                className="flex items-center gap-2 text-[11px] font-bold tracking-widest uppercase group/add"
            >
                <span className="underline underline-offset-4 group-hover/add:text-zinc-500 transition-colors">+ ADD</span>
                <ShoppingBag size={14} className="opacity-0 group-hover/add:opacity-100 transition-opacity" />
            </button>
        </div>
      </div>
    </div>
  );
};

const ProductCarousel: React.FC<ProductGridProps> = ({ products }) => {
  const [activeFilter, setActiveFilter] = useState('ALL GOODS');

  const getFilteredProducts = () => {
    switch (activeFilter) {
      case 'MEN\'S':
        return ALL_PRODUCTS.filter(p => p.gender === 'men' || (p.gender === 'unisex' && p.category !== 'Accessories'));
      case 'WOMEN\'S':
        return ALL_PRODUCTS.filter(p => p.gender === 'women' || (p.gender === 'unisex' && p.category !== 'Accessories'));
      case 'ACCESSORIES':
        return ALL_PRODUCTS.filter(p => p.category === 'Accessories');
      case 'ALL GOODS':
      default:
        return products;
    }
  };

  const displayProducts = getFilteredProducts().slice(0, 8); // Show first 8 products

  return (
    <section className="bg-white border-b border-black">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row justify-between items-center px-8 py-8 border-b border-black gap-6">
        <div>
            <h2 className="font-heading text-5xl tracking-tight leading-none mb-2">NEW PROVISIONS</h2>
            <p className="text-[10px] font-bold tracking-[0.4em] text-zinc-400 uppercase">Latest drops for the modern worker</p>
        </div>
        <div className="flex gap-4 text-[10px] font-bold tracking-widest border border-black p-1.5 bg-zinc-50">
            {[
              { key: 'ALL GOODS', label: 'ALL GOODS' },
              { key: 'MEN\'S', label: 'MEN\'S' },
              { key: 'WOMEN\'S', label: 'WOMEN\'S' },
              { key: 'ACCESSORIES', label: 'ACCESSORIES' }
            ].map((filter) => (
              <button 
                key={filter.key}
                onClick={() => setActiveFilter(filter.key)}
                className={`px-5 py-2.5 transition-colors ${
                  activeFilter === filter.key 
                    ? 'bg-black text-white' 
                    : 'hover:bg-white'
                }`}
              >
                {filter.label}
              </button>
            ))}
        </div>
      </div>

      {/* Horizontal Scroll Area */}
      <div className="flex overflow-x-auto hide-scrollbar scroll-smooth cursor-grab active:cursor-grabbing">
        {displayProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
        {/* View All Button */}
        <Link 
          to="/catalog"
          className="flex-none w-[120px] border-r border-black flex flex-col items-center justify-center bg-zinc-50 group hover:bg-black transition-colors cursor-pointer"
        >
             <div className="w-10 h-10 border-r-2 border-t-2 border-black group-hover:border-white rotate-[45deg] transition-colors" />
             <span className="text-[9px] font-bold tracking-widest mt-6 group-hover:text-white transition-colors">VIEW ALL</span>
        </Link>
      </div>

      {/* Review Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 py-6 border-b border-black bg-[#fdfdfd]">
        <div className="flex items-center gap-2">
            <div className="flex text-amber-600">
                {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
            </div>
            <span className="text-[11px] font-bold tracking-widest uppercase">4.8/5 STARS</span>
        </div>
        <div className="hidden sm:block w-px h-4 bg-zinc-300 mx-4" />
        <span className="text-[11px] font-bold tracking-widest uppercase text-zinc-500 italic">"Quality that stands the test of time" — Verified Customer</span>
      </div>
    </section>
  );
};

export default ProductCarousel;