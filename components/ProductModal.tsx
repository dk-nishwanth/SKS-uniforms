import React, { useState } from 'react';
import { X, Heart, Shield, RefreshCw, Plus, Minus } from 'lucide-react';
import { Product } from '../types';
import { useApp } from '../contexts/AppContext';

const ProductModal: React.FC = () => {
  const { 
    selectedProduct: product, 
    setSelectedProduct, 
    addToCart, 
    addToWishlist, 
    removeFromWishlist, 
    isInWishlist 
  } = useApp();
  
  const [selectedSize, setSelectedSize] = useState('M');
  const [quantity, setQuantity] = useState(1);

  if (!product) return null;

  const handleAddToCart = () => {
    addToCart(product, selectedSize);
    setSelectedProduct(null);
  };

  const handleWishlistToggle = () => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const handleClose = () => {
    setSelectedProduct(null);
    setSelectedSize('M');
    setQuantity(1);
  };

  return (
    <div className="fixed inset-0 z-[100002] flex items-center justify-center p-4 md:p-12 overflow-y-auto">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={handleClose} />
      
      <div className="relative bg-white w-full max-w-6xl flex flex-col md:flex-row border border-black overflow-hidden animate-in zoom-in-95 duration-300">
        {/* Images */}
        <div className="flex-1 bg-[#f5f5f5] border-r border-black overflow-hidden group">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
        </div>

        {/* Info */}
        <div className="flex-1 p-8 md:p-12 flex flex-col h-full bg-white">
          <div className="flex justify-between items-start mb-8">
            <div>
              <div className="text-[10px] font-bold tracking-[0.4em] text-amber-600 mb-2 uppercase">Provision No. {product.id}</div>
              <h2 className="font-heading text-5xl tracking-tight leading-none mb-4">{product.name}</h2>
              <div className="text-2xl font-medium">{product.price}</div>
            </div>
            <button onClick={handleClose} className="p-2 border border-black hover:bg-black hover:text-white transition-all">
                <X size={20} />
            </button>
          </div>

          <div className="space-y-8 flex-grow">
            <p className="text-sm text-zinc-600 leading-relaxed font-medium">
              {product.description} Built for the daily grind using premium materials and heritage construction techniques. Features triple-stitched seams and reinforced stress points.
            </p>

            {/* Size Selection */}
            <div>
              <h3 className="text-xs font-bold tracking-widest uppercase mb-4">Select Size</h3>
              <div className="flex gap-2">
                {['XS', 'S', 'M', 'L', 'XL'].map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-12 h-12 border border-black text-sm font-bold transition-all ${
                      selectedSize === size 
                        ? 'bg-black text-white' 
                        : 'bg-white text-black hover:bg-zinc-100'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selection */}
            <div>
              <h3 className="text-xs font-bold tracking-widest uppercase mb-4">Quantity</h3>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 border border-black flex items-center justify-center hover:bg-black hover:text-white transition-colors"
                >
                  <Minus size={16} />
                </button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 border border-black flex items-center justify-center hover:bg-black hover:text-white transition-colors"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="flex items-center gap-2">
                <Shield size={16} />
                <span>Premium Quality</span>
              </div>
              <div className="flex items-center gap-2">
                <RefreshCw size={16} />
                <span>Easy Returns</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart size={16} />
                <span>Lifetime Support</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4 mt-8">
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-black text-white py-4 text-sm font-bold tracking-widest uppercase hover:bg-zinc-800 transition-colors"
            >
              ADD TO PROVISIONS
            </button>
            <button
              onClick={handleWishlistToggle}
              className={`px-6 py-4 border border-black transition-colors ${
                isInWishlist(product.id)
                  ? 'bg-red-50 text-red-600 border-red-300'
                  : 'hover:bg-black hover:text-white'
              }`}
            >
              <Heart size={20} className={isInWishlist(product.id) ? 'fill-current' : ''} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;