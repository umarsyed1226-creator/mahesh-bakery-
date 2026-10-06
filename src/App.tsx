/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from 'motion/react';
import React, { useState, useEffect } from 'react';
import { Award, Cake, Truck, Heart, MapPin, ShoppingBag, User, Phone, Mail, Clock, Instagram, Send, ChevronLeft, ChevronRight, X, Star, Quote, Menu as MenuIcon } from 'lucide-react';
import Footer from './components/Footer';
import PrivacyPolicy from './components/PrivacyPolicy';
import Terms from './components/Terms';
import Cart from './components/Cart';
import Login from './components/Login';
import Profile from './components/Profile';
import Chatbot from './components/Chatbot';
import Menu from './components/Menu';
import About from './components/About';
import AdminPanel from './components/AdminPanel';
import Gallery from './components/Gallery';
import OurOwnMake from './components/OurOwnMake';
import Branches from './components/Branches';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { auth, db } from './firebase';
import { CartItem } from './types';
import { safeStorage } from './utils/storage';

const TESTIMONIALS = [
  { text: "We ordered a red velvet makeup theme cake and it was exactly the same design we requested. Taste was awesome!", author: "Gladwin Priyan", category: "Customized Cakes" },
  { text: "Customized dark chocolate truffle cake was super delicious. Quality and taste were amazing!", author: "Keerthi Keerthi", category: "Customized Cakes" },
  { text: "Whatever I requested was made perfectly. Taste, colors and decorations were excellent.", author: "Ishwariya S", category: "Customized Cakes" },
  { text: "Ordered birthday cake just one day before through phone. Amazing result even for a last-minute order.", author: "Abinaya R", category: "Fast Delivery" },
  { text: "Very fast delivery and excellent response. Cake taste was very nice.", author: "Janaki T", category: "Fast Delivery" },
  { text: "Home delivery surprise for my friend’s birthday was handled perfectly. Very customer friendly staff.", author: "Sivaranjani Nathan", category: "Customer Service" },
  { text: "This is my all-time go-to bakery. Sweets are fresh, cakes taste so good and prices are reasonable.", author: "Sravan Yadav", category: "Taste & Quality" },
  { text: "Milk pudding cake here is a must try. Best taste!", author: "Chinna Durai", category: "Taste & Quality" },
  { text: "Fresh cream Rasamalai cake was superb and delicious.", author: "Karthik Krishnan", category: "Taste & Quality" },
  { text: "Laddu and Mixture tasted really good.", author: "Jaganraja Appadurai", category: "Snacks & Sweets" },
  { text: "Rose Kulkand Bytes is my favorite sweet.", author: "M Karthika", category: "Snacks & Sweets" },
  { text: "Egg puff and pudding cake are excellent.", author: "Rajeswari Raji", category: "Snacks & Sweets" }
];

const BANNERS = [
  "https://ik.imagekit.io/0boxn146f/3701a83c-14ed-42d9-8610-fd9d78d5ddce.png",
  "https://ik.imagekit.io/psfnvg1yb/ChatGPT%20Image%20May%2022,%202026,%2007_44_33%20PM.png"
];

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState('home');
  const [menuCategory, setMenuCategory] = useState('All Products');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const [isHoveringBanner, setIsHoveringBanner] = useState(false);
  const [activeCategoryModal, setActiveCategoryModal] = useState<{
    title: string;
    image: string;
    description: string;
    items: { name: string; price: string }[];
  } | null>(null);
  const [user, setUser] = useState<{ email: string; phone: string; name: string; address?: string; avatar?: string; isAdmin?: boolean } | null>(() => {
    const saved = safeStorage.getItem('mahesh_bakery_user');
    return saved ? JSON.parse(saved) : null;
  });

  // Contact page form states
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [showContactSuccess, setShowContactSuccess] = useState(false);
  const [loginNotice, setLoginNotice] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isHoveringBanner) return;
    const bannerTimer = setInterval(() => {
      setCurrentBannerIndex((prev) => (prev + 1) % BANNERS.length);
    }, 4500);
    return () => clearInterval(bannerTimer);
  }, [isHoveringBanner]);

  const navbar = (
    <nav className="relative z-20 w-full bg-[#4f3370] shadow-md text-white">
      <div className="px-4 md:px-6 lg:px-10 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          <div
            className="flex items-center gap-2 cursor-pointer group shrink-0"
            onClick={() => setCurrentPage('home')}
          >
            <div className="w-9 h-9 md:w-9 md:h-9 lg:w-11 lg:h-11 rounded-full overflow-hidden border border-white/20 shadow-md shrink-0">
              <img
                src="https://ik.imagekit.io/exmpcpadx/image.png"
                alt="Mahesh Bakery Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col items-start justify-center pl-1">
              <span className="bakery-main-title text-[1.4rem] md:text-2xl lg:text-[2.25rem] leading-none select-none group-hover:scale-[1.02] transition-all origin-left">
                mahesh
              </span>
              <span className="bakery-subtitle text-[8px] md:text-[9px] lg:text-[11px] leading-none mt-1 pl-0.5 whitespace-nowrap select-none">
                King of Bakery World
              </span>
            </div>
          </div>

          <div className="hidden lg:flex flex-1 items-center justify-center gap-4 lg:gap-6 xl:gap-10 font-bold tracking-wide lg:text-sm xl:text-base whitespace-nowrap">
            <button onClick={() => setCurrentPage('home')} className={`hover:text-rose-200 transition-colors relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:bg-rose-200 after:transition-all ${currentPage === 'home' ? 'text-rose-200 after:w-full' : 'after:w-0 hover:after:w-full'}`}>Home</button>
            <button onClick={() => setCurrentPage('menu')} className={`hover:text-rose-200 transition-colors relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:bg-rose-200 after:transition-all ${currentPage === 'menu' ? 'text-rose-200 after:w-full' : 'after:w-0 hover:after:w-full'}`}>Menu</button>
            <button onClick={() => setCurrentPage('own-make')} className={`hover:text-rose-200 transition-colors relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:bg-rose-200 after:transition-all ${currentPage === 'own-make' ? 'text-rose-200 after:w-full' : 'after:w-0 hover:after:w-full'}`}>Our Own Make</button>
            <button onClick={() => setCurrentPage('about')} className={`hover:text-rose-200 transition-colors relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:bg-rose-200 after:transition-all ${currentPage === 'about' ? 'text-rose-200 after:w-full' : 'after:w-0 hover:after:w-full'}`}>About</button>
            <button onClick={() => setCurrentPage('gallery')} className={`hover:text-rose-200 transition-colors relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:bg-rose-200 after:transition-all ${currentPage === 'gallery' ? 'text-rose-200 after:w-full' : 'after:w-0 hover:after:w-full'}`}>Gallery</button>
            <button onClick={() => setCurrentPage('branches')} className={`hover:text-rose-200 transition-colors relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:bg-rose-200 after:transition-all ${currentPage === 'branches' ? 'text-rose-200 after:w-full' : 'after:w-0 hover:after:w-full'}`}>Our Branches</button>
            <button onClick={() => setCurrentPage('contact')} className={`hover:text-rose-200 transition-colors relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:bg-rose-200 after:transition-all ${currentPage === 'contact' ? 'text-rose-200 after:w-full' : 'after:w-0 hover:after:w-full'}`}>Contact</button>
          </div>

          <div className="flex items-center justify-end gap-2 lg:gap-6 shrink-0">
            <button
              onClick={() => setCurrentPage(user ? 'profile' : 'login')}
              className="hover:text-rose-200 transition-all hover:bg-white/10 rounded-full flex items-center justify-center overflow-hidden w-8 h-8 lg:w-11 lg:h-11 border border-transparent hover:border-white/20 shrink-0"
              title={user ? "My Profile" : "Login"}
            >
              {user && user.avatar ? (
                <img
                  src={user.avatar}
                  alt="My Profile Picture"
                  className="w-6 h-6 lg:w-8 lg:h-8 rounded-full object-cover"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <User className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
              )}
            </button>
            <button onClick={() => setCurrentPage('cart')} className="relative hover:text-rose-200 transition-colors p-1.5 lg:p-2 hover:bg-white/10 rounded-full animate-none" title="Cart">
              <ShoppingBag className="w-5 h-5 lg:w-6 lg:h-6" />
              {cartItems.length > 0 && (
                <span className="absolute max-sm:top-0 top-0.5 right-0.5 bg-white text-[#4f3370] text-[9px] lg:text-[10px] font-bold w-3.5 h-3.5 lg:w-4 lg:h-4 rounded-full flex items-center justify-center shadow-sm animate-bounce">
                  {cartItems.length}
                </span>
              )}
            </button>
            <button onClick={() => {
              setCurrentPage('menu');
              setIsMobileMenuOpen(false);
            }} className="bg-white text-[#4f3370] px-3 md:px-4 lg:px-8 py-1.5 md:py-2 lg:py-3 rounded-full font-bold shadow-md hover:-translate-y-0.5 transition-all text-[10px] lg:text-sm tracking-wide hidden sm:block">
              Order Now
            </button>

            {/* Hamburger three-line menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 hover:bg-white/10 rounded-full transition-colors text-white cursor-pointer select-none"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <MenuIcon className="w-6 h-6 animate-none" />
              )}
            </button>
          </div>
        </div>

        {/* Animated Dropdown Menu for Mobile Screens */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="lg:hidden mt-3 border-t border-white/10 pt-3 pb-1 overflow-hidden flex flex-col gap-1.5"
            >
              {[
                { label: 'Home', page: 'home' },
                { label: 'Menu', page: 'menu' },
                { label: 'Our Own Make', page: 'own-make' },
                { label: 'About', page: 'about' },
                { label: 'Gallery', page: 'gallery' },
                { label: 'Our Branches', page: 'branches' },
                { label: 'Contact', page: 'contact' }
              ].map((navLink) => {
                const targetPage = navLink.page;
                const isActive = currentPage === targetPage;
                return (
                  <button
                    key={targetPage}
                    onClick={() => {
                      setCurrentPage(targetPage);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`w-full px-4 py-3 rounded-xl font-bold text-xs tracking-wide transition-all text-left cursor-pointer ${isActive ? 'bg-[#FFB01A] text-slate-900 shadow-md' : 'hover:bg-white/10 text-white'}`}
                  >
                    <span>{navLink.label}</span>
                  </button>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );

  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        <motion.div
          key="loader"
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-50 bg-[#4f3370] flex flex-col items-center justify-center font-sans overflow-hidden"
        >
          {/* Logo Circle */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="w-44 h-44 flex items-center justify-center relative"
          >
            <img src="https://ik.imagekit.io/exmpcpadx/image.png" alt="Mahesh Bakery" className="w-44 h-44 object-cover rounded-full" />
          </motion.div>

          {/* Stylized "mahesh" & Slogan */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="flex flex-col items-center mt-6 text-center select-none"
          >
            <h1 className="bakery-main-title text-6xl sm:text-7xl lg:text-8xl select-none leading-none">
              mahesh
            </h1>
            <p className="bakery-subtitle text-xl sm:text-2xl lg:text-3xl mt-2 select-none whitespace-nowrap">
              King of Bakery World
            </p>
          </motion.div>

          {/* Loading Dots */}
          <div className="flex gap-3 mt-8">
            <motion.div animate={{ opacity: [0.1, 1, 0.1] }} transition={{ duration: 1.2, repeat: Infinity, delay: 0 }} className="w-3.5 h-3.5 bg-white/80 rounded-full" />
            <motion.div animate={{ opacity: [0.1, 1, 0.1] }} transition={{ duration: 1.2, repeat: Infinity, delay: 0.2 }} className="w-3.5 h-3.5 bg-white/80 rounded-full" />
            <motion.div animate={{ opacity: [0.1, 1, 0.1] }} transition={{ duration: 1.2, repeat: Infinity, delay: 0.4 }} className="w-3.5 h-3.5 bg-white/80 rounded-full" />
          </div>
        </motion.div>
      ) : (
        <motion.div
          key="main"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="relative min-h-screen bg-[#fcfbfe] flex flex-col overflow-x-hidden font-sans text-[#2c1b40]"
        >
          <div className="sticky top-0 z-50">
            {navbar}
          </div>

          <div className="flex-1 flex flex-col">
            {currentPage === 'home' ? (
              <>
                {/* Hero Section */}
                <div
                  className="relative min-h-[calc(100vh-160px)] flex flex-col items-start justify-start px-6 lg:px-16 lg:px-24 bg-cover bg-center pt-12 lg:pt-24 pb-24 overflow-hidden"
                  style={{ backgroundImage: "url('https://ik.imagekit.io/mc0i0aav7i/1c0a53f5-6dc7-48c8-afe5-682f3a9983a5.png')" }}
                >

                  {/* Typography Content */}
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="w-full md:w-[75%] lg:w-1/2 max-w-2xl flex flex-col items-start z-10"
                  >
                    <h1 className="text-5xl sm:text-6xl md:text-[4rem] lg:text-[4.5rem] xl:text-[5.5rem] font-sans font-black text-[#2c1b40] leading-[1.05] mb-4 sm:mb-6 tracking-tight drop-shadow-sm">
                      Sweet<br />
                      Celebrations<br />
                      Begin Here
                    </h1>
                    <p className="text-gray-600 font-medium text-base sm:text-lg mb-8 sm:mb-10 max-w-md leading-relaxed">
                      Indulging sweet dreams, our cakes are a celebration of flavor and artistry. Indulge in a world of decadence, where each slice is a moment of pure bliss.
                    </p>
                    <button onClick={() => setCurrentPage('menu')} className="bg-[#4f3370] text-white px-8 py-4 sm:px-10 sm:py-5 rounded-full font-bold text-base sm:text-lg hover:bg-[#3d2757] transition-colors shadow-lg hover:shadow-[#4f3370]/40 flex items-center gap-2 group">
                      Make An Order
                      <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </button>
                  </motion.div>

                </div>

                {/* Scrolling Marquee */}
                <div className="w-full bg-[#4f3370] py-3 overflow-hidden flex z-30 whitespace-nowrap shadow-lg border-t border-white/10">
                  <motion.div
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{ repeat: Infinity, ease: "linear", duration: 15 }}
                    className="flex items-center text-white text-sm sm:text-base font-bold tracking-widest shrink-0"
                  >
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="flex items-center shrink-0">
                        <span className="bakery-main-title text-xl sm:text-2xl select-none mx-6 sm:mx-10">mahesh</span>
                        <span className="mx-4 sm:mx-6 text-white/55 text-xs">✦</span>
                        <span className="bakery-subtitle text-sm sm:text-base text-[#d8b4fe] select-none mx-6 sm:mx-10">King of Bakery World</span>
                        <span className="mx-4 sm:mx-6 text-white/55 text-xs">✦</span>
                      </div>
                    ))}
                  </motion.div>
                </div>

                {/* Poster / Promo Image Carousel */}
                <div
                  className="w-full px-6 lg:px-16 pt-12 pb-4 bg-[#fcfbfe] relative z-10 font-sans"
                  onMouseEnter={() => setIsHoveringBanner(true)}
                  onMouseLeave={() => setIsHoveringBanner(false)}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="max-w-7xl mx-auto rounded-[2.5rem] overflow-hidden shadow-[0_25px_60px_rgba(79,51,112,0.06)] border border-purple-100 group relative"
                  >
                    <div
                      onClick={() => setIsPreviewOpen(true)}
                      className="relative overflow-hidden w-full cursor-zoom-in"
                    >
                      {/* Interactive slide/fade animation */}
                      <AnimatePresence mode="wait">
                        <motion.img
                          key={currentBannerIndex}
                          src={BANNERS[currentBannerIndex]}
                          alt={`Mahesh Bakery Special Offer Poster ${currentBannerIndex + 1}`}
                          initial={{ opacity: 0, scale: 1.01 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.6, ease: "easeInOut" }}
                          className="w-full h-auto object-contain block select-none"
                          referrerPolicy="no-referrer"
                        />
                      </AnimatePresence>

                      {/* Hover Overlay with beautiful prompt */}
                      <div className="absolute inset-0 bg-black/5 group-hover:bg-black/25 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <div className="bg-white/90 backdrop-blur-md text-[#4f3370] px-6 py-3 rounded-full flex items-center gap-2 font-bold text-sm shadow-xl border border-purple-100/10 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                          </svg>
                          <span>Full View Poster</span>
                        </div>
                      </div>
                    </div>

                    {/* Navigation Arrows */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentBannerIndex((prev) => (prev === 0 ? BANNERS.length - 1 : prev - 1));
                      }}
                      className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/80 hover:bg-white backdrop-blur-sm text-[#4f3370] border border-purple-100 shadow-md flex items-center justify-center cursor-pointer transition-all hover:scale-105 active:scale-95 opacity-0 group-hover:opacity-100 z-20 focus:outline-none"
                      aria-label="Previous banner"
                    >
                      <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentBannerIndex((prev) => (prev + 1) % BANNERS.length);
                      }}
                      className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/80 hover:bg-white backdrop-blur-sm text-[#4f3370] border border-purple-100 shadow-md flex items-center justify-center cursor-pointer transition-all hover:scale-105 active:scale-95 opacity-0 group-hover:opacity-100 z-20 focus:outline-none"
                      aria-label="Next banner"
                    >
                      <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                    </button>

                    {/* Navigation Dots */}
                    <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 sm:gap-2.5 z-20 bg-black/10 backdrop-blur-xs px-3 py-1.5 rounded-full border border-white/10">
                      {BANNERS.map((_, index) => (
                        <button
                          key={index}
                          onClick={(e) => {
                            e.stopPropagation();
                            setCurrentBannerIndex(index);
                          }}
                          className={`h-2 sm:h-2.5 rounded-full transition-all duration-300 focus:outline-none cursor-pointer ${currentBannerIndex === index
                              ? "w-6 bg-white shadow-sm"
                              : "w-2 bg-white/50 hover:bg-white/80"
                            }`}
                          aria-label={`Go to slide ${index + 1}`}
                        />
                      ))}
                    </div>
                  </motion.div>
                </div>

                {/* Our Collections Section */}
                <section className="py-20 px-6 lg:px-16 bg-[#fdfafc] relative z-10 font-sans border-t border-purple-100/30">
                  <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col items-center text-center mb-16">
                      <h2 className="text-4xl sm:text-5xl font-sans font-black tracking-tight text-[#2c1b40]">
                        Shop our <span className="text-[#4f3370] relative inline-block">Collections<span className="absolute left-0 bottom-1 w-full h-[6px] bg-[#FFB01A]/40 -z-10 rounded-full"></span></span>
                      </h2>
                      <p className="text-gray-500 font-medium text-base sm:text-lg mt-4 max-w-2xl leading-relaxed">
                        Treat yourself to our legendary bakery specialties. Freshly prepared daily with premium ingredients and unmatched homely quality.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                      {/* Biscuits */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        onClick={() => setActiveCategoryModal({
                          title: "Crispy Biscuits",
                          image: "https://ik.imagekit.io/0boxn146f/7fbc8bdb-43fb-428c-b14f-b7bf491b903a.png",
                          description: "Oven-fresh crunchy butter cookies, jam drops, salt biscuits and chocolate treats crafted daily for the perfect tea pairing.",
                          items: [
                            { name: "Subari biscuit (nila shape)", price: "₹100 / 250g" },
                            { name: "Cream biscuit", price: "₹120 / 250g" },
                            { name: "Salt biscuit", price: "₹100 / 250g" },
                            { name: "Coconut ellu biscuit", price: "₹100 / 250g" },
                            { name: "Coconut ball", price: "₹100 / 250g" },
                            { name: "Jam biscuit", price: "₹100 / 250g" },
                            { name: "Horlicks biscuit", price: "₹100 / 250g" },
                            { name: "Boost biscuit", price: "₹100 / 250g" },
                            { name: "Ragi biscuit", price: "₹100 / 250g" },
                          ]
                        })}
                        className="bg-white rounded-[2rem] overflow-hidden shadow-[0_15px_35px_rgba(79,51,112,0.04)] border border-purple-100/50 hover:shadow-[0_22px_45px_rgba(79,51,112,0.12)] hover:-translate-y-2.5 transition-all duration-300 group cursor-pointer"
                      >
                        <div className="relative h-56 overflow-hidden">
                          <img
                            src="https://ik.imagekit.io/0boxn146f/7fbc8bdb-43fb-428c-b14f-b7bf491b903a.png"
                            alt="Crispy Biscuits"
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60"></div>
                          <span className="absolute bottom-4 left-5 bg-[#4f3370]/90 backdrop-blur-xs text-white text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full shadow-md">
                            bakery fresh
                          </span>
                        </div>
                        <div className="p-6">
                          <h3 className="font-sans font-extrabold text-xl text-[#2c1b40] group-hover:text-[#4f3370] transition-colors mb-2">
                            Biscuits
                          </h3>
                          <p className="text-gray-500 text-sm font-semibold line-clamp-2 leading-relaxed">
                            Buttery rich sweet cookies, golden digestive biscuits, jam drops and melt-in-the-mouth salt biscuits.
                          </p>
                          <div className="mt-4 flex items-center gap-1.5 text-[#4f3370] font-extrabold text-xs tracking-wider uppercase select-none">
                            <span>View Price List</span>
                            <span>→</span>
                          </div>
                        </div>
                      </motion.div>

                      {/* Puffs */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.15 }}
                        onClick={() => setActiveCategoryModal({
                          title: "Hot Oven Puffs",
                          image: "https://ik.imagekit.io/0boxn146f/2e591305-041e-478b-b02a-7f58f9deb629.png",
                          description: "Extremely crispy, golden-brown and hot multi-layered flaky puffs baked fresh with premium savoury fillings.",
                          items: [
                            { name: "Veg puff", price: "₹15 / pc" },
                            { name: "Egg puff", price: "₹20 / pc" },
                            { name: "Mushroom puff", price: "₹25 / pc" },
                            { name: "Paneer puff", price: "₹25 / pc" },
                            { name: "Samosa", price: "₹15 / pc" },
                            { name: "Chicken puff", price: "₹35 / pc" },
                            { name: "Egg roll", price: "₹30 / pc" },
                            { name: "Chicken roll", price: "₹40 / pc" },
                            { name: "Dhilpasand", price: "₹50 / pc" }
                          ]
                        })}
                        className="bg-white rounded-[2rem] overflow-hidden shadow-[0_15px_35px_rgba(79,51,112,0.04)] border border-purple-100/50 hover:shadow-[0_22px_45px_rgba(79,51,112,0.12)] hover:-translate-y-2.5 transition-all duration-300 group cursor-pointer"
                      >
                        <div className="relative h-56 overflow-hidden">
                          <img
                            src="https://ik.imagekit.io/0boxn146f/2e591305-041e-478b-b02a-7f58f9deb629.png"
                            alt="Hot Oven Puffs"
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60"></div>
                          <span className="absolute bottom-4 left-5 bg-[#4f3370]/90 backdrop-blur-xs text-white text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full shadow-md">
                            hot & crispy
                          </span>
                        </div>
                        <div className="p-6">
                          <h3 className="font-sans font-extrabold text-xl text-[#2c1b40] group-hover:text-[#4f3370] transition-colors mb-2">
                            Puffs
                          </h3>
                          <p className="text-gray-500 text-sm font-semibold line-clamp-2 leading-relaxed">
                            Freshly baked spicy golden-crust vegetable puffs, masala paneer puffs, and tasty egg puff options.
                          </p>
                          <div className="mt-4 flex items-center gap-1.5 text-[#4f3370] font-extrabold text-xs tracking-wider uppercase select-none">
                            <span>View Price List</span>
                            <span>→</span>
                          </div>
                        </div>
                      </motion.div>

                      {/* Sweets & savories */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        onClick={() => setActiveCategoryModal({
                          title: "Sweets & Savouries",
                          image: "https://ik.imagekit.io/0boxn146f/53dfa9b9-f570-4df5-9c82-aa997c934109.png",
                          description: "Pure ghee celebratory Indian sweets paired with traditional crispy, spicy south Indian snacks.",
                          items: []
                        })}
                        className="bg-white rounded-[2rem] overflow-hidden shadow-[0_15px_35px_rgba(79,51,112,0.04)] border border-purple-100/50 hover:shadow-[0_22px_45px_rgba(79,51,112,0.12)] hover:-translate-y-2.5 transition-all duration-300 group cursor-pointer"
                      >
                        <div className="relative h-56 overflow-hidden">
                          <img
                            src="https://ik.imagekit.io/0boxn146f/53dfa9b9-f570-4df5-9c82-aa997c934109.png"
                            alt="Sweets & savories"
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60"></div>
                          <span className="absolute bottom-4 left-5 bg-[#4f3370]/90 backdrop-blur-xs text-white text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full shadow-md">
                            homely goodness
                          </span>
                        </div>
                        <div className="p-6">
                          <h3 className="font-sans font-extrabold text-xl text-[#2c1b40] group-hover:text-[#4f3370] transition-colors mb-2">
                            Sweets & Savouries
                          </h3>
                          <p className="text-gray-500 text-sm font-semibold line-clamp-2 leading-relaxed">
                            Premium pure ghee traditional sweet laddoos, gulab jamuns, and deliciously crunchy spicy mixtures.
                          </p>
                          <div className="mt-4 flex items-center gap-1.5 text-[#4f3370] font-extrabold text-xs tracking-wider uppercase select-none">
                            <span>View Price List</span>
                            <span>→</span>
                          </div>
                        </div>
                      </motion.div>

                      {/* Bread */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        onClick={() => setActiveCategoryModal({
                          title: "Oven-Fresh Bread",
                          image: "https://ik.imagekit.io/0boxn146f/e741fe9e-285b-44f5-a352-56a034d96f0f.png",
                          description: "Extremely soft daily baked breads, whole wheat loaves with zero preservatives.",
                          items: [
                            { name: "Bread Small", price: "₹35 / loaf" },
                            { name: "Family Bread", price: "₹70 / loaf" },
                            { name: "Wheat Bread", price: "₹40 / loaf" }
                          ]
                        })}
                        className="bg-white rounded-[2rem] overflow-hidden shadow-[0_15px_35px_rgba(79,51,112,0.04)] border border-purple-100/50 hover:shadow-[0_22px_45px_rgba(79,51,112,0.12)] hover:-translate-y-2.5 transition-all duration-300 group cursor-pointer"
                      >
                        <div className="relative h-56 overflow-hidden">
                          <img
                            src="https://ik.imagekit.io/0boxn146f/e741fe9e-285b-44f5-a352-56a034d96f0f.png"
                            alt="Fresh Breads"
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60"></div>
                          <span className="absolute bottom-4 left-5 bg-[#4f3370]/90 backdrop-blur-xs text-white text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full shadow-md">
                            baked fresh daily
                          </span>
                        </div>
                        <div className="p-6">
                          <h3 className="font-sans font-extrabold text-xl text-[#2c1b40] group-hover:text-[#4f3370] transition-colors mb-2">
                            Bread
                          </h3>
                          <p className="text-gray-500 text-sm font-semibold line-clamp-2 leading-relaxed">
                            Baked fresh daily: Bread Small, Family Bread, and healthy whole Wheat Bread.
                          </p>
                          <div className="mt-4 flex items-center gap-1.5 text-[#4f3370] font-extrabold text-xs tracking-wider uppercase select-none">
                            <span>View Price List</span>
                            <span>→</span>
                          </div>
                        </div>
                      </motion.div>

                      {/* Cakes */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        onClick={() => setActiveCategoryModal({
                          title: "Celebration Cakes",
                          image: "https://ik.imagekit.io/0boxn146f/8225ecc2-5aaf-4e42-8fa5-2efc050a962b.png",
                          description: "Design 100% customized premium photo print celebration cakes, fresh multi-layered cream and wedding cakes.",
                          items: [
                            { name: "Black Forest Cake", price: "₹650 / kg" },
                            { name: "Premium Black Forest Cake", price: "₹900 / kg" },
                            { name: "White Forest Cake", price: "₹650 / kg" },
                            { name: "Premium White Forest Cake", price: "₹900 / kg" },
                            { name: "Rich Plum Cake", price: "₹440 / kg" },
                            { name: "Red Velvet Cake", price: "₹900 / kg" },
                            { name: "Rainbow", price: "₹900 / kg" },
                            { name: "Butter scotch fantasy", price: "₹900 / kg" },
                            { name: "Blueberry", price: "₹900 / kg" },
                            { name: "Strawberry", price: "₹900 / kg" },
                            { name: "Pineapple", price: "₹900 / kg" },
                            { name: "Chocolate truffles", price: "₹800 / kg" },
                            { name: "Italian Cake", price: "₹850 / kg" },
                            { name: "White vancho", price: "₹1000 / kg" },
                            { name: "Dream Cake", price: "₹1200 / box" },
                            { name: "Lotus biscoff", price: "₹1200 / kg" },
                            { name: "Kitkat with gems", price: "₹1500 / kg" },
                            { name: "Kunfa pistachio", price: "₹1500 / kg" },
                          ]
                        })}
                        className="bg-white rounded-[2rem] overflow-hidden shadow-[0_15px_35px_rgba(79,51,112,0.04)] border border-purple-100/50 hover:shadow-[0_22px_45px_rgba(79,51,112,0.12)] hover:-translate-y-2.5 transition-all duration-300 group cursor-pointer"
                      >
                        <div className="relative h-56 overflow-hidden">
                          <img
                            src="https://ik.imagekit.io/0boxn146f/8225ecc2-5aaf-4e42-8fa5-2efc050a962b.png"
                            alt="Celebration Cakes"
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60"></div>
                          <span className="absolute bottom-4 left-5 bg-[#4f3370]/90 backdrop-blur-xs text-white text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full shadow-md">
                            premium designer
                          </span>
                        </div>
                        <div className="p-6">
                          <h3 className="font-sans font-extrabold text-xl text-[#2c1b40] group-hover:text-[#4f3370] transition-colors mb-2">
                            Cakes
                          </h3>
                          <p className="text-gray-500 text-sm font-semibold line-clamp-2 leading-relaxed">
                            Design 100% customized premium photo print celebration cakes, fresh multi-layered cream and wedding cakes.
                          </p>
                          <div className="mt-4 flex items-center gap-1.5 text-[#4f3370] font-extrabold text-xs tracking-wider uppercase select-none">
                            <span>View Price List</span>
                            <span>→</span>
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </section>

                {/* Features Section */}
                <section className="py-24 px-6 lg:px-16 bg-[#fcfbfe] relative z-10 font-sans">
                  <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                      {/* Card 1 */}
                      <div className="bg-white rounded-[2.5rem] p-10 flex flex-col items-center text-center shadow-[0_15px_40px_rgba(79,51,112,0.03)] hover:shadow-[0_20px_50px_rgba(79,51,112,0.08)] hover:-translate-y-2 transition-all duration-300">
                        <div className="w-20 h-20 bg-[#4f3370] rounded-full flex items-center justify-center mb-8 shadow-inner shadow-black/20">
                          <Award className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="font-serif text-2xl font-bold mb-3 text-[#2c1b40]">Premium Quality</h3>
                        <p className="text-gray-500 font-medium">Only the finest ingredients</p>
                      </div>

                      {/* Card 2 */}
                      <div className="bg-white rounded-[2.5rem] p-10 flex flex-col items-center text-center shadow-[0_15px_40px_rgba(79,51,112,0.03)] hover:shadow-[0_20px_50px_rgba(79,51,112,0.08)] hover:-translate-y-2 transition-all duration-300">
                        <div className="w-20 h-20 bg-[#4f3370] rounded-full flex items-center justify-center mb-8 shadow-inner shadow-black/20">
                          <Cake className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="font-serif text-2xl font-bold mb-3 text-[#2c1b40]">Freshly Baked</h3>
                        <p className="text-gray-500 font-medium">Baked the day you order</p>
                      </div>

                      {/* Card 3 */}
                      <div className="bg-white rounded-[2.5rem] p-10 flex flex-col items-center text-center shadow-[0_15px_40px_rgba(79,51,112,0.03)] hover:shadow-[0_20px_50px_rgba(79,51,112,0.08)] hover:-translate-y-2 transition-all duration-300">
                        <div className="w-20 h-20 bg-[#4f3370] rounded-full flex items-center justify-center mb-8 shadow-inner shadow-black/20">
                          <Truck className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="font-serif text-2xl font-bold mb-3 text-[#2c1b40]">Timely Delivery</h3>
                        <p className="text-gray-500 font-medium">On time, every time</p>
                      </div>

                      {/* Card 4 */}
                      <div className="bg-white rounded-[2.5rem] p-10 flex flex-col items-center text-center shadow-[0_15px_40px_rgba(79,51,112,0.03)] hover:shadow-[0_20px_50px_rgba(79,51,112,0.08)] hover:-translate-y-2 transition-all duration-300">
                        <div className="w-20 h-20 bg-[#4f3370] rounded-full flex items-center justify-center mb-8 shadow-inner shadow-black/20">
                          <Heart className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="font-serif text-2xl font-bold mb-3 text-[#2c1b40]">Made with Love</h3>
                        <p className="text-gray-500 font-medium">Crafted with passion</p>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Chef's Signatures Section */}
                <section className="py-24 px-6 lg:px-16 bg-[#fcfbfe] relative z-10 font-sans">
                  <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                      <div>
                        <h2 className="text-4xl sm:text-5xl font-sans font-black tracking-tight text-[#4f3370]">
                          Chef's <span className="text-[#2c1b40]">Signatures</span>
                        </h2>
                        <p className="text-gray-500 font-medium text-lg mt-4 max-w-xl">
                          Experience our master pastry chef's most celebrated creations, crafted with passion and zero compromises.
                        </p>
                      </div>
                      <button onClick={() => setCurrentPage('menu')} className="text-[#4f3370] font-bold pb-1 border-b-2 border-[#4f3370] hover:text-[#2c1b40] hover:border-[#2c1b40] transition-colors shrink-0 cursor-pointer">
                        View Full Menu →
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                      {[
                        { title: 'Royal White Vancho', image: 'https://ik.imagekit.io/8d1iue1vn/b36fcdde-5868-4518-9cff-aec5ae147ff1.png', tag: 'Bestseller' },
                        { title: 'Classic Chocolate Truffle', image: 'https://ik.imagekit.io/8d1iue1vn/df125d5c-ebe3-40e0-9f5d-2466b0e57916.png', tag: 'Premium' },
                        { title: 'Lotus Biscoff Dream', image: 'https://ik.imagekit.io/8d1iue1vn/2c7249af-c3fc-476a-a82e-39566e76cbc0.png', tag: 'Must Try' }
                      ].map((item, idx) => (
                        <div key={idx} className="bg-[#4f3370] rounded-[2rem] p-4 group cursor-pointer hover:shadow-2xl hover:shadow-[#4f3370]/30 transition-all duration-300" onClick={() => setCurrentPage('menu')}>
                          <div className="relative rounded-3xl overflow-hidden h-64 mb-6">
                            <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-[#4f3370] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                              {item.tag}
                            </div>
                          </div>
                          <div className="px-4 pb-4">
                            <h3 className="text-white font-bold text-xl mb-2">{item.title}</h3>
                            <div className="flex items-center gap-2 text-[#FFB01A] font-bold text-sm tracking-widest uppercase mt-4">
                              <span>Order Now</span>
                              <span className="group-hover:translate-x-2 transition-transform">→</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>

                {/* Testimonials Marquee Section */}
                <section className="py-24 bg-[#4f3370] relative z-10 font-sans border-t border-[#3d2757] overflow-hidden">
                  <div className="max-w-7xl mx-auto px-6 lg:px-16 mb-12 text-center">
                    <div className="w-16 h-16 bg-white/10 text-white rounded-full flex items-center justify-center mb-6 mx-auto">
                      <Quote className="w-8 h-8 fill-current opacity-80" />
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight drop-shadow-md">Loved by Everyone</h2>
                    <p className="text-white/80 font-medium text-lg max-w-2xl mx-auto">
                      Hear what our happy customers have to say about our cakes, sweets, and fresh bakery delights.
                    </p>
                  </div>

                  <div className="relative w-full flex overflow-hidden group">
                    <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#4f3370] to-transparent z-10"></div>
                    <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#4f3370] to-transparent z-10"></div>

                    <motion.div
                      animate={{ x: ["0%", "-50%"] }}
                      transition={{ repeat: Infinity, ease: "linear", duration: 40 }}
                      className="flex shrink-0 items-stretch gap-6 px-6 cursor-grab active:cursor-grabbing hover:[animation-play-state:paused]"
                    >
                      {[...TESTIMONIALS, ...TESTIMONIALS].map((testimonial, i) => (
                        <div key={i} className="w-[350px] md:w-[400px] shrink-0 bg-white rounded-3xl p-8 flex flex-col justify-between shadow-xl shadow-black/20 hover:scale-[1.02] transition-transform duration-300">
                          <div>
                            <div className="flex text-[#FFB01A] mb-4">
                              {[1, 2, 3, 4, 5].map(star => (
                                <Star key={star} className="w-5 h-5 fill-current" />
                              ))}
                            </div>
                            <p className="text-[#3c2a4f] text-lg font-medium leading-relaxed italic mb-6">
                              "{testimonial.text}"
                            </p>
                          </div>
                          <div className="flex items-center gap-4 border-t border-purple-50 pt-5 mt-auto">
                            <div className="w-10 h-10 rounded-full bg-[#4f3370]/10 flex items-center justify-center text-[#4f3370] font-bold text-lg shrink-0">
                              {testimonial.author.charAt(0)}
                            </div>
                            <div>
                              <p className="font-bold text-[#2c1b40]">{testimonial.author}</p>
                              <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">{testimonial.category}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </motion.div>
                  </div>
                </section>

                {/* Store Locator Section */}
                <section className="py-24 px-6 lg:px-16 bg-white relative z-10 font-sans border-t border-gray-100">
                  <div className="max-w-3xl mx-auto flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-[#4f3370]/10 text-[#4f3370] rounded-full flex items-center justify-center mb-6">
                      <MapPin className="w-8 h-8" />
                    </div>
                    <h2 className="text-4xl font-bold text-[#2c1b40] mb-4">Find a Store Near You</h2>
                    <p className="text-gray-500 font-medium text-lg leading-relaxed mb-8 max-w-2xl">
                      Visit us at 500+ Mahesh Bakery stores across India. Find your nearest outlet for fresh cakes, pastries, and delicious treats.
                    </p>
                    <a
                      href="https://www.google.com/maps/search/?api=1&query=No.5b%2C+2%2C+Cuddalore+Main+Rd%2C+opp.+bus+stand%2C+Ulunthampattu%2C+Panruti%2C+Tamil+Nadu+607106"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[#4f3370] text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-[#3d2757] transition-colors shadow-lg hover:shadow-[#4f3370]/40 flex items-center gap-2 cursor-pointer inline-flex"
                    >
                      <MapPin className="w-5 h-5 mr-1" />
                      Locate Store
                    </a>
                  </div>
                </section>

                <Footer onNavigate={setCurrentPage} />
              </>
            ) : (
              <div className="flex-1 flex flex-col">
                <div className="flex-1">
                  {currentPage === 'login' && (
                    <Login
                      notice={loginNotice}
                      onLogin={(email, password, isAdmin, customName, uid, avatar) => {
                        const emailKey = `mahesh_bakery_user_profile_${email.toLowerCase()}`;
                        const savedProfileStr = safeStorage.getItem(emailKey);
                        let loggedUser;
                        if (savedProfileStr) {
                          try {
                            const savedProfile = JSON.parse(savedProfileStr);
                            loggedUser = {
                              ...savedProfile,
                              uid: uid || savedProfile.uid || '',
                              isAdmin: !!isAdmin,
                              avatar: savedProfile.avatar || avatar
                            };
                          } catch (e) {
                            loggedUser = {
                              uid: uid || '',
                              email,
                              phone: '',
                              name: isAdmin ? 'Store Admin' : (customName || 'Cake Lover'),
                              isAdmin: !!isAdmin,
                              avatar: avatar || ''
                            };
                          }
                        } else {
                          loggedUser = {
                            uid: uid || '',
                            email,
                            phone: '',
                            name: isAdmin ? 'Store Admin' : (customName || 'Cake Lover'),
                            isAdmin: !!isAdmin,
                            avatar: avatar || ''
                          };
                        }
                        setUser(loggedUser);
                        safeStorage.setItem('mahesh_bakery_user', JSON.stringify(loggedUser));
                        safeStorage.setItem(emailKey, JSON.stringify(loggedUser));
                        setLoginNotice(null);
                        setCurrentPage('profile');
                      }}
                    />
                  )}
                  {currentPage === 'admin' && user?.isAdmin && (
                    <AdminPanel
                      onLogout={async () => {
                        try { await signOut(auth); } catch (e) { console.error(e); }
                        setUser(null);
                        safeStorage.removeItem('mahesh_bakery_user');
                        setCurrentPage('home');
                      }}
                    />
                  )}
                  {currentPage === 'profile' && user && (
                    <Profile
                      user={user}
                      onUpdateUser={(updated) => {
                        setUser(updated);
                        safeStorage.setItem('mahesh_bakery_user', JSON.stringify(updated));
                        if (updated.email) {
                          safeStorage.setItem(`mahesh_bakery_user_profile_${updated.email.toLowerCase()}`, JSON.stringify(updated));
                        }
                      }}
                      onLogout={async () => {
                        try { await signOut(auth); } catch (e) { console.error(e); }
                        setUser(null);
                        safeStorage.removeItem('mahesh_bakery_user');
                        setCurrentPage('home');
                      }}
                      onBrowseCakes={() => setCurrentPage('menu')}
                      onAddToCart={(item) => {
                        setCartItems([...cartItems, item]);
                      }}
                    />
                  )}
                  {currentPage === 'menu' && (
                    <Menu
                      isAuthenticated={!!user}
                      user={user}
                      initialCategory={menuCategory}
                      onAddToCart={(item) => setCartItems([...cartItems, item])}
                      onViewCart={() => setCurrentPage('cart')}
                      onPageChange={setCurrentPage}
                      onRequiresAuth={() => {
                        setLoginNotice("Please sign in or create an account to proceed with your order.");
                        setCurrentPage('login');
                      }}
                    />
                  )}
                  {currentPage === 'cart' && (
                    <Cart
                      cartItems={cartItems}
                      isAuthenticated={!!user}
                      user={user}
                      onRemoveItem={(id) => setCartItems(cartItems.filter(item => item.id !== id))}
                      onBrowse={() => setCurrentPage('menu')}
                      onRequiresAuth={() => {
                        setLoginNotice("Please sign in or create an account to proceed with your checkout.");
                        setCurrentPage('login');
                      }}
                      onCheckout={async (details) => {
                        if (user) {
                          const newOrder = {
                            id: `order-${Date.now()}-${Math.floor(100 + Math.random() * 900)}`,
                            date: new Date().toLocaleDateString(),
                            status: 'Accepted',
                            customerEmail: user.email,
                            customerName: details.name,
                            customerPhone: details.phone,
                            customerAddress: details.address,
                            paymentMethod: 'Cash on Delivery',
                            items: [...cartItems],
                          };

                          // Save order to Firestore Database
                          try {
                            const totalAmount = cartItems.reduce((sum, item) => sum + item.grandTotal, 0);
                            await addDoc(collection(db, 'orders'), {
                              userId: user.email,
                              orderId: newOrder.id,
                              date: newOrder.date,
                              status: 'Accepted',
                              customerName: details.name,
                              customerPhone: details.phone,
                              customerAddress: details.address,
                              paymentMethod: 'Cash on Delivery',
                              totalAmount,
                              items: cartItems.map(item => ({
                                sizeLabel: item.sizeLabel || '',
                                sizePrice: item.sizePrice || 0,
                                name: item.name || '',
                                age: item.age || '',
                                message: item.message || '',
                                photoUrl: item.photoUrl || '',
                                toppings: item.toppings || [],
                                toppingsTotal: item.toppingsTotal || 0,
                                itemTotal: item.itemTotal || 0,
                                quantity: item.quantity || 1,
                                date: item.date || '',
                                time: item.time || '',
                                grandTotal: item.grandTotal || 0,
                                category: item.category || '',
                              })),
                              createdAt: Timestamp.now()
                            });
                            console.log('Order saved to Firestore successfully!');
                          } catch (firestoreErr) {
                            console.error('Failed to save order to Firestore:', firestoreErr);
                          }

                          // Also save to localStorage as backup/cache
                          const savedOrders = safeStorage.getItem(`mahesh_bakery_orders_${user.email}`);
                          let currentOrders = [];
                          if (savedOrders) {
                            try {
                              currentOrders = JSON.parse(savedOrders);
                            } catch (err) {
                              console.error(err);
                            }
                          }
                          currentOrders.unshift(newOrder);
                          safeStorage.setItem(`mahesh_bakery_orders_${user.email}`, JSON.stringify(currentOrders));

                          // Push to global orders for admin panel
                          try {
                            const globalOrders = JSON.parse(safeStorage.getItem('mahesh_bakery_global_orders') || '[]');
                            globalOrders.push(newOrder);
                            safeStorage.setItem('mahesh_bakery_global_orders', JSON.stringify(globalOrders));
                          } catch (e) { }

                          setCartItems([]);
                          setCurrentPage('profile');
                        }
                      }}
                    />
                  )}
                  {currentPage === 'about' && (
                    <About />
                  )}
                  {currentPage === 'own-make' && (
                    <OurOwnMake
                      isAuthenticated={!!user}
                      onAddToCart={(item) => setCartItems([...cartItems, item])}
                      onViewCart={() => setCurrentPage('cart')}
                      onRequiresAuth={() => {
                        setLoginNotice("Please sign in or create an account to proceed.");
                        setCurrentPage('login');
                      }}
                    />
                  )}
                  {currentPage === 'gallery' && (
                    <Gallery />
                  )}
                  {currentPage === 'branches' && (
                    <Branches />
                  )}
                  {currentPage === 'privacy' && (
                    <PrivacyPolicy />
                  )}
                  {currentPage === 'terms' && (
                    <Terms />
                  )}
                  {currentPage === 'contact' && (
                    <div className="font-sans min-h-[85vh]">
                      {/* Contact Banner Image */}
                      <div className="w-full bg-[#2A0E38]">
                        <img
                          src="https://ik.imagekit.io/0boxn146f/bfe6a23f-9db7-468e-9536-e517ae5cd9b9.png"
                          alt="Contact Mahesh Bakery Banner"
                          className="w-full"
                        />
                      </div>

                      <div className="py-12 md:py-20 px-4 md:px-12 max-w-7xl mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-start animate-fade-in">
                          {/* Left Column: Send Us a Message Form Card */}
                          <div className="md:col-span-7 bg-white rounded-[2.5rem] p-8 md:p-10 shadow-[0_20px_50px_rgba(79,51,112,0.06)] border border-purple-50/20 flex flex-col justify-between">
                            <h2 className="font-serif text-3xl font-black text-[#2c1b40] mb-6">Send Us a Message</h2>

                            <form onSubmit={(e) => {
                              e.preventDefault();
                              setShowContactSuccess(true);
                              setContactName('');
                              setContactEmail('');
                              setContactPhone('');
                              setContactMessage('');
                              setTimeout(() => setShowContactSuccess(false), 4000);
                            }} className="space-y-5">
                              <div>
                                <label className="block text-[#2c1b40] font-bold text-sm mb-2 px-1">Your Name</label>
                                <input
                                  type="text"
                                  required
                                  value={contactName}
                                  onChange={(e) => setContactName(e.target.value)}
                                  placeholder="Enter your name"
                                  className="w-full px-5 py-4.5 rounded-2xl border border-gray-100 bg-gray-50 focus:outline-none focus:ring-4 focus:ring-purple-100/40 focus:border-[#4f3370] transition-all font-semibold text-sm"
                                />
                              </div>
                              <div>
                                <label className="block text-[#2c1b40] font-bold text-sm mb-2 px-1">Email Address</label>
                                <input
                                  type="email"
                                  required
                                  value={contactEmail}
                                  onChange={(e) => setContactEmail(e.target.value)}
                                  placeholder="you@example.com"
                                  className="w-full px-5 py-4.5 rounded-2xl border border-gray-100 bg-gray-50 focus:outline-none focus:ring-4 focus:ring-purple-100/40 focus:border-[#4f3370] transition-all font-semibold text-sm"
                                />
                              </div>
                              <div>
                                <label className="block text-[#2c1b40] font-bold text-sm mb-2 px-1">Phone Number</label>
                                <input
                                  type="tel"
                                  required
                                  value={contactPhone}
                                  onChange={(e) => setContactPhone(e.target.value)}
                                  placeholder="12345678"
                                  className="w-full px-5 py-4.5 rounded-2xl border border-gray-100 bg-gray-50 focus:outline-none focus:ring-4 focus:ring-purple-100/40 focus:border-[#4f3370] transition-all font-semibold text-sm"
                                />
                              </div>
                              <div>
                                <label className="block text-[#2c1b40] font-bold text-sm mb-2 px-1">Message</label>
                                <textarea
                                  required
                                  rows={4}
                                  value={contactMessage}
                                  onChange={(e) => setContactMessage(e.target.value)}
                                  placeholder="Tell us about your cake..."
                                  className="w-full px-5 py-4.5 rounded-2xl border border-gray-100 bg-gray-50 focus:outline-none focus:ring-4 focus:ring-purple-100/40 focus:border-[#4f3370] transition-all font-semibold text-sm resize-none"
                                />
                              </div>

                              <button
                                type="submit"
                                className="w-full bg-[#4f3370] hover:bg-[#3d2757] text-white py-4 px-6 rounded-full font-bold text-base transition-all shadow-lg hover:shadow-[#4f3370]/30 flex items-center justify-center gap-2 cursor-pointer mt-4"
                              >
                                <span>Send Message</span>
                                <Send className="w-4 h-4 ml-1" />
                              </button>
                            </form>
                          </div>

                          {/* Right Column: Contact Information Cards Stack */}
                          <div className="md:col-span-5 flex flex-col gap-6">
                            <h2 className="font-serif text-3xl font-bold text-[#2c1b40] mb-2 px-1">Contact Information</h2>

                            {/* Cards stack */}
                            <div className="flex flex-col gap-4">
                              {/* Phone Card */}
                              <div className="bg-white rounded-3xl p-5 border border-purple-50/10 shadow-[0_10px_35px_rgba(79,51,112,0.02)] flex items-center gap-4.5">
                                <div className="w-12 h-12 rounded-full bg-[#4f3370] text-white flex items-center justify-center shrink-0 shadow-md shadow-[#4f3370]/15">
                                  <Phone className="w-5 h-5" />
                                </div>
                                <div>
                                  <h4 className="font-bold text-[#2c1b40] text-base leading-tight">Phone</h4>
                                  <div className="flex flex-col text-gray-500 font-medium text-sm mt-1 font-mono space-y-0.5">
                                    <a href="tel:9944416643" className="hover:text-[#4f3370] transition-colors">+91 99444 16643</a>
                                    <a href="tel:9566789171" className="hover:text-[#4f3370] transition-colors">+91 95667 89171</a>
                                    <a href="tel:9865666233" className="hover:text-[#4f3370] transition-colors">+91 98656 66233</a>
                                  </div>
                                </div>
                              </div>

                              {/* Email Card */}
                              <div className="bg-white rounded-3xl p-5 border border-purple-50/10 shadow-[0_10px_35px_rgba(79,51,112,0.02)] flex items-center gap-4.5">
                                <div className="w-12 h-12 rounded-full bg-[#4f3370] text-white flex items-center justify-center shrink-0 shadow-md shadow-[#4f3370]/15">
                                  <Mail className="w-5 h-5" />
                                </div>
                                <div>
                                  <h4 className="font-bold text-[#2c1b40] text-base leading-tight">Email</h4>
                                  <p className="text-gray-500 font-medium text-sm mt-1">maheshsuperbakerymg@gmail.com</p>
                                </div>
                              </div>

                              {/* Address Card */}
                              <div className="bg-white rounded-3xl p-5 border border-purple-50/10 shadow-[0_10px_35px_rgba(79,51,112,0.02)] flex items-center gap-4.5">
                                <div className="w-12 h-12 rounded-full bg-[#4f3370] text-white flex items-center justify-center shrink-0 shadow-md shadow-[#4f3370]/15">
                                  <MapPin className="w-5 h-5" />
                                </div>
                                <div className="flex-1">
                                  <h4 className="font-bold text-[#2c1b40] text-base leading-tight">Address</h4>
                                  <p className="text-gray-500 font-medium text-xs sm:text-sm mt-1 leading-snug">
                                    No.5b, 2, Cuddalore Main Rd, opp. bus stand, Ulunthampattu, Panruti, Tamil Nadu 607106
                                  </p>
                                </div>
                              </div>

                              {/* Hours Card */}
                              <div className="bg-white rounded-3xl p-5 border border-purple-50/10 shadow-[0_10px_35px_rgba(79,51,112,0.02)] flex items-center gap-4.5">
                                <div className="w-12 h-12 rounded-full bg-[#4f3370] text-white flex items-center justify-center shrink-0 shadow-md shadow-[#4f3370]/15">
                                  <Clock className="w-5 h-5" />
                                </div>
                                <div>
                                  <h4 className="font-bold text-[#2c1b40] text-base leading-tight">Hours</h4>
                                  <p className="text-gray-500 font-medium text-sm mt-1">Open · Closes 10:30 PM</p>
                                </div>
                              </div>

                              {/* Instagram Card */}
                              <a
                                href="https://www.instagram.com/Maheshbakerysweets"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-white hover:bg-[#fcfbfe] rounded-3xl p-5 border border-purple-50/10 shadow-[0_10px_35px_rgba(79,51,112,0.02)] flex items-center gap-4.5 transition-all group cursor-pointer"
                              >
                                <div className="w-12 h-12 rounded-full bg-[#4f3370] text-white flex items-center justify-center shrink-0 shadow-md shadow-[#4f3370]/15 group-hover:scale-105 transition-transform">
                                  <Instagram className="w-5 h-5" />
                                </div>
                                <div>
                                  <h4 className="font-bold text-[#2c1b40] text-base leading-tight">Instagram</h4>
                                  <p className="text-[#4f3370] font-bold text-sm mt-1 group-hover:underline">
                                    @Maheshbakerysweets
                                  </p>
                                </div>
                              </a>
                            </div>
                          </div>
                        </div>

                        {/* Success toast notification */}
                        <AnimatePresence>
                          {showContactSuccess && (
                            <motion.div
                              initial={{ opacity: 0, y: 50, scale: 0.95 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: 50, scale: 0.95 }}
                              className="fixed bottom-10 right-10 z-50 bg-[#4f3370] text-white py-3.5 px-6 rounded-full flex items-center gap-2.5 shadow-2xl font-bold"
                            >
                              <span className="w-5 h-5 bg-white text-[#4f3370] rounded-full flex items-center justify-center text-xs">✓</span>
                              <span>Message has been sent successfully!</span>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  )}
                </div>
                <Footer onNavigate={setCurrentPage} />
              </div>
            )}
          </div>
          <Chatbot />

          {/* Full Screen Image Lightbox / Viewer */}
          <AnimatePresence>
            {isPreviewOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsPreviewOpen(false)}
                className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 cursor-zoom-out"
              >
                {/* Close Button */}
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  onClick={() => setIsPreviewOpen(false)}
                  className="absolute top-6 right-6 z-[110] bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition-all border border-white/20 flex items-center justify-center cursor-pointer group shadow-lg"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </motion.button>

                {/* Animated Image Container */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.93 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.93 }}
                  transition={{ type: "spring", damping: 25, stiffness: 300 }}
                  className="relative max-w-5xl max-h-[85vh] overflow-hidden rounded-2xl bg-[#1d1726]/40 border border-white/10 flex items-center justify-center shadow-2xl"
                  onClick={(e) => e.stopPropagation()}
                >
                  <img
                    src={BANNERS[currentBannerIndex]}
                    alt="Mahesh Bakery Special Offer Poster Full"
                    className="max-w-full max-h-[85vh] object-contain rounded-2xl select-none"
                    referrerPolicy="no-referrer"
                  />
                </motion.div>

                {/* Visual Tip */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 15 }}
                  className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/50 text-xs font-semibold tracking-wider uppercase font-mono select-none pointer-events-none"
                >
                  Click anywhere outside to close
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Active Category Modal with Price List & Direct Order WhatsApp Trigger */}
          <AnimatePresence>
            {activeCategoryModal && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setActiveCategoryModal(null)}
                className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 cursor-zoom-out"
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 30 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 30 }}
                  transition={{ type: "spring", damping: 25, stiffness: 280 }}
                  onClick={(e) => e.stopPropagation()}
                  className="bg-white rounded-[2.5rem] overflow-hidden w-full max-w-xl shadow-2xl relative border border-purple-100 cursor-default"
                >
                  {/* Top Close Button */}
                  <button
                    onClick={() => setActiveCategoryModal(null)}
                    className="absolute top-5 right-5 z-20 bg-gray-100 hover:bg-gray-200 text-gray-700 p-2.5 rounded-full transition-colors cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>

                  {/* Header Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={activeCategoryModal.image}
                      alt={activeCategoryModal.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-black/10"></div>
                    <div className="absolute bottom-5 left-6 text-left">
                      <span className="text-[10px] uppercase font-mono tracking-widest text-[#4f3370] font-extrabold bg-[#4f3370]/15 px-2.5 py-1 rounded-md mb-2 inline-block">
                        mahesh menu
                      </span>
                      <h3 className="text-2xl sm:text-3xl font-sans font-black text-[#2c1b40] tracking-tight leading-tight">
                        {activeCategoryModal.title}
                      </h3>
                    </div>
                  </div>

                  {/* Body Contents */}
                  <div className="p-6 sm:p-8 flex flex-col">
                    <p className="text-gray-500 font-semibold text-sm leading-relaxed mb-6 text-left">
                      {activeCategoryModal.description}
                    </p>

                    <h4 className="font-extrabold text-[11px] text-[#4f3370] tracking-widest uppercase mb-4 text-left border-b border-purple-100/60 pb-1.5 px-0.5">
                      Popular Items & Pricing
                    </h4>

                    {/* Cost List */}
                    <div className="space-y-3.5 max-h-56 overflow-y-auto pr-1">
                      {activeCategoryModal.items.length > 0 ? (
                        activeCategoryModal.items.map((item, idx) => (
                          <div key={idx} className="flex justify-between items-center text-sm font-bold py-1.5 border-b border-dashed border-gray-100 last:border-0 hover:bg-purple-50/20 px-1 rounded-sm">
                            <span className="text-gray-700">{item.name}</span>
                            <span className="text-[#4f3370] font-mono">{item.price}</span>
                          </div>
                        ))
                      ) : (
                        <p className="text-gray-400 text-sm font-semibold italic text-center py-4">
                          New sweet varieties and traditional savory packets are served fresh daily. Contact us to order your choice!
                        </p>
                      )}
                    </div>

                    {/* Direct WhatsApp Call-to-Action */}
                    <div className="mt-8 flex flex-col gap-3">
                      <a
                        href={`https://wa.me/919944416643?text=${encodeURIComponent(`Hello Mahesh Bakery! I am interested in ordering some fresh items from your ${activeCategoryModal.title} collection.`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-[#25D366] hover:bg-[#20ba5a] text-white py-4 px-6 rounded-2xl font-bold flex items-center justify-center gap-2 transition-colors shadow-lg hover:shadow-[#25D366]/20 text-base"
                      >
                        <svg className="w-5.5 h-5.5 fill-current" viewBox="0 0 24 24">
                          <path d="M12.042 2C6.556 2 2.084 6.446 2.084 11.911c0 1.739.459 3.447 1.331 4.953L2.184 21.331l5.421-1.421c1.455.788 3.092 1.207 4.76 1.207h.004c5.486 0 9.958-4.446 9.958-9.911C22.327 6.446 17.855 2 12.042 2zm0 18.327h-.004c-1.493 0-2.957-.403-4.225-1.168l-2.494.654.666-2.433-.156-.251c-.833-1.343-1.272-2.885-1.272-4.464 0-4.63 3.794-8.411 8.458-8.411 2.269 0 4.387.877 5.986 2.469 1.597 1.589 2.475 3.697 2.475 5.948 0 4.63-3.794 8.411-8.458 8.411zM15.215 15.65c-.276-.138-1.631-.805-1.884-.897-.254-.093-.438-.138-.622.138-.184.276-.712.897-.873 1.081-.161.184-.323.207-.599.069-.276-.138-1.164-.429-2.217-1.371-.82-.73-1.372-1.632-1.533-1.908-.161-.276-.017-.426.121-.564.125-.123.276-.321.414-.483.138-.161.184-.276.276-.46.092-.184.046-.345-.023-.483-.069-.138-.622-1.507-.852-2.062-.224-.537-.453-.464-.622-.472-.161-.009-.345-.009-.529-.009s-.483.069-.735.345c-.253.276-.966.943-.966 2.301 0 1.357.989 2.668 1.127 2.852.138.184 1.944 2.971 4.706 4.168.657.283 1.171.452 1.572.583.662.21 1.265.18 1.741.11.531-.079 1.631-.667 1.861-1.311.23-.644.23-1.196.161-1.311-.069-.115-.253-.184-.529-.322z" />
                        </svg>
                        <span>Order on WhatsApp</span>
                      </a>
                      <button
                        onClick={() => setActiveCategoryModal(null)}
                        className="text-gray-400 hover:text-gray-600 py-2.5 text-xs font-bold uppercase tracking-wider"
                      >
                        Close Menu
                      </button>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>


        </motion.div>
      )}
    </AnimatePresence>
  );
}
