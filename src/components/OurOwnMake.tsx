import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShoppingBag, 
  Sparkles, 
  Eye, 
  X, 
  MessageSquare, 
  Plus, 
  Minus, 
  Check, 
  ChevronRight, 
  Heart,
  Calendar,
  Clock,
  Cake,
  Hash,
  AlertCircle
} from 'lucide-react';
import { CartItem } from '../types';

interface OurOwnMakeProps {
  isAuthenticated: boolean;
  onAddToCart: (item: CartItem) => void;
  onViewCart: () => void;
  onRequiresAuth: () => void;
}

export interface OwnMakeItem {
  id: string;
  name: string;
  pricePerKg: number;
  image: string;
  description: string;
  isPopular?: boolean;
  isNew?: boolean;
  rating: number;
  sales: string;
}

const OWN_MAKE_ITEMS: OwnMakeItem[] = [
  {
    id: 'own-1',
    name: 'Strawberry Velvet Drip Cake',
    pricePerKg: 750,
    image: 'https://ik.imagekit.io/3awt8gog6/img795.jpg?updatedAt=1779964644415',
    description: 'Fresh succulent strawberry frosting cascaded with deep pink drips, adorned with soft cream swirls of unmatched sweetness.',
    isPopular: true,
    rating: 4.9,
    sales: '180+ ordered'
  },
  {
    id: 'own-2',
    name: 'Rich Chocolate Rose Symphony',
    pricePerKg: 850,
    image: 'https://ik.imagekit.io/3awt8gog6/img697.jpg?updatedAt=1779964644465',
    description: 'Our ultimate chocolate decadence cake decorated with beautiful handmade frosting roses and rich truffle layers.',
    isNew: true,
    rating: 4.8,
    sales: 'New'
  },
  {
    id: 'own-3',
    name: 'Classic Butterscotch Crunch',
    pricePerKg: 700,
    image: 'https://ik.imagekit.io/3awt8gog6/img810.jpg?updatedAt=1779964644382',
    description: 'Mouth-watering butterscotch base topped with golden caramel praline crunch and rich butterscotch cream swirls.',
    isPopular: true,
    rating: 4.9,
    sales: '340+ ordered'
  },
  {
    id: 'own-4',
    name: 'Pink Princess Blossom Delight',
    pricePerKg: 800,
    image: 'https://ik.imagekit.io/3awt8gog6/img807.jpg?updatedAt=1779964644442',
    description: 'A beautiful pastel pink dream cake with elegant blossom dollops and vanilla cream swirls of royal look.',
    rating: 4.7,
    sales: '90+ ordered'
  },
  {
    id: 'own-5',
    name: 'Vanilla Blueberry Ripple Celebration',
    pricePerKg: 750,
    image: 'https://ik.imagekit.io/3awt8gog6/img762.jpg?updatedAt=1779964644374',
    description: 'Refreshing custom vanilla cake with alternating layers of tart premium blueberry ripple jam and fresh whipped white cream.',
    rating: 4.6,
    sales: '110+ ordered'
  },
  {
    id: 'own-6',
    name: 'White Forest Cherry Harmony',
    pricePerKg: 780,
    image: 'https://ik.imagekit.io/0boxn146f/images%20(1).jpg',
    description: 'Light sponge cake loaded with premium white chocolate curls, fluffy cream, and candied rich red cherries.',
    isPopular: true,
    rating: 4.9,
    sales: '250+ ordered'
  },
  {
    id: 'own-7',
    name: 'Chocolate KitKat Fudge Castle',
    pricePerKg: 950,
    image: 'https://ik.imagekit.io/3awt8gog6/img804.jpg?updatedAt=1779964644341',
    description: 'Layers of decadent dark chocolate sponge bound by sweet KitKat bar boundaries, topped with colorful gems.',
    isPopular: true,
    rating: 5.0,
    sales: '420+ ordered'
  },
  {
    id: 'own-8',
    name: 'Fairy Pink Rosebud Cream Cake',
    pricePerKg: 800,
    image: 'https://ik.imagekit.io/3awt8gog6/img801.jpg?updatedAt=1779964644333',
    description: 'A delicate pastel delight studded with miniature pink rose details and smooth buttercream lace borders.',
    rating: 4.7,
    sales: '80+ ordered'
  },
  {
    id: 'own-9',
    name: 'Premium Pineapple Sunshine Swirl',
    pricePerKg: 700,
    image: 'https://ik.imagekit.io/3awt8gog6/img774.jpg?updatedAt=1779964644317',
    description: 'Moist golden vanilla cake layered with hand picked tropical pineapple pieces and smooth custard cream toppings.',
    rating: 4.8,
    sales: '150+ ordered'
  },
  {
    id: 'own-10',
    name: 'Decadent Dark Chocolate Truffle',
    pricePerKg: 900,
    image: 'https://ik.imagekit.io/3awt8gog6/img765.jpg?updatedAt=1779964644277',
    description: 'Rich dark Dutch cocoa chocolate cake soaked in moist fudge glaze, for ultimate chocolate aficionados.',
    isPopular: true,
    rating: 4.9,
    sales: '380+ ordered'
  },
  {
    id: 'own-11',
    name: 'Heavenly Vanilla Milky Drip',
    pricePerKg: 720,
    image: 'https://ik.imagekit.io/3awt8gog6/img752.jpg?updatedAt=1779964644325',
    description: 'Creamy vanilla base with smooth white chocolate glaze drip, finished with rainbow sprinkles of joy.',
    rating: 4.7,
    sales: '130+ ordered'
  },
  {
    id: 'own-12',
    name: 'Rose-Gulkand Fusion Splendor',
    pricePerKg: 850,
    image: 'https://ik.imagekit.io/3awt8gog6/img749.jpg?updatedAt=1779964644273',
    description: 'A traditional twist cake infused with real sweet gulkand (rose petal preserve) layers and fragrant rose milk frosting.',
    isNew: true,
    rating: 4.9,
    sales: '95+ ordered'
  },
  {
    id: 'own-13',
    name: 'Mocha Cappuccino Bliss',
    pricePerKg: 800,
    image: 'https://ik.imagekit.io/3awt8gog6/img813.jpg?updatedAt=1779964644323',
    description: 'Fresh coffee bean-infused frosting over soft chocolate-coffee sponge layers, sprinkled with fine cocoa dust.',
    rating: 4.6,
    sales: '75+ ordered'
  },
  {
    id: 'own-14',
    name: 'Sweet Cotton-Candy Pastel Crown',
    pricePerKg: 780,
    image: 'https://ik.imagekit.io/3awt8gog6/img716.jpg?updatedAt=1779964644247',
    description: 'Charming multi-colored pastel frosting waves, topped with fluffy cloud-like meringue kisses and magical sprinkles.',
    rating: 4.8,
    sales: '160+ ordered'
  },
  {
    id: 'own-15',
    name: 'Rasamalai Almond Infusion Royal',
    pricePerKg: 1000,
    image: 'https://ik.imagekit.io/3awt8gog6/img710.jpg?updatedAt=1779964644251',
    description: 'Our award-winning Indian fusion masterpiece featuring real rasamalai squeeze, pistachio slivers, and premium saffron cream.',
    isPopular: true,
    rating: 5.0,
    sales: '510+ ordered'
  },
  {
    id: 'own-16',
    name: 'Oreo Fudge & Whipped Harmony',
    pricePerKg: 800,
    image: 'https://ik.imagekit.io/3awt8gog6/img731.jpg?updatedAt=1779964644312',
    description: 'Crunchy crushed genuine Oreo chocolate cookies folded into silky white cream layers over rich milk chocolate sponge.',
    rating: 4.8,
    sales: '230+ ordered'
  },
  {
    id: 'own-17',
    name: 'Pink Rose Ribbon Anniversary Special',
    pricePerKg: 900,
    image: 'https://ik.imagekit.io/3awt8gog6/img746.jpg?updatedAt=1779964644221',
    description: 'A pristine white cream cake wrapped dynamically with elegant pink cream ribbons and rose petals, perfect for couples.',
    isNew: true,
    rating: 4.9,
    sales: 'Rose Classic'
  },
  {
    id: 'own-18',
    name: 'Elegant Pink Floral Cascade Celebration',
    pricePerKg: 820,
    image: 'https://ik.imagekit.io/3awt8gog6/img737.jpg?updatedAt=1779964644229',
    description: 'Glorious layered sponge adorned with cascading pink cream blossoms and golden sugar beads. Ideal for high-profile weddings and special milestones.',
    isPopular: true,
    rating: 4.9,
    sales: '145+ orders'
  },
  {
    id: 'own-19',
    name: 'Golden Butterscotch Ribbon Royal',
    pricePerKg: 760,
    image: 'https://ik.imagekit.io/3awt8gog6/img725.jpg?updatedAt=1779964644258',
    description: 'Rich brown sugar base covered in warm butterscotch buttercream ribbons and finished with soft praline crunch highlights.',
    rating: 4.8,
    sales: '95+ orders'
  },
  {
    id: 'own-20',
    name: 'Triple Chocolate Truffle Galaxy',
    pricePerKg: 920,
    image: 'https://ik.imagekit.io/3awt8gog6/img719.jpg?updatedAt=1779964644163',
    description: 'A deep, dark chocolate overload featuring liquid dark ganache core, milk chocolate stars, and white chocolate shavings.',
    isPopular: true,
    rating: 5.0,
    sales: '380+ orders'
  },
  {
    id: 'own-21',
    name: 'Premium Fruit & Nut Overload Gateau',
    pricePerKg: 880,
    image: 'https://ik.imagekit.io/3awt8gog6/img694.jpg?updatedAt=1779964644198',
    description: 'Fresh baked vanilla sponge loaded with dynamic candied cherries, kiwi, pineapple pieces, and premium roasted almond flakes.',
    rating: 4.7,
    sales: '110+ orders'
  },
  {
    id: 'own-22',
    name: 'Red Velvet White Chocolate Pearl',
    pricePerKg: 850,
    image: 'https://ik.imagekit.io/3awt8gog6/img701.jpg?updatedAt=1779964644184',
    description: 'Deep crimson cocoa cake layers matched perfectly with real cream cheese frosting and edible iridescent white chocolate pearls.',
    isNew: true,
    rating: 4.9,
    sales: 'New Favorite'
  },
  {
    id: 'own-23',
    name: 'Milky Way Caramel Drip Fantasy',
    pricePerKg: 790,
    image: 'https://ik.imagekit.io/3awt8gog6/img679.jpg?updatedAt=1779964644200',
    description: 'Scrumptious fresh vanilla cream sponge featuring heavy caramel drapes, hand-drawn cream flowers, and soft milk chocolate bars.',
    rating: 4.6,
    sales: '60+ orders'
  },
  {
    id: 'own-24',
    name: 'Fresh Mango Peach Sunrise Cake',
    pricePerKg: 750,
    image: 'https://ik.imagekit.io/3awt8gog6/img798.jpg?updatedAt=1779964644104',
    description: 'Light and airy chiffon cake with layered sweet Alphonso mango purée and fresh peach glaze, absolute summery masterpiece.',
    rating: 4.8,
    sales: '130+ orders'
  },
  {
    id: 'own-25',
    name: 'Royal Pistachio Saffron Kulfi Cake',
    pricePerKg: 980,
    image: 'https://ik.imagekit.io/3awt8gog6/img758.jpg?updatedAt=1779964644074',
    description: 'A luxurious Indian-style fusion cake with rich ground pistachio powder, real saffron milk frosting, and edible silver vark ornament.',
    isPopular: true,
    rating: 4.9,
    sales: '210+ orders'
  },
  {
    id: 'own-26',
    name: 'Double Decker Oreo Fudge Castle',
    pricePerKg: 860,
    image: 'https://ik.imagekit.io/3awt8gog6/img792.jpg?updatedAt=1779964644025',
    description: 'Twice the chocolate fun with two towering layers of dark cacao sponges, studded with premium crunchy oreos and white chocolate glaze.',
    rating: 4.8,
    sales: '185+ orders'
  },
  {
    id: 'own-27',
    name: 'Sweet Strawberry Hearts Romance',
    pricePerKg: 800,
    image: 'https://ik.imagekit.io/3awt8gog6/img786.jpg?updatedAt=1779964644013',
    description: 'Beautiful heart-themed pink strawberry confection with fresh fruit filling and playful buttercream heart swirls.',
    rating: 4.7,
    sales: '150+ orders'
  },
  {
    id: 'own-28',
    name: 'Hazelnut Praline Ganache Luxury',
    pricePerKg: 950,
    image: 'https://ik.imagekit.io/3awt8gog6/img789.jpg?updatedAt=1779964643936',
    description: 'Exquisite hazelnut paste swirled into silky dark chocolate ganache, decorated with toasted hazelnuts and waffle bits.',
    isPopular: true,
    rating: 5.0,
    sales: 'Baker Special'
  },
  {
    id: 'own-29',
    name: 'Celestial Blue Velvet Ombre',
    pricePerKg: 830,
    image: 'https://ik.imagekit.io/3awt8gog6/img783.jpg?updatedAt=1779964643900',
    description: 'Mindblowing deep blue velvet layers matching silky frosting waves resembling pristine ocean tides and sandy vanilla beach crumbs.',
    isNew: true,
    rating: 4.9,
    sales: 'New Sensation'
  },
  {
    id: 'own-30',
    name: 'Ultimate Black Forest Cherry Spike',
    pricePerKg: 780,
    image: 'https://ik.imagekit.io/3awt8gog6/img670.jpg?updatedAt=1779964643898',
    description: 'Fluffy chocolate sponge cake spiked with cherry juice, loaded with rich fresh whipped cream, sweet dark cherries and chocolate bark.',
    rating: 4.8,
    sales: '320+ orders'
  },
  {
    id: 'own-31',
    name: 'White Chocolate Butter Birthday Crown',
    pricePerKg: 750,
    image: 'https://ik.imagekit.io/3awt8gog6/img755.jpg?updatedAt=1779964643828',
    description: 'Classic high-density vanilla butter cake frosted with rich white chocolate curls and finished with warm cream dollops of bliss.',
    rating: 4.7,
    sales: '140+ orders'
  },
  {
    id: 'own-32',
    name: 'Rainbow Confetti Birthday Ribbon',
    pricePerKg: 740,
    image: 'https://ik.imagekit.io/3awt8gog6/img734.jpg?updatedAt=1779964643816',
    description: 'Fun, festive, and colorful original cake with baked-in edible rainbow sprinkles, smooth sweet milk frosting and joyful details.',
    rating: 4.9,
    sales: '410+ orders'
  },
  {
    id: 'own-33',
    name: 'Creamy Mocha Espresso Crunch',
    pricePerKg: 810,
    image: 'https://ik.imagekit.io/3awt8gog6/img673.jpg?updatedAt=1779964643857',
    description: 'Rich dark coffee-steeped chocolate sponge, filled with fresh espresso whipped cream and dusted with sweet caramelized coffee crunch.',
    rating: 4.8,
    sales: '90+ orders'
  },
  {
    id: 'own-34',
    name: 'Rose Petal Pistachio Delicacy',
    pricePerKg: 920,
    image: 'https://ik.imagekit.io/3awt8gog6/img704.jpg?updatedAt=1779964643780',
    description: 'Gourmet cardamom-spiced vanilla cake combined with traditional sweet rose syrup layers, premium chopped whole pistachios and fresh petals.',
    isPopular: true,
    rating: 4.9,
    sales: '180+ orders'
  },
  {
    id: 'own-35',
    name: 'Choco Vanilla Checkerboard Marvel',
    pricePerKg: 840,
    image: 'https://ik.imagekit.io/3awt8gog6/img816.jpg?updatedAt=1779964643775',
    description: 'Alternating square patterns of rich cocoa and premium vanilla cake, decorated with a gorgeous marble chocolate mirror glaze.',
    rating: 4.7,
    sales: '115+ orders'
  },
  {
    id: 'own-36',
    name: 'Butter Cream Rose Romance Special',
    pricePerKg: 880,
    image: 'https://ik.imagekit.io/3awt8gog6/img676.jpg?updatedAt=1779964643649',
    description: 'Elegant white buttercream base detailed with meticulously piped grand pink roses and luxurious sugar scrollwork.',
    isNew: true,
    rating: 4.9,
    sales: 'Just Added'
  },
  {
    id: 'own-37',
    name: 'Caramel Custard Toffee Dream',
    pricePerKg: 790,
    image: 'https://ik.imagekit.io/3awt8gog6/img682.jpg?updatedAt=1779964643490',
    description: 'Delicious dense vanilla cake layered with French style custard cream, topped with direct sweet buttery English toffee glaze.',
    rating: 4.6,
    sales: '75+ orders'
  },
  {
    id: 'own-38',
    name: 'Princess Royal Pearl Ribbon',
    pricePerKg: 890,
    image: 'https://ik.imagekit.io/3awt8gog6/img685.jpg?updatedAt=1779964643406',
    description: 'A highly elegant white-and-pink royal wedding style cake with elegant buttercream ribbon borders and beautiful sugar detailings.',
    isPopular: true,
    rating: 5.0,
    sales: '👑 VIP Classic'
  },
  {
    id: 'own-39',
    name: 'Blossoming Rose Butter Cream',
    pricePerKg: 820,
    image: 'https://ik.imagekit.io/3awt8gog6/img777.jpg?updatedAt=1779964643114',
    description: 'Generous levels of moist vanilla sponge styled elegantly with pink buttercream roses and magnificent frosting trim.',
    rating: 4.8,
    sales: '120+ ordered'
  },
  {
    id: 'own-40',
    name: 'Decadent Black Forest Cascade',
    pricePerKg: 780,
    image: 'https://ik.imagekit.io/3awt8gog6/img780.jpg?updatedAt=1779964643111',
    description: 'A classic rich German cocoa base, studded with premium chopped cherries and heavy Belgian chocolate curls.',
    rating: 4.7,
    sales: '185+ ordered'
  },
  {
    id: 'own-41',
    name: 'White Chocolate Pistachio Paradise',
    pricePerKg: 900,
    image: 'https://ik.imagekit.io/3awt8gog6/img771.jpg?updatedAt=1779964629931', // Using fallback since the original is sweet
    description: 'Mouth-watering fusion cake covered in white chocolate velvet, finished with rich premium pistachio details.',
    isPopular: true,
    rating: 4.9,
    sales: '90+ ordered'
  },
  {
    id: 'own-42',
    name: 'Fresh Strawberry Whipped Drizzle',
    pricePerKg: 750,
    image: 'https://ik.imagekit.io/3awt8gog6/img768.jpg?updatedAt=1779964642934',
    description: 'Soft butter chiffon cake filled with seasonal, handpicked strawberries and layered with ultra-fluffy fresh vanilla whip.',
    rating: 4.6,
    sales: '110+ ordered'
  },
  {
    id: 'own-43',
    name: 'Rich Dark Truffle Celebration',
    pricePerKg: 950,
    image: 'https://ik.imagekit.io/3awt8gog6/img707.jpg?updatedAt=1779964642843',
    description: 'Pure liquid chocolate indulgence, enrobed in a dense, dark chocolate ganache glaze fit for ultimate cacao lovers.',
    isPopular: true,
    rating: 4.9,
    sales: '320+ ordered'
  },
  {
    id: 'own-44',
    name: 'Mango Vanilla Dream Swirl',
    pricePerKg: 760,
    image: 'https://ik.imagekit.io/3awt8gog6/img740.jpg?updatedAt=1779964642770',
    description: 'Delectable summer cream swirls infused with hand-pressed sweet Alphonso mango layers on a fluffy vanilla sponge base.',
    rating: 4.8,
    sales: '130+ ordered'
  },
  {
    id: 'own-45',
    name: 'Golden Caramel Crunch Feast',
    pricePerKg: 780,
    image: 'https://ik.imagekit.io/3awt8gog6/img691.jpg?updatedAt=1779964642699',
    description: 'Traditional butterscotch crunch cake layered with handcrafted warm caramel cream and golden praline sprinkles.',
    rating: 4.7,
    sales: '155+ ordered'
  },
  {
    id: 'own-46',
    name: 'Creamy Red Velvet Pearl',
    pricePerKg: 850,
    image: 'https://ik.imagekit.io/3awt8gog6/img667.jpg?updatedAt=1779964642619',
    description: 'Vibrant cocoa-infused red velvet crumb layered on a base of sweet cream cheese frosting and decorative pearly beads.',
    isNew: true,
    rating: 4.9,
    sales: 'Fresh Launch'
  },
  {
    id: 'own-47',
    name: 'Double Fudge Brownie Magic',
    pricePerKg: 920,
    image: 'https://ik.imagekit.io/3awt8gog6/img743.jpg?updatedAt=1779964642585',
    description: 'Two dense chocolate layers holding rich, chewy chocolate brownies inside, topped with liquid fudge and chocolate chips.',
    isPopular: true,
    rating: 5.0,
    sales: '410+ ordered'
  },
  {
    id: 'own-48',
    name: 'Vanilla Blueberries Delight',
    pricePerKg: 790,
    image: 'https://ik.imagekit.io/3awt8gog6/img728.jpg?updatedAt=1779964642535',
    description: 'Beautiful white vanilla cream sponge layered with tart whole blueberries and smooth light confectionery glaze.',
    rating: 4.7,
    sales: '85+ ordered'
  },
  {
    id: 'own-49',
    name: 'Exquisite Coffee Macchiato Ribbon',
    pricePerKg: 880,
    image: 'https://ik.imagekit.io/3awt8gog6/img661.jpg?updatedAt=1779964642516',
    description: 'Bold espresso-infused butter cream piped beautifully over rich, custom mocha-infused celebration layers.',
    rating: 4.8,
    sales: '95+ ordered'
  },
  {
    id: 'own-50',
    name: 'Fancy Buttercream Blossom Heart',
    pricePerKg: 850,
    image: 'https://ik.imagekit.io/3awt8gog6/img722.jpg?updatedAt=1779964642370',
    description: 'Delightful pink and red floral details crafted on an elegant heart-shaped sponge of spectacular sweetness.',
    isNew: true,
    rating: 4.9,
    sales: 'Hearts Special'
  },
  {
    id: 'own-51',
    name: 'Choco KitKat Crown Special',
    pricePerKg: 940,
    image: 'https://ik.imagekit.io/3awt8gog6/img688.jpg?updatedAt=1779964642283',
    description: 'Heavy chocolate fudge center held securely by full-sized crispy KitKat wafer bars and golden chocolate details.',
    isPopular: true,
    rating: 5.0,
    sales: '390+ ordered'
  },
  {
    id: 'own-52',
    name: 'Milky White Forest Carnival',
    pricePerKg: 800,
    image: 'https://ik.imagekit.io/3awt8gog6/img658.jpg?updatedAt=1779964642246',
    description: 'Soft sponge loaded with sweet white chocolate shavings, fluffy whipped icing, and candied red cherries.',
    rating: 4.7,
    sales: '120+ ordered'
  },
  {
    id: 'own-53',
    name: 'Vanilla Custard Toffee Temptation',
    pricePerKg: 740,
    image: 'https://ik.imagekit.io/3awt8gog6/img640.jpg?updatedAt=1779964641009',
    description: 'Creamy custard layers nestled between moist vanilla sponge, drizzled with sweet English butter-toffee sauce.',
    rating: 4.6,
    sales: '70+ ordered'
  },
  {
    id: 'own-54',
    name: 'Heavenly Rasamalai Almond Royal',
    pricePerKg: 1000,
    image: 'https://ik.imagekit.io/3awt8gog6/img646.jpg?updatedAt=1779964640758',
    description: 'Our award-winning Indian fusion cake made with fresh rasamalai squeezes, premium roasted almond slivers and cardamom cream.',
    isPopular: true,
    rating: 5.0,
    sales: '670+ ordered'
  },
  {
    id: 'own-55',
    name: 'Tropical Pineapple Sunshine Glow',
    pricePerKg: 720,
    image: 'https://ik.imagekit.io/3awt8gog6/img652.jpg?updatedAt=1779964639955',
    description: 'Vibrant golden pineapple chunks tucked inside a fluffy vanilla cream cake, finished with hand-pulled cream swirls.',
    rating: 4.8,
    sales: '180+ ordered'
  },
  {
    id: 'own-56',
    name: 'Pink Fairy Princess Crown',
    pricePerKg: 860,
    image: 'https://ik.imagekit.io/3awt8gog6/img571.jpg?updatedAt=1779964639481',
    description: 'Majestic princess theme cake highlighted with exquisite pink buttercream ribbons, lace and delicate edible silver dust.',
    isNew: true,
    rating: 4.9,
    sales: 'Royal Choice'
  },
  {
    id: 'own-57',
    name: 'Premium Hazelnut Fudge Symphony',
    pricePerKg: 960,
    image: 'https://ik.imagekit.io/3awt8gog6/img655.jpg?updatedAt=1779964639350',
    description: 'Luxurious dark cocoa sponge filled with fresh hazelnut praline paste, topped with chocolate curls and dark truffles.',
    isPopular: true,
    rating: 5.0,
    sales: '230+ ordered'
  },
  {
    id: 'own-58',
    name: 'Choco Butterscotch Harmony',
    pricePerKg: 780,
    image: 'https://ik.imagekit.io/3awt8gog6/img664.jpg?updatedAt=1779964639268',
    description: 'An elegant split cake with dual layers of velvety chocolate truffle and sweet crunchy butterscotch cream.',
    rating: 4.7,
    sales: '145+ ordered'
  },
  {
    id: 'own-59',
    name: 'Delicate Rose-Gulkand Fusion',
    pricePerKg: 880,
    image: 'https://ik.imagekit.io/3awt8gog6/img574.jpg?updatedAt=1779964638832',
    description: 'Sweet homemade rose petal jam swirled with real rose-infused white chocolate cream on a light vanilla base.',
    rating: 4.9,
    isPopular: true,
    sales: '160+ ordered'
  },
  {
    id: 'own-60',
    name: 'Chocolate Oreo Cookie Blast',
    pricePerKg: 820,
    image: 'https://ik.imagekit.io/3awt8gog6/img612.jpg?updatedAt=1779964638766',
    description: 'Generous layers of premium dark cocoa sponge, filled and iced with cookie-crumble Oreo-infused white buttercream.',
    rating: 4.8,
    sales: '210+ ordered'
  },
  {
    id: 'own-61',
    name: 'Blueberry Cream Swirl Jubilee',
    pricePerKg: 800,
    image: 'https://ik.imagekit.io/3awt8gog6/img649.jpg?updatedAt=1779964638666',
    description: 'Fascinating blue glaze swirls made over a premium blueberry-loaded double layer cake of magnificent style.',
    rating: 4.7,
    sales: '95+ ordered'
  },
  {
    id: 'own-62',
    name: 'Sweet Pink Blossom Anniversary',
    pricePerKg: 890,
    image: 'https://ik.imagekit.io/3awt8gog6/img636.jpg?updatedAt=1779964638451',
    description: 'Stunning anniversary special cake coated with pink cream waves and highlighted with handcrafted ribbon-work.',
    isPopular: true,
    rating: 4.9,
    sales: '180+ ordered'
  },
  {
    id: 'own-63',
    name: 'Espresso Mocha Fudge Star',
    pricePerKg: 830,
    image: 'https://ik.imagekit.io/3awt8gog6/img633.jpg?updatedAt=1779964638393',
    description: 'Sophisticated dark chocolate cake steeped in roasted espresso beans, layered with creamy milk chocolate glaze.',
    rating: 4.8,
    sales: '75+ ordered'
  },
  {
    id: 'own-64',
    name: 'English Caramel Drizzle Castle',
    pricePerKg: 810,
    image: 'https://ik.imagekit.io/3awt8gog6/img624.jpg?updatedAt=1779964638372',
    description: 'Soft butter biscuit crumble base layered with dense white chocolate fudge and luscious warm English caramel drizzle.',
    rating: 4.7,
    sales: '80+ ordered'
  },
  {
    id: 'own-65',
    name: 'Exquisite Rose Petal Lace',
    pricePerKg: 870,
    image: 'https://ik.imagekit.io/3awt8gog6/img615.jpg?updatedAt=1779964637509',
    description: 'A romantic masterpiece cake with dynamic hand-piped buttercream lace borders and organic fragrant rose petals.',
    isNew: true,
    rating: 4.9,
    sales: 'New Delight'
  },
  {
    id: 'own-66',
    name: 'Double Dark Ganache Splendor',
    pricePerKg: 950,
    image: 'https://ik.imagekit.io/3awt8gog6/img630.jpg?updatedAt=1779964636938',
    description: 'Ultra luxurious chocolate cake flooded with signature 70% dark Belgian cocoa ganache and beautiful chocolate bark.',
    isPopular: true,
    rating: 5.0,
    sales: '320+ ordered'
  },
  {
    id: 'own-67',
    name: 'Milky Caramel Macadamia Dream',
    pricePerKg: 890,
    image: 'https://ik.imagekit.io/3awt8gog6/img627.jpg?updatedAt=1779964636854',
    description: 'Delicious vanilla buttercream cake combined with whole roasted macadamia nuts and heavy golden caramel drippings.',
    rating: 4.8,
    sales: '110+ ordered'
  },
  {
    id: 'own-61-alt',
    name: 'White Chocolate Berry Frost',
    pricePerKg: 820,
    image: 'https://ik.imagekit.io/3awt8gog6/img621.jpg?updatedAt=1779964636768',
    description: 'A chilly berry masterpiece with layers of moist white chocolate sponge covered in mixed berry buttercream ripples.',
    rating: 4.7,
    sales: '90+ ordered'
  },
  {
    id: 'own-68',
    name: 'Fairy Dust Sparkle Buttercream',
    pricePerKg: 760,
    image: 'https://ik.imagekit.io/3awt8gog6/img581.jpg?updatedAt=1779964636532',
    description: 'Enchanting colorful cream cake topped with magical edible sparkles and white chocolate crown stars.',
    rating: 4.8,
    sales: '130+ ordered'
  },
  {
    id: 'own-69',
    name: 'Classic Pineapple Cherished Crown',
    pricePerKg: 740,
    image: 'https://ik.imagekit.io/3awt8gog6/img618.jpg?updatedAt=1779964636233',
    description: 'Light sponge cake covered in rich whipped cream, with elegant glazed pineapple slices and candied cherries.',
    rating: 4.7,
    sales: '150+ ordered'
  },
  {
    id: 'own-70',
    name: 'Moist Red Velvet Symphony',
    pricePerKg: 860,
    image: 'https://ik.imagekit.io/3awt8gog6/img578.jpg?updatedAt=1779964636086',
    description: 'Rich velvet red cocoa base filled with handcrafted premium cream cheese and coated with chocolate curls.',
    isPopular: true,
    rating: 4.9,
    sales: '240+ ordered'
  },
  {
    id: 'own-71',
    name: 'Sweet Strawberry Dream Lace',
    pricePerKg: 780,
    image: 'https://ik.imagekit.io/3awt8gog6/img643.jpg?updatedAt=1779964636063',
    description: 'Delicate cream lace detail around our flagship summer strawberry cake made with premium strawberry whip.',
    rating: 4.8,
    sales: '165+ ordered'
  },
  {
    id: 'own-72',
    name: 'Decadent Fudge Cookie Heaven',
    pricePerKg: 880,
    image: 'https://ik.imagekit.io/3awt8gog6/img553.jpg?updatedAt=1779964635381',
    description: 'Rich cookies-and-cream cake loaded with sweet homemade fudge pieces and crunchy butter cookie toppings.',
    isPopular: true,
    rating: 4.9,
    sales: '280+ ordered'
  },
  {
    id: 'own-73',
    name: 'Rich Butterscotch Praline Wave',
    pricePerKg: 770,
    image: 'https://ik.imagekit.io/3awt8gog6/img603.jpg?updatedAt=1779964635342',
    description: 'Traditional butterscotch cake decorated with soft cream ribbons and elegant caramelized praline waves.',
    rating: 4.8,
    sales: '140+ ordered'
  },
  {
    id: 'own-74',
    name: 'Heavenly Mango Velvet Sunrise',
    pricePerKg: 800,
    image: 'https://ik.imagekit.io/3awt8gog6/img562.jpg?updatedAt=1779964634234',
    description: 'Moist golden mango sponge filled with sweet mango purée and elegant dual-tone vanilla-mango cream.',
    isNew: true,
    rating: 4.9,
    sales: 'Summer Classic'
  },
  {
    id: 'own-75',
    name: 'Almond Saffron Royal Delight',
    pricePerKg: 980,
    image: 'https://ik.imagekit.io/3awt8gog6/img606.jpg?updatedAt=1779964633576',
    description: 'A traditional Indian recipe made with real milk saffron extract, layered with crunchy almond sprinkles.',
    isPopular: true,
    rating: 4.9,
    sales: '320+ ordered'
  },
  {
    id: 'own-76',
    name: 'Oreo Velvet Drip Special',
    pricePerKg: 840,
    image: 'https://ik.imagekit.io/3awt8gog6/img609.jpg?updatedAt=1779964633521',
    description: 'Creamy high-contrast cake highlighting a dynamic chocolate glaze drip and whole crunchy Oreo biscuits.',
    rating: 4.7,
    sales: '185+ ordered'
  },
  {
    id: 'own-77',
    name: 'Romantic Pink Rose Wedding Special',
    pricePerKg: 920,
    image: 'https://ik.imagekit.io/3awt8gog6/img568.jpg?updatedAt=1779964632972',
    description: 'Extremely stunning design layered in pink buttercream roses, satin cream ribbon detail and silver sugar pearls.',
    isPopular: true,
    rating: 5.0,
    sales: 'Perfect Couple'
  },
  {
    id: 'own-78',
    name: 'Dark Forest Caramel Symphony',
    pricePerKg: 850,
    image: 'https://ik.imagekit.io/3awt8gog6/img565.jpg?updatedAt=1779964632593',
    description: 'Dual layer of rich dark chocolate sponge soaked in warm caramel syrup and coated in chocolate shavings.',
    rating: 4.8,
    sales: '130+ ordered'
  },
  {
    id: 'own-79',
    name: 'White Chocolate Pearl Ribbon',
    pricePerKg: 890,
    image: 'https://ik.imagekit.io/3awt8gog6/img597.jpg?updatedAt=1779964632529',
    description: 'Pristine white buttercream cake wrapped with pink chocolate curls and adorned with shiny edible sugar pearls.',
    rating: 4.9,
    sales: '190+ ordered'
  },
  {
    id: 'own-80',
    name: 'Vanilla Sprinkles Birthday Pop',
    pricePerKg: 700,
    image: 'https://ik.imagekit.io/3awt8gog6/img590.jpg?updatedAt=1779964631903',
    description: 'Classic high-density vanilla butter cake frosted in rich white cream and loaded with colorful sprinkles of joy.',
    rating: 4.7,
    sales: '380+ ordered'
  },
  {
    id: 'own-81',
    name: 'Cappuccino Chocolate Crunch',
    pricePerKg: 820,
    image: 'https://ik.imagekit.io/3awt8gog6/img600.jpg?updatedAt=1779964631914',
    description: 'Delicious coffee-infused sponge layers filled with sweet cocoa buttercream and chocolate waffle flakes.',
    rating: 4.8,
    sales: '105+ ordered'
  },
  {
    id: 'own-82',
    name: 'Sweet Rose Cupcake Flower Tree',
    pricePerKg: 780,
    image: 'https://ik.imagekit.io/3awt8gog6/img559.jpg?updatedAt=1779964631759',
    description: 'Decorated vanilla cake designed visually to resemble a flourishing tree of pink buttercream rosebuds.',
    rating: 4.7,
    sales: '85+ ordered'
  },
  {
    id: 'own-83',
    name: 'Pistachio Almond Royal Crown',
    pricePerKg: 960,
    image: 'https://ik.imagekit.io/3awt8gog6/img541.jpg?updatedAt=1779964631588',
    description: 'Artisanal Indian fusion cake loaded with pistachio dust, toasted almond flakes, and fragrant cardamon cream.',
    isPopular: true,
    rating: 4.9,
    sales: '240+ ordered'
  },
  {
    id: 'own-84',
    name: 'Creamy Blueberry Velvet Dream',
    pricePerKg: 810,
    image: 'https://ik.imagekit.io/3awt8gog6/img584.jpg?updatedAt=1779964631515',
    description: 'A luscious velvet cream cake loaded with real premium blueberry preserve, white chocolate curls, and blueberries.',
    rating: 4.8,
    sales: '125+ ordered'
  },
  {
    id: 'own-85',
    name: 'Fresh Cherry Vanilla Splash',
    pricePerKg: 750,
    image: 'https://ik.imagekit.io/3awt8gog6/img587.jpg?updatedAt=1779964631428',
    description: 'Delightful vanilla sponge cake loaded with whipped white cream, candied glazed red cherries, and sprinkles.',
    rating: 4.6,
    sales: '90+ ordered'
  },
  {
    id: 'own-86',
    name: 'Decadent Fudge Truffle Master',
    pricePerKg: 930,
    image: 'https://ik.imagekit.io/3awt8gog6/img547.jpg?updatedAt=1779964631473',
    description: 'Ultra dark double chocolate cake with chocolate ganache frosting and solid chocolate truffle decorations.',
    isPopular: true,
    rating: 5.0,
    sales: '510+ ordered'
  },
  {
    id: 'own-87',
    name: 'Princess Pink Ribbon Celebration',
    pricePerKg: 870,
    image: 'https://ik.imagekit.io/3awt8gog6/img556.jpg?updatedAt=1779964631421',
    description: 'Elegant white-coated vanilla butter cake decorated with edible pink ribbon banners and sugar blossom roses.',
    isNew: true,
    rating: 4.9,
    sales: 'Royal Elegant'
  },
  {
    id: 'own-88',
    name: 'Double Chocolate Hazelnut Fantasy',
    pricePerKg: 950,
    image: 'https://ik.imagekit.io/3awt8gog6/img594.jpg?updatedAt=1779964630577',
    description: 'Decadent dark chocolate layers stuffed with rich Nutella hazelnut paste and crispy roasted hazelnut crunch.',
    isPopular: true,
    rating: 4.9,
    sales: '360+ ordered'
  },
  {
    id: 'own-89',
    name: 'Sun-kissed Golden Peach Chiffon',
    pricePerKg: 760,
    image: 'https://ik.imagekit.io/3awt8gog6/img535.jpg?updatedAt=1779964630574',
    description: 'Luminous light chiffon cake with layered tropical peach elements and refreshing low-fat cream toppings.',
    rating: 4.7,
    sales: '115+ ordered'
  },
  {
    id: 'own-90',
    name: 'Sweet Gulkand Milky Ripple',
    pricePerKg: 860,
    image: 'https://ik.imagekit.io/3awt8gog6/img532.jpg?updatedAt=1779964630500',
    description: 'A fragrant fusion sweet dessert cake featuring authentic sweet gulkand preserve and vanilla cream layers.',
    rating: 4.8,
    sales: '100+ ordered'
  },
  {
    id: 'own-91',
    name: 'Premium Black Forest Treasure',
    pricePerKg: 800,
    image: 'https://ik.imagekit.io/0boxn146f/ChatGPT%20Image%20May%2023,%202026,%2012_30_49%20PM.png?updatedAt=1779519672214',
    description: 'Classic chocolate celebration cake styled with dense sweet cherries, fresh dairy cream, and pure chocolate shavings.',
    rating: 4.8,
    sales: '235+ ordered'
  },
  {
    id: 'own-92',
    name: 'Caramel Sea-Salt Velvet Drip',
    pricePerKg: 830,
    image: 'https://ik.imagekit.io/3awt8gog6/img550.jpg?updatedAt=1779964630365',
    description: 'Scrumptious sweet-salty glaze dripping over a magnificent vanilla-caramel whipped cake of superb quality.',
    rating: 4.7,
    sales: '140+ ordered'
  },
  {
    id: 'own-93',
    name: 'Heavenly Rasamalai Pistachio Saffron',
    pricePerKg: 1000,
    image: 'https://ik.imagekit.io/3awt8gog6/img526.jpg?updatedAt=1779964630182',
    description: 'Rich luxurious saffron milk-soaked layers with freshly squeezed Rasamalai and fine crushed premium pistachios.',
    isPopular: true,
    rating: 5.0,
    sales: '420+ ordered'
  },
  {
    id: 'own-94',
    name: 'Elegant Pink Rose Spray Anniversary',
    pricePerKg: 910,
    image: 'https://ik.imagekit.io/3awt8gog6/img529.jpg?updatedAt=1779964630093',
    description: 'Charming pure white celebration cake decorated with pink buttercream flowers and elegant scroll details.',
    rating: 4.9,
    sales: '150+ ordered'
  },
  {
    id: 'own-95',
    name: 'Royal Vanilla Milky Pearl Garland',
    pricePerKg: 790,
    image: 'https://ik.imagekit.io/3awt8gog6/img538.jpg?updatedAt=1779964629931',
    description: 'Double vanilla cream cake beautifully wrapped in sugar pearls and finished with moist buttercream droplets.',
    rating: 4.8,
    sales: '160+ ordered'
  },
  {
    id: 'own-96',
    name: 'Princess Crown Cake Splendor',
    pricePerKg: 890,
    image: 'https://ik.imagekit.io/3awt8gog6/img513.jpg?updatedAt=1779964629935',
    description: 'Breathtaking fairy princess castle cake adorned with elegant custom-piped pastel ribbons and pink buttercream pearls.',
    isPopular: true,
    rating: 5.0,
    sales: '👑 VIP Top Seller'
  },
  {
    id: 'own-97',
    name: 'Golden Caramel Ribbon Fudge',
    pricePerKg: 820,
    image: 'https://ik.imagekit.io/3awt8gog6/img517.jpg?updatedAt=1779964629884',
    description: 'Delectable layers of golden butterscotch sponge with vanilla ganache swirls and heavy caramel drip.',
    rating: 4.8,
    sales: '145+ ordered'
  },
  {
    id: 'own-98',
    name: 'Rich Almond Kulfi Fusion',
    pricePerKg: 950,
    image: 'https://ik.imagekit.io/3awt8gog6/img523.jpg?updatedAt=1779964629402',
    description: 'Rich Indian-inspired kulfi cream layer cake baked with premium crushed almonds, saffron oil, and green cardamom flakes.',
    isPopular: true,
    rating: 4.9,
    sales: 'Baker Special'
  },
  {
    id: 'own-99',
    name: 'Royal Saffron Milky Gateau',
    pricePerKg: 990,
    image: 'https://ik.imagekit.io/3awt8gog6/img520.jpg?updatedAt=1779964629383',
    description: 'Elegant Indian heritage cake prepared with fresh thick saffron milk layerings, milk cake bits, and silver decorations.',
    rating: 5.0,
    sales: '210+ ordered'
  },
  {
    id: 'own-100',
    name: 'Chocolate Truffle Cherry Splash',
    pricePerKg: 830,
    image: 'https://ik.imagekit.io/3awt8gog6/img456.jpg?updatedAt=1779964627562',
    description: 'Mouthwatering combination of liquid 70% dark chocolate fudge and sweet glazed red cherry slices inside soft sponges.',
    rating: 4.8,
    sales: '190+ ordered'
  },
  {
    id: 'own-101',
    name: 'Pink Floral Buttercream Dream',
    pricePerKg: 800,
    image: 'https://ik.imagekit.io/3awt8gog6/img459.jpg?updatedAt=1779964627529',
    description: 'Gorgeously simple signature style with meticulously piped elegant pink roses on a delicious classic vanilla butter base.',
    isNew: true,
    rating: 4.9,
    sales: 'Just Launched'
  },
  {
    id: 'own-102',
    name: 'Premium Caramel Biscuit Crunch',
    pricePerKg: 810,
    image: 'https://ik.imagekit.io/3awt8gog6/img510.jpg?updatedAt=1779964627569',
    description: 'Decadent buttery layers filled with authentic English caramel sauce and Lotus biscoff-style dark crumble crusts.',
    rating: 4.7,
    sales: '95+ ordered'
  },
  {
    id: 'own-103',
    name: 'Decadent Red Velvet Cheese Crown',
    pricePerKg: 860,
    image: 'https://ik.imagekit.io/3awt8gog6/img504.jpg?updatedAt=1779964627458',
    description: 'Striking rich red cocoa velvet layers containing premium, sweet-salt whipped cream cheese frosting.',
    isPopular: true,
    rating: 4.9,
    sales: 'Trending Now'
  },
  {
    id: 'own-104',
    name: 'Sweet Mango Pistachio Sunrise',
    pricePerKg: 790,
    image: 'https://ik.imagekit.io/3awt8gog6/img428.jpg?updatedAt=1779964627385',
    description: 'Summery fresh Alphonso mango purée whipped beautifully with light vanilla cream and sprinkled with green pistachios.',
    rating: 4.8,
    sales: '115+ ordered'
  },
  {
    id: 'own-105',
    name: 'Romantic Rose Whipped Romance',
    pricePerKg: 840,
    image: 'https://ik.imagekit.io/3awt8gog6/img379.jpg?updatedAt=1779964627422',
    description: 'A delicate rosewater-infused chiffon sponge layered with whipped rose frosting and beautiful organic pink petal dust.',
    rating: 4.7,
    sales: '140+ ordered'
  },
  {
    id: 'own-106',
    name: 'White Chocolate Blueberry Forest',
    pricePerKg: 810,
    image: 'https://ik.imagekit.io/3awt8gog6/img419.jpg?updatedAt=1779964627319',
    description: 'Light vanilla cake filled with sweet premium blueberry chunks and covered recursively with white chocolate shavings.',
    rating: 4.7,
    sales: '130+ ordered'
  },
  {
    id: 'own-107',
    name: 'Double Decker Oreo Crumble',
    pricePerKg: 850,
    image: 'https://ik.imagekit.io/3awt8gog6/img471.jpg?updatedAt=1779964627007',
    description: 'A spectacular towering chocolate cake layered with crunchy sweet cookie frostings and decorated with full chocolate Oreos.',
    isPopular: true,
    rating: 4.9,
    sales: 'Party Classic'
  },
  {
    id: 'own-108',
    name: 'English Custard Caramel Ribbon',
    pricePerKg: 760,
    image: 'https://ik.imagekit.io/3awt8gog6/img413.jpg?updatedAt=1779964626740',
    description: 'Traditional home baked yellow sponge layered with smooth custard cream and hand-dripped rich golden toffee.',
    rating: 4.6,
    sales: '85+ ordered'
  },
  {
    id: 'own-109',
    name: 'Fresh Strawberry Chiffon Bliss',
    pricePerKg: 790,
    image: 'https://ik.imagekit.io/3awt8gog6/img425.jpg?updatedAt=1779964626647',
    description: 'Soft-as-air chiffon cake with generous strawberry-infused buttercream, layered beautifully with strawberry purée.',
    rating: 4.8,
    sales: '160+ ordered'
  },
  {
    id: 'own-110',
    name: 'Heavenly Cappuccino Nut Fudge',
    pricePerKg: 930,
    image: 'https://ik.imagekit.io/3awt8gog6/img443.jpg?updatedAt=1779964626624',
    description: 'Espresso-drenched dark cacao sponges filled with rich roasted hazelnut filling and silky smooth coffee fudge ripples.',
    isPopular: true,
    rating: 4.9,
    sales: 'Top Rated'
  },
  {
    id: 'own-111',
    name: 'Milky White Chocolate Cascade',
    pricePerKg: 820,
    image: 'https://ik.imagekit.io/3awt8gog6/img507.jpg?updatedAt=1779964626574',
    description: 'Stunning double layer vanilla cake drizzled seamlessly with liquid white chocolate glaze and sweet whipped cream blooms.',
    rating: 4.8,
    sales: '125+ ordered'
  },
  {
    id: 'own-112',
    name: 'Triple Cocoa Velvet Symphony',
    pricePerKg: 880,
    image: 'https://ik.imagekit.io/3awt8gog6/img495.jpg?updatedAt=1779964626559',
    description: 'Luxuriously structured triple layered dark cocoa cake with white cocoa and milk chocolate star drapes.',
    isNew: true,
    rating: 4.9,
    sales: 'New Sensation'
  },
  {
    id: 'own-113',
    name: 'Sweet Gulkand Saffron Wonder',
    pricePerKg: 890,
    image: 'https://ik.imagekit.io/3awt8gog6/img434.jpg?updatedAt=1779964626584',
    description: 'Fragrant sweet gulkand cake with a luxurious saffron milk coating, celebrating traditional sweet heritage.',
    rating: 4.8,
    sales: '90+ ordered'
  },
  {
    id: 'own-114',
    name: 'Colorful Confetti Sparkle Feast',
    pricePerKg: 740,
    image: 'https://ik.imagekit.io/3awt8gog6/img437.jpg?updatedAt=1779964626561',
    description: 'Extremely sweet and fun cake with baked-in edible rainbow sprinkles, smooth white chocolate cream, and sprinkles.',
    rating: 4.7,
    sales: '320+ ordered'
  },
  {
    id: 'own-115',
    name: 'Princess Pink Lace Deluxe',
    pricePerKg: 870,
    image: 'https://ik.imagekit.io/3awt8gog6/img401.jpg?updatedAt=1779964626507',
    description: 'Exquisitely crafted cake showing hand-detailed pink buttercream lace panels and silver confectionery beads.',
    isNew: true,
    rating: 4.9,
    sales: '👑 Elegant Choice'
  },
  {
    id: 'own-116',
    name: 'Mocha Espresso Crunch Delight',
    pricePerKg: 830,
    image: 'https://ik.imagekit.io/3awt8gog6/img440.jpg?updatedAt=1779964626515',
    description: 'Delicious mocha-infused luxury cake highlighting fresh ground coffee cream layers and crunchy caramelized praline toppings.',
    rating: 4.8,
    sales: '110+ ordered'
  },
  {
    id: 'own-117',
    name: 'Black Forest Cherry Spike Deluxe',
    pricePerKg: 790,
    image: 'https://ik.imagekit.io/3awt8gog6/img486.jpg?updatedAt=1779964626464',
    description: 'Flagship moist cocoa sponge loaded with dark cherries, fresh whipped white cream, and chocolate flakes.',
    rating: 4.8,
    sales: '410+ ordered'
  },
  {
    id: 'own-118',
    name: 'Golden Butterscotch Ribbon Classic',
    pricePerKg: 780,
    image: 'https://ik.imagekit.io/3awt8gog6/img388.jpg?updatedAt=1779964626501',
    description: 'Sweet simple butterscotch sponge with handcrafted brown sugar buttercream ribbons and caramelized nuts.',
    rating: 4.7,
    sales: '180+ ordered'
  },
  {
    id: 'own-119',
    name: 'Pistachio Almond Royal Ribbon',
    pricePerKg: 940,
    image: 'https://ik.imagekit.io/3awt8gog6/img416.jpg?updatedAt=1779964626428',
    description: 'Royal Indian style dessert cake with crushed green pistachios, whole slivered almonds, and sweet cardamom syrup.',
    isPopular: true,
    rating: 5.0,
    sales: 'Baker Favorite'
  },
  {
    id: 'own-120',
    name: 'Fresh Mango Peach Chiffon',
    pricePerKg: 770,
    image: 'https://ik.imagekit.io/3awt8gog6/img334.jpg?updatedAt=1779964626320',
    description: 'Varnished double vanilla chiffon containing premium organic yellow peaches and fresh summer mango layers.',
    rating: 4.7,
    sales: '150+ ordered'
  },
  {
    id: 'own-121',
    name: 'White Chocolate Butter Pearl',
    pricePerKg: 780,
    image: 'https://ik.imagekit.io/3awt8gog6/img391.jpg?updatedAt=1779964626227',
    description: 'Dense rich butter cake with whipped cream, shiny edible white chocolate pearls, and warm sugary drips.',
    rating: 4.8,
    sales: '120+ ordered'
  },
  {
    id: 'own-122',
    name: 'Dark Truffle Fudge Master',
    pricePerKg: 950,
    image: 'https://ik.imagekit.io/3awt8gog6/img370.jpg?updatedAt=1779964626197',
    description: 'Decadent, rich dark chocolate fudge slice covered recursively in 70% dark Belgian cocoa mirror glaze.',
    isPopular: true,
    rating: 5.0,
    sales: '720+ ordered'
  },
  {
    id: 'own-123',
    name: 'Sweet Buttercream Rose Anniversary',
    pricePerKg: 880,
    image: 'https://ik.imagekit.io/3awt8gog6/img343.jpg?updatedAt=1779964626234',
    description: 'Elegant white buttercream base detailed with meticulously piped grand pink roses and luxurious sugar scrolls.',
    isNew: true,
    rating: 4.9,
    sales: 'Best Seller'
  },
  {
    id: 'own-124',
    name: 'English Caramel Toffee Dream',
    pricePerKg: 810,
    image: 'https://ik.imagekit.io/3awt8gog6/img340.jpg?updatedAt=1779964626146',
    description: 'Scrumptious buttery cake with French style vanilla custard cores and exquisite warm english toffee details.',
    rating: 4.8,
    sales: '95+ ordered'
  },
  {
    id: 'own-125',
    name: 'Rasamalai Cardamom Pearl',
    pricePerKg: 1000,
    image: 'https://ik.imagekit.io/3awt8gog6/img501.jpg?updatedAt=1779964626070',
    description: 'Saffron cream-soaked vanilla sponge loaded with juicy organic rasamalai chunks and cardamom flavorings.',
    isPopular: true,
    rating: 5.0,
    sales: '👑 Elite Signature'
  },
  {
    id: 'own-126',
    name: 'Double Hazelnut Fudge Dream',
    pricePerKg: 960,
    image: 'https://ik.imagekit.io/3awt8gog6/img498.jpg?updatedAt=1779964625956',
    description: 'Incredible dual-deck chocolate cake with roasted hazelnuts, authentic nutella layers and liquid fudge toppings.',
    rating: 4.9,
    sales: '230+ ordered'
  },
  {
    id: 'own-127',
    name: 'Velvet Rose Petal Delicacy',
    pricePerKg: 890,
    image: 'https://ik.imagekit.io/3awt8gog6/img492.jpg?updatedAt=1779964625946',
    description: 'Luxuriously fragrant sweet cake containing organic rose syrup, rose jam, and chopped sweet crunchy pistachios.',
    isNew: true,
    rating: 4.9,
    sales: 'New Trend'
  },
  {
    id: 'own-128',
    name: 'Dark Forest Mirror Glaze',
    pricePerKg: 820,
    image: 'https://ik.imagekit.io/3awt8gog6/img446.jpg?updatedAt=1779964625823',
    description: 'Elegant chocolate cake showcasing a glossy dark cocoa mirror glaze, rich fresh cream, and candied cherries.',
    rating: 4.8,
    sales: '145+ ordered'
  },
  {
    id: 'own-129',
    name: 'Vanilla Birthday Ribbon Delight',
    pricePerKg: 750,
    image: 'https://ik.imagekit.io/3awt8gog6/img465.jpg?updatedAt=1779964625808',
    description: 'A cheerful celebration cake covered in white-and-pink buttercream swirls, edible star confetti, and sugar ribbons.',
    rating: 4.7,
    sales: '310+ ordered'
  },
  {
    id: 'own-130',
    name: 'Sweet Strawberry Heart Swirl',
    pricePerKg: 780,
    image: 'https://ik.imagekit.io/3awt8gog6/img462.jpg?updatedAt=1779964625785',
    description: 'Romantically detailed heart-themed pink strawberry gateau with fresh fruit cream fillings.',
    rating: 4.7,
    sales: '180+ ordered'
  },
  {
    id: 'own-131',
    name: 'Cozy Caramel Toffee Sparkle',
    pricePerKg: 800,
    image: 'https://ik.imagekit.io/3awt8gog6/img483.jpg?updatedAt=1779964625707',
    description: 'Buttery smooth cake layered with signature caramel sauce, praline crunch, and dynamic edible glitter points.',
    rating: 4.8,
    sales: '105+ ordered'
  },
  {
    id: 'own-132',
    name: 'White Chocolate Biscuit Crown',
    pricePerKg: 830,
    image: 'https://ik.imagekit.io/3awt8gog6/img480.jpg?updatedAt=1779964625721',
    description: 'Sponge cake crowned with crispy white chocolate-coated wafers, vanilla ribbons, and silver pearls.',
    rating: 4.8,
    sales: '90+ ordered'
  },
  {
    id: 'own-133',
    name: 'Princess Heart Blossom Premium',
    pricePerKg: 880,
    image: 'https://ik.imagekit.io/3awt8gog6/img410.jpg?updatedAt=1779964625658',
    description: 'A majestic premium cake decorated with beautiful pink and golden buttercream flower sprays and decorative ribbons.',
    isPopular: true,
    rating: 4.9,
    sales: '👑 Elite Royal'
  },
  {
    id: 'own-134',
    name: 'Royal Pistachio Rose Fusion',
    pricePerKg: 910,
    image: 'https://ik.imagekit.io/3awt8gog6/img382.jpg?updatedAt=1779964625643',
    description: 'Traditional ground cardamom vanilla sponge infused with authentic rose petal cream and loaded with raw green pistachios.',
    rating: 4.8,
    sales: '190+ ordered'
  },
  {
    id: 'own-135',
    name: 'Heavnly Cocoa Mocha Masterpiece',
    pricePerKg: 840,
    image: 'https://ik.imagekit.io/3awt8gog6/img407.jpg?updatedAt=1779964625549',
    description: 'Exquisite espresso chocolate sponge layered recursively with fresh milk chocolate fudge and dark chocolate barks.',
    rating: 4.9,
    sales: 'Baker Favorite'
  },
  {
    id: 'own-136',
    name: 'Royal Saffron Vanilla Crown',
    pricePerKg: 890,
    image: 'https://ik.imagekit.io/3awt8gog6/img449.jpg?updatedAt=1779964625551',
    description: 'A grand celebration cake detailed with beautiful saffron-infused milk cream patterns, perfect edible pearls, and a moist dense sponge.',
    isPopular: true,
    rating: 4.9,
    sales: '150+ ordered'
  },
  {
    id: 'own-137',
    name: 'Princess Pink Rosette Castle',
    pricePerKg: 850,
    image: 'https://ik.imagekit.io/3awt8gog6/img422.jpg?updatedAt=1779964625430',
    description: 'Beautifully piped pink buttercream rose borders wrapping a delicious butter chiffon cake with real fruit cream filling.',
    isNew: true,
    rating: 4.8,
    sales: 'New Delight'
  },
  {
    id: 'own-138',
    name: 'Dark Chocolate Ganache Harmony',
    pricePerKg: 910,
    image: 'https://ik.imagekit.io/3awt8gog6/img431.jpg?updatedAt=1779964625390',
    description: 'A deep dual-cocoa layered cake enveloped in rich Belgian dark chocolate ganache, finished with hand-pulled white chocolate ribbons.',
    isPopular: true,
    rating: 5.0,
    sales: 'Baker Special'
  },
  {
    id: 'own-139',
    name: 'Royal Butterscotch Praline Symphony',
    pricePerKg: 790,
    image: 'https://ik.imagekit.io/3awt8gog6/img474.jpg?updatedAt=1779964625246',
    description: 'Traditional heavy butterscotch sponge cake with buttery caramel frosting, rich butterscotch drizzle and crunchy homemade praline shavings.',
    rating: 4.7,
    sales: '110+ ordered'
  },
  {
    id: 'own-140',
    name: 'Fragrant Rose Gulkand Delight',
    pricePerKg: 880,
    image: 'https://ik.imagekit.io/3awt8gog6/img361.jpg?updatedAt=1779964625221',
    description: 'A marvelous fusion masterpiece swirled with sweet rose-petal gulkand spread, fluffy cardamom cream, and real rose petal flakes.',
    rating: 4.9,
    sales: '230+ ordered'
  },
  {
    id: 'own-141',
    name: 'Decadent Black Forest Cherry Overload',
    pricePerKg: 780,
    image: 'https://ik.imagekit.io/3awt8gog6/img358.jpg?updatedAt=1779964625146',
    description: 'Mouthwatering classic German chocolate layer cake loaded with whole glazed sour cherries, fresh dairy whip, and thick chocolate bark.',
    rating: 4.8,
    sales: '340+ ordered'
  },
  {
    id: 'own-142',
    name: 'Fresh Strawberry Whipped Cloud',
    pricePerKg: 760,
    image: 'https://ik.imagekit.io/3awt8gog6/img452.jpg?updatedAt=1779964625120',
    description: 'Delicious airy sponge cake stuffed with a hand-cooked sweet strawberry compote, covered recursively with cloud-like whipped vanilla frosting.',
    rating: 4.7,
    sales: '95+ ordered'
  },
  {
    id: 'own-143',
    name: 'White Chocolate Blueberry Cascade',
    pricePerKg: 830,
    image: 'https://ik.imagekit.io/3awt8gog6/img373.jpg?updatedAt=1779964625029',
    description: 'Sponge cake swirled with rich wild blueberry preserves, frosted in silky white chocolate cream and finished with delicious purple glaze drips.',
    isPopular: true,
    rating: 4.9,
    sales: '180+ ordered'
  },
  {
    id: 'own-144',
    name: 'Double Decker Oreo Fudge Castle',
    pricePerKg: 860,
    image: 'https://ik.imagekit.io/3awt8gog6/img398.jpg?updatedAt=1779964624973',
    description: 'Two towering layers of dark cacao sponges, cookie-crumble white buttercream filling, finished with whole oreos and dripping chocolate fudge.',
    rating: 4.9,
    sales: '250+ ordered'
  },
  {
    id: 'own-145',
    name: 'Golden Caramel Toffee Marvel',
    pricePerKg: 800,
    image: 'https://ik.imagekit.io/3awt8gog6/img324.jpg?updatedAt=1779964624962',
    description: 'Scrumptious caramelized golden base paired perfectly with English style toffee glaze and a sprinkle of dynamic golden sugar beads.',
    rating: 4.6,
    sales: '80+ ordered'
  },
  {
    id: 'own-146',
    name: 'Sweet Vanilla Sprinkles Fiesta',
    pricePerKg: 710,
    image: 'https://ik.imagekit.io/3awt8gog6/img346.jpg?updatedAt=1779964624940',
    description: 'An extremely joyful birthday vanilla sponge cake loaded with colorful sprinkles, sweet custom milk cream waves, and playful flags.',
    isNew: true,
    rating: 4.8,
    sales: 'Perfect for Kids'
  },
  {
    id: 'own-147',
    name: 'Heavenly Pistachio Almond Kulfi',
    pricePerKg: 980,
    image: 'https://ik.imagekit.io/3awt8gog6/img477.jpg?updatedAt=1779964624911',
    description: 'Premium ground cardamom cake layered with traditional rich kulfi cream, toasted sliced almonds, and fine whole pistachio slivers.',
    isPopular: true,
    rating: 5.0,
    sales: '👑 VIP Premium'
  },
  {
    id: 'own-148',
    name: 'Tropical Sunkissed Mango Peach',
    pricePerKg: 770,
    image: 'https://ik.imagekit.io/3awt8gog6/img367.jpg?updatedAt=1779964624846',
    description: 'Refreshing summery delight featuring layers of direct sweet Alphonso mango purée and fresh peach glaze on light chiffon cake.',
    rating: 4.7,
    sales: '120+ ordered'
  },
  {
    id: 'own-149',
    name: 'Blossom Pink Ribbon Anniversary',
    pricePerKg: 870,
    image: 'https://ik.imagekit.io/3awt8gog6/img352.jpg?updatedAt=1779964624792',
    description: 'Elegant multi-layered anniversary special, frosted seamlessly with white buttercream and highlighted by baby pink chocolate ribbons.',
    isNew: true,
    rating: 4.9,
    sales: 'Hearts Favorite'
  },
  {
    id: 'own-150',
    name: 'Elite Rasamalai Cardamom King',
    pricePerKg: 1050,
    image: 'https://ik.imagekit.io/3awt8gog6/img309.jpg?updatedAt=1779964624721',
    description: 'Gourmet Indian classic using fresh, cream-soaked rasamalai squeezes, premium cardamon saffron whipped icing, and edible silver vark.',
    isPopular: true,
    rating: 5.0,
    sales: '600+ ordered'
  },
  {
    id: 'own-151',
    name: 'Double Dark Chocolate Silk',
    pricePerKg: 940,
    image: 'https://ik.imagekit.io/3awt8gog6/img337.jpg?updatedAt=1779964624712',
    description: 'Silky smooth melt-in-mouth dark cocoa cake smothered with extra-rich Belgian chocolate fudge glaze and custom curls.',
    rating: 4.9,
    sales: '320+ ordered'
  },
  {
    id: 'own-152',
    name: 'White Chocolate Butter Cream Dream',
    pricePerKg: 790,
    image: 'https://ik.imagekit.io/3awt8gog6/img376.jpg?updatedAt=1779964624690',
    description: 'A decadent rich butter cake frosted with traditional cream-cheese-infused sweet buttercream and finished with white glaze loops.',
    rating: 4.7,
    sales: '115+ ordered'
  },
  {
    id: 'own-153',
    name: 'Pretty Red Velvet Pearl Romance',
    pricePerKg: 850,
    image: 'https://ik.imagekit.io/3awt8gog6/img327.jpg?updatedAt=1779964624661',
    description: 'Romantic deep-crimson cake paired perfectly with sweet salted cream cheese swirls and beautiful edible white pearl beads.',
    rating: 4.8,
    sales: '140+ ordered'
  },
  {
    id: 'own-154',
    name: 'Espresso Mocha Cookie Crunch',
    pricePerKg: 820,
    image: 'https://ik.imagekit.io/3awt8gog6/img279.jpg?updatedAt=1779964624687',
    description: 'Rich dark espresso-soaked chocolate sponges filled with custom coffee-crumble buttercream and caramelized nuts.',
    rating: 4.8,
    sales: '90+ ordered'
  },
  {
    id: 'own-155',
    name: 'Pink Butterfly Princess Garland',
    pricePerKg: 880,
    image: 'https://ik.imagekit.io/3awt8gog6/img355.jpg?updatedAt=1779964624670',
    description: 'Majestic birthday design highlighting intricately-drawn pink butterflies, satin icing drapes, and shiny silver sprinkle pearls.',
    isPopular: true,
    rating: 4.9,
    sales: 'New Popularity'
  },
  {
    id: 'own-156',
    name: 'Sweet Gulkand Milky Splendor',
    pricePerKg: 860,
    image: 'https://ik.imagekit.io/3awt8gog6/img321.jpg?updatedAt=1779964624628',
    description: 'Gourmet cardamom base swirled with thick sweet gulkand spread, fluffy saffron whipped cream, and silver-plated almonds.',
    rating: 4.7,
    sales: '105+ ordered'
  },
  {
    id: 'own-157',
    name: 'Caramel Macadamia Toffee Ribbon',
    pricePerKg: 890,
    image: 'https://ik.imagekit.io/3awt8gog6/img349.jpg?updatedAt=1779964624668',
    description: 'Scrumptious dense vanilla cake loaded with buttery English toffee glaze and premium whole roasted macadamia crunch.',
    isPopular: true,
    rating: 4.9,
    sales: 'Baker Special'
  },
  {
    id: 'own-158',
    name: 'Royal Pistachio White Forest',
    pricePerKg: 930,
    image: 'https://ik.imagekit.io/3awt8gog6/img300.jpg?updatedAt=1779964624647',
    description: 'Luxurious fusion cake with high-density cherry fillings, covered with rich white chocolate flakes and ground roasted pistachios.',
    rating: 4.9,
    sales: '130+ ordered'
  },
  {
    id: 'own-159',
    name: 'Pretty Pink Lace Rose Spray',
    pricePerKg: 900,
    image: 'https://ik.imagekit.io/3awt8gog6/img276.jpg?updatedAt=1779964624607',
    description: 'Exquisite custom piped lace patterns using premier buttercream, highlighted with beautiful cascading grand pink roses.',
    isNew: true,
    rating: 4.9,
    sales: 'Romantic Sensation'
  },
  {
    id: 'own-160',
    name: 'Ultimate Chocolate Truffle Sparkle',
    pricePerKg: 920,
    image: 'https://ik.imagekit.io/3awt8gog6/img291.jpg?updatedAt=1779964624512',
    description: 'Rich dark chocolate cake filled with 70% cocoa fudge, highlighted by gold glitter points and edible dark chocolate truffles.',
    isPopular: true,
    rating: 5.0,
    sales: '430+ ordered'
  },
  {
    id: 'own-161',
    name: 'Fresh Mango Cream Ribbon Sunset',
    pricePerKg: 750,
    image: 'https://ik.imagekit.io/3awt8gog6/img261.jpg?updatedAt=1779964624479',
    description: 'A light, refreshing summery yellow cake with real mango cream layers and beautiful golden caramel glaze lines.',
    rating: 4.8,
    sales: '160+ ordered'
  },
  {
    id: 'own-162',
    name: 'Butterscotch Gold Praline Castle',
    pricePerKg: 810,
    image: 'https://ik.imagekit.io/3awt8gog6/img318.jpg?updatedAt=1779964624468',
    description: 'Traditional heavy brown-sugar base holding a sweet crunch praline filling, custom butter-cream ribbons, and golden crumbs.',
    rating: 4.7,
    sales: '185+ ordered'
  },
  {
    id: 'own-163',
    name: 'Decadent Black Forest Cherry Crown',
    pricePerKg: 800,
    image: 'https://ik.imagekit.io/3awt8gog6/img468.jpg?updatedAt=1779964623816',
    description: 'Our top-rated classic German cake containing cherry-liqueur-soaked sponges, fresh dairy cream, and high-density cocoa barks.',
    isPopular: true,
    rating: 4.9,
    sales: '290+ ordered'
  },
  {
    id: 'own-164',
    name: 'Sweet Gulkand Saffron Sunset',
    pricePerKg: 870,
    image: 'https://ik.imagekit.io/3awt8gog6/img395.jpg?updatedAt=1779964623636',
    description: 'Rich traditional heritage confection layered with real organic rose-petal jam, cardamon sprinkles, and golden saffron glaze.',
    rating: 4.8,
    sales: '115+ ordered'
  },
  {
    id: 'own-165',
    name: 'Premium Rasamalai Saffron Pearl',
    pricePerKg: 1000,
    image: 'https://ik.imagekit.io/3awt8gog6/img489.jpg?updatedAt=1779964623474',
    description: 'Traditional luxury combined with grand saffron-milk soaked biscuits, rich cardamon glaze, and sliced pistachios.',
    isPopular: true,
    rating: 5.0,
    sales: '👑 VIP Top Choice'
  },
  {
    id: 'own-166',
    name: 'Double Decker Cookies & Cream',
    pricePerKg: 860,
    image: 'https://ik.imagekit.io/3awt8gog6/img404.jpg?updatedAt=1779964623276',
    description: 'An expansive modern cookie delight featuring double cocoa sponge, loads of Oreo crumble cream, and dripping chocolate drapes.',
    rating: 4.8,
    sales: '210+ ordered'
  },
  {
    id: 'own-167',
    name: 'Exquisite Pink Rose Wedding Garland',
    pricePerKg: 910,
    image: 'https://ik.imagekit.io/3awt8gog6/img385.jpg?updatedAt=1779964623191',
    description: 'Breathtaking pure-white celebration cake draped with pink buttercream roses, golden scrollwork, and shiny edible pearls.',
    isNew: true,
    rating: 4.9,
    sales: 'Hearts Celebration'
  },
  {
    id: 'own-168',
    name: 'White Chocolate Forest Berry Splash',
    pricePerKg: 830,
    image: 'https://ik.imagekit.io/3awt8gog6/img288.jpg?updatedAt=1779964622925',
    description: 'Vanilla sponge cake with hand-layered mountain blueberry filling, iced with sweet white chocolate and fresh milk curls.',
    rating: 4.7,
    sales: '145+ ordered'
  },
  {
    id: 'own-169',
    name: 'Golden Caramel Toffee Bliss',
    pricePerKg: 790,
    image: 'https://ik.imagekit.io/3awt8gog6/img303.jpg?updatedAt=1779964622946',
    description: 'Traditional golden butter sponge holding sweet custard layers, drizzled with sweet English butter toffee sauce.',
    rating: 4.6,
    sales: '90+ ordered'
  },
  {
    id: 'own-170',
    name: 'Fragrant Kulfi Saffron Fusion',
    pricePerKg: 960,
    image: 'https://ik.imagekit.io/3awt8gog6/img243.jpg?updatedAt=1779964622807',
    description: 'Indian style fusion sponge infused with premium ground pistachio flakes, thick saffron oil, and real silver vark layers.',
    isPopular: true,
    rating: 4.9,
    sales: '230+ ordered'
  },
  {
    id: 'own-171',
    name: 'White Chocolate Pistachio Garland',
    pricePerKg: 920,
    image: 'https://ik.imagekit.io/3awt8gog6/img252.jpg?updatedAt=1779964622738',
    description: 'Silky smooth high-fat white cocoa cream wrapping a light cardamom cake, showered with whole roasted pistachio pieces.',
    rating: 4.8,
    sales: '110+ ordered'
  },
  {
    id: 'own-172',
    name: 'Oreo Fudge Chocolate Cascade',
    pricePerKg: 850,
    image: 'https://ik.imagekit.io/3awt8gog6/img364.jpg?updatedAt=1779964622766',
    description: 'Decadent dark cocoa sponge cake holding Oreo cookie buttercream, glossy chocolate glaze, and white chocolate shavings.',
    rating: 4.8,
    sales: '170+ ordered'
  },
  {
    id: 'own-173',
    name: 'Sweet Gulkand Milky Way',
    pricePerKg: 860,
    image: 'https://ik.imagekit.io/3awt8gog6/img315.jpg?updatedAt=1779964622574',
    description: 'Marvelous cardamom vanilla sponge stuffed with organic rose petal jam and decorated with creamy milk chocolate waves.',
    rating: 4.7,
    sales: '100+ ordered'
  },
  {
    id: 'own-174',
    name: 'Fresh Mango Sunset Chiffon',
    pricePerKg: 780,
    image: 'https://ik.imagekit.io/3awt8gog6/img285.jpg?updatedAt=1779964622617',
    description: 'Extremely sweet and light summer chiffon cake swirled with real Alphonso mango layers and refreshing low-fat cream.',
    rating: 4.8,
    sales: '120+ ordered'
  },
  {
    id: 'own-175',
    name: 'Princess Royal Pink Ribbon Deluxe',
    pricePerKg: 880,
    image: 'https://ik.imagekit.io/3awt8gog6/img297.jpg?updatedAt=1779964622529',
    description: 'Beautiful white vanilla butter cake detailed with royal pink ribbon banners, baby roses, and shiny silver beads.',
    isNew: true,
    rating: 4.9,
    sales: '👑 Elite Classic'
  },
  {
    id: 'own-176',
    name: 'Rasamalai Almond Fusion Saffron',
    pricePerKg: 1000,
    image: 'https://ik.imagekit.io/3awt8gog6/img330.jpg?updatedAt=1779964622531',
    description: 'Indian classic dessert cake made with authentic rasamalai squeezes, premium cardamon saffron cream, and toasted almond flakes.',
    isPopular: true,
    rating: 5.0,
    sales: '540+ ordered'
  },
  {
    id: 'own-177',
    name: 'Double Cocoa Truffle Galaxy',
    pricePerKg: 930,
    image: 'https://ik.imagekit.io/3awt8gog6/img312.jpg?updatedAt=1779964622341',
    description: 'Deep chocolate cake loaded with chocolate ganache frosting, silver sprinkles, and premium dark chocolate truffles.',
    rating: 4.9,
    sales: '320+ ordered'
  },
  {
    id: 'own-178',
    name: 'Golden Butterscotch Ribbon Feast',
    pricePerKg: 770,
    image: 'https://ik.imagekit.io/3awt8gog6/img273.jpg?updatedAt=1779964621945',
    description: 'Traditional home baked golden butterscotch cake layered with smooth caramel milk cream and golden praline crunch.',
    rating: 4.7,
    sales: '150+ ordered'
  },
  {
    id: 'own-179',
    name: 'Exquisite Rose Petal Buttercream',
    pricePerKg: 840,
    image: 'https://ik.imagekit.io/3awt8gog6/img255.jpg?updatedAt=1779964621961',
    description: 'Delicate vanilla sponge infused with sweet rosewater, covered with hand-piped pink rose ribbons and edible leaf flakes.',
    rating: 4.8,
    sales: '185+ ordered'
  },
  {
    id: 'own-180',
    name: 'Sunkissed Tropical Peach Chiffon',
    pricePerKg: 760,
    image: 'https://ik.imagekit.io/3awt8gog6/img282.jpg?updatedAt=1779964621879',
    description: 'Ultra-light yellow chiffon base covered with vanilla whipped layerings and layered with golden sweetened peach glazes.',
    rating: 4.7,
    sales: '90+ ordered'
  },
  {
    id: 'own-181',
    name: 'Oreo Cookie Crumble Mountain',
    pricePerKg: 830,
    image: 'https://ik.imagekit.io/3awt8gog6/img264.jpg?updatedAt=1779964620337',
    description: 'Decadent dual cacao sponges containing rich crunchy cookie frostings and decorated beautifully with chocolate glaze loops.',
    rating: 4.8,
    sales: '240+ ordered'
  },
  {
    id: 'own-182',
    name: 'English Custard Toffee Carousel',
    pricePerKg: 810,
    image: 'https://ik.imagekit.io/3awt8gog6/img249.jpg?updatedAt=1779964620227',
    description: 'Buttery smooth cake layered with French style custard cream, topped with direct sweet buttery English toffee glaze and sliver glaze points.',
    rating: 4.7,
    sales: '105+ ordered'
  },
  {
    id: 'own-183',
    name: 'Kulfi Pistachio Saffron Splendor',
    pricePerKg: 970,
    image: 'https://ik.imagekit.io/3awt8gog6/img267.jpg?updatedAt=1779964620221',
    description: 'Artisanal Indian-inspired sponge cake with ground green pistachio dust, true saffron oil glaze, and royal cardamom frosting details.',
    isPopular: true,
    rating: 4.9,
    sales: '380+ ordered'
  },
  {
    id: 'own-184',
    name: 'White Chocolate Berry Garland',
    pricePerKg: 820,
    image: 'https://ik.imagekit.io/3awt8gog6/img246.jpg?updatedAt=1779964620059',
    description: 'A chilly berry masterpiece with layers of moist white chocolate sponge covered in mixed wild berry whipped ripples.',
    rating: 4.8,
    sales: '135+ ordered'
  },
  {
    id: 'own-185',
    name: 'Decadent Black Forest Cherry Crest',
    pricePerKg: 790,
    image: 'https://ik.imagekit.io/3awt8gog6/img240.jpg?updatedAt=1779964620052',
    description: 'Elegant chocolate cake showcasing a glossy dark cacao mirror glaze, rich fresh dairy cream, and candied red cherries.',
    rating: 4.7,
    sales: '190+ ordered'
  },
  {
    id: 'own-186',
    name: 'Princess Pink Heart Ribbon',
    pricePerKg: 890,
    image: 'https://ik.imagekit.io/3awt8gog6/img294.jpg?updatedAt=1779964619813',
    description: 'Romantically detailed heart-themed pink rose gateau with fresh fruit cream fillings and elegant ribbon drapes.',
    isPopular: true,
    rating: 5.0,
    sales: '👑 Couple Special'
  },
  {
    id: 'own-187',
    name: 'Sweet Gulkand Cardamom Glow',
    pricePerKg: 850,
    image: 'https://ik.imagekit.io/3awt8gog6/img258.jpg?updatedAt=1779964619467',
    description: 'Fragrant sweet gulkand cake with a luxurious saffron milk coating, celebrating traditional sweet Indian heritage.',
    rating: 4.8,
    sales: '140+ ordered'
  },
  {
    id: 'own-188',
    name: 'Ultimate Rasamalai Almond Crown',
    pricePerKg: 1050,
    image: 'https://ik.imagekit.io/3awt8gog6/img306.jpg?updatedAt=1779964618661',
    description: 'Award-winning Indian fusion creation made with freshly squeezed Rasamalai chunks, premium roasted almond slices, and cardamon whip.',
    isPopular: true,
    rating: 5.0,
    sales: 'Baker Signature'
  },
  {
    id: 'own-189',
    name: 'Double Fudge Hazelnut Symphony',
    pricePerKg: 950,
    image: 'https://ik.imagekit.io/3awt8gog6/img216.jpg?updatedAt=1779964616782',
    description: 'Decadent dark chocolate layers stuffed with rich Nutella hazelnut paste and crispy roasted hazelnut crunch.',
    rating: 4.9,
    sales: '230+ ordered'
  },
  {
    id: 'own-190',
    name: 'Fresh Mango Vanilla Sunrise Glow',
    pricePerKg: 760,
    image: 'https://ik.imagekit.io/3awt8gog6/img237.jpg?updatedAt=1779964616744',
    description: 'Delectable summer cream swirls infused with hand-pressed sweet Alphonso mango layers on a fluffy vanilla sponge base.',
    rating: 4.7,
    sales: '115+ ordered'
  },
  {
    id: 'own-191',
    name: 'Golden Butterscotch Crunch Crown',
    pricePerKg: 780,
    image: 'https://ik.imagekit.io/3awt8gog6/img234.jpg?updatedAt=1779964611833',
    description: 'Traditional butterscotch cake decorated with soft cream ribbons and elegant caramelized praline waves.',
    rating: 4.7,
    sales: '180+ ordered'
  },
  {
    id: 'own-192',
    name: 'Sweet Gulkand Saffron Ripple',
    pricePerKg: 860,
    image: 'https://ik.imagekit.io/3awt8gog6/img231.jpg?updatedAt=1779964611261',
    description: 'Delightful traditional fusion sweet dessert cake featuring authentic sweet rose petal gulkand preserve and vanilla cream layers.',
    rating: 4.8,
    sales: '100+ ordered'
  },
  {
    id: 'own-193',
    name: 'Princess Pink Garland Palace',
    pricePerKg: 890,
    image: 'https://ik.imagekit.io/3awt8gog6/img213.jpg?updatedAt=1779964608356',
    description: 'A beautiful white wedding-style cake with elegant pink buttercream flower arrangements and sugar scrolls.',
    isPopular: true,
    rating: 5.0,
    sales: '👑 Elite VIP'
  },
  {
    id: 'own-194',
    name: 'Elegant White Buttercream Rose',
    pricePerKg: 820,
    image: 'https://ik.imagekit.io/3awt8gog6/img225.jpg?updatedAt=1779964607710',
    description: 'Sponge cake elegantly custom piped with standard delicious buttercream, fresh rosebud patterns, and white sugar details.',
    rating: 4.8,
    sales: '150+ ordered'
  },
  {
    id: 'own-195',
    name: 'Wild Blueberry Vanilla Drip',
    pricePerKg: 800,
    image: 'https://ik.imagekit.io/3awt8gog6/img206.jpg?updatedAt=1779964604429',
    description: 'Beautiful white vanilla cream sponge layered recursively with tart whole wild blueberries and sweet confectioners glaze.',
    rating: 4.7,
    sales: '140+ ordered'
  },
  {
    id: 'own-196',
    name: 'Choco Chip Fudge Cookie Castle',
    pricePerKg: 880,
    image: 'https://ik.imagekit.io/3awt8gog6/img228.jpg?updatedAt=1779964603778',
    description: 'A magnificent double dark cocoa cake topped with crunchy chocolate chip cookies, whole fudge lumps, and sweet chocolate ribbons.',
    isPopular: true,
    rating: 4.9,
    sales: 'Baker Favorite'
  },
  {
    id: 'own-197',
    name: 'English Custard Caramel Crown',
    pricePerKg: 810,
    image: 'https://ik.imagekit.io/3awt8gog6/img219.jpg?updatedAt=1779964603461',
    description: 'Buttery base containing authentic golden French custard cream layerings and fine english butter-toffee sauce drizzle.',
    rating: 4.7,
    sales: '95+ ordered'
  },
  {
    id: 'own-198',
    name: 'Kulfi Roasted Almond Deluxe',
    pricePerKg: 980,
    image: 'https://ik.imagekit.io/3awt8gog6/img210.jpg?updatedAt=1779964603356',
    description: 'Rich luxurious saffron milk-soaked layers with freshly ground cardamom cream and golden toasted whole almond sprinkles.',
    rating: 4.9,
    sales: '320+ ordered'
  },
  {
    id: 'own-199',
    name: 'White Chocolate Pistachio Splendor',
    pricePerKg: 910,
    image: 'https://ik.imagekit.io/3awt8gog6/img222.jpg?updatedAt=1779964603155',
    description: 'Pristine vanilla chiffon wrapped seamlessly in high-grade white cocoa glaze and topped with crushed green pistachio crunch.',
    isPopular: true,
    rating: 5.0,
    sales: '👑 Best Fusion'
  }
];

const OWN_MAKE_PRICES: Record<string, number> = {
  '1': 1350,
  '2': 1300,
  '3': 1350,
  '4': 1400,
  '5': 1350,
  '6': 1350,
  '7': 1350,
  '8': 1400,
  '9': 1400,
  '10': 1400,
  '11': 1350,
  '12': 1400,
  '13': 1350,
  '14': 1400,
  '15': 1450,
  '16': 1500,
  '17': 1450,
  '18': 1350,
  '19': 1250,
  '20': 1350,
  '21': 1350,
  '22': 1400,
  '23': 1400,
  '24': 1350,
  '25': 1400,
  '26': 1350,
  '27': 1500,
  '28': 1400,
  '29': 1450,
  '30': 1350,
  '31': 1400,
  '32': 1400,
  '33': 1400,
  '34': 1450,
  '35': 1450,
  '36': 1350,
  '37': 1400,
  '38': 1450,
  '39': 1350,
  '40': 1350,
  '41': 1350,
  '42': 1450,
  '43': 1350,
  '44': 1250,
  '45': 1350,
  '46': 1450,
  '47': 1350,
  '48': 1450,
  '49': 1350,
  '50': 1350,
  '51': 1250,
  '52': 1450,
  '53': 1400,
  '54': 1400,
  '55': 1400,
  '56': 1250,
  '57': 1500,
  '58': 1350,
  '59': 1400,
  '60': 1350,
  '61': 1350,
  '61-alt': 1350,
  '62': 1400,
  '63': 1350,
  '64': 1400,
  '65': 1350,
  '66': 1350,
  '67': 1250,
  '68': 1450,
  '69': 1400,
  '70': 1400,
  '71': 1350,
  '72': 1350,
  '73': 1350,
  '74': 1350,
  '75': 1450,
  '76': 1350,
  '77': 1450,
  '78': 1350,
  '79': 1450,
  '80': 1400,
  '81': 1400,
  '82': 1350,
  '83': 1350,
  '84': 1350,
  '85': 1350,
  '86': 1350,
  '87': 1500,
  '88': 1400,
  '89': 1250,
  '90': 1400,
  '91': 1350,
  '92': 1400,
  '93': 1400,
  '94': 1400,
  '95': 1350,
  '96': 1450,
  '97': 1300,
  '98': 1350,
  '99': 1300,
  '100': 1350,
  '101': 1350,
  '102': 900,
  '103': 900,
  '104': 850,
  '105': 950,
  '106': 900,
  '107': 900,
  '108': 950,
  '109': 900,
  '110': 800,
  '111': 900,
  '112': 900,
  '113': 950,
  '114': 950,
  '115': 1250,
  '116': 900,
  '117': 900,
  '118': 900,
  '119': 950,
  '120': 900,
  '121': 850,
  '122': 900,
  '123': 900,
  '124': 900,
  '125': 900,
  '126': 900,
  '127': 950,
  '128': 900,
  '129': 1100,
  '130': 950,
  '131': 950,
  '132': 900,
  '133': 1000,
  '134': 900,
  '135': 1100,
  '136': 1000,
  '137': 900,
  '138': 1000,
  '139': 1100,
  '140': 850,
  '141': 1100,
  '142': 900,
  '143': 1400,
  '144': 1200,
  '145': 1100,
  '146': 950,
  '147': 1000,
  '148': 1000,
  '149': 1000,
  '150': 1200,
  '151': 1400,
  '152': 1650,
  '153': 1400,
  '154': 1000,
  '155': 1000,
  '156': 850,
  '157': 850,
  '158': 1000,
  '159': 900,
  '160': 1000,
  '161': 1100,
  '162': 1000,
  '163': 1000,
  '164': 1000,
  '165': 900,
  '166': 900,
  '167': 1000,
  '168': 1000,
  '169': 900,
  '170': 1100,
  '171': 900,
  '172': 1000,
  '173': 1100,
  '174': 900,
  '175': 1000,
  '176': 1000,
  '177': 900,
  '178': 950,
  '179': 1000,
  '180': 1100,
  '181': 950,
  '182': 900,
  '183': 900,
  '184': 900,
  '185': 950,
  '186': 1000,
  '187': 1000,
  '188': 1100,
  '189': 1100,
  '190': 1600,
  '191': 1000,
  '192': 850,
  '193': 1400,
  '194': 1200,
  '195': 1000,
  '196': 950,
  '197': 900,
  '198': 1500,
  '199': 900,
  '200': 950,
};

// Helper function to extract exact PDF page number from image URL
function getPDFPageFromImage(imageUrl: string): string | null {
  const filename = imageUrl.split('/').pop()?.split('?')[0] || '';
  const match = filename.match(/img(\d+)/);
  if (!match) {
    // Special cases
    if (filename.includes('images%20(1)')) {
      return '116'; // White Forest cake, page 116 (Rs. 900)
    }
    if (filename.includes('ChatGPT')) {
      return '104'; // Black forest cake, page 104 (Rs. 850)
    }
    return null;
  }
  const num = parseInt(match[1], 10);
  let page_num: number | null = null;
  if (num === 600) {
    page_num = 100;
  } else if (num >= 200 && num < 400) {
    page_num = num - 200;
  } else if (num >= 400 && num < 500) {
    page_num = num - 300;
  } else if (num >= 500 && num < 600) {
    page_num = num - 500;
  } else if (num >= 600 && num < 800) {
    page_num = num - 600;
  } else if (num >= 800 && num < 900) {
    page_num = num - 700;
  }
  return page_num ? String(page_num) : null;
}

// Override base price dynamically using the exact PDF specifications mapped from image filenames
OWN_MAKE_ITEMS.forEach(item => {
  const pageId = getPDFPageFromImage(item.image);
  if (pageId && OWN_MAKE_PRICES[pageId] !== undefined) {
    item.pricePerKg = OWN_MAKE_PRICES[pageId];
  }

  // Specific design overrides requested by the user
  if (item.id === 'own-177') {
    item.pricePerKg = 1450;
  } else if (item.id === 'own-197') {
    item.pricePerKg = 1350;
  } else if (item.id === 'own-188') {
    item.pricePerKg = 1350;
  }

  // For any design where price is 1000 or below, set its price to 1400
  if (item.pricePerKg <= 1000) {
    item.pricePerKg = 1400;
  }
});

export default function OurOwnMake({ isAuthenticated, onAddToCart, onViewCart, onRequiresAuth }: OurOwnMakeProps) {
  const processedItems = OWN_MAKE_ITEMS.map(item => ({
    ...item,
    name: `Design #${item.id.replace('own-', '')}`
  }));

  const [selectedItem, setSelectedItem] = useState<OwnMakeItem | null>(null);
  const [cakeSize, setCakeSize] = useState<'1' | '1.5' | '2' | '3'>('1');
  const [cakeMessage, setCakeMessage] = useState('');
  const [cakeAge, setCakeAge] = useState('');
  const [itemQuantity, setItemQuantity] = useState(1);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const getPriceForSize = (pricePerKg: number, size: typeof cakeSize) => {
    return pricePerKg * parseFloat(size);
  };

  const handleOpenCustomize = (item: OwnMakeItem) => {
    setSelectedItem(item);
    setCakeSize('1');
    setCakeMessage('');
    setCakeAge('');
    setItemQuantity(1);
  };

  const handleCustomAddToCart = () => {
    if (!selectedItem) return;

    const unitPrice = getPriceForSize(selectedItem.pricePerKg, cakeSize);
    const itemTotal = unitPrice * itemQuantity;

    const cartItem: CartItem = {
      id: `own-cake-${selectedItem.id}-${Date.now()}`,
      sizeLabel: `${cakeSize} Kg - ${selectedItem.name}`,
      sizePrice: unitPrice,
      name: selectedItem.name,
      age: cakeAge,
      message: cakeMessage,
      photoUrl: selectedItem.image,
      toppings: [],
      toppingsTotal: 0,
      itemTotal: itemTotal,
      quantity: itemQuantity,
      date: new Date().toLocaleDateString(),
      time: 'Immediate Delivery requested',
      grandTotal: itemTotal,
      category: 'Cakes'
    };

    onAddToCart(cartItem);
    setSelectedItem(null);
    setSuccessMessage(`Added ${selectedItem.name} (${cakeSize} Kg) to your cart!`);
    setTimeout(() => setSuccessMessage(null), 3000);
  };

  const handleWhatsAppCheckout = () => {
    if (!selectedItem) return;

    const unitPrice = getPriceForSize(selectedItem.pricePerKg, cakeSize);
    const itemTotal = unitPrice * itemQuantity;

    const msg = `*NEW OUR OWN MAKE CAKE ORDER* 🎂✨\n\n` +
                `*Cake:* ${selectedItem.name}\n` +
                `*Weight:* ${cakeSize} Kg\n` +
                `*Price:* ₹${unitPrice} per cake\n` +
                `*Quantity:* ${itemQuantity}\n` +
                `*Total Price:* ₹${itemTotal}\n` +
                (cakeMessage ? `*Message on Cake:* "${cakeMessage}"\n` : '') +
                (cakeAge ? `*Candle Age:* ${cakeAge}\n` : '') +
                `\n_Order made with love from Mahesh Bakery website_`;

    const whatsappUrl = `https://wa.me/919944416643?text=${encodeURIComponent(msg)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="bg-[#f8f5f0] min-h-[85vh] font-sans pb-16">
      {/* 1. Hero Promo Header - Pure Video Showcase */}
      <div className="relative min-h-[400px] h-[65vh] w-full flex items-center overflow-hidden bg-[#250C3D]">
        {/* Full-screen Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
        >
          <source 
            src="https://ik.imagekit.io/du3lqlqsw/untext_WhatsApp%20Video%202026-06-11%20at%204.16.51%20PM.mp4" 
            type="video/mp4" 
          />
          Your browser does not support the video tag.
        </video>

        {/* Dark overlay for rich contrast */}
        <div className="absolute inset-0 bg-black/25 z-10 pointer-events-none" />
      </div>

      {/* Buttons Block - Positioned directly below the video */}
      <div className="bg-white border-b border-purple-100/80 py-8 shadow-xs relative z-20">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row justify-center items-center gap-5">
          <a
            href="#catalogue"
            className="w-full sm:w-auto bg-[#F1B524] hover:bg-[#fab01a] text-[#2c1b40] font-black text-xs md:text-sm tracking-wider uppercase px-10 py-4.5 rounded-xl shadow-md transition-all text-center flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95"
          >
            Browse Our Creations
            <ChevronRight className="w-4 h-4" />
          </a>
          <button
            onClick={onViewCart}
            className="w-full sm:w-auto bg-white hover:bg-purple-50/50 text-[#4f3370] border-2 border-purple-100 font-black text-xs md:text-sm tracking-wider uppercase px-10 py-4.5 rounded-xl transition-all flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95"
          >
            <ShoppingBag className="w-4 h-4" />
            View Shopping Cart
          </button>
        </div>
      </div>

      {/* 2. Main Product Catalog Section */}
      <div id="catalogue" className="max-w-7xl mx-auto px-6 mt-16 scroll-mt-6">
        <div className="border-b border-[#4f3370]/10 pb-6 mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <span className="text-xs font-black uppercase text-[#4f3370] tracking-widest block mb-1">Authentic Baker's Signature</span>
            <h2 className="text-3xl font-serif font-black text-[#2c1b40] tracking-tight">Our Original Creations</h2>
          </div>
          <div className="text-sm bg-white border border-purple-100 rounded-xl px-4 py-2.5 text-[#4f3370] font-bold flex items-center gap-2 select-none shadow-sm">
            <Cake className="w-4 h-4 text-amber-500 animate-pulse" />
            <span>Currently showcasing {processedItems.length} designs</span>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {processedItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: Math.min(index * 0.05, 0.3) }}
              className="bg-white rounded-[2rem] overflow-hidden shadow-[0_15px_35px_rgba(79,51,112,0.03)] border border-purple-100 hover:shadow-[0_25px_50px_rgba(79,51,112,0.09)] hover:-translate-y-2 transition-all duration-300 flex flex-col group"
            >
              {/* Product Visual Container */}
              <div className="relative h-64 md:h-72 overflow-hidden select-none bg-white p-3.5">
                <div className="relative w-full h-full overflow-hidden">
                  <div className="absolute left-0 right-0 top-[-14.6%] h-[139%] flex items-center justify-center">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="max-w-full max-h-full object-contain object-top group-hover:scale-[1.02] transition-transform duration-700 ease-out"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>
                
                {/* Floating Badges */}
                <div className="absolute bottom-4 left-4 flex flex-col gap-2 z-10">
                  {item.isPopular && (
                    <span className="bg-[#FFB01A] text-[#2c1b40] text-[9px] font-black tracking-widest uppercase px-3 py-1 rounded-full shadow-md flex items-center gap-1 border border-white/20">
                      <Sparkles className="w-2.5 h-2.5 text-[#2c1b40] fill-current" />
                      BESTSELLER
                    </span>
                  )}
                  {item.isNew && (
                    <span className="bg-[#4f3370] text-white text-[9px] font-black tracking-widest uppercase px-3 py-1 rounded-full shadow-md flex items-center gap-1 border border-white/20">
                      NEW LAUNCH
                    </span>
                  )}
                </div>

                {/* Rating & Orders overlay */}
                <div className="absolute bottom-4 right-4 bg-black/55 backdrop-blur-md px-3 py-1.5 rounded-xl text-white text-xs font-bold flex items-center gap-1">
                  <span className="text-amber-400">★</span>
                  <span>{item.rating}</span>
                  <span className="text-white/40">|</span>
                  <span className="text-gray-250 text-[10px] uppercase font-semibold">{item.sales}</span>
                </div>
              </div>

              {/* Product Info Block */}
              <div className="p-6 md:p-8 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-sans font-black text-[#2c1b40] text-xl group-hover:text-[#4f3370] transition-colors mb-2 leading-snug">
                    {item.name}
                  </h3>
                </div>

                <div>
                  {/* Pricing tag */}
                  <div className="flex items-center justify-between border-t border-purple-50 pt-5 mt-auto">
                    <div className="flex flex-col">
                      <span className="text-[10px] uppercase font-black text-gray-450 tracking-wider">Price</span>
                      <span className="text-2xl font-black text-[#4f3370] flex items-center gap-1">
                        ₹{item.pricePerKg}
                        <span className="text-xs font-bold text-gray-400 lowercase italic">/ kg</span>
                      </span>
                    </div>

                    <button
                      onClick={() => handleOpenCustomize(item)}
                      className="bg-[#4f3370] hover:bg-[#3b2554] text-white p-3 rounded-full transition-all group-hover:scale-105 active:scale-95 shadow-md flex items-center justify-center cursor-pointer"
                      title="Select weight and customize"
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Quick checkout direct action button */}
                  <button
                    onClick={() => handleOpenCustomize(item)}
                    className="w-full mt-4 bg-purple-50/50 hover:bg-purple-100 text-[#4f3370] font-black text-xs uppercase tracking-wider py-3.5 rounded-xl border border-purple-100/50 transition-colors flex items-center justify-center gap-1.5 focus:outline-none"
                  >
                    Select Options
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 3. Customization Modal Dialog */}
      <AnimatePresence>
        {selectedItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
            {/* Modal backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedItem(null)}
              className="fixed inset-0 bg-black/60 backdrop-blur-xs" 
            />

            {/* Modal Content Box */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-white rounded-[2.5rem] shadow-2xl relative w-full max-w-2xl overflow-hidden z-10 flex flex-col max-h-[90vh] border border-purple-100"
            >
            {/* Close trigger */}
              <button 
                onClick={() => setSelectedItem(null)}
                className="absolute top-5 right-5 z-20 w-9 h-9 rounded-full bg-white/90 hover:bg-gray-100 text-[#2c1b40] shadow-md border border-purple-50 flex items-center justify-center cursor-pointer transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex-1 overflow-y-auto p-6 md:p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                  
                  {/* Modal Left Column: Visual */}
                  <div className="rounded-[1.5rem] overflow-hidden aspect-square shadow-sm select-none border border-purple-50 bg-white p-3">
                    <div className="relative w-full h-full overflow-hidden">
                      <div className="absolute left-0 right-0 top-[-14.6%] h-[139%] flex items-center justify-center">
                        <img 
                          src={selectedItem.image} 
                          alt={selectedItem.name} 
                          className="max-w-full max-h-full object-contain object-top"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Modal Right Column: Customization parameters */}
                  <div className="space-y-5">
                    <div>
                      <span className="text-[10px] font-black uppercase text-[#FFB01A] bg-[#FFB01A]/10 border border-[#FFB01A]/20 px-2.5 py-1 rounded-full select-none inline-block mb-2">
                        Premium House Make
                      </span>
                      <h3 className="font-sans font-black text-[#2c1b40] text-xl md:text-2xl leading-snug">
                        {selectedItem.name}
                      </h3>
                      <p className="text-gray-500 font-semibold text-xs tracking-wide mt-1.5 flex items-center gap-1 select-none">
                        <span>Base price:</span>
                        <span className="text-[#4f3370] font-black">₹{selectedItem.pricePerKg} per Kg</span>
                      </p>
                    </div>

                    <p className="text-gray-500 text-xs md:text-sm font-medium leading-relaxed">
                      {selectedItem.description}
                    </p>

                    <hr className="border-purple-50" />

                    {/* Weight selector */}
                    <div>
                      <label className="block text-xs font-black text-[#2c1b40] uppercase tracking-wider mb-2.5 flex items-center gap-1.5 select-none">
                        <Cake className="w-4 h-4 text-amber-500" />
                        Select Weight / Size
                      </label>
                      <div className="grid grid-cols-4 gap-2">
                        {(['1', '1.5', '2', '3'] as const).map((wt) => {
                          const active = cakeSize === wt;
                          return (
                            <button
                              key={wt}
                              onClick={() => setCakeSize(wt)}
                              className={`py-3.5 px-1.5 rounded-xl text-xs font-black border transition-all text-center flex flex-col items-center justify-center cursor-pointer ${
                                active 
                                  ? 'bg-[#4f3370] text-white border-[#4f3370] shadow-md shadow-[#4f3370]/15' 
                                  : 'bg-white text-gray-500 border-gray-200 hover:border-purple-200 hover:bg-purple-50/20'
                              }`}
                            >
                              <span>{wt} Kg</span>
                              <span className={`text-[9px] font-bold mt-1 block ${active ? 'text-amber-300' : 'text-gray-400'}`}>
                                ₹{selectedItem.pricePerKg * parseFloat(wt)}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Custom Message to pipe write */}
                    <div>
                      <label className="block text-xs font-black text-[#2c1b40] uppercase tracking-wider mb-1.5 select-none">
                        Message on Cake
                      </label>
                      <input 
                        type="text" 
                        maxLength={40}
                        placeholder="E.g. Happy Birthday Raju (max 40 chars)"
                        value={cakeMessage}
                        onChange={(e) => setCakeMessage(e.target.value)}
                        className="w-full text-xs font-semibold px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:border-[#4f3370] placeholder-gray-400 transition-colors bg-purple-50/10 text-[#2c1b40]"
                      />
                    </div>

                    {/* Custom Age display */}
                    <div>
                      <label className="block text-xs font-black text-[#2c1b40] uppercase tracking-wider mb-1.5 select-none">
                        Candle Age
                      </label>
                      <input 
                        type="text" 
                        maxLength={3}
                        placeholder="E.g. 5 (Optional)"
                        value={cakeAge}
                        onChange={(e) => setCakeAge(e.target.value.replace(/\D/g, ''))}
                        className="w-24 text-xs font-semibold px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:border-[#4f3370] placeholder-gray-400 text-center transition-colors bg-purple-50/10 text-[#2c1b40]"
                      />
                    </div>

                    {/* Quantity selectors */}
                    <div className="flex items-center justify-between border-t border-purple-50 pt-5">
                      <span className="text-xs font-black text-[#2c1b40] uppercase tracking-wider select-none">Quantity</span>
                      <div className="flex items-center bg-gray-100 rounded-xl px-2.5 py-1.5 border border-gray-200">
                        <button
                          disabled={itemQuantity <= 1}
                          onClick={() => setItemQuantity(prev => prev - 1)}
                          className="w-6 h-6 rounded-md bg-white text-[#2c1b40] shadow-sm flex items-center justify-center font-bold text-sm cursor-pointer disabled:opacity-40 transition-opacity"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-9 text-center font-black text-sm text-[#2c1b40] select-none">{itemQuantity}</span>
                        <button
                          onClick={() => setItemQuantity(prev => prev + 1)}
                          className="w-6 h-6 rounded-md bg-white text-[#2c1b40] shadow-sm flex items-center justify-center font-bold text-sm cursor-pointer transition-opacity"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Dynamic total price tracking display */}
                    <div className="bg-purple-50/50 p-4 rounded-xl border border-purple-100 flex items-center justify-between select-none">
                      <div className="flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 text-[#4f3370]" />
                        <span className="text-xs text-gray-500 font-semibold">Total Price:</span>
                      </div>
                      <span className="text-xl font-black text-[#4f3370]">
                        ₹{getPriceForSize(selectedItem.pricePerKg, cakeSize) * itemQuantity}
                      </span>
                    </div>

                  </div>
                </div>
              </div>

              {/* Action Modal Footer */}
              <div className="border-t border-gray-100 p-6 bg-gray-50 flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={handleWhatsAppCheckout}
                  className="bg-[#25D366] hover:bg-[#20BE59] text-white flex-1 py-4 px-6 rounded-xl font-bold transition-all text-sm shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12.042 2C6.556 2 2.084 6.446 2.084 11.911c0 1.739.459 3.447 1.331 4.953L2.184 21.331l5.421-1.421c1.455.788 3.092 1.207 4.76 1.207h.004c5.486 0 9.958-4.446 9.958-9.911C22.327 6.446 17.855 2 12.042 2zm0 18.327h-.004c-1.493 0-2.957-.403-4.225-1.168l-2.494.654.666-2.433-.156-.251c-.833-1.343-1.272-2.885-1.272-4.464 0-4.63 3.794-8.411 8.458-8.411 2.269 0 4.387.877 5.986 2.469 1.597 1.589 2.475 3.697 2.475 5.948 0 4.63-3.794 8.411-8.458 8.411zM15.215 15.65c-.276-.138-1.631-.805-1.884-.897-.254-.093-.438-.138-.622.138-.184.276-.712.897-.873 1.081-.161.184-.323.207-.599.069-.276-.138-1.164-.429-2.217-1.371-.82-.73-1.372-1.632-1.533-1.908-.161-.276-.017-.426.121-.564.125-.123.276-.321.414-.483.138-.161.184-.276.276-.46.092-.184.046-.345-.023-.483-.069-.138-.622-1.507-.852-2.062-.224-.537-.453-.464-.622-.472-.161-.009-.345-.009-.529-.009s-.483.069-.735.345c-.253.276-.966.943-.966 2.301 0 1.357.989 2.668 1.127 2.852.138.184 1.944 2.971 4.706 4.168.657.283 1.171.452 1.572.583.662.21 1.265.18 1.741.11.531-.079 1.631-.667 1.861-1.311.23-.644.23-1.196.161-1.311-.069-.115-.253-.184-.529-.322z" />
                  </svg>
                  Order via WhatsApp
                </button>

                <button
                  type="button"
                  onClick={handleCustomAddToCart}
                  className="bg-[#4f3370] hover:bg-[#382250] text-white flex-1 py-4 px-6 rounded-xl font-bold transition-all text-sm shadow-md hover:shadow-[#4f3370]/30 hover:shadow-lg flex items-center justify-center gap-2 border border-purple-800"
                >
                  <ShoppingBag className="w-5 h-5 text-amber-300" />
                  Add to Cart
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 4. Alert / Success Notification Banner */}
      <AnimatePresence>
        {successMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 bg-[#4f3370] text-white py-3.5 px-6 rounded-full flex items-center gap-2.5 shadow-2xl font-bold border border-white/10"
          >
            <span className="w-5 h-5 bg-white text-[#4f3370] rounded-full flex items-center justify-center text-xs">✓</span>
            <span className="text-xs md:text-sm">{successMessage}</span>
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
  );
}
