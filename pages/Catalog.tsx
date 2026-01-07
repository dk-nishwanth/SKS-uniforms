import React, { useState, useMemo } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useApp, ALL_PRODUCTS } from '../contexts/AppContext';
import { Heart, ShoppingBag } from 'lucide-react';

const Catalog: React.FC = () => {
  const { 
    addToCart, 
    addToWishlist, 
    removeFromWishlist, 
    isInWishlist, 
    setSelectedProduct,
    cartCount,
    downloadCatalog,
    requestSamples
  } = useApp();
  
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('name');

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = selectedCategory === 'All' 
      ? ALL_PRODUCTS 
      : selectedCategory === 'Men'
      ? ALL_PRODUCTS.filter(product => product.gender === 'men' || (product.gender === 'unisex' && product.category !== 'Accessories'))
      : selectedCategory === 'Women'
      ? ALL_PRODUCTS.filter(product => product.gender === 'women' || (product.gender === 'unisex' && product.category !== 'Accessories'))
      : ALL_PRODUCTS.filter(product => product.category === selectedCategory);

    return filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return parseFloat(a.price.replace('₹', '').replace(',', '')) - parseFloat(b.price.replace('₹', '').replace(',', ''));
        case 'price-high':
          return parseFloat(b.price.replace('₹', '').replace(',', '')) - parseFloat(a.price.replace('₹', '').replace(',', ''));
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });
  }, [selectedCategory, sortBy]);

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

  const handleDownloadCatalog = () => {
    downloadCatalog();
  };

  const handleRequestSamples = async () => {
    // Get selected products or show form for sample request
    const selectedProducts = filteredAndSortedProducts.slice(0, 5).map(p => p.id); // Sample first 5 products
    const contactInfo = {
      name: 'Sample Request',
      email: 'duraikannan73@gmail.com',
      phone: '+91 9980667425',
      address: 'Sample Address, City, State - 123456'
    };
    
    try {
      await requestSamples(selectedProducts, contactInfo);
    } catch (error) {
      console.error('Sample request failed:', error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar cartCount={cartCount} />
      
      <main className="flex-grow pt-20">
        {/* Hero Section */}
        <section className="relative h-[50vh] w-full flex items-center justify-center border-b border-black">
          <div className="absolute inset-0">
            <img 
              src="./components/Assets/Business Uniform 1.png" 
              alt="Uniform Catalog" 
              className="w-full h-full object-cover grayscale brightness-50"
            />
            <div className="absolute inset-0 bg-black/40" />
          </div>
          <div className="relative z-10 text-center text-white">
            <h1 className="font-heading text-8xl md:text-[120px] leading-[0.85] mb-8 drop-shadow-lg">
              UNIFORM <br/> CATALOG
            </h1>
            <p className="text-xl max-w-2xl mx-auto leading-relaxed">
              Complete collection of professional uniforms for every institution
            </p>
          </div>
        </section>

        {/* Filters Section */}
        <section className="py-8 bg-zinc-50 border-b border-black">
          <div className="max-w-[1400px] mx-auto px-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              {/* Category Filter */}
              <div className="flex gap-4">
                <span className="text-[11px] font-bold tracking-widest uppercase text-zinc-500">FILTER BY:</span>
                {['All', 'Schools', 'Healthcare', 'Corporate', 'Men', 'Women', 'Accessories'].map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`text-[11px] font-bold tracking-widest uppercase px-4 py-2 border transition-all ${
                      selectedCategory === category
                        ? 'bg-black text-white border-black'
                        : 'bg-white text-black border-black hover:bg-black hover:text-white'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>

              {/* Sort Options */}
              <div className="flex items-center gap-4">
                <span className="text-[11px] font-bold tracking-widest uppercase text-zinc-500">SORT BY:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="text-[11px] font-bold tracking-widest uppercase px-4 py-2 border border-black bg-white focus:outline-none"
                >
                  <option value="name">NAME</option>
                  <option value="price-low">PRICE: LOW TO HIGH</option>
                  <option value="price-high">PRICE: HIGH TO LOW</option>
                </select>
              </div>
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-24 border-b border-black">
          <div className="max-w-[1400px] mx-auto px-8">
            <div className="text-center mb-16">
              <h2 className="font-heading text-5xl tracking-tight mb-6">
                {selectedCategory === 'All' ? 'ALL UNIFORMS' : `${selectedCategory.toUpperCase()} COLLECTION`}
              </h2>
              <p className="text-zinc-600">
                Showing {filteredAndSortedProducts.length} products
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredAndSortedProducts.map((product) => (
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

        {/* Services Section */}
        <section className="py-24 bg-zinc-50 border-b border-black">
          <div className="max-w-[1200px] mx-auto px-8">
            <div className="text-center mb-16">
              <h2 className="font-heading text-5xl tracking-tight mb-6">ADDITIONAL SERVICES</h2>
              <p className="text-zinc-600 max-w-2xl mx-auto">
                Complete uniform solutions beyond just the products
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center p-6 bg-white border border-black">
                <div className="w-16 h-16 bg-black text-white flex items-center justify-center text-2xl font-bold mb-4 mx-auto">
                  ✂️
                </div>
                <h3 className="font-heading text-lg mb-2">CUSTOM TAILORING</h3>
                <p className="text-zinc-600 text-sm">
                  Perfect fit guaranteed with our professional tailoring services
                </p>
              </div>
              
              <div className="text-center p-6 bg-white border border-black">
                <div className="w-16 h-16 bg-black text-white flex items-center justify-center text-2xl font-bold mb-4 mx-auto">
                  🎨
                </div>
                <h3 className="font-heading text-lg mb-2">LOGO EMBROIDERY</h3>
                <p className="text-zinc-600 text-sm">
                  Professional embroidery services for logos and institutional branding
                </p>
              </div>
              
              <div className="text-center p-6 bg-white border border-black">
                <div className="w-16 h-16 bg-black text-white flex items-center justify-center text-2xl font-bold mb-4 mx-auto">
                  📦
                </div>
                <h3 className="font-heading text-lg mb-2">BULK ORDERS</h3>
                <p className="text-zinc-600 text-sm">
                  Special pricing and handling for large institutional orders
                </p>
              </div>
              
              <div className="text-center p-6 bg-white border border-black">
                <div className="w-16 h-16 bg-black text-white flex items-center justify-center text-2xl font-bold mb-4 mx-auto">
                  🚚
                </div>
                <h3 className="font-heading text-lg mb-2">DELIVERY</h3>
                <p className="text-zinc-600 text-sm">
                  Reliable delivery services across India for all uniform orders
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Download Catalog CTA */}
        <section className="py-24 bg-black text-white">
          <div className="max-w-[1200px] mx-auto px-8 text-center">
            <h2 className="font-heading text-6xl tracking-tight mb-8">DOWNLOAD FULL CATALOG</h2>
            <p className="text-xl mb-12 max-w-2xl mx-auto">
              Get our complete uniform catalog with detailed specifications, pricing, and customization options
            </p>
            <div className="flex gap-6 justify-center">
              <button 
                onClick={handleDownloadCatalog}
                className="bg-white text-black px-10 py-4 text-[11px] font-bold tracking-widest uppercase hover:bg-amber-600 hover:text-white transition-all"
              >
                DOWNLOAD PDF
              </button>
              <button 
                onClick={handleRequestSamples}
                className="border border-white text-white px-10 py-4 text-[11px] font-bold tracking-widest uppercase hover:bg-white hover:text-black transition-all"
              >
                REQUEST SAMPLES
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Catalog;