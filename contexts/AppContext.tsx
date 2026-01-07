import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '../types';

interface CartItem extends Product {
  quantity: number;
  size?: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  isLoggedIn: boolean;
}

interface AppContextType {
  // Cart state
  cartItems: CartItem[];
  addToCart: (product: Product, size?: string) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;

  // Wishlist state
  wishlistItems: Product[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  // User state
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (name: string, email: string, password: string) => Promise<boolean>;

  // Search state
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  searchResults: Product[];
  performSearch: (query: string) => void;

  // UI state
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;

  // New functionality
  requestQuote: (productIds: string[], message: string, contactInfo: any) => Promise<boolean>;
  requestSamples: (productIds: string[], contactInfo: any) => Promise<boolean>;
  downloadCatalog: () => void;
  subscribeNewsletter: (email: string, categories: string[]) => Promise<boolean>;
  bookConsultation: (consultationType: string, contactInfo: any) => Promise<boolean>;
  reorderItems: (orderItems: CartItem[]) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

// All products data with comprehensive categories
export const ALL_PRODUCTS: Product[] = [
  // School Uniforms
  {
    id: 's1',
    name: 'SCHOOL BLAZER - NAVY BLUE',
    price: '₹2,500',
    category: 'Schools',
    subcategory: 'Blazers',
    image: './components/Assets/School Uniform 1.png',
    description: 'Premium quality school blazer with embroidered crest. Made from high-grade wool blend fabric.',
    isNew: true,
    gender: 'unisex',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Navy Blue', 'Black'],
    material: 'Wool Blend',
    features: ['Embroidered Crest', 'Wool Blend', 'Professional Finish']
  },
  {
    id: 's2',
    name: 'SCHOOL UNIFORM SET - GREY',
    price: '₹3,200',
    category: 'Schools',
    subcategory: 'Complete Sets',
    image: './components/Assets/School Uniform 2.png',
    description: 'Complete school uniform set with professional finish. Includes shirt, trousers, and tie.',
    isNew: false,
    gender: 'unisex',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Grey', 'Navy Blue'],
    material: 'Cotton Blend',
    features: ['Complete Set', 'Professional Finish', 'Includes Tie']
  },
  {
    id: 's3',
    name: 'COLLEGE UNIFORM - FORMAL',
    price: '₹3,800',
    category: 'Schools',
    subcategory: 'College Wear',
    image: './components/Assets/College Uniform 1.png',
    description: 'Formal college uniform with modern cut and premium fabric quality.',
    isNew: true,
    gender: 'unisex',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Navy Blue', 'Black', 'Grey'],
    material: 'Premium Cotton',
    features: ['Modern Cut', 'Premium Fabric', 'Formal Design']
  },
  {
    id: 's4',
    name: 'COLLEGE UNIFORM - CASUAL',
    price: '₹2,800',
    category: 'Schools',
    subcategory: 'College Wear',
    image: './components/Assets/College Uniform 2.png',
    description: 'Comfortable college uniform for daily wear with durable construction.',
    isNew: false,
    gender: 'unisex',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Light Blue', 'White', 'Grey'],
    material: 'Cotton Blend',
    features: ['Comfortable Fit', 'Durable Construction', 'Daily Wear']
  },

  // Healthcare Uniforms
  {
    id: 'h1',
    name: 'MEDICAL SCRUBS - BLUE',
    price: '₹1,800',
    category: 'Healthcare',
    subcategory: 'Scrubs',
    image: './components/Assets/Medical Uniform 1.png',
    description: 'Professional medical scrubs with antimicrobial treatment and comfortable fit.',
    isNew: true,
    gender: 'unisex',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Blue', 'Green', 'White'],
    material: 'Antimicrobial Fabric',
    features: ['Antimicrobial Treatment', 'Comfortable Fit', 'Easy Care']
  },
  {
    id: 'h2',
    name: 'HOSPITAL UNIFORM - WHITE',
    price: '₹2,200',
    category: 'Healthcare',
    subcategory: 'Hospital Wear',
    image: './components/Assets/Hospital Uniform 1.png',
    description: 'Classic hospital uniform with professional appearance and durability.',
    isNew: false,
    gender: 'unisex',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: ['White', 'Light Blue'],
    material: 'Medical Grade Cotton',
    features: ['Professional Appearance', 'Durable', 'Medical Grade']
  },
  {
    id: 'h3',
    name: 'SURGICAL SCRUBS - GREEN',
    price: '₹2,500',
    category: 'Healthcare',
    subcategory: 'Surgical Wear',
    image: './components/Assets/Hospital Uniform 2.png',
    description: 'Surgical scrubs with fluid-resistant properties and sterile packaging.',
    isNew: true,
    gender: 'unisex',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Green', 'Blue'],
    material: 'Fluid-Resistant Fabric',
    features: ['Fluid-Resistant', 'Sterile Packaging', 'Surgical Grade']
  },

  // Corporate Uniforms
  {
    id: 'c1',
    name: 'BUSINESS SUIT - CHARCOAL',
    price: '₹8,500',
    category: 'Corporate',
    subcategory: 'Suits',
    image: './components/Assets/Business Suit 1.png',
    description: 'Executive business suit with tailored fit and premium wool construction.',
    isNew: true,
    gender: 'men',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Charcoal', 'Navy Blue', 'Black'],
    material: 'Premium Wool',
    features: ['Tailored Fit', 'Premium Wool', 'Executive Style']
  },
  {
    id: 'c2',
    name: 'CORPORATE UNIFORM - NAVY',
    price: '₹4,500',
    category: 'Corporate',
    subcategory: 'Office Wear',
    image: './components/Assets/Corporate Uniform 1.png',
    description: 'Professional corporate uniform suitable for office environments.',
    isNew: false,
    gender: 'unisex',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Navy Blue', 'Black', 'Grey'],
    material: 'Poly-Cotton Blend',
    features: ['Professional Look', 'Office Suitable', 'Easy Care']
  },
  {
    id: 'c3',
    name: 'EXECUTIVE UNIFORM - BLACK',
    price: '₹5,200',
    category: 'Corporate',
    subcategory: 'Executive Wear',
    image: './components/Assets/Corporate Uniform 2.png',
    description: 'Executive uniform with sophisticated design and premium finish.',
    isNew: true,
    gender: 'unisex',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Black', 'Navy Blue'],
    material: 'Premium Cotton',
    features: ['Sophisticated Design', 'Premium Finish', 'Executive Style']
  },
  {
    id: 'c4',
    name: 'HOTEL UNIFORM - BURGUNDY',
    price: '₹3,800',
    category: 'Corporate',
    subcategory: 'Hospitality',
    image: './components/Assets/Hotel Uniform 1.png',
    description: 'Elegant hotel uniform with hospitality-focused design and comfort.',
    isNew: false,
    gender: 'unisex',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Burgundy', 'Navy Blue', 'Black'],
    material: 'Hospitality Fabric',
    features: ['Elegant Design', 'Hospitality Focused', 'Comfortable']
  },
  {
    id: 'c5',
    name: 'HOTEL STAFF UNIFORM - GREY',
    price: '₹3,200',
    category: 'Corporate',
    subcategory: 'Hospitality',
    image: './components/Assets/Hotel Uniform 2.png',
    description: 'Practical hotel staff uniform with durability and professional appearance.',
    isNew: false,
    gender: 'unisex',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Grey', 'Black', 'Navy Blue'],
    material: 'Durable Cotton Blend',
    features: ['Durable', 'Professional', 'Staff Uniform']
  },
  {
    id: 'c6',
    name: 'BUSINESS UNIFORM - FORMAL',
    price: '₹4,800',
    category: 'Corporate',
    subcategory: 'Business Wear',
    image: './components/Assets/Business Uniform 1.png',
    description: 'Formal business uniform with contemporary styling and quality construction.',
    isNew: true,
    gender: 'unisex',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Navy Blue', 'Black', 'Charcoal'],
    material: 'Business Grade Fabric',
    features: ['Contemporary Styling', 'Quality Construction', 'Formal']
  },

  // Men's Collection
  {
    id: 'm1',
    name: 'FORMAL SHIRT - WHITE',
    price: '₹1,500',
    category: 'Men',
    subcategory: 'Shirts',
    image: './components/Assets/1.png',
    description: 'Classic formal shirt with crisp finish and comfortable fit.',
    isNew: false,
    gender: 'men',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['White', 'Light Blue', 'Light Pink'],
    material: 'Premium Cotton',
    features: ['Crisp Finish', 'Comfortable Fit', 'Classic Design']
  },
  {
    id: 'm2',
    name: 'FORMAL TROUSERS - BLACK',
    price: '₹2,200',
    category: 'Men',
    subcategory: 'Trousers',
    image: './components/Assets/2.png',
    description: 'Formal trousers with tailored fit and wrinkle-resistant fabric.',
    isNew: true,
    gender: 'men',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Black', 'Navy Blue', 'Charcoal'],
    material: 'Wrinkle-Resistant Fabric',
    features: ['Tailored Fit', 'Wrinkle-Resistant', 'Formal']
  },

  // Women's Collection
  {
    id: 'w1',
    name: 'FORMAL BLOUSE - WHITE',
    price: '₹1,800',
    category: 'Women',
    subcategory: 'Blouses',
    image: './components/Assets/3.png',
    description: 'Elegant formal blouse with feminine cut and professional styling.',
    isNew: true,
    gender: 'women',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['White', 'Light Blue', 'Cream'],
    material: 'Premium Cotton',
    features: ['Feminine Cut', 'Professional Styling', 'Elegant']
  },
  {
    id: 'w2',
    name: 'FORMAL SKIRT - NAVY',
    price: '₹2,000',
    category: 'Women',
    subcategory: 'Skirts',
    image: './components/Assets/4.png',
    description: 'Professional formal skirt with A-line cut and comfortable waistband.',
    isNew: false,
    gender: 'women',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Navy Blue', 'Black', 'Grey'],
    material: 'Stretch Fabric',
    features: ['A-line Cut', 'Comfortable Waistband', 'Professional']
  },

  // Accessories
  {
    id: 'a1',
    name: 'LEATHER BELT - BLACK',
    price: '₹800',
    category: 'Accessories',
    subcategory: 'Belts',
    image: './components/Assets/5.png',
    description: 'Premium leather belt with durable construction and classic buckle.',
    isNew: false,
    gender: 'unisex',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Black', 'Brown'],
    material: 'Genuine Leather',
    features: ['Premium Leather', 'Durable Construction', 'Classic Buckle']
  },
  {
    id: 'a2',
    name: 'FORMAL SHOES - BLACK',
    price: '₹3,500',
    category: 'Accessories',
    subcategory: 'Shoes',
    image: './components/Assets/1.png',
    description: 'Professional formal shoes with leather construction and comfortable sole.',
    isNew: true,
    gender: 'unisex',
    sizes: ['6', '7', '8', '9', '10', '11'],
    colors: ['Black', 'Brown'],
    material: 'Genuine Leather',
    features: ['Leather Construction', 'Comfortable Sole', 'Professional']
  },
  {
    id: 'a3',
    name: 'DRESS SOCKS - NAVY',
    price: '₹300',
    category: 'Accessories',
    subcategory: 'Socks',
    image: './components/Assets/2.png',
    description: 'Premium dress socks with moisture-wicking properties and comfortable fit.',
    isNew: false,
    gender: 'unisex',
    sizes: ['S', 'M', 'L'],
    colors: ['Navy Blue', 'Black', 'Grey'],
    material: 'Cotton Blend',
    features: ['Moisture-Wicking', 'Comfortable Fit', 'Premium Quality']
  },
  {
    id: 'a4',
    name: 'SILK TIE - BURGUNDY',
    price: '₹1,200',
    category: 'Accessories',
    subcategory: 'Ties',
    image: './components/Assets/3.png',
    description: 'Elegant silk tie with classic pattern and premium finish.',
    isNew: true,
    gender: 'men',
    sizes: ['One Size'],
    colors: ['Burgundy', 'Navy Blue', 'Black'],
    material: '100% Silk',
    features: ['100% Silk', 'Classic Pattern', 'Premium Finish']
  },
  {
    id: 'a5',
    name: 'LAPTOP BAG - BLACK',
    price: '₹2,500',
    category: 'Accessories',
    subcategory: 'Bags',
    image: './components/Assets/4.png',
    description: 'Professional laptop bag with padded compartments and durable construction.',
    isNew: false,
    gender: 'unisex',
    sizes: ['One Size'],
    colors: ['Black', 'Brown', 'Navy Blue'],
    material: 'Durable Nylon',
    features: ['Padded Compartments', 'Durable Construction', 'Professional']
  },
  {
    id: 'a6',
    name: 'CUFFLINKS - SILVER',
    price: '₹1,800',
    category: 'Accessories',
    subcategory: 'Cufflinks',
    image: './components/Assets/5.png',
    description: 'Elegant silver cufflinks with sophisticated design and premium finish.',
    isNew: true,
    gender: 'men',
    sizes: ['One Size'],
    colors: ['Silver', 'Gold'],
    material: 'Sterling Silver',
    features: ['Sterling Silver', 'Sophisticated Design', 'Premium Finish']
  },
  {
    id: 'a7',
    name: 'POCKET SQUARE - WHITE',
    price: '₹600',
    category: 'Accessories',
    subcategory: 'Pocket Squares',
    image: './components/Assets/1.png',
    description: 'Classic white pocket square with fine cotton construction.',
    isNew: false,
    gender: 'men',
    sizes: ['One Size'],
    colors: ['White', 'Light Blue', 'Grey'],
    material: 'Fine Cotton',
    features: ['Fine Cotton', 'Classic Design', 'Versatile']
  },
  {
    id: 'a8',
    name: 'WATCH - PROFESSIONAL',
    price: '₹4,500',
    category: 'Accessories',
    subcategory: 'Watches',
    image: './components/Assets/2.png',
    description: 'Professional watch with stainless steel construction and water resistance.',
    isNew: true,
    gender: 'unisex',
    sizes: ['One Size'],
    colors: ['Silver', 'Gold', 'Black'],
    material: 'Stainless Steel',
    features: ['Stainless Steel', 'Water Resistant', 'Professional Design']
  }
];

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Cart state
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Wishlist state
  const [wishlistItems, setWishlistItems] = useState<Product[]>([]);

  // User state
  const [user, setUser] = useState<User | null>(null);

  // Search state
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // UI state
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('sks-cart');
    const savedWishlist = localStorage.getItem('sks-wishlist');
    const savedUser = localStorage.getItem('sks-user');

    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
    if (savedWishlist) {
      setWishlistItems(JSON.parse(savedWishlist));
    }
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    localStorage.setItem('sks-cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Save wishlist to localStorage
  useEffect(() => {
    localStorage.setItem('sks-wishlist', JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  // Save user to localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem('sks-user', JSON.stringify(user));
    } else {
      localStorage.removeItem('sks-user');
    }
  }, [user]);

  // Cart functions
  const addToCart = (product: Product, size?: string) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === product.id && item.size === size);
      if (existingItem) {
        return prev.map(item =>
          item.id === product.id && item.size === size
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1, size }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems(prev =>
      prev.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const cartTotal = cartItems.reduce((total, item) => {
    const price = parseFloat(item.price.replace('₹', '').replace(',', ''));
    return total + (price * item.quantity);
  }, 0);

  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  // Wishlist functions
  const addToWishlist = (product: Product) => {
    setWishlistItems(prev => {
      if (prev.find(item => item.id === product.id)) {
        return prev;
      }
      return [...prev, product];
    });
  };

  const removeFromWishlist = (productId: string) => {
    setWishlistItems(prev => prev.filter(item => item.id !== productId));
  };

  const isInWishlist = (productId: string) => {
    return wishlistItems.some(item => item.id === productId);
  };

  // User functions
  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock authentication - in real app, this would be an API call
    if (email && password) {
      const newUser: User = {
        id: '1',
        name: email.split('@')[0],
        email,
        isLoggedIn: true
      };
      setUser(newUser);
      return true;
    }
    return false;
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock registration - in real app, this would be an API call
    if (name && email && password) {
      const newUser: User = {
        id: '1',
        name,
        email,
        isLoggedIn: true
      };
      setUser(newUser);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  // Search functions
  const performSearch = (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    const results = ALL_PRODUCTS.filter(product =>
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.description.toLowerCase().includes(query.toLowerCase()) ||
      product.category.toLowerCase().includes(query.toLowerCase())
    );
    
    setSearchResults(results);
  };

  const requestQuote = async (productIds: string[], message: string, contactInfo: any): Promise<boolean> => {
    try {
      const { default: apiService } = await import('../services/api');
      
      const response = await apiService.requestQuote({
        productIds,
        message,
        contactInfo
      });
      
      if (response.success) {
        alert(`Quote request submitted successfully! We'll get back to you within 24 hours at ${contactInfo.email}.`);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Quote request error:', error);
      alert('Error submitting quote request. Please try again or contact us directly.');
      return false;
    }
  };

  const requestSamples = async (productIds: string[], contactInfo: any): Promise<boolean> => {
    try {
      const { default: apiService } = await import('../services/api');
      
      const response = await apiService.requestSamples({
        productIds,
        contactInfo
      });
      
      if (response.success) {
        alert(`Sample request submitted successfully! Samples will be shipped to ${contactInfo.address} within 3-5 business days.`);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Sample request error:', error);
      alert('Error submitting sample request. Please try again or contact us directly.');
      return false;
    }
  };

  const downloadCatalog = () => {
    // In a real app, this would download a PDF catalog
    // For now, we'll simulate the download
    const link = document.createElement('a');
    link.href = 'data:text/plain;charset=utf-8,SKS Uniforms Catalog - Professional Solutions for Every Institution';
    link.download = 'SKS-Uniforms-Catalog-2024.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    alert('Catalog download started! Check your downloads folder.');
  };

  const subscribeNewsletter = async (email: string, categories: string[]): Promise<boolean> => {
    try {
      const { default: apiService } = await import('../services/api');
      
      const response = await apiService.subscribeNewsletter({
        email,
        categories,
        name: email.split('@')[0] // Extract name from email
      });
      
      if (response.success) {
        return true;
      }
      return false;
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      return false;
    }
  };

  const bookConsultation = async (consultationType: string, contactInfo: any): Promise<boolean> => {
    try {
      const { default: apiService } = await import('../services/api');
      
      const response = await apiService.bookConsultation({
        consultationType,
        contactInfo
      });
      
      if (response.success) {
        alert(`${consultationType} consultation booked successfully! We'll contact you at ${contactInfo.phone} to schedule the appointment.`);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Consultation booking error:', error);
      alert('Error booking consultation. Please try again or contact us directly.');
      return false;
    }
  };

  const reorderItems = (orderItems: CartItem[]) => {
    // Add all items from previous order to cart
    orderItems.forEach(item => {
      addToCart(item, item.size);
    });
    
    // Open cart to show added items
    setIsCartOpen(true);
    
    alert(`${orderItems.length} items added to cart from your previous order!`);
  };

  const value: AppContextType = {
    // Cart
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartTotal,
    cartCount,
    isCartOpen,
    setIsCartOpen,

    // Wishlist
    wishlistItems,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,

    // User
    user,
    login,
    logout,
    register,

    // Search
    searchQuery,
    setSearchQuery,
    searchResults,
    performSearch,
    isSearchOpen,
    setIsSearchOpen,

    // UI
    selectedProduct,
    setSelectedProduct,

    // New functionality
    requestQuote,
    requestSamples,
    downloadCatalog,
    subscribeNewsletter,
    bookConsultation,
    reorderItems
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};