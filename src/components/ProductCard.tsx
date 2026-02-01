'use client';

import Image from 'next/image';
import { Star, Plus } from 'lucide-react';
import { Menu } from '@/types/menu';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/features/cart/cartSlice';

interface ProductCardProps {
  item: Menu;
}

export default function ProductCard({ item }: ProductCardProps) {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id: String(item.id),
        name: item.foodName,
        price: item.price,
        quantity: 1,
        image: item.image,
      })
    );
  };

  return (
    <Card className='border-none shadow-sm hover:shadow-md transition-shadow rounded-2xl overflow-hidden bg-white'>
      <div className='relative aspect-square w-full bg-gray-100'>
        <Image
          src={
            item.image && item.image.startsWith('http')
              ? item.image
              : '/assets/burger.png'
          }
          alt={item.foodName}
          fill
          className='object-cover'
        />
      </div>

      <CardContent className='p-4'>
        <div className='flex justify-between items-start mb-1'>
          <h3 className='font-bold text-gray-900 line-clamp-1 flex-1 pr-2'>
            {item.foodName}
          </h3>
          <span className='font-bold text-red-600'>
            Rp {item.price.toLocaleString('id-ID')}
          </span>
        </div>
        <p className='text-gray-500 text-sm line-clamp-2 min-h-[40px]'>
          {item.type}
        </p>
      </CardContent>

      <CardFooter className='p-4 pt-0'>
        <Button
          onClick={handleAddToCart}
          className='w-full rounded-full bg-gray-900 hover:bg-gray-800 text-white gap-2'
        >
          <Plus className='w-4 h-4' /> Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
