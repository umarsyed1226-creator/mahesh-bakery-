import React from 'react';
import { ShoppingBag, ArrowRight, ArrowLeft, Trash2, Cake, MapPin, Phone, User } from 'lucide-react';
import { CartItem } from '../types';

interface CartProps {
  cartItems: CartItem[];
  isAuthenticated: boolean;
  user?: { name: string; phone: string; address?: string } | null;
  onRemoveItem: (id: string) => void;
  onBrowse: () => void;
  onCheckout: (details: {name: string, phone: string, address: string}) => void;
  onRequiresAuth: () => void;
}

export default function Cart({ cartItems, isAuthenticated, user, onRemoveItem, onBrowse, onCheckout, onRequiresAuth }: CartProps) {
  const total = cartItems.reduce((acc, item) => acc + item.grandTotal, 0);
  
  const [step, setStep] = React.useState<'cart' | 'checkout'>('cart');
  const [customerName, setCustomerName] = React.useState(user?.name || '');
  const [customerPhone, setCustomerPhone] = React.useState(user?.phone || '');
  const [customerAddress, setCustomerAddress] = React.useState(user?.address || '');
  const [phoneError, setPhoneError] = React.useState<string | null>(null);

  // Sync with user details when loaded
  React.useEffect(() => {
    if (user) {
      if (user.name && !customerName) setCustomerName(user.name);
      if (user.phone && !customerPhone) setCustomerPhone(user.phone);
      if (user.address && !customerAddress) setCustomerAddress(user.address);
    }
  }, [user]);

  const handleProceedToCheckout = () => {
    if (!isAuthenticated) {
      onRequiresAuth();
      return;
    }
    setStep('checkout');
  };

  const handleCheckout = () => {
    if (!isAuthenticated) {
      onRequiresAuth();
      return;
    }

    if (!customerName.trim() || !customerPhone.trim() || !customerAddress.trim()) {
        alert("Please fill in all delivery details (Name, Phone, and Address) before checking out.");
        return;
    }

    const normalizedPhone = customerPhone.replace(/[^0-9]/g, '');
    if (normalizedPhone.length !== 10) {
        setPhoneError("Phone number must be exactly 10 digits.");
        return;
    }
    setPhoneError(null);

    let orderDetails = `*New Cart Order* 🛒\n\n`;
    
    cartItems.forEach((item, index) => {
      const isCustomCake = item.sizeLabel.toLowerCase().includes('kg') || item.sizeLabel.toLowerCase().includes('half');
      orderDetails += `*Order #${index + 1}:*\n`;
      if (item.name && item.category !== 'Cakes') {
          orderDetails += `Product: ${item.name}\n`;
      }
      if (isCustomCake) {
        if (item.name) orderDetails += `Name on Cake: ${item.name}\n`;
        orderDetails += `Size: ${item.sizeLabel} (₹${item.sizePrice})\n`;
        if (item.age) orderDetails += `Age on Cake: ${item.age}\n`;
        if (item.message) orderDetails += `Message: ${item.message}\n`;
        if (item.photoUrl) {
          orderDetails += `Photo Cake: Yes (+₹199)\n`;
          orderDetails += `Photo URL: ${item.photoUrl}\n`;
        }
        if (item.toppings && item.toppings.length > 0) {
          orderDetails += `Toppings Included (${item.toppings.length})\n`;
        }
      } else {
        orderDetails += `Size/Variant: ${item.sizeLabel} (₹${item.sizePrice})\n`;
      }
      
      if (item.customerPhone || item.customerName) {
        orderDetails += `\n*Customer Details:*\n`;
        if (item.customerName) orderDetails += `Name: ${item.customerName}\n`;
        if (item.customerPhone) orderDetails += `Phone: ${item.customerPhone}\n`;
        if (item.customerEmail) orderDetails += `Email: ${item.customerEmail}\n`;
        if (item.customerAddress) orderDetails += `Address: ${item.customerAddress}\n`;
      }
      
      orderDetails += `Quantity: ${item.quantity}\n`;
      orderDetails += `Item Total: ₹${item.grandTotal}\n\n`;
    });

    orderDetails += `*Overall Total: ₹${total}*\n`;
    orderDetails += `*Payment Method:* Cash on Delivery\n\n`;
    
    orderDetails += `*Delivery Details:*\n`;
    orderDetails += `Name: ${customerName}\n`;
    orderDetails += `Phone: ${customerPhone}\n`;
    orderDetails += `Address: ${customerAddress}\n`;

    // Redirect to WhatsApp
    const whatsappUrl = `https://wa.me/919944416643?text=${encodeURIComponent(orderDetails)}`;
    window.open(whatsappUrl, '_blank');
    
    // Save order and clear cart via parent callback
    onCheckout({ 
      name: customerName, 
      phone: customerPhone, 
      address: customerAddress 
    });
  };

  if (cartItems.length === 0) {
    return (
      <div className="py-24 px-6 min-h-[70vh] bg-[#fcfbfe]">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-serif font-black text-[#2c1b40] mb-8">
            Your <span className="text-[#4f3370]">Cart</span>
          </h2>
          
          <div className="bg-white rounded-[2.5rem] p-16 flex flex-col items-center justify-center text-center shadow-[0_15px_40px_rgba(79,51,112,0.03)] border border-gray-50 min-h-[450px]">
            <div className="w-20 h-20 bg-[#4f3370] text-white rounded-full flex items-center justify-center mb-6 shadow-sm">
              <ShoppingBag className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-serif font-bold text-[#2c1b40] mb-3">Your cart is empty</h3>
            <p className="text-gray-500 font-medium mb-8">
              Looks like you haven't added any cakes yet.
            </p>
            <button 
              onClick={onBrowse}
              className="bg-[#4f3370] text-white px-8 py-3 rounded-full font-bold hover:bg-[#3d2757] transition-all shadow-md hover:shadow-lg flex items-center gap-2 group"
            >
              Browse Cakes
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-24 px-6 min-h-[70vh] bg-[#fcfbfe]">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          {step === 'checkout' && (
            <button 
              onClick={() => setStep('cart')}
              className="p-3 bg-white hover:bg-gray-50 rounded-full border border-gray-200 text-gray-600 transition-all shadow-sm hover:scale-105 active:scale-95 flex items-center justify-center"
              title="Back to Cart"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          )}
          <h2 className="text-4xl md:text-5xl font-serif font-black text-[#2c1b40]">
            {step === 'cart' ? (
              <>Your <span className="text-[#4f3370]">Cart</span></>
            ) : (
              <><span className="text-[#4f3370]">Checkout</span> Details</>
            )}
          </h2>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Cart Items or Checkout Details */}
          <div className="lg:col-span-2 space-y-6">
            {step === 'cart' ? (
              // STEP 1: CART ITEMS
              cartItems.map((item) => (
                <div key={item.id} className="bg-white rounded-[2rem] p-6 md:p-8 shadow-[0_15px_40px_rgba(79,51,112,0.03)] border border-gray-50 flex flex-col md:flex-row gap-6 items-center">
                  <div className="w-24 h-24 bg-purple-50/25 rounded-2xl flex items-center justify-center shrink-0 border border-gray-100 overflow-hidden shadow-sm">
                    {item.photoUrl ? (
                      <img src={item.photoUrl} alt="Cake Thumbnail" className="w-full h-full object-cover" onError={(e) => e.currentTarget.style.display = 'none'} />
                    ) : (
                      <Cake className="w-12 h-12 text-[#4f3370]/30" />
                    )}
                  </div>
                  
                  <div className="flex-1 text-center md:text-left">
                    <h3 className="text-xl font-bold text-[#2c1b40] mb-1">
                      {item.sizeLabel.toLowerCase().includes('kg') || item.sizeLabel.toLowerCase().includes('half') ? `${item.sizeLabel} Design Cake` : item.sizeLabel}
                    </h3>
                    <div className="text-sm font-medium text-gray-500 mb-3 space-y-0.5">
                      {(item.sizeLabel.toLowerCase().includes('kg') || item.sizeLabel.toLowerCase().includes('half')) ? (
                        <>
                          {item.name && <div>Name: {item.name}</div>}
                          {item.message && <div>Message: {item.message}</div>}
                          <div>Toppings: {item.toppings.length} added</div>
                        </>
                      ) : (
                        <div className="text-xs font-bold text-[#4f3370]/90 tracking-wide uppercase bg-purple-50 px-2.5 py-1 rounded-md inline-block mt-0.5 select-none">Bakery Fresh Product</div>
                      )}
                    </div>
                    <div className="flex items-center justify-center md:justify-start gap-4">
                      <span className="font-bold text-[#4f3370] bg-purple-50/30 px-3 py-1 rounded-lg text-sm">Qty: {item.quantity}</span>
                      <span className="font-black text-lg text-[#2c1b40]">₹{item.grandTotal}</span>
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => onRemoveItem(item.id)}
                    className="w-12 h-12 bg-red-50 hover:bg-red-100 text-red-500 rounded-full flex items-center justify-center transition-colors shrink-0 outline-none"
                    title="Remove Item"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))
            ) : (
              // STEP 2: CHECKOUT CONTACT DETAILS FORM
              <div className="bg-white rounded-[2.5rem] p-8 md:p-10 shadow-[0_15px_40px_rgba(79,51,112,0.03)] border border-gray-50 space-y-8 animate-fade-in">
                <div>
                  <h3 className="text-2xl font-serif font-black text-[#2c1b40] mb-2">Delivery & Contact Information</h3>
                  <p className="text-gray-500 text-sm">Please provide your details below. We will use this information to organize your fresh delivery and contact you on WhatsApp to confirm.</p>
                </div>

                <div className="space-y-6">
                  {/* Full Name */}
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold text-[#4f3370] uppercase tracking-wider flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5" /> Full Name
                    </label>
                    <input 
                      type="text" 
                      placeholder="e.g. Ramesh Kumar" 
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value.replace(/[^a-zA-Z\s]/g, ''))}
                      className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#4f3370]/20 focus:border-[#4f3370] transition-all bg-gray-50/20"
                    />
                  </div>

                  {/* Phone Number */}
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold text-[#4f3370] uppercase tracking-wider flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5" /> WhatsApp Phone Number (10 Digits)
                    </label>
                    <input 
                      type="tel" 
                      placeholder="e.g. 9944416643" 
                      maxLength={10}
                      value={customerPhone}
                      onChange={(e) => {
                        const val = e.target.value.replace(/[^0-9]/g, '');
                        if (val.length <= 10) {
                          setCustomerPhone(val);
                          if (val.length === 10) {
                            setPhoneError(null);
                          }
                        }
                      }}
                      className={`w-full px-5 py-4 rounded-2xl border focus:outline-none focus:ring-2 transition-all bg-gray-50/20 ${
                        phoneError ? 'border-red-300 focus:ring-red-100 focus:border-red-400' : 'border-gray-200 focus:ring-[#4f3370]/20 focus:border-[#4f3370]'
                      }`}
                    />
                    {phoneError && (
                      <p className="text-red-500 text-xs font-bold leading-none px-1 mt-1">{phoneError}</p>
                    )}
                  </div>

                  {/* Delivery Address */}
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold text-[#4f3370] uppercase tracking-wider flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5" /> Complete Delivery Address
                    </label>
                    <textarea 
                      placeholder="Enter street name, area, landmarks, pincode, etc." 
                      value={customerAddress}
                      onChange={(e) => setCustomerAddress(e.target.value)}
                      className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#4f3370]/20 focus:border-[#4f3370] transition-all bg-gray-50/20 min-h-[120px]"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Order Summary & Action Button */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-[2.5rem] p-8 shadow-[0_20px_50px_rgba(79,51,112,0.04)] border border-gray-50 flex flex-col gap-8">
              
              {/* Order Summary */}
              <div className="flex flex-col">
                <h3 className="text-2xl font-serif font-bold text-[#2c1b40] mb-6">Order Summary</h3>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-center text-gray-500 font-medium">
                    <span>Subtotal ({cartItems.length} items)</span>
                    <span className="font-bold text-[#2c1b40]">₹{total}</span>
                  </div>
                  <div className="flex justify-between items-center text-gray-500 font-medium">
                    <span>Delivery</span>
                    <span className="font-bold text-[#2c1b40]">Calculated via WhatsApp</span>
                  </div>
                </div>
                
                <div className="h-px bg-gray-100 mb-6" />
                
                <div className="mb-6">
                  <h4 className="font-bold text-[#2c1b40] mb-3">Payment Method</h4>
                  <div className="flex items-center gap-3 bg-green-50 p-4 rounded-xl border border-green-100">
                    <div className="w-5 h-5 rounded-full border-[5px] border-[#25D366] bg-white flex shrink-0"></div>
                    <span className="font-bold text-[#1b4332] text-sm">Cash on Delivery (Only)</span>
                  </div>
                </div>

                <div className="flex justify-between items-end mb-8">
                  <span className="text-gray-500 font-bold mb-1">Total Due</span>
                  <span className="text-3xl font-black text-[#4f3370] tracking-tight">₹{total}</span>
                </div>
                
                {step === 'cart' ? (
                  <button 
                    onClick={handleProceedToCheckout}
                    className="w-full text-white border-2 py-4 rounded-2xl font-bold text-lg shadow-lg transition-all flex items-center justify-center gap-2 group bg-[#4f3370] border-[#4f3370] hover:bg-[#3d2757] hover:border-[#3d2757] hover:shadow-[#4f3370]/30 hover:-translate-y-1 animate-fade-in"
                  >
                    Proceed to Checkout
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                ) : (
                  <button 
                    onClick={handleCheckout}
                    disabled={!customerName.trim() || !customerPhone.trim() || !customerAddress.trim()}
                    className={`w-full text-white border-2 py-4 rounded-2xl font-bold text-lg shadow-lg transition-all flex items-center justify-center gap-2 group ${
                      !customerName.trim() || !customerPhone.trim() || !customerAddress.trim()
                        ? 'bg-gray-400 border-gray-400 cursor-not-allowed opacity-70'
                        : 'bg-green-600 border-green-600 hover:bg-green-700 hover:border-green-700 hover:shadow-green-600/30 hover:-translate-y-1'
                    }`}
                  >
                    Place Order via WhatsApp
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

