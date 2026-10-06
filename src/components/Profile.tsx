import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { User, Mail, Phone, MapPin, Package, Heart, Settings, LogOut, ArrowRight, ShoppingCart, Check, Cake, Clock, HeartOff, Camera, Upload, X } from 'lucide-react';
import { CartItem } from '../types';
import { safeStorage } from '../utils/storage';
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

interface ProfileProps {
  user: {
    email: string;
    phone: string;
    name: string;
    address?: string;
    avatar?: string;
  };
  onUpdateUser: (updatedUser: { email: string; phone: string; name: string; address?: string; avatar?: string }) => void;
  onLogout: () => void;
  onBrowseCakes: () => void;
  onAddToCart: (item: CartItem) => void;
}

interface WishlistItem {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  sizeLabel: string;
}

const AVATAR_PRESETS = [
  { id: 'chef', label: 'Mahesh Chef', url: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=150&auto=format&fit=crop&q=80' },
  { id: 'cake', label: 'Sweet Cake', url: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=150&auto=format&fit=crop&q=80' },
  { id: 'macaron', label: 'Macaron', url: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=150&auto=format&fit=crop&q=80' },
  { id: 'strawberry', label: 'Berry Fan', url: 'https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?w=150&auto=format&fit=crop&q=80' },
  { id: 'cookie', label: 'Cookie Baker', url: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=150&auto=format&fit=crop&q=80' },
  { id: 'donut', label: 'Sweet Donut', url: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=150&auto=format&fit=crop&q=80' },
];

export default function Profile({ user, onUpdateUser, onLogout, onBrowseCakes, onAddToCart }: ProfileProps) {
  const [activeTab, setActiveTab] = useState<'details' | 'orders' | 'wishlist' | 'settings'>('orders');
  const [orders, setOrders] = useState<any[]>([]);

  // Avatar customization states
  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const [avatarError, setAvatarError] = useState<string | null>(null);

  // Account details form states
  const [formError, setFormError] = useState<string | null>(null);
  const [editName, setEditName] = useState(user.name);
  const [editEmail, setEditEmail] = useState(user.email);
  const [editPhone, setEditPhone] = useState(user.phone);
  const [editAddress, setEditAddress] = useState(user.address || '');
  const [showSaveToast, setShowSaveToast] = useState(false);
  const [lastEmail, setLastEmail] = useState(user.email);

  // Synchronize form fields if logged-in user changes (logout/login with another account)
  useEffect(() => {
    if (user && user.email !== lastEmail) {
      setEditName(user.name || '');
      setEditEmail(user.email || '');
      setEditPhone(user.phone || '');
      setEditAddress(user.address || '');
      setLastEmail(user.email);
    }
  }, [user, lastEmail]);

  // Settings states
  const [notifyEmail, setNotifyEmail] = useState(true);
  const [notifySMS, setNotifySMS] = useState(true);
  const [notifyWhatsApp, setNotifyWhatsApp] = useState(true);
  const [newsletter, setNewsletter] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  // Loaded default wishlist items
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);

  // Load and sync wishlist from localStorage
  useEffect(() => {
    const wishlistKey = `mahesh_bakery_wishlist_${user.email.toLowerCase()}`;
    const saved = safeStorage.getItem(wishlistKey);
    if (saved) {
      try {
        setWishlist(JSON.parse(saved));
      } catch (err) {
        console.error("Failed to parse wishlist:", err);
      }
    } else {
      setWishlist([]);
    }
  }, [user.email]);

  const [addedItemToCartId, setAddedItemToCartId] = useState<string | null>(null);

  const [ordersLoading, setOrdersLoading] = useState(true);

  // Load orders from Firestore Database
  useEffect(() => {
    const fetchOrders = async () => {
      setOrdersLoading(true);
      try {
        const q = query(
          collection(db, 'orders'),
          where('userId', '==', user.email),
          orderBy('createdAt', 'desc')
        );
        const snapshot = await getDocs(q);
        const firestoreOrders = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setOrders(firestoreOrders);
      } catch (err: any) {
        console.error('Failed to fetch orders from Firestore:', err);
        // Fallback to localStorage if Firestore query fails (e.g., index not created yet)
        try {
          const savedOrders = safeStorage.getItem(`mahesh_bakery_orders_${user.email}`);
          if (savedOrders) {
            setOrders(JSON.parse(savedOrders));
          }
        } catch (localErr) {
          console.error('Failed to parse local orders:', localErr);
        }
      } finally {
        setOrdersLoading(false);
      }
    };
    fetchOrders();
  }, [user.email]);

  const handleSaveChanges = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    if (!editEmail.toLowerCase().endsWith('@gmail.com')) {
      setFormError('Email address must end with @gmail.com.');
      return;
    }
    
    const normalizedPhone = editPhone.trim();
    if (normalizedPhone.length !== 10) {
      setFormError('Phone number must be exactly 10 digits.');
      return;
    }
    
    onUpdateUser({
      name: editName,
      email: editEmail,
      phone: normalizedPhone,
      address: editAddress,
      avatar: user.avatar,
    });
    setShowSaveToast(true);
    setTimeout(() => setShowSaveToast(false), 3000);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAvatarError(null);
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 1.5 * 1024 * 1024) {
        setAvatarError("File size must be under 1.5MB.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        onUpdateUser({
          ...user,
          avatar: base64
        });
        setShowAvatarModal(false);
      };
      reader.onerror = () => {
        setAvatarError("Could not read image file. Please try another image.");
      };
      reader.readAsDataURL(file);
    }
  };

  const removeFromWishlist = (id: string) => {
    const wishlistKey = `mahesh_bakery_wishlist_${user.email.toLowerCase()}`;
    const updated = wishlist.filter(item => item.id !== id);
    setWishlist(updated);
    safeStorage.setItem(wishlistKey, JSON.stringify(updated));
  };

  const handleAddWishToCart = (item: WishlistItem) => {
    const cartItem: CartItem = {
      id: `wish-cart-${Date.now()}-${item.id}`,
      sizeLabel: item.sizeLabel,
      sizePrice: item.price,
      name: '',
      age: '',
      message: 'Happy Celebration!',
      photoUrl: '',
      toppings: [],
      toppingsTotal: 0,
      itemTotal: item.price,
      quantity: 1,
      date: new Date().toLocaleDateString(),
      time: '12:00 PM',
      grandTotal: item.price
    };
    
    onAddToCart(cartItem);
    setAddedItemToCartId(item.id);
    setTimeout(() => setAddedItemToCartId(null), 2500);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Accepted': return 'bg-amber-50 text-amber-600 border border-amber-200';
      case 'Baking': return 'bg-purple-50 text-[#4f3370] border border-[#4f3370]/30';
      case 'Out for Delivery': return 'bg-blue-50 text-blue-600 border border-blue-200';
      case 'Delivered': 
      case 'Completed': return 'bg-green-50 text-green-600 border border-green-200';
      default: return 'bg-gray-50 text-gray-600 border border-gray-200';
    }
  };

  return (
    <div className="py-16 px-4 md:px-12 max-w-7xl mx-auto min-h-[80vh] font-sans text-[#2c1b40]">
      {/* Dynamic Saving Toast Notification */}
      <AnimatePresence>
        {showSaveToast && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-8 left-1/2 -translate-x-1/2 z-50 bg-[#4f3370] text-white py-3 px-6 rounded-full flex items-center gap-2 shadow-2xl font-bold"
          >
            <Check className="w-5 h-5 bg-white text-[#4f3370] rounded-full p-0.5" />
            <span>Profile settings saved successfully!</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Title Section */}
      <div className="mb-10 px-4">
        <h1 className="text-4xl md:text-5xl font-black tracking-tight flex items-center gap-2">
          <span className="font-serif italic font-black text-[#2c1b40]">My</span>
          <span className="text-[#4f3370] uppercase font-black tracking-widest text-3xl md:text-4xl font-sans">Profile</span>
        </h1>
      </div>

      {/* Outer Grid Panel */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        
        {/* Left Sidebar Menu Column */}
        <div className="md:col-span-5 lg:col-span-4 flex flex-col gap-6 w-full">
          
          {/* User Profile Summary Card */}
          <div className="bg-white rounded-[2.5rem] p-8 text-center shadow-[0_15px_40px_rgba(79,51,112,0.03)] border border-purple-50/20 flex flex-col items-center">
            <div className="relative mb-4">
              <button 
                onClick={() => setShowAvatarModal(true)}
                className="w-24 h-24 rounded-full relative shadow-[inset_0_4px_10px_rgba(79,51,112,0.05)] group overflow-hidden cursor-pointer focus:outline-none border-2 border-purple-100 block"
                title="Change Profile Picture"
              >
                {user.avatar ? (
                  <img 
                    src={user.avatar} 
                    alt="Profile Avatar" 
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="w-full h-full bg-purple-50 flex items-center justify-center">
                    <User className="w-12 h-12 text-[#4f3370]" />
                  </div>
                )}
                {/* Camera Hover Overlay */}
                <div className="absolute inset-0 bg-[#4f3370]/60 backdrop-blur-xs flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Camera className="w-5 h-5 text-white" />
                  <span className="text-[9px] text-white font-extrabold uppercase tracking-wider mt-1">Change</span>
                </div>
              </button>
              <div className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white z-10" title="Active Client" />
            </div>
            <h3 className="font-serif text-2xl font-extrabold text-[#2c1b40]">
              {user.name || 'Cake Lover'}
            </h3>
            <p className="text-gray-400 text-sm font-medium mt-1 font-mono hover:text-[#4f3370] transition-colors">
              {user.email || 'user@maheshbakery.in'}
            </p>
          </div>

          {/* Nav Tab Buttons */}
          <div className="flex flex-col gap-2.5">
            {/* Account Details */}
            <button
              onClick={() => setActiveTab('details')}
              className={`flex items-center gap-4 px-6 py-4.5 rounded-[1.5rem] font-bold text-left text-sm transition-all cursor-pointer ${
                activeTab === 'details'
                  ? 'bg-[#4f3370] text-white shadow-lg shadow-[#4f3370]/30 scale-[1.02]'
                  : 'bg-white text-gray-600 hover:bg-gray-50 hover:text-[#2c1b40]'
              }`}
            >
              <User className="w-5 h-5 shrink-0" />
              <span>Account Details</span>
            </button>

            {/* My Orders */}
            <button
              onClick={() => setActiveTab('orders')}
              className={`flex items-center justify-between px-6 py-4.5 rounded-[1.5rem] font-bold text-left text-sm transition-all cursor-pointer ${
                activeTab === 'orders'
                  ? 'bg-[#4f3370] text-white shadow-lg shadow-[#4f3370]/30 scale-[1.02]'
                  : 'bg-white text-gray-600 hover:bg-gray-50 hover:text-[#2c1b40]'
              }`}
            >
              <div className="flex items-center gap-4">
                <Package className="w-5 h-5 shrink-0" />
                <span>My Orders</span>
              </div>
              {orders.length > 0 && (
                <span className={`text-[10px] sm:text-xs px-2 py-0.5 rounded-full font-black ${
                  activeTab === 'orders' ? 'bg-white text-[#4f3370]' : 'bg-[#4f3370]/10 text-[#4f3370]'
                }`}>
                  {orders.length}
                </span>
              )}
            </button>

            {/* Wishlist */}
            <button
              onClick={() => setActiveTab('wishlist')}
              className={`flex items-center gap-4 px-6 py-4.5 rounded-[1.5rem] font-bold text-left text-sm transition-all cursor-pointer ${
                activeTab === 'wishlist'
                  ? 'bg-[#4f3370] text-white shadow-lg shadow-[#4f3370]/30 scale-[1.02]'
                  : 'bg-white text-gray-600 hover:bg-gray-50 hover:text-[#2c1b40]'
              }`}
            >
              <Heart className="w-5 h-5 shrink-0" />
              <span>Wishlist</span>
            </button>

            {/* Logout Divider line */}
            <div className="h-px bg-gray-100 my-4" />

            {/* Logout */}
            {!showLogoutConfirm ? (
              <button
                onClick={() => setShowLogoutConfirm(true)}
                className="flex items-center gap-4 px-6 py-4 bg-rose-50/50 hover:bg-rose-50 text-rose-500 rounded-[1.5rem] font-bold text-left text-sm transition-colors cursor-pointer border border-rose-100/10 w-full"
              >
                <LogOut className="w-5 h-5 shrink-0" />
                <span>Logout</span>
              </button>
            ) : (
              <div className="bg-rose-50/80 border border-rose-100 rounded-[1.5rem] p-4 flex flex-col gap-3 animate-fade-in w-full">
                <p className="text-xs font-bold text-rose-700 text-center leading-normal">
                  Are you sure you want to logout?
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={onLogout}
                    className="bg-rose-600 hover:bg-rose-700 text-white py-2 px-3 rounded-xl text-xs font-bold transition-all text-center cursor-pointer"
                  >
                    Yes, Logout
                  </button>
                  <button
                    onClick={() => setShowLogoutConfirm(false)}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-3 rounded-xl text-xs font-bold transition-all text-center cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Dashboard Body Column */}
        <div className="md:col-span-7 lg:col-span-8 w-full bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(79,51,112,0.03)] border border-gray-50/60 p-8 md:p-10 min-h-[500px]">
          
          <AnimatePresence mode="wait">
            
            {/* MY ORDERS TAB */}
            {activeTab === 'orders' && (
              <motion.div
                key="orders"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="border-b border-gray-100 pb-5 mb-5">
                  <h2 className="font-serif text-3xl font-bold text-[#2c1b40]">My Orders</h2>
                </div>

                {ordersLoading ? (
                  <div className="flex flex-col items-center justify-center text-center py-16 min-h-[350px]">
                    <div className="w-12 h-12 border-4 border-gray-200 border-t-[#4f3370] rounded-full animate-spin mb-6"></div>
                    <p className="text-gray-400 font-bold text-sm">Loading your orders...</p>
                  </div>
                ) : orders.length === 0 ? (
                  <div className="flex flex-col items-center justify-center text-center py-16 min-h-[350px]">
                    <div className="w-20 h-20 bg-gray-50 text-gray-400 rounded-full flex items-center justify-center mb-6 shadow-sm border border-gray-100">
                      <Package className="w-10 h-10 text-gray-400" />
                    </div>
                    
                    <h3 className="text-xl font-serif font-black text-[#2c1b40] mb-2">No orders yet</h3>
                    <p className="text-gray-500 font-medium mb-8 max-w-md">
                      You haven't placed any orders yet. Start exploring our delicious cakes!
                    </p>

                    <button
                      onClick={onBrowseCakes}
                      className="bg-[#4f3370] text-white px-8 py-3.5 rounded-full font-bold text-base hover:bg-[#3d2757] transition-all shadow-lg hover:shadow-[#4f3370]/30 flex items-center gap-2 group cursor-pointer"
                    >
                      Browse Cakes
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {orders.map((order, orderIdx) => {
                      const totalAmount = order.items ? order.items.reduce((sum: number, it: any) => sum + (it.grandTotal || it.itemTotal), 0) : order.grandTotal || order.totalPrice;
                      return (
                        <div key={order.id || orderIdx} className="border border-gray-100 rounded-[2rem] p-6 hover:shadow-md transition-shadow bg-white flex flex-col justify-between">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-50">
                            <div>
                              <div className="text-xs text-gray-400 font-bold font-mono">ORDER ID</div>
                              <div className="text-sm font-black text-[#2c1b40]">#{order.id ? order.id.slice(-8).toUpperCase() : `MB-${Math.floor(100000 + Math.random() * 900000)}`}</div>
                            </div>
                            <div>
                              <div className="text-xs text-gray-400 font-bold font-mono">ORDER PLACED</div>
                              <div className="text-sm font-bold text-gray-600 flex items-center gap-1.5">
                                <Clock className="w-3.5 h-3.5 text-[#4f3370]" />
                                {order.date || new Date().toLocaleDateString()}
                              </div>
                            </div>
                            <div>
                              <span className={`inline-flex items-center px-4 py-1.5 rounded-full text-xs font-extrabold ${getStatusColor(order.status || 'Baking')}`}>
                                {order.status || 'Baking'}
                              </span>
                            </div>
                          </div>

                          {/* Order Products list */}
                          <div className="py-4 space-y-4">
                            {order.items && order.items.map((item: any, idx: number) => (
                              <div key={idx} className="flex gap-4 items-center">
                                <div className="w-14 h-14 bg-purple-50/30 border border-gray-100 rounded-xl flex items-center justify-center shrink-0 overflow-hidden">
                                  {item.photoUrl ? (
                                    <img src={item.photoUrl} alt="custom-cake" className="w-full h-full object-cover" />
                                  ) : (
                                    <Cake className="w-7 h-7 text-[#4f3370]/40" />
                                  )}
                                </div>
                                <div className="flex-1">
                                  <h4 className="font-bold text-sm text-[#2c1b40] leading-snug">
                                    {item.sizeLabel || 'Custom Celebration Cake'} Design
                                  </h4>
                                  <div className="text-xs font-semibold text-gray-400 mt-0.5">
                                    {item.name ? `Name: ${item.name} ` : ''} 
                                    {item.message ? `• Message: "${item.message}"` : ''}
                                  </div>
                                </div>
                                <div className="text-right">
                                  <div className="text-xs text-gray-400 font-bold font-mono">QTY: {item.quantity || 1}</div>
                                  <div className="text-sm font-black text-[#2c1b40]">₹{item.grandTotal || item.itemTotal}</div>
                                </div>
                              </div>
                            ))}
                          </div>

                          <div className="pt-4 border-t border-gray-50 flex items-center justify-between">
                            <span className="text-sm font-bold text-gray-500">Order Method</span>
                            <div className="text-right flex items-center gap-3">
                              <span className="text-xs text-green-500 font-extrabold bg-green-50 border border-green-100 px-2.5 py-1 rounded-md">WhatsApp Order</span>
                              <span className="font-serif text-lg font-black text-[#2c1b40]">Total: ₹{totalAmount}</span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </motion.div>
            )}

            {/* DETAILS TAB */}
            {activeTab === 'details' && (
              <motion.div
                key="details"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="border-b border-gray-100 pb-5 mb-5">
                  <h2 className="font-serif text-3xl font-bold text-[#2c1b40]">Account Details</h2>
                </div>

                {formError && (
                  <div className="mb-5 p-3.5 bg-red-50 border border-red-100 rounded-2xl text-xs font-bold text-red-600 flex items-center gap-2 animate-fade-in shadow-sm">
                    <span className="w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-[10px] font-black shrink-0">!</span>
                    <span>{formError}</span>
                  </div>
                )}

                <form onSubmit={handleSaveChanges} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-[#2c1b40] mb-2 px-1">Full Name</label>
                      <input
                        type="text"
                        required
                        value={editName}
                        onChange={(e) => setEditName(e.target.value.replace(/[^a-zA-Z\s]/g, ''))}
                        placeholder=""
                        className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:outline-none focus:ring-4 focus:ring-purple-100 focus:border-[#4f3370] transition-all font-semibold text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-[#2c1b40] mb-2 px-1">Email Address</label>
                      <input
                        type="email"
                        required
                        value={editEmail}
                        onChange={(e) => setEditEmail(e.target.value)}
                        placeholder=""
                        className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:outline-none focus:ring-4 focus:ring-purple-100 focus:border-[#4f3370] transition-all font-semibold text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-[#2c1b40] mb-2 px-1">Phone Number (10 Digits)</label>
                      <input
                        type="tel"
                        required
                        maxLength={10}
                        value={editPhone}
                        onChange={(e) => {
                          const val = e.target.value.replace(/[^0-9]/g, '');
                          if (val.length <= 10) {
                            setEditPhone(val);
                          }
                        }}
                        placeholder=""
                        className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:outline-none focus:ring-4 focus:ring-purple-100 focus:border-[#4f3370] transition-all font-semibold text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-[#2c1b40] mb-2 px-1">Primary Celebration Landmark</label>
                      <span className="text-[10px] text-gray-400 font-bold ml-1 italic">(Optional)</span>
                      <input
                        type="text"
                        value={editAddress}
                        onChange={(e) => setEditAddress(e.target.value)}
                        placeholder="Opposite clocktower / home"
                        className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:outline-none focus:ring-4 focus:ring-purple-100 focus:border-[#4f3370] transition-all font-semibold text-sm"
                      />
                    </div>
                  </div>

                  <div className="pt-6 border-t border-gray-100">
                    <button
                      type="submit"
                      className="bg-[#4f3370] text-white px-8 py-4 rounded-2xl font-bold text-base hover:bg-[#3d2757] transition-colors shadow-lg hover:shadow-[#4f3370]/30 cursor-pointer"
                    >
                      Save Settings
                    </button>
                  </div>
                </form>
              </motion.div>
            )}

            {/* WISHLIST TAB */}
            {activeTab === 'wishlist' && (
              <motion.div
                key="wishlist"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="border-b border-gray-100 pb-5 mb-5">
                  <h2 className="font-serif text-3xl font-bold text-[#2c1b40]">My Wishlist</h2>
                </div>

                {wishlist.length === 0 ? (
                  <div className="text-center py-12 flex flex-col items-center justify-center">
                    <div className="w-16 h-16 bg-purple-50 text-purple-300 rounded-full flex items-center justify-center mb-6">
                      <Heart className="w-8 h-8" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-700">Wishlist is empty</h3>
                    <p className="text-gray-400 mt-1 max-w-sm">Browse cakes and save your favorites here!</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {wishlist.map((item) => (
                      <div key={item.id} className="border border-gray-100 rounded-[2rem] p-5 shadow-sm bg-purple-50/10 hover:bg-white hover:shadow-md transition-all flex flex-col justify-between">
                        <div>
                          <div className="relative h-44 rounded-2xl overflow-hidden mb-4 border border-gray-100 shadow-sm">
                            <img src={item.image} alt={item.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                            <button
                              onClick={() => removeFromWishlist(item.id)}
                              className="absolute top-3 right-3 w-10 h-10 bg-white/90 backdrop-blur-sm text-red-500 rounded-full flex items-center justify-center shadow-lg hover:bg-red-500 hover:text-white transition-colors cursor-pointer"
                              title="Remove from favorites"
                            >
                              <HeartOff className="w-5 h-5" />
                            </button>
                          </div>
                          <span className="text-[10px] uppercase font-mono tracking-wider text-[#4f3370] font-extrabold bg-purple-50 px-2.5 py-1 rounded-md">
                            {item.sizeLabel}
                          </span>
                          <h3 className="font-bold text-lg mt-2.5 mb-1 text-[#2c1b40]">{item.name}</h3>
                          <p className="text-xs text-gray-500 font-medium leading-relaxed mb-4">{item.description}</p>
                        </div>

                        <div className="flex items-center justify-between border-t border-gray-100/60 pt-4 mt-auto">
                          <span className="text-xl font-black text-[#4f3370]">₹{item.price}</span>
                          <button
                            onClick={() => handleAddWishToCart(item)}
                            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                              addedItemToCartId === item.id
                                ? 'bg-green-500 text-white'
                                : 'bg-[#4f3370] text-white hover:bg-[#3d2757]'
                            }`}
                          >
                            {addedItemToCartId === item.id ? (
                              <>
                                <Check className="w-3.5 h-3.5" />
                                <span>Added!</span>
                              </>
                            ) : (
                              <>
                                <ShoppingCart className="w-3.5 h-3.5" />
                                <span>Add to Cart</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
               )}

          </AnimatePresence>
        </div>

      </div>

      {/* Profile Picture Option Modal */}
      <AnimatePresence>
        {showAvatarModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAvatarModal(false)}
              className="absolute inset-0 bg-[#4f3370]/40 backdrop-blur-sm"
            />
            
            {/* Modal Box */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white rounded-[2.5rem] w-full max-w-lg p-8 md:p-10 shadow-[0_30px_70px_rgba(79,51,112,0.15)] border border-purple-100 relative z-10"
            >
              <button 
                onClick={() => setShowAvatarModal(false)}
                className="absolute top-6 right-6 p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-center mb-6">
                <span className="text-[10px] uppercase font-mono tracking-widest text-[#4f3370] font-black bg-[#4f3370]/10 px-3 py-1 rounded-full mb-2.5 inline-block">
                  Customization
                </span>
                <h3 className="font-serif text-3xl font-black text-[#2c1b40]">Profile Picture</h3>
                <p className="text-gray-500 font-medium text-xs mt-1">Upload a custom photo or choose a celebration avatar and save.</p>
              </div>

              {avatarError && (
                <div className="mb-5 p-3.5 bg-red-50 border border-red-100 rounded-2xl text-xs font-bold text-red-600 flex items-center gap-2">
                  <span className="w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-[10px] font-black shrink-0">!</span>
                  <span>{avatarError}</span>
                </div>
              )}

              {/* Upload Zone */}
              <label className="border-2 border-dashed border-[#4f3370]/20 hover:border-[#4f3370] hover:bg-purple-50/20 rounded-[2rem] p-6 text-center cursor-pointer block transition-all mb-6 group relative">
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={handleFileChange} 
                  className="hidden" 
                />
                <div className="flex flex-col items-center justify-center text-center">
                  <div className="w-12 h-12 rounded-full bg-purple-50 text-[#4f3370] border border-purple-100 flex items-center justify-center mb-3 transition-transform group-hover:scale-110">
                    <Upload className="w-5 h-5" />
                  </div>
                  <span className="font-bold text-sm text-[#2c1b40]">Upload custom image</span>
                  <span className="text-[10.5px] text-gray-400 font-medium mt-1">Click or drag & drop (JPG, PNG under 1.5MB)</span>
                </div>
              </label>

              {/* Presets Separator Line */}
              <div className="flex items-center gap-3 mb-5">
                <div className="h-px bg-gray-100 flex-1" />
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest select-none">Or celebration presets</span>
                <div className="h-px bg-gray-100 flex-1" />
              </div>

              {/* Default Presets Grid */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                {AVATAR_PRESETS.map((preset) => (
                  <button
                    key={preset.id}
                    onClick={() => {
                      onUpdateUser({
                        ...user,
                        avatar: preset.url
                      });
                      setShowAvatarModal(false);
                    }}
                    className={`p-1.5 rounded-2xl border transition-all hover:scale-105 active:scale-95 duration-200 text-center flex flex-col items-center gap-1.5 cursor-pointer bg-[#fcfbfe]/50 ${
                      user.avatar === preset.url 
                        ? 'border-[#4f3370] bg-purple-500/5 shadow-md shadow-[#4f3370]/10 font-bold' 
                        : 'border-gray-100 hover:border-purple-200 font-medium'
                    }`}
                  >
                    <img 
                      src={preset.url} 
                      alt={preset.label} 
                      className="w-12 h-12 rounded-full object-cover border border-purple-100 shadow-xs"
                      referrerPolicy="no-referrer"
                    />
                    <span className="text-[9.5px] font-bold text-gray-600 truncate max-w-[80px]">
                      {preset.label}
                    </span>
                  </button>
                ))}
              </div>

              {/* Extra controls */}
              {user.avatar && (
                <div className="flex justify-center border-t border-gray-100 pt-5">
                  <button
                    onClick={() => {
                      onUpdateUser({
                        ...user,
                        avatar: undefined
                      });
                      setShowAvatarModal(false);
                    }}
                    className="text-xs font-bold text-red-500 hover:text-red-600 bg-red-50 hover:bg-red-100/60 px-5 py-2.5 rounded-full transition-all cursor-pointer"
                  >
                    Remove Profile Picture
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
