import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useApp } from '../contexts/AppContext';

const NotFound: React.FC = () => {
  const { enquiryCount } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar enquiryCount={enquiryCount} />
      
      <main className="flex-grow pt-20 flex items-center justify-center">
        <div className="text-center px-8">
          <div className="mb-8">
            <img 
              src="/images/Business Suit 1.png" 
              alt="SKS Uniforms" 
              className="w-48 h-48 mx-auto object-cover grayscale opacity-30"
            />
          </div>
          
          <h1 className="font-heading text-8xl md:text-[200px] leading-none mb-6 text-zinc-200">
            404
          </h1>
          
          <h2 className="font-heading text-4xl md:text-6xl tracking-tight mb-6">
            PAGE NOT FOUND
          </h2>
          
          <p className="text-zinc-600 text-lg mb-12 max-w-md mx-auto leading-relaxed">
            The page you're looking for doesn't exist or has been moved. 
            Let's get you back to finding the perfect uniforms.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/"
              className="bg-black text-white px-10 py-4 text-[11px] font-bold tracking-widest uppercase hover:bg-amber-600 transition-colors"
            >
              RETURN HOME
            </Link>
            <Link 
              to="/catalog"
              className="border border-black text-black px-10 py-4 text-[11px] font-bold tracking-widest uppercase hover:bg-black hover:text-white transition-all"
            >
              VIEW CATALOG
            </Link>
          </div>
          
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
            <Link to="/schools" className="group text-center">
              <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">🎓</div>
              <h3 className="font-heading text-lg mb-2">SCHOOLS</h3>
              <p className="text-sm text-zinc-600">Educational uniforms</p>
            </Link>
            
            <Link to="/healthcare" className="group text-center">
              <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">🏥</div>
              <h3 className="font-heading text-lg mb-2">HEALTHCARE</h3>
              <p className="text-sm text-zinc-600">Medical uniforms</p>
            </Link>
            
            <Link to="/corporate" className="group text-center">
              <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">🏢</div>
              <h3 className="font-heading text-lg mb-2">CORPORATE</h3>
              <p className="text-sm text-zinc-600">Business attire</p>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default NotFound;