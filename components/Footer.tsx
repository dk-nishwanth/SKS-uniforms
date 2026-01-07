import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';

const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const { subscribeNewsletter } = useApp();

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    
    try {
      const success = await subscribeNewsletter(email, selectedCategories);
      if (success) {
        setSubmitMessage('Thank you for subscribing!');
        setEmail('');
        setSelectedCategories([]);
      } else {
        setSubmitMessage('Subscription failed. Please try again.');
      }
    } catch (error) {
      setSubmitMessage('Subscription failed. Please try again.');
    }
    
    setIsSubmitting(false);
    setTimeout(() => setSubmitMessage(''), 3000);
  };
  return (
    <footer className="relative bg-white text-black overflow-hidden border-t border-black">
      {/* Massive Background Text Overlay */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 text-[18vw] font-heading opacity-[0.05] whitespace-nowrap pointer-events-none select-none tracking-tighter italic">
        ARKOLU
      </div>

      <div className="relative z-10 pt-32 px-8 lg:px-12">
        {/* Newsletter / Sign Up Row */}
        <div className="grid grid-cols-1 lg:grid-cols-4 border-y border-black py-8 mb-12">
            <div className="col-span-1 border-r border-black pr-8">
                 <div className="font-heading text-4xl mb-4">SKS UNIFORMS</div>
                 <div className="text-[10px] font-bold tracking-widest uppercase text-zinc-400">PROFESSIONAL SOLUTIONS FOR EVERY INSTITUTION</div>
            </div>
            <div className="col-span-3 flex flex-col md:flex-row items-center gap-12 px-8">
                <div className="flex gap-8">
                    {['SCHOOLS', 'HEALTHCARE', 'CORPORATE'].map(cat => (
                        <label key={cat} className="flex items-center gap-2 cursor-pointer group">
                            <div 
                              className={`w-4 h-4 border border-black transition-colors ${
                                selectedCategories.includes(cat) ? 'bg-black' : 'group-hover:bg-black'
                              }`}
                              onClick={() => handleCategoryToggle(cat)}
                            />
                            <span className="text-[11px] font-bold tracking-widest uppercase">{cat}</span>
                        </label>
                    ))}
                </div>
                <form onSubmit={handleNewsletterSubmit} className="flex-grow w-full relative">
                    <input 
                      type="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="EMAIL ADDRESS" 
                      className="w-full bg-transparent border-b border-black py-2 text-[12px] font-bold outline-none placeholder:text-zinc-300"
                      required
                    />
                    <button 
                      type="submit"
                      disabled={isSubmitting}
                      className="absolute right-0 bottom-2 text-[11px] font-bold tracking-widest uppercase hover:opacity-50 flex items-center gap-2 disabled:opacity-50"
                    >
                        {isSubmitting ? 'SUBMITTING...' : 'SUBMIT'} <ArrowRight size={14} />
                    </button>
                    {submitMessage && (
                      <div className="absolute -bottom-6 left-0 text-[10px] text-green-600 font-bold">
                        {submitMessage}
                      </div>
                    )}
                </form>
            </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-32">
            <div className="space-y-4">
                <h5 className="text-[10px] font-bold tracking-[0.2em] text-zinc-400 uppercase border-l-2 border-black pl-3">SERVICES</h5>
                <ul className="space-y-2 text-[11px] font-bold tracking-widest">
                    <li><Link to="/catalog" className="hover:opacity-50">BULK ORDERS</Link></li>
                    <li><Link to="/size-guide" className="hover:opacity-50">SIZE GUIDE</Link></li>
                    <li><Link to="/contact" className="hover:opacity-50">CUSTOM EMBROIDERY</Link></li>
                    <li><Link to="/contact" className="hover:opacity-50">CONSULTATION</Link></li>
                </ul>
            </div>
            <div className="space-y-4">
                <h5 className="text-[10px] font-bold tracking-[0.2em] text-zinc-400 uppercase border-l-2 border-black pl-3">SUPPORT</h5>
                <ul className="space-y-2 text-[11px] font-bold tracking-widest">
                    <li><a href="/size-guide" className="hover:opacity-50">SIZE GUIDE</a></li>
                    <li><a href="/terms-of-service" className="hover:opacity-50">RETURNS POLICY</a></li>
                    <li><a href="/contact" className="hover:opacity-50">CONTACT US</a></li>
                    <li><a href="/privacy-policy" className="hover:opacity-50">PRIVACY POLICY</a></li>
                    <li><a href="/terms-of-service" className="hover:opacity-50">TERMS OF SERVICE</a></li>
                </ul>
            </div>
            <div className="space-y-4">
                <h5 className="text-[10px] font-bold tracking-[0.2em] text-zinc-400 uppercase border-l-2 border-black pl-3">CONNECT</h5>
                <ul className="space-y-2 text-[11px] font-bold tracking-widest">
                    <li><a href="#" className="hover:opacity-50">INSTAGRAM</a></li>
                    <li><a href="#" className="hover:opacity-50">FACEBOOK</a></li>
                    <li><a href="#" className="hover:opacity-50">LINKEDIN</a></li>
                </ul>
            </div>
            <div className="space-y-4 col-span-1 lg:col-span-1">
                <h5 className="text-[10px] font-bold tracking-[0.2em] text-zinc-400 uppercase border-l-2 border-black pl-3">CONTACT INFO</h5>
                <div className="text-[11px] font-bold leading-relaxed space-y-2">
                    <p>
                        #1, 1st Floor, Sattar Building,<br/>
                        Behind BSC Bata, Commercial<br/>
                        Road, Ooty, The Nilgiris - 643001
                    </p>
                    <p>
                        Phone: 7338031038 | 9980667425<br/>
                        Email: duraikannan73@gmail.com<br/>
                        Website: www.sksuniforms.com
                    </p>
                </div>
            </div>
            <div className="space-y-6">
                <div className="space-y-2">
                    <h5 className="text-[10px] font-bold tracking-[0.2em] text-zinc-400 uppercase">QUALITY PROMISE</h5>
                    <div className="text-[11px] font-bold leading-relaxed">
                        <p className="mb-2">QUALITY. PRECISION. TRUST.</p>
                        <p className="text-zinc-500 text-[10px]">Professional solutions for every institution across India.</p>
                    </div>
                </div>
                <div className="flex items-center gap-2 text-[10px] font-bold">
                    <span>CURRENCY:</span>
                    <img src="https://flagcdn.com/w20/in.png" className="w-5 h-3 object-cover" />
                    <span>IN (₹/INR)</span>
                </div>
            </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center border-t border-black py-8 text-[9px] font-bold tracking-widest text-zinc-400 uppercase">
          <div className="mb-4 md:mb-0">SKS UNIFORMS. PROFESSIONAL SOLUTIONS FOR EVERY INSTITUTION. ALL RIGHTS RESERVED.</div>
          <div className="flex gap-8">
            <a href="#" className="hover:text-black">QUALITY • PRECISION • TRUST</a>
            <a href="#" className="text-black">WWW.SKSUNIFORMS.COM</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;