import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck } from 'lucide-react';

export default function PrivacyPolicy() {
  return (
    <div className="font-sans min-h-[85vh] bg-[#f8f5f0] py-16">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="w-16 h-16 bg-[#4f3370]/10 rounded-full flex items-center justify-center text-[#4f3370] mb-6">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-[#2c1b40] mb-4 tracking-tight">Privacy Policy</h1>
          <p className="text-gray-500 font-medium text-lg">
            Effective Date: May 2026
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
              At Mahesh Super Bakery & Sweets, accessible from our website, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by our website and how we use it.
            </p>
            <p>
              If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us.
            </p>

            <h3 className="text-2xl font-bold text-[#2c1b40] pt-6 mb-4">1. Information We Collect</h3>
            <p>
              We only collect personal information that you voluntarily provide to us when you interact with our website, such as when you place a custom cake order, subscribe to updates, or fill out a contact form. This information may include:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Contact Data:</strong> Your name, email address, and phone number.</li>
              <li><strong>Order Details:</strong> Information regarding custom cake designs, delivery addresses, and specific event dates.</li>
            </ul>

            <h3 className="text-2xl font-bold text-[#2c1b40] pt-6 mb-4">2. How We Use Your Information</h3>
            <p>
              We use the information we collect in various ways, including to:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Process, manage, and deliver your customized cake and sweet orders.</li>
              <li>Communicate with you regarding order confirmations, updates, or changes.</li>
              <li>Understand and analyze how you use our website to help improve our online menu and user experience.</li>
              <li>Prevent fraudulent transactions and ensure shop security.</li>
            </ul>

            <h3 className="text-2xl font-bold text-[#2c1b40] pt-6 mb-4">3. Data Storage and Security</h3>
            <p>
              We value your trust in providing us with your personal information. We implement commercial industry-standard security measures to protect your data. However, please note that no method of transmission over the internet or method of electronic storage is 100% secure.
            </p>

            <h3 className="text-2xl font-bold text-[#2c1b40] pt-6 mb-4">4. Cookies and Web Beacons</h3>
            <p>
              Like any other website, Mahesh Super Bakery & Sweets uses 'cookies'. These cookies are used to store information including visitors' preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users' experience by customizing our web page content based on visitors' browser type and/or other information.
            </p>

            <h3 className="text-2xl font-bold text-[#2c1b40] pt-6 mb-4">5. Third-Party Sharing</h3>
            <p>
              We do not sell, trade, or rent your personal identification information to third parties. We may use trusted third-party service providers (such as local delivery partners or secure payment gateways) strictly to help us operate our business and fulfill your bakery orders.
            </p>

            <h3 className="text-2xl font-bold text-[#2c1b40] pt-6 mb-4">6. Consent</h3>
            <p>
              By using our website, you hereby consent to our Privacy Policy and agree to its terms.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
