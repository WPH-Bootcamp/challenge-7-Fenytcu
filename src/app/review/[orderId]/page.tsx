"use client";

import { useState } from "react";
import StickyNavbar from "@/components/StickyNavbar";
import Footer from "@/components/Footer";
import { Star, X } from "lucide-react";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";

export default function ReviewPage() {
  const router = useRouter();
  const params = useParams();
  const orderId = params.orderId as string;

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (rating === 0) {
        alert("Please select a rating.");
        return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
        alert(`Review submitted for Order ${orderId}!\nRating: ${rating}\nComment: ${comment}`);
        setIsSubmitting(false);
        router.push("/order-history");
    }, 1000);
  };

  return (
    <div className="min-h-screen relative font-nunito bg-[#FAFAFA]">
      {/* 
         MOCK BACKGROUND: Replicating the "My Orders" page structure behind the overlay.
         We hide the navbar and footer for the background to focus on the content.
      */}
      <div className="absolute inset-0 z-0 opacity-100 flex flex-col pointer-events-none select-none overflow-hidden">
        <div className="container mx-auto px-4 py-8 flex-1">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Mock Sidebar */}
                <aside className="hidden lg:block lg:col-span-1">
                    <div className="bg-white rounded-[24px] p-6 border border-gray-100">
                        <div className="w-16 h-16 rounded-full bg-gray-100 mb-6"></div>
                        <div className="space-y-4">
                            <div className="h-4 bg-gray-100 rounded w-3/4"></div>
                            <div className="h-4 bg-gray-100 rounded w-1/2"></div>
                        </div>
                    </div>
                </aside>

                {/* Mock Order Content */}
                <div className="lg:col-span-3">
                    <div className="bg-white rounded-[32px] p-6 lg:p-8 min-h-screen border border-gray-100">
                        <h1 className="text-2xl font-extrabold text-gray-900 mb-6">My Orders</h1>
                        <div className="h-12 bg-gray-50 rounded-full mb-8"></div>
                        <div className="flex gap-2 mb-6">
                            <div className="h-8 bg-gray-50 rounded-full w-20"></div>
                            <div className="h-8 bg-gray-50 rounded-full w-24"></div>
                        </div>
                        
                        {/* Mock Order Card */}
                        <div className="border border-gray-100 rounded-[24px] p-6 opacity-40">
                             <div className="flex items-center gap-3 mb-6">
                                <div className="w-8 h-8 rounded-full bg-gray-100"></div>
                                <div className="h-4 bg-gray-100 rounded w-32"></div>
                             </div>
                             <div className="flex gap-4 mb-6">
                                <div className="w-16 h-16 rounded-[16px] bg-gray-100"></div>
                                <div className="space-y-2 flex-1">
                                    <div className="h-4 bg-gray-100 rounded w-1/2"></div>
                                    <div className="h-3 bg-gray-100 rounded w-1/4"></div>
                                </div>
                             </div>
                             <div className="pt-6 border-t border-gray-100 flex justify-between items-center">
                                <div className="h-8 bg-gray-100 rounded w-24"></div>
                                <div className="h-10 bg-gray-100 rounded-full w-32"></div>
                             </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>

      {/* 40% Opacity Overlay - Absolute Full Screen */}
      <div className="fixed inset-0 bg-[#0A0D12]/40 backdrop-blur-sm z-10" />

      {/* Review Modal Card - Centered on screen */}
      <div className="relative z-20 flex items-center justify-center min-h-screen p-4">
         <div className="w-full max-w-md relative">
            <div className="bg-white rounded-[24px] md:rounded-[32px] p-6 md:p-8 shadow-2xl relative animate-in zoom-in-95 duration-200">
                {/* Close Button */}
                <button 
                    onClick={() => router.back()} 
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-900 transition-colors"
                >
                    <X size={24} />
                </button>

                <div className="mb-6">
                    <h1 className="text-xl md:text-2xl font-extrabold text-gray-900 mb-6 text-left">Give Review</h1>
                    
                    <p className="text-center text-gray-500 font-bold text-sm mb-4">Give Rating</p>
                    <div className="flex justify-center gap-2 mb-8">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <button 
                                key={star}
                                onClick={() => setRating(star)}
                                className="focus:outline-none transition-transform active:scale-90 hover:scale-110"
                            >
                                <Star 
                                    size={36} 
                                    className={`${star <= rating ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200"} transition-colors duration-200 md:w-10 md:h-10`}
                                />
                            </button>
                        ))}
                    </div>
                </div>

                <div className="mb-6 md:mb-8">
                     <textarea 
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        className="w-full h-32 md:h-40 bg-gray-50 border border-gray-200 rounded-2xl p-4 font-nunito text-sm font-bold outline-none focus:ring-2 focus:ring-red-100 focus:border-red-300 transition-all resize-none placeholder:text-gray-400"
                        placeholder="Please share your thoughts about our service!"
                    ></textarea>
                </div>

                <button 
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="w-full bg-[#D32F2F] hover:bg-red-700 text-white font-bold py-3 md:py-4 rounded-full shadow-lg shadow-red-100 transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed text-sm md:text-base"
                >
                    {isSubmitting ? "Sending..." : "Send"}
                </button>
            </div>
         </div>
      </div>
    </div>
  );
}
