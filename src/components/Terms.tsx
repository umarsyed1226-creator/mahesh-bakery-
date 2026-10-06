import React from 'react';
import { motion } from 'motion/react';
import { FileText } from 'lucide-react';

export default function Terms() {
  return (
    <div className="font-sans min-h-[85vh] bg-[#f8f5f0] py-16">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="w-16 h-16 bg-[#4f3370]/10 rounded-full flex items-center justify-center text-[#4f3370] mb-6">
            <FileText className="w-8 h-8" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-[#2c1b40] mb-4 tracking-tight">Terms and Conditions</h1>
          <p className="text-gray-500 font-medium text-lg">
            Last Updated: May 2026
          </p>
        </div>

        {/* Content Box */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-3xl p-8 md:p-12 shadow-md border border-purple-100/50"
        >
          <div className="prose prose-purple max-w-none text-gray-600 space-y-6">
            <p className="font-medium text-lg leading-relaxed text-[#3c2a4f]">
              Welcome to the official website of Mahesh Super Bakery & Sweets. By accessing or using our website and placing orders with us, you agree to comply with and be bound by the following terms and conditions. Please read them carefully before using our services.
            </p>
            <p>
              The terms "we," "us," and "our" refer to Mahesh Super Bakery & Sweets. The term "you" refers to the user, customer, or visitor of our website.
            </p>

            <h3 className="text-2xl font-bold text-[#2c1b40] pt-6 mb-4">1. Ordering & Customizations</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Custom Cake Orders:</strong> All customized birthday, wedding, or anniversary cake orders must be placed at least 24 to 48 hours in advance to ensure our bakers have adequate time for preparation.</li>
              <li><strong>Design Variations:</strong> While we strive to match your requested custom designs perfectly, minor variations in color shading, cream texture, and edible decorations may occur as cakes are handmade by artisanal bakers.</li>
            </ul>

            <h3 className="text-2xl font-bold text-[#2c1b40] pt-6 mb-4">2. Pricing & Payments</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Price Adjustments:</strong> Prices for our sweets, bakes, and specialized cakes are subject to change without prior notice due to seasonal ingredient costs.</li>
              <li><strong>Advance Deposits:</strong> For large festive sweet boxes or premium custom cakes, a partial or full advance deposit may be required to confirm the booking.</li>
            </ul>

            <h3 className="text-2xl font-bold text-[#2c1b40] pt-6 mb-4">3. Cancellation & Refund Policy</h3>
            <div className="overflow-x-auto my-4">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#f8f5f0] text-[#4f3370]">
                    <th className="p-4 border border-purple-100 font-bold rounded-tl-xl">Timeframe</th>
                    <th className="p-4 border border-purple-100 font-bold rounded-tr-xl">Refund Eligibility</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-4 border border-purple-50 font-medium">Cancellations made 24+ hours before pickup/delivery</td>
                    <td className="p-4 border border-purple-50">Eligible for a full refund or store credit.</td>
                  </tr>
                  <tr className="bg-gray-50/50">
                    <td className="p-4 border border-purple-50 font-medium">Cancellations made less than 24 hours notice</td>
                    <td className="p-4 border border-purple-50">No refund can be issued, as ingredients and custom sponge bases are prepared specifically for your order.</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-2xl font-bold text-[#2c1b40] pt-6 mb-4">4. Pickup & Delivery</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Store Pickup:</strong> Orders must be picked up during our operational hours (7:00 AM – 10:30 PM) at our main outlet located opposite the Panruti Bus Stand.</li>
              <li><strong>Freshness Liability:</strong> We guarantee the absolute freshness of our products at the time of handoff. Mahesh Super Bakery & Sweets is not responsible for any damage occurring to cakes or delicate sweets during transit once they leave our premises.</li>
            </ul>

            <h3 className="text-2xl font-bold text-[#2c1b40] pt-6 mb-4">5. Food Allergies & Ingredients</h3>
            <p>
              Our bakery processes items containing milk, wheat, nuts, and eggs. If you or your guests have severe food allergies, it is your responsibility to inform our staff directly before finalizing any order.
            </p>

            <h3 className="text-2xl font-bold text-[#2c1b40] pt-6 mb-4">6. Governing Law</h3>
            <p>
              These terms and conditions are governed by and construed in accordance with the laws of Tamil Nadu, India. Any disputes relating to our services will be subject to the exclusive jurisdiction of the courts in Cuddalore district.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
