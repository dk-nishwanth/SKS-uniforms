import React from 'react';
import { X, ShoppingBag, ArrowRight, Plus, Minus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';

const CartDrawer: React.FC = () => {
  const { 
    cartItems, 
    isCartOpen, 
    setIsCartOpen, 
    removeFromCart, 
    updateQuantity, 
    cartTotal 
  } = useApp();

  return (
    <>
      {/* Overlay */}
      <div 
        className={`fixed inset-0 bg-black/40 z-[100000] transition-opacity duration-300 ${isCartOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`} 
        onClick={() => setIsCartOpen(false)}
      />
      
      {/* Drawer */}
      <div className={`fixed top-0 right-0 h-full w-full max-w-md bg-white z-[100001] transition-transform duration-500 transform border-l border-black ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-black">
            <h2 className="font-heading text-3xl tracking-tight">YOUR PROVISIONS</h2>
            <button onClick={() => setIsCartOpen(false)} className="p-2 hover:rotate-90 transition-transform">
              <X size={24} />
            </button>
          </div>

          {/* Content */}
          <div className="flex-grow overflow-y-auto p-6 space-y-6">
            {cartItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center space-y-6">
                <ShoppingBag size={48} strokeWidth={1} className="text-zinc-300" />
                <p className="text-[11px] font-bold tracking-widest uppercase text-zinc-400">Your bag is currently empty</p>
                <button 
                  onClick={() => setIsCartOpen(false)}
                  className="bg-black text-white px-8 py-3 text-[11px] font-bold tracking-widest uppercase hover:bg-zinc-800 transition-colors"
                >
                  CONTINUE SHOPPING
                </button>
              </div>
            ) : (
              <>
                {cartItems.map((item) => (
                  <div key={`${item.id}-${item.size || 'default'}`} className="flex gap-4 p-4 border border-zinc-200">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-20 h-20 object-cover border border-zinc-200 grayscale"
                    />
                    <div className="flex-grow">
                      <h3 className="text-sm font-bold tracking-tight uppercase leading-snug mb-1">
                        {item.name}
                      </h3>
                      {item.size && (
                        <p className="text-xs text-zinc-500 mb-2">Size: {item.size}</p>
                      )}
                      <p className="text-sm font-bold mb-3">{item.price}</p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 border border-black flex items-center justify-center hover:bg-black hover:text-white transition-colors"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 border border-black flex items-center justify-center hover:bg-black hover:text-white transition-colors"
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                        
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-xs text-red-600 hover:underline"
                        >
                          REMOVE
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>

          {/* Footer */}
          {cartItems.length > 0 && (
            <div className="border-t border-black p-6 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-bold tracking-widest uppercase">SUBTOTAL</span>
                <span className="text-lg font-bold">₹{cartTotal.toLocaleString()}</span>
              </div>
              
              <p className="text-xs text-zinc-500">Shipping and taxes calculated at checkout</p>
              
              <Link
                to="/checkout"
                onClick={() => setIsCartOpen(false)}
                className="w-full bg-black text-white py-4 text-[11px] font-bold tracking-widest uppercase hover:bg-zinc-800 transition-colors flex items-center justify-center gap-2"
              >
                PROCEED TO CHECKOUT
                <ArrowRight size={16} />
              </Link>
              
              <button 
                onClick={() => setIsCartOpen(false)}
                className="w-full border border-black py-3 text-[11px] font-bold tracking-widest uppercase hover:bg-black hover:text-white transition-colors"
              >
                CONTINUE SHOPPING
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CartDrawer;