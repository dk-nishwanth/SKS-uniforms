import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MessageCircle, Search, Menu, X, User, Heart } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import SearchModal from './SearchModal';
import ProfileModal from './ProfileModal';
import '../navbar-mobile-fix.css';

interface NavbarProps {
  enquiryCount?: number;
}

const Navbar: React.FC<NavbarProps> = ({ enquiryCount: propEnquiryCount }) => {
  const { 
    enquiryCount, 
    setIsEnquiryOpen, 
    setIsSearchOpen, 
    wishlistItems,
    user
  } = useApp();
  
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  const finalEnquiryCount = propEnquiryCount !== undefined ? propEnquiryCount : enquiryCount;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // On home page, completely transparent with black text on mobile, white on desktop
  const navClasses = isHomePage 
    ? (isScrolled 
        ? 'bg-white text-black border-b border-black shadow-sm' 
        : 'bg-transparent text-black md:text-white border-none')
    : 'bg-white text-black border-b border-black shadow-sm';

  // Remove text shadow
  const textShadowStyle = {};

  return (
    <>
      <header 
        className={`fixed top-0 left-0 w-full z-[9999] transition-all duration-500 ${navClasses} ${isHomePage && !isScrolled ? 'transparent' : ''}`} 
        style={{ 
          position: 'fixed', 
          zIndex: 9999, 
          top: 0, 
          left: 0, 
          right: 0, 
          width: '100%',
          display: 'flex',
          visibility: 'visible',
          opacity: 1
        }}
        data-navbar
      >
        <nav 
          className="flex items-center justify-between h-16 md:h-20 px-4 md:px-8 lg:px-12"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            height: '64px',
            visibility: 'visible',
            opacity: 1
          }}
        >
          {/* Left Side: Category Links */}
          <div className="hidden lg:flex items-center gap-6 text-[11px] font-bold tracking-widest">
            <Link to="/schools" className="hover:opacity-50 transition-opacity">SCHOOLS</Link>
            <Link to="/healthcare" className="hover:opacity-50 transition-opacity">HEALTHCARE</Link>
            <Link to="/corporate" className="hover:opacity-50 transition-opacity">CORPORATE</Link>
            <Link to="/men" className="hover:opacity-50 transition-opacity">MEN'S</Link>
            <Link to="/women" className="hover:opacity-50 transition-opacity">WOMEN'S</Link>
            <Link to="/catalog" className="hover:opacity-50 transition-opacity">CATALOG</Link>
          </div>
          
          <div className="lg:hidden mobile-menu-btn">
            <button 
              className="p-2 hover:opacity-70 transition-opacity"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open Menu"
              style={textShadowStyle}
            >
              <Menu size={24} />
            </button>
          </div>

          {/* Center: Logo */}
          <div className="absolute left-1/2 -translate-x-1/2 navbar-logo">
            <Link 
              to="/" 
              className="flex flex-col md:flex-row items-center justify-center md:gap-1 font-heading leading-none hover:opacity-80 transition-opacity"
              style={textShadowStyle}
            >
              <span className="text-base md:text-3xl tracking-tight">SKS</span>
              <span className="text-[10px] md:text-xl tracking-widest">UNIFORMS</span>
            </Link>
          </div>

          {/* Right Side: Icons */}
          <div className="flex items-center gap-3 md:gap-5 navbar-icons">
            <div className="hidden md:flex items-center gap-6 text-[11px] font-bold tracking-widest mr-4">
              <Link to="/about" className="hover:opacity-50 transition-opacity">ABOUT</Link>
              <Link to="/contact" className="hover:opacity-50 transition-opacity">CONTACT</Link>
            </div>
            
            <button 
              onClick={() => setIsSearchOpen(true)}
              className="p-2 hover:opacity-50 transition-opacity"
              aria-label="Search"
              style={textShadowStyle}
            >
              <Search size={20} />
            </button>
            
            <button 
              onClick={() => setIsProfileOpen(true)}
              className="p-2 hover:opacity-50 transition-opacity relative"
              aria-label="Profile"
              style={textShadowStyle}
            >
              <User size={20} />
              {user && (
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full"></div>
              )}
            </button>
            
            <Link 
              to="/wishlist" 
              className="p-2 hover:opacity-50 transition-opacity relative"
              aria-label="Wishlist"
              style={textShadowStyle}
            >
              <Heart size={20} />
              {wishlistItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {wishlistItems.length}
                </span>
              )}
            </Link>
            
            <button 
              onClick={() => setIsEnquiryOpen(true)}
              className="p-2 hover:opacity-50 transition-opacity relative"
              aria-label="Enquiry List"
              style={textShadowStyle}
            >
              <MessageCircle size={20} />
              {finalEnquiryCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-black text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {finalEnquiryCount}
                </span>
              )}
            </button>
          </div>
        </nav>

        {/* Mobile Menu Overlay */}
        <div className={`lg:hidden fixed inset-0 z-[99999] transition-all duration-500 ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)} />
          <div className={`absolute top-0 left-0 h-full w-80 bg-white border-r border-black transform transition-transform duration-500 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
            <div className="flex items-center justify-between p-6 border-b border-black">
              <span className="font-heading text-2xl tracking-tight">MENU</span>
              <button onClick={() => setIsMobileMenuOpen(false)}>
                <X size={24} />
              </button>
            </div>
            <nav className="p-6 space-y-6">
              <Link 
                to="/schools" 
                className="block text-lg font-bold tracking-widest hover:opacity-50 transition-opacity"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                SCHOOLS
              </Link>
              <Link 
                to="/healthcare" 
                className="block text-lg font-bold tracking-widest hover:opacity-50 transition-opacity"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                HEALTHCARE
              </Link>
              <Link 
                to="/corporate" 
                className="block text-lg font-bold tracking-widest hover:opacity-50 transition-opacity"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                CORPORATE
              </Link>
              <Link 
                to="/men" 
                className="block text-lg font-bold tracking-widest hover:opacity-50 transition-opacity"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                MEN'S
              </Link>
              <Link 
                to="/women" 
                className="block text-lg font-bold tracking-widest hover:opacity-50 transition-opacity"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                WOMEN'S
              </Link>
              <Link 
                to="/catalog" 
                className="block text-lg font-bold tracking-widest hover:opacity-50 transition-opacity"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                CATALOG
              </Link>
              <div className="border-t border-black pt-6 space-y-4">
                <Link 
                  to="/about" 
                  className="block text-sm font-bold tracking-widest hover:opacity-50 transition-opacity"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  ABOUT
                </Link>
                <Link 
                  to="/contact" 
                  className="block text-sm font-bold tracking-widest hover:opacity-50 transition-opacity"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  CONTACT
                </Link>
                <Link 
                  to="/wishlist" 
                  className="block text-sm font-bold tracking-widest hover:opacity-50 transition-opacity"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  WISHLIST ({wishlistItems.length})
                </Link>
              </div>
            </nav>
          </div>
        </div>
      </header>

      {/* Modals */}
      <SearchModal />
      <ProfileModal isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} />
    </>
  );
};

export default Navbar;