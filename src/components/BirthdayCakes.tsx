import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  Clock, 
  Truck, 
  ShieldCheck, 
  Cake as CakeIcon, 
  ArrowRight, 
  Check, 
  Calendar, 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  AlertCircle, 
  X, 
  Heart,
  ChevronRight,
  Info
} from 'lucide-react';
import { MENU_ITEMS, MenuItem } from './Menu';
import { CartItem } from '../types';
import { safeStorage } from '../utils/storage';
import { getFastDeliverySettings, FastDeliverySettings, DeliverySlot } from '../utils/deliverySettings';
import { db } from '../firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';

interface BirthdayCakesProps {
  isAuthenticated: boolean;
  user: any;
  onAddToCart?: (item: CartItem) => void;
  onViewCart?: () => void;
  onRequiresAuth?: () => void;
  onNavigateHome?: () => void;
}

// 9 Birthday Cake products specified in requirement
const BIRTHDAY_CAKE_SPECS = [
  {
    targetName: 'Black Forest',
    menuId: 'cake-4',
    basePrice: 650,
    tag: 'Bestseller 🌟',
    badge: 'Popular Choice',
  },
  {
    targetName: 'White Forest',
    menuId: 'cake-white-forest',
    basePrice: 650,
    tag: 'Classic Vanilla 🤍',
    badge: 'Delicate Delight',
  },
  {
    targetName: 'Red Velvet',
    menuId: 'cake-5',
    basePrice: 900,
    tag: 'Celebration Favorite ❤️',
    badge: 'Rich Cream Cheese',
  },
  {
    targetName: 'Rainbow',
    menuId: 'cake-rainbow',
    basePrice: 900,
    tag: 'Kids & Festive 🌈',
    badge: 'Vibrant Layers',
  },
  {
    targetName: 'Chocolate Truffles',
    menuId: 'cake-chocolate-truffles',
    basePrice: 900,
    tag: 'Pure Chocolate Ganache 🍫',
    badge: 'Chocoholic Dream',
  },
  {
    targetName: 'Premium Black Forest',
    menuId: 'cake-4-premium',
    basePrice: 900,
    tag: 'Belgian Shavings 🍒',
    badge: 'Luxury Edition',
  },
  {
    targetName: 'Premium White Forest',
    menuId: 'cake-white-forest-premium',
    basePrice: 900,
    tag: 'Swiss White Curls 🎂',
    badge: 'Premium Royal',
  },
  {
    targetName: 'Blueberry',
    menuId: 'cake-blueberry',
    basePrice: 800,
    tag: 'Fresh Fruity Burst 🫐',
    badge: 'Fruit Compote',
  },
  {
    targetName: 'Butterscotch',
    menuId: 'cake-butterscotch',
    basePrice: 800,
    tag: 'Crunchy Praline 🍯',
    badge: 'Caramel Crunch',
  },
];

// Configurable weight multiplier
const WEIGHT_CONFIG = [
  { key: '0.5', label: '½ KG', multiplier: 0.5, serves: '2-4 People' },
  { key: '1', label: '1 KG', multiplier: 1.0, serves: '6-8 People (Standard)' },
  { key: '2', label: '2 KG', multiplier: 2.0, serves: '12-16 People (Party)' },
];

const FLAVOUR_OPTIONS = [
  'Original / Signature Recipe',
  'Rich Dark Belgian Chocolate',
  'Swiss Madagascar Vanilla',
  'Fresh Strawberry Layering',
  'Crunchy Butterscotch Praline',
];

export default function BirthdayCakes({
  isAuthenticated,
  user,
  onAddToCart,
  onViewCart,
  onRequiresAuth,
  onNavigateHome,
}: BirthdayCakesProps) {
  // Configurable delivery settings
  const [deliverySettings, setDeliverySettings] = useState<FastDeliverySettings>(getFastDeliverySettings());

  // Listen for admin changes
  useEffect(() => {
    const handleUpdate = () => {
      setDeliverySettings(getFastDeliverySettings());
    };
    window.addEventListener('mahesh_delivery_settings_updated', handleUpdate);
    return () => window.removeEventListener('mahesh_delivery_settings_updated', handleUpdate);
  }, []);

  // Map requested cakes from MENU_ITEMS
  const birthdayCakes = useMemo(() => {
    return BIRTHDAY_CAKE_SPECS.map((spec) => {
      // Find matching item from MENU_ITEMS
      const original = MENU_ITEMS.find(
        (m) =>
          m.id === spec.menuId ||
          m.name.toLowerCase().includes(spec.targetName.toLowerCase())
      );

      const halfKgPrice = Math.round(spec.basePrice * 0.5);
      return {
        id: spec.menuId,
        name: spec.targetName,
        basePrice: spec.basePrice,
        halfKgPrice,
        priceText: `₹${halfKgPrice} / ½ kg`,
        image:
          original?.image ||
          'https://ik.imagekit.io/0boxn146f/ChatGPT%20Image%20May%2023,%202026,%2012_30_49%20PM.png',
        description:
          original?.description ||
          'Freshly baked artisan birthday cake prepared with pure ingredients and utmost care.',
        tag: spec.tag,
        badge: spec.badge,
        category: 'Cakes',
      };
    });
  }, []);

  // Modal / Customization State
  const [selectedCake, setSelectedCake] = useState<typeof birthdayCakes[0] | null>(null);
  
  // Customization Form Fields
  const [selectedWeight, setSelectedWeight] = useState<string>('1');
  const [selectedFlavour, setSelectedFlavour] = useState<string>(FLAVOUR_OPTIONS[0]);
  const [occasion, setOccasion] = useState<'birthday' | 'anniversary'>('birthday');
  const [personName, setPersonName] = useState<string>('');
  const [personAgeOrYr, setPersonAgeOrYr] = useState<string>('');
  const [cakeMessage, setCakeMessage] = useState<string>('');
  
  // Delivery Schedule Fields
  const [deliveryDate, setDeliveryDate] = useState<string>(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });
  const [deliverySlotId, setDeliverySlotId] = useState<string>('slot-morning');

  // Sender Details
  const [senderName, setSenderName] = useState<string>(user?.name || '');
  const [senderMobile, setSenderMobile] = useState<string>(user?.phone || '');

  // Receiver Details
  const [receiverName, setReceiverName] = useState<string>('');
  const [receiverMobile, setReceiverMobile] = useState<string>('');
  const [address, setAddress] = useState<string>('');

  // UI Flow & Notification States
  const [formError, setFormError] = useState<string | null>(null);
  const [orderSuccess, setOrderSuccess] = useState<any | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Price Calculation Logic (Configurable)
  const currentWeightObj = useMemo(() => {
    return WEIGHT_CONFIG.find((w) => w.key === selectedWeight) || WEIGHT_CONFIG[1];
  }, [selectedWeight]);

  const calculatedCakePrice = useMemo(() => {
    if (!selectedCake) return 0;
    return Math.round(selectedCake.basePrice * currentWeightObj.multiplier);
  }, [selectedCake, currentWeightObj]);

  const selectedSlot = useMemo(() => {
    return deliverySettings.slots.find((s) => s.id === deliverySlotId) || deliverySettings.slots[0];
  }, [deliverySettings.slots, deliverySlotId]);

  const activeDeliveryCharge = useMemo(() => {
    let charge = deliverySettings.deliveryCharge;
    if (selectedSlot?.isExpress && deliverySettings.expressSurcharge) {
      charge += deliverySettings.expressSurcharge;
    }
    return charge;
  }, [deliverySettings, selectedSlot]);

  const finalTotalAmount = useMemo(() => {
    return calculatedCakePrice + activeDeliveryCharge;
  }, [calculatedCakePrice, activeDeliveryCharge]);

  const isSlotUnavailable = useMemo(() => {
    return selectedSlot && !selectedSlot.isAvailable;
  }, [selectedSlot]);

  // Open modal
  const handleOpenCustomization = (cake: typeof birthdayCakes[0]) => {
    setSelectedCake(cake);
    // Keep selectedWeight if already set by chip click, otherwise default to ½ kg
    if (!selectedCake) setSelectedWeight('0.5');
    setSelectedFlavour(FLAVOUR_OPTIONS[0]);
    setOccasion('birthday');
    setPersonName('');
    setPersonAgeOrYr('');
    setCakeMessage('');
    setFormError(null);
  };

  // Close modal
  const handleCloseModal = () => {
    setSelectedCake(null);
    setFormError(null);
  };

  // Form Validation
  const validateForm = (): boolean => {
    if (!selectedCake) return false;

    if (!personName.trim()) {
      setFormError(occasion === 'birthday' ? "Please enter Birthday Person's Name." : "Please enter Couple / Anniversary Name(s).");
      return false;
    }
    if (!deliveryDate) {
      setFormError("Please choose the Preferred Delivery Date.");
      return false;
    }
    if (isSlotUnavailable) {
      setFormError("Selected delivery time slot is unavailable. Please select another slot.");
      return false;
    }
    if (!senderName.trim()) {
      setFormError("Please enter Sender Name.");
      return false;
    }
    if (!senderMobile.trim() || senderMobile.replace(/\D/g, '').length < 10) {
      setFormError("Please enter a valid 10-digit Sender Phone number.");
      return false;
    }
    if (!receiverName.trim()) {
      setFormError("Please enter Receiver Name.");
      return false;
    }
    if (!receiverMobile.trim() || receiverMobile.replace(/\D/g, '').length < 10) {
      setFormError("Please enter a valid 10-digit Receiver Phone number.");
      return false;
    }
    if (!address.trim()) {
      setFormError("Please enter the complete Delivery Address.");
      return false;
    }

    setFormError(null);
    return true;
  };

  // Handle Order Submit (WhatsApp Direct)
  const handleProcessOrder = async (isWhatsAppOnly: boolean = true) => {
    if (!validateForm() || !selectedCake) return;

    setIsSubmitting(true);
    const orderId = `BDAY-FAST-${Date.now().toString().slice(-6)}`;
    const fullAddress = address.trim();

    const orderPayload = {
      id: orderId,
      date: new Date().toLocaleDateString(),
      orderType: occasion === 'birthday' ? 'Birthday Cake Fast Delivery' : 'Anniversary Cake Fast Delivery',
      cakeName: selectedCake.name,
      cakeWeight: currentWeightObj.label,
      flavour: selectedFlavour,
      occasion: occasion === 'birthday' ? 'Happy Birthday' : 'Happy Anniversary',
      personName: personName.trim(),
      personAgeOrYr: personAgeOrYr.trim(),
      cakeMessage: cakeMessage.trim() || (occasion === 'birthday' ? 'Happy Birthday!' : 'Happy Anniversary!'),
      deliveryDate,
      deliveryTime: `${selectedSlot.name} (${selectedSlot.timeWindow})`,
      
      // Sender Details
      sender: {
        name: senderName.trim(),
        mobile: senderMobile.trim(),
      },

      // Receiver Details
      receiver: {
        name: receiverName.trim(),
        mobile: receiverMobile.trim(),
        address: fullAddress,
      },

      // Pricing Details
      pricing: {
        cakePrice: calculatedCakePrice,
        deliveryCharge: activeDeliveryCharge,
        finalTotal: finalTotalAmount,
      },

      status: 'Accepted',
      paymentMethod: 'Cash on Fast Delivery',
    };

    // Save to localStorage global store for Admin Dashboard
    try {
      const globalOrders = JSON.parse(safeStorage.getItem('mahesh_bakery_global_orders') || '[]');
      const formattedForAdmin = {
        id: orderId,
        date: new Date().toLocaleDateString(),
        status: 'Accepted',
        customerName: `${senderName.trim()} (Sender) ➔ ${receiverName.trim()} (Receiver)`,
        customerEmail: user?.email || 'Guest',
        customerPhone: `Sender: ${senderMobile} | Receiver: ${receiverMobile}`,
        customerAddress: fullAddress,
        paymentMethod: 'Cash on Fast Delivery',
        items: [
          {
            name: `${selectedCake.name} (${occasion === 'birthday' ? 'Birthday' : 'Anniversary'})`,
            quantity: 1,
            sizeLabel: `${currentWeightObj.label} • ${selectedFlavour}`,
            message: cakeMessage.trim(),
            grandTotal: finalTotalAmount,
            image: selectedCake.image,
            category: 'Cakes',
          },
        ],
      };
      globalOrders.unshift(formattedForAdmin);
      safeStorage.setItem('mahesh_bakery_global_orders', JSON.stringify(globalOrders));

      // If user is logged in, also record in their order history
      if (user?.email) {
        const userOrdersKey = `mahesh_bakery_orders_${user.email}`;
        const userOrders = JSON.parse(safeStorage.getItem(userOrdersKey) || '[]');
        userOrders.unshift(formattedForAdmin);
        safeStorage.setItem(userOrdersKey, JSON.stringify(userOrders));
      }

      // Firestore Database Sync (in background, non-blocking so popup blocker is never triggered)
      try {
        addDoc(collection(db, 'orders'), {
          ...formattedForAdmin,
          isBirthdayFastDelivery: true,
          occasion,
          personName: personName.trim(),
          personAgeOrYr: personAgeOrYr.trim(),
          deliverySlot: selectedSlot.timeWindow,
          deliveryCharge: activeDeliveryCharge,
          cakePrice: calculatedCakePrice,
          createdAt: Timestamp.now(),
        }).catch((fErr) => {
          console.warn('Firestore optional sync skipped or failed:', fErr);
        });
      } catch (fErr) {
        console.warn('Firestore optional sync skipped or failed:', fErr);
      }
    } catch (err) {
      console.error('Order saving error:', err);
    }

    // Format WhatsApp message
    const waText = 
`🎂 *MAHESH BAKERY – FAST DELIVERY ORDER* ⚡
━━━━━━━━━━━━━━━━━━━━
🆔 *Order ID:* ${orderId}

🍰 *Cake Selection:*
• *Item:* ${selectedCake.name}
• *Weight (kg):* ${currentWeightObj.label}
• *Flavour:* ${selectedFlavour}

🎉 *Occasion & Personalization:*
• *Occasion:* ${occasion === 'birthday' ? 'Happy Birthday 🎂' : 'Happy Anniversary 💑'}
• *${occasion === 'birthday' ? 'Birthday Person' : 'Anniversary Couple'}:* ${personName.trim()}
${personAgeOrYr ? `• *${occasion === 'birthday' ? 'Happy Birthday Age' : 'Anniversary Year'}:* ${personAgeOrYr.trim()}\n` : ''}• *Message on Cake:* "${cakeMessage.trim() || (occasion === 'birthday' ? 'Happy Birthday!' : 'Happy Anniversary!')}"

📅 *Delivery Details:*
• *Date:* ${deliveryDate}
• *Slot:* ${selectedSlot.name} (${selectedSlot.timeWindow})

👤 *Sender Details:*
• *Name:* ${senderName.trim()}
• *Phone:* ${senderMobile.trim()}

🎁 *Receiver Details:*
• *Name:* ${receiverName.trim()}
• *Phone:* ${receiverMobile.trim()}
• *Delivery Address:* ${fullAddress}

💰 *Bill Breakdown:*
• Cake Price: ₹${calculatedCakePrice}
• Fast Delivery Charge: ₹${activeDeliveryCharge}
------------------------------------
*Total Amount Payable:* ₹${finalTotalAmount} (Cash on Delivery)
━━━━━━━━━━━━━━━━━━━━
Thank you for choosing Mahesh Bakery! 🎉`;

    const whatsappNumber = '919944416643';
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(waText)}`;

    setIsSubmitting(false);
    setSelectedCake(null);
    setOrderSuccess({ ...orderPayload, whatsappUrl });

    // Open WhatsApp immediately with all order details (with fallback if popup blocked)
    try {
      const openedWin = window.open(whatsappUrl, '_blank');
      if (!openedWin || openedWin.closed || typeof openedWin.closed === 'undefined') {
        window.location.href = whatsappUrl;
      }
    } catch (e) {
      window.location.href = whatsappUrl;
    }
  };

  return (
    <div className="min-h-screen bg-[#fcfbfe] text-[#2c1b40] font-sans pb-24">
      {/* 1. Birthday Cake Promotional Banner Poster - Full Screen Width */}
      <section className="w-full overflow-hidden p-0 m-0 leading-none">
        <img
          src="https://ik.imagekit.io/du3lqlqsw/Today_s%20Fast%20Delivery%20Cake%20Promotion.png"
          alt="Today's Fast Delivery Birthday Cake Promotion - Mahesh Bakery"
          className="w-full h-auto block"
          loading="eager"
        />
      </section>

      {/* Auto-scrolling Row / Marquee Ticker */}
      <div className="w-full bg-[#27103a] text-white py-3 overflow-hidden border-y border-purple-900/40 relative shadow-sm select-none">
        <div className="animate-marquee-scroll flex items-center whitespace-nowrap gap-8 text-xs sm:text-sm font-bold tracking-wide">
          {[...Array(2)].map((_, loopIdx) => (
            <div key={loopIdx} className="flex items-center gap-8 shrink-0">
              <span className="flex items-center gap-2 text-amber-300">
                <Truck className="w-4 h-4 text-amber-300 animate-bounce" />
                <span>⚡ Fast Delivery Available in Panruti</span>
              </span>
              <span className="text-purple-400">•</span>
              <span className="flex items-center gap-2 text-rose-200">
                <CakeIcon className="w-4 h-4 text-rose-300" />
                <span>🎂 100% Freshly Baked on Order</span>
              </span>
              <span className="text-purple-400">•</span>
              <span className="flex items-center gap-2 text-emerald-300">
                <Sparkles className="w-4 h-4 text-emerald-300" />
                <span>🎉 Birthday & Anniversary Celebration Specials</span>
              </span>
              <span className="text-purple-400">•</span>
              <span className="flex items-center gap-2 text-sky-300">
                <Clock className="w-4 h-4 text-sky-300" />
                <span>🚚 Super Express 2-Hour Delivery Slots</span>
              </span>
              <span className="text-purple-400">•</span>
              <span className="flex items-center gap-2 text-pink-300">
                <Heart className="w-4 h-4 text-pink-300" />
                <span>🎁 Free Custom Message Piped on Cake</span>
              </span>
              <span className="text-purple-400">•</span>
              <span className="flex items-center gap-2 text-amber-200">
                <Phone className="w-4 h-4 text-amber-300" />
                <span>📞 Call / WhatsApp: +91 99444 16643</span>
              </span>
              <span className="text-purple-400">•</span>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Birthday Cake Products Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 border-b border-gray-100 pb-6">
          <div>
            <div className="flex items-center gap-2 text-[#4f3370] font-bold text-sm uppercase tracking-wider mb-1">
              <CakeIcon className="w-4 h-4" />
              <span>Signature Menu Collection</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-serif font-black text-[#2c1b40]">
              Celebrate Every Birthday with Mahesh Bakery
            </h2>
            <p className="text-[#4f3370] font-bold text-sm sm:text-base mt-1">
              Freshly Made Birthday Cakes with Fast Delivery
            </p>
          </div>
          <p className="text-gray-500 text-xs sm:text-sm max-w-md font-medium">
            Select your favorite cake below to customize weight (½ KG, 1 KG, 2 KG), personalized messages, and schedule fast delivery.
          </p>
        </div>

        {/* 9 Birthday Cake Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {birthdayCakes.map((cake, index) => (
            <motion.div
              key={cake.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05, duration: 0.4 }}
              className="bg-white rounded-3xl overflow-hidden shadow-[0_10px_35px_rgba(79,51,112,0.06)] border border-purple-50/60 hover:shadow-[0_20px_45px_rgba(79,51,112,0.12)] transition-all flex flex-col group"
            >
              {/* Cake Image Box */}
              <div className="relative aspect-[4/3] bg-gradient-to-br from-purple-50 to-pink-50 overflow-hidden flex items-center justify-center p-4">
                <img
                  src={cake.image}
                  alt={cake.name}
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />

                {/* Badge Tag */}
                <div className="absolute top-4 left-4">
                  <span className="bg-white/95 backdrop-blur-md text-[#4f3370] text-xs font-black px-3 py-1.5 rounded-full shadow-sm border border-purple-100/50">
                    {cake.tag}
                  </span>
                </div>

                <div className="absolute top-4 right-4">
                  <span className="bg-[#4f3370] text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow-sm">
                    {cake.badge}
                  </span>
                </div>
              </div>

              {/* Cake Info */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-baseline justify-between gap-2 mb-2">
                    <h3 className="text-xl font-bold font-serif text-[#2c1b40] group-hover:text-[#4f3370] transition-colors">
                      {cake.name}
                    </h3>
                    <div className="text-right shrink-0">
                      <span className="text-2xl font-black text-[#4f3370]">₹{cake.halfKgPrice}</span>
                      <span className="text-xs font-semibold text-gray-400 block">starts at ½ KG</span>
                    </div>
                  </div>

                  <p className="text-gray-500 text-sm line-clamp-2 mb-4 leading-relaxed">
                    {cake.description}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="pt-4 border-t border-gray-100 flex items-center gap-3">
                  <button
                    onClick={() => handleOpenCustomization(cake)}
                    className="flex-1 bg-[#4f3370] hover:bg-[#3d2757] text-white py-3.5 px-4 rounded-2xl font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 group-hover:translate-x-0.5"
                  >
                    <span>Order Now</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 3. Cake Customization & Order Form Modal */}
      <AnimatePresence>
        {selectedCake && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ duration: 0.25 }}
              className="bg-white w-full max-w-3xl rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col max-h-[92vh] border border-purple-50 my-auto"
            >
              {/* Modal Header */}
              <div className="bg-gradient-to-r from-[#4f3370] to-[#2c1b40] text-white p-6 sm:p-8 flex items-center justify-between shrink-0 relative">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-white/10 border border-white/20 p-1.5 shrink-0 overflow-hidden">
                    <img
                      src={selectedCake.image}
                      alt={selectedCake.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div>
                    <span className="text-rose-200 text-xs font-bold uppercase tracking-wider">
                      Customize Your Birthday Cake
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-serif font-black text-white">
                      {selectedCake.name}
                    </h3>
                  </div>
                </div>

                <button
                  onClick={handleCloseModal}
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body / Scrollable Form */}
              <div className="p-6 sm:p-8 overflow-y-auto space-y-8 flex-1">
                {/* Error Banner */}
                {formError && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-sm flex items-center gap-3 font-medium"
                  >
                    <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
                    <span>{formError}</span>
                  </motion.div>
                )}

                {/* Section A: Weight Selection (Dynamic Price) */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-sm font-bold text-[#2c1b40] uppercase tracking-wider flex items-center gap-2">
                      <CakeIcon className="w-4 h-4 text-[#4f3370]" />
                      <span>Select Cake Weight</span>
                    </label>
                    <span className="text-xs font-bold text-[#4f3370] bg-purple-50 px-2.5 py-1 rounded-full">
                      Base Price: ₹{selectedCake.basePrice} (1 KG)
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    {WEIGHT_CONFIG.map((weight) => {
                      const isSelected = selectedWeight === weight.key;
                      const weightPrice = Math.round(selectedCake.basePrice * weight.multiplier);
                      return (
                        <button
                          key={weight.key}
                          type="button"
                          onClick={() => setSelectedWeight(weight.key)}
                          className={`p-4 rounded-2xl border-2 text-left transition-all relative flex flex-col justify-between ${
                            isSelected
                              ? 'border-[#4f3370] bg-purple-50/60 shadow-md ring-2 ring-[#4f3370]/10'
                              : 'border-gray-200 hover:border-gray-300 bg-white'
                          }`}
                        >
                          {isSelected && (
                            <span className="absolute top-2.5 right-2.5 w-5 h-5 rounded-full bg-[#4f3370] text-white flex items-center justify-center text-[10px]">
                              <Check className="w-3 h-3 stroke-[3]" />
                            </span>
                          )}
                          <div>
                            <span className="font-serif font-black text-lg block text-[#2c1b40]">
                              {weight.label}
                            </span>
                            <span className="text-[11px] text-gray-500 font-medium block">
                              {weight.serves}
                            </span>
                          </div>
                          <span className="text-base font-black text-[#4f3370] mt-3 block">
                            ₹{weightPrice}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Section B: Flavour & Occasion Customization */}
                <div className="space-y-4">
                  {/* Flavour selection */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                      Cake Flavour *
                    </label>
                    <select
                      value={selectedFlavour}
                      onChange={(e) => setSelectedFlavour(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 font-medium text-sm text-[#2c1b40] bg-white focus:outline-none focus:border-[#4f3370]"
                    >
                      {FLAVOUR_OPTIONS.map((f, i) => (
                        <option key={i} value={f}>
                          {f}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Occasion Selection: Happy Birthday or Anniversary */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                      Select Occasion: Happy Birthday or Anniversary? *
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => {
                          setOccasion('birthday');
                          setCakeMessage('');
                        }}
                        className={`py-3 px-4 rounded-xl border-2 font-bold text-sm transition-all flex items-center justify-center gap-2 ${
                          occasion === 'birthday'
                            ? 'border-[#4f3370] bg-purple-50 text-[#4f3370] shadow-sm'
                            : 'border-gray-200 text-gray-600 hover:border-gray-300 bg-white'
                        }`}
                      >
                        <CakeIcon className="w-4 h-4 text-pink-500" />
                        <span>Happy Birthday 🎂</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setOccasion('anniversary');
                          setCakeMessage('');
                        }}
                        className={`py-3 px-4 rounded-xl border-2 font-bold text-sm transition-all flex items-center justify-center gap-2 ${
                          occasion === 'anniversary'
                            ? 'border-[#4f3370] bg-purple-50 text-[#4f3370] shadow-sm'
                            : 'border-gray-200 text-gray-600 hover:border-gray-300 bg-white'
                        }`}
                      >
                        <Heart className="w-4 h-4 text-rose-500" />
                        <span>Happy Anniversary 💑</span>
                      </button>
                    </div>
                  </div>

                  {/* Occasion Dynamic Fields: Birthday Person Name & Age OR Couple Names & Anniversary Yr */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                        {occasion === 'birthday' ? "Birthday Person's Name *" : "Anniversary Couple Name(s) *"}
                      </label>
                      <input
                        type="text"
                        required
                        placeholder={occasion === 'birthday' ? "e.g. Rahul / Sneha" : "e.g. Priya & Rajesh"}
                        value={personName}
                        onChange={(e) => setPersonName(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 font-medium text-sm text-[#2c1b40] focus:outline-none focus:border-[#4f3370]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                        {occasion === 'birthday' ? "Happy Birthday Age ?" : "Anniversary Yr ?"}
                      </label>
                      <input
                        type="text"
                        placeholder={occasion === 'birthday' ? "e.g. 1st, 18th, 25th" : "e.g. 1st, 5th, 10th, 25th"}
                        value={personAgeOrYr}
                        onChange={(e) => setPersonAgeOrYr(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 font-medium text-sm text-[#2c1b40] focus:outline-none focus:border-[#4f3370]"
                      />
                    </div>
                  </div>

                  {/* Message on cake */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                      Message on Cake (Piped on Top)
                    </label>
                    <input
                      type="text"
                      maxLength={45}
                      placeholder={occasion === 'birthday' ? "e.g. Happy 25th Birthday Rahul! 🎉" : "e.g. Happy 10th Anniversary Priya & Rajesh! ❤️"}
                      value={cakeMessage}
                      onChange={(e) => setCakeMessage(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 font-medium text-sm text-[#2c1b40] focus:outline-none focus:border-[#4f3370]"
                    />
                  </div>

                  {/* Preferred Delivery Date */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                      Preferred Delivery Date *
                    </label>
                    <input
                      type="date"
                      required
                      min={new Date().toISOString().split('T')[0]}
                      value={deliveryDate}
                      onChange={(e) => setDeliveryDate(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 font-medium text-sm text-[#2c1b40] focus:outline-none focus:border-[#4f3370]"
                    />
                  </div>
                </div>

                {/* Section C: Preferred Delivery Time Slot & Availability */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider">
                      Preferred Delivery Time Slot *
                    </label>
                    <span className="text-[11px] text-gray-400 font-medium">
                      Fast Delivery Guarantee
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {deliverySettings.slots.map((slot) => {
                      const isSelected = deliverySlotId === slot.id;
                      return (
                        <button
                          key={slot.id}
                          type="button"
                          onClick={() => setDeliverySlotId(slot.id)}
                          className={`p-3.5 rounded-xl border-2 text-left flex items-center justify-between transition-all ${
                            isSelected
                              ? 'border-[#4f3370] bg-purple-50/70 text-[#2c1b40]'
                              : 'border-gray-200 hover:border-gray-300 bg-white text-gray-700'
                          } ${!slot.isAvailable ? 'opacity-70 bg-gray-50' : ''}`}
                        >
                          <div>
                            <span className="font-bold text-xs block text-[#2c1b40]">
                              {slot.name}
                            </span>
                            <span className="text-[11px] text-gray-500 font-semibold">
                              {slot.timeWindow}
                            </span>
                          </div>

                          <div className="text-right">
                            {slot.isAvailable ? (
                              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                                Available
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-md">
                                Unavailable
                              </span>
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Slot Unavailable Warning */}
                  {isSlotUnavailable && (
                    <p className="mt-2 text-xs font-bold text-rose-600 flex items-center gap-1.5">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      This delivery slot is currently unavailable or booked out. Please pick another slot.
                    </p>
                  )}
                </div>

                {/* Section D: Sender Details */}
                <div className="bg-purple-50/40 p-5 rounded-2xl border border-purple-100">
                  <h4 className="font-serif font-black text-base text-[#2c1b40] mb-3 flex items-center gap-2">
                    <User className="w-4 h-4 text-[#4f3370]" />
                    <span>Sender Details</span>
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-gray-600 uppercase mb-1">
                        Sender Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Your full name"
                        value={senderName}
                        onChange={(e) => setSenderName(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-xs font-medium bg-white focus:outline-none focus:border-[#4f3370]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-gray-600 uppercase mb-1">
                        Sender Phone *
                      </label>
                      <input
                        type="tel"
                        required
                        maxLength={10}
                        placeholder="10-digit mobile number"
                        value={senderMobile}
                        onChange={(e) => setSenderMobile(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-xs font-medium bg-white focus:outline-none focus:border-[#4f3370]"
                      />
                    </div>
                  </div>
                </div>

                {/* Section E: Receiver Details (The Person Receiving The Cake) */}
                <div className="bg-rose-50/30 p-5 rounded-2xl border border-rose-100">
                  <h4 className="font-serif font-black text-base text-[#2c1b40] mb-3 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-rose-600" />
                    <span>Receiver Details (Delivery Destination)</span>
                  </h4>

                  <div className="space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-bold text-gray-600 uppercase mb-1">
                          Receiver Name *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Name of recipient"
                          value={receiverName}
                          onChange={(e) => setReceiverName(e.target.value)}
                          className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-xs font-medium bg-white focus:outline-none focus:border-[#4f3370]"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-gray-600 uppercase mb-1">
                          Receiver Mobile Number *
                        </label>
                        <input
                          type="tel"
                          required
                          maxLength={10}
                          placeholder="Recipient 10-digit phone"
                          value={receiverMobile}
                          onChange={(e) => setReceiverMobile(e.target.value)}
                          className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-xs font-medium bg-white focus:outline-none focus:border-[#4f3370]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-gray-600 uppercase mb-1">
                        Address *
                      </label>
                      <textarea
                        required
                        rows={3}
                        placeholder="Enter complete delivery address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-xs font-medium bg-white focus:outline-none focus:border-[#4f3370] resize-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Section F: Order Summary & Pricing Breakdown */}
                <div className="bg-gray-50 rounded-2xl p-5 border border-gray-200/80">
                  <h4 className="font-bold text-xs uppercase text-gray-500 tracking-wider mb-3">
                    Price Breakdown
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between text-gray-700">
                      <span>
                        Cake Price ({selectedCake.name} - {currentWeightObj.label}):
                      </span>
                      <span className="font-bold text-[#2c1b40]">₹{calculatedCakePrice}</span>
                    </div>

                    <div className="flex justify-between text-gray-700">
                      <span className="flex items-center gap-1.5">
                        <Truck className="w-3.5 h-3.5 text-[#4f3370]" />
                        <span>Birthday Fast Delivery Charge:</span>
                      </span>
                      <span className="font-bold text-[#4f3370]">₹{activeDeliveryCharge}</span>
                    </div>

                    <div className="pt-2 border-t border-gray-200 flex justify-between items-baseline text-base">
                      <span className="font-black text-[#2c1b40]">Final Order Total:</span>
                      <span className="font-black text-2xl text-[#4f3370]">
                        ₹{finalTotalAmount}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal Footer / Checkout Buttons */}
              <div className="p-5 sm:p-6 bg-gray-50 border-t border-gray-100 flex flex-col gap-2.5 shrink-0">
                <button
                  type="button"
                  disabled={isSlotUnavailable || isSubmitting}
                  onClick={() => handleProcessOrder(true)}
                  className={`w-full py-4 px-6 rounded-2xl font-bold text-base shadow-md transition-all flex items-center justify-center gap-3 ${
                    isSlotUnavailable
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-[#25D366] hover:bg-[#20bd5a] text-white hover:shadow-xl hover:-translate-y-0.5'
                  }`}
                >
                  <svg className="w-6 h-6 fill-current shrink-0" viewBox="0 0 24 24">
                    <path d="M12.042 2C6.556 2 2.084 6.446 2.084 11.911c0 1.739.459 3.447 1.331 4.953L2.184 21.331l5.421-1.421c1.455.788 3.092 1.207 4.76 1.207h.004c5.486 0 9.958-4.446 9.958-9.911C22.327 6.446 17.855 2 12.042 2zm0 18.327h-.004c-1.493 0-2.957-.403-4.225-1.168l-2.494.654.666-2.433-.156-.251c-.833-1.343-1.272-2.885-1.272-4.464 0-4.63 3.794-8.411 8.458-8.411 2.269 0 4.387.877 5.986 2.469 1.597 1.589 2.475 3.697 2.475 5.948 0 4.63-3.794 8.411-8.458 8.411zM15.215 15.65c-.276-.138-1.631-.805-1.884-.897-.254-.093-.438-.138-.622.138-.184.276-.712.897-.873 1.081-.161.184-.323.207-.599.069-.276-.138-1.164-.429-2.217-1.371-.82-.73-1.372-1.632-1.533-1.908-.161-.276-.017-.426.121-.564.125-.123.276-.321.414-.483.138-.161.184-.276.276-.46.092-.184.046-.345-.023-.483-.069-.138-.622-1.507-.852-2.062-.224-.537-.453-.464-.622-.472-.161-.009-.345-.009-.529-.009s-.483.069-.735.345c-.253.276-.966.943-.966 2.301 0 1.357.989 2.668 1.127 2.852.138.184 1.944 2.971 4.706 4.168.657.283 1.171.452 1.572.583.662.21 1.265.18 1.741.11.531-.079 1.631-.667 1.861-1.311.23-.644.23-1.196.161-1.311-.069-.115-.253-.184-.529-.322z" />
                  </svg>
                  <span>Order Now via WhatsApp • ₹{finalTotalAmount}</span>
                </button>
                <p className="text-center text-xs text-gray-500 font-medium">
                  Instant fast order via WhatsApp • No login required • Pay Cash on Delivery
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 4. Order Confirmation Success Modal */}
      <AnimatePresence>
        {orderSuccess && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl text-center border border-purple-100"
            >
              <div className="w-16 h-16 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 stroke-[3]" />
              </div>

              <span className="text-xs font-bold text-[#4f3370] uppercase tracking-wider">
                Order Accepted Successfully!
              </span>
              <h3 className="text-2xl font-serif font-black text-[#2c1b40] mt-1 mb-2">
                Birthday Delivery Confirmed 🎉
              </h3>
              <p className="text-sm text-gray-600 mb-6">
                Thank you! Your order <strong className="text-[#4f3370]">#{orderSuccess.id}</strong> has been registered with Mahesh Bakery fast delivery kitchen.
              </p>

              <div className="bg-purple-50/50 rounded-2xl p-4 text-left text-xs space-y-1.5 mb-6 border border-purple-100">
                <p><strong>Cake:</strong> {orderSuccess.cakeName} ({orderSuccess.cakeWeight})</p>
                <p><strong>{orderSuccess.occasion === 'Happy Birthday' ? 'Birthday Person' : 'Anniversary Couple'}:</strong> {orderSuccess.personName}</p>
                <p><strong>Recipient:</strong> {orderSuccess.receiver.name} ({orderSuccess.receiver.mobile})</p>
                <p><strong>Delivery Address:</strong> {orderSuccess.receiver.address}</p>
                <p><strong>Slot:</strong> {orderSuccess.deliveryTime}</p>
                <p><strong>Total Amount:</strong> ₹{orderSuccess.pricing.finalTotal} (COD)</p>
              </div>

              <div className="space-y-3">
                <a
                  href={orderSuccess.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition-all"
                >
                  <span>Open Details in WhatsApp</span>
                </a>

                <button
                  onClick={() => setOrderSuccess(null)}
                  className="w-full bg-[#4f3370] hover:bg-[#3d2757] text-white py-3 rounded-xl font-bold text-sm transition-colors"
                >
                  Done / Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
