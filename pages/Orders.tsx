import React from 'react';
import { ArrowLeft, Package, Clock, CheckCircle, Truck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Orders: React.FC = () => {
  const { cartCount, user, reorderItems } = useApp();

  // Mock order data - in a real app, this would come from an API
  const mockOrders = [
    {
      id: 'ORD-2024-001',
      date: '2024-01-05',
      status: 'delivered',
      total: 8500,
      items: [
        { 
          id: 'c1',
          name: 'BUSINESS SUIT - BLACK', 
          quantity: 1, 
          price: '₹8,500',
          size: 'L',
          category: 'Corporate',
          image: './components/Assets/Business Suit 1.png',
          description: 'Professional business suit with tailored fit.'
        }
      ]
    },
    {
      id: 'ORD-2024-002',
      date: '2024-01-03',
      status: 'shipped',
      total: 5700,
      items: [
        { 
          id: 's1',
          name: 'SCHOOL BLAZER - NAVY BLUE', 
          quantity: 2, 
          price: '₹2,500',
          size: 'M',
          category: 'Schools',
          image: './components/Assets/School Uniform 1.png',
          description: 'Premium quality school blazer with embroidered crest.'
        },
        { 
          id: 's2',
          name: 'SCHOOL UNIFORM SET - GREY', 
          quantity: 1, 
          price: '₹3,200',
          size: 'L',
          category: 'Schools',
          image: './components/Assets/School Uniform 2.png',
          description: 'Complete school uniform set with professional finish.'
        }
      ]
    },
    {
      id: 'ORD-2024-003',
      date: '2024-01-01',
      status: 'processing',
      total: 3600,
      items: [
        { 
          id: 'h1',
          name: 'MEDICAL SCRUBS - WHITE', 
          quantity: 2, 
          price: '₹1,800',
          size: 'M',
          category: 'Healthcare',
          image: './components/Assets/Medical Uniform 1.png',
          description: 'Comfortable and durable medical scrubs for healthcare professionals.'
        }
      ]
    }
  ];

  const handleViewDetails = (order: any) => {
    // Show order details modal or navigate to order details page
    alert(`Order Details for ${order.id}:\n\nStatus: ${getStatusText(order.status)}\nTotal: ₹${order.total.toLocaleString()}\nItems: ${order.items.length}\n\nDetailed tracking and invoice will be available in the full version.`);
  };

  const handleReorder = (order: any) => {
    // Convert order items to cart items format and reorder
    const cartItems = order.items.map((item: any) => ({
      ...item,
      quantity: item.quantity
    }));
    
    reorderItems(cartItems);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered':
        return <CheckCircle size={20} className="text-green-600" />;
      case 'shipped':
        return <Truck size={20} className="text-blue-600" />;
      case 'processing':
        return <Clock size={20} className="text-yellow-600" />;
      default:
        return <Package size={20} className="text-zinc-400" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'Delivered';
      case 'shipped':
        return 'Shipped';
      case 'processing':
        return 'Processing';
      default:
        return 'Unknown';
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar cartCount={cartCount} />
        <div className="pt-20 flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <h1 className="font-heading text-3xl tracking-tight mb-4">Please sign in</h1>
            <p className="text-zinc-600 mb-8">You need to be signed in to view your orders.</p>
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
      <Navbar cartCount={cartCount} />
      
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
              <Package size={32} />
              <div>
                <h1 className="font-heading text-5xl tracking-tight">MY ORDERS</h1>
                <p className="text-sm text-zinc-600 mt-2">
                  Track and manage your uniform orders
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Orders List */}
        <div className="max-w-7xl mx-auto px-8 lg:px-12 py-12">
          {mockOrders.length === 0 ? (
            <div className="text-center py-20">
              <Package size={64} className="mx-auto text-zinc-300 mb-6" />
              <h2 className="font-heading text-3xl tracking-tight mb-4">No orders yet</h2>
              <p className="text-zinc-600 mb-8 max-w-md mx-auto">
                You haven't placed any orders yet. Start shopping to see your orders here.
              </p>
              <Link 
                to="/catalog"
                className="inline-block bg-black text-white px-8 py-3 text-sm font-bold tracking-widest uppercase hover:bg-zinc-800 transition-colors"
              >
                START SHOPPING
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {mockOrders.map((order) => (
                <div key={order.id} className="border border-black p-6 bg-white">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                    <div>
                      <h3 className="font-heading text-xl mb-2">Order {order.id}</h3>
                      <p className="text-sm text-zinc-600">
                        Placed on {new Date(order.date).toLocaleDateString('en-IN', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                    <div className="flex items-center gap-3 mt-4 md:mt-0">
                      {getStatusIcon(order.status)}
                      <span className="text-sm font-medium capitalize">
                        {getStatusText(order.status)}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-3 mb-6">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex justify-between items-center py-2 border-b border-zinc-200 last:border-b-0">
                        <div>
                          <p className="font-medium text-sm">{item.name}</p>
                          <p className="text-xs text-zinc-500">Quantity: {item.quantity}</p>
                        </div>
                        <p className="font-bold">{item.price}</p>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                    <div className="mb-4 md:mb-0">
                      <p className="text-lg font-bold">
                        Total: ₹{order.total.toLocaleString()}
                      </p>
                    </div>
                    <div className="flex gap-3">
                      <button 
                        onClick={() => handleViewDetails(order)}
                        className="px-4 py-2 border border-black text-sm font-bold tracking-widest uppercase hover:bg-black hover:text-white transition-colors"
                      >
                        VIEW DETAILS
                      </button>
                      {order.status === 'delivered' && (
                        <button 
                          onClick={() => handleReorder(order)}
                          className="px-4 py-2 bg-black text-white text-sm font-bold tracking-widest uppercase hover:bg-zinc-800 transition-colors"
                        >
                          REORDER
                        </button>
                      )}
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