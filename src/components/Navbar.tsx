"use client";

import Link from "next/link";
import Image from "next/image";
import { Search, ShoppingCart, User, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSelector } from "react-redux";
import { RootState } from "@/features/store";

export default function Navbar() {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className="border-b bg-white sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/dashboard" className="flex items-center gap-2">
            <div className="flex items-center gap-2 font-bold text-2xl">
                 <Image src="/assets/logo-foody.png" alt="Foody Logo" width={32} height={32} />
                 <span className="hidden sm:inline-block">Foody</span>
            </div>
        </Link>

        {/* Search Bar - Desktop */}
        <div className="hidden md:flex items-center flex-1 max-w-md mx-8 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input 
            className="pl-10 bg-gray-50 border-none rounded-full" 
            placeholder="Search for food, drinks, etc..." 
          />
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          <Link href="/cart">
            <Button variant="ghost" size="icon" className="relative">
              <Image src="/assets/ic-cart.png" alt="Cart" width={24} height={24} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Button>
          </Link>
          
          <Link href="/login">
            <Button className="rounded-full bg-red-600 hover:bg-red-700 text-white px-6 hidden sm:flex">
              Login
            </Button>
          </Link>
          
           {/* Mobile Menu Trigger (Placeholder) */}
           <Button variant="ghost" size="icon" className="sm:hidden">
            <Menu className="w-6 h-6 text-gray-700" />
          </Button>
        </div>
      </div>
    </nav>
  );
}
