"use client";

import { useState } from "react";
import StickyNavbar from "@/components/StickyNavbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import { Search, MapPin, Package, LogOut } from "lucide-react";
import Link from "next/link";
// import ReviewModal from "@/components/ReviewModal"; // We will create this next
import { useRouter } from "next/navigation";
import { deleteCookie } from "cookies-next";

import { useGetUserProfile } from "@/services/queries/useGetUserProfile";

const TABS = ["Preparing", "On the Way", "Delivered", "Done", "Canceled"];

// Mock Data
const MOCK_ORDERS = [
    {
        id: "ORD-123456",
        restaurant: { name: "Burger King", logo: "/assets/burger.png" },
        items: [
            { name: "Whopper", price: 50000, quantity: 2, image: "/assets/burger.png" }
        ],
        total: 103000,
        status: "Done",
        date: "25 August 2026, 15:51"
    },
    {
        id: "ORD-789012",
        restaurant: { name: "Pizza Hut", logo: "/assets/burger.png" }, // Mock image
        items: [
            { name: "Cheese Pizza", price: 80000, quantity: 1, image: "/assets/burger.png" }
        ],
        total: 95000,
        status: "On the Way",
        date: "30 January 2026, 19:30"
    }
];

export default function OrderHistoryPage() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState("Done");
    const [searchQuery, setSearchQuery] = useState("");
    const [isReviewOpen, setIsReviewOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState<typeof MOCK_ORDERS[0] | null>(null);

    const { data: profileData } = useGetUserProfile();
    const user = profileData?.data;
    const userName = user?.name || "User";
    const userImage = `https://ui-avatars.com/api/?name=${userName}&background=random`;

    const filteredOrders = MOCK_ORDERS.filter(order => {
        const matchesStatus = order.status === activeTab;
        const matchesSearch = 
            order.restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            order.items.some(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()));
        
        return matchesStatus && matchesSearch;
    });

    const handleGiveReview = (order: typeof MOCK_ORDERS[0]) => {
        // Navigate to review page
        router.push(`/review/${order.id}`);
    };

    const handleLogout = () => {
        deleteCookie("token");
        deleteCookie("user_name");
        window.location.href = "/login";
    };

  return (
    <div className="min-h-screen bg-[#FAFAFA] font-nunito flex flex-col">
      <StickyNavbar isFixed={false} />

      <main className="container mx-auto px-4 py-8 flex-1">
         <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
             {/* Sidebar (Desktop) */}
            <aside className="hidden lg:block lg:col-span-1">
                <div className="bg-white rounded-[24px] overflow-hidden p-6 shadow-sm border border-gray-100">
                    <div className="flex items-center gap-4 mb-6">
                         <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-red-100">
                             <Image src={userImage} alt="Profile" width={64} height={64} />
                         </div>
                         <div>
                             <h2 className="font-extrabold text-gray-900 text-lg">{userName}</h2>
                         </div>
                    </div>
                    
                    <nav className="space-y-2">
                        <Link href="#" className="flex items-center gap-3 px-4 py-3 text-gray-500 font-bold rounded-xl hover:bg-gray-50 hover:text-red-600 transition-colors">
                            <MapPin size={20} />
                            Delivery Address
                        </Link>
                        <Link href="/order-history" className="flex items-center gap-3 px-4 py-3 text-red-600 font-bold rounded-xl bg-red-50">
                            <Package size={20} />
                            My Orders
                        </Link>
                        <button 
                            onClick={handleLogout} // Already implemented correct handler
                            className="w-full flex items-center gap-3 px-4 py-3 text-gray-500 font-bold rounded-xl hover:bg-gray-50 hover:text-red-600 transition-colors text-left"
                        >
                            <LogOut size={20} />
                            Logout
                        </button>
                    </nav>
                </div>
            </aside>

            {/* Main Content */}
            <div className="lg:col-span-3">
                <div className="bg-white rounded-[32px] p-6 lg:p-8 min-h-[600px] shadow-sm border border-gray-100">
                    <h1 className="text-2xl font-extrabold text-gray-900 mb-6">My Orders</h1>
                    
                    {/* Search */}
                    <div className="relative mb-8">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input 
                            type="text" 
                            placeholder="Search" 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-full text-sm font-bold outline-none focus:ring-2 focus:ring-red-100 focus:border-red-300 transition-all font-nunito"
                        />
                    </div>

                    {/* Tabs */}
                    <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 no-scrollbar">
                        <span className="text-gray-500 font-bold mr-2 flex-shrink-0">Status</span>
                        {TABS.map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-6 py-2 rounded-full font-bold whitespace-nowrap transition-all border ${
                                    activeTab === tab 
                                    ? "bg-red-50 text-red-600 border-red-600 shadow-sm" 
                                    : "bg-white text-gray-500 border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                                }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    {/* Order List */}
                    <div className="space-y-6">
                        {filteredOrders.length > 0 ? (
                            filteredOrders.map((order) => (
                                <div key={order.id} className="bg-white border border-gray-100 rounded-[24px] p-6 hover:shadow-md transition-shadow">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="w-8 h-8 rounded-full overflow-hidden relative border border-gray-200">
                                            <Image src={order.restaurant.logo} alt={order.restaurant.name} fill className="object-cover" />
                                        </div>
                                        <h3 className="font-extrabold text-gray-900 text-lg">{order.restaurant.name}</h3>
                                    </div>

                                    <div className="space-y-6 mb-8">
                                        {order.items.map((item, idx) => (
                                            <div key={idx} className="flex gap-4">
                                                <div className="w-16 h-16 rounded-[16px] overflow-hidden relative border border-gray-100 flex-shrink-0">
                                                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                                                </div>
                                                <div className="flex-1 flex flex-col justify-center">
                                                    <h4 className="font-bold text-gray-900 text-lg">{item.name}</h4>
                                                    <p className="text-gray-900 font-bold text-sm">{item.quantity} x Rp {item.price.toLocaleString("id-ID")}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                                        <div className="w-full sm:w-auto">
                                            <p className="text-gray-500 text-sm font-semibold mb-1">Total</p>
                                            <p className="font-extrabold text-gray-900 text-2xl">Rp {order.total.toLocaleString("id-ID")}</p>
                                        </div>
                                        
                                        {/* Always show action buttons based on status if needed, or just for Done */}
                                        <div className="w-full sm:w-auto flex gap-3">
                                            {order.status === "Done" && (
                                                <button 
                                                    onClick={() => handleGiveReview(order)}
                                                    className="w-full sm:w-auto bg-[#D32F2F] hover:bg-red-700 text-white px-10 py-3 rounded-full font-bold shadow-lg shadow-red-100 transition-transform active:scale-95"
                                                >
                                                    Give Review
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-20 bg-gray-50 rounded-[24px] border border-dashed border-gray-200">
                                <p className="text-gray-400 font-bold">No orders found.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
         </div>
      </main>

      <Footer />
      

    </div>
  );
}
