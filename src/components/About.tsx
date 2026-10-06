import React from 'react';
import { motion } from 'motion/react';
import { Heart, ShieldCheck, MapPin, Cake, Utensils, Gift, Award } from 'lucide-react';

export default function About() {
  return (
    <div className="font-sans min-h-[85vh] bg-[#f8f5f0]">
      {/* Hero Section */}
      <div className="w-full bg-white text-[#4f3370] py-20 px-6 lg:px-16 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-rose-400/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 tracking-tight drop-shadow-sm text-[#2c1b40]"
          >
            Welcome to Mahesh Super Bakery & Sweets
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg md:text-xl text-gray-600 leading-relaxed font-medium"
          >
            For nearly five decades, Mahesh Super Bakery & Sweets has been a beloved landmark of taste, quality, and tradition in Panruti. Established in 1977, we have grown alongside our community, serving generations of families with the finest selection of freshly baked goods, artisanal celebration cakes, and authentic Indian sweets.
          </motion.p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 lg:px-16 py-16 -mt-10">
        
        {/* Intro Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-purple-100/50 mb-16 relative z-20 flex flex-col md:flex-row items-center gap-8"
        >
          <div className="w-16 h-16 bg-[#4f3370]/10 text-[#4f3370] rounded-full flex items-center justify-center shrink-0">
            <MapPin className="w-8 h-8" />
          </div>
          <p className="text-[#3c2a4f] text-lg md:text-xl font-medium leading-relaxed">
            Located strategically on Cuddalore Main Road, directly opposite the Panruti Bus Stand, we serve as a welcoming destination for both local residents and travelers looking for a premium culinary experience or a comforting, high-quality bite on the move.
          </p>
        </motion.div>

        {/* Pillars Section */}
        <div className="mb-20">
          <h2 className="text-3xl md:text-4xl font-black text-[#2c1b40] mb-10 text-center relative inline-block left-1/2 -translate-x-1/2">
            Our Core Pillars
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-12 h-1.5 bg-[#FFB01A] rounded-full"></div>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-3xl shadow-md border border-purple-50 hover:shadow-lg transition-shadow"
            >
              <div className="w-14 h-14 bg-rose-50 rounded-2xl flex items-center justify-center text-rose-500 mb-6">
                <Heart className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-[#2c1b40] mb-3">Our Mission</h3>
              <p className="text-gray-600 font-medium leading-relaxed">
                To bring joy to every celebration and everyday moment by crafting high-quality, delicious bakes and traditional confections that bring people together.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white p-8 rounded-3xl shadow-md border border-purple-50 hover:shadow-lg transition-shadow"
            >
              <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 mb-6">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-[#2c1b40] mb-3">Our Commitment</h3>
              <p className="text-gray-600 font-medium leading-relaxed">
                We firmly believe that great taste begins with premium ingredients. Every sweet, pastry, and loaf of bread is crafted under strict hygiene standards.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white p-8 rounded-3xl shadow-md border border-purple-50 hover:shadow-lg transition-shadow"
            >
              <div className="w-14 h-14 bg-[#4f3370]/10 rounded-2xl flex items-center justify-center text-[#4f3370] mb-6">
                <Award className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-[#2c1b40] mb-3">Our Legacy</h3>
              <p className="text-gray-600 font-medium leading-relaxed">
                Rooted in a 49-year culinary heritage, we blend time-honored traditional recipes with modern baking techniques to deliver perfection.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Special Features Section */}
        <div className="mb-20">
          <div className="bg-[#fffdf9] rounded-3xl border border-[#ede3d5] p-8 md:p-12">
            <h2 className="text-3xl font-black text-[#2c1b40] mb-10 text-center">What Makes Us Special</h2>
            
            <div className="space-y-10">
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="w-16 h-16 bg-[#4f3370]/10 rounded-full flex items-center justify-center text-[#4f3370] shrink-0">
                  <Cake className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-[#2c1b40] mb-2 flex items-center gap-2">
                    Custom Celebration Cakes
                  </h3>
                  <p className="text-gray-600 font-medium leading-relaxed text-lg">
                    Every milestone deserves a spectacular center-piece. From customized birthday designs to elaborate multi-tiered anniversary cakes, our master bakers meticulously design and bake custom creations tailored specifically to your taste and visual preferences.
                  </p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="w-16 h-16 bg-[#FFB01A]/20 rounded-full flex items-center justify-center text-[#d18f10] shrink-0">
                  <Utensils className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-[#2c1b40] mb-2 flex items-center gap-2">
                    Daily Oven-Fresh Bakes & Snacks
                  </h3>
                  <p className="text-gray-600 font-medium leading-relaxed text-lg">
                    Step inside for our signature, flaky hot puffs (Veg, Egg, and Chicken), freshly baked bread, buns, and everyday tea-time essentials. Prepared fresh throughout the day, they provide the perfect, quick energy boost for commuters and busy locals.
                  </p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center text-rose-600 shrink-0">
                  <Gift className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-[#2c1b40] mb-2 flex items-center gap-2">
                    Authentic Heritage Sweets
                  </h3>
                  <p className="text-gray-600 font-medium leading-relaxed text-lg">
                    From rich, milk-based pedas and melt-in-your-mouth gulab jamuns to premium festive assortment boxes, our traditional sweets are prepared using pure ingredients to capture the true, nostalgic essence of Indian festivities.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Closing Promise */}
        <div className="text-center bg-[#4f3370] text-white rounded-3xl p-10 shadow-2xl relative overflow-hidden">
           <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
           <div className="relative z-10 max-w-3xl mx-auto">
             <h2 className="text-3xl font-black mb-6 text-[#FFB01A]">Our Promise to You</h2>
             <p className="text-lg md:text-xl font-medium leading-relaxed text-white/90">
               Whether you are popping in for a quick cup of hot tea and a snack before catching your bus, or ordering a custom dream cake for your child’s birthday, <strong className="text-white">Mahesh Super Bakery & Sweets</strong> guarantees exceptional flavor, pristine hygiene, and warm hospitality every single time.
             </p>
           </div>
        </div>

      </div>
    </div>
  );
}
