'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import StickyNavbar from '@/components/StickyNavbar';
import Footer from '@/components/Footer';
import { Star, Share2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/features/store';
import {
  addToCart,
  removeFromCart,
  updateQuantity,
} from '@/features/cart/cartSlice';
import { useRestaurantDetail } from '@/services/queries/useRestaurantDetail';
import { Skeleton } from '@/components/ui/skeleton';
import { Menu } from '@/types/menu';

export default function DetailPage() {
  const params = useParams();
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState('All Menu');

  // Safely handle params.id which can be string or string[]
  const idString = Array.isArray(params.id) ? params.id[0] : params.id;
  const restaurantId = Number(idString);

  // FETCH RESTAURANT DETAIL
  const { data: restaurant, isLoading } = useRestaurantDetail(restaurantId);

  // Redux Cart State
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const getItemQuantity = (id: number) => {
    return cartItems.find((item) => item.id === String(id))?.quantity || 0;
  };

  const handleAdd = (item: Menu) => {
    dispatch(
      addToCart({
        id: String(item.id),
        menu_id: item.id,
        resto_id: restaurantId,
        name: item.foodName,
        price: item.price,
        quantity: 1,
        image: item.image || '/assets/burger.png',
        resto_name: restaurant?.name,
        resto_logo: restaurant?.logo,
      })
    );
  };

  const handleDecrease = (item: Menu) => {
    const currentQty = getItemQuantity(item.id);
    if (currentQty > 1) {
      dispatch(
        updateQuantity({ id: String(item.id), quantity: currentQty - 1 })
      );
    } else {
      dispatch(removeFromCart(String(item.id)));
    }
  };

  // FILTER LOGIC
  const restaurantMenu = restaurant?.menus || [];

  const filteredMenu =
    activeTab === 'All Menu'
      ? restaurantMenu
      : restaurantMenu.filter((item) => {
          const lowerType = item.type.toLowerCase(); // "food" or "drink"
          const lowerTab = activeTab.toLowerCase();
          return lowerType.includes(lowerTab);
        });

  if (isLoading) {
    return (
      <div className='min-h-screen bg-gray-50 pb-24'>
        <StickyNavbar />
        <main className='container mx-auto px-4 py-8 pt-24 max-w-6xl font-nunito space-y-8'>
          <Skeleton className='h-[400px] w-full rounded-2xl' />
          <Skeleton className='h-[150px] w-full rounded-[20px]' />
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
            {Array.from({ length: 8 }).map((_, i) => (
              <Skeleton key={i} className='h-[300px] w-full rounded-2xl' />
            ))}
          </div>
        </main>
      </div>
    );
  }

  if (!restaurant) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <p className='font-nunito text-xl font-bold text-gray-500'>
          Restaurant not found
        </p>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gray-50 pb-24'>
      <StickyNavbar />

      <main className='container mx-auto px-4 py-8 pt-24 max-w-6xl font-nunito'>
        {/* GALLERY GRID */}
        {restaurant.images && restaurant.images.length > 0 ? (
          <div className='grid grid-cols-1 md:grid-cols-4 gap-4 mb-8 h-[300px] md:h-[400px]'>
            <div className='md:col-span-2 md:row-span-2 relative rounded-2xl overflow-hidden shadow-sm group'>
              <Image
                src={restaurant.images[0] || '/assets/Home-banner.png'}
                alt='Main'
                fill
                className='object-cover group-hover:scale-105 transition-transform duration-500'
              />
            </div>
            {restaurant.images.slice(1, 4).map((img, idx) => (
              <div
                key={idx}
                className='relative rounded-2xl overflow-hidden shadow-sm hidden md:block group'
              >
                <Image
                  src={img}
                  alt={`Gallery ${idx + 1}`}
                  fill
                  className='object-cover group-hover:scale-105 transition-transform duration-500'
                />
              </div>
            ))}
          </div>
        ) : (
          // Fallback Gallery if no images
          <div className='w-full h-[300px] relative rounded-2xl overflow-hidden mb-8'>
            <Image
              src='/assets/Home-banner.png'
              alt='Fallback Banner'
              fill
              className='object-cover'
            />
          </div>
        )}

        {/* RESTAURANT INFO CARD */}
        <div className='flex items-center justify-between pb-8 mb-8 border-b border-gray-100'>
          <div className='flex items-center gap-6'>
            <div className='w-[120px] h-[120px] relative'>
              <Image
                src={restaurant.logo || '/assets/burger.png'}
                alt='Logo'
                fill
                className='object-cover'
              />
            </div>
            <div className='flex flex-col gap-2'>
              <h1 className='font-nunito text-3xl font-extrabold text-gray-900'>
                {restaurant.name}
              </h1>
              <div className='flex flex-col gap-1'>
                <div className='flex items-center gap-2 text-sm text-gray-500'>
                  <Star size={18} className='fill-orange-400 text-orange-400' />
                  <span className='font-nunito font-bold text-gray-800 text-base'>
                    {restaurant.star}
                  </span>
                  {restaurant.averageRating && (
                    <>
                      <span>•</span>
                      <span className='font-nunito'>
                        {Number(restaurant.averageRating).toFixed(1)} Rating
                      </span>
                    </>
                  )}
                </div>
                <p className='text-gray-500 text-base font-nunito'>
                  {restaurant.place}{' '}
                  {restaurant.distance ? `• ${restaurant.distance} km` : ''}
                </p>
              </div>
            </div>
          </div>
          <button className='font-nunito flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-full text-gray-600 font-bold hover:bg-gray-50 transition-colors'>
            <Share2 size={18} />
            <span className='hidden sm:inline'>Share</span>
          </button>
        </div>

        {/* MENU SECTION */}
        <section className='mb-12'>
          <h2 className='font-nunito text-lg font-extrabold text-neutral-950 mb-6'>
            Menu
          </h2>

          {/* Tabs */}
          <div className='flex gap-3 mb-8'>
            {['All Menu', 'Food', 'Drink'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 rounded-full font-semibold transition-all ${
                  activeTab === tab
                    ? 'bg-[#FFECEC] text-red-600 shadow-sm border border-red-100'
                    : 'bg-white text-gray-500 border border-gray-200 hover:bg-gray-50'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          {filteredMenu.length === 0 ? (
            <div className='flex flex-col items-center justify-center p-12 text-gray-500 bg-white rounded-2xl border border-gray-100'>
              <p className='font-nunito font-bold text-lg mb-2'>
                No menu available in this category.
              </p>
            </div>
          ) : (
            <div className='grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6'>
              {filteredMenu.map((item) => {
                const quantity = getItemQuantity(item.id);
                return (
                  <div
                    key={item.id}
                    className='bg-white p-3 md:p-4 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow'
                  >
                    <div className='relative h-32 md:h-40 w-full mb-3 md:mb-4 rounded-xl overflow-hidden bg-gray-100'>
                      <Image
                        src={item.image || '/assets/burger.png'}
                        alt={item.foodName}
                        fill
                        className='object-cover'
                      />
                    </div>
                    <div>
                      <h3 className='font-nunito text-neutral-950 font-bold text-sm md:text-md mb-1 line-clamp-1'>
                        {item.foodName}
                      </h3>
                      <p className='font-nunito text-neutral-950 font-extrabold text-md md:text-lg mb-3'>
                        Rp {item.price.toLocaleString('id-ID')}
                      </p>
                      
                      {quantity > 0 ? (
                        <div className='flex items-center justify-between bg-gray-50 rounded-full px-1 py-1 border border-gray-200'>
                          <button
                            onClick={() => handleDecrease(item)}
                            className='w-7 h-7 flex items-center justify-center bg-white rounded-full shadow-sm text-red-600 hover:bg-gray-100'
                          >
                            <Minus size={14} strokeWidth={3} />
                          </button>
                          <span className='font-bold text-gray-900 text-sm'>
                            {quantity}
                          </span>
                          <button
                            onClick={() =>
                              dispatch(
                                addToCart({
                                  id: String(item.id),
                                  menu_id: item.id,
                                  resto_id: restaurantId,
                                  name: item.foodName,
                                  price: item.price,
                                  quantity: 1,
                                  image: item.image || '/assets/burger.png',
                                  resto_name: restaurant?.name,
                                  resto_logo: restaurant?.logo,
                                })
                              )
                            }
                            className='w-7 h-7 flex items-center justify-center bg-red-600 rounded-full shadow-sm text-white hover:bg-red-700'
                          >
                            <Plus size={14} strokeWidth={3} />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => handleAdd(item)}
                          className='w-full bg-[#D32F2F] text-white py-2 rounded-full font-bold text-sm hover:bg-red-700 transition-colors shadow-sm'
                        >
                          Add
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* REVIEW SECTION */}
        <section className='mb-12'>
          <h2 className='font-nunito text-2xl font-bold text-gray-900 mb-6'>
            Review
          </h2>

          <div className='flex items-center gap-2 mb-6'>
            <div className='flex items-center gap-1'>
              <Star className='fill-orange-400 text-orange-400' size={20} />
              <span className='font-nunito font-extrabold text-xl text-neutral-950'>
                {restaurant.averageRating}
              </span>
            </div>
            <span className='font-nunito text-neutral-950 text-lg font-extrabold'>
              ({restaurant.totalReviews} Reviews)
            </span>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-6'>
            {restaurant.reviews && restaurant.reviews.length > 0 ? (
              restaurant.reviews.map((review) => (
                <div
                  key={review.id}
                  className='bg-white p-5 rounded-2xl border border-gray-100 shadow-sm'
                >
                  <div className='flex items-center gap-3 mb-3'>
                    <div className='w-10 h-10 rounded-full overflow-hidden border border-gray-200 relative'>
                      <Image
                        src={
                          review.user.avatar ||
                          `https://ui-avatars.com/api/?name=${review.user.name}&background=random`
                        }
                        alt={review.user.name}
                        fill
                        className='object-cover'
                      />
                    </div>
                    <div>
                      <h4 className='font-extrabold text-neutral-950 text-lg'>
                        {review.user.name}
                      </h4>
                      <p className='text-md text-neutral-950'>
                        {new Date(review.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className='flex gap-1 mb-2'>
                    {Array.from({ length: review.star }).map((_, i) => (
                      <Star
                        key={i}
                        size={12}
                        className='fill-orange-400 text-orange-400'
                      />
                    ))}
                  </div>
                  {review.comment && (
                    <p className='text-md text-neutral-950 leading-relaxed'>
                      "{review.comment}"
                    </p>
                  )}
                </div>
              ))
            ) : (
              <p className='text-gray-500'>No reviews yet.</p>
            )}
          </div>

          <div className='flex justify-center'>
            <button className='px-6 py-2 border border-gray-200 rounded-full font-bold text-neutral-950 text-md hover:bg-gray-50 transition-colors font-nunito'>
              Show More
            </button>
          </div>
        </section>
      </main>

      {/* FLOATING CART BAR (Checkout) */}
      {totalItems > 0 && (
        <div className='fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-100 px-4 py-4 md:px-6 md:py-3 shadow-[0_-4px_24px_rgba(0,0,0,0.06)] animate-in slide-in-from-bottom-full duration-300'>
          <div className='container mx-auto max-w-6xl flex items-center justify-between'>
            <div className='flex flex-row items-center gap-3 md:gap-6'>
              <ShoppingBag className='text-gray-900 hidden md:block' size={24} />
              <div className='flex flex-col md:flex-row md:items-center gap-0 md:gap-4'>
                <div className='flex items-center gap-2'>
                  <ShoppingBag className='text-gray-900 md:hidden' size={18} />
                  <span className='font-bold text-gray-900 text-sm md:text-md'>{totalItems} items</span>
                </div>
                <span className='hidden md:block text-gray-300'>|</span>
                <span className='font-extrabold text-gray-900 text-lg md:text-xl'>
                  Rp {totalPrice.toLocaleString('id-ID')}
                </span>
              </div>
            </div>

            <button
              onClick={() => alert('Proceed to Checkout?')}
              className='bg-[#D32F2F] hover:bg-red-700 text-white px-10 md:px-14 py-3 md:py-4 rounded-full font-extrabold shadow-lg transition-transform active:scale-95'
            >
              Checkout
            </button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
