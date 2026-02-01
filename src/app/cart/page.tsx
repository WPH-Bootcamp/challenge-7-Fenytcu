'use client';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/features/store';
import {
  removeFromCart,
  updateQuantity,
  CartItem,
} from '@/features/cart/cartSlice';
import StickyNavbar from '@/components/StickyNavbar';
import Footer from '@/components/Footer';
import Image from 'next/image';
import Link from 'next/link';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function CartPage() {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();
  const router = useRouter();

  // Group items by Restaurant ID
  const groupedItems = cartItems.reduce(
    (acc, item) => {
      const restoId = item.resto_id || 0;
      if (!acc[restoId]) {
        acc[restoId] = {
          name: item.resto_name || 'Unknown Restaurant',
          logo: item.resto_logo || '/assets/burger.png',
          items: [],
        };
      }
      acc[restoId].items.push(item);
      return acc;
    },
    {} as Record<number, { name: string; logo: string; items: CartItem[] }>
  );

  const handleQuantityChange = (id: string, newQty: number) => {
    if (newQty < 1) return;
    dispatch(updateQuantity({ id, quantity: newQty }));
  };

  const handleRemove = (id: string) => {
    if (confirm('Are you sure you want to remove this item?')) {
      dispatch(removeFromCart(id));
    }
  };

  const calculateSubtotal = (items: CartItem[]) => {
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  return (
    <div className='min-h-screen bg-gray-50 font-nunito flex flex-col'>
      <StickyNavbar alwaysVisible={true} isFixed={false} />

      <main className='container mx-auto px-4 py-8 flex-1'>
        <h1 className='text-3xl font-extrabold text-gray-900 mb-8'>My Cart</h1>

        {Object.keys(groupedItems).length === 0 ? (
          <div className='flex flex-col items-center justify-center py-20 text-center'>
            <div className='w-24 h-24 bg-red-50 rounded-full flex items-center justify-center mb-6 text-red-200'>
              <ShoppingBag size={48} />
            </div>
            <h2 className='text-xl font-bold text-gray-900 mb-2'>
              Your Cart is Empty
            </h2>
            <p className='text-gray-500 mb-6'>
              Looks like you have not added anything yet.
            </p>
            <Link
              href='/category'
              className='bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-full font-bold shadow-lg transition-colors'
            >
              Start Exploring
            </Link>
          </div>
        ) : (
          <div className='space-y-8 max-w-4xl mx-auto'>
            {Object.entries(groupedItems).map(([restoId, group]) => (
              <div
                key={restoId}
                className='bg-white rounded-[24px] shadow-sm border border-gray-100 overflow-hidden'
              >
                {/* Header */}
                <div className='p-4 md:p-6 border-b border-gray-100 flex items-center gap-3 bg-white'>
                  <div className='w-6 h-6 rounded-full overflow-hidden border border-gray-200 relative'>
                    <Image
                      src={group.logo}
                      alt={group.name}
                      fill
                      className='object-cover'
                    />
                  </div>
                  <Link
                    href={`/detail/${restoId}`}
                    className='font-extrabold text-gray-900 text-lg hover:text-red-600 transition-colors flex items-center gap-2 font-nunito'
                  >
                    {group.name}
                    <span className='text-gray-400 text-sm'>{'>'}</span>
                  </Link>
                </div>

                {/* Items */}
                <div className='p-4 md:p-6 space-y-6 bg-white'>
                  {group.items.map((item) => (
                    <div
                      key={item.id}
                      className='flex items-center justify-between group'
                    >
                      {/* Left: Image & Details */}
                      <div className='flex items-center gap-4'>
                        <div className='w-16 h-16 md:w-20 md:h-20 rounded-2xl overflow-hidden relative flex-shrink-0 border border-gray-100'>
                          <Image
                            src={item.image || '/assets/burger.png'}
                            alt={item.name}
                            fill
                            className='object-cover'
                          />
                        </div>
                        <div className='flex flex-col gap-1'>
                          <h3 className='font-bold text-gray-900 text-base md:text-lg line-clamp-1'>
                            {item.name}
                          </h3>
                          <span className='font-extrabold text-gray-900 text-sm md:text-base'>
                            Rp {item.price.toLocaleString('id-ID')}
                          </span>
                        </div>
                      </div>

                      {/* Right: Quantity Control & Remove */}
                      <div className='flex items-center gap-4 md:gap-6'>
                        <div className='flex items-center gap-3'>
                          <button
                            onClick={() =>
                              handleQuantityChange(item.id, item.quantity - 1)
                            }
                            className={`w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 text-gray-400 hover:text-red-600 hover:border-red-600 transition-all ${item.quantity <= 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                            disabled={item.quantity <= 1}
                          >
                            <Minus size={16} strokeWidth={2.5} />
                          </button>
                          <span className='font-bold text-gray-900 w-6 text-center text-lg'>
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              handleQuantityChange(item.id, item.quantity + 1)
                            }
                            className='w-8 h-8 flex items-center justify-center rounded-full bg-red-600 text-white shadow-md hover:bg-red-700 transition-all'
                          >
                            <Plus size={16} strokeWidth={2.5} />
                          </button>
                        </div>

                        <button
                          onClick={() => handleRemove(item.id)}
                          className='text-gray-300 hover:text-red-600 transition-colors p-2'
                          title='Remove item'
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Footer / Total */}
                <div className='p-4 md:p-6 bg-white border-t border-dashed border-gray-100 flex flex-col md:flex-row items-center justify-between gap-4'>
                  <div className='flex flex-col w-full md:w-auto'>
                    <span className='text-gray-400 text-xs font-bold uppercase tracking-wider mb-1'>
                      Total
                    </span>
                    <span className='text-xl md:text-2xl font-extrabold text-gray-900'>
                      Rp{' '}
                      {calculateSubtotal(group.items).toLocaleString('id-ID')}
                    </span>
                  </div>
                  <button
                    onClick={() => router.push(`/checkout?restoId=${restoId}`)}
                    className='w-full md:w-auto bg-red-600 hover:bg-red-700 text-white px-10 py-3 rounded-full font-bold shadow-lg shadow-red-100 transition-transform active:scale-95'
                  >
                    Checkout
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
