import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Phone, Clock, Compass, ExternalLink } from 'lucide-react';

interface BranchItem {
  id: number;
  name: string;
  tag: string;
  image: string;
  address: string;
  timings: string;
  phone: string;
}

const BRANCHES_DATA: BranchItem[] = [
  {
    id: 1,
    name: "Mahesh Super Bakery & Sweets",
    tag: "Main Branch",
    image: "https://ik.imagekit.io/0boxn146f/ChatGPT%20Image%20Jun%2017,%202026,%2005_17_30%20PM.png",
    address: "190, Gandhi Rd, opp. govt High school, Saraswathi Nagar, Panruti, Thorapadi, Tamil Nadu 607106",
    timings: "Mon - Sun: 7:00 AM - 10:00 PM",
    phone: "+91 99444 16643"
  },
  {
    id: 2,
    name: "Mahesh Super Bakery & Sweets",
    tag: "Bus Stand Branch",
    image: "https://ik.imagekit.io/0boxn146f/49f1a5d1-e981-4511-a02e-05dcc410aeaa.png",
    address: "58/1, bus stand, Cuddalore Main Rd, opp. panruti, Ulunthampattu, Panruti, Tamil Nadu 607106",
    timings: "Mon - Sun: 7:00 AM - 10:00 PM",
    phone: "+91 99444 16643"
  },
  {
    id: 3,
    name: "Mahesh Super Bakery & Sweets",
    tag: "Kumbakonam Road Branch",
    image: "https://ik.imagekit.io/0boxn146f/410cadcf-ed1e-4869-b9d4-89cbd5ac02cc.png",
    address: "No:5, Kumbakonam - Chennai Rd, opposite Post Office, Panruti, Tamil Nadu 607106",
    timings: "Mon - Sun: 7:00 AM - 10:00 PM",
    phone: "+91 99444 16643"
  }
];

export default function Branches() {
  return (
    <div className="font-sans min-h-[80vh] bg-[#fdfbf7] py-10 sm:py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header section */}
        <div className="text-center mb-10 sm:mb-14">
          <span className="text-[#4f3370] text-xs font-black uppercase tracking-widest bg-purple-50 px-4 py-1.5 rounded-full border border-purple-100">
            Our Store Locator
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-[#2c1b40] mt-3.5 tracking-tight">
            Our Branches
          </h2>
          <p className="text-sm text-gray-500 font-semibold mt-1.5 max-w-md mx-auto">
            Choose your nearest branch to experience oven-fresh cakes, pure ghee sweets, and delicious bakes.
          </p>
        </div>

        {/* Responsive Grid for branches */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 items-stretch">
          {BRANCHES_DATA.map((branch, index) => {
            const mapQuery = encodeURIComponent(branch.address);
            const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${mapQuery}`;

            return (
              <motion.div 
                key={branch.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl border border-purple-100/40 flex flex-col h-full"
              >
                {/* Storefront Image */}
                <div className="relative aspect-[16/10] w-full bg-[#fcf9f5] overflow-hidden">
                  <img 
                    src={branch.image} 
                    alt={`${branch.name} - ${branch.tag}`} 
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover select-none hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                  {/* Soft overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2c1b40]/70 via-transparent to-transparent"></div>
                  
                  {/* Tag and name over image */}
                  <div className="absolute bottom-4 left-4 right-4 text-white z-10">
                    <span className="bg-[#FFB01A] text-slate-900 text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md mb-2 inline-block">
                      {branch.tag}
                    </span>
                    <h3 className="text-lg font-black tracking-tight drop-shadow-sm font-serif">
                      {branch.name}
                    </h3>
                  </div>
                </div>

                {/* Details Container */}
                <div className="p-5 sm:p-6 flex flex-col justify-between flex-grow space-y-5">
                  <div className="space-y-4">
                    {/* Address block */}
                    <div className="bg-purple-50/20 p-3.5 rounded-2xl border border-purple-100/20 flex gap-3 items-start">
                      <div className="bg-[#FFB01A] p-2.5 rounded-xl text-slate-900 shrink-0 shadow-sm mt-0.5">
                        <MapPin className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-[10px] font-black text-[#4f3370] tracking-wider uppercase mb-0.5">
                          Address
                        </h4>
                        <p className="text-gray-700 text-xs sm:text-sm font-bold leading-relaxed">
                          {branch.address}
                        </p>
                      </div>
                    </div>

                    {/* Operational Details */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div className="bg-[#fffdf9] p-3.5 rounded-xl border border-[#ede3d5]/30">
                        <h5 className="text-[9px] font-black text-amber-800 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-amber-600" />
                          <span>Timings</span>
                        </h5>
                        <p className="text-xs text-gray-700 font-extrabold">{branch.timings}</p>
                        <span className="text-[9px] text-gray-400 font-medium">Open Daily</span>
                      </div>

                      <div className="bg-[#faf7fc] p-3.5 rounded-xl border border-purple-100/30">
                        <h5 className="text-[9px] font-black text-[#4f3370] uppercase tracking-wider mb-1 flex items-center gap-1.5">
                          <Phone className="w-3.5 h-3.5 text-purple-600" />
                          <span>Phone</span>
                        </h5>
                        <p className="text-xs text-[#4f3370] font-extrabold">{branch.phone}</p>
                        <span className="text-[9px] text-gray-400 font-medium">Call for orders</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions CTA */}
                  <div className="pt-4 border-t border-gray-100 flex gap-2.5">
                    <a 
                      href={mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 text-center py-3 px-4 rounded-xl font-bold text-xs tracking-wide transition-all bg-[#4f3370] text-white hover:bg-[#3d2757] active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                    >
                      <Compass className="w-4 h-4 shrink-0" />
                      <span>Directions</span>
                      <ExternalLink className="w-3 h-3 text-white/70 shrink-0" />
                    </a>

                    <a 
                      href={`tel:${branch.phone.replace(/\s+/g, '')}`}
                      className="py-3 px-4 rounded-xl font-bold text-xs tracking-wide transition-all bg-white text-[#4f3370] border border-purple-100 hover:bg-purple-50/20 active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Phone className="w-4 h-4 shrink-0" />
                      <span>Call</span>
                    </a>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
