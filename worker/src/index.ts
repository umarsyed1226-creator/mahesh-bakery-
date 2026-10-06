/**
 * Mahesh Bakery - Cloudflare Worker API
 * Handles /api/chat and /api/whatsapp/send endpoints
 * Free tier: 100,000 requests/day
 */

export interface Env {
  ENVIRONMENT: string;
}

// CORS headers for cross-origin requests from Cloudflare Pages
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

// Highly accurate, detailed local response generator (ported from server.ts)
function generateLocalResponse(messages: { role: string; content: string }[]): string {
  const lastMessage = messages[messages.length - 1];
  const query = (lastMessage?.content || '').toLowerCase().trim();

  // Dubai Kunafa specific inquiries
  if (query.includes('kunafa') || query.includes('dubai')) {
    return '🍫 **Dubai Kunafa**: Extra rich, authentic, crispy, sweet and delicious!\n\n' +
      '• **Price**: **₹70** per pack / plate. 🎂\n\n' +
      'Would you like to try our special recipe? Drop by our store or order today!';
  }

  // Badam Milk specific inquiries
  if (query.includes('badam') || query.includes('milk')) {
    return '🥛 **Creamy Badam Milk**: Baked almonds cooked with authentic milk and rich saffron!\n\n' +
      '• **Price**: **₹25** only. 🌟\n\n' +
      'It is extremely healthy, refreshing, and served perfectly chilled. Visit our shop or place an order!';
  }

  // Price inquiries
  if (
    query.includes('price') || query.includes('rate') || query.includes('cost') ||
    query.includes('pricing') || query.includes('size') || query.includes('how much') ||
    query.includes('valai') || query.includes('amount') || query.includes('rupees') ||
    query.includes('kg') || query.includes('rs') || query.includes('costly')
  ) {
    return '🎂 *Official Custom Cake Builder Sizes & Pricing*:\n\n' +
      '• 🍰 **Half Kg (500g)**: ₹599\n' +
      '• 🎂 **1 Kg (1000g)**: ₹999\n' +
      '• 🍰 **2 Kg (2000g)**: ₹1899\n' +
      '• 🎂 **3 Kg (3000g)**: ₹2799\n\n' +
      'All cakes are made with 100% premium ingredients and baked fresh on the exact day of delivery. Go to the *Cake Builder* tab to configure yours right now!';
  }

  // Toppings & Add-ons
  if (
    query.includes('topping') || query.includes('toppings') || query.includes('add-on') ||
    query.includes('add on') || query.includes('sprinkle') || query.includes('chips') ||
    query.includes('nuts') || query.includes('fruits') || query.includes('macaron') ||
    query.includes('candle') || query.includes('photo') || query.includes('pic') ||
    query.includes('image') || query.includes('flavor') || query.includes('flavour')
  ) {
    return '✨ *Premium Toppings & Builder Options*:\n\n' +
      '• 🍬 Rainbow Sprinkles: +₹50\n' +
      '• 🍫 Choco Chips: +₹60\n' +
      '• 🥜 Pure Nuts: +₹90\n' +
      '• 🍓 Fresh Fruits: +₹120\n' +
      '• 🧁 Sweet Macarons: +₹180\n' +
      '• 🕯️ Celebration Candles: +₹40\n' +
      '• 📸 **Photo Cake Selection**: Add your custom picture to print safely on top for a flat +₹199 rate!\n\n' +
      'These can be customized interactively inside the *Cake Builder* tab!';
  }

  // Location/Address
  if (
    query.includes('address') || query.includes('location') || query.includes('where') ||
    query.includes('place') || query.includes('shop') || query.includes('store') ||
    query.includes('panruti') || query.includes('cuddalore') || query.includes('landmark') ||
    query.includes('street') || query.includes('area')
  ) {
    return '📍 *Mahesh Bakery Panruti Main Store Address*:\n\n' +
      'No.5b, 2, Cuddalore Main Rd (directly opposite the Main Bus Stand), Ulunthampattu, Panruti, Tamil Nadu - 607106.\n\n' +
      'We proudly maintain over 500+ premium bakeries across India! Feel free to visit us or place your custom order directly online here.';
  }

  // Contact details / phone / WhatsApp
  if (
    query.includes('phone') || query.includes('whatsapp') || query.includes('contact') ||
    query.includes('number') || query.includes('call') || query.includes('mobile') ||
    query.includes('ph ') || query.includes('support')
  ) {
    return '📞 *Contact Mahesh Bakery (King of Bakery World)*:\n\n' +
      '• **Official Phone / WhatsApp**: +91 99444 16643\n' +
      '• **Official Email Support**: hello@maheshbakery.in\n\n' +
      'Once you design your dream cake in our *Cake Builder*, you can instantly click \'Order via WhatsApp\' to send the completed details directly to our bakers!';
  }

  // Working Hours
  if (
    query.includes('hour') || query.includes('timing') || query.includes('hours') ||
    query.includes('time') || query.includes('open') || query.includes('close') ||
    query.includes('morning') || query.includes('night')
  ) {
    return '⏰ *Business Hours*:\n\n' +
      'Mahesh Bakery is open daily from morning until **10:30 PM** at night.\n' +
      'For custom orders, you can select any delivery date and time directly in our calendar Scheduler inside the *Cake Builder*!';
  }

  // Tutorial / Website Navigation
  if (
    query.includes('builder') || query.includes('custom') || query.includes('design') ||
    query.includes('how to') || query.includes('order') || query.includes('make') ||
    query.includes('buy') || query.includes('cart') || query.includes('checkout')
  ) {
    return '✨ *Designing your customized dream celebration cake is incredibly simple!*:\n\n' +
      '1. Click the **Cake Builder** tab in the top navigation.\n' +
      '2. Pick your desired Cake Size (Half kg to 3kg).\n' +
      '3. Fill out custom Name & Age details (free of charge).\n' +
      '4. Tap inside the Custom Photo placeholder to upload coordinates or photos if you wish of a photo print cake.\n' +
      '5. Select mouth-watering premium toppings & set delivery Date/Time.\n' +
      '6. Tap **Add to Cart** or use **Order on WhatsApp** for instant celebration setup!';
  }

  // Outlets
  if (
    query.includes('outlet') || query.includes('branch') || query.includes('how many') ||
    query.includes('branches') || query.includes('india') || query.includes('franchise')
  ) {
    return '🏢 **Mahesh Bakery - King of Bakery World** has **over 500+ stores across India**! Our primary flagship outlet is beautifully located opposite the Panruti main Bus Stand in Tamil Nadu. All our outlets stick to the highest quality standards.';
  }

  // Greeting
  if (
    query.includes('hi') || query.includes('hello') || query.includes('hey') ||
    query.includes('vanakkam') || query.includes('how are you') || query.includes('help') ||
    query.includes('yo') || query.includes('sup')
  ) {
    return 'Hello! Welcome to **Mahesh Bakery** (King of bakery world) 🎂✨\n\n' +
      'Sweet celebrations begin here! I can help you with:\n\n' +
      '• Ask about **Custom Sizes & Prices** 🎂\n' +
      '• Ask about **Toppings & Photo Options** 🍓\n' +
      '• Ask for our **Address & WhatsApp Contact Details** 📍\n' +
      '• Learn **How to Order / Cake Builder** Tutorial ✨\n' +
      '• Ask about **Store Hours & Indian Branches** ⏰\n\n' +
      'How can I help sweeten your day?';
  }

  // Tamil expressions fallback
  if (
    query.includes('eppa') || query.includes('enna') || query.includes('nalla') ||
    query.includes('super') || query.includes('romba') || query.includes('nanri') ||
    query.includes('thanks') || query.includes('thank you')
  ) {
    return 'Thank you so much! Homely hospitality is our signature! If you have any questions about Mahesh Bakery (King of Bakery World) custom cakes, feel free to ask about sizes, prices, toppings or address! 🎂💖';
  }

  // Default fallback
  return '🎂 **Welcome to Mahesh Bakery** (King of Bakery World)!\n\n' +
    'I have all the exact bakery details right here to help you:\n\n' +
    '• 📍 **Our Address**: No.5b, 2, Cuddalore Main Rd (opposite Main Bus Stand), Ulunthampattu, Panruti, Tamil Nadu - 607106.\n' +
    '• 📞 **WhatsApp / Call**: +91 99444 16643\n' +
    '• ⏰ **Timings**: Daily from morning until 10:30 PM.\n' +
    '• 🍫 **Dubai Kunafa**: ₹70\n' +
    '• 🥛 **Badam Milk**: ₹25\n' +
    '• 🍰 **Cake Prices**: Half kg (₹599) | 1 kg (₹999) | 2 kg (₹1899) | 3 kg (₹2799).\n' +
    '• ✨ **Toppings**: Sprinkles (+₹50), Choco Chips (+₹60), Nuts (+₹90), Fruits (+₹120), Macarons (+₹180), Photo print (+₹199).\n\n' +
    'Try asking me about **kunafa**, **badam milk**, **prices**, **toppings**, or **address**! How can I make your celebration special?';
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders });
    }

    // POST /api/chat
    if (url.pathname === '/api/chat' && request.method === 'POST') {
      try {
        const { messages } = await request.json() as { messages: { role: string; content: string }[] };
        const responseText = generateLocalResponse(messages);

        return new Response(
          JSON.stringify({
            message: { role: 'assistant', content: responseText },
            provider: 'cloudflare-worker',
          }),
          {
            status: 200,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        );
      } catch (error) {
        return new Response(
          JSON.stringify({ error: 'Invalid request body' }),
          {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        );
      }
    }

    // POST /api/whatsapp/send
    if (url.pathname === '/api/whatsapp/send' && request.method === 'POST') {
      try {
        const { message, to } = await request.json() as { message: string; to: string };

        console.log(`[WHATSAPP SEND] To: ${to}\nMessage:\n${message}`);

        return new Response(
          JSON.stringify({ success: true, simulated: true }),
          {
            status: 200,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        );
      } catch (error) {
        return new Response(
          JSON.stringify({ success: false, error: 'Failed to process WhatsApp request' }),
          {
            status: 500,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        );
      }
    }

    // Health check
    if (url.pathname === '/' || url.pathname === '/health') {
      return new Response(
        JSON.stringify({ status: 'ok', service: 'mahesh-bakery-api', timestamp: new Date().toISOString() }),
        {
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    // 404 for everything else
    return new Response(
      JSON.stringify({ error: 'Not found' }),
      {
        status: 404,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  },
};
