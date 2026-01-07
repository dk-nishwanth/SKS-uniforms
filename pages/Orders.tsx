import React from 'react';
import { ArrowLeft, MessageCircle, Clock, CheckCircle, Send } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Orders: React.FC = () => {
  const { enquiryCount, user } = useApp();

  // Mock enquiry data - in a real app, this would come from an API
  const mockEnquiries = [
    {
      id: 'ENQ-2024-001',
      date: '2024-01-05',
      status: 'quoted',
      items: [
        { 
          id: 'c1',
          name: 'BUSINESS SUIT - BLACK', 
          quantity: 1, 
          size: 'L',
          category: 'Corporate',
          image: '/images/Business Suit 1.png',
          description: 'Professional business suit with tailored fit.'
        }
      ],
      message: 'Need 50 pieces for our corporate team. Please provide bulk pricing.',
      response: 'Thank you for your enquiry. We have sent you a detailed quote via email.'
    },
    {
      id: 'ENQ-2024-002',
      date: '2024-01-03',
      status: 'processing',
      items: [
        { 
          id: 's1',
          name: 'SCHOOL BLAZER - NAVY BLUE', 
          quantity: 100, 
          size: 'Various',
          category: 'Schools',
          image: '/images/School Uniform 1.png',
          description: 'Premium quality school blazer with embroidered crest.'
        },
        { 
          id: 's2',
          name: 'SCHOOL UNIFORM SET - GREY', 
          quantity: 100, 
          size: 'Various',
          category: 'Schools',
          image: '/images/School Uniform 2.png',
          description: 'Complete school uniform set with professional finish.'
        }
      ],
      message: 'Bulk order for our school. Need customization with school logo.',
      response: null
    },
    {
      id: 'ENQ-2024-003',
      date: '2024-01-01',
      status: 'new',
      items: [
        { 
          id: 'h1',
          name: 'MEDICAL SCRUBS - WHITE', 
          quantity: 25, 
          size: 'Various',
          category: 'Healthcare',
          image: '/images/Medical Uniform 1.png',
          description: 'Comfortable and durable medical scrubs for healthcare professionals.'
        }
      ],
      message: 'Need medical scrubs for our hospital staff. Please provide samples.',
      response: null
    }
  ];

  const handleViewDetails = (enquiry: any) => {
    // Show enquiry details modal or navigate to enquiry details page
    alert(`Enquiry Details for ${enquiry.id}:\n\nStatus: ${getStatusText(enquiry.status)}\nItems: ${enquiry.items.length}\nMessage: ${enquiry.message}\n\nDetailed tracking will be available in the full version.`);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'quoted':
        return <CheckCircle size={20} className="text-green-600" />;
      case 'processing':
        return <Clock size={20} className="text-blue-600" />;
      case 'new':
        return <Send size={20} className="text-yellow-600" />;
      default:
        return <MessageCircle size={20} className="text-zinc-400" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'quoted':
        return 'Quote Sent';
      case 'processing':
        return 'Processing';
      case 'new':
        return 'New Enquiry';
      default:
        return 'Unknown';
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar enquiryCount={enquiryCount} />
        <div className="pt-20 flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <h1 className="font-heading text-3xl tracking-tight mb-4">Please sign in</h1>
            <p className="text-zinc-600 mb-8">You need to be signed in to view your enquiries.</p>
            <Link 
              to="/"
              className="inline-block bg-black text-white px-8 py-3 text-sm font-bold tracking-widest uppercase hover:bg-zinc-800 transition-colors"
            >
              GO TO HOME
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar enquiryCount={enquiryCount} />
      
      <div className="pt-20">
        {/* Header */}
        <div className="border-b border-black">
          <div className="max-w-7xl mx-auto px-8 lg:px-12 py-12">
            <div className="flex items-center gap-4 mb-6">
              <Link 
                to="/" 
                className="flex items-center gap-2 text-sm hover:underline"
              >
                <ArrowLeft size={16} />
                Back to Home
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <MessageCircle size={32} />
              <div>
                <h1 className="font-heading text-5xl tracking-tight">MY ENQUIRIES</h1>
                <p className="text-sm text-zinc-600 mt-2">
                  Track and manage your uniform enquiries
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Enquiries List */}
        <div className="max-w-7xl mx-auto px-8 lg:px-12 py-12">
          {mockEnquiries.length === 0 ? (
            <div className="text-center py-20">
              <MessageCircle size={64} className="mx-auto text-zinc-300 mb-6" />
              <h2 className="font-heading text-3xl tracking-tight mb-4">No enquiries yet</h2>
              <p className="text-zinc-600 mb-8 max-w-md mx-auto">
                You haven't submitted any enquiries yet. Start browsing to submit your first enquiry.
              </p>
              <Link 
                to="/catalog"
                className="inline-block bg-black text-white px-8 py-3 text-sm font-bold tracking-widest uppercase hover:bg-zinc-800 transition-colors"
              >
                START BROWSING
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {mockEnquiries.map((enquiry) => (
                <div key={enquiry.id} className="border border-black p-6 bg-white">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                    <div>
                      <h3 className="font-heading text-xl mb-2">Enquiry {enquiry.id}</h3>
                      <p className="text-sm text-zinc-600">
                        Submitted on {new Date(enquiry.date).toLocaleDateString('en-IN', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                    <div className="flex items-center gap-3 mt-4 md:mt-0">
                      {getStatusIcon(enquiry.status)}
                      <span className="text-sm font-medium capitalize">
                        {getStatusText(enquiry.status)}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-3 mb-6">
                    {enquiry.items.map((item, index) => (
                      <div key={index} className="flex justify-between items-center py-2 border-b border-zinc-200 last:border-b-0">
                        <div>
                          <p className="font-medium text-sm">{item.name}</p>
                          <p className="text-xs text-zinc-500">Quantity: {item.quantity} | Size: {item.size}</p>
                        </div>
                        <p className="font-bold text-sm">REQUEST QUOTE</p>
                      </div>
                    ))}
                  </div>

                  <div className="mb-4">
                    <p className="text-sm font-medium mb-2">Your Message:</p>
                    <p className="text-sm text-zinc-600 italic">"{enquiry.message}"</p>
                  </div>

                  {enquiry.response && (
                    <div className="mb-4 p-3 bg-green-50 border border-green-200">
                      <p className="text-sm font-medium text-green-800 mb-1">Our Response:</p>
                      <p className="text-sm text-green-700">{enquiry.response}</p>
                    </div>
                  )}

                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                    <div className="mb-4 md:mb-0">
                      <p className="text-lg font-bold">
                        Status: {getStatusText(enquiry.status)}
                      </p>
                    </div>
                    <div className="flex gap-3">
                      <button 
                        onClick={() => handleViewDetails(enquiry)}
                        className="px-4 py-2 border border-black text-sm font-bold tracking-widest uppercase hover:bg-black hover:text-white transition-colors"
                      >
                        VIEW DETAILS
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Orders;