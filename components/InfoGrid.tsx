import React from 'react';
import { Info } from 'lucide-react';

const InfoGrid: React.FC = () => {
  const items = [
    { 
      title: "15% OFF FIRST ORDER", 
      desc: "Subscribe to our mailing list for 15% off your first order" 
    },
    { 
      title: "EASY RETURNS & INSTANT EXCHANGES", 
      desc: "Get your new items sent out straight away on UK & EU orders" 
    },
    { 
      title: "FREE WORLDWIDE DELIVERY", 
      desc: "Free worldwide delivery on all orders over £70" 
    },
    { 
      title: "45 DAY RETURNS", 
      desc: "We now offer an extended returns policy for international customers" 
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 border-b border-black">
      {items.map((item, i) => (
        <div key={i} className={`p-10 flex flex-col items-center text-center ${i < items.length - 1 ? 'md:border-r border-black' : ''} border-b md:border-b-0 border-black`}>
          <h3 className="font-heading text-2xl tracking-tighter mb-4 leading-none">{item.title}</h3>
          <p className="text-[11px] text-zinc-600 font-medium leading-relaxed max-w-[180px] mb-8">{item.desc}</p>
          <div className="mt-auto cursor-pointer opacity-50 hover:opacity-100 transition-opacity">
            <Info size={16} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default InfoGrid;