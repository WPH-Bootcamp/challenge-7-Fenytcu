"use client";

import Image from "next/image";
import { Search, LogOut, MapPin, Package } from "lucide-react";
import Link from "next/link";

import { getCookie, deleteCookie } from "cookies-next";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/features/store";

// ... existing imports

import { useGetUserProfile } from "@/services/queries/useGetUserProfile";

interface HeroProps {
  isGuest?: boolean;
}

export default function Hero({ isGuest = false }: HeroProps) {
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
    setTimeout(() => {
        window.location.href = "/login";
    }, 100);
  };

// ... rest of component

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
       // Search logic here (e.g., redirect to search page or filter)
       console.log("Searching for:", e.currentTarget.value);
       // alert("Search triggered: " + e.currentTarget.value); 
    }
  };

  return (
    <section className="relative h-[500px] w-full flex items-center justify-center bg-gray-900 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 opacity-60">
        <Image
          src="/assets/Home-banner.png"
          alt="Delicious Burger Banner"
          fill
          className="object-cover"
          priority
        />
        {/* Gradient Overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent"></div>
      </div>

      {/* Logo Overlay */}
      <div className="absolute top-[19px] left-4 md:left-[120px] flex items-center gap-[15px]">
          <div className="w-10 h-10 flex items-center justify-center">
             <Image src="/assets/logo-foody2.png" alt="Foody" width={42} height={42} />
          </div>
          <span className="text-white text-[32px] font-extrabold drop-shadow-md hidden md:block">Foody</span>
      </div>

      {/* Right Icons Overlay (LOGIN/REGISTER vs USER ICONS) */}
      <div className="absolute top-8 right-4 md:right-[120px] z-20">
        {isGuest ? (
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-white font-bold text-md border border-white px-6 py-2 md:px-8 md:py-3 rounded-full hover:bg-white/10 transition-all font-nunito">
              Sign In
            </Link>
            <Link href="/register" className="bg-white hover:bg-gray-100 text-neutral-950 px-6 py-2 md:px-8 md:py-3 rounded-full font-bold transition-colors shadow-lg font-nunito text-md">
              Sign Up
            </Link>
          </div>
        ) : (
          <div className="flex items-center gap-4">
             {/* Cart Icon */}
             <Link 
                href="/cart"
                className="relative bg-white/20 backdrop-blur-md p-2 rounded-full cursor-pointer hover:bg-white/30 transition-colors"
             >
                <Image src="/assets/ic-cart.png" alt="Cart" width={32} height={32} />
                {totalItems > 0 && (
                    <span className="absolute top-0 right-0 w-4 h-4 bg-red-600 text-white text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-white">
                        {totalItems}
                    </span>
                )}
             </Link>
             
             {/* Profile Dropdown */}
             <div className="relative">
                <button 
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center gap-3 cursor-pointer focus:outline-none"
                >
                    {/* Profile Image (Left) */}
                    <div className="w-10 h-10 rounded-full border-2 border-white/50 overflow-hidden">
                       <Image src={`https://ui-avatars.com/api/?name=${userName}&background=random`} alt="Profile" width={40} height={40} />
                    </div>
                    {/* User Name (Right) */}
                    <span className="text-white font-bold text-lg font-nunito drop-shadow-md hidden sm:block">{userName}</span>
                </button>
                    {isDropdownOpen && (
                    <div className="absolute right-0 mt-3 w-64 bg-white rounded-2xl shadow-xl border border-gray-100 py-3 z-50 animate-in fade-in slide-in-from-top-2 text-left">
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
                            <Link href="/profile" className="flex items-center gap-3 px-5 py-3 text-sm font-bold text-gray-700 hover:bg-gray-50 hover:text-red-600 transition-colors">
                                <MapPin size={20} />
                                Delivery Address
                            </Link>
                            <Link href="/order-history" className="flex items-center gap-3 px-5 py-3 text-sm font-bold text-gray-700 hover:bg-gray-50 hover:text-red-600 transition-colors">
                                <Package size={20} />
                                My Orders
                            </Link>
                            <button 
                                onClick={handleLogout}
                                className="w-full flex items-center gap-3 px-5 py-3 text-sm font-bold text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors text-left"
                            >
                                <LogOut size={20} className="stroke-[2.5px]" />
                                Logout
                            </button>
                        </div>
                    </div>
                  )}
             </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center space-y-6">
        <h1 className="text-[32px] md:text-[48px] font-extrabold text-white drop-shadow-lg font-nunito leading-tight">
          Explore Culinary Experiences
        </h1>
        <p className="text-[16px] md:text-[18px] font-bold text-white max-w-4xl mx-auto text-center drop-shadow-md font-nunito">
          Search and refine your choice to discover the perfect restaurant.
        </p>

        {/* Search Bar */}
        <div className="max-w-xl mx-auto mt-8 relative group">
           <div className="absolute inset-0 bg-white/20 rounded-full blur-md group-hover:bg-white/30 transition-all"></div>
           <div className="relative flex items-center bg-white rounded-full px-6 py-4 shadow-xl">
             <Search className="text-gray-400 w-5 h-5 mr-3" />
             <input 
               type="text" 
               placeholder="Search restaurants, food and drink" 
               className="flex-1 bg-transparent border-none outline-none text-gray-800 placeholder:text-neutral-600 text-[16px]"
               onKeyDown={handleKeyDown}
             />
           </div>
        </div>
      </div>
    </section>
  );
}
