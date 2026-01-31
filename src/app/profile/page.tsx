"use client";

import StickyNavbar from "@/components/StickyNavbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import { Package, LogOut, Camera, MapPin, User } from "lucide-react";
import Link from "next/link";
import { getCookie, deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { useGetUserProfile } from "@/services/queries/useGetUserProfile";

export default function ProfilePage() {
    const router = useRouter();
    const { data: profileData } = useGetUserProfile();
    const user = profileData?.data;

    const handleLogout = () => {
        deleteCookie("token");
        deleteCookie("user_name");
        router.push("/login");
    };

    return (
        <div className="min-h-screen bg-[#FAFAFA] font-nunito flex flex-col">
            <StickyNavbar 
                alwaysVisible 
                className="mx-auto" 
                style={{ width: "100%", maxWidth: "1440px", height: "80px", position: "relative" }} 
            />

            <main className="flex-1 w-full relative pt-12 pb-[197px]">
                 {/* 
                    Requirements applied:
                    - Gap from top (implied StickyNavbar height + 48px gap): pt-[112px] (assuming navbar ~64px + 48px)
                      -> Update: Header is relative now, providing its own height. We just need spacing.
                    - Gap from left: 120px (Desktop)
                    - Separation between Sidebar and Profile: 32px
                 */}
                <div className="flex flex-col md:flex-row gap-8 px-4 md:px-0 md:ml-[120px]">
                    
                    <aside className="hidden md:block w-[240px] bg-white rounded-[12px] shadow-sm border border-gray-100 overflow-hidden flex-shrink-0 h-fit">
                         {/* User Info Section */}
                         <div className="bg-white p-6 flex items-center gap-4 border-b border-gray-100">
                             <div className="w-12 h-12 rounded-full overflow-hidden border border-gray-200 relative flex-shrink-0">
                                <Image src={`https://ui-avatars.com/api/?name=${user?.name || "User"}&background=random`} alt="Profile" fill className="object-cover" />
                             </div>
                             <div>
                                 <h3 className="font-bold text-neutral-950 text-base leading-tight truncate max-w-[120px]">{user?.name || "User"}</h3>
                             </div>
                         </div>
                         
                         <nav className="p-2 space-y-1">
                             <Link href="#" className="flex items-center gap-3 px-4 py-3 text-neutral-950 text-sm font-medium hover:bg-gray-50 rounded-lg transition-colors">
                                 <div className="w-5 flex justify-center">
                                     <Image src="/assets/ic-deliveryorder.png" alt="Delivery Address" width={20} height={20} />
                                 </div>
                                 Delivery Address
                             </Link>
                             <Link href="/order-history" className="flex items-center gap-3 px-4 py-3 text-neutral-950 text-sm font-medium hover:bg-gray-50 rounded-lg transition-colors">
                                 <div className="w-5 flex justify-center">
                                     <Image src="/assets/ic-orders.png" alt="My Orders" width={16} height={16} />
                                 </div>
                                 My Orders
                             </Link>
                             <button 
                                onClick={handleLogout}
                                className="w-full flex items-center gap-3 px-4 py-3 text-neutral-950 text-sm font-medium hover:bg-gray-50 rounded-lg transition-colors text-left"
                             >
                                 <div className="w-5 flex justify-center">
                                     <Image src="/assets/ic-logout.png" alt="Logout" width={16} height={16} />
                                 </div>
                                 Logout
                             </button>
                         </nav>
                    </aside>
        
                    {/* Right Content Column */}
                    <div className="flex flex-col gap-6 w-full md:w-[524px]">
                        {/* Header Outside Card */}
                        <div>
                            <h1 className="text-[32px] font-extrabold text-neutral-950">Profile</h1>
                        </div>

                        {/* Card Container */}
                        <div 
                            className="bg-white rounded-[12px] shadow-sm border border-gray-100 p-6 flex flex-col gap-6 w-full md:w-[524px] min-h-[298px] h-auto"
                        >
                             <div className="flex flex-col gap-6 h-full">
                                {/* Profile Image */}
                                <div className="w-[64px] h-[64px] rounded-full overflow-hidden relative group cursor-pointer flex-shrink-0 self-start">
                                    <Image src={`https://ui-avatars.com/api/?name=${user?.name || "User"}&background=random`} alt="Profile" fill className="object-cover" />
                                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <Camera className="text-white w-6 h-6" />
                                    </div>
                                </div>

                                {/* Form Fields */}
                                <div className="flex-1 space-y-3">
                                    <div className="flex justify-between items-center bg-white border-b border-gray-50 pb-1">
                                        <span className="text-neutral-950 text-base font-medium tracking-tight">Name</span>
                                        <span className="text-neutral-950 font-bold text-base text-right">{user?.name || "-"}</span>
                                    </div>
                                    <div className="flex justify-between items-center bg-white border-b border-gray-50 pb-1">
                                        <span className="text-neutral-950 text-base font-medium tracking-tight">Email</span>
                                        <span className="text-neutral-950 font-bold text-base text-right">{user?.email || "-"}</span>
                                    </div>
                                    <div className="flex justify-between items-center bg-white border-b border-gray-50 pb-1">
                                        <span className="text-neutral-950 text-base font-medium tracking-tight">Nomor Handphone</span>
                                        <span className="text-neutral-950 font-bold text-base text-right">{user?.phone || "-"}</span>
                                    </div>
                                </div>
                                
                                {/* Button */}
                                <div className="mt-2">
                                    <button className="w-full bg-[#D32F2F] hover:bg-red-700 text-white font-bold py-3 rounded-full transition-transform active:scale-95 shadow-md text-sm">
                                        Update Profile
                                    </button>
                                </div>
                             </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer 
                className="w-full mx-auto"
                style={{ maxWidth: "1440px", height: "490px" }}
            />
        </div>
    );
}
