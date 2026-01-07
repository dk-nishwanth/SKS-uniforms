import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './contexts/AppContext';
import App from './App';
import About from './pages/About';
import Schools from './pages/Schools';
import Healthcare from './pages/Healthcare';
import Corporate from './pages/Corporate';
import Men from './pages/Men';
import Women from './pages/Women';
import Contact from './pages/Contact';
import Catalog from './pages/Catalog';
import Wishlist from './pages/Wishlist';
import Enquiry from './pages/Enquiry';
import Orders from './pages/Orders';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import SizeGuide from './pages/SizeGuide';
import NotFound from './pages/NotFound';

const AppRouter: React.FC = () => {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/about" element={<About />} />
          <Route path="/schools" element={<Schools />} />
          <Route path="/healthcare" element={<Healthcare />} />
          <Route path="/corporate" element={<Corporate />} />
          <Route path="/men" element={<Men />} />
          <Route path="/women" element={<Women />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/enquiry" element={<Enquiry />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/size-guide" element={<SizeGuide />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AppProvider>
  );
};

export default AppRouter;