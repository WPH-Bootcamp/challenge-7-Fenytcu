"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Bell, ShoppingCart, LogOut, MapPin, Package } from "lucide-react";
import { getCookie, deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/features/store";

import { useGetUserProfile } from "@/services/queries/useGetUserProfile";

interface StickyNavbarProps {
  isGuest?: boolean;
  alwaysVisible?: boolean;
  className?: string;
  style?: React.CSSProperties;
  isFixed?: boolean;
}

export default function StickyNavbar({ isGuest = false, alwaysVisible = false, className, style, isFixed = true }: StickyNavbarProps) {


  const [isVisible, setIsVisible] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const router = useRouter();

  const { data: profileData } = useGetUserProfile();
  const userName = profileData?.data?.name || "User";

  // Redux Cart State
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const handleLogout = () => {
    deleteCookie("token");
    deleteCookie("user_name");
    
    // Slight delay to ensure cookie deletion
    setTimeout(() => {
        window.location.href = "/login";
    }, 100);
  };

  useEffect(() => {
// ... existing scroll logic ...
  }, [isGuest]);

// ...

// ... inside RETURN JSX ...

               <div className="flex items-center gap-6 text-gray-600">
                  <button 
                    onClick={() => alert("Cart feature feature is coming soon!")}
                    className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
                   >
                     <Image src="/assets/ic-cart-scroll.png?v=5" alt="Cart" width={24} height={24} className="invert" />
                     {totalItems > 0 && (
                        <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-600 text-white text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-white">
                            {totalItems}
                        </span>
                     )}
                  </button>
               </div>

  useEffect(() => {
    const handleScroll = () => {
      if (alwaysVisible || !isFixed || window.scrollY > 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    // Initial check
    if (alwaysVisible || !isFixed) {
        setIsVisible(true);
    }
    
    window.addEventListener("scroll", handleScroll);



    return () => window.removeEventListener("scroll", handleScroll);
  }, [isGuest]);

// ... rest of logic
            // ... inside RETURN JSX ...
            // User: Notification, Cart, Profile
            <>
               {/* Cart/Notif Icons */}
               <div className="flex items-center gap-4 text-gray-600">
                  <button className="relative p-2 hover:bg-gray-100 rounded-full transition-colors">
                     <Bell size={20} />
                     <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                  </button>
                  <button 
                    onClick={() => alert("Cart feature feature is coming soon!")}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                   >
                     <ShoppingCart size={20} />
                  </button>
               </div>

               {/* Divider */}
               <div className="h-6 w-px bg-gray-200"></div>

               {/* Profile */}
               <div className="flex items-center gap-3">
                  <div className="text-right hidden sm:block">
                      <p className="text-sm font-bold text-gray-900 leading-none">{userName}</p>
                      <p className="text-xs text-gray-500">Food Lover</p>
                  </div>
                  <div className="w-9 h-9 rounded-full overflow-hidden border border-gray-200">
                     <Image 
                        src={`https://ui-avatars.com/api/?name=${userName}&background=random`}
                        alt="Profile" 
                        width={36} 
                        height={36} 
                     />
                  </div>
               </div>
            </>

  return (
    <header
      style={style}
      className={`${isFixed ? "fixed" : "relative"} top-0 left-0 right-0 z-50 bg-white shadow-md transition-transform duration-300 ease-in-out px-4 md:px-8 py-3 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      } ${className || ""}`}
    >
      <div className="container mx-auto flex items-center justify-between h-full">
        {/* Logo Section */}
        <Link href="/dashboard" className="flex items-center gap-2 cursor-pointer">
           <div className="w-8 h-8 flex items-center justify-center">
             <Image src="/assets/logo-foody.png" alt="Foody" width={32} height={32} />
           </div>
           <span className="text-neutral-900 text-2xl font-extrabold font-nunito hidden sm:block">Foody</span>
        </Link>

        {/* Right Section */}
        <div className="flex items-center gap-6">
          {isGuest ? (
            // Guest: Sign In / Sign Up
            <>
                <Link href="/login" className="text-neutral-900 font-bold hover:text-red-600 transition-colors">
                  Sign In
                </Link>
                <Link href="/register" className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-full font-bold transition-colors shadow-md">
                  Sign Up
                </Link>
            </>
          ) : (
            // User: Notification, Cart, Profile
            <>
               {/* Cart/Notif Icons */}
                <div className="flex items-center gap-4 sm:gap-6 text-gray-600">

                   <Link 
                     href="/cart"
                     className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                      <Image src="/assets/ic-cart-scroll2.jpg" alt="Cart" width={24} height={24} />
                      {totalItems > 0 && (
                          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-600 text-white text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-white">{totalItems}</span>
                      )}
                   </Link>
                </div>

               {/* Profile Dropdown */}
               <div className="relative">
                  <button 
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center gap-4 hover:bg-gray-50 p-1.5 rounded-full transition-colors focus:outline-none"
                  >
                        {/* Profile Image (First) */}
                        <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-200">
                            <Image 
                                src={`https://ui-avatars.com/api/?name=${userName}&background=random`}
                                alt="Profile" 
                                width={40} 
                                height={40} 
                            />
                        </div>

                        {/* User Name (Second) */}
                        <div className="text-left hidden sm:block">
                            <p className="text-lg font-extrabold text-gray-900 leading-none">{userName}</p>
                        </div>
                  </button>

                  {/* Dropdown Menu */}
                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-gray-100 py-3 z-50 animate-in fade-in slide-in-from-top-2">
                        {/* Profile Header (Always Visible) */}
                        <Link href="/profile" className="flex items-center gap-4 px-5 pb-3 border-b border-gray-100 mb-2 hover:bg-gray-50 transition-colors">
                            <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-200">
                                <Image 
                                    src={`https://ui-avatars.com/api/?name=${userName}&background=random`}
                                    alt="Profile" 
                                    width={40} 
                                    height={40} 
                                />
                            </div>
                            <div className="overflow-hidden">
                                <p className="text-lg font-extrabold text-gray-900 truncate">{userName}</p>
                            </div>
                        </Link>

                        <div className="py-1">
                            <Link href="/profile" className="font-nunito flex items-center gap-3 px-5 py-3 text-sm font-bold text-gray-700 hover:bg-gray-50 hover:text-red-600 transition-colors">
                                <MapPin size={20} />
                                Delivery Address
                            </Link>
                            <Link href="/order-history" className="font-nunito flex items-center gap-3 px-5 py-3 text-sm font-bold text-gray-700 hover:bg-gray-50 hover:text-red-600 transition-colors">
                                <Package size={20} />
                                My Orders
                            </Link>
                            <button 
                                onClick={handleLogout}
                                className="w-full flex items-center gap-3 px-5 py-3 text-sm font-bold font-nunito text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors text-left"
                            >
                                <LogOut size={20} className="stroke-[2.5px]" />
                                Logout
                            </button>
                        </div>
                    </div>
                  )}
               </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
