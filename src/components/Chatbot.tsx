import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, X, Send, Sparkles, Loader2, Award, Cake, MapPin } from 'lucide-react';

interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

// ============================================================
// COMPLETE PREDEFINED KNOWLEDGE BASE — NO API KEYS NEEDED
// ============================================================

// All menu items from the website
const MENU_KNOWLEDGE = [
  // Biscuits
  { name: 'Subari biscuit (nila shape)', price: 100, priceText: '₹100 / 250g', category: 'Biscuits' },
  { name: 'Horlicks biscuit', price: 100, priceText: '₹100 / 250g', category: 'Biscuits' },
  { name: 'Boost biscuit', price: 100, priceText: '₹100 / 250g', category: 'Biscuits' },
  { name: 'Pista biscuit', price: 100, priceText: '₹100 / 250g', category: 'Biscuits' },
  { name: 'Milk cashew cookies', price: 100, priceText: '₹100 / 250g', category: 'Biscuits' },
  { name: 'Coconut fruit biscuit', price: 100, priceText: '₹100 / 250g', category: 'Biscuits' },
  { name: 'Masala biscuit', price: 100, priceText: '₹100 / 250g', category: 'Biscuits' },
  { name: 'Coconut badam biscuit', price: 100, priceText: '₹100 / 250g', category: 'Biscuits' },
  { name: 'Oma biscuit', price: 100, priceText: '₹100 / 250g', category: 'Biscuits' },
  { name: 'Cream biscuit', price: 120, priceText: '₹120 / 250g', category: 'Biscuits' },
  { name: 'Coconut ellu biscuit', price: 100, priceText: '₹100 / 250g', category: 'Biscuits' },
  { name: 'Coconut ball', price: 100, priceText: '₹100 / 250g', category: 'Biscuits' },
  { name: 'Salt biscuit', price: 100, priceText: '₹100 / 250g', category: 'Biscuits' },

  // Puffs
  { name: 'Veg puff', price: 15, priceText: '₹15 / pc', category: 'Puffs' },
  { name: 'Egg puff', price: 20, priceText: '₹20 / pc', category: 'Puffs' },
  { name: 'Mushroom puff', price: 25, priceText: '₹25 / pc', category: 'Puffs' },
  { name: 'Paneer puff', price: 25, priceText: '₹25 / pc', category: 'Puffs' },
  { name: 'Samosa', price: 15, priceText: '₹15 / pc', category: 'Puffs' },
  { name: 'Chicken puff', price: 35, priceText: '₹35 / pc', category: 'Puffs' },
  { name: 'Egg roll', price: 30, priceText: '₹30 / pc', category: 'Puffs' },
  { name: 'Chicken roll', price: 40, priceText: '₹40 / pc', category: 'Puffs' },
  { name: 'Dhilpasand', price: 50, priceText: '₹50 / pc', category: 'Puffs' },

  // Breads
  { name: 'Bread Small', price: 35, priceText: '₹35 / loaf', category: 'Bread' },
  { name: 'Family Bread', price: 70, priceText: '₹70 / loaf', category: 'Bread' },
  { name: 'Wheat Bread', price: 40, priceText: '₹40 / loaf', category: 'Bread' },

  // Cakes
  { name: 'Milk Pudding Cake', price: 460, priceText: '₹460 / kg', category: 'Cakes' },
  { name: 'Rich Plum Cake', price: 440, priceText: '₹440 / kg', category: 'Cakes' },
  { name: 'Italian Cake', price: 850, priceText: '₹850 / kg', category: 'Cakes' },
  { name: 'Black Forest Cake', price: 650, priceText: '₹650 / kg', category: 'Cakes' },
  { name: 'Premium Black Forest Cake', price: 900, priceText: '₹900 / kg', category: 'Cakes' },
  { name: 'White Forest Cake', price: 650, priceText: '₹650 / kg', category: 'Cakes' },
  { name: 'Premium White Forest Cake', price: 900, priceText: '₹900 / kg', category: 'Cakes' },
  { name: 'Red Velvet Cake', price: 900, priceText: '₹900 / kg', category: 'Cakes' },
  { name: 'Almond Torte', price: 50, priceText: '₹50 / pc', category: 'Cakes' },
  { name: 'Chocolate Dessert', price: 40, priceText: '₹40 / pc', category: 'Cakes' },
  { name: 'Donut', price: 40, priceText: '₹40 / pc', category: 'Cakes' },
  { name: 'Dream Cake', price: 1200, priceText: '₹1200 / box', category: 'Cakes' },
  { name: 'Mousse Cake', price: 900, priceText: '₹900 / kg', category: 'Cakes' },
  { name: 'Rainbow Cake', price: 900, priceText: '₹900 / kg', category: 'Cakes' },
  { name: 'Butter scotch fantasy', price: 900, priceText: '₹900 / kg', category: 'Cakes' },
  { name: 'Blueberry Cake', price: 900, priceText: '₹900 / kg', category: 'Cakes' },
  { name: 'Strawberry Cake', price: 900, priceText: '₹900 / kg', category: 'Cakes' },
  { name: 'Pineapple Cake', price: 900, priceText: '₹900 / kg', category: 'Cakes' },
  { name: 'Chocolate truffles', price: 800, priceText: '₹800 / kg', category: 'Cakes' },
  { name: 'White vancho', price: 1000, priceText: '₹1000 / kg', category: 'Cakes' },
  { name: 'Lotus biscoff', price: 1200, priceText: '₹1200 / kg', category: 'Cakes' },
  { name: 'Kitkat with gems', price: 1500, priceText: '₹1500 / kg', category: 'Cakes' },
  { name: 'Kunfa pistachio', price: 1500, priceText: '₹1500 / kg', category: 'Cakes' },

  // Special items
  { name: 'Dubai Kunafa', price: 70, priceText: '₹70', category: 'Specials' },
  { name: 'Creamy Badam Milk', price: 25, priceText: '₹25', category: 'Specials' },
];

// Our Own Make cakes
const OWN_MAKE_KNOWLEDGE = [
  { name: 'Strawberry Velvet Drip Cake', pricePerKg: 750 },
  { name: 'Rich Chocolate Rose Symphony', pricePerKg: 850 },
  { name: 'Classic Butterscotch Crunch', pricePerKg: 700 },
  { name: 'Pink Princess Blossom Delight', pricePerKg: 800 },
  { name: 'Vanilla Blueberry Ripple Celebration', pricePerKg: 750 },
  { name: 'White Forest Cherry Harmony', pricePerKg: 780 },
  { name: 'Chocolate KitKat Fudge Castle', pricePerKg: 950 },
  { name: 'Fairy Pink Rosebud Cream Cake', pricePerKg: 800 },
  { name: 'Premium Pineapple Sunshine Swirl', pricePerKg: 700 },
  { name: 'Decadent Dark Chocolate Truffle', pricePerKg: 900 },
  { name: 'Heavenly Vanilla Milky Drip', pricePerKg: 720 },
  { name: 'Rose-Gulkand Fusion Splendor', pricePerKg: 850 },
  { name: 'Mocha Cappuccino Bliss', pricePerKg: 800 },
  { name: 'Sweet Cotton-Candy Pastel Crown', pricePerKg: 780 },
  { name: 'Rasamalai Almond Infusion Royal', pricePerKg: 1000 },
  { name: 'Oreo Fudge & Whipped Harmony', pricePerKg: 800 },
  { name: 'Pink Rose Ribbon Anniversary Special', pricePerKg: 900 },
  { name: 'Elegant Pink Floral Cascade Celebration', pricePerKg: 820 },
  { name: 'Golden Butterscotch Ribbon Royal', pricePerKg: 760 },
  { name: 'Triple Chocolate Truffle Galaxy', pricePerKg: 920 },
  { name: 'Premium Fruit & Nut Overload Gateau', pricePerKg: 880 },
  { name: 'Red Velvet White Chocolate Pearl', pricePerKg: 850 },
];

// Custom Cake Builder pricing
const CAKE_BUILDER_PRICING = [
  { size: 'Half Kg (500g)', price: 599 },
  { size: '1 Kg (1000g)', price: 999 },
  { size: '2 Kg (2000g)', price: 1899 },
  { size: '3 Kg (3000g)', price: 2799 },
];

// Toppings
const TOPPINGS = [
  { name: 'Choco Chips', price: 60 },
  { name: 'Fruits', price: 120 },
  { name: 'Nuts', price: 90 },
  { name: 'Candles', price: 40 },
  { name: 'Macarons', price: 180 },
  { name: 'Sprinkles', price: 50 },
  { name: 'Photo Cake', price: 199 },
];

// Smart response generator — fully offline, no API needed
function generateSmartResponse(query: string): string {
  const q = query.toLowerCase().trim();

  // --- Search for specific item by name ---
  const allItems = [
    ...MENU_KNOWLEDGE.map(i => ({ name: i.name, price: i.price, priceText: i.priceText, category: i.category })),
    ...OWN_MAKE_KNOWLEDGE.map(i => ({ name: i.name, price: i.pricePerKg, priceText: `₹${i.pricePerKg} / kg`, category: 'Our Own Make Cakes' })),
  ];

  // Try to find a specific item match
  const matchedItems = allItems.filter(item => {
    const itemWords = item.name.toLowerCase().split(/\s+/);
    return itemWords.some(word => word.length > 2 && q.includes(word)) ||
           q.includes(item.name.toLowerCase());
  });

  // If exactly matching a specific product
  if (matchedItems.length === 1) {
    const item = matchedItems[0];
    return `🎂 **${item.name}**\n\n• **Price**: ${item.priceText}\n• **Category**: ${item.category}\n\nWould you like to order this? You can add it to your cart from the Menu page or use our Cake Builder for custom cakes! 🛒`;
  }

  // If multiple items matched (e.g., "chocolate" matches many)
  if (matchedItems.length > 1 && matchedItems.length <= 8) {
    let response = `🔍 I found **${matchedItems.length} items** matching your search:\n\n`;
    matchedItems.forEach(item => {
      response += `• **${item.name}** — ${item.priceText}\n`;
    });
    response += `\nYou can browse all items in our **Menu** page! Ask me about any specific item for details. 😊`;
    return response;
  }

  if (matchedItems.length > 8) {
    const shown = matchedItems.slice(0, 8);
    let response = `🔍 I found **${matchedItems.length} items** matching your search! Here are some:\n\n`;
    shown.forEach(item => {
      response += `• **${item.name}** — ${item.priceText}\n`;
    });
    response += `\n...and ${matchedItems.length - 8} more! Check our **Menu** page for the full list. 🎂`;
    return response;
  }

  // --- Dubai Kunafa ---
  if (q.includes('kunafa') || q.includes('kunaffa') || q.includes('dubai')) {
    return "🍫 **Dubai Kunafa** — Extra rich, authentic, crispy, sweet and delicious!\n\n• **Price**: **₹70** per pack 🎂\n\nWould you like to try our special recipe? Drop by our store or order today!";
  }

  // --- Badam Milk ---
  if (q.includes('badam') || (q.includes('milk') && !q.includes('pudding'))) {
    return "🥛 **Creamy Badam Milk** — Baked almonds cooked with authentic milk and rich saffron!\n\n• **Price**: **₹25** only 🌟\n\nExtremely healthy, refreshing, and served perfectly chilled. Visit our shop or place an order!";
  }

  // --- Biscuit category ---
  if (q.includes('biscuit') || q.includes('biscuits') || q.includes('cookie') || q.includes('cookies')) {
    const biscuits = MENU_KNOWLEDGE.filter(i => i.category === 'Biscuits');
    let response = "🍪 **Our Biscuit Collection** (All 250g packs):\n\n";
    biscuits.forEach(b => {
      response += `• **${b.name}** — ${b.priceText}\n`;
    });
    response += "\nAll baked fresh daily with premium ingredients! Order from the **Menu** page. 😋";
    return response;
  }

  // --- Puffs category ---
  if (q.includes('puff') || q.includes('puffs') || q.includes('samosa') || q.includes('roll')) {
    const puffs = MENU_KNOWLEDGE.filter(i => i.category === 'Puffs');
    let response = "🥟 **Our Puffs & Snacks**:\n\n";
    puffs.forEach(p => {
      response += `• **${p.name}** — ${p.priceText}\n`;
    });
    response += "\nAll made hot and crispy! Available at our store daily. 🔥";
    return response;
  }

  // --- Bread category ---
  if (q.includes('bread') || q.includes('loaf')) {
    const breads = MENU_KNOWLEDGE.filter(i => i.category === 'Bread');
    let response = "🍞 **Our Breads** (Baked Fresh Daily):\n\n";
    breads.forEach(b => {
      response += `• **${b.name}** — ${b.priceText}\n`;
    });
    response += "\nSoft, fresh, and perfect for every meal! 🥖";
    return response;
  }

  // --- Cake category ---
  if (q.includes('cake') || q.includes('cakes')) {
    const cakes = MENU_KNOWLEDGE.filter(i => i.category === 'Cakes');
    let response = "🎂 **Our Cake Collection**:\n\n";
    cakes.forEach(c => {
      response += `• **${c.name}** — ${c.priceText}\n`;
    });
    response += "\n✨ We also have **22+ premium Our Own Make custom cakes** starting from ₹700/kg! Check the **Cake Builder** for custom designs.";
    return response;
  }

  // --- Price / cost inquiries ---
  if (q.includes('price') || q.includes('rate') || q.includes('cost') || q.includes('how much') || q.includes('amount') || q.includes('rupees') || q.includes('rs') || q.includes('valai') || q.includes('evvalavu') || q.includes('enna vilai')) {
    return "💰 **Mahesh Bakery Price Guide**:\n\n" +
      "🍪 **Biscuits**: ₹100 – ₹120 (250g packs)\n" +
      "🥟 **Puffs**: ₹15 – ₹50 per piece\n" +
      "🍞 **Bread**: ₹35 – ₹70 per loaf\n" +
      "🎂 **Cakes**: ₹40 – ₹1500 per kg/pc\n" +
      "🍫 **Dubai Kunafa**: ₹70\n" +
      "🥛 **Badam Milk**: ₹25\n\n" +
      "**Custom Cake Builder Sizes**:\n" +
      "• Half Kg: ₹599\n" +
      "• 1 Kg: ₹999\n" +
      "• 2 Kg: ₹1899\n" +
      "• 3 Kg: ₹2799\n\n" +
      "Ask me about any specific item for its exact price! 😊";
  }

  // --- Toppings ---
  if (q.includes('topping') || q.includes('add-on') || q.includes('add on') || q.includes('sprinkle') || q.includes('chips') || q.includes('nuts') || q.includes('macaron') || q.includes('candle') || q.includes('photo cake') || q.includes('flavor') || q.includes('flavour')) {
    return "✨ **Premium Toppings & Add-ons**:\n\n" +
      "• 🍬 Rainbow Sprinkles: +₹50\n" +
      "• 🍫 Choco Chips: +₹60\n" +
      "• 🥜 Pure Nuts: +₹90\n" +
      "• 🍓 Fresh Fruits: +₹120\n" +
      "• 🧁 Sweet Macarons: +₹180\n" +
      "• 🕯️ Celebration Candles: +₹40\n" +
      "• 📸 **Photo Cake**: Add your custom picture for a flat +₹199!\n\n" +
      "Customize these interactively in our **Cake Builder** tab! 🎨";
  }

  // --- Location / Address ---
  if (q.includes('address') || q.includes('location') || q.includes('where') || q.includes('place') || q.includes('shop') || q.includes('store') || q.includes('panruti') || q.includes('cuddalore') || q.includes('enga') || q.includes('kadai')) {
    return "📍 **Mahesh Bakery — Main Store Address**:\n\n" +
      "No.5b, 2, Cuddalore Main Rd (directly opposite Main Bus Stand), Ulunthampattu, Panruti, Tamil Nadu — 607106.\n\n" +
      "🏢 We proudly have **500+ stores across India**!\n\n" +
      "Feel free to visit us or order online here anytime! 🎂";
  }

  // --- Contact ---
  if (q.includes('phone') || q.includes('whatsapp') || q.includes('contact') || q.includes('number') || q.includes('call') || q.includes('mobile') || q.includes('support') || q.includes('email') || q.includes('reach')) {
    return "📞 **Contact Mahesh Bakery**:\n\n" +
      "• **Phone / WhatsApp**: +91 99444 16643\n" +
      "• **Email**: hello@maheshbakery.in\n\n" +
      "You can also use 'Order via WhatsApp' button in our Cake Builder to send your cake details directly! 💬";
  }

  // --- Working hours / timings ---
  if (q.includes('hour') || q.includes('timing') || q.includes('time') || q.includes('open') || q.includes('close') || q.includes('morning') || q.includes('night') || q.includes('mani') || q.includes('neeram')) {
    return "⏰ **Business Hours**:\n\n" +
      "Mahesh Bakery is open **daily from morning until 10:30 PM**.\n\n" +
      "For custom cake orders, schedule delivery date & time directly in our **Cake Builder**! 📅";
  }

  // --- How to order / cake builder ---
  if (q.includes('builder') || q.includes('custom') || q.includes('design') || q.includes('how to') || q.includes('order') || q.includes('buy') || q.includes('cart') || q.includes('checkout') || q.includes('vaanga') || q.includes('vanga')) {
    return "✨ **How to Order Your Custom Cake**:\n\n" +
      "1️⃣ Click the **Cake Builder** tab in the navigation\n" +
      "2️⃣ Pick your desired cake size (Half kg to 3kg)\n" +
      "3️⃣ Add custom Name & Age details (free!)\n" +
      "4️⃣ Upload a photo for Photo Cake option (+₹199)\n" +
      "5️⃣ Select premium toppings & set delivery Date/Time\n" +
      "6️⃣ Tap **Add to Cart** or **Order on WhatsApp**!\n\n" +
      "It's that simple! 🎂🛒";
  }

  // --- Offers / deals ---
  if (q.includes('offer') || q.includes('discount') || q.includes('deal') || q.includes('combo') || q.includes('special') || q.includes('promotion')) {
    return "🎉 **Mahesh Bakery Special Offers**:\n\n" +
      "• 🍫 **Dubai Kunafa** — Just ₹70! Limited special item\n" +
      "• 🥛 **Creamy Badam Milk** — Only ₹25! Healthy & refreshing\n" +
      "• 🎂 **Custom Cake Builder** — Free name & age customization on any cake!\n" +
      "• 📸 **Photo Cake** — Get your photo printed on cake for just ₹199 extra!\n" +
      "• 🍰 **Our Own Make Cakes** — 22+ premium handcrafted designs starting from ₹700/kg\n\n" +
      "All cakes are baked fresh on the day of delivery using 100% premium ingredients! 🌟";
  }

  // --- Outlets / branches ---
  if (q.includes('outlet') || q.includes('branch') || q.includes('how many') || q.includes('franchise') || q.includes('india')) {
    return "🏢 **Mahesh Bakery — King of Bakery World** has **over 500+ stores across India**!\n\n" +
      "Our primary flagship outlet is beautifully located opposite the Panruti Main Bus Stand in Tamil Nadu.\n\n" +
      "All our outlets maintain the highest quality standards. Visit us! 🎂";
  }

  // --- Menu / all items ---
  if (q.includes('menu') || q.includes('item') || q.includes('items') || q.includes('what do you have') || q.includes('what you have') || q.includes('yenna iruku') || q.includes('enna iruku') || q.includes('products') || q.includes('list')) {
    return "📋 **Mahesh Bakery Complete Menu**:\n\n" +
      "🍪 **Biscuits** (13 varieties) — ₹100–₹120 / 250g\n" +
      "🥟 **Puffs & Snacks** (9 types) — ₹15–₹50 / pc\n" +
      "🍞 **Breads** (3 types) — ₹35–₹70 / loaf\n" +
      "🎂 **Cakes** (18+ types) — ₹30–₹1500 / kg or pc\n" +
      "🌟 **Our Own Make Cakes** (22+ premium) — ₹700–₹1000 / kg\n" +
      "🍫 **Dubai Kunafa** — ₹70\n" +
      "🥛 **Badam Milk** — ₹25\n\n" +
      "Explore our full menu in the **Menu** tab! Ask me about any specific item. 😋";
  }

  // --- Greetings ---
  if (q.includes('hi') || q.includes('hello') || q.includes('hey') || q.includes('vanakkam') || q.includes('how are you') || q.includes('help') || q.includes('yo') || q.includes('hii') || q.includes('helo') || q === 'hola' || q === 'sup') {
    return "Hello! Welcome to **Mahesh Bakery** 🎂✨ (King of Bakery World!)\n\n" +
      "Sweet celebrations begin here! I can help you with:\n\n" +
      "• 🎂 **Cake Sizes & Prices**\n" +
      "• 🍪 **Biscuits, Puffs & Bread prices**\n" +
      "• 🍓 **Toppings & Photo Cake options**\n" +
      "• 📍 **Store Address & Contact**\n" +
      "• ⏰ **Working Hours**\n" +
      "• 🎉 **Offers & Specials**\n" +
      "• 🛒 **How to Order**\n\n" +
      "Just type any item name to get its price! How can I help you? 😊";
  }

  // --- Thanks ---
  if (q.includes('thanks') || q.includes('thank you') || q.includes('nanri') || q.includes('nandri') || q.includes('romba') || q.includes('super') || q.includes('awesome') || q.includes('great') || q.includes('nice')) {
    return "Thank you so much! 💖 We're happy to help!\n\nIf you have any more questions about our cakes, prices, or menu items, feel free to ask anytime! 🎂\n\n— Team Mahesh Bakery 🌟";
  }

  // --- Who are you ---
  if (q.includes('who are you') || q.includes('your name') || q.includes('what are you') || q.includes('nee yaar') || q.includes('yaru nee')) {
    return "👋 I'm **Mahesh Assistant** — the official AI chatbot for **Mahesh Bakery** (King of Bakery World)! 🎂\n\n" +
      "I know everything about our bakery — all items, prices, offers, store details, and how to order.\n\n" +
      "Ask me anything! I'm here to help sweeten your day! 😊✨";
  }

  // --- Delivery ---
  if (q.includes('delivery') || q.includes('deliver') || q.includes('ship') || q.includes('shipping') || q.includes('home delivery')) {
    return "🚚 **Delivery Information**:\n\n" +
      "• You can schedule your cake delivery **date & time** directly in our **Cake Builder**!\n" +
      "• For instant orders, use our **Order via WhatsApp** button to send details to our bakers.\n" +
      "• Contact us at **+91 99444 16643** for delivery queries.\n\n" +
      "All cakes are baked fresh on the exact day of delivery! 🎂";
  }

  // --- Default / fallback ---
  return "🎂 **Welcome to Mahesh Bakery** (King of Bakery World)!\n\n" +
    "I can help you with anything about our bakery! Here's what I know:\n\n" +
    "• 📋 Type **\"menu\"** to see all our products\n" +
    "• 💰 Type **\"price\"** for our complete price list\n" +
    "• 🎂 Type any item name (e.g., \"black forest\", \"samosa\", \"donut\")\n" +
    "• 📍 Type **\"address\"** for store location\n" +
    "• 📞 Type **\"contact\"** for phone/WhatsApp\n" +
    "• 🎉 Type **\"offers\"** for special deals\n" +
    "• ⏰ Type **\"timing\"** for working hours\n\n" +
    "How can I help you today? 😊";
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content: "Hello! Welcome to Mahesh Bakery. 🎂 How can I help you sweeten your day? Ask me about our cake sizes, custom toppings, store location, or how to order your custom photo cake!"
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // States for horizontal dragging/scrolling on desktop
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const quickPrompts = [
    { label: "📋 Full Menu", prompt: "Show me the full menu" },
    { label: "🍫 Dubai Kunafa price", prompt: "What is the price of Dubai Kunafa?" },
    { label: "🥛 Badam Milk price", prompt: "How much is Badam Milk?" },
    { label: "🎂 Cake prices", prompt: "What are your cake sizes and their prices?" },
    { label: "📍 Store location", prompt: "Where is your store located?" },
    { label: "🍓 Custom toppings", prompt: "What toppings can I add to my cake?" },
    { label: "⏰ Store timings", prompt: "What are your working hours?" },
    { label: "🎉 Offers", prompt: "What offers do you have?" }
  ];

  const handleDragStart = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const handleDragMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.5; // multiplier
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleSend = async (textToSend?: string) => {
    const text = textToSend || input.trim();
    if (!text) return;

    if (!textToSend) {
      setInput('');
    }

    const userMessage: ChatMessage = { role: 'user', content: text };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setIsLoading(true);

    // Simulate a tiny delay for natural feel (no API call needed!)
    await new Promise(resolve => setTimeout(resolve, 400 + Math.random() * 400));

    const responseText = generateSmartResponse(text);
    setMessages(prev => [...prev, { role: 'assistant', content: responseText }]);
    setIsLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isLoading) {
      handleSend();
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <motion.button
        id="chatbot-fab"
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-white rounded-full shadow-[0_10px_30px_rgba(79,51,112,0.35)] hover:scale-110 active:scale-95 transition-all duration-200 flex items-center justify-center cursor-pointer group border-2 border-[#4f3370] overflow-visible"
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.2 }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <div className="bg-[#4f3370] text-white w-full h-full rounded-full flex items-center justify-center">
              <X key="close" className="w-6 h-6" />
            </div>
          ) : (
            <div className="relative w-full h-full rounded-full flex items-center justify-center">
              <img 
                src="https://ik.imagekit.io/exmpcpadx/image.png" 
                alt="Mahesh Assistant" 
                className="w-full h-full object-cover rounded-full" 
                referrerPolicy="no-referrer"
              />
              {/* Online Green dot status & Notification effect */}
              <span className="absolute -bottom-0.5 -right-0.5 flex h-4 w-4 bg-[#4f3370] rounded-full border border-white items-center justify-center">
                <span className="animate-ping absolute inline-flex h-2.5 w-2.5 rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400"></span>
              </span>
            </div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat Window Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="chatbot-panel"
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed bottom-24 right-6 z-50 w-[95%] sm:w-[420px] h-[550px] bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(79,51,112,0.18)] border border-gray-100 flex flex-col overflow-hidden font-sans"
          >
            {/* Header */}
            <div className="bg-[#4f3370] px-6 py-5 text-white flex items-center justify-between shadow-md">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center border border-white/20 relative overflow-hidden">
                  <img 
                    src="https://ik.imagekit.io/exmpcpadx/image.png" 
                    alt="Mahesh Assistant Logo" 
                    className="w-full h-full object-cover rounded-full" 
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 rounded-full border-2 border-white" />
                </div>
                <div>
                  <h3 className="font-bold text-lg leading-none flex items-center gap-1.5">
                    Mahesh Assistant
                    <Sparkles className="w-3.5 h-3.5 text-[#d8b4fe] animate-pulse" />
                  </h3>
                  <span className="text-xs text-white/70 font-medium font-mono">Always online • No API needed</span>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="hover:bg-white/10 p-1.5 rounded-full transition-colors text-white/80 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Messages Body */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-[#fcfbfe] scroll-smooth">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-[1.5rem] px-4.5 py-3 text-sm font-medium leading-relaxed shadow-sm ${
                      msg.role === 'user'
                        ? 'bg-[#4f3370] text-white rounded-br-none'
                        : 'bg-white text-[#2c1b40] border border-gray-100 rounded-bl-none'
                    }`}
                    style={{ whiteSpace: 'pre-line' }}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}

              {/* Loader */}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white border border-gray-100 rounded-[1.5rem] rounded-bl-none px-4.5 py-3 shadow-sm flex items-center gap-2">
                    <Loader2 className="w-4 h-4 text-[#4f3370] animate-spin" />
                    <span className="text-xs text-gray-400 font-bold tracking-wider uppercase">Baking reply...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Suggestion Chips */}
            <div 
              ref={scrollRef}
              onMouseDown={handleDragStart}
              onMouseLeave={handleDragEnd}
              onMouseUp={handleDragEnd}
              onMouseMove={handleDragMove}
              className="px-5 py-3.5 bg-[#fdfdfd] border-t border-gray-100 flex gap-2.5 overflow-x-auto custom-scrollbar-horizontal shrink-0 scroll-smooth select-none cursor-grab active:cursor-grabbing"
              style={{ scrollbarWidth: 'thin' }}
            >
              {quickPrompts.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    // Prevent trigger if user was dragging
                    if (!isDragging && !isLoading) {
                      handleSend(p.prompt);
                    }
                  }}
                  disabled={isLoading}
                  className="bg-white border border-gray-150 hover:border-[#4f3370]/40 hover:bg-[#ede9f2]/30 text-[#4f3370] text-xs font-bold px-4 py-2 rounded-full transition-all whitespace-nowrap shadow-xs shrink-0 cursor-pointer disabled:opacity-50 disabled:pointer-events-none select-none transition-transform duration-100 active:scale-95"
                >
                  {p.label}
                </button>
              ))}
            </div>

            {/* Input Footer Form */}
            <div className="p-4 bg-white border-t border-gray-100 flex items-center gap-2.5">
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Ask about any item, price, or offer..."
                disabled={isLoading}
                className="flex-1 bg-[#fbfbfe] px-5 py-3.5 rounded-2xl border border-gray-200 focus:outline-none focus:ring-4 focus:ring-[#4f3370]/10 focus:border-[#4f3370] text-sm text-[#2c1b40] font-medium placeholder-gray-400 max-h-12 disabled:opacity-70"
              />
              <button
                onClick={() => handleSend()}
                disabled={isLoading || !input.trim()}
                className="bg-[#4f3370] text-white p-3.5 rounded-2xl shadow-md hover:bg-[#3d2757] hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center shrink-0 cursor-pointer disabled:bg-gray-100 disabled:text-gray-400 disabled:shadow-none disabled:translate-y-0 disabled:cursor-not-allowed"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
