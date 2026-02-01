"use client";

import Image from "next/image";
import Link from "next/link";
import { Facebook, Instagram, Linkedin, MessageCircle } from "lucide-react"; // MessageCircle as simple replacement for Tiktok if not available or just generic

interface FooterProps {
  className?: string;
  style?: React.CSSProperties;
}

export default function Footer({ className, style }: FooterProps) {
  return (
    <footer className={`bg-gray-950 text-white py-16 ${className}`} style={style}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div className="md:col-span-2 space-y-6">
            <div className="flex items-center gap-2 font-bold text-2xl text-white">
                <div className="w-10 h-10 flex items-center justify-center">
                     <Image src="/assets/logo-foody.png" alt="Foody" width={40} height={40} />
                </div>
                <span>Foody</span>
            </div>
            
            <p className="text-gray-400 text-md leading-relaxed max-w-sm">
              Enjoy homemade flavors & chef’s signature dishes, freshly prepared every day. Order online or visit our nearest branch.
            </p>

            <div className="space-y-4">
                <h4 className="font-bold text-md text-white">Follow on Social Media</h4>
                <div className="flex gap-4">
                    <Link href="#" className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center hover:bg-gray-800 transition-colors">
                        <Image src="/assets/ic-facebook.png" alt="Facebook" width={20} height={20} />
                    </Link>
                    <Link href="#" className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center hover:bg-gray-800 transition-colors">
                        <Image src="/assets/ic-instagram.png" alt="Instagram" width={20} height={20} />
                    </Link>
                    <Link href="#" className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center hover:bg-gray-800 transition-colors">
                        <Image src="/assets/ic-linkedin.png" alt="LinkedIn" width={20} height={20} />
                    </Link>
                     <Link href="#" className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center hover:bg-gray-800 transition-colors">
                        <Image src="/assets/ic-tiktok.png" alt="TikTok" width={20} height={20} />
                    </Link>
                </div>
            </div>
          </div>

          {/* Links Wrapper - 2 columns on mobile */}
          <div className="grid grid-cols-2 md:col-span-2 gap-8">
            {/* Links Column 1 */}
            <div className="space-y-6">
              <h3 className="font-bold text-md">Explore</h3>
              <ul className="space-y-4 text-gray-400 text-md">
                  <li><Link href="#" className="hover:text-white transition-colors">All Food</Link></li>
                  <li><Link href="#" className="hover:text-white transition-colors">Nearby</Link></li>
                  <li><Link href="#" className="hover:text-white transition-colors">Discount</Link></li>
                  <li><Link href="#" className="hover:text-white transition-colors">Best Seller</Link></li>
                  <li><Link href="#" className="hover:text-white transition-colors">Delivery</Link></li>
                  <li><Link href="#" className="hover:text-white transition-colors">Lunch</Link></li>
              </ul>
            </div>

            {/* Links Column 2 */}
            <div className="space-y-6">
              <h3 className="font-extrabold text-md">Help</h3>
               <ul className="space-y-4 text-gray-400 text-md">
                  <li><Link href="#" className="hover:text-white transition-colors">How to Order</Link></li>
                  <li><Link href="#" className="hover:text-white transition-colors">Payment Methods</Link></li>
                  <li><Link href="#" className="hover:text-white transition-colors">Track My Order</Link></li>
                  <li><Link href="#" className="hover:text-white transition-colors">FAQ</Link></li>
                  <li><Link href="#" className="hover:text-white transition-colors">Contact Us</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
