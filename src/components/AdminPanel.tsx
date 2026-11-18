import React, { useState, useEffect } from 'react';
import { Package, Search, ChevronRight, Cake, ShoppingBag, Clock, CheckCircle2, Truck, Settings, Check, AlertCircle } from 'lucide-react';
import { safeStorage } from '../utils/storage';
import { getFastDeliverySettings, saveFastDeliverySettings, FastDeliverySettings, DeliverySlot } from '../utils/deliverySettings';

interface AdminPanelProps {
  onLogout: () => void;
}

export default function AdminPanel({ onLogout }: AdminPanelProps) {
  const [allOrders, setAllOrders] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'orders' | 'delivery'>('orders');

  // Fast Delivery Settings State
  const [deliverySettings, setDeliverySettings] = useState<FastDeliverySettings>(getFastDeliverySettings());
  const [settingsSavedMessage, setSettingsSavedMessage] = useState<string | null>(null);

  useEffect(() => {
    // Collect all orders from localStorage
    const orders: any[] = [];
    const len = safeStorage.getLength();
    for (let i = 0; i < len; i++) {
        const key = safeStorage.key(i);
        if (key && key.startsWith('mahesh_bakery_orders_')) {
            try {
                const userOrders = JSON.parse(safeStorage.getItem(key) || '[]');
                const userEmail = key.replace('mahesh_bakery_orders_', '');
                userOrders.forEach((order: any) => {
                    orders.push({ ...order, customerEmail: userEmail });
                });
            } catch (e) {
                console.error(e);
            }
        }
    }
    
    // Check for a global store if created
    const globalOrders = JSON.parse(safeStorage.getItem('mahesh_bakery_global_orders') || '[]');
    globalOrders.forEach((order: any) => {
       if (!orders.find(o => o.id === order.id)) {
           orders.push(order);
       } 
    });

    // Sort by most recent
    orders.sort((a, b) => {
       const timeA = parseInt(a.id.split('-')[1] || '0');
       const timeB = parseInt(b.id.split('-')[1] || '0');
       return timeB - timeA;
    });

    setAllOrders(orders);
  }, []);

  const handleCompleteOrder = (orderId: string, userEmail?: string) => {
    // Update local state
    setAllOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: 'Completed' } : o));

    // Update global store
    try {
      const globalOrders = JSON.parse(safeStorage.getItem('mahesh_bakery_global_orders') || '[]');
      const updatedGlobal = globalOrders.map((o: any) => o.id === orderId ? { ...o, status: 'Completed' } : o);
      safeStorage.setItem('mahesh_bakery_global_orders', JSON.stringify(updatedGlobal));
    } catch(e) {}

    // Update specific user store if applicable
    if (userEmail && userEmail !== 'Guest') {
      try {
        const userOrdersKey = `mahesh_bakery_orders_${userEmail}`;
        const userOrders = JSON.parse(safeStorage.getItem(userOrdersKey) || '[]');
        if (userOrders.length > 0) {
            const updatedUser = userOrders.map((o: any) => o.id === orderId ? { ...o, status: 'Completed' } : o);
            safeStorage.setItem(userOrdersKey, JSON.stringify(updatedUser));
        }
      } catch(e) {}
    }
  };

  const handleSaveDeliverySettings = () => {
    saveFastDeliverySettings(deliverySettings);
    setSettingsSavedMessage('Fast Delivery settings updated successfully!');
    setTimeout(() => setSettingsSavedMessage(null), 3000);
  };

  const handleToggleSlotAvailability = (slotId: string) => {
    setDeliverySettings(prev => ({
      ...prev,
      slots: prev.slots.map(s => s.id === slotId ? { ...s, isAvailable: !s.isAvailable } : s)
    }));
  };

  return (
    <div className="min-h-[100vh] bg-[#fcfbfe] flex flex-col">
      {/* Admin Header */}
      <div className="bg-[#4f3370] text-white pt-24 pb-16 px-6 relative overflow-hidden shrink-0">
         <div className="absolute inset-0 bg-black/10"></div>
         <div className="max-w-7xl mx-auto relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
               <h1 className="text-3xl md:text-5xl font-serif font-black tracking-tight mb-2">Admin Dashboard</h1>
               <p className="text-purple-200 font-medium tracking-wide">Manage orders and store performance</p>
            </div>
            <button 
              onClick={onLogout}
              className="bg-white/10 hover:bg-white/20 border border-white/20 text-white px-6 py-2.5 rounded-full font-bold transition-all text-sm backdrop-blur-sm shadow-sm"
            >
              Sign Out
            </button>
         </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 -mt-8 relative z-20 flex-1 w-full pb-24">
         {/* Navigation Tabs */}
         <div className="flex items-center gap-3 mb-8 bg-white p-2 rounded-2xl shadow-sm border border-purple-50 max-w-md">
            <button
              onClick={() => setActiveTab('orders')}
              className={`flex-1 py-3 px-4 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${
                activeTab === 'orders' 
                  ? 'bg-[#4f3370] text-white shadow-md' 
                  : 'text-gray-600 hover:text-[#4f3370] hover:bg-purple-50/50'
              }`}
            >
              <Package className="w-4 h-4" />
              <span>Orders ({allOrders.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('delivery')}
              className={`flex-1 py-3 px-4 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${
                activeTab === 'delivery' 
                  ? 'bg-[#4f3370] text-white shadow-md' 
                  : 'text-gray-600 hover:text-[#4f3370] hover:bg-purple-50/50'
              }`}
            >
              <Truck className="w-4 h-4" />
              <span>Fast Delivery Settings</span>
            </button>
         </div>

         {activeTab === 'orders' ? (
           <>
             {/* Stats */}
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <div className="bg-white rounded-2xl p-6 shadow-[0_10px_30px_rgba(79,51,112,0.05)] border border-purple-50">
                   <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-purple-50 text-[#4f3370] rounded-xl flex items-center justify-center">
                         <Package className="w-6 h-6" />
                      </div>
                      <div>
                         <p className="text-gray-500 font-bold text-xs uppercase tracking-widest">Total Orders</p>
                         <h3 className="text-3xl font-black text-[#2c1b40]">{allOrders.length}</h3>
                      </div>
                   </div>
                </div>
                
                <div className="bg-white rounded-2xl p-6 shadow-[0_10px_30px_rgba(79,51,112,0.05)] border border-purple-50">
                   <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-green-50 text-green-600 rounded-xl flex items-center justify-center">
                         <CheckCircle2 className="w-6 h-6" />
                      </div>
                      <div>
                         <p className="text-gray-500 font-bold text-xs uppercase tracking-widest">Completed</p>
                         <h3 className="text-3xl font-black text-[#2c1b40]">{allOrders.filter(o => o.status === 'Completed').length}</h3>
                      </div>
                   </div>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-[0_10px_30px_rgba(79,51,112,0.05)] border border-purple-50">
                   <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center">
                         <Clock className="w-6 h-6" />
                      </div>
                      <div>
                         <p className="text-gray-500 font-bold text-xs uppercase tracking-widest">Pending</p>
                         <h3 className="text-3xl font-black text-[#2c1b40]">{allOrders.filter(o => o.status !== 'Completed').length}</h3>
                      </div>
                   </div>
                </div>
             </div>

             {/* Orders List */}
             <div className="bg-white rounded-3xl shadow-[0_20px_50px_rgba(79,51,112,0.05)] border border-purple-50 overflow-hidden">
                <div className="p-6 md:p-8 flex items-center justify-between border-b border-gray-100">
                   <h2 className="text-2xl font-black text-[#2c1b40]">Recent Orders</h2>
                </div>
                
                {allOrders.length === 0 ? (
                   <div className="p-12 text-center text-gray-500 font-medium">
                      <Package className="w-12 h-12 mx-auto text-gray-300 mb-4" />
                      No orders have been placed yet.
                   </div>
                ) : (
                   <div className="divide-y divide-gray-100">
                  {allOrders.map((order, i) => (
                     <div key={i} className="p-6 md:p-8 hover:bg-gray-50 transition-colors">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6">
                           <div>
                              <div className="flex items-center gap-3 mb-2">
                                 <span className="bg-[#4f3370]/10 text-[#4f3370] font-black text-xs uppercase tracking-widest px-3 py-1 rounded-md">
                                    {order.id}
                                 </span>
                                 <span className="text-gray-400 text-sm font-bold">{order.date}</span>
                              </div>
                              <div className="flex flex-col gap-1 mt-2 mb-2">
                                 <p className="text-[#2c1b40] font-bold">Name: <span className="font-semibold text-gray-600">{order.customerName || 'N/A'}</span></p>
                                 <p className="text-[#2c1b40] font-bold text-sm">Email: <span className="font-semibold text-gray-600">{order.customerEmail || 'Guest'}</span></p>
                                 <p className="text-[#2c1b40] font-bold text-sm">Phone: <span className="font-semibold text-gray-600">{order.customerPhone || 'N/A'}</span></p>
                                 <p className="text-[#2c1b40] font-bold text-sm">Address: <span className="font-semibold text-gray-600">{order.customerAddress || 'N/A'}</span></p>
                                 <p className="text-[#2c1b40] font-bold text-sm">Payment: <span className="font-semibold text-green-600">{order.paymentMethod || 'Cash on Delivery'}</span></p>
                              </div>
                           </div>
                           <div className="flex items-center gap-4">
                              <div className="flex flex-col gap-2 items-end">
                                <span className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider text-center ${
                                   order.status === 'Accepted' ? 'bg-amber-100 text-amber-700' :
                                   order.status === 'Completed' ? 'bg-green-100 text-green-700' :
                                   'bg-blue-100 text-blue-700'
                                }`}>
                                   {order.status || 'Pending'}
                                </span>
                                {order.status !== 'Completed' && (
                                   <button 
                                      onClick={() => handleCompleteOrder(order.id, order.customerEmail)}
                                      className="text-[10px] font-bold uppercase tracking-wider bg-[#4f3370] text-white px-3 py-1.5 rounded-lg hover:bg-[#3d2757] transition-colors"
                                   >
                                      Mark Completed
                                   </button>
                                )}
                              </div>
                              <div className="text-right ml-4">
                                 <p className="text-gray-500 font-bold text-xs uppercase tracking-widest mb-1">Total</p>
                                 <p className="text-2xl font-black text-[#4f3370]">₹{order.items?.reduce((acc: number, item: any) => acc + (item.grandTotal || 0), 0) || 0}</p>
                              </div>
                           </div>
                        </div>
                        
                        <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                           <h4 className="font-bold text-xs text-gray-500 uppercase tracking-widest mb-4">Order Items</h4>
                           <div className="space-y-4">
                              {order.items?.map((item: any, idx: number) => (
                                 <div key={idx} className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-white border border-gray-100 flex items-center justify-center shrink-0 shadow-sm overflow-hidden p-2">
                                       {item.image ? (
                                          <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                                       ) : (
                                          item.category === 'Cakes' ? <Cake className="w-6 h-6 text-pink-400" /> : <ShoppingBag className="w-6 h-6 text-purple-400" />
                                       )}
                                    </div>
                                    <div className="flex-1">
                                       <p className="font-bold text-[#2c1b40]">{item.name}</p>
                                       <div className="flex items-center gap-2 text-sm text-gray-500 font-medium">
                                          <span className="font-bold text-[#2c1b40]">Quantity: {item.quantity}</span>
                                          <span>•</span>
                                          <span className="text-[#4f3370] font-bold">₹{item.grandTotal}</span>
                                       </div>
                                       {item.category === 'Cakes' && item.sizeLabel && (
                                          <div className="mt-1 flex flex-wrap gap-1.5">
                                             <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-gray-200 text-gray-600 tracking-wider uppercase">
                                                Size: {item.sizeLabel}
                                             </span>
                                             {item.message && (
                                                <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-pink-100 text-pink-600 tracking-wider uppercase">
                                                   Msg: "{item.message}"
                                                </span>
                                             )}
                                          </div>
                                       )}
                                    </div>
                                 </div>
                              ))}
                           </div>
                        </div>
                     </div>
                  ))}
               </div>
            )}
         </div>
       </>
     ) : (
       /* Birthday Fast Delivery Settings Tab */
       <div className="bg-white rounded-3xl shadow-[0_20px_50px_rgba(79,51,112,0.05)] border border-purple-50 p-6 md:p-10">
         <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100 pb-6 mb-8">
            <div>
               <h2 className="text-2xl font-black text-[#2c1b40] flex items-center gap-2">
                 <Truck className="w-6 h-6 text-[#4f3370]" />
                 <span>Birthday Cakes Fast Delivery Settings</span>
               </h2>
               <p className="text-gray-500 text-sm mt-1">Configure live delivery charges and slot availability for customer checkout.</p>
            </div>
            
            <button
              onClick={handleSaveDeliverySettings}
              className="bg-[#4f3370] hover:bg-[#3d2757] text-white px-6 py-3 rounded-2xl font-bold text-sm shadow-md transition-all flex items-center gap-2 self-start md:self-auto"
            >
              <Check className="w-4 h-4" />
              <span>Save Delivery Settings</span>
            </button>
         </div>

         {settingsSavedMessage && (
            <div className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm font-bold flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>{settingsSavedMessage}</span>
            </div>
         )}

         <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            {/* Standard Delivery Charge */}
            <div className="bg-purple-50/40 p-6 rounded-2xl border border-purple-100">
               <label className="block text-xs font-bold uppercase tracking-wider text-[#4f3370] mb-2">
                 Standard Fast Delivery Charge (₹)
               </label>
               <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-lg">₹</span>
                  <input
                    type="number"
                    min="0"
                    value={deliverySettings.deliveryCharge}
                    onChange={(e) => setDeliverySettings(prev => ({
                      ...prev,
                      deliveryCharge: Math.max(0, parseInt(e.target.value) || 0)
                    }))}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 font-bold text-lg text-[#2c1b40] bg-white focus:outline-none focus:border-[#4f3370]"
                  />
               </div>
               <p className="text-xs text-gray-500 mt-2">Applied to standard morning, afternoon, and evening slots.</p>
            </div>

            {/* Express Delivery Surcharge */}
            <div className="bg-amber-50/40 p-6 rounded-2xl border border-amber-100">
               <label className="block text-xs font-bold uppercase tracking-wider text-amber-900 mb-2">
                 Express Slot Surcharge (₹)
               </label>
               <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-lg">₹</span>
                  <input
                    type="number"
                    min="0"
                    value={deliverySettings.expressSurcharge}
                    onChange={(e) => setDeliverySettings(prev => ({
                      ...prev,
                      expressSurcharge: Math.max(0, parseInt(e.target.value) || 0)
                    }))}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 font-bold text-lg text-[#2c1b40] bg-white focus:outline-none focus:border-[#4f3370]"
                  />
               </div>
               <p className="text-xs text-gray-500 mt-2">Additional fee added on top of standard charge for Express (within 2 hours).</p>
            </div>
         </div>

         {/* Delivery Slots Management */}
         <div>
            <h3 className="text-lg font-black text-[#2c1b40] mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-[#4f3370]" />
              <span>Delivery Slots Availability</span>
            </h3>
            <p className="text-xs text-gray-500 mb-4">
              Toggle any slot to "Unavailable" to immediately prevent customer checkout when that slot is booked out or kitchen is at capacity.
            </p>

            <div className="space-y-3">
              {deliverySettings.slots.map((slot) => (
                <div 
                  key={slot.id}
                  className={`p-4 rounded-2xl border flex items-center justify-between transition-colors ${
                    slot.isAvailable ? 'bg-white border-gray-200' : 'bg-rose-50/30 border-rose-200'
                  }`}
                >
                  <div>
                     <div className="flex items-center gap-2">
                       <span className="font-bold text-sm text-[#2c1b40]">{slot.name}</span>
                       {slot.isExpress && (
                         <span className="text-[10px] font-black uppercase tracking-wider bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">
                           Express
                         </span>
                       )}
                     </div>
                     <span className="text-xs text-gray-500 font-medium">{slot.timeWindow}</span>
                  </div>

                  <div className="flex items-center gap-4">
                     <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                       slot.isAvailable ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                     }`}>
                       {slot.isAvailable ? 'Available' : 'Unavailable'}
                     </span>

                     <button
                       type="button"
                       onClick={() => handleToggleSlotAvailability(slot.id)}
                       className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
                         slot.isAvailable 
                           ? 'bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200' 
                           : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200'
                       }`}
                     >
                       {slot.isAvailable ? 'Mark Unavailable' : 'Mark Available'}
                     </button>
                  </div>
                </div>
              ))}
            </div>
         </div>
       </div>
     )}
      </div>
    </div>
  );
}
