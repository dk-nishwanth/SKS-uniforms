import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useApp } from '../contexts/AppContext';

const SizeGuide: React.FC = () => {
  const { bookConsultation, enquiryCount } = useApp();

  const handleBookConsultation = async () => {
    const contactInfo = {
      name: 'Consultation Request',
      email: 'duraikannan73@gmail.com',
      phone: '+91 7338031038',
      organization: 'Sample Organization',
      preferredTime: 'Weekdays 10 AM - 5 PM'
    };
    
    try {
      await bookConsultation('Custom Fitting', contactInfo);
    } catch (error) {
      console.error('Consultation booking failed:', error);
      // Fallback to contact page
      window.location.href = '/contact';
    }
  };
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar enquiryCount={enquiryCount} />
      
      <main className="flex-grow pt-20">
        {/* Hero Section */}
        <section className="py-16 border-b border-black">
          <div className="max-w-[1200px] mx-auto px-8">
            <h1 className="font-heading text-6xl md:text-8xl tracking-tight mb-6">
              SIZE GUIDE
            </h1>
            <p className="text-zinc-600 text-lg max-w-2xl">
              Find your perfect fit with our comprehensive sizing guide for all uniform categories.
            </p>
          </div>
        </section>

        {/* Measurement Guide */}
        <section className="py-24 border-b border-black">
          <div className="max-w-[1200px] mx-auto px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="font-heading text-4xl mb-8">HOW TO MEASURE</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-heading text-xl mb-3">CHEST/BUST</h3>
                    <p className="text-zinc-600 leading-relaxed">
                      Measure around the fullest part of your chest/bust, keeping the tape measure level and snug but not tight.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-heading text-xl mb-3">WAIST</h3>
                    <p className="text-zinc-600 leading-relaxed">
                      Measure around your natural waistline, which is the narrowest part of your torso.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-heading text-xl mb-3">HIPS</h3>
                    <p className="text-zinc-600 leading-relaxed">
                      Measure around the fullest part of your hips, approximately 8 inches below your waist.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-heading text-xl mb-3">INSEAM</h3>
                    <p className="text-zinc-600 leading-relaxed">
                      Measure from the crotch seam to the desired hem length along the inside of your leg.
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-zinc-50 p-8 border border-black">
                <h3 className="font-heading text-2xl mb-6">MEASUREMENT TIPS</h3>
                <ul className="space-y-4 text-zinc-600">
                  <li className="flex items-start gap-3">
                    <span className="text-amber-600 font-bold">•</span>
                    Use a flexible measuring tape
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-amber-600 font-bold">•</span>
                    Wear fitted clothing while measuring
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-amber-600 font-bold">•</span>
                    Have someone help you for accuracy
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-amber-600 font-bold">•</span>
                    Keep the tape level and snug
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-amber-600 font-bold">•</span>
                    Round measurements to the nearest half inch
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Size Charts */}
        <section className="py-24 border-b border-black">
          <div className="max-w-[1400px] mx-auto px-8">
            <h2 className="font-heading text-4xl text-center mb-16">SIZE CHARTS</h2>
            
            {/* Men's Sizes */}
            <div className="mb-16">
              <h3 className="font-heading text-2xl mb-8">MEN'S UNIFORMS</h3>
              <div className="overflow-x-auto border border-black">
                <table className="w-full">
                  <thead className="bg-black text-white">
                    <tr>
                      <th className="p-4 text-left text-[11px] font-bold tracking-widest">SIZE</th>
                      <th className="p-4 text-left text-[11px] font-bold tracking-widest">CHEST (CM)</th>
                      <th className="p-4 text-left text-[11px] font-bold tracking-widest">WAIST (CM)</th>
                      <th className="p-4 text-left text-[11px] font-bold tracking-widest">COLLAR (CM)</th>
                      <th className="p-4 text-left text-[11px] font-bold tracking-widest">SLEEVE (CM)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { size: 'S', chest: '86-91', waist: '71-76', collar: '37-38', sleeve: '81-84' },
                      { size: 'M', chest: '96-101', waist: '81-86', collar: '39-40', sleeve: '84-87' },
                      { size: 'L', chest: '106-111', waist: '91-96', collar: '41-42', sleeve: '87-90' },
                      { size: 'XL', chest: '116-121', waist: '101-106', collar: '43-44', sleeve: '90-93' },
                      { size: 'XXL', chest: '126-131', waist: '111-116', collar: '45-46', sleeve: '93-96' }
                    ].map((row, i) => (
                      <tr key={i} className={i % 2 === 0 ? 'bg-zinc-50' : 'bg-white'}>
                        <td className="p-4 font-bold">{row.size}</td>
                        <td className="p-4">{row.chest}</td>
                        <td className="p-4">{row.waist}</td>
                        <td className="p-4">{row.collar}</td>
                        <td className="p-4">{row.sleeve}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Women's Sizes */}
            <div className="mb-16">
              <h3 className="font-heading text-2xl mb-8">WOMEN'S UNIFORMS</h3>
              <div className="overflow-x-auto border border-black">
                <table className="w-full">
                  <thead className="bg-black text-white">
                    <tr>
                      <th className="p-4 text-left text-[11px] font-bold tracking-widest">SIZE</th>
                      <th className="p-4 text-left text-[11px] font-bold tracking-widest">BUST (CM)</th>
                      <th className="p-4 text-left text-[11px] font-bold tracking-widest">WAIST (CM)</th>
                      <th className="p-4 text-left text-[11px] font-bold tracking-widest">HIPS (CM)</th>
                      <th className="p-4 text-left text-[11px] font-bold tracking-widest">LENGTH (CM)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { size: 'XS', bust: '81-84', waist: '61-64', hips: '86-89', length: '58-60' },
                      { size: 'S', bust: '86-89', waist: '66-69', hips: '91-94', length: '60-62' },
                      { size: 'M', bust: '91-94', waist: '71-74', hips: '96-99', length: '62-64' },
                      { size: 'L', bust: '96-99', waist: '76-79', hips: '101-104', length: '64-66' },
                      { size: 'XL', bust: '101-104', waist: '81-84', hips: '106-109', length: '66-68' }
                    ].map((row, i) => (
                      <tr key={i} className={i % 2 === 0 ? 'bg-zinc-50' : 'bg-white'}>
                        <td className="p-4 font-bold">{row.size}</td>
                        <td className="p-4">{row.bust}</td>
                        <td className="p-4">{row.waist}</td>
                        <td className="p-4">{row.hips}</td>
                        <td className="p-4">{row.length}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* School Sizes */}
            <div>
              <h3 className="font-heading text-2xl mb-8">SCHOOL UNIFORMS (AGES 6-18)</h3>
              <div className="overflow-x-auto border border-black">
                <table className="w-full">
                  <thead className="bg-black text-white">
                    <tr>
                      <th className="p-4 text-left text-[11px] font-bold tracking-widest">AGE</th>
                      <th className="p-4 text-left text-[11px] font-bold tracking-widest">SIZE</th>
                      <th className="p-4 text-left text-[11px] font-bold tracking-widest">CHEST (CM)</th>
                      <th className="p-4 text-left text-[11px] font-bold tracking-widest">HEIGHT (CM)</th>
                      <th className="p-4 text-left text-[11px] font-bold tracking-widest">WAIST (CM)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { age: '6-7', size: '22', chest: '56-58', height: '110-120', waist: '50-52' },
                      { age: '8-9', size: '24', chest: '60-62', height: '120-130', waist: '52-54' },
                      { age: '10-11', size: '26', chest: '64-66', height: '130-140', waist: '54-56' },
                      { age: '12-13', size: '28', chest: '68-70', height: '140-150', waist: '56-58' },
                      { age: '14-15', size: '30', chest: '72-74', height: '150-160', waist: '58-60' },
                      { age: '16-18', size: '32', chest: '76-78', height: '160-170', waist: '60-62' }
                    ].map((row, i) => (
                      <tr key={i} className={i % 2 === 0 ? 'bg-zinc-50' : 'bg-white'}>
                        <td className="p-4 font-bold">{row.age}</td>
                        <td className="p-4 font-bold">{row.size}</td>
                        <td className="p-4">{row.chest}</td>
                        <td className="p-4">{row.height}</td>
                        <td className="p-4">{row.waist}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* Custom Fitting */}
        <section className="py-24 bg-zinc-50">
          <div className="max-w-[1200px] mx-auto px-8 text-center">
            <h2 className="font-heading text-4xl mb-8">NEED A CUSTOM FIT?</h2>
            <p className="text-zinc-600 text-lg mb-12 max-w-2xl mx-auto">
              For bulk orders or special requirements, we offer professional fitting consultations 
              and custom tailoring services.
            </p>
            <div className="flex gap-6 justify-center">
              <button 
                onClick={handleBookConsultation}
                className="bg-black text-white px-10 py-4 text-[11px] font-bold tracking-widest uppercase hover:bg-amber-600 transition-colors"
              >
                BOOK CONSULTATION
              </button>
              <a 
                href="tel:+917338031038"
                className="border border-black text-black px-10 py-4 text-[11px] font-bold tracking-widest uppercase hover:bg-black hover:text-white transition-all"
              >
                CALL FOR FITTING
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default SizeGuide;