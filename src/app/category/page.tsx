"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import StickyNavbar from "@/components/StickyNavbar";
import Footer from "@/components/Footer";
import FilterSidebar from "@/components/category/FilterSidebar";
import { useGetRestaurants } from "@/services/queries/useGetRestaurants";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import Image from "next/image";
import { Star, MapPin, Filter, X } from "lucide-react";

export default function CategoryPage() {
  const searchParams = useSearchParams();
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Extract params
  const category = searchParams.get("category") || "all";
  const search = searchParams.get("search") || "";
  const price_min = searchParams.get("price_min") ? Number(searchParams.get("price_min")) : undefined;
  const price_max = searchParams.get("price_max") ? Number(searchParams.get("price_max")) : undefined;

  // Fetch Data
  const { data, isLoading } = useGetRestaurants({
      category: category === "all" ? undefined : category,
      search: search || undefined,
      price_min,
      price_max
     
  });

  const restaurants = data?.data?.restaurants || [];

  return (
    <div className="min-h-screen bg-gray-50 font-nunito">
      {}
      <StickyNavbar alwaysVisible={true} />

      <main className="w-full py-8 pt-24 md:pt-[128px]">
         {/* Title Section - Top Left aligned with content */}
         <div className="px-4 md:px-0 md:pl-[120px] mb-6 md:mb-8">
            <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 capitalize font-nunito">
                {category === "all" ? "All Restaurant" : category}
            </h1>
         </div>

         {/* Mobile Filter Bar */}
         <div className="flex md:hidden items-center justify-between mb-6 px-4 border-b border-gray-100 pb-4">
            <span className="font-nunito font-bold text-base text-neutral-900 uppercase tracking-wider">FILTER</span>
            <button 
                onClick={() => setIsMobileFilterOpen(true)}
                className="text-gray-900 focus:outline-none"
            >
                <Image src="/assets/ic-filter.png" alt="Filter" width={24} height={24} />
            </button>
         </div>

         {/* Mobile Filter Drawer */}
         {isMobileFilterOpen && (
             <div className="fixed inset-0 z-[60] flex justify-start">
                 <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsMobileFilterOpen(false)}></div>
                 
                 <div className="relative flex h-full animate-in slide-in-from-left duration-300">
                     {/* Sidebar */}
                     <div className="w-[300px] h-full bg-white shadow-2xl overflow-y-auto">
                         <FilterSidebar 
                            className="h-full rounded-none border-none shadow-none pt-8" 
                            onClose={() => setIsMobileFilterOpen(false)} 
                            hideCloseIcon={true}
                         />
                     </div>
                     
                     {/* External Close Button */}
                     <button 
                        onClick={() => setIsMobileFilterOpen(false)}
                        className="absolute left-[300px] top-6 ml-4 p-2 bg-white rounded-full shadow-lg text-gray-900 hover:bg-gray-100 transition-colors"
                     >
                        <X size={24} />
                     </button>
                 </div>
             </div>
         )}

         {/* Layout Container with strict Left Padding 120px */}
         <div className="flex gap-8 px-4 md:px-0 md:pl-[120px]">
             {/* Desktop Sidebar */}
             <aside className="hidden md:block w-[300px] flex-shrink-0">
                 <FilterSidebar />
             </aside>

             {/* Main Content */}
             <div className="flex-1 max-w-[900px]">
                 {/* Desktop Title Removed since it's now on top */}

                 {/* Grid - 2 Columns */}
                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {isLoading ? (
                        Array.from({ length: 4 }).map((_, i) => (
                            <div key={i} className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
                                <Skeleton className="h-[140px] w-full rounded-xl mb-4" />
                                <Skeleton className="h-6 w-3/4 mb-2" />
                            </div>
                        ))
                    ) : restaurants.length > 0 ? (
                        restaurants.map((item) => (
                            <Link key={item.id} href={`/detail/${item.id}`} className="block group">
                                <div className="bg-white border border-gray-100 rounded-[24px] p-6 flex items-start gap-4 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 h-full">
                                    {/* Image */}
                                    <div className="relative h-[80px] w-[80px] rounded-full overflow-hidden flex-shrink-0 border border-gray-100">
                                        <Image 
                                            src={item.images[0] || item.logo || "/assets/burger.png"} 
                                            alt={item.name}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 flex flex-col gap-1">
                                        <h3 className="font-extrabold text-neutral-900 text-lg line-clamp-1 group-hover:text-red-600 transition-colors">
                                            {item.name}
                                        </h3>
                                        
                                        <div className="flex items-center gap-1 text-sm font-bold mb-1">
                                             <Star size={16} className="fill-red-600 text-red-600" />
                                             <span className="text-neutral-900">{item.star}</span>
                                        </div>

                                        <div className="flex items-center gap-2 text-gray-500 text-xs font-medium">
                                            <span>{item.place}</span>
                                            <span>•</span>
                                            <span>{item.distance} km</span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))
                    ) : (
                        <div className="col-span-full flex flex-col items-center justify-center py-20 text-center">
                            <h3 className="text-xl font-bold text-gray-900 mb-2">No Restaurants Found</h3>
                            <p className="text-gray-500 max-w-md mx-auto">
                                Adjust filters to see more results.
                            </p>
                        </div>
                    )}
                 </div>
             </div>
         </div>
      </main>

      <Footer />
    </div>
  );
}
