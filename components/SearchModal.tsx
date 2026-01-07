import React, { useState, useEffect } from 'react';
import { X, Search } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { Link } from 'react-router-dom';

const SearchModal: React.FC = () => {
  const { 
    isSearchOpen, 
    setIsSearchOpen, 
    searchQuery, 
    setSearchQuery, 
    searchResults, 
    performSearch,
    setSelectedProduct 
  } = useApp();
  
  const [localQuery, setLocalQuery] = useState('');

  useEffect(() => {
    const delayedSearch = setTimeout(() => {
      setSearchQuery(localQuery);
      performSearch(localQuery);
    }, 300);

    return () => clearTimeout(delayedSearch);
  }, [localQuery, setSearchQuery, performSearch]);

  const handleClose = () => {
    setIsSearchOpen(false);
    setLocalQuery('');
    setSearchQuery('');
  };

  const handleProductClick = (product: any) => {
    setSelectedProduct(product);
    handleClose();
  };

  if (!isSearchOpen) return null;

  return (
    <div className="fixed inset-0 z-[100003] bg-black/80 backdrop-blur-sm">
      <div className="flex items-start justify-center min-h-screen p-4 pt-20">
        <div className="bg-white w-full max-w-2xl border border-black animate-in zoom-in-95 duration-300">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-black">
            <h2 className="font-heading text-2xl tracking-tight">SEARCH PROVISIONS</h2>
            <button 
              onClick={handleClose}
              className="p-2 hover:rotate-90 transition-transform"
            >
              <X size={24} />
            </button>
          </div>

          {/* Search Input */}
          <div className="p-6 border-b border-black">
            <div className="relative">
              <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
              <input
                type="text"
                value={localQuery}
                onChange={(e) => setLocalQuery(e.target.value)}
                placeholder="Search for uniforms, accessories..."
                className="w-full pl-12 pr-4 py-3 border border-black text-sm focus:outline-none focus:ring-2 focus:ring-black focus:ring-inset"
                autoFocus
              />
            </div>
          </div>

          {/* Search Results */}
          <div className="max-h-96 overflow-y-auto">
            {localQuery && searchResults.length === 0 ? (
              <div className="p-8 text-center">
                <p className="text-zinc-500 text-sm">No results found for "{localQuery}"</p>
                <p className="text-zinc-400 text-xs mt-2">Try searching for "school", "medical", "corporate", or "accessories"</p>
              </div>
            ) : searchResults.length > 0 ? (
              <div className="divide-y divide-zinc-200">
                {searchResults.map((product) => (
                  <button
                    key={product.id}
                    onClick={() => handleProductClick(product)}
                    className="w-full p-4 flex items-center gap-4 hover:bg-zinc-50 transition-colors text-left"
                  >
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-16 h-16 object-cover border border-zinc-200 grayscale"
                    />
                    <div className="flex-grow">
                      <h3 className="font-medium text-sm">{product.name}</h3>
                      <p className="text-xs text-zinc-500 mt-1">{product.category}</p>
                      <p className="text-sm font-bold mt-1">{product.price}</p>
                    </div>
                    {product.isNew && (
                      <span className="text-xs bg-black text-white px-2 py-1 uppercase tracking-wider">
                        NEW
                      </span>
                    )}
                  </button>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center">
                <Search size={48} className="mx-auto text-zinc-300 mb-4" />
                <p className="text-zinc-500 text-sm">Start typing to search our collection</p>
                <div className="flex flex-wrap justify-center gap-2 mt-4">
                  {['Schools', 'Healthcare', 'Corporate', 'Accessories'].map((category) => (
                    <button
                      key={category}
                      onClick={() => setLocalQuery(category.toLowerCase())}
                      className="text-xs bg-zinc-100 hover:bg-zinc-200 px-3 py-1 border border-zinc-300 transition-colors"
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Quick Links */}
          <div className="p-6 border-t border-black bg-zinc-50">
            <p className="text-xs font-bold tracking-widest uppercase text-zinc-600 mb-3">QUICK LINKS</p>
            <div className="flex flex-wrap gap-4">
              <Link 
                to="/catalog" 
                onClick={handleClose}
                className="text-xs hover:underline"
              >
                View All Products
              </Link>
              <Link 
                to="/schools" 
                onClick={handleClose}
                className="text-xs hover:underline"
              >
                School Uniforms
              </Link>
              <Link 
                to="/healthcare" 
                onClick={handleClose}
                className="text-xs hover:underline"
              >
                Healthcare Uniforms
              </Link>
              <Link 
                to="/corporate" 
                onClick={handleClose}
                className="text-xs hover:underline"
              >
                Corporate Uniforms
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchModal;