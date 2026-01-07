import React, { useState } from 'react';
import { X, User, Mail, Lock, LogOut, Heart, ShoppingBag, FileText } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { Link } from 'react-router-dom';

const ProfileModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const { user, login, register, logout, wishlistItems, cartItems } = useApp();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      if (isLogin) {
        const success = await login(formData.email, formData.password);
        if (!success) {
          setError('Invalid email or password');
        } else {
          onClose();
        }
      } else {
        if (formData.password !== formData.confirmPassword) {
          setError('Passwords do not match');
          setIsLoading(false);
          return;
        }
        const success = await register(formData.name, formData.email, formData.password);
        if (!success) {
          setError('Registration failed. Please try again.');
        } else {
          onClose();
        }
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    onClose();
  };

  const resetForm = () => {
    setFormData({ name: '', email: '', password: '', confirmPassword: '' });
    setError('');
  };

  const switchMode = () => {
    setIsLogin(!isLogin);
    resetForm();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100004] bg-black/80 backdrop-blur-sm">
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="bg-white w-full max-w-md border border-black animate-in zoom-in-95 duration-300">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-black">
            <h2 className="font-heading text-2xl tracking-tight">
              {user ? 'MY ACCOUNT' : (isLogin ? 'SIGN IN' : 'CREATE ACCOUNT')}
            </h2>
            <button 
              onClick={onClose}
              className="p-2 hover:rotate-90 transition-transform"
            >
              <X size={24} />
            </button>
          </div>

          {user ? (
            // Logged in user view
            <div className="p-6 space-y-6">
              <div className="flex items-center gap-4 p-4 bg-zinc-50 border border-zinc-200">
                <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center">
                  <User size={20} />
                </div>
                <div>
                  <h3 className="font-medium">{user.name}</h3>
                  <p className="text-sm text-zinc-500">{user.email}</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 border border-zinc-200 hover:bg-zinc-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <Heart size={16} />
                    <span className="text-sm">Wishlist</span>
                  </div>
                  <span className="text-xs bg-zinc-200 px-2 py-1 rounded">
                    {wishlistItems.length} items
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 border border-zinc-200 hover:bg-zinc-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <ShoppingBag size={16} />
                    <span className="text-sm">Cart</span>
                  </div>
                  <span className="text-xs bg-zinc-200 px-2 py-1 rounded">
                    {cartItems.length} items
                  </span>
                </div>

                <Link 
                  to="/orders" 
                  onClick={onClose}
                  className="flex items-center justify-between p-3 border border-zinc-200 hover:bg-zinc-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <FileText size={16} />
                    <span className="text-sm">Order History</span>
                  </div>
                </Link>
              </div>

              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 p-3 border border-black hover:bg-black hover:text-white transition-colors"
              >
                <LogOut size={16} />
                <span className="text-sm font-medium">SIGN OUT</span>
              </button>
            </div>
          ) : (
            // Login/Register form
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {!isLogin && (
                <div>
                  <label className="block text-xs font-bold tracking-widest uppercase mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 border border-black text-sm focus:outline-none focus:ring-2 focus:ring-black focus:ring-inset"
                      required
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold tracking-widest uppercase mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 border border-black text-sm focus:outline-none focus:ring-2 focus:ring-black focus:ring-inset"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold tracking-widest uppercase mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 border border-black text-sm focus:outline-none focus:ring-2 focus:ring-black focus:ring-inset"
                    required
                  />
                </div>
              </div>

              {!isLogin && (
                <div>
                  <label className="block text-xs font-bold tracking-widest uppercase mb-2">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 border border-black text-sm focus:outline-none focus:ring-2 focus:ring-black focus:ring-inset"
                      required
                    />
                  </div>
                </div>
              )}

              {error && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-600 text-sm">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-black text-white py-3 text-sm font-bold tracking-widest uppercase hover:bg-zinc-800 transition-colors disabled:opacity-50"
              >
                {isLoading ? 'PLEASE WAIT...' : (isLogin ? 'SIGN IN' : 'CREATE ACCOUNT')}
              </button>

              <div className="text-center pt-4 border-t border-zinc-200">
                <p className="text-sm text-zinc-600">
                  {isLogin ? "Don't have an account?" : "Already have an account?"}
                </p>
                <button
                  type="button"
                  onClick={switchMode}
                  className="text-sm font-medium underline hover:no-underline mt-1"
                >
                  {isLogin ? 'Create Account' : 'Sign In'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;