import React from 'react';
import { Instagram, Facebook, Youtube, Mail, MapPin, Phone, Clock, Truck, Users, ShieldCheck } from 'lucide-react';

export default function Footer({ onNavigate }: { onNavigate?: (page: string) => void }) {
  return (
    <footer className="bg-[#1c1129] font-sans text-white/80 pt-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-16 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Column 1: Brand */}
          <div className="space-y-6">
            <div className="bg-white px-5 py-2 rounded-full inline-block">
              <span className="font-black text-[#4f3370] text-xl tracking-tight leading-[1.1]">
                mahesh bakery<sup className="text-[10px] ml-0.5">&reg;</sup>
              </span>
            </div>
            <p className="text-sm leading-relaxed text-white/70 pr-4">
              Crafting happiness with every slice in Panruti. Premium cakes and desserts made with love, baked fresh, and served with a smile.
            </p>
            <div className="flex gap-4">
              <a href="https://www.instagram.com/Maheshbakerysweets" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#4f3370] transition-colors text-white" title="Instagram">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#4f3370] transition-colors text-white">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#4f3370] transition-colors text-white">
                <Youtube className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#4f3370] transition-colors text-white">
                <Mail className="w-5 h-5" />
              </a>
            </div>
            <p className="text-xs text-white/50">Instagram: @Maheshbakerysweets</p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-white font-serif font-bold text-lg mb-6">Quick Links</h4>
            <ul className="space-y-4 text-sm">
              <li><a href="#" className="hover:text-[#d8b4fe] transition-colors" onClick={(e) => { e.preventDefault(); if (onNavigate) onNavigate('home'); }}>Home</a></li>
              <li><a href="#" className="hover:text-[#d8b4fe] transition-colors" onClick={(e) => { e.preventDefault(); if (onNavigate) onNavigate('menu'); }}>Cakes</a></li>
              <li><a href="#" className="hover:text-[#d8b4fe] transition-colors" onClick={(e) => { e.preventDefault(); if (onNavigate) onNavigate('own-make'); }}>Our Own Make</a></li>
              <li><a href="#" className="hover:text-[#d8b4fe] transition-colors">Workshop Booking</a></li>
              <li><a href="#" className="hover:text-[#d8b4fe] transition-colors" onClick={(e) => { e.preventDefault(); if (onNavigate) onNavigate('about'); }}>About Us</a></li>
              <li><a href="#" className="hover:text-[#d8b4fe] transition-colors" onClick={(e) => { e.preventDefault(); if (onNavigate) onNavigate('branches'); }}>Our Branches</a></li>
              <li><a href="#" className="hover:text-[#d8b4fe] transition-colors" onClick={(e) => { e.preventDefault(); if (onNavigate) onNavigate('contact'); }}>Contact</a></li>
            </ul>
          </div>

          {/* Column 3: Customer Service */}
          <div>
            <h4 className="text-white font-serif font-bold text-lg mb-6">Customer Service</h4>
            <ul className="space-y-4 text-sm">
              <li><a href="#" className="hover:text-[#d8b4fe] transition-colors">FAQ</a></li>
              <li><a href="#" className="hover:text-[#d8b4fe] transition-colors">Shipping & Delivery</a></li>
              <li><a href="#" className="hover:text-[#d8b4fe] transition-colors">Returns & Refunds</a></li>
              <li><a href="#" className="hover:text-[#d8b4fe] transition-colors" onClick={(e) => { e.preventDefault(); if (onNavigate) onNavigate('terms'); }}>Terms & Conditions</a></li>
              <li><a href="#" className="hover:text-[#d8b4fe] transition-colors" onClick={(e) => { e.preventDefault(); if (onNavigate) onNavigate('privacy'); }}>Privacy Policy</a></li>
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h4 className="text-white font-serif font-bold text-lg mb-6">Contact</h4>
            <ul className="space-y-6 text-sm">
              <li className="flex gap-4 items-start">
                <MapPin className="w-5 h-5 text-[#d8b4fe] shrink-0 mt-0.5" />
                <div className="space-y-1.5 leading-relaxed text-xs sm:text-sm text-white/90">
                  <p>1. No.5b, 2, Cuddalore Main Rd, opp. bus stand, Ulunthampattu, Panruti</p>
                  <p>2. No 5, Kumbakonam Road, Panruti</p>
                </div>
              </li>
              <li className="flex gap-4 items-center">
                <Phone className="w-5 h-5 text-[#d8b4fe] shrink-0" />
                <div className="flex flex-col space-y-0.5">
                  <a href="tel:9944416643" className="hover:text-white transition-colors">+91 99444 16643</a>
                  <a href="tel:9566789171" className="hover:text-white transition-colors">+91 95667 89171</a>
                  <a href="tel:9865666233" className="hover:text-white transition-colors">+91 98656 66233</a>
                </div>
              </li>
              <li className="flex gap-4 items-center">
                <Mail className="w-5 h-5 text-[#d8b4fe] shrink-0" />
                <span>maheshsuperbakerymg@gmail.com</span>
              </li>
              <li className="flex gap-4 items-center">
                <Clock className="w-5 h-5 text-[#d8b4fe] shrink-0" />
                <span>Open · Closes 10:30 PM</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Features Bar */}
      <div className="border-t border-white/10 bg-white/5 py-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#4f3370]/30 text-[#d8b4fe] flex items-center justify-center shrink-0 border border-[#4f3370]/50">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h5 className="text-white font-bold text-sm">On-Time Delivery</h5>
              <p className="text-xs text-white/50 mt-1">Same day available</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#4f3370]/30 text-[#d8b4fe] flex items-center justify-center shrink-0 border border-[#4f3370]/50">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <h5 className="text-white font-bold text-sm">All You Can Eat</h5>
              <p className="text-xs text-white/50 mt-1">Workshop service</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#4f3370]/30 text-[#d8b4fe] flex items-center justify-center shrink-0 border border-[#4f3370]/50">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h5 className="text-white font-bold text-sm">100% Fresh</h5>
              <p className="text-xs text-white/50 mt-1">Baked on order</p>
            </div>
          </div>
          <a 
            href="https://www.instagram.com/Maheshbakerysweets" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center gap-4 hover:opacity-90 transition-opacity"
          >
            <div className="w-12 h-12 rounded-full bg-[#4f3370]/30 text-[#d8b4fe] flex items-center justify-center shrink-0 border border-[#4f3370]/50">
              <Instagram className="w-6 h-6" />
            </div>
            <div>
              <h5 className="text-white font-bold text-sm">@Maheshbakerysweets</h5>
              <p className="text-xs text-white/50 mt-1">Follow us on Instagram</p>
            </div>
          </a>
        </div>
      </div>

      {/* Copyright */}
      <div className="bg-[#130b1c] py-6 text-center">
        <p className="text-xs text-white/40">
          © {new Date().getFullYear()} Mahesh Bakery. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
