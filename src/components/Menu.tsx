import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Heart, ShoppingBag, Check, MessageSquare, ArrowRight, ExternalLink } from 'lucide-react';
import { CartItem } from '../types';
import { safeStorage } from '../utils/storage';

export interface MenuItem {
  id: string;
  name: string;
  price: number;
  priceText: string;
  category: string;
  image: string;
  description: string;
  isPopular?: boolean;
  tag?: string;
}

const MENU_ITEMS: MenuItem[] = [
  // Biscuits
  {
    id: 'bisc-1',
    name: 'Subari biscuit (nila shape)',
    price: 100,
    priceText: '₹100 / 250g',
    category: 'Biscuits',
    image: 'https://ik.imagekit.io/du3lqlqsw/WhatsApp%20Image%202026-06-11%20at%202.02.46%20PM.jpeg',
    description: 'Crispy Subari biscuits baked in a distinctive nila shape.',
  },
  {
    id: 'bisc-3',
    name: 'Horlicks biscuit',
    price: 100,
    priceText: '₹100 / 250g',
    category: 'Biscuits',
    image: 'https://ik.imagekit.io/du3lqlqsw/WhatsApp%20Image%202026-06-11%20at%202.03.26%20PM.jpeg',
    description: 'Malty, wholesome biscuits infused with the classic Horlicks flavor.',
  },
  {
    id: 'bisc-4',
    name: 'Boost biscuit',
    price: 100,
    priceText: '₹100 / 250g',
    category: 'Biscuits',
    image: 'https://ik.imagekit.io/du3lqlqsw/WhatsApp%20Image%202026-06-11%20at%202.01.22%20PM.jpeg',
    description: 'Energy-packed biscuits baked with the rich chocolatey flavor of Boost.',
  },
  {
    id: 'bisc-7',
    name: 'Pista biscuit',
    price: 100,
    priceText: '₹100 / 250g',
    category: 'Biscuits',
    image: 'https://ik.imagekit.io/du3lqlqsw/WhatsApp%20Image%202026-06-11%20at%201.59.59%20PM.jpeg',
    description: 'Delicious biscuits packed with premium crushed pistachios.',
  },
  {
    id: 'bisc-8',
    name: 'Milk cashew cookies',
    price: 100,
    priceText: '₹100 / 250g',
    category: 'Biscuits',
    image: 'https://ik.imagekit.io/du3lqlqsw/WhatsApp%20Image%202026-06-11%20at%202.02.21%20PM%20(1).jpeg',
    description: 'Rich milky biscuits mixed with crunchy premium cashews.',
  },
  {
    id: 'bisc-12',
    name: 'Coconut fruit biscuit',
    price: 100,
    priceText: '₹100 / 250g',
    category: 'Biscuits',
    image: 'https://ik.imagekit.io/du3lqlqsw/WhatsApp%20Image%202026-06-11%20at%201.59.28%20PM.jpeg',
    description: 'Scrumptious biscuits containing toasted coconut and bits of mixed fruits.',
  },
  {
    id: 'bisc-14',
    name: 'Masala biscuit',
    price: 100,
    priceText: '₹100 / 250g',
    category: 'Biscuits',
    image: 'https://ik.imagekit.io/du3lqlqsw/WhatsApp%20Image%202026-06-11%20at%202.01.01%20PM.jpeg',
    description: 'Crispy savoury biscuits packed with local spices and curry leaf bits.',
  },
  {
    id: 'bisc-15',
    name: 'Coconut badam biscuit',
    price: 100,
    priceText: '₹100 / 250g',
    category: 'Biscuits',
    image: 'https://ik.imagekit.io/du3lqlqsw/WhatsApp%20Image%202026-06-11%20at%202.00.37%20PM.jpeg',
    description: 'A rich fusion of roasted coconut and crunchy badam (almonds) in a single biscuit.',
  },
  {
    id: 'bisc-16',
    name: 'Oma biscuit',
    price: 100,
    priceText: '₹100 / 250g',
    category: 'Biscuits',
    image: 'https://ik.imagekit.io/du3lqlqsw/WhatsApp%20Image%202026-06-11%20at%201.58.45%20PM.jpeg',
    description: 'Healthy and digestive savoury biscuits flavored with ajwain (omam) seeds.',
  },
  {
    id: 'bisc-19',
    name: 'Cream biscuit',
    price: 120,
    priceText: '₹120 / 250g',
    category: 'Biscuits',
    image: 'https://ik.imagekit.io/du3lqlqsw/WhatsApp%20Image%202026-06-11%20at%202.05.56%20PM.jpeg',
    description: 'Rich, melt-in-your-mouth biscuits layered with a sweet and silky cream filling.',
  },
  {
    id: 'bisc-20',
    name: 'Coconut ellu biscuit',
    price: 100,
    priceText: '₹100 / 250g',
    category: 'Biscuits',
    image: 'https://ik.imagekit.io/du3lqlqsw/WhatsApp%20Image%202026-06-11%20at%202.05.26%20PM.jpeg',
    description: 'Crispy biscuits filled with toasted sesame seeds (ellu) and aromatic coconut.',
  },
  {
    id: 'bisc-21',
    name: 'Coconut ball',
    price: 100,
    priceText: '₹100 / 250g',
    category: 'Biscuits',
    image: 'https://ik.imagekit.io/du3lqlqsw/WhatsApp%20Image%202026-06-11%20at%202.04.44%20PM%20(1).jpeg',
    description: 'Sweet, delicious, and scrumptious oven-baked coconut balls.',
  },
  {
    id: 'bisc-22',
    name: 'Salt biscuit',
    price: 100,
    priceText: '₹100 / 250g',
    category: 'Biscuits',
    image: 'https://ik.imagekit.io/du3lqlqsw/WhatsApp%20Image%202026-06-11%20at%202.03.46%20PM%20(1).jpeg',
    description: 'Crispy, buttery biscuits with a light touch of salt for the perfect tea-time snack.',
  },

  // Puffs
  {
    id: 'puff-1',
    name: 'Veg puff',
    price: 15,
    priceText: '₹15 / pc',
    category: 'Puffs',
    image: 'https://ik.imagekit.io/0boxn146f/b01f25f4-dd53-47bb-b855-3bad9dec2b7b.png',
    description: 'Crispy, flaky and multi-layered golden puff pastry loaded with aromatic spicy vegetable filling.',
  },
  {
    id: 'puff-2',
    name: 'Egg puff',
    price: 20,
    priceText: '₹20 / pc',
    category: 'Puffs',
    image: 'https://ik.imagekit.io/0boxn146f/ce30e865-a1f9-4e3e-b9fc-fbc5fe201c50.png',
    description: 'Oven fresh flaky puff containing boiled egg wrapped in spicy onion masala.',
  },
  {
    id: 'puff-3',
    name: 'Mushroom puff',
    price: 25,
    priceText: '₹25 / pc',
    category: 'Puffs',
    image: 'https://ik.imagekit.io/0boxn146f/2398a46a-fd06-490a-a1db-e26e75434892.png',
    description: 'Flaky puff stuffed with delicious sautéed mushroom and spices.',
  },
  {
    id: 'puff-4',
    name: 'Paneer puff',
    price: 25,
    priceText: '₹25 / pc',
    category: 'Puffs',
    image: 'https://ik.imagekit.io/0boxn146f/d7c3b015-79ab-4f10-961d-bd33a2b4aa08.png?updatedAt=1779555236080',
    description: 'Tasty golden pastry with soft cottage cheese (paneer) and masala.',
  },
  {
    id: 'puff-5',
    name: 'Samosa',
    price: 15,
    priceText: '₹15 / pc',
    category: 'Puffs',
    image: 'https://ik.imagekit.io/8d1iue1vn/d4b38e91-e4d0-407c-b6a1-88a105ac3285.png',
    description: 'Crispy and spiced potato and pea filled samosas.',
  },
  {
    id: 'puff-6',
    name: 'Chicken puff',
    price: 35,
    priceText: '₹35 / pc',
    category: 'Puffs',
    image: 'https://ik.imagekit.io/8d1iue1vn/da97cfeb-dae2-4a94-9398-a8f2ca0507e5.png',
    description: 'Seasoned chicken chunks inside multi-layered crispy golden puffs.',
  },
  {
    id: 'puff-7',
    name: 'Egg roll',
    price: 30,
    priceText: '₹30 / pc',
    category: 'Puffs',
    image: 'https://ik.imagekit.io/0boxn146f/1df0a439-c92c-4cda-83d4-6a04f2ba94e3.png',
    description: 'Delicious roll packed with eggs and spicy veggies.',
  },
  {
    id: 'puff-8',
    name: 'Chicken roll',
    price: 40,
    priceText: '₹40 / pc',
    category: 'Puffs',
    image: 'https://ik.imagekit.io/8d1iue1vn/da97cfeb-dae2-4a94-9398-a8f2ca0507e5.png',
    description: 'Spicy and savory chicken stuffed inside a tightly wrapped fresh roll.',
  },
  {
    id: 'puff-9',
    name: 'Dhilpasand',
    price: 50,
    priceText: '₹50 / pc',
    category: 'Puffs',
    image: 'https://ik.imagekit.io/du3lqlqsw/WhatsApp%20Image%202026-06-11%20at%202.04.19%20PM.jpeg',
    description: 'Crispy flaky sweet puff pastry containing a delicious filling of sweetened grated coconut, dried fruits, and colourful tutti-frutti.',
  },

  // Breads
  {
    id: 'bread-1',
    name: 'Bread Small',
    price: 35,
    priceText: '₹35 / loaf',
    category: 'Bread',
    image: 'https://ik.imagekit.io/0boxn146f/photo-1598373182133-52452f7691ef.avif',
    description: 'Pillowy and cloud-soft small white sandwich bread loaf, baked fresh daily.',
    isPopular: true,
    tag: 'Daily Fresh'
  },
  {
    id: 'bread-2',
    name: 'Family Bread',
    price: 70,
    priceText: '₹70 / loaf',
    category: 'Bread',
    image: 'https://ik.imagekit.io/0boxn146f/e741fe9e-285b-44f5-a352-56a034d96f0f.png',
    description: 'Freshly baked family sized extra soft white sandwich bread loaf, perfect for sharing.',
    tag: 'Family Pack'
  },
  {
    id: 'bread-3',
    name: 'Wheat Bread',
    price: 40,
    priceText: '₹40 / loaf',
    category: 'Bread',
    image: 'https://ik.imagekit.io/72dmudtmj/20230728144103-md-100-whole-wheat-bread-11-1-of-1-scaled_1024x.webp',
    description: 'Nutritious whole wheat bread rich in fiber. Healthy, delicious and hearty.',
    tag: 'Healthy'
  },

  // Cakes
  {
    id: 'cake-1',
    name: 'Milk Pudding Cake',
    price: 460,
    priceText: '₹460 / kg',
    category: 'Cakes',
    image: 'https://ik.imagekit.io/0boxn146f/WhatsApp%20Image%202026-06-11%20at%202.06.23%20PM.jpeg',
    description: 'A soft, bouncy, and ultra-creamy pudding cake made with rich milk and a delicate caramel glaze.',
    isPopular: true,
    tag: 'Soft'
  },
  {
    id: 'cake-2',
    name: 'Rich Plum Cake',
    price: 440,
    priceText: '₹440 / kg',
    category: 'Cakes',
    image: 'https://ik.imagekit.io/0boxn146f/49a92afb-cf5e-4e23-be2a-62abbe74e5e1.png',
    description: 'Traditional rich plum cake loaded with soaked dry fruits, nuts, and authentic warm spices.',
    tag: 'Classic'
  },
  {
    id: 'cake-3',
    name: 'Italian Cake',
    price: 850,
    priceText: '₹850 / kg',
    category: 'Cakes',
    image: 'https://ik.imagekit.io/0boxn146f/ff1e7c56-4bca-45ef-8fd0-b09cff8e71eb.png',
    description: 'Classic Italian style cake featuring creamy mascarpone layers, espresso notes, and cocoa dusting.',
    tag: 'Premium'
  },
  {
    id: 'cake-4',
    name: 'Black Forest Cake',
    price: 650,
    priceText: '₹650 / kg',
    category: 'Cakes',
    image: 'https://ik.imagekit.io/0boxn146f/ChatGPT%20Image%20May%2023,%202026,%2012_30_49%20PM.png',
    description: 'Dark chocolate sponge layered with whipped cream and sweet cherry fillings, topped with chocolate shavings.',
    isPopular: true,
    tag: 'Best Seller'
  },
  {
    id: 'cake-4-premium',
    name: 'Premium Black Forest Cake',
    price: 900,
    priceText: '₹900 / kg',
    category: 'Cakes',
    image: 'https://ik.imagekit.io/0boxn146f/ChatGPT%20Image%20May%2023,%202026,%2012_30_49%20PM.png?updatedAt=1779519672214',
    description: 'Premium chocolate celebration cake styled with dense imported rich sweet cherries, fresh dairy cream, and pure Belgian chocolate shavings.',
    tag: 'Premium'
  },
  {
    id: 'cake-white-forest',
    name: 'White Forest Cake',
    price: 650,
    priceText: '₹650 / kg',
    category: 'Cakes',
    image: 'https://ik.imagekit.io/0boxn146f/images%20(1).jpg',
    description: 'Fluffy vanilla sponge cake layered with sweet cherries, fresh whipped cream, and shaved white chocolate curls.',
    tag: 'Classic'
  },
  {
    id: 'cake-white-forest-premium',
    name: 'Premium White Forest Cake',
    price: 900,
    priceText: '₹900 / kg',
    category: 'Cakes',
    image: 'https://ik.imagekit.io/0boxn146f/images%20(1).jpg',
    description: 'Luxurious vanilla celebration cake loaded with premium imported red cherries, rich fresh dairy cream, and high-quality Swiss white chocolate flakes.',
    tag: 'Premium'
  },
  {
    id: 'cake-5',
    name: 'Red Velvet Cake',
    price: 900,
    priceText: '₹900 / kg',
    category: 'Cakes',
    image: 'https://ik.imagekit.io/0boxn146f/3a4d4343-bb13-4063-8d68-8dbf02b9007e.png',
    description: 'Vibrant signature red cocoa cake contrasted elegantly with smooth cream cheese frosting.',
    tag: 'Popular'
  },
  {
    id: 'cake-7',
    name: 'Almond Torte',
    price: 50,
    priceText: '₹50 / pc',
    category: 'Cakes',
    image: 'https://ik.imagekit.io/0boxn146f/fe6b0e6c-c1c6-4670-a2fe-b6be8385eaf9.jpg',
    description: 'A flourless, naturally gluten-free almond cake that is deeply nutty, rich, and topped with toasted almonds.',
    tag: 'Specialty'
  },
  {
    id: 'cake-8',
    name: 'Chocolate Dessert',
    price: 40,
    priceText: '₹40 / pc',
    category: 'Cakes',
    image: 'https://ik.imagekit.io/0boxn146f/16358239-dc60-430e-9a95-32b07da624a1.png',
    description: 'A decadent layered chilled chocolate dessert pot featuring gooey brownie chunks and hot fudge.',
    tag: 'Chilled'
  },
  {
    id: 'cake-9',
    name: 'Donut',
    price: 40,
    priceText: '₹40 / pc',
    category: 'Cakes',
    image: 'https://ik.imagekit.io/0boxn146f/df45ede1-591c-4cbe-b567-956578ce7a32.png',
    description: 'Soft, airy golden fried ring donut covered in sweet classic glaze or chocolate icing.',
    isPopular: true,
    tag: 'Snack'
  },
  {
    id: 'cake-10',
    name: 'Dream Cake',
    price: 1200,
    priceText: '₹1200 / box',
    category: 'Cakes',
    image: 'https://ik.imagekit.io/0boxn146f/64da2c62-061b-4bcb-a19f-d863435a7b93.png',
    description: 'The viral 5-in-1 torte dream cake featuring layers of moist chocolate cake, mousse, ganache, and a crack-shell top.',
    isPopular: true,
    tag: 'Trending'
  },
  {
    id: 'cake-11',
    name: 'Mousse Cake',
    price: 900,
    priceText: '₹900 / kg',
    category: 'Cakes',
    image: 'https://ik.imagekit.io/0boxn146f/7c74efea-b8bf-413b-aa0b-8073d0f29476.png',
    description: 'An incredibly light, airy and smooth chocolate mousse cake sitting on a thin, soft chocolate sponge base.',
    tag: 'Premium'
  },
  {
    id: 'cake-rainbow',
    name: 'Rainbow',
    price: 900,
    priceText: '₹900 / kg',
    category: 'Cakes',
    image: 'https://ik.imagekit.io/8d1iue1vn/edf74c09-d22f-4c46-b10f-21f6286d3109.png',
    description: 'Colorful and vibrant multi-layered rainbow cake with sweet vanilla frosting.',
    tag: 'Celebration'
  },
  {
    id: 'cake-butterscotch',
    name: 'Butter scotch fantasy',
    price: 900,
    priceText: '₹900 / kg',
    category: 'Cakes',
    image: 'https://images.unsplash.com/photo-1542826438-bd32f43d626f?w=500&auto=format&fit=crop&q=80',
    description: 'Rich butterscotch cake layered with creamy frosting and crunchy praline nuts.',
    tag: 'Classic'
  },
  {
    id: 'cake-blueberry',
    name: 'Blueberry',
    price: 900,
    priceText: '₹900 / kg',
    category: 'Cakes',
    image: 'https://ik.imagekit.io/8d1iue1vn/8970dec7-5931-44d6-95c9-801982ffbc2a.png',
    description: 'Delicious soft sponge cake packed with sweet and tangy blueberry fruit filling.',
    tag: 'Fruity'
  },
  {
    id: 'cake-strawberry',
    name: 'Strawberry',
    price: 900,
    priceText: '₹900 / kg',
    category: 'Cakes',
    image: 'https://ik.imagekit.io/8d1iue1vn/25513068-ecd8-4f35-8904-c73e08202a2f.png',
    description: 'Sweet and refreshing strawberry layered cake with light whipped strawberry cream.',
    tag: 'Fruity'
  },
  {
    id: 'cake-pineapple',
    name: 'Pineapple',
    price: 900,
    priceText: '₹900 / kg',
    category: 'Cakes',
    image: 'https://ik.imagekit.io/8d1iue1vn/2b16a101-32a9-4e2c-8f41-49a6fcaede9a.png',
    description: 'Juicy chunks of fresh pineapple mixed with smooth whipped cream on soft sponge.',
    tag: 'Fruity'
  },
  {
    id: 'cake-chocolate-truffles',
    name: 'Chocolate truffles',
    price: 800,
    priceText: '₹800 / kg',
    category: 'Cakes',
    image: 'https://ik.imagekit.io/8d1iue1vn/df125d5c-ebe3-40e0-9f5d-2466b0e57916.png',
    description: 'Dense, rich, and ultra-chocolatey truffle cake loaded with pure chocolate ganache.',
    tag: 'Premium'
  },
  {
    id: 'cake-white-vancho',
    name: 'White vancho',
    price: 1000,
    priceText: '₹1000 / kg',
    category: 'Cakes',
    image: 'https://ik.imagekit.io/8d1iue1vn/b36fcdde-5868-4518-9cff-aec5ae147ff1.png',
    description: 'A luxurious combination of white chocolate and vanilla beans wrapped in a velvety finish.',
    tag: 'Premium'
  },
  {
    id: 'cake-lotus-biscoff',
    name: 'Lotus biscoff',
    price: 1200,
    priceText: '₹1200 / kg',
    category: 'Cakes',
    image: 'https://ik.imagekit.io/8d1iue1vn/2c7249af-c3fc-476a-a82e-39566e76cbc0.png',
    description: 'Irresistible cake made with authentic Lotus Biscoff spread and topped with crushed biscuits.',
    tag: 'Trending'
  },
  {
    id: 'cake-kitkat-gems',
    name: 'Kitkat with gems',
    price: 1500,
    priceText: '₹1500 / kg',
    category: 'Cakes',
    image: 'https://ik.imagekit.io/8d1iue1vn/25d406e7-fa17-4c22-8a75-80d73de34f2a.png',
    description: 'Fun and colorful kids favorite cake surrounded by KitKat bars and filled to the brim with Gems.',
    tag: 'Kids Favorite'
  },
  {
    id: 'cake-kunfa-pistachio',
    name: 'Kunfa pistachio',
    price: 1500,
    priceText: '₹1500 / kg',
    category: 'Cakes',
    image: 'https://ik.imagekit.io/8d1iue1vn/29b5c717-ac5f-4b68-b00e-0c3dae493493.png',
    description: 'A Middle-Eastern inspired masterpiece loaded with rich pistachio flavors and crunchy Kunafa layers.',
    tag: 'Premium'
  }
];

const CATEGORIES = ['All Products', 'Biscuits', 'Puffs', 'Bread', 'Cakes'];

interface MenuProps {
  isAuthenticated: boolean;
  user?: { email: string; name: string } | null;
  onAddToCart: (item: CartItem) => void;
  onViewCart: () => void;
  onRequiresAuth: () => void;
  initialCategory?: string;
  onPageChange?: (page: string) => void;
}

export default function Menu({ isAuthenticated, user, onAddToCart, onViewCart, onRequiresAuth, initialCategory = 'All Products', onPageChange }: MenuProps) {
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  
  React.useEffect(() => {
    setActiveCategory(initialCategory);
  }, [initialCategory]);

  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('popular');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Item Order Modal State
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [cakeSize, setCakeSize] = useState<'0.5' | '1'>('1');
  const [cakeQuality, setCakeQuality] = useState<'standard' | 'premium'>('standard');
  const [itemQuantity, setItemQuantity] = useState(1);
  const [orderDetails, setOrderDetails] = useState({
    customerName: '',
    message: '',
    age: '',
    phone: '',
    address: '',
    email: ''
  });
  const [phoneError, setPhoneError] = useState('');

  const modalItemDetails = useMemo(() => {
    if (!selectedItem) return null;
    
    let name = selectedItem.name;
    let price = selectedItem.price;
    let image = selectedItem.image;
    let description = selectedItem.description;
    
    const isBF = selectedItem.id.includes('cake-4') || selectedItem.name.toLowerCase().includes('black forest');
    const isWF = selectedItem.id.includes('cake-white-forest') || selectedItem.name.toLowerCase().includes('white forest');
    
    if (isBF) {
      if (cakeQuality === 'standard') {
        name = 'Black Forest Cake';
        price = 650;
        image = 'https://ik.imagekit.io/0boxn146f/ChatGPT%20Image%20May%2023,%202026,%2012_30_49%20PM.png';
        description = 'Dark chocolate sponge layered with whipped cream and sweet cherry fillings, topped with chocolate shavings.';
      } else {
        name = 'Premium Black Forest Cake';
        price = 900;
        image = 'https://ik.imagekit.io/0boxn146f/ChatGPT%20Image%20May%2023,%202026,%2012_30_49%20PM.png?updatedAt=1779519672214';
        description = 'Premium chocolate celebration cake styled with dense imported rich sweet cherries, fresh dairy cream, and pure Belgian chocolate shavings.';
      }
    } else if (isWF) {
      if (cakeQuality === 'standard') {
        name = 'White Forest Cake';
        price = 650;
        image = 'https://ik.imagekit.io/0boxn146f/images%20(1).jpg';
        description = 'Fluffy vanilla sponge cake layered with sweet cherries, fresh whipped cream, and shaved white chocolate curls.';
      } else {
        name = 'Premium White Forest Cake';
        price = 900;
        image = 'https://ik.imagekit.io/0boxn146f/images%20(1).jpg';
        description = 'Luxurious vanilla celebration cake loaded with premium imported red cherries, rich fresh dairy cream, and high-quality Swiss white chocolate flakes.';
      }
    }
    
    return { name, price, image, description, isBF, isWF, hasQualityChoice: isBF || isWF };
  }, [selectedItem, cakeQuality]);

  // Get storage key
  const wishlistKey = user?.email 
    ? `mahesh_bakery_wishlist_${user.email.toLowerCase()}` 
    : 'mahesh_bakery_wishlist_guest';

  // Load wishlist on mount & when key changes
  React.useEffect(() => {
    try {
      const saved = safeStorage.getItem(wishlistKey);
      if (saved) {
        const parsed: any[] = JSON.parse(saved);
        setFavorites(parsed.map(item => item.id));
      } else {
        setFavorites([]);
      }
    } catch (e) {
      console.error(e);
    }
  }, [wishlistKey]);

  // Toggle Favorite Action
  const toggleFavorite = (id: string) => {
    let currentWishlist: any[] = [];
    try {
      const saved = safeStorage.getItem(wishlistKey);
      if (saved) {
        currentWishlist = JSON.parse(saved);
      }
    } catch (e) {
      console.error(e);
    }

    const exists = currentWishlist.some(item => item.id === id);
    let updatedWishlist = [];
    if (exists) {
      updatedWishlist = currentWishlist.filter(item => item.id !== id);
    } else {
      const menuItem = MENU_ITEMS.find(item => item.id === id);
      if (menuItem) {
        updatedWishlist = [
          ...currentWishlist,
          {
            id: menuItem.id,
            name: menuItem.name,
            price: menuItem.price,
            image: menuItem.image,
            description: menuItem.description,
            sizeLabel: menuItem.category
          }
        ];
      } else {
        updatedWishlist = currentWishlist;
      }
    }

    try {
      safeStorage.setItem(wishlistKey, JSON.stringify(updatedWishlist));
    } catch (e) {
      console.error(e);
    }
    setFavorites(updatedWishlist.map(item => item.id));
  };

  // Filter & Sort Logic
  const filteredItems = useMemo(() => {
    let items = [...MENU_ITEMS];

    // Category Filter
    if (activeCategory !== 'All Products') {
      items = items.filter(item => item.category === activeCategory);
    }

    // Search Query Filter
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      items = items.filter(item => 
        item.name.toLowerCase().includes(q) || 
        item.description.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q)
      );
    }

    // Sort Logic
    if (sortBy === 'price-asc') {
      items.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      items.sort((a, b) => b.price - a.price);
    } else {
      // Default / Popular
      items.sort((a, b) => (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0));
    }

    return items;
  }, [activeCategory, searchQuery, sortBy]);

  // Handle Add To Cart Action
  const handleItemAddToCart = (item: MenuItem) => {
    const cartItem: CartItem = {
      id: `${item.id}-${Date.now()}`,
      sizeLabel: item.name,
      sizePrice: item.price,
      name: '',
      age: '',
      message: '',
      photoUrl: item.image,
      toppings: [],
      toppingsTotal: 0,
      itemTotal: item.price,
      quantity: 1,
      date: new Date().toLocaleDateString(),
      time: 'Immediate',
      grandTotal: item.price
    };
    onAddToCart(cartItem);
    setSuccessMessage(`Added ${item.name} to your cart successfully!`);
    setTimeout(() => {
      setSuccessMessage(null);
    }, 3000);
  };

  return (
    <div className="font-sans min-h-[90vh]">
      {/* Premium Banner Image */}
      <div className="w-full bg-[#2A0E38]">
        <img 
          src="https://ik.imagekit.io/0boxn146f/ChatGPT%20Image%20May%2023,%202026,%2010_58_29%20AM.png?updatedAt=1779514132722" 
          alt="Mahesh Bakery Menu Banner" 
          className="w-full"
        />
      </div>

      <div className="py-10 md:py-16 px-4 md:px-12 max-w-7xl mx-auto">
        {/* Title section matching screenshot */}
        <div className="flex flex-col items-center text-center mb-12">
        <h1 className="text-4xl sm:text-5xl lg:text-[3.25rem] font-sans font-black tracking-tight text-[#2c1b40]">
          Our Delicious <span className="text-[#4f3370] relative inline-block">Menu<span className="absolute left-0 bottom-1 w-full h-[6px] bg-[#FFB01A]/40 -z-10 rounded-full"></span></span>
        </h1>
        <p className="text-gray-500 font-medium text-base sm:text-lg mt-4 max-w-2xl leading-relaxed">
          Crafted with the finest ingredients and baked with love to make every moment extra special.
        </p>
      </div>

      {/* Main split layout based on image provided by user */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start relative">
        
        {/* Left column: Categories Panel */}
        <div className="md:col-span-4 lg:col-span-3 bg-white rounded-[2rem] p-6 lg:p-8 shadow-[0_15px_45px_rgba(79,51,112,0.03)] border border-purple-100/50 md:sticky md:top-24">
          <h2 className="font-sans font-black text-[#2c1b40] text-xl mb-6 tracking-tight flex items-center justify-between border-b border-purple-50 pb-3">
            <span>Categories</span>
            <span className="text-xs bg-purple-50 text-[#4f3370] px-2.5 py-1 rounded-full font-bold select-none">{MENU_ITEMS.length} items</span>
          </h2>
          <div className="flex flex-row overflow-x-auto pb-3 -mx-2 md:mx-0 md:pb-0 md:flex-col gap-2.5 scrollbar-thin scrollbar-thumb-purple-100 items-center">
            {/* Quick Navigation Buttons (Only shown on Mobile inside the Categories layout) */}
            <button
              onClick={() => onPageChange && onPageChange('home')}
              className="md:hidden text-center text-xs py-3.5 px-5 rounded-2xl font-black transition-all flex items-center gap-1.5 cursor-pointer shrink-0 bg-[#fff2f2] text-[#c93b3b] hover:bg-[#ffe5e5]"
            >
              <span>🏠</span>
              <span>Home</span>
            </button>
            <button
              onClick={() => {
                setActiveCategory('All Products');
                onPageChange && onPageChange('menu');
              }}
              className="md:hidden text-center text-xs py-3.5 px-5 rounded-2xl font-black transition-all flex items-center gap-1.5 cursor-pointer shrink-0 bg-[#f5e6ff] text-[#6b319c] hover:bg-[#edd1ff]"
            >
              <span>🍰</span>
              <span>Menu</span>
            </button>
            <button
              onClick={() => onPageChange && onPageChange('about')}
              className="md:hidden text-center text-xs py-3.5 px-5 rounded-2xl font-black transition-all flex items-center gap-1.5 cursor-pointer shrink-0 bg-[#fffcf0] text-[#a17010] hover:bg-[#fff9d6]"
            >
              <span>ℹ️</span>
              <span>About</span>
            </button>

            {/* A subtle divider line in mobile view */}
            <span className="md:hidden self-center h-6 w-[2px] bg-purple-100/60 shrink-0 mx-2" />

            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`text-left text-sm py-3.5 px-5 rounded-2xl font-extrabold whitespace-nowrap transition-all flex items-center justify-between cursor-pointer group ${
                    isActive 
                      ? 'bg-gradient-to-r from-[#4f3370] to-[#6a4696] text-white shadow-md shadow-[#4f3370]/20' 
                      : 'text-[#2c1b40]/80 hover:bg-purple-50/50 hover:text-[#4f3370]'
                  }`}
                >
                  <span>{cat}</span>
                  {isActive && (
                    <motion.span layoutId="activeDot" className="w-1.5 h-1.5 bg-white rounded-full ml-3" />
                  )}
                </button>
              );
            })}
          </div>


        </div>

        {/* Right column: Search, Sort & Main Products Grid */}
        <div className="md:col-span-8 lg:col-span-9 flex flex-col gap-6">
          
          {/* Top Control Bar */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-white rounded-[1.75rem] p-4 shadow-[0_10px_35px_rgba(79,51,112,0.02)] border border-purple-50/50 w-full">
            {/* Search inputs */}
            <div className="relative w-full sm:max-w-md">
              <Search className="absolute left-4.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-400" />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search delicious treats..." 
                className="w-full pl-11 pr-5 py-3 rounded-2xl bg-[#fcfbfe] border border-gray-100 focus:outline-none focus:ring-4 focus:ring-purple-100/30 focus:border-[#4f3370] transition-all text-sm font-semibold"
              />
            </div>

            {/* Sorting selectivity */}
            <div className="flex items-center gap-2 shrink-0 max-sm:w-full">
              <span className="text-xs font-bold text-gray-450 uppercase tracking-wider hidden md:block">Sort By</span>
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 rounded-2xl bg-white border border-gray-200 text-sm font-bold text-gray-700 focus:outline-none focus:ring-4 focus:ring-purple-100/30 font-sans cursor-pointer max-sm:w-full"
              >
                <option value="popular">Popularity</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Product Items Grid */}
          {filteredItems.length === 0 ? (
            <div className="bg-white rounded-[2.5rem] p-16 text-center shadow-[0_15px_40px_rgba(79,51,112,0.02)] border border-purple-50 flex flex-col items-center justify-center min-h-[350px]">
              <div className="w-16 h-16 bg-purple-50 rounded-full flex items-center justify-center mb-4 text-[#4f3370]">
                <Search className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-[#2c1b40] mb-2">No items found</h3>
              <p className="text-gray-400 text-sm font-medium">Try checking your spelling, looking at another category or refining your search.</p>
            </div>
          ) : (
            <motion.div 
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              <AnimatePresence mode="popLayout">
                {filteredItems.map((item) => {
                  const isFav = favorites.includes(item.id);
                  return (
                    <motion.div
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.35 }}
                      key={item.id}
                      className="bg-white rounded-[2rem] overflow-hidden shadow-[0_15px_35px_rgba(79,51,112,0.03)] border border-purple-100/40 hover:shadow-[0_22px_45px_rgba(79,51,112,0.11)] hover:-translate-y-2 transition-all duration-300 group cursor-default flex flex-col justify-between"
                    >
                      {/* Card Image Wrapper */}
                      <div className="relative h-56 overflow-hidden bg-purple-50/10">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent"></div>
                        
                        {/* Category tag */}
                        <span className="absolute bottom-4 left-5 bg-[#4f3370]/90 backdrop-blur-xs text-white text-[9px] font-bold tracking-widest uppercase px-3 py-1 rounded-full shadow-md">
                          {item.tag || item.category}
                        </span>

                        {/* Favorite Heart Button */}
                        <button
                          onClick={() => toggleFavorite(item.id)}
                          className="absolute top-4 right-4 bg-white/95 text-[#4f3370] p-2.5 rounded-full shadow-md transition-transform active:scale-90 hover:scale-105 cursor-pointer flex items-center justify-center border border-purple-50"
                          title="Save item"
                        >
                          <Heart className={`w-4 h-4 transition-colors ${isFav ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
                        </button>
                      </div>

                      {/* Card Contents */}
                      <div className="p-6 flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start gap-2 mb-2">
                            <h3 className="font-sans font-extrabold text-lg text-[#2c1b40] group-hover:text-[#4f3370] transition-colors leading-snug">
                              {item.name}
                            </h3>
                          </div>
                          
                          <p className="text-gray-500 text-xs sm:text-sm font-semibold leading-relaxed mb-6 line-clamp-3">
                            {item.description}
                          </p>
                        </div>

                        {/* Order & Add to Cart Controls */}
                        <div className="border-t border-purple-50/65 pt-4">
                          <div className="flex items-baseline justify-between mb-4">
                            <span className="text-xs font-bold text-gray-400">PRICE</span>
                            <span className="font-mono font-black text-xl text-[#4f3370] tracking-tight">{item.priceText}</span>
                          </div>

                          {/* Add to Cart button */}
                          <div className="w-full">
                            <button
                              onClick={() => {
                                setSelectedItem(item);
                                setItemQuantity(1);
                                setCakeSize('1');
                                const isPremium = item.id.includes('premium') || item.name.toLowerCase().includes('premium');
                                setCakeQuality(isPremium ? 'premium' : 'standard');
                                setOrderDetails({ customerName: '', message: '', age: '', phone: '', address: '', email: '' });
                                setPhoneError('');
                              }}
                              className="w-full bg-[#4f3370] hover:bg-[#3d2757] text-white py-2.5 rounded-xl font-extrabold text-xs transition-all flex items-center justify-center gap-1 cursor-pointer shadow-md"
                              title={item.category === 'Cakes' ? "Customize and Add" : "Order and Add"}
                            >
                              <span>{item.category === 'Cakes' ? 'Customize' : 'Order Now'}</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </motion.div>
          )}

        </div>
      </div>

      {/* Item Order Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-white rounded-[2rem] w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
            >
              {/* Modal Header */}
              <div className="bg-[#4f3370] p-6 flex items-center justify-between shrink-0">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <span className="shrink-0 bg-white/20 p-2 rounded-xl">{selectedItem.category === 'Cakes' ? '🎂' : '🛍️'}</span>
                  Order {modalItemDetails?.name || selectedItem.name}
                </h3>
                <button 
                  onClick={() => setSelectedItem(null)}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
                >
                  ✕
                </button>
              </div>

              {/* Modal Body */}
              <div className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-gray-200">
                <div className="flex flex-col md:flex-row gap-6 mb-8">
                  <div className="w-full md:w-1/3 aspect-square rounded-2xl overflow-hidden shrink-0 shadow-md">
                    <img src={modalItemDetails?.image || selectedItem.image} alt={modalItemDetails?.name || selectedItem.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xl font-black text-[#2c1b40] mb-2">{modalItemDetails?.name || selectedItem.name}</h4>
                    <p className="text-sm text-gray-500 font-medium mb-4">{modalItemDetails?.description || selectedItem.description}</p>
                    <div className="text-2xl text-[#4f3370] font-black tracking-tight mb-2">
                      ₹{selectedItem.category === 'Cakes' ? (cakeSize === '1' ? (modalItemDetails?.price || selectedItem.price) : (modalItemDetails?.price || selectedItem.price) / 2) : (modalItemDetails?.price || selectedItem.price) * itemQuantity}
                    </div>
                  </div>
                </div>

                <div className="space-y-5">
                  {selectedItem.category === 'Cakes' ? (
                    <>
                      {/* Weight Options */}
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block">Select Size</label>
                        <div className="grid grid-cols-2 gap-3">
                          <button 
                            onClick={() => setCakeSize('0.5')}
                            className={`py-3 px-4 rounded-xl font-bold border-2 transition-all ${cakeSize === '0.5' ? 'border-[#4f3370] bg-purple-50 text-[#4f3370]' : 'border-gray-100 text-gray-400 hover:border-gray-200'}`}
                          >
                            1/2 Kg
                          </button>
                          <button 
                            onClick={() => setCakeSize('1')}
                            className={`py-3 px-4 rounded-xl font-bold border-2 transition-all ${cakeSize === '1' ? 'border-[#4f3370] bg-purple-50 text-[#4f3370]' : 'border-gray-100 text-gray-400 hover:border-gray-200'}`}
                          >
                            1 Kg
                          </button>
                        </div>
                      </div>

                      {/* Quality Options for Forest Cakes */}
                      {modalItemDetails?.hasQualityChoice && (
                        <div className="space-y-2 pt-2">
                          <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block">Select Quality</label>
                          <div className="grid grid-cols-2 gap-3">
                            <button 
                              onClick={() => setCakeQuality('standard')}
                              className={`py-3 px-4 rounded-xl font-bold border-2 transition-all text-sm ${cakeQuality === 'standard' ? 'border-[#4f3370] bg-purple-50 text-[#4f3370]' : 'border-gray-100 text-gray-400 hover:border-gray-200'}`}
                            >
                              Standard (₹650)
                            </button>
                            <button 
                              onClick={() => setCakeQuality('premium')}
                              className={`py-3 px-4 rounded-xl font-bold border-2 transition-all text-sm ${cakeQuality === 'premium' ? 'border-[#4f3370] bg-purple-50 text-[#4f3370]' : 'border-gray-100 text-gray-400 hover:border-gray-200'}`}
                            >
                              Premium (₹900)
                            </button>
                          </div>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="space-y-2">
                       <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block">Quantity</label>
                       <div className="flex items-center gap-4 bg-gray-50 border border-gray-100 rounded-xl px-4 py-2 w-max">
                          <button 
                            onClick={() => setItemQuantity(Math.max(1, itemQuantity - 1))}
                            className="w-8 h-8 flex items-center justify-center rounded-lg bg-white shadow-sm border border-gray-200 text-gray-600 font-bold"
                          >
                            -
                          </button>
                          <span className="font-bold text-lg text-[#2c1b40] w-8 text-center">{itemQuantity}</span>
                          <button 
                            onClick={() => setItemQuantity(itemQuantity + 1)}
                            className="w-8 h-8 flex items-center justify-center rounded-lg bg-white shadow-sm border border-gray-200 text-gray-600 font-bold"
                          >
                            +
                          </button>
                       </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Modal Footer */}
              <div className="border-t border-gray-100 p-6 flex flex-col sm:flex-row gap-3 shrink-0">
                <button 
                  onClick={() => {
                    if (!isAuthenticated) {
                      onRequiresAuth();
                      setSelectedItem(null);
                      return;
                    }
                    const activePrice = selectedItem.category === 'Cakes' 
                      ? (cakeSize === '1' ? (modalItemDetails?.price || selectedItem.price) : (modalItemDetails?.price || selectedItem.price) / 2) 
                      : (modalItemDetails?.price || selectedItem.price) * itemQuantity;
                    const activeName = modalItemDetails?.name || selectedItem.name;
                    const activeImage = modalItemDetails?.image || selectedItem.image;

                    const msg = selectedItem.category === 'Cakes' 
                      ? `*New Cake Order* 🎂\n\n*Product:* ${activeName}\n*Size:* ${cakeSize === '1' ? '1 Kg' : '1/2 Kg'}\n*Price:* ₹${activePrice}`
                      : `*New Order* 🛍️\n\n*Product:* ${activeName}\n*Quantity:* ${itemQuantity}\n*Price:* ₹${activePrice}`;
                    
                    const whatsappUrl = `https://wa.me/919944416643?text=${encodeURIComponent(msg)}`;
                    window.open(whatsappUrl, '_blank');
                    
                    try {
                      // Save to global orders for admin
                      const globalOrders = JSON.parse(safeStorage.getItem('mahesh_bakery_global_orders') || '[]');
                      globalOrders.push({
                        id: `order-${Date.now()}`,
                        date: new Date().toLocaleDateString(),
                        status: 'Accepted',
                        customerEmail: 'Guest',
                        customerName: 'Guest',
                        customerPhone: 'Not provided',
                        customerAddress: 'Not provided',
                        paymentMethod: 'Cash on Delivery',
                        items: [{
                          name: activeName,
                          quantity: itemQuantity,
                          grandTotal: activePrice,
                          category: selectedItem.category,
                          image: activeImage,
                          sizeLabel: cakeSize === '1' ? '1 Kg' : '1/2 Kg'
                        }]
                      });
                      safeStorage.setItem('mahesh_bakery_global_orders', JSON.stringify(globalOrders));

                      setSuccessMessage(`Order request for ${activeName} sent automatically!`);
                      setTimeout(() => setSuccessMessage(null), 3000);
                    } catch (e) {
                      console.error(e);
                    }
                    setSelectedItem(null);
                  }}
                  className="flex-1 bg-[#25D366] hover:bg-[#20bd5a] text-white py-3.5 rounded-xl font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12.042 2C6.556 2 2.084 6.446 2.084 11.911c0 1.739.459 3.447 1.331 4.953L2.184 21.331l5.421-1.421c1.455.788 3.092 1.207 4.76 1.207h.004c5.486 0 9.958-4.446 9.958-9.911C22.327 6.446 17.855 2 12.042 2zm0 18.327h-.004c-1.493 0-2.957-.403-4.225-1.168l-2.494.654.666-2.433-.156-.251c-.833-1.343-1.272-2.885-1.272-4.464 0-4.63 3.794-8.411 8.458-8.411 2.269 0 4.387.877 5.986 2.469 1.597 1.589 2.475 3.697 2.475 5.948 0 4.63-3.794 8.411-8.458 8.411zM15.215 15.65c-.276-.138-1.631-.805-1.884-.897-.254-.093-.438-.138-.622.138-.184.276-.712.897-.873 1.081-.161.184-.323.207-.599.069-.276-.138-1.164-.429-2.217-1.371-.82-.73-1.372-1.632-1.533-1.908-.161-.276-.017-.426.121-.564.125-.123.276-.321.414-.483.138-.161.184-.276.276-.46.092-.184.046-.345-.023-.483-.069-.138-.622-1.507-.852-2.062-.224-.537-.453-.464-.622-.472-.161-.009-.345-.009-.529-.009s-.483.069-.735.345c-.253.276-.966.943-.966 2.301 0 1.357.989 2.668 1.127 2.852.138.184 1.944 2.971 4.706 4.168.657.283 1.171.452 1.572.583.662.21 1.265.18 1.741.11.531-.079 1.631-.667 1.861-1.311.23-.644.23-1.196.161-1.311-.069-.115-.253-.184-.529-.322z" />
                  </svg>
                  Checkout via WhatsApp
                </button>
                <button 
                  onClick={() => {
                    const price = selectedItem.category === 'Cakes' ? (cakeSize === '1' ? (modalItemDetails?.price || selectedItem.price) : (modalItemDetails?.price || selectedItem.price) / 2) : (modalItemDetails?.price || selectedItem.price);
                    const activeName = modalItemDetails?.name || selectedItem.name;
                    const activeImage = modalItemDetails?.image || selectedItem.image;

                    const cartItem: CartItem = {
                      id: `${selectedItem.id}-${Date.now()}`,
                      sizeLabel: selectedItem.category === 'Cakes' ? `${cakeSize === '1' ? '1 kg' : '1/2 kg'} ${activeName}` : activeName,
                      sizePrice: price,
                      name: '', 
                      age: '',
                      message: '',
                      customerName: '',
                      photoUrl: activeImage,
                      toppings: [],
                      toppingsTotal: 0,
                      itemTotal: price * (selectedItem.category === 'Cakes' ? 1 : itemQuantity),
                      quantity: selectedItem.category === 'Cakes' ? 1 : itemQuantity,
                      date: new Date().toLocaleDateString(),
                      time: 'Immediate',
                      grandTotal: price * (selectedItem.category === 'Cakes' ? 1 : itemQuantity),
                      customerAddress: '',
                      customerEmail: '',
                      customerPhone: ''
                    };
                    onAddToCart(cartItem);
                    setSelectedItem(null);
                    setSuccessMessage(`Added ${activeName} to your cart!`);
                    setTimeout(() => setSuccessMessage(null), 3000);
                  }}
                  className="flex-1 bg-[#4f3370] hover:bg-[#3d2757] text-white py-3.5 rounded-xl font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 border border-purple-800"
                >
                  <ShoppingBag className="w-5 h-5" />
                  Add to Cart
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating alert bar for cart additions */}
      <AnimatePresence>
        {successMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 bg-[#4f3370] text-white py-3.5 px-6 rounded-full flex items-center gap-2.5 shadow-2xl font-bold border border-white/10"
          >
            <span className="w-5 h-5 bg-white text-[#4f3370] rounded-full flex items-center justify-center text-xs">✓</span>
            <span>{successMessage}</span>
            <button 
              onClick={onViewCart}
              className="text-[#FFB01A] hover:underline font-extrabold text-xs ml-3"
            >
              View Cart →
            </button>
          </motion.div>
        )}
      </AnimatePresence>
      </div>
    </div>
  );
}
