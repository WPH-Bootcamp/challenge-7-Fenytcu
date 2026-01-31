"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Checkbox } from "@/components/ui/checkbox"; // Assuming shadcn/ui checkbox
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Star, X } from "lucide-react";

interface FilterSidebarProps {
  className?: string; // For responsive hiding/custom styles
  onClose?: () => void; // For mobile drawer close
  hideCloseIcon?: boolean;
}

const categories = [
    { name: "All Restaurant", value: "all" },
    { name: "Nearby", value: "nearby" },
    { name: "Discount", value: "discount" },
    { name: "Best Seller", value: "best_seller" },
    { name: "Delivery", value: "delivery" },
    { name: "Lunch", value: "lunch" },
];

const distances = [
    { label: "Nearby", value: "nearby" },
    { label: "Within 1 km", value: "1" },
    { label: "Within 3 km", value: "3" },
    { label: "Within 5 km", value: "5" },
];

export default function FilterSidebar({ className = "", onClose, hideCloseIcon = false }: FilterSidebarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // State initialization from URL params
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get("category") || "all");
  const [selectedDistance, setSelectedDistance] = useState<string[]>([]); // simplified for now
  const [priceMin, setPriceMin] = useState(searchParams.get("price_min") || "");
  const [priceMax, setPriceMax] = useState(searchParams.get("price_max") || "");
  const [selectedRating, setSelectedRating] = useState<number | null>(null);

  // Apply Filters
  const handleApply = () => {
    const params = new URLSearchParams();
    if (selectedCategory && selectedCategory !== "all") params.set("category", selectedCategory);
    
    if (selectedDistance.length > 0) params.set("distance", selectedDistance.join(","));
    if (priceMin) params.set("price_min", priceMin);
    if (priceMax) params.set("price_max", priceMax);
    if (selectedRating) params.set("rating", String(selectedRating));

    router.push(`/category?${params.toString()}`);
    if (onClose) onClose();
  };

  const handleReset = () => {
      setSelectedCategory("all");
      setSelectedDistance([]);
      setPriceMin("");
      setPriceMax("");
      setSelectedRating(null);
      router.push("/category");
      if (onClose) onClose();
  };

  return (
    <div className={`bg-white p-6 rounded-2xl shadow-sm border border-gray-100 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-nunito font-bold text-xl text-neutral-900">FILTER</h3>
        {onClose && !hideCloseIcon && (
            <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full text-gray-500 transition-colors md:hidden">
                <X size={24} />
            </button>
        )}
      </div>

      {/* Distance */}
      <div className="mb-8">
        <h4 className="font-nunito font-bold text-neutral-950 mb-4 text-base">Distance</h4>
        <div className="space-y-4">
            {distances.map((dist) => (
                <div key={dist.value} className="flex items-center space-x-3">
                    <input 
                        type="checkbox" 
                        id={`dist-${dist.value}`}
                        className="w-5 h-5 rounded-[4px] border-gray-300 text-red-600 focus:ring-red-500 checked:bg-red-600"
                        checked={selectedDistance.includes(dist.value)}
                        onChange={(e) => {
                            if (e.target.checked) {
                                setSelectedDistance([...selectedDistance, dist.value]);
                            } else {
                                setSelectedDistance(selectedDistance.filter(d => d !== dist.value));
                            }
                        }}
                    />
                    <label htmlFor={`dist-${dist.value}`} className="text-neutral-600 font-nunito font-medium cursor-pointer text-sm">
                        {dist.label}
                    </label>
                </div>
            ))}
        </div>
      </div>

      {/* Price */}
      <div className="mb-8">
        <h4 className="font-nunito font-bold text-neutral-900 mb-4 text-base">Price</h4>
        <div className="flex flex-col gap-3">
            <div className="relative flex items-center">
                <div className="absolute left-0 top-0 bottom-0 w-12 bg-gray-100 border border-r-0 border-gray-200 rounded-l-lg flex items-center justify-center">
                    <span className="text-neutral-900 font-bold text-sm">Rp</span>
                </div>
                <input 
                    type="number" 
                    placeholder="Minimum Price" 
                    value={priceMin}
                    onChange={(e) => setPriceMin(e.target.value)}
                    className="w-full pl-14 pr-4 py-3 border border-gray-200 rounded-lg text-sm font-medium outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all font-nunito placeholder:text-gray-400"
                />
            </div>
            <div className="relative flex items-center">
                <div className="absolute left-0 top-0 bottom-0 w-12 bg-gray-100 border border-r-0 border-gray-200 rounded-l-lg flex items-center justify-center">
                    <span className="text-neutral-900 font-bold text-sm">Rp</span>
                </div>
                <input 
                    type="number" 
                    placeholder="Maximum Price" 
                    value={priceMax}
                    onChange={(e) => setPriceMax(e.target.value)}
                    className="w-full pl-14 pr-4 py-3 border border-gray-200 rounded-lg text-sm font-medium outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all font-nunito placeholder:text-gray-400"
                />
            </div>
        </div>
      </div>

      {/* Rating */}
      <div className="mb-8">
        <h4 className="font-nunito font-bold text-neutral-900 mb-4 text-base">Rating</h4>
        <div className="space-y-4">
            {[5, 4, 3, 2, 1].map((star) => (
                <div key={star} className="flex items-center space-x-3">
                     <input 
                        type="checkbox" 
                        id={`rate-${star}`}
                        className="w-5 h-5 rounded-[4px] border-gray-300 text-red-600 focus:ring-red-500 checked:bg-red-600"
                        checked={selectedRating === star}
                        onChange={() => setSelectedRating(star === selectedRating ? null : star)}
                    />
                    <label htmlFor={`rate-${star}`} className="flex items-center gap-2 cursor-pointer">
                        <Star size={20} className="fill-orange-400 text-orange-400" />
                        <span className="text-neutral-600 font-nunito font-medium text-sm">{star}</span>
                    </label>
                </div>
            ))}
        </div>
      </div>

      <div className="flex flex-col gap-3 mt-6">
        <Button onClick={handleApply} className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-6 rounded-full font-nunito text-lg shadow-lg shadow-red-100">
            Apply Filter
        </Button>
        <Button onClick={handleReset} variant="ghost" className="w-full text-gray-500 font-bold font-nunito hover:text-gray-700">
            Reset Filter
        </Button>
      </div>
    </div>
  );
}
