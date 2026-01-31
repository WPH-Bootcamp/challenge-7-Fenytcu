"use client";

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/features/store";
import { clearCart, updateQuantity } from "@/features/cart/cartSlice";
import StickyNavbar from "@/components/StickyNavbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { MapPin, ChevronRight } from "lucide-react";

import { useGetUserProfile } from "@/services/queries/useGetUserProfile";

export default function CheckoutPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useDispatch();
  
  const { data: profileData } = useGetUserProfile(); // Fetch user data

  const restoId = searchParams.get("restoId");
  const cartItems = useSelector((state: RootState) => state.cart.items);
  
  const [selectedPayment, setSelectedPayment] = useState("bni");
  const [isProcessing, setIsProcessing] = useState(false);

  // Filter items for this specific checkout session
  const checkoutItems = restoId 
    ? cartItems.filter(item => String(item.resto_id) === String(restoId))
    : [];

  const restaurantName = checkoutItems[0]?.resto_name || "Restaurant";
  const restaurantLogo = checkoutItems[0]?.resto_logo || "/assets/burger.png";

  const subtotal = checkoutItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const deliveryFee = 12000;
  const serviceFee = 3000;
  const total = subtotal + deliveryFee + serviceFee;

  useEffect(() => {
    if (!restoId || checkoutItems.length === 0) {
      
    }
  }, [restoId, checkoutItems, router]);

  const handlePay = () => {
      setIsProcessing(true);
      
      // Simulate API Call
      setTimeout(() => {
          
          dispatch(clearCart()); // Simple approach
          
          router.push(`/success?date=${encodeURIComponent(new Date().toLocaleString())}&total=${total}&method=${selectedPayment}`);
      }, 1500);
  };

  if (!restoId || checkoutItems.length === 0) {
      return (
          <div className="min-h-screen bg-gray-50 flex items-center justify-center">
              <p className="text-gray-500 font-nunito">No items to checkout. Redirecting...</p>
          </div>
      );
  }

  return (
    <div className="min-h-screen bg-gray-50 font-nunito">
      <StickyNavbar alwaysVisible={true} isFixed={false} />

      <main className="container mx-auto px-4 py-8">
         <div className="flex items-center gap-4 mb-8">
            <button onClick={() => router.back()} className="text-gray-500 hover:text-gray-900">
                <ChevronRight className="rotate-180" size={24} />
            </button>
            <h1 className="text-3xl font-extrabold text-gray-900">Checkout</h1>
         </div>

         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column: Details */}
            <div className="lg:col-span-2 space-y-6">
                
                {/* Delivery Address */}
                <section className="bg-white p-6 rounded-[24px] border border-gray-100 shadow-sm">
                    <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <MapPin className="text-red-500 fill-current" size={24} />
                        Delivery Address
                    </h2>
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-gray-50 p-5 rounded-2xl gap-4">
                        <div>
                            <p className="font-bold text-gray-800 mb-1">Jl. Sudirman No. 25, Jakarta Pusat, 10220</p>
                            <p className="text-gray-500 text-sm font-semibold">
                                {profileData?.data?.phone || "0812-3456-7890"}
                            </p>
                        </div>
                        <button 
                            onClick={() => router.push("/profile")}
                            className="text-gray-900 font-bold text-sm bg-white border border-gray-200 px-6 py-2.5 rounded-full shadow-sm hover:bg-gray-50 transition-colors w-full sm:w-auto"
                        >
                            Change
                        </button>
                    </div>
                </section>

                {/* Order Items */}
                <section className="bg-white p-6 rounded-[24px] border border-gray-100 shadow-sm">
                    <div className="flex justify-between items-center mb-6">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full overflow-hidden relative border border-gray-200">
                                 <Image src={restaurantLogo} alt={restaurantName} fill className="object-cover" />
                            </div>
                            <h2 className="text-lg font-extrabold text-gray-900">{restaurantName}</h2>
                        </div>
                        <button className="text-gray-500 font-bold text-sm border border-gray-200 px-4 py-2 rounded-full hover:bg-gray-50 transition-colors">
                            Add Item
                        </button>
                    </div>

                    <div className="space-y-6">
                        {checkoutItems.map((item) => (
                            <div key={item.id} className="flex gap-4">
                                <div className="w-20 h-20 rounded-[16px] overflow-hidden relative border border-gray-100 flex-shrink-0">
                                    <Image src={item.image || "/assets/burger.png"} alt={item.name} fill className="object-cover" />
                                </div>
                                <div className="flex-1 flex flex-col justify-center">
                                    <h3 className="font-bold text-gray-900 line-clamp-1 text-base">{item.name}</h3>
                                    <div className="flex justify-between items-center mt-2">
                                        <p className="font-extrabold text-gray-900">Rp {(item.price).toLocaleString("id-ID")}</p>
                                        
                                        {/* Quantity Control (Visual Only in Checkout for now, usually editing is in Cart, but requested in design) */}
                                        {/* Ideally we dispatch updates here similarly to CartPage */}
                                        <div className="flex items-center gap-3">
                                            <button 
                                                className="w-7 h-7 flex items-center justify-center rounded-full border border-gray-300 text-gray-400 hover:text-red-600 hover:border-red-600 transition-all"
                                                onClick={() => {
                                                    if (item.quantity > 1) {
                                                        dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }));
                                                    }
                                                }}
                                            >
                                                <div className="w-3 h-[2px] bg-current"></div>
                                            </button>
                                            <span className="font-bold text-gray-900 w-4 text-center text-sm">{item.quantity}</span>
                                            <button 
                                                className="w-7 h-7 flex items-center justify-center rounded-full bg-red-600 text-white shadow-md hover:bg-red-700 transition-all"
                                                onClick={() => {
                                                    dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }));
                                                }}
                                            >
                                                <div className="relative w-3 h-3 flex items-center justify-center">
                                                    <div className="absolute w-3 h-[2px] bg-white"></div>
                                                    <div className="absolute w-[2px] h-3 bg-white"></div>
                                                </div>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>

            {/* Right Column: Payment & Summary */}
            <div className="lg:col-span-1 space-y-6">
                 {/* Payment Method */}
                 <div className="bg-white p-6 rounded-[24px] border border-gray-100 shadow-sm">
                    <h2 className="text-lg font-bold text-gray-900 mb-6">Payment Method</h2>
                    <div className="space-y-4">
                        {[
                            { id: "bni", label: "Bank Negara Indonesia", icon: "/assets/BNI (2).png" }, 
                            { id: "bri", label: "Bank Rakyat Indonesia", icon: "/assets/BRI.png" },
                            { id: "bca", label: "Bank Central Asia", icon: "/assets/BCA.png" },
                            { id: "mandiri", label: "Mandiri", icon: "/assets/Mandiri.png" },
                        ].map((method) => (
                            <label key={method.id} className="flex items-center justify-between cursor-pointer group py-2 border-b border-gray-50 last:border-0">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-8 relative flex items-center justify-center">
                                        <Image src={method.icon} alt={method.label} fill className="object-contain" />
                                    </div>
                                    <span className={`text-sm font-bold ${selectedPayment === method.id ? "text-gray-900" : "text-gray-500 group-hover:text-gray-900"}`}>{method.label}</span>
                                </div>
                                
                                <input 
                                    type="radio" 
                                    name="payment" 
                                    value={method.id} 
                                    checked={selectedPayment === method.id} 
                                    onChange={(e) => setSelectedPayment(e.target.value)} 
                                    className="hidden" 
                                />

                                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${selectedPayment === method.id ? "border-red-600" : "border-gray-200"}`}>
                                    {selectedPayment === method.id && (
                                        <div className="w-3 h-3 bg-red-600 rounded-full" />
                                    )}
                                </div>
                            </label>
                        ))}
                    </div>
                 </div>

                {/* Summary */}
                <div className="bg-white p-6 rounded-[24px] border border-gray-100 shadow-sm">
                    <h2 className="text-lg font-bold text-gray-900 mb-6">Payment Summary</h2>
                    
                    <div className="space-y-4 mb-8">
                        <div className="flex justify-between text-gray-600 font-bold text-sm">
                            <span>Price ({checkoutItems.reduce((a, b) => a + b.quantity, 0)} items)</span>
                            <span className="text-gray-900">Rp {subtotal.toLocaleString("id-ID")}</span>
                        </div>
                        <div className="flex justify-between text-gray-600 font-bold text-sm">
                            <span>Delivery Fee</span>
                            <span className="text-gray-900">Rp {deliveryFee.toLocaleString("id-ID")}</span>
                        </div>
                        <div className="flex justify-between text-gray-600 font-bold text-sm">
                            <span>Service Fee</span>
                            <span className="text-gray-900">Rp {serviceFee.toLocaleString("id-ID")}</span>
                        </div>
                        <div className="h-px bg-gray-100 my-2"></div>
                        <div className="flex justify-between text-lg font-extrabold text-gray-900">
                            <span>Total</span>
                            <span>Rp {total.toLocaleString("id-ID")}</span>
                        </div>
                    </div>

                    <button 
                        onClick={handlePay}
                        disabled={isProcessing}
                        className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-full shadow-lg shadow-red-100 transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {isProcessing ? "Processing..." : "Buy"}
                    </button>
                </div>
            </div>
         </div>
      </main>

      <Footer />
    </div>
  );
}
