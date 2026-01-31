"use client";

import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import { CheckCircle2 } from "lucide-react";

export default function SuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const date = searchParams.get("date") || "-";
  const total = Number(searchParams.get("total") || 0);
  const method = searchParams.get("method") || "Bank Transfer";
  
  // Format Method Name
  const methodName = method === "bni" ? "Bank BNI" : method === "bca" ? "Bank BCA" : method === "mandiri" ? "Bank Mandiri" : method;

  return (
    <div className="min-h-screen bg-[#FDFDFD] flex items-center justify-center p-4 font-nunito">
        
      <div className="w-full max-w-md">
          {/* Logo Section */}
          <div className="flex justify-center items-center gap-3 mb-8">
               <div className="w-10 h-10 flex items-center justify-center">
                   <Image src="/assets/logo-foody.png" alt="Foody" width={40} height={40} />
               </div>
               <span className="text-2xl font-extrabold text-gray-900">Foody</span>
          </div>

          <div className="bg-white rounded-[32px] overflow-hidden shadow-[0_10px_30px_#CBCACA66] relative">
            
            {/* Top Section */}
            <div className="p-8 pb-10 text-center relative z-10">
                <div className="w-20 h-20 bg-[#4CAF50] rounded-full flex items-center justify-center mb-6 mx-auto shadow-green-100 shadow-xl">
                    <CheckCircle2 size={40} className="text-white stroke-[3px]" />
                </div>
                <h1 className="text-2xl font-extrabold text-gray-900 mb-2">Payment Success</h1>
                <p className="text-gray-500 text-sm font-semibold mx-auto">Your payment has been successfully processed.</p>
            </div>

            {/* Ticket Cutouts */}
            <div className="relative h-6 w-full bg-white flex items-center justify-between">
                <div className="w-6 h-6 bg-[#FDFDFD] rounded-full -ml-3"></div>
                <div className="flex-1 border-t-2 border-dashed border-gray-100 mx-2"></div>
                <div className="w-6 h-6 bg-[#FDFDFD] rounded-full -mr-3"></div>
            </div>

            {/* Bottom Section (Receipt) */}
            <div className="p-8 pt-6 relative z-10 bg-white">
                <div className="space-y-5 mb-8">
                    <div className="flex justify-between text-sm font-bold items-center">
                        <span className="text-gray-400">Date</span>
                        <span className="text-gray-900">{date}</span>
                    </div>
                    <div className="flex justify-between text-sm font-bold items-center">
                        <span className="text-gray-400">Payment Method</span>
                        <span className="text-gray-900">{methodName}</span>
                    </div>
                    
                    <div className="flex justify-between text-sm font-bold items-center">
                        <span className="text-gray-400">Price (2 items)</span>
                        <span className="text-gray-900">Rp {(total - 15000).toLocaleString("id-ID")}</span>
                    </div>
                    <div className="flex justify-between text-sm font-bold items-center">
                        <span className="text-gray-400">Delivery Fee</span>
                        <span className="text-gray-900">Rp 12.000</span>
                    </div>
                    <div className="flex justify-between text-sm font-bold items-center">
                        <span className="text-gray-400">Service Fee</span>
                        <span className="text-gray-900">Rp 3.000</span>
                    </div>

                    <div className="h-px bg-gray-100 my-2"></div>

                    <div className="flex justify-between text-lg font-extrabold">
                        <span className="text-gray-900">Total</span>
                        <span className="text-gray-900">Rp {total.toLocaleString("id-ID")}</span>
                    </div>
                </div>

                <button 
                    onClick={() => router.push("/order-history")}
                    className="w-full bg-[#D32F2F] hover:bg-red-700 text-white font-bold py-4 rounded-full shadow-lg shadow-red-100 transition-transform active:scale-95"
                >
                    See My Orders
                </button>
            </div>
          </div>
      </div>
    </div>
  );
}
