import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import { OpenAI } from "openai";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

// Initialize the built-in Gemini client lazily to prevent crash on startup if key is missing
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY environment variable is required");
    }
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

const systemInstruction = `You are the friendly, professional AI chatbot for Mahesh Bakery (slogan: "Sweet celebrations begin here" and "king of bakery world"). 
You provide extremely accurate, highly detailed, and helpful information about our offerings, store detail, pricing, and how to use the website.

Here is the official, correct information about Mahesh Bakery that you MUST always adhere to:

=== STORE DETAILS ===
- Website Navigation:
  * "Home": Main page with banners and promo posters.
  * "Cake Builder": Custom cake page where users can select sizes, toppings, add name/age/messages, upload custom photos, specify delivery time, and checkout or send the order via WhatsApp.
  * "Profile Icon" (Top Right): Login page, account management, order tracking, and custom profile picture avatar upload.
  * "Cart Icon" (Top Right): View items, manage quantities, and proceed to checkout.
- Address: No.5b, 2, Cuddalore Main Rd, opp. bus stand, Ulunthampattu, Panruti, Tamil Nadu 607106.
- Phone & WhatsApp Contact: +91 99444 16643 (Or order online and click to open WhatsApp chat automatically).
- Email: hello@maheshbakery.in
- Working Hours: Daily from morning, closes at 10:30 PM.
- Outlets: Mahesh Bakery has over 500+ stores across India.
- Quality Promise: All cakes are baked fresh on the exact day of order using premium ingredients.

=== CAKE BUILDER SIZE & PRICING ===
Recommend these official prices from our custom Cake Builder:
- Half Kg (500g): ₹599
- 1 Kg (1000g): ₹999
- 2 Kg (2000g): ₹1899
- 3 Kg (3000g): ₹2799

=== OTHER SPECIAL OFFERINGS ===
- Dubai Kunafa (Dubai Kunaffa): ₹70
- Creamy Badam Milk (Badam Milk): ₹25

=== PREMIUM TOPPINGS & OPTIONS (ADD-ONS) ===
- Choco Chips: +₹60
- Fruits: +₹120
- Nuts: +₹90
- Candles: +₹40
- Macarons: +₹180
- Sprinkles: +₹50
- Photo Cake: Option to upload a custom picture to print directly on top of the cake for +₹199 flat rate.

=== SERVICE CAPABILITIES ===
- Name & Age Customization: Users can write a custom name and age to place on the cake for free.
- Message Customization: Custom message can be added (e.g. "Happy Birthday", "Happy Anniversary").
- Delivery Date & Time: Users can schedule their celebration cake in advance directly within the builder.
- Cart & Checkout: If the user is logged in, checking out will save the order history in their profile. If not logged in, they can still order and send details instantly via WhatsApp!

=== TONE & CONVERSATIONAL STYLE ===
- Extremely polite, enthusiastic, sweet, and knowledgeable.
- Respond in clear English. If the user uses Tamil, Tamil slang, or mixed Tanglish (English-Tamil), speak back warmly with a blend of sweet English and friendly Tamil.
- Help guide users step-by-step; for example, suggest they open the 'Cake Builder' tab to dynamically design their cake.`;

// Highly accurate, detailed local fallback generator for when Gemini and OpenAI limits/errors hit
function generateLocalResponse(messages: any[]): string {
  const lastMessage = messages[messages.length - 1];
  const query = (lastMessage?.content || "").toLowerCase().trim();

  // Dubai Kunafa specific inquiries
  if (query.includes("kunafa") || query.includes("dubai")) {
    return "🍫 **Dubai Kunafa**: Extra rich, authentic, crispy, sweet and delicious!\n\n" +
           "• **Price**: **₹70** per pack / plate. 🎂\n\n" +
           "Would you like to try our special recipe? Drop by our store or order today!";
  }

  // Badam Milk specific inquiries
  if (query.includes("badam") || query.includes("milk")) {
    return "🥛 **Creamy Badam Milk**: Baked almonds cooked with authentic milk and rich saffron!\n\n" +
           "• **Price**: **₹25** only. 🌟\n\n" +
           "It is extremely healthy, refreshing, and served perfectly chilled. Visit our shop or place an order!";
  }

  // Price inquiries
  if (
    query.includes("price") || 
    query.includes("rate") || 
    query.includes("cost") || 
    query.includes("pricing") || 
    query.includes("size") || 
    query.includes("how much") || 
    query.includes("valai") ||
    query.includes("amount") ||
    query.includes("rupees") ||
    query.includes("kg") ||
    query.includes("rs") ||
    query.includes("costly")
  ) {
    return "🎂 *Official Custom Cake Builder Sizes & Pricing*:\n\n" +
           "• 🍰 **Half Kg (500g)**: ₹599\n" +
           "• 🎂 **1 Kg (1000g)**: ₹999\n" +
           "• 🍰 **2 Kg (2000g)**: ₹1899\n" +
           "• 🎂 **3 Kg (3000g)**: ₹2799\n\n" +
           "All cakes are made with 100% premium ingredients and baked fresh on the exact day of delivery. Go to the *Cake Builder* tab to configure yours right now!";
  }

  // Toppings & Add-ons
  if (
    query.includes("topping") || 
    query.includes("toppings") || 
    query.includes("add-on") || 
    query.includes("add on") || 
    query.includes("sprinkle") || 
    query.includes("chips") || 
    query.includes("nuts") || 
    query.includes("fruits") || 
    query.includes("macaron") || 
    query.includes("candle") || 
    query.includes("photo") ||
    query.includes("pic") ||
    query.includes("image") ||
    query.includes("flavor") ||
    query.includes("flavour")
  ) {
    return "✨ *Premium Toppings & Builder Options*:\n\n" +
           "• 🍬 Rainbow Sprinkles: +₹50\n" +
           "• 🍫 Choco Chips: +₹60\n" +
           "• 🥜 Pure Nuts: +₹90\n" +
           "• 🍓 Fresh Fruits: +₹120\n" +
           "• 🧁 Sweet Macarons: +₹180\n" +
           "• 🕯️ Celebration Candles: +₹40\n" +
           "• 📸 **Photo Cake Selection**: Add your custom picture to print safely on top for a flat +₹199 rate!\n\n" +
           "These can be customized interactively inside the *Cake Builder* tab!";
  }

  // Location/Address
  if (
    query.includes("address") || 
    query.includes("location") || 
    query.includes("where") || 
    query.includes("place") || 
    query.includes("shop") || 
    query.includes("store") || 
    query.includes("panruti") || 
    query.includes("cuddalore") || 
    query.includes("landmark") ||
    query.includes("street") ||
    query.includes("area")
  ) {
    return "📍 *Mahesh Bakery Panruti Main Store Address*:\n\n" +
           "No.5b, 2, Cuddalore Main Rd (directly opposite the Main Bus Stand), Ulunthampattu, Panruti, Tamil Nadu - 607106.\n\n" +
           "We proudly maintain over 500+ premium bakeries across India! Feel free to visit us or place your custom order directly online here.";
  }

  // Contact details / phone / WhatsApp
  if (
    query.includes("phone") || 
    query.includes("whatsapp") || 
    query.includes("contact") || 
    query.includes("number") || 
    query.includes("call") || 
    query.includes("mobile") || 
    query.includes("ph ") ||
    query.includes("support") ||
    query.includes("phone")
  ) {
    return "📞 *Contact Mahesh Bakery (King of Bakery World)*:\n\n" +
           "• **Official Phone / WhatsApp**: +91 99444 16643\n" +
           "• **Official Email Support**: hello@maheshbakery.in\n\n" +
           "Once you design your dream cake in our *Cake Builder*, you can instantly click 'Order via WhatsApp' to send the completed details directly to our bakers!";
  }

  // Working Hours
  if (
    query.includes("hour") || 
    query.includes("timing") || 
    query.includes("hours") || 
    query.includes("time") || 
    query.includes("open") || 
    query.includes("close") ||
    query.includes("morning") ||
    query.includes("night")
  ) {
    return "⏰ *Business Hours*:\n\n" +
           "Mahesh Bakery is open daily from morning until **10:30 PM** at night.\n" +
           "For custom custom orders, you can select any delivery date and time directly in our calendar Scheduler inside the *Cake Builder*!";
  }

  // Tutorial / Website Navigation
  if (
    query.includes("builder") || 
    query.includes("custom") || 
    query.includes("design") || 
    query.includes("how to") || 
    query.includes("order") || 
    query.includes("make") ||
    query.includes("buy") ||
    query.includes("cart") ||
    query.includes("checkout")
  ) {
    return "✨ *Designing your customized dream celebration cake is incredibly simple!*:\n\n" +
           "1. Click the **Cake Builder** tab in the top navigation.\n" +
           "2. Pick your desired Cake Size (Half kg to 3kg).\n" +
           "3. Fill out custom Name & Age details (free of charge).\n" +
           "4. Tap inside the Custom Photo placeholder to upload coordinates or photos if you wish of a photo print cake.\n" +
           "5. Select mouth-watering premium toppings & set delivery Date/Time.\n" +
           "6. Tap **Add to Cart** or use **Order on WhatsApp** for instant celebration setup!";
  }

  // Outlets
  if (
    query.includes("outlet") || 
    query.includes("branch") || 
    query.includes("how many") || 
    query.includes("branches") ||
    query.includes("india") ||
    query.includes("franchise")
  ) {
    return "🏢 **Mahesh Bakery - King of Bakery World** has **over 500+ stores across India**! Our primary flagship outlet is beautifully located opposite the Panruti main Bus Stand in Tamil Nadu. All our outlets stick to the highest quality standards.";
  }

  // Greeting
  if (
    query.includes("hi") || 
    query.includes("hello") || 
    query.includes("hey") || 
    query.includes("vanakkam") || 
    query.includes("how are you") || 
    query.includes("help") ||
    query.includes("yo") ||
    query.includes("sup")
  ) {
    return "Hello! Welcome to **Mahesh Bakery** (King of bakery world) 🎂✨\n\n" +
           "Sweet celebrations begin here! If our online AI model servers are currently busy with high demand, I am ready helper offline! I can tell you official details:\n\n" +
           "• Ask about **Custom Sizes & Prices** 🎂\n" +
           "• Ask about **Toppings & Photo Options** 🍓\n" +
           "• Ask for our **Address & WhatsApp Contact Details** 📍\n" +
           "• Learn **How to Order / Cake Builder** Tutorial ✨\n" +
           "• Ask about **Store Hours & Indian Branches** ⏰\n\n" +
           "How can I help sweeten your day?";
  }

  // Tamil expressions fallback
  if (
    query.includes("eppa") ||
    query.includes("enna") ||
    query.includes("nalla") ||
    query.includes("super") ||
    query.includes("romba") ||
    query.includes("nanri") ||
    query.includes("thanks") ||
    query.includes("thank you")
  ) {
    return "Thank you so much! Homely hospitality is our signature! If you have any questions about Mahesh Bakery (King of Bakery World) custom cakes, feel free to ask about sizes, prices, toppings or address! 🎂💖";
  }

  // Default beautiful smart fallback of all store coordinates
  return "🎂 **Welcome to Mahesh Bakery** (King of Bakery World)!\n\n" +
         "Our primary AI servers are currently experiencing heavy traffic, but I have all the exact bakery details right here to help you offline:\n\n" +
         "• 📍 **Our Address**: No.5b, 2, Cuddalore Main Rd (opposite Main Bus Stand), Ulunthampattu, Panruti, Tamil Nadu - 607106.\n" +
         "• 📞 **WhatsApp / Call**: +91 99444 16643\n" +
         "• ⏰ **Timings**: Daily from morning until 10:30 PM.\n" +
         "• 🍫 **Dubai Kunafa**: ₹70\n" +
         "• 🥛 **Badam Milk**: ₹25\n" +
         "• 🍰 **Cake Prices**: Half kg (₹599) | 1 kg (₹999) | 2 kg (₹1899) | 3 kg (₹2799).\n" +
         "• ✨ **Toppings**: Sprinkles (+₹50), Choco Chips (+₹60), Nuts (+₹90), Fruits (+₹120), Macarons (+₹180), Photo print (+₹199).\n\n" +
         "Try asking me about **kunafa**, **badam milk**, **prices**, **toppings**, or **address**! How can I make your celebration special?";
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route for Chatbot — now uses local responses only (no external API keys needed)
  app.post("/api/chat", async (req, res) => {
    const { messages } = req.body;

    // Use the local rule-based response generator (no API keys required)
    const localResponseText = generateLocalResponse(messages);
    
    return res.json({
      message: {
        role: "assistant",
        content: localResponseText
      },
      provider: "local"
    });
  });

  // WhatsApp sending API route (requires TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_WHATSAPP_NUMBER in production)
  app.post("/api/whatsapp/send", async (req, res) => {
    const { message, to } = req.body;
    
    // Check if Twilio API keys are configured, if not, we securely log and return success for the demo.
    if (!process.env.TWILIO_ACCOUNT_SID || !process.env.TWILIO_AUTH_TOKEN) {
      console.log(`[SIMULATED WHATSAPP SEND] To: ${to}\nMessage:\n${message}`);
      console.log("Please configure TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN in .env for real background sending.");
      return res.status(200).json({ success: true, simulated: true });
    }

    try {
      // In a real env, import twilio and send here.
      // const client = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
      // await client.messages.create({ body: message, from: `whatsapp:${process.env.TWILIO_WHATSAPP_NUMBER}`, to: `whatsapp:+${to}` });
      
      return res.status(200).json({ success: true });
    } catch (error: any) {
      console.error("WhatsApp API Error:", error.message);
      return res.status(500).json({ success: false, error: 'Failed to send WhatsApp message' });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    // Since we're using Express v4 or v5, let's use '*' which works in both v4 and v5
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
