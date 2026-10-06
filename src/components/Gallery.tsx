import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  Maximize2, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Cake, 
  Heart, 
  Clock, 
  Coins, 
  CheckCircle, 
  Info, 
  Gift,
  Eye,
  Globe,
  Leaf,
  Coffee
} from 'lucide-react';

interface GalleryItem {
  id: number;
  title: string;
  category: 'birthday' | 'wedding' | 'celebration' | 'kids';
  categoryLabel: string;
  image: string;
  description: string;
  likes: number;
  tag?: string;
  price: number; // Starting price for 1 Kg or plate
  flavors: string[];
  sizes: string[];
  egglessAvailable: boolean;
  prepTime: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 1,
    title: "Royal Pearl Wedding Tier",
    category: "wedding",
    categoryLabel: "Wedding Cakes",
    image: "https://ik.imagekit.io/mc0i0aav7i/2023-08-21%20(2).jpg?updatedAt=1779804966681",
    description: "An elegant, multi-tier majestic pearl wedding cake featuring exquisite fondant drapes, edible lace, and clean royal detailing.",
    likes: 312,
    tag: "Signature",
    price: 2200,
    flavors: ["Vanilla Bean Royale", "Classic Red Velvet", "Rich Almond Buttercream"],
    sizes: ["3 Kg", "5 Kg", "8 Kg+ Tiered"],
    egglessAvailable: true,
    prepTime: "2 Days"
  },
  {
    id: 2,
    title: "Golden Blossom Anniversary Tier",
    category: "wedding",
    categoryLabel: "Wedding Cakes",
    image: "https://ik.imagekit.io/mc0i0aav7i/2023-08-21%20(3).jpg?updatedAt=1779804966700",
    description: "Multi-tiered masterpiece adorned with handcrafted sugar blossoms and delicate shimmering gold leaf patterns.",
    likes: 245,
    tag: "Artisan",
    price: 2400,
    flavors: ["Rich Red Velvet", "White Forest Fusion", "Caramel Butterscotch"],
    sizes: ["3 Kg", "4 Kg", "6 Kg Tiered"],
    egglessAvailable: true,
    prepTime: "2 Days"
  },
  {
    id: 3,
    title: "Choco Vanilla Delight Tier",
    category: "celebration",
    categoryLabel: "Celebration Cakes",
    image: "https://ik.imagekit.io/mc0i0aav7i/2021-09-05.jpg?updatedAt=1779804966962",
    description: "A wonderful contrasting layered design with swirly vanilla and chocolate frostings decorated to absolute perfection.",
    likes: 189,
    tag: "Bestseller",
    price: 950,
    flavors: ["Choco Vanilla Fusion", "Chocolate Truffle", "Classic Dutch Chocolate"],
    sizes: ["1.5 Kg", "2 Kg", "3 Kg"],
    egglessAvailable: true,
    prepTime: "8 Hours"
  },
  {
    id: 4,
    title: "Cute Teddy Baby Shower Cake",
    category: "kids",
    categoryLabel: "Kid's Cakes",
    image: "https://ik.imagekit.io/mc0i0aav7i/unnamed%20(2).jpg?updatedAt=1779804966968",
    description: "Welcoming your little bundle of joy with customized pastel bear fondant elements, tiny clouds, and stars.",
    likes: 278,
    tag: "Cute Choice",
    price: 1200,
    flavors: ["Rainbow Vanilla Sponge", "Fresh Strawberry Cream", "Creamy Mango Swirl"],
    sizes: ["1.5 Kg", "2 Kg", "2.5 Kg"],
    egglessAvailable: true,
    prepTime: "12 Hours"
  },
  {
    id: 5,
    title: "Elegance Rosegold Duo-Tier",
    category: "birthday",
    categoryLabel: "Birthday Cakes",
    image: "https://ik.imagekit.io/mc0i0aav7i/2023-08-21%20(1).jpg?updatedAt=1779804966901",
    description: "Exquisite double-decker birthday cream gateau finished with golden chocolate balls, macarons, and delicate blush pink roses.",
    likes: 211,
    tag: "Trending",
    price: 1800,
    flavors: ["Pink Velvet Raspberry", "Rose Gold Vanilla Drip", "Strawberry Praline"],
    sizes: ["2 Kg", "3 Kg", "4 Kg"],
    egglessAvailable: true,
    prepTime: "24 Hours"
  },
  {
    id: 6,
    title: "Enchanted Princess Crown Theme",
    category: "kids",
    categoryLabel: "Kid's Cakes",
    image: "https://ik.imagekit.io/mc0i0aav7i/2023-08-24.jpg?updatedAt=1779804967011",
    description: "A dream cake fit for royalty, featuring a golden edible crown topper, pearl beads, and pastel pink ruffles.",
    likes: 198,
    tag: "Dreamy",
    price: 1400,
    flavors: ["Pineapple Breeze", "White Chocolate Raspberry", "Bubblegum Crush"],
    sizes: ["1.5 Kg", "2 Kg", "3 Kg"],
    egglessAvailable: true,
    prepTime: "16 Hours"
  },
  {
    id: 7,
    title: "Red Velvet Canopy Anniversary Cake",
    category: "celebration",
    categoryLabel: "Celebration Cakes",
    image: "https://ik.imagekit.io/mc0i0aav7i/2020-12-03.jpg?updatedAt=1779804967139",
    description: "Rich, velvety crimson cake layered with delicate cream cheese and detailed with sugar pearl borders.",
    likes: 165,
    tag: "Romantic",
    price: 1100,
    flavors: ["Classic Red Velvet Cheese", "White Chocolate Red Velvet", "Dutch Velvet Twist"],
    sizes: ["1.5 Kg", "2 Kg", "3 Kg"],
    egglessAvailable: true,
    prepTime: "12 Hours"
  },
  {
    id: 8,
    title: "Deluxe Pearl Lace Wedding Showstopper",
    category: "wedding",
    categoryLabel: "Wedding Cakes",
    image: "https://ik.imagekit.io/mc0i0aav7i/2023-08-21.jpg?updatedAt=1779804967231",
    description: "A monumental masterwork of traditional wedding lace design with delicate floral crowns for elite banquets.",
    likes: 342,
    tag: "Masterpiece",
    price: 3500,
    flavors: ["Premium Hazelnut Praline", "Traditional Badam-Rose Cake", "Royal Vanilla Royale"],
    sizes: ["5 Kg", "8 Kg", "12 Kg Tiered"],
    egglessAvailable: true,
    prepTime: "3 Days"
  },
  {
    id: 9,
    title: "Pastel Unicorn Rainbow Dream",
    category: "kids",
    categoryLabel: "Kid's Cakes",
    image: "https://ik.imagekit.io/mc0i0aav7i/2025-08-01.jpg?updatedAt=1779804967291",
    description: "Whimsical golden unicorn horn cake with beautiful pastel cream swirly mane and playful star annotations.",
    likes: 295,
    tag: "Most Loved",
    price: 1250,
    flavors: ["Strawberry Sprinkles", "Vanilla Funfetti Royale", "Blueberry Blast"],
    sizes: ["1.5 Kg", "2 Kg", "3 Kg"],
    egglessAvailable: true,
    prepTime: "18 Hours"
  },
  {
    id: 10,
    title: "Spiderman Web-Slinging Birthday Cake",
    category: "kids",
    categoryLabel: "Kid's Cakes",
    image: "https://ik.imagekit.io/mc0i0aav7i/2021-04-18.jpg?updatedAt=1779804967314",
    description: "High-flying action marvel cake featuring handcrafted web structures, a Spiderman shadow cutout, and bold accents.",
    likes: 187,
    tag: "Super Hero",
    price: 1150,
    flavors: ["Belgian Dark Fudge", "Chocolate Overload", "Choco Orange Twist"],
    sizes: ["1.5 Kg", "2 Kg", "3 Kg"],
    egglessAvailable: true,
    prepTime: "12 Hours"
  },
  {
    id: 11,
    title: "Super Hero Avenger Assemble Tier",
    category: "kids",
    categoryLabel: "Kid's Cakes",
    image: "https://ik.imagekit.io/mc0i0aav7i/2021-04-17.jpg?updatedAt=1779804967254",
    description: "Multi-character customized tier cake showing Captain America's shield, Iron Man's arc, and Thor's hammer details.",
    likes: 264,
    tag: "Epic Design",
    price: 1500,
    flavors: ["Chocolate Truffle Crunch", "Dutch Choco-Fudge", "Classic Vanilla Bean"],
    sizes: ["2 Kg", "3 Kg", "4 Kg Custom"],
    egglessAvailable: true,
    prepTime: "24 Hours"
  },
  {
    id: 12,
    title: "Elegant Golden Butterfly Drip Cake",
    category: "birthday",
    categoryLabel: "Birthday Cakes",
    image: "https://ik.imagekit.io/mc0i0aav7i/2021-10-09.jpg?updatedAt=1779804967307",
    description: "Gorgeously crafted cream drip cake featuring golden papercraft butterflies, soft pink roses, and white chocolate pearls.",
    likes: 195,
    tag: "Trending",
    price: 900,
    flavors: ["Rose Petal Vanilla", "Creamy Butterscotch Drip", "Strawberry Fusion"],
    sizes: ["1 Kg", "1.5 Kg", "2 Kg"],
    egglessAvailable: true,
    prepTime: "8 Hours"
  },
  {
    id: 13,
    title: "Dinosaur Jungle Safari Birthday Cake",
    category: "kids",
    categoryLabel: "Kid's Cakes",
    image: "https://ik.imagekit.io/mc0i0aav7i/2021-02-04.jpg?updatedAt=1779804967328",
    description: "Pre-historic fun cake with cute fondant dinosaurs, edible trees, rocks, and a volcanic chocolate drip cascade.",
    likes: 153,
    tag: "Jungle Theme",
    price: 1300,
    flavors: ["Choco Truffle", "Fudge Hazelnut", "Banana Chocolate Fusion"],
    sizes: ["1.5 Kg", "2 Kg", "3 Kg"],
    egglessAvailable: true,
    prepTime: "18 Hours"
  },
  {
    id: 14,
    title: "Choco Fudge Hazelnut Fantasy",
    category: "birthday",
    categoryLabel: "Birthday Cakes",
    image: "https://ik.imagekit.io/mc0i0aav7i/2021-08-28.jpg?updatedAt=1779804967352",
    description: "A rich dark chocolate drip tier topped with luxury hazelnut truffles, custom script nameplate, and dark chocolate shards.",
    likes: 228,
    tag: "Best Seller",
    price: 850,
    flavors: ["Hazelnut Cappuccino", "Gourmet Dutch Fudge", "Nutella Overload"],
    sizes: ["1 Kg", "1.5 Kg", "2 Kg", "3 Kg"],
    egglessAvailable: true,
    prepTime: "6 Hours"
  },
  {
    id: 15,
    title: "Adorable Cuddle Bears Twins Celebration",
    category: "kids",
    categoryLabel: "Kid's Cakes",
    image: "https://ik.imagekit.io/mc0i0aav7i/unnamed%20(1).jpg?updatedAt=1779804967358",
    description: "Twin bear cub fondant toppers resting on standard cloud and moon cream sponge layout, perfect for twins' milestones.",
    likes: 174,
    tag: "Double Joy",
    price: 1600,
    flavors: ["Vanilla Berry Fantasy", "Milky White Chocolate", "Classic Butterscotch"],
    sizes: ["2 Kg", "3 Kg", "4 Kg"],
    egglessAvailable: true,
    prepTime: "24 Hours"
  },
  {
    id: 16,
    title: "Royal Floral Gold Shimmer Tier",
    category: "celebration",
    categoryLabel: "Celebration Cakes",
    image: "https://ik.imagekit.io/mc0i0aav7i/2021-02-20.jpg?updatedAt=1779804967373",
    description: "Draped with premium golden brushstrokes, pink edible petals, and gorgeous botanical ornaments for royal events.",
    likes: 205,
    tag: "Royal Collection",
    price: 2000,
    flavors: ["Classic Red Velvet Cream", "Traditional Badam Milk Cake", "Vanilla Chiffon Royale"],
    sizes: ["2 Kg", "3.5 Kg", "5 Kg Tiered"],
    egglessAvailable: true,
    prepTime: "36 Hours"
  },
  {
    id: 17,
    title: "Luxe Truffle Metallic Drip",
    category: "birthday",
    categoryLabel: "Birthday Cakes",
    image: "https://ik.imagekit.io/mc0i0aav7i/2021-02-11.jpg?updatedAt=1779804967423",
    description: "Premium chocolate sponge layered with Belgian dark ganache and luxury metallic gold drip finish.",
    likes: 182,
    tag: "Elegant Dark",
    price: 950,
    flavors: ["70% Swiss Dark Truffle", "Mocha Chocolate Ganache", "Coffee Bean Fusion"],
    sizes: ["1 Kg", "1.5 Kg", "2 Kg"],
    egglessAvailable: true,
    prepTime: "8 Hours"
  },
  {
    id: 18,
    title: "Barbie Pink Enchanted Gown",
    category: "kids",
    categoryLabel: "Kid's Cakes",
    image: "https://ik.imagekit.io/mc0i0aav7i/2022-12-07.jpg?updatedAt=1779804967496",
    description: "Classic Barbie doll cake with an extraordinary trailing gown handcrafted from elegant pink ruffles and silver sparks.",
    likes: 310,
    tag: "Crowd Favorite",
    price: 1350,
    flavors: ["Pink Strawberry Swirl", "Vanilla Berry Fusion", "White Forest Fantasy"],
    sizes: ["2 Kg", "3 Kg", "4 Kg"],
    egglessAvailable: true,
    prepTime: "24 Hours"
  },
  {
    id: 19,
    title: "Artisanal White & Pink Forest",
    category: "birthday",
    categoryLabel: "Birthday Cakes",
    image: "https://ik.imagekit.io/mc0i0aav7i/2020-06-15.jpg?updatedAt=1779804967552",
    description: "Light chiffon sponge filled with premium cherry compote, fresh blush-pink cream flakes, and vanilla frosting.",
    likes: 147,
    tag: "Fresh Baked",
    price: 750,
    flavors: ["White & Pink Forest Duo", "Cherry Vanilla Cream", "Classic Vanilla Dream"],
    sizes: ["1 Kg", "1.5 Kg", "2 Kg", "Custom Weight"],
    egglessAvailable: true,
    prepTime: "6 Hours"
  },
  {
    id: 20,
    title: "Tropical Fresh Fruit Gateau",
    category: "celebration",
    categoryLabel: "Celebration Cakes",
    image: "https://ik.imagekit.io/mc0i0aav7i/2020-04-26.jpg?updatedAt=1779804967604",
    description: "Moist sponge layers covered in light whipped cream and loaded with beautiful seasonal fresh fruits on top.",
    likes: 139,
    tag: "Healthy Treat",
    price: 800,
    flavors: ["Mixed Fruit Harvest Swirl", "Pineapple Mango Medley", "Classic Fruit Custard Sponge"],
    sizes: ["1 Kg", "1.5 Kg", "2 Kg", "Custom Weight"],
    egglessAvailable: true,
    prepTime: "6 Hours"
  },
  {
    id: 21,
    title: "Cute Fondant Elephant Baby Cake",
    category: "kids",
    categoryLabel: "Kid's Cakes",
    image: "https://ik.imagekit.io/mc0i0aav7i/2021-01-12.jpg?updatedAt=1779804967654",
    description: "Sweet baby blue elephant topper with golden stars, cloud balloons, and fine custom personalized banners.",
    likes: 168,
    tag: "Sweet Delight",
    price: 1250,
    flavors: ["Blueberry Cheesecake Sponge", "Vanilla Caramel Delight", "Sweet Strawberry Smash"],
    sizes: ["1.5 Kg", "2 Kg", "3 Kg"],
    egglessAvailable: true,
    prepTime: "18 Hours"
  },
  {
    id: 22,
    title: "Choco Berry Holiday Wreath Cake",
    category: "celebration",
    categoryLabel: "Celebration Cakes",
    image: "https://ik.imagekit.io/mc0i0aav7i/2020-12-23%20(1).jpg?updatedAt=1779804967718",
    description: "Rich dark glaze cake decorated with dynamic frosting wreath patterns, cherries, and organic chocolate flakes.",
    likes: 145,
    tag: "Festive Pick",
    price: 890,
    flavors: ["Belgian Cherry Fudge", "Dark Chocolate Raspberry", "Choco Hazelnut Truffle"],
    sizes: ["1 Kg", "1.5 Kg", "2 Kg"],
    egglessAvailable: true,
    prepTime: "8 Hours"
  },
  {
    id: 23,
    title: "Modern Floral Blush 2-Tier",
    category: "wedding",
    categoryLabel: "Wedding Cakes",
    image: "https://ik.imagekit.io/mc0i0aav7i/2022-03-25.jpg?updatedAt=1779804967806",
    description: "An elegant two-tiered pastel blush design adorned with fresh roses, botanical baby's breath, and a minimalist smooth finish.",
    likes: 219,
    tag: "Modern Wedding",
    price: 2800,
    flavors: ["Classic Red Velvet Cheese", "Vanilla Rosewater Royale", "Rich Almond Nutty Cream"],
    sizes: ["3 Kg", "4 Kg", "5 Kg"],
    egglessAvailable: true,
    prepTime: "2 Days"
  },
  {
    id: 24,
    title: "Elegant Swan Lake Ballet Cake",
    category: "kids",
    categoryLabel: "Kid's Cakes",
    image: "https://ik.imagekit.io/mc0i0aav7i/2022-05-28.jpg?updatedAt=1779804967797",
    description: "A gorgeous artistic tier depicting the famous Swan Lake with beautiful golden feather piping and a delicate papercraft swan centerpiece.",
    likes: 254,
    tag: "Premium Kids",
    price: 1450,
    flavors: ["Sweet Blueberry Cream", "Vanilla Bean Royale", "Strawberry Cream Cascade"],
    sizes: ["1.5 Kg", "2 Kg", "3 Kg"],
    egglessAvailable: true,
    prepTime: "20 Hours"
  },
  {
    id: 25,
    title: "Classic Red Lace Anniversary Sponge",
    category: "celebration",
    categoryLabel: "Celebration Cakes",
    image: "https://ik.imagekit.io/mc0i0aav7i/2020-10-02.jpg?updatedAt=1779804967898",
    description: "An incredibly smooth cherry-pink gateau detailed with fine red leaf borders, fresh cherries, and custom handpicked ornaments.",
    likes: 128,
    tag: "Classic Baker",
    price: 800,
    flavors: ["Cherry Cream Velvet", "Strawberry Rosemilk", "Vanilla Raspberry Drip"],
    sizes: ["1 Kg", "1.5 Kg", "2 Kg", "Custom Weight"],
    egglessAvailable: true,
    prepTime: "6 Hours"
  },
  {
    id: 26,
    title: "Velvet Crimson Blossom Drip",
    category: "birthday",
    categoryLabel: "Birthday Cakes",
    image: "https://ik.imagekit.io/mc0i0aav7i/2020-12-23.jpg?updatedAt=1779804967906",
    description: "A striking high-contrast crimson mirror cake featuring white chocolate floral flourishes and delicate golden brushstrokes.",
    likes: 172,
    tag: "Dazzling Look",
    price: 900,
    flavors: ["White Chocolate Red Velvet", "Classic Red Velvet Drip", "Royal Rose Caramel"],
    sizes: ["1 Kg", "1.5 Kg", "2 Kg"],
    egglessAvailable: true,
    prepTime: "8 Hours"
  },
  {
    id: 27,
    title: "Fresh Pineapple Paradise Gateau",
    category: "celebration",
    categoryLabel: "Celebration Cakes",
    image: "https://ik.imagekit.io/mc0i0aav7i/2020-03-20.jpg?updatedAt=1779804968048",
    description: "Traditional soft cream sponge covered in real pulpy golden pineapple slices and fresh whipped white cream.",
    likes: 119,
    tag: "Timeless",
    price: 700,
    flavors: ["Classic Pineapple Breeze", "Pineapple Cherry Fusion", "Rich Caramel Pineapple"],
    sizes: ["1 Kg", "1.5 Kg", "2 Kg", "Custom Weight"],
    egglessAvailable: true,
    prepTime: "4 Hours"
  },
  {
    id: 28,
    title: "Sweet Teddy Bear Balloon Cake",
    category: "kids",
    categoryLabel: "Kid's Cakes",
    image: "https://ik.imagekit.io/mc0i0aav7i/2022-02-16.jpg?updatedAt=1779804968006",
    description: "An adorable toddler birthday centerpiece with a pastel chocolate bear holding colorful cream frosting balloons.",
    likes: 299,
    tag: "Toddler Special",
    price: 1200,
    flavors: ["Rainbow Sprinkles Sponge", "Gourmet Vanilla Fudge", "Sweet Strawberry Blast"],
    sizes: ["1.5 Kg", "2 Kg", "2.5 Kg"],
    egglessAvailable: true,
    prepTime: "12 Hours"
  },
  {
    id: 29,
    title: "Royal Navy & Gold Celebration",
    category: "birthday",
    categoryLabel: "Birthday Cakes",
    image: "https://ik.imagekit.io/mc0i0aav7i/2021-08-30.jpg?updatedAt=1779804968030",
    description: "A bold navy blue frosted design featuring dynamic edible gold drapes, chocolate sail structures, and a premium crown motif.",
    likes: 236,
    tag: "Elite Men",
    price: 1100,
    flavors: ["Belgian Dark Truffle", "Biscoff Buttercream Fusion", "Dutch Cappuccino Caramel"],
    sizes: ["1.5 Kg", "2 Kg", "3 Kg"],
    egglessAvailable: true,
    prepTime: "16 Hours"
  },
  {
    id: 30,
    title: "Magical Pink Castle Fondant Cake",
    category: "kids",
    categoryLabel: "Kid's Cakes",
    image: "https://ik.imagekit.io/mc0i0aav7i/2021-09-23.jpg?updatedAt=1779804968116",
    description: "A gorgeous princess castle tower birthday cake handcrafted out of detailed fondant turrets, stairs, and bright banners.",
    likes: 341,
    tag: "Royal Castle",
    price: 1650,
    flavors: ["Sweet Butterscotch Drip", "Pink Strawberry Smash", "White Chocolate Raspberry Royale"],
    sizes: ["2.5 Kg", "3 Kg", "4 Kg Custom"],
    egglessAvailable: true,
    prepTime: "24 Hours"
  },
  {
    id: 31,
    title: "Premium Coffee Mocha Walnut fudge",
    category: "birthday",
    categoryLabel: "Birthday Cakes",
    image: "https://ik.imagekit.io/mc0i0aav7i/2021-02-24%20(1).jpg?updatedAt=1779804968222",
    description: "A robust artisan design incorporating single-origin roasted coffee glaze, walnuts, and fine chocolate stars.",
    likes: 189,
    tag: "Coffee Addict",
    price: 1000,
    flavors: ["Cappuccino Mocha Fudge", "Irish Cream Praline", "Nutella Hazelnut Overload"],
    sizes: ["1.5 Kg", "2 Kg", "3 Kg"],
    egglessAvailable: true,
    prepTime: "12 Hours"
  },
  {
    id: 32,
    title: "Delicate Floral Spring Bonnet Cake",
    category: "celebration",
    categoryLabel: "Celebration Cakes",
    image: "https://ik.imagekit.io/mc0i0aav7i/unnamed.jpg?updatedAt=1779804968297",
    description: "Crafted like an elegant spring garden bonnet with piped cream rose patterns covering a tall, airy vanilla sponge.",
    likes: 154,
    tag: "Spring Garden",
    price: 950,
    flavors: ["Mixed Flower Rosewater Sponge", "Classic Custard Fruit", "Mild Butterscotch Classic"],
    sizes: ["1.5 Kg", "2 Kg", "3 Kg"],
    egglessAvailable: true,
    prepTime: "12 Hours"
  },
  {
    id: 33,
    title: "Ultimate Double Chocolate Ganache Cascade",
    category: "birthday",
    categoryLabel: "Birthday Cakes",
    image: "https://ik.imagekit.io/mc0i0aav7i/2021-02-24.jpg?updatedAt=1779804968299",
    description: "Flawless dark cocoa sponge loaded inside and out with warm Belgian chocolate ganache cascades, chips, and luxury bars.",
    likes: 295,
    tag: "Chocoholic",
    price: 1050,
    flavors: ["Belgian Fudge Overload", "Choco Lava Dux", "Dutch Choco Caramel Crunch"],
    sizes: ["1 Kg", "1.5 Kg", "2 Kg", "3 Kg"],
    egglessAvailable: true,
    prepTime: "6 Hours"
  }
];

export default function Gallery() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [likedItems, setLikedItems] = useState<{ [key: number]: boolean }>({});
  const [likesCount, setLikesCount] = useState<{ [key: number]: number }>(() => {
    const initialCounts: { [key: number]: number } = {};
    GALLERY_ITEMS.forEach(it => {
      initialCounts[it.id] = it.likes;
    });
    return initialCounts;
  });

  const filteredItems = GALLERY_ITEMS;
  const currentLightboxItem = lightboxIndex !== null ? filteredItems[lightboxIndex] : null;

  const handleLike = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    const isCurrentlyLiked = likedItems[id];
    setLikedItems(prev => ({ ...prev, [id]: !isCurrentlyLiked }));
    setLikesCount(prev => ({
      ...prev,
      [id]: isCurrentlyLiked ? prev[id] - 1 : prev[id] + 1
    }));
  };

  const openLightbox = (id: number) => {
    const indexInFiltered = filteredItems.findIndex(it => it.id === id);
    if (indexInFiltered !== -1) {
      setLightboxIndex(indexInFiltered);
    }
  };

  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex(prev => (prev === null || prev === 0) ? filteredItems.length - 1 : prev - 1);
    }
  };

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex(prev => (prev === null || prev === filteredItems.length - 1) ? 0 : prev + 1);
    }
  };

  // Generate beautiful WhatsApp link for this custom gallery image inquiry
  const getWhatsAppLink = (item: GalleryItem) => {
    const text = `Hello Mahesh Super Bakery! 🍰 I'm viewing your Custom Cake Design Portfolio and absolutely love this design:
 
🎂 *Design Title:* ${item.title}
✨ *Category:* ${item.categoryLabel}
📸 *Reference Image:* ${item.image}
 
I would love to inquire about customizing a similar custom cake for our upcoming special event! Please share details on structural options and booking. Thank you!`;
    return `https://wa.me/919944416643?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="bg-[#f8f5f0] min-h-[85vh] font-sans pb-16">
      {/* 1. Hero Banner */}
      <div className="relative min-h-[460px] md:h-[520px] w-full flex items-center overflow-hidden py-12 md:py-0 bg-[#4E2A74]">
        
        {/* Full background image of the beautiful custom banner provided by the user */}
        <div className="absolute inset-0 z-0 select-none">
          <img 
            src="https://ik.imagekit.io/mc0i0aav7i/5475a9f5-2923-4814-a52c-6858d8094f88.png" 
            alt="Sweet Memories & Delicious Creations Banner" 
            className="w-full h-full object-cover object-center"
            referrerPolicy="no-referrer"
          />
          {/* Smooth overlay on smaller devices to keep text highly readable against the background */}
          <div className="absolute inset-0 bg-black/20 md:bg-transparent backdrop-blur-[1px] md:backdrop-blur-none"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center relative z-10">
          
          {/* Left Column: Interactive, fully clickable text & CTAs overlay the high fidelity design */}
          <div className="col-span-1 md:col-span-12 lg:col-span-8 flex flex-col items-start text-left space-y-6 md:max-w-2xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-1.5 bg-[#5D3883]/90 border border-white/20 backdrop-blur-md px-4.5 py-1.5 rounded-full shadow-md select-none"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#FFB01A] fill-[#FFB01A]" />
              <span className="text-[11px] uppercase font-bold tracking-wider text-[#FFB01A]">
                Exclusive Inspiration Gallery
              </span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-[46px] lg:text-[52px] font-[900] tracking-tight leading-[1.12] drop-shadow-lg text-white whitespace-pre-line"
            >
              Sweet Memories &{"\n"}Delicious Creations
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-sm md:text-base max-w-xl text-purple-100/95 font-medium leading-relaxed drop-shadow-md"
            >
              Browse our gorgeous visual catalog of award-winning customized cakes. Click any masterpiece to view full detail, get inspired, and make an inquiry directly on WhatsApp.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto z-20"
            >
              <a
                href="https://wa.me/919944416643?text=Hello%20Mahesh%20Super%20Bakery!%20🍰%20I'm%20browsing%20your%20Custom%20Cake%20Portfolio%20and%20absolutely%20love%20the%20designs!%20I'd%20love%20to%20know%20more."
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#25D366] hover:bg-[#20BE59] text-white font-black tracking-wider text-xs md:text-sm uppercase px-6 py-4 rounded-xl shadow-lg flex items-center justify-center gap-2.5 transition-all duration-300 hover:scale-[1.03] active:scale-95"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12.042 2C6.556 2 2.084 6.446 2.084 11.911c0 1.739.459 3.447 1.331 4.953L2.184 21.331l5.421-1.421c1.455.788 3.092 1.207 4.76 1.207h.004c5.486 0 9.958-4.446 9.958-9.911C22.327 6.446 17.855 2 12.042 2zm0 18.327h-.004c-1.493 0-2.957-.403-4.225-1.168l-2.494.654.666-2.433-.156-.251c-.833-1.343-1.272-2.885-1.272-4.464 0-4.63 3.794-8.411 8.458-8.411 2.269 0 4.387.877 5.986 2.469 1.597 1.589 2.475 3.697 2.475 5.948 0 4.63-3.794 8.411-8.458 8.411zM15.215 15.65c-.276-.138-1.631-.805-1.884-.897-.254-.093-.438-.138-.622.138-.184.276-.712.897-.873 1.081-.161.184-.323.207-.599.069-.276-.138-1.164-.429-2.217-1.371-.82-.73-1.372-1.632-1.533-1.908-.161-.276-.017-.426.121-.564.125-.123.276-.321.414-.483.138-.161.184-.276.276-.46.092-.184.046-.345-.023-.483-.069-.138-.622-1.507-.852-2.062-.224-.537-.453-.464-.622-.472-.161-.009-.345-.009-.529-.009s-.483.069-.735.345c-.253.276-.966.943-.966 2.301 0 1.357.989 2.668 1.127 2.852.138.184 1.944 2.971 4.706 4.168.657.283 1.171.452 1.572.583.662.21 1.265.18 1.741.11.531-.079 1.631-.667 1.861-1.311.23-.644.23-1.196.161-1.311-.069-.115-.253-.184-.529-.322z" />
                </svg>
                Inquire on WhatsApp
              </a>

              <button
                onClick={() => {
                  const el = document.getElementById("gallery-board");
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-[#2C1B40]/70 hover:bg-[#2C1B40]/90 text-white font-extrabold tracking-wider text-xs md:text-sm uppercase px-6 py-4 rounded-xl border border-white/20 shadow-md backdrop-blur-sm flex items-center justify-center gap-2.5 transition-all duration-300 hover:scale-[1.03] active:scale-95"
              >
                <Eye className="w-5 h-5 text-purple-200" />
                Browse Gallery
              </button>
            </motion.div>
          </div>

          {/* Empty spacer on desktop to let the beautiful custom cake display from the background image shine through cleanly */}
          <div className="hidden md:block col-span-1 md:col-span-12 lg:col-span-4 h-full pointer-events-none" />

        </div>
      </div>

      {/* 2. Headline Board */}
      <div id="gallery-board" className="max-w-7xl mx-auto px-6 mt-12 scroll-mt-6">
        <div className="border-b border-purple-100 pb-6 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <h2 className="text-3xl font-serif font-black text-[#2c1b40]">Signature Art Gallery</h2>
            <p className="text-gray-500 font-semibold text-xs mt-1">Displaying {filteredItems.length} custom-designed creations. Click on any design to enlarge and inquire.</p>
          </div>
          <div className="flex items-center gap-1.5 bg-[#4f3370]/10 px-3.5 py-1.5 rounded-full text-[#4f3370] font-black text-xs shrink-0 self-start">
            <Cake className="w-4 h-4 animate-bounce" /> Artistry In Every Layer
          </div>
        </div>

        {/* 3. Grid of Cake Gallery Cards (Pure Image Showcase) */}
        <motion.div 
          layout 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-10"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                layout
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="group bg-white rounded-3xl border border-purple-100/50 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer flex flex-col justify-between"
                onClick={() => openLightbox(item.id)}
              >
                <div className="relative overflow-hidden">
                  <div className="aspect-[4/3] w-full bg-gray-50 overflow-hidden relative">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    
                    {/* Dark gradient mask on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-4">
                      <span className="text-white text-xs font-bold tracking-wider flex items-center gap-1.5 bg-[#4f3370] px-3.5 py-2 rounded-full shadow-lg">
                        <Maximize2 className="w-3.5 h-3.5 text-amber-400" /> View Masterpiece
                      </span>
                    </div>

                    {/* Tag badge (e.g. Signature, Milestone, Epic) */}
                    {item.tag && (
                      <div className="absolute top-3 left-3 bg-[#FFB01A] text-[#2c1b40] text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full shadow-md z-10">
                        {item.tag}
                      </div>
                    )}
                  </div>
                </div>

                {/* Text and interaction details */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-1.5">
                    <span className="text-[#4f3370] font-black text-[9px] tracking-widest uppercase bg-[#4f3370]/5 px-2.5 py-1 rounded-md inline-block">
                      {item.categoryLabel}
                    </span>
                    <h3 className="font-extrabold text-[#2c1b40] group-hover:text-[#4f3370] transition-colors leading-snug line-clamp-1 text-base">{item.title}</h3>
                    <p className="text-xs text-gray-500 font-medium leading-relaxed line-clamp-2">{item.description}</p>
                  </div>

                  {/* Elegant bottom interaction bar */}
                  <div className="flex items-center justify-between pt-3 border-t border-purple-50">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                      Inquire on Telegram/WA
                    </span>

                    <button
                      onClick={(e) => handleLike(item.id, e)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border transition-all ${
                        likedItems[item.id]
                          ? 'bg-rose-50 border-rose-100 text-rose-500 scale-105'
                          : 'bg-gray-50 border-gray-100 text-gray-400 hover:text-rose-500 hover:bg-rose-50/50'
                      }`}
                    >
                      <Heart className={`w-3.5 h-3.5 transition-transform ${likedItems[item.id] ? 'fill-rose-500 scale-110' : ''}`} />
                      {likesCount[item.id]}
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* 4. Fullscreen Immersive Photo Gallery Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && currentLightboxItem && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-md z-[9999] flex items-center justify-center p-4 md:p-6 overflow-y-auto"
            onClick={() => setLightboxIndex(null)}
          >
            {/* Elegant Gallery Modal container */}
            <motion.div 
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              transition={{ type: 'spring', damping: 25, stiffness: 350 }}
              className="bg-[#faf8f5] rounded-[2rem] shadow-2xl border border-purple-100 max-w-5xl w-full overflow-hidden flex flex-col md:flex-row max-h-[92vh] md:max-h-[85vh] relative z-10"
              onClick={(e) => e.stopPropagation()}
            >
              
              {/* Left Column: Huge High-Res Visual & Slide Controls */}
              <div className="md:w-1/2 bg-neutral-950 flex flex-col justify-between relative min-h-[320px] md:min-h-[500px]">
                {/* Close Button on top-left of visual component */}
                <button
                  onClick={() => setLightboxIndex(null)}
                  className="absolute top-4 left-4 z-20 w-10 h-10 bg-black/60 backdrop-blur-md hover:bg-rose-600 rounded-full flex items-center justify-center text-white transition-all shadow"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Slideshow Arrow buttons */}
                <button 
                  onClick={handlePrev}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 bg-black/40 hover:bg-[#4f3370] rounded-full flex items-center justify-center text-white transition-all hover:scale-110"
                  aria-label="Previous Design"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <button 
                  onClick={handleNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 bg-black/40 hover:bg-[#4f3370] rounded-full flex items-center justify-center text-white transition-all hover:scale-110"
                  aria-label="Next Design"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>

                {/* Big Image Centering Layout */}
                <div className="flex-1 w-full flex items-center justify-center relative overflow-hidden bg-radial from-neutral-800 to-neutral-950 p-4 md:p-8">
                  <img 
                    src={currentLightboxItem.image} 
                    alt={currentLightboxItem.title} 
                    className="max-w-full max-h-[42vh] md:max-h-[55vh] object-contain rounded-2xl shadow-xl"
                    referrerPolicy="no-referrer"
                  />
                  {currentLightboxItem.tag && (
                    <span className="absolute top-4 right-4 bg-[#FFB01A] text-[#2c1b40] font-black text-[10px] tracking-widest px-3 py-1.5 rounded-full shadow-lg">
                      {currentLightboxItem.tag}
                    </span>
                  )}
                </div>

                {/* Image count and Love spec bar */}
                <div className="bg-black/80 p-4 px-6 border-t border-white/5 flex items-center justify-between text-white text-xs">
                  <span className="font-semibold text-gray-400">
                    Design {lightboxIndex + 1} of {filteredItems.length}
                  </span>
                  
                  <button
                    onClick={(e) => handleLike(currentLightboxItem.id, e)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border transition-all ${
                      likedItems[currentLightboxItem.id]
                        ? 'bg-rose-600 border-rose-600 text-white shadow'
                        : 'bg-white/10 border-white/15 hover:bg-rose-600 hover:border-rose-600'
                    }`}
                  >
                    <Heart className={`w-3.5 h-3.5 ${likedItems[currentLightboxItem.id] ? 'fill-white' : ''}`} />
                    {likesCount[currentLightboxItem.id]} Likes
                  </button>
                </div>
              </div>

              {/* Right Column: Clean Title, Description, and Messaging Option */}
              <div className="md:w-1/2 p-6 md:p-8 overflow-y-auto bg-white flex flex-col justify-between max-h-[50vh] md:max-h-none">
                
                {/* Header Information */}
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <span className="text-[10px] uppercase font-black tracking-widest text-[#d18f10] bg-[#FFB01A]/10 px-3 py-1 rounded-full">
                      {currentLightboxItem.categoryLabel}
                    </span>
                    <button
                      onClick={() => setLightboxIndex(null)}
                      className="w-9 h-9 bg-gray-100 hover:bg-[#4f3370]/10 text-gray-500 hover:text-[#4f3370] rounded-full flex items-center justify-center transition-colors shrink-0"
                      title="Close"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <h3 className="text-2xl md:text-3.5xl font-serif font-black text-[#2c1b40] tracking-tight">
                    {currentLightboxItem.title}
                  </h3>

                  <p className="text-sm text-gray-600 font-medium leading-relaxed">
                    {currentLightboxItem.description}
                  </p>
                </div>

                {/* Features Highlight Details (Pure design-oriented, no size/price selectors) */}
                <div className="my-8 space-y-4">
                  <div className="border-t border-b border-purple-50 py-4 space-y-3">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Creation Integrity
                    </p>
                    <ul className="text-xs text-gray-600 font-semibold space-y-2.5">
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                        Custom-sculpted theme cake designed on order reference.
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                        100% vegetarian pure eggless sponge and icing available.
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                        Handcrafted by highly certified pastry chefs using organic ingredients.
                      </li>
                    </ul>
                  </div>

                  <div className="bg-[#fdfaf5] border border-amber-100 rounded-2xl p-4 text-center">
                    <p className="text-xs font-extrabold text-[#2c1b40]">
                      Each cake is bespoke and custom tailored. For pricing estimates, lead times, or size recommendations based on guest count, tap the inquiry button below!
                    </p>
                  </div>
                </div>

                {/* Instant Inquiry Button */}
                <div className="space-y-3">
                  <a
                    href={getWhatsAppLink(currentLightboxItem)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-4 px-6 bg-emerald-600 hover:bg-emerald-700 hover:shadow-lg text-white font-extrabold text-sm rounded-2xl flex items-center justify-center gap-2 transition-all shadow select-none"
                  >
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M12.042 2C6.556 2 2.084 6.446 2.084 11.911c0 1.739.459 3.447 1.331 4.953L2.184 21.331l5.421-1.421c1.455.788 3.092 1.207 4.76 1.207h.004c5.486 0 9.958-4.446 9.958-9.911C22.327 6.446 17.855 2 12.042 2zm0 18.327h-.004c-1.493 0-2.957-.403-4.225-1.168l-2.494.654.666-2.433-.156-.251c-.833-1.343-1.272-2.885-1.272-4.464 0-4.63 3.794-8.411 8.458-8.411 2.269 0 4.387.877 5.986 2.469 1.597 1.589 2.475 3.697 2.475 5.948 0 4.63-3.794 8.411-8.458 8.411zM15.215 15.65c-.276-.138-1.631-.805-1.884-.897-.254-.093-.438-.138-.622.138-.184.276-.712.897-.873 1.081-.161.184-.323.207-.599.069-.276-.138-1.164-.429-2.217-1.371-.82-.73-1.372-1.632-1.533-1.908-.161-.276-.017-.426.121-.564.125-.123.276-.321.414-.483.138-.161.184-.276.276-.46.092-.184.046-.345-.023-.483-.069-.138-.622-1.507-.852-2.062-.224-.537-.453-.464-.622-.472-.161-.009-.345-.009-.529-.009s-.483.069-.735.345c-.253.276-.966.943-.966 2.301 0 1.357.989 2.668 1.127 2.852.138.184 1.944 2.971 4.706 4.168.657.283 1.171.452 1.572.583.662.21 1.265.18 1.741.11.531-.079 1.631-.667 1.861-1.311.23-.644.23-1.196.161-1.311-.069-.115-.253-.184-.529-.322z" />
                    </svg>
                    Inquire About This Design on WhatsApp
                  </a>

                  <div className="flex items-center justify-center gap-1.5 text-gray-400 text-[10px] font-bold">
                    <Info className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                    Looking for a different reference style? Share your photo directly on chat!
                  </div>
                </div>

              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
