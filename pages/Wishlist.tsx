import React from 'react';
import { Heart, MessageCircle, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Wishlist: React.FC = () => {
  const { wishlistItems, removeFromWishlist, addToEnquiry, enquiryCount } = useApp();

  const handleAddToEnquiry = (product: any) => {
    addToEnquiry(product);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar enquiryCount={enquiryCount} />
      
      <div className="pt-20">
        {/* Header */}
        <div className="border-b border-black">
          <div className="max-w-7xl mx-auto px-8 lg:px-12 py-12">
            <div className="flex items-center gap-4 mb-6">
              <Link 
                to="/" 
                className="flex items-center gap-2 text-sm hover:underline"
              >
                <ArrowLeft size={16} />
                Back to Home
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <Heart size={32} />
              <div>
                <h1 className="font-heading text-5xl tracking-tight">MY WISHLIST</h1>
                <p className="text-sm text-zinc-600 mt-2">
                  {wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'} saved for later
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-8 lg:px-12 py-12">
          {wishlistItems.length === 0 ? (
            <div className="text-center py-20">
              <Heart size={64} className="mx-auto text-zinc-300 mb-6" />
              <h2 className="font-heading text-3xl tracking-tight mb-4">Your wishlist is empty</h2>
              <p className="text-zinc-600 mb-8 max-w-md mx-auto">
                Save items you love to your wishlist. They'll be waiting for you here when you're ready.
              </p>
              <Link 
                to="/catalog"
                className="inline-block bg-black text-white px-8 py-3 text-sm font-bold tracking-widest uppercase hover:bg-zinc-800 transition-colors"
              >
                EXPLORE COLLECTION
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {wishlistItems.map((product) => (
                <div key={product.id} className="border border-black group">
                  <div className="relative aspect-[4/5] overflow-hidden bg-zinc-50">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                    />
                    {product.isNew && (
                      <div className="absolute top-4 left-4 border border-black bg-white text-black text-xs font-bold px-3 py-1.5 uppercase tracking-tighter">
                        NEW
                      </div>
                    )}
                    
                    <button
                      onClick={() => removeFromWishlist(product.id)}
                      className="absolute top-4 right-4 p-2.5 bg-white/90 backdrop-blur rounded-full hover:bg-red-50 transition-colors border border-black/10 group"
                    >
                      <Heart size={16} className="fill-red-500 text-red-500" />
                    </button>
                  </div>
                  
                  <div className="p-6 bg-white">
                    <div className="mb-4">
                      <h3 className="text-sm font-bold tracking-tight uppercase leading-snug mb-2">
                        {product.name}
                      </h3>
                      <p className="text-xs text-zinc-500 mb-3 line-clamp-2">
                        {product.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold">REQUEST QUOTE</span>
                        <span className="text-xs font-bold text-zinc-400 tracking-widest uppercase">
                          {product.category}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex gap-3">
                      <button 
                        onClick={() => handleAddToEnquiry(product)}
                        className="flex-1 flex items-center justify-center gap-2 bg-black text-white py-3 text-xs font-bold tracking-widest uppercase hover:bg-zinc-800 transition-colors"
                      >
                        <MessageCircle size={14} />
                        ADD TO ENQUIRY
                      </button>
                      <button 
                        onClick={() => removeFromWishlist(product.id)}
                        className="px-4 py-3 border border-black hover:bg-black hover:text-white transition-colors"
                      >
                        <Heart size={14} className="fill-current" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Wishlist;