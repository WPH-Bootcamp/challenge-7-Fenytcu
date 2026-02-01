'use client';

import Link from 'next/link';
import Image from 'next/image';

const categories = [
  { name: 'All Restaurant', image: '/assets/ic-all.png', href: '/category' },
  {
    name: 'Nearby',
    image: '/assets/ic-nearby.png',
    href: '/category?sort=distance',
  },
  {
    name: 'Discount',
    image: '/assets/ic-discount.png',
    href: '/category?filter=discount',
  },
  {
    name: 'Best Seller',
    image: '/assets/ic-best-seller.png',
    href: '/category?filter=best-seller',
  },
  {
    name: 'Delivery',
    image: '/assets/ic-delivery.png',
    href: '/category?filter=delivery',
  },
  {
    name: 'Lunch',
    image: '/assets/ic-lunch.png',
    href: '/category?category=food',
  },
];

export default function CategoryList() {
  return (
    <section className='py-8'>
      <div className='container mx-auto px-4'>
        <div className='grid grid-cols-3 sm:grid-cols-6 gap-4'>
          {categories.map((cat) => (
            <Link
              key={cat.name}
              href={cat.href}
              className='flex flex-col items-center gap-3 group'
            >
              <div className='w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center group-hover:shadow-md group-hover:-translate-y-1 transition-all duration-300 relative overflow-hidden p-3'>
                <Image
                  src={cat.image}
                  alt={cat.name}
                  width={64}
                  height={64}
                  className='object-contain'
                />
              </div>
              <span className='text-sm font-semibold text-gray-700 group-hover:text-red-500 transition-colors text-center'>
                {cat.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
