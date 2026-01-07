import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, EnquiryItem } from '../types';

interface User {
  id: string;
  name: string;
  email: string;
  isLoggedIn: boolean;
}

interface AppContextType {
  // Enquiry state (replacing cart)
  enquiryItems: EnquiryItem[];
  addToEnquiry: (product: Product, size?: string, quantity?: number, notes?: string) => void;
  removeFromEnquiry: (productId: string) => void;
  updateEnquiryItem: (productId: string, updates: Partial<EnquiryItem>) => void;
  clearEnquiry: () => void;
  enquiryCount: number;

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
  isEnquiryOpen: boolean;
  setIsEnquiryOpen: (open: boolean) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;

  // Enquiry functionality
  submitEnquiry: (contactInfo: any, message: string) => Promise<boolean>;
  requestQuote: (productIds: string[], message: string, contactInfo: any) => Promise<boolean>;
  requestSamples: (productIds: string[], contactInfo: any) => Promise<boolean>;
  downloadCatalog: () => void;
  subscribeNewsletter: (email: string, categories: string[]) => Promise<boolean>;
  bookConsultation: (consultationType: string, contactInfo: any) => Promise<boolean>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

// All products data with comprehensive categories (prices removed for enquiry-based system)
export const ALL_PRODUCTS: Product[] = [
  // School Uniforms
  {
    id: 's1',
    name: 'SCHOOL BLAZER - NAVY BLUE',
    category: 'Schools',
    subcategory: 'Blazers',
    image: '/images/School Uniform 1.png',
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
    category: 'Schools',
    subcategory: 'Complete Sets',
    image: '/images/School Uniform 2.png',
    description: 'Complete school uniform set with professional finish. Includes shirt, trousers, and tie.',
    isNew: false,
    gender: 'unisex',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Grey', 'Navy Blue'],
    material: 'Cotton Blend',
    features: ['Complete Set', 'Professional Finish', 'Durable']
  },
  {
    id: 's3',
    name: 'COLLEGE UNIFORM - FORMAL',
    category: 'Schools',
    subcategory: 'College Wear',
    image: '/images/College Uniform 1.png',
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
    category: 'Schools',
    subcategory: 'College Wear',
    image: '/images/College Uniform 2.png',
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
    category: 'Healthcare',
    subcategory: 'Scrubs',
    image: '/images/Medical Uniform 1.png',
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
    category: 'Healthcare',
    subcategory: 'Hospital Wear',
    image: '/images/Hospital Uniform 1.png',
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
    category: 'Healthcare',
    subcategory: 'Surgical Wear',
    image: '/images/Hospital Uniform 2.png',
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
    category: 'Corporate',
    subcategory: 'Suits',
    image: '/images/Business Suit 1.png',
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
    category: 'Corporate',
    subcategory: 'Office Wear',
    image: '/images/Corporate Uniform 1.png',
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
    category: 'Corporate',
    subcategory: 'Executive Wear',
    image: '/images/Corporate Uniform 2.png',
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
    category: 'Corporate',
    subcategory: 'Hospitality',
    image: '/images/Hotel Uniform 1.png',
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
    category: 'Corporate',
    subcategory: 'Hospitality',
    image: '/images/Hotel Uniform 2.png',
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
    category: 'Corporate',
    subcategory: 'Business Wear',
    image: '/images/Business Uniform 1.png',
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
    category: 'Men',
    subcategory: 'Shirts',
    image: '/images/1.png',
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
    category: 'Men',
    subcategory: 'Trousers',
    image: '/images/2.png',
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
    category: 'Women',
    subcategory: 'Blouses',
    image: '/images/3.png',
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
    category: 'Women',
    subcategory: 'Skirts',
    image: '/images/4.png',
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
    category: 'Accessories',
    subcategory: 'Belts',
    image: '/images/5.png',
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
    category: 'Accessories',
    subcategory: 'Shoes',
    image: '/images/1.png',
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
    category: 'Accessories',
    subcategory: 'Socks',
    image: '/images/2.png',
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
    category: 'Accessories',
    subcategory: 'Ties',
    image: '/images/3.png',
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
    category: 'Accessories',
    subcategory: 'Bags',
    image: '/images/4.png',
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
    category: 'Accessories',
    subcategory: 'Cufflinks',
    image: '/images/5.png',
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
    category: 'Accessories',
    subcategory: 'Pocket Squares',
    image: '/images/1.png',
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
    category: 'Accessories',
    subcategory: 'Watches',
    image: '/images/2.png',
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
  // Enquiry state (replacing cart)
  const [enquiryItems, setEnquiryItems] = useState<EnquiryItem[]>([]);
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);

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
    const savedEnquiry = localStorage.getItem('sks-enquiry');
    const savedWishlist = localStorage.getItem('sks-wishlist');
    const savedUser = localStorage.getItem('sks-user');

    if (savedEnquiry) {
      setEnquiryItems(JSON.parse(savedEnquiry));
    }
    if (savedWishlist) {
      setWishlistItems(JSON.parse(savedWishlist));
    }
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  // Save enquiry to localStorage
  useEffect(() => {
    localStorage.setItem('sks-enquiry', JSON.stringify(enquiryItems));
  }, [enquiryItems]);

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

  // Enquiry functions (replacing cart functions)
  const addToEnquiry = (product: Product, size?: string, quantity: number = 1, notes?: string) => {
    setEnquiryItems(prev => {
      const existingItem = prev.find(item => item.id === product.id && item.selectedSize === size);
      if (existingItem) {
        return prev.map(item =>
          item.id === product.id && item.selectedSize === size
            ? { ...item, quantity: (item.quantity || 1) + quantity, notes: notes || item.notes }
            : item
        );
      }
      return [...prev, { ...product, selectedSize: size, quantity, notes }];
    });
  };

  const removeFromEnquiry = (productId: string) => {
    setEnquiryItems(prev => prev.filter(item => item.id !== productId));
  };

  const updateEnquiryItem = (productId: string, updates: Partial<EnquiryItem>) => {
    setEnquiryItems(prev =>
      prev.map(item =>
        item.id === productId ? { ...item, ...updates } : item
      )
    );
  };

  const clearEnquiry = () => {
    setEnquiryItems([]);
  };

  const enquiryCount = enquiryItems.length;

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
    // Mock login - in real app, this would call an API
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (email && password) {
      const mockUser: User = {
        id: '1',
        name: email.split('@')[0],
        email,
        isLoggedIn: true
      };
      setUser(mockUser);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    // Mock registration - in real app, this would call an API
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (name && email && password) {
      const mockUser: User = {
        id: '1',
        name,
        email,
        isLoggedIn: true
      };
      setUser(mockUser);
      return true;
    }
    return false;
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
      product.category.toLowerCase().includes(query.toLowerCase()) ||
      (product.subcategory && product.subcategory.toLowerCase().includes(query.toLowerCase()))
    );

    setSearchResults(results);
  };

  // Enquiry functionality
  const submitEnquiry = async (contactInfo: any, message: string): Promise<boolean> => {
    try {
      // Import API service
      const { default: apiService } = await import('../services/api');
      
      // Submit enquiry data to backend
      const response = await apiService.submitEnquiry({
        contactInfo,
        message,
        enquiryItems
      });
      
      if (response.success) {
        console.log('Enquiry submitted successfully:', response);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Enquiry submission error:', error);
      throw error;
    }
  };

  const requestQuote = async (productIds: string[], message: string, contactInfo: any): Promise<boolean> => {
    // Mock quote request
    await new Promise(resolve => setTimeout(resolve, 1500));
    console.log('Quote requested:', { productIds, message, contactInfo });
    return true;
  };

  const requestSamples = async (productIds: string[], contactInfo: any): Promise<boolean> => {
    // Mock sample request
    await new Promise(resolve => setTimeout(resolve, 1500));
    console.log('Samples requested:', { productIds, contactInfo });
    return true;
  };

  const downloadCatalog = () => {
    // Mock catalog download
    console.log('Catalog download initiated');
    alert('Catalog download will be available soon. Please contact us for a digital catalog.');
  };

  const subscribeNewsletter = async (email: string, categories: string[]): Promise<boolean> => {
    // Mock newsletter subscription
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Newsletter subscription:', { email, categories });
    return true;
  };

  const bookConsultation = async (consultationType: string, contactInfo: any): Promise<boolean> => {
    // Mock consultation booking
    await new Promise(resolve => setTimeout(resolve, 1500));
    console.log('Consultation booked:', { consultationType, contactInfo });
    return true;
  };

  const value: AppContextType = {
    // Enquiry state
    enquiryItems,
    addToEnquiry,
    removeFromEnquiry,
    updateEnquiryItem,
    clearEnquiry,
    enquiryCount,

    // Wishlist state
    wishlistItems,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,

    // User state
    user,
    login,
    logout,
    register,

    // Search state
    searchQuery,
    setSearchQuery,
    searchResults,
    performSearch,

    // UI state
    isEnquiryOpen,
    setIsEnquiryOpen,
    isSearchOpen,
    setIsSearchOpen,
    selectedProduct,
    setSelectedProduct,

    // Enquiry functionality
    submitEnquiry,
    requestQuote,
    requestSamples,
    downloadCatalog,
    subscribeNewsletter,
    bookConsultation
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};