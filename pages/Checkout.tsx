import React, { useState } from 'react';
import { ArrowLeft, CreditCard, Truck, Shield, Check } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Checkout: React.FC = () => {
  const { cartItems, cartTotal, clearCart, cartCount } = useApp();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [formData, setFormData] = useState({
    // Shipping Information
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    
    // Payment Information
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: '',
    
    // Order Notes
    notes: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 3000));

    setOrderComplete(true);
    clearCart();
    setIsProcessing(false);
  };

  if (cartItems.length === 0 && !orderComplete) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar cartCount={cartCount} />
        <div className="pt-20 flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <h1 className="font-heading text-3xl tracking-tight mb-4">Your cart is empty</h1>
            <p className="text-zinc-600 mb-8">Add some items to your cart before checkout.</p>
            <Link 
              to="/catalog"
              className="inline-block bg-black text-white px-8 py-3 text-sm font-bold tracking-widest uppercase hover:bg-zinc-800 transition-colors"
            >
              CONTINUE SHOPPING
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar cartCount={cartCount} />
        <div className="pt-20 flex items-center justify-center min-h-[60vh]">
          <div className="text-center max-w-md">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check size={32} className="text-green-600" />
            </div>
            <h1 className="font-heading text-3xl tracking-tight mb-4">Order Confirmed!</h1>
            <p className="text-zinc-600 mb-8">
              Thank you for your order. We'll send you a confirmation email shortly with tracking details.
            </p>
            <div className="space-y-3">
              <Link 
                to="/catalog"
                className="block bg-black text-white px-8 py-3 text-sm font-bold tracking-widest uppercase hover:bg-zinc-800 transition-colors"
              >
                CONTINUE SHOPPING
              </Link>
              <Link 
                to="/"
                className="block border border-black px-8 py-3 text-sm font-bold tracking-widest uppercase hover:bg-black hover:text-white transition-colors"
              >
                BACK TO HOME
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const shippingCost = cartTotal > 5000 ? 0 : 200;
  const tax = cartTotal * 0.18; // 18% GST
  const finalTotal = cartTotal + shippingCost + tax;

  return (
    <div className="min-h-screen bg-white">
      <Navbar cartCount={cartCount} />
      
      <div className="pt-20">
        {/* Header */}
        <div className="border-b border-black">
          <div className="max-w-7xl mx-auto px-8 lg:px-12 py-8">
            <div className="flex items-center gap-4 mb-4">
              <Link 
                to="/catalog" 
                className="flex items-center gap-2 text-sm hover:underline"
              >
                <ArrowLeft size={16} />
                Back to Cart
              </Link>
            </div>
            <h1 className="font-heading text-4xl tracking-tight">CHECKOUT</h1>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="max-w-7xl mx-auto px-8 lg:px-12 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left Column - Forms */}
            <div className="lg:col-span-2 space-y-8">
              {/* Shipping Information */}
              <div className="border border-black p-6">
                <h2 className="font-heading text-2xl tracking-tight mb-6 flex items-center gap-3">
                  <Truck size={24} />
                  SHIPPING INFORMATION
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold tracking-widest uppercase mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-black text-sm focus:outline-none focus:ring-2 focus:ring-black focus:ring-inset"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs font-bold tracking-widest uppercase mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-black text-sm focus:outline-none focus:ring-2 focus:ring-black focus:ring-inset"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs font-bold tracking-widest uppercase mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-black text-sm focus:outline-none focus:ring-2 focus:ring-black focus:ring-inset"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs font-bold tracking-widest uppercase mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-black text-sm focus:outline-none focus:ring-2 focus:ring-black focus:ring-inset"
                      required
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold tracking-widest uppercase mb-2">
                      Address *
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-black text-sm focus:outline-none focus:ring-2 focus:ring-black focus:ring-inset"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs font-bold tracking-widest uppercase mb-2">
                      City *
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-black text-sm focus:outline-none focus:ring-2 focus:ring-black focus:ring-inset"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs font-bold tracking-widest uppercase mb-2">
                      State *
                    </label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-black text-sm focus:outline-none focus:ring-2 focus:ring-black focus:ring-inset"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs font-bold tracking-widest uppercase mb-2">
                      PIN Code *
                    </label>
                    <input
                      type="text"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-black text-sm focus:outline-none focus:ring-2 focus:ring-black focus:ring-inset"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Payment Information */}
              <div className="border border-black p-6">
                <h2 className="font-heading text-2xl tracking-tight mb-6 flex items-center gap-3">
                  <CreditCard size={24} />
                  PAYMENT INFORMATION
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold tracking-widest uppercase mb-2">
                      Card Number *
                    </label>
                    <input
                      type="text"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      placeholder="1234 5678 9012 3456"
                      className="w-full px-4 py-3 border border-black text-sm focus:outline-none focus:ring-2 focus:ring-black focus:ring-inset"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs font-bold tracking-widest uppercase mb-2">
                      Expiry Date *
                    </label>
                    <input
                      type="text"
                      name="expiryDate"
                      value={formData.expiryDate}
                      onChange={handleInputChange}
                      placeholder="MM/YY"
                      className="w-full px-4 py-3 border border-black text-sm focus:outline-none focus:ring-2 focus:ring-black focus:ring-inset"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs font-bold tracking-widest uppercase mb-2">
                      CVV *
                    </label>
                    <input
                      type="text"
                      name="cvv"
                      value={formData.cvv}
                      onChange={handleInputChange}
                      placeholder="123"
                      className="w-full px-4 py-3 border border-black text-sm focus:outline-none focus:ring-2 focus:ring-black focus:ring-inset"
                      required
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold tracking-widest uppercase mb-2">
                      Cardholder Name *
                    </label>
                    <input
                      type="text"
                      name="cardName"
                      value={formData.cardName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-black text-sm focus:outline-none focus:ring-2 focus:ring-black focus:ring-inset"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Order Notes */}
              <div className="border border-black p-6">
                <h2 className="font-heading text-2xl tracking-tight mb-6">ORDER NOTES</h2>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  placeholder="Special instructions for your order (optional)"
                  rows={4}
                  className="w-full px-4 py-3 border border-black text-sm focus:outline-none focus:ring-2 focus:ring-black focus:ring-inset resize-none"
                />
              </div>
            </div>

            {/* Right Column - Order Summary */}
            <div className="lg:col-span-1">
              <div className="border border-black p-6 sticky top-24">
                <h2 className="font-heading text-2xl tracking-tight mb-6">ORDER SUMMARY</h2>
                
                <div className="space-y-4 mb-6">
                  {cartItems.map((item) => (
                    <div key={`${item.id}-${item.size}`} className="flex gap-4">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-16 h-16 object-cover border border-zinc-200 grayscale"
                      />
                      <div className="flex-grow">
                        <h3 className="text-sm font-medium">{item.name}</h3>
                        {item.size && (
                          <p className="text-xs text-zinc-500">Size: {item.size}</p>
                        )}
                        <p className="text-xs text-zinc-500">Qty: {item.quantity}</p>
                        <p className="text-sm font-bold">{item.price}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-zinc-200 pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal:</span>
                    <span>₹{cartTotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Shipping:</span>
                    <span>{shippingCost === 0 ? 'FREE' : `₹${shippingCost}`}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Tax (GST 18%):</span>
                    <span>₹{tax.toLocaleString()}</span>
                  </div>
                  <div className="border-t border-zinc-200 pt-2 flex justify-between font-bold">
                    <span>Total:</span>
                    <span>₹{finalTotal.toLocaleString()}</span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full mt-6 bg-black text-white py-4 text-sm font-bold tracking-widest uppercase hover:bg-zinc-800 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isProcessing ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      PROCESSING...
                    </>
                  ) : (
                    <>
                      <Shield size={16} />
                      PLACE ORDER
                    </>
                  )}
                </button>

                <div className="mt-4 text-xs text-zinc-500 text-center">
                  <Shield size={12} className="inline mr-1" />
                  Secure checkout powered by SSL encryption
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>

      <Footer />
    </div>
  );
};

export default Checkout;