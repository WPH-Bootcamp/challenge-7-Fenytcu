"use client";

import Image from "next/image";
import { Star, Plus } from "lucide-react";
import { MenuItem } from "@/types/menu";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { addToCart } from "@/features/cart/cartSlice";

interface ProductCardProps {
  item: MenuItem;
}

export default function ProductCard({ item }: ProductCardProps) {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: 1,
      image: item.imageUrl
    }));
  };

  return (
    <Card className="border-none shadow-sm hover:shadow-md transition-shadow rounded-2xl overflow-hidden bg-white">
      <div className="relative aspect-square w-full bg-gray-100">
        <Image
          src={item.imageUrl && item.imageUrl.startsWith("http") ? item.imageUrl : "/assets/burger.png"}
          alt={item.name}
          fill
          className="object-cover"
        />
        {item.rating && (
           <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center gap-1 text-xs font-bold text-gray-800 shadow-sm">
             <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
             {item.rating}
           </div>
        )}
      </div>
      
      <CardContent className="p-4">
         <div className="flex justify-between items-start mb-1">
            <h3 className="font-bold text-gray-900 line-clamp-1 flex-1 pr-2">{item.name}</h3>
            <span className="font-bold text-red-600">${item.price}</span>
         </div>
         <p className="text-gray-500 text-sm line-clamp-2 min-h-[40px]">{item.description || "No description available."}</p>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button 
          onClick={handleAddToCart}
          className="w-full rounded-full bg-gray-900 hover:bg-gray-800 text-white gap-2"
        >
          <Plus className="w-4 h-4" /> Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
