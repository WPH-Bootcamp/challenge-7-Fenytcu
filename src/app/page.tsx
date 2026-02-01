"use client";

import { useGetRestaurants } from "@/services/queries/useGetRestaurants";
import Footer from "@/components/Footer";
import Hero from "@/components/home/Hero";
import CategoryList from "@/components/home/CategoryList";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, Star } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import StickyNavbar from "@/components/StickyNavbar";

export default function LandingPage() {
  const { data, isLoading } = useGetRestaurants();

  // Handle loading and empty state gracefully
  const restaurantItems = data?.data?.restaurants || [];

  return (
    <div className="min-h-screen bg-gray-50">
      <StickyNavbar isGuest={true} />
      {/* Hero Section with Guest Mode (Sign In/Up buttons) */}
      <Hero isGuest={true} />
      
      {/* Categories */}
      <CategoryList />

      {/* Recommended Section / Restaurant Grid */}
      <section className="py-8 container mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Recommended</h2>
          <Link href="/login" className="text-red-500 font-semibold flex items-center hover:underline">
            See All <ChevronRight className="w-4 h-4 ml-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
           {isLoading ? (
                // Skeleton Loader
                Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className="flex flex-col space-y-3">
                        <Skeleton className="h-[250px] w-full rounded-2xl" />
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-[250px]" />
                            <Skeleton className="h-4 w-[200px]" />
                        </div>
                    </div>
                ))
            ) : (
              restaurantItems.map((item) => (
                <Link key={item.id} href={`/detail/${item.id}`} className="block">
                    <div className="bg-white border border-gray-100 rounded-[16px] p-4 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer h-full">
                    
                    {/* Gambar Logo */}
                    <div className="relative w-[80px] h-[80px] flex-shrink-0">
                        <Image 
                        src={item.logo || "/assets/burger.png"} 
                        alt={item.name}
                        fill
                        className="object-cover rounded-[12px]"
                        />
                    </div>

                    {/* Info Kanan */}
                    <div className="flex flex-col gap-1 w-full overflow-hidden">
                        {/* Nama Resto */}
                        <h3 className="font-bold text-neutral-900 text-lg line-clamp-1">{item.name}</h3>
                        
                        {/* Rating (Star) */}
                        <div className="flex items-center gap-1">
                        <Star size={16} className="fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-semibold text-neutral-700">{item.star}</span>
                        </div>

                        {/* Lokasi & Jarak */}
                        <p className="text-xs text-gray-400 line-clamp-1">
                        {item.place} • {item.distance} km
                        </p>
                    </div>
                    </div>
                </Link>
              ))
            )}
        </div>
        
        <div className="flex justify-center mt-12">
            <Link href="/detail/all">
                <button className="bg-white border border-gray-200 text-gray-700 px-8 py-3 rounded-full font-bold shadow-sm hover:bg-gray-50 transition-colors">
                    Show More
                </button>
            </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
