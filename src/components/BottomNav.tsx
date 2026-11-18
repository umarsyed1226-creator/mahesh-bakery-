import React from 'react';
import { Home, UtensilsCrossed, User } from 'lucide-react';

interface BottomNavProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  user: { email: string; avatar?: string } | null;
}

export default function BottomNav({ currentPage, onNavigate, user }: BottomNavProps) {
  const tabs = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'menu', label: 'Menu', icon: UtensilsCrossed },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-[90] lg:hidden">
      {/* Frosted glass background */}
      <div className="bg-white/80 backdrop-blur-xl border-t border-purple-100/60 shadow-[0_-4px_30px_rgba(79,51,112,0.08)]">
        {/* Safe area padding for notched phones */}
        <div className="flex items-center justify-around px-2 pt-1.5 pb-[max(0.375rem,env(safe-area-inset-bottom))]">
          {tabs.map((tab) => {
            const isActive =
              tab.id === 'profile'
                ? currentPage === 'profile' || currentPage === 'login'
                : currentPage === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => {
                  if (tab.id === 'profile') {
                    onNavigate(user ? 'profile' : 'login');
                  } else {
                    onNavigate(tab.id);
                  }
                }}
                className={`flex flex-col items-center justify-center gap-0.5 py-1.5 px-5 rounded-2xl transition-all duration-200 relative group cursor-pointer select-none ${
                  isActive
                    ? 'text-[#4f3370]'
                    : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                {/* Active pill indicator */}
                {isActive && (
                  <span className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-8 h-1 bg-[#4f3370] rounded-full" />
                )}

                {/* Icon area */}
                <span
                  className={`flex items-center justify-center w-7 h-7 rounded-full transition-all duration-200 ${
                    isActive
                      ? 'bg-[#4f3370]/10 scale-110'
                      : 'group-hover:bg-gray-100'
                  }`}
                >
                  {tab.id === 'profile' && user?.avatar ? (
                    <img
                      src={user.avatar}
                      alt="Profile"
                      className={`w-5 h-5 rounded-full object-cover ring-1 ${
                        isActive
                          ? 'ring-[#4f3370]/40'
                          : 'ring-gray-200'
                      }`}
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <tab.icon
                      className={`w-[1.15rem] h-[1.15rem] transition-all ${
                        isActive ? 'stroke-[2.5]' : 'stroke-[1.8]'
                      }`}
                    />
                  )}
                </span>

                {/* Label */}
                <span
                  className={`text-[10px] font-bold tracking-wide transition-all ${
                    isActive ? 'opacity-100' : 'opacity-70'
                  }`}
                >
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
