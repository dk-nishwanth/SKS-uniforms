import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar cartCount={0} />
      
      <main className="flex-grow pt-20">
        {/* Hero Section */}
        <section className="py-16 border-b border-black">
          <div className="max-w-[1200px] mx-auto px-8">
            <h1 className="font-heading text-6xl md:text-8xl tracking-tight mb-6">
              PRIVACY POLICY
            </h1>
            <p className="text-zinc-600 text-lg max-w-2xl">
              Your privacy is important to us. This policy explains how SKS Uniforms collects, uses, and protects your information.
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
                <h2 className="font-heading text-3xl mb-6">INFORMATION WE COLLECT</h2>
                <div className="space-y-4 text-zinc-600 leading-relaxed">
                  <p>
                    We collect information you provide directly to us, such as when you create an account, 
                    make a purchase, request a quote, or contact us for support.
                  </p>
                  <p>This may include:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Name, email address, and phone number</li>
                    <li>Billing and shipping addresses</li>
                    <li>Payment information (processed securely by our payment providers)</li>
                    <li>Organization details for bulk orders</li>
                    <li>Communication preferences</li>
                  </ul>
                </div>
              </div>

              <div>
                <h2 className="font-heading text-3xl mb-6">HOW WE USE YOUR INFORMATION</h2>
                <div className="space-y-4 text-zinc-600 leading-relaxed">
                  <p>We use the information we collect to:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Process and fulfill your orders</li>
                    <li>Provide customer support and respond to inquiries</li>
                    <li>Send order confirmations and shipping updates</li>
                    <li>Improve our products and services</li>
                    <li>Comply with legal obligations</li>
                  </ul>
                </div>
              </div>

              <div>
                <h2 className="font-heading text-3xl mb-6">INFORMATION SHARING</h2>
                <div className="space-y-4 text-zinc-600 leading-relaxed">
                  <p>
                    We do not sell, trade, or otherwise transfer your personal information to third parties 
                    without your consent, except as described in this policy.
                  </p>
                  <p>We may share your information with:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Service providers who assist with order fulfillment and shipping</li>
                    <li>Payment processors for secure transaction processing</li>
                    <li>Legal authorities when required by law</li>
                  </ul>
                </div>
              </div>

              <div>
                <h2 className="font-heading text-3xl mb-6">DATA SECURITY</h2>
                <div className="space-y-4 text-zinc-600 leading-relaxed">
                  <p>
                    We implement appropriate security measures to protect your personal information 
                    against unauthorized access, alteration, disclosure, or destruction.
                  </p>
                </div>
              </div>

              <div>
                <h2 className="font-heading text-3xl mb-6">YOUR RIGHTS</h2>
                <div className="space-y-4 text-zinc-600 leading-relaxed">
                  <p>You have the right to:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Access and update your personal information</li>
                    <li>Request deletion of your data</li>
                    <li>Opt out of marketing communications</li>
                    <li>Request a copy of your data</li>
                  </ul>
                </div>
              </div>

              <div>
                <h2 className="font-heading text-3xl mb-6">CONTACT US</h2>
                <div className="space-y-4 text-zinc-600 leading-relaxed">
                  <p>
                    If you have questions about this Privacy Policy, please contact us:
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

export default PrivacyPolicy;