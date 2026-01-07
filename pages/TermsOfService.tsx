import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useApp } from '../contexts/AppContext';

const TermsOfService: React.FC = () => {
  const { enquiryCount } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar enquiryCount={enquiryCount} />
      
      <main className="flex-grow pt-20">
        {/* Hero Section */}
        <section className="py-16 border-b border-black">
          <div className="max-w-[1200px] mx-auto px-8">
            <h1 className="font-heading text-6xl md:text-8xl tracking-tight mb-6">
              TERMS OF SERVICE
            </h1>
            <p className="text-zinc-600 text-lg max-w-2xl">
              These terms govern your use of SKS Uniforms services and products. Please read carefully.
            </p>
            <div className="text-sm text-zinc-500 mt-4">
              Last updated: January 2024
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-24">
          <div className="max-w-[800px] mx-auto px-8 prose prose-lg">
            <div className="space-y-12">
              <div>
                <h2 className="font-heading text-3xl mb-6">ACCEPTANCE OF TERMS</h2>
                <div className="space-y-4 text-zinc-600 leading-relaxed">
                  <p>
                    By accessing and using SKS Uniforms services, you accept and agree to be bound by 
                    the terms and provision of this agreement.
                  </p>
                </div>
              </div>

              <div>
                <h2 className="font-heading text-3xl mb-6">PRODUCTS AND SERVICES</h2>
                <div className="space-y-4 text-zinc-600 leading-relaxed">
                  <p>
                    SKS Uniforms provides professional uniform solutions for educational institutions, 
                    healthcare facilities, and corporate organizations.
                  </p>
                  <p>Our services include:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Custom uniform design and manufacturing</li>
                    <li>Bulk orders for institutions</li>
                    <li>Embroidery and customization services</li>
                    <li>Quality assurance and fitting consultations</li>
                  </ul>
                </div>
              </div>

              <div>
                <h2 className="font-heading text-3xl mb-6">ORDERING AND PAYMENT</h2>
                <div className="space-y-4 text-zinc-600 leading-relaxed">
                  <p>
                    All orders are subject to acceptance and availability. We reserve the right to 
                    refuse or cancel orders at our discretion.
                  </p>
                  <p>Payment terms:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Payment is required before order processing</li>
                    <li>Bulk orders may require advance payment or deposit</li>
                    <li>All prices are in Indian Rupees (₹) unless otherwise stated</li>
                    <li>Prices are subject to change without notice</li>
                  </ul>
                </div>
              </div>

              <div>
                <h2 className="font-heading text-3xl mb-6">DELIVERY AND SHIPPING</h2>
                <div className="space-y-4 text-zinc-600 leading-relaxed">
                  <p>
                    We strive to deliver orders within the specified timeframe. Delivery times may 
                    vary based on location and order complexity.
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Standard delivery: 7-14 business days</li>
                    <li>Bulk orders: 2-4 weeks depending on quantity</li>
                    <li>Custom orders: 3-6 weeks for design and production</li>
                    <li>Shipping costs are calculated based on location and order size</li>
                  </ul>
                </div>
              </div>

              <div>
                <h2 className="font-heading text-3xl mb-6">RETURNS AND EXCHANGES</h2>
                <div className="space-y-4 text-zinc-600 leading-relaxed">
                  <p>
                    We want you to be completely satisfied with your purchase. Returns and exchanges 
                    are subject to the following conditions:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Items must be returned within 30 days of delivery</li>
                    <li>Items must be in original condition with tags attached</li>
                    <li>Custom embroidered items cannot be returned unless defective</li>
                    <li>Bulk orders require prior approval for returns</li>
                  </ul>
                </div>
              </div>

              <div>
                <h2 className="font-heading text-3xl mb-6">QUALITY GUARANTEE</h2>
                <div className="space-y-4 text-zinc-600 leading-relaxed">
                  <p>
                    We guarantee the quality of our uniforms and will replace any defective items 
                    at no additional cost.
                  </p>
                  <p>Our quality promise includes:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Premium fabric and construction materials</li>
                    <li>Professional finishing and attention to detail</li>
                    <li>Durability testing for institutional use</li>
                    <li>Compliance with industry standards</li>
                  </ul>
                </div>
              </div>

              <div>
                <h2 className="font-heading text-3xl mb-6">INTELLECTUAL PROPERTY</h2>
                <div className="space-y-4 text-zinc-600 leading-relaxed">
                  <p>
                    All content on this website, including designs, logos, and text, is the property 
                    of SKS Uniforms and is protected by copyright laws.
                  </p>
                </div>
              </div>

              <div>
                <h2 className="font-heading text-3xl mb-6">LIMITATION OF LIABILITY</h2>
                <div className="space-y-4 text-zinc-600 leading-relaxed">
                  <p>
                    SKS Uniforms shall not be liable for any indirect, incidental, or consequential 
                    damages arising from the use of our products or services.
                  </p>
                </div>
              </div>

              <div>
                <h2 className="font-heading text-3xl mb-6">CONTACT INFORMATION</h2>
                <div className="space-y-4 text-zinc-600 leading-relaxed">
                  <p>
                    For questions about these Terms of Service, please contact us:
                  </p>
                  <div className="bg-zinc-50 p-6 border border-black">
                    <p><strong>SKS Uniforms</strong></p>
                    <p>#1, 1st Floor, Sattar Building</p>
                    <p>Behind BSC Bata, Commercial Road</p>
                    <p>Ooty, The Nilgiris - 643001</p>
                    <p>Tamil Nadu, India</p>
                    <p className="mt-4">
                      Email: <a href="mailto:duraikannan73@gmail.com" className="text-amber-600 hover:underline">duraikannan73@gmail.com</a><br/>
                      Phone: <a href="tel:+917338031038" className="text-amber-600 hover:underline">+91 7338031038</a> | <a href="tel:+919980667425" className="text-amber-600 hover:underline">+91 9980667425</a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default TermsOfService;