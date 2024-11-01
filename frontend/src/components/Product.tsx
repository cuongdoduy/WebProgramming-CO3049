import { EyeIcon, ShoppingCartIcon } from '@heroicons/react/24/outline'
import { StarIcon } from '@heroicons/react/24/solid'

import { Typography } from '@material-tailwind/react'
import Image from 'next/image'
import React from 'react'

const FullStar = () => <StarIcon className="w-4 h-4 text-[#FFC107]" />;
const HalfStar = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-4 h-4">
    <defs>
      <linearGradient id="half-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="50%" stop-color="#FFC107" />
        <stop offset="50%" stop-color="white" />
      </linearGradient>
    </defs>
    <path
      fill="url(#half-gradient)"
      fill-rule="evenodd"
      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
      clip-rule="evenodd"
    />
  </svg>
);
const EmptyStar = () => <StarIcon className="w-4 h-4 text-[#E0E0E0]" />;

const StarRating: React.FC<{
    rating: number
}> = ({ rating }) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
  
    return (
      <>
        {Array.from({ length: fullStars }).map((_, i) => (
          <FullStar key={`full-${i}`} />
        ))}
        {hasHalfStar && <HalfStar />}
        {Array.from({ length: emptyStars }).map((_, i) => (
          <EmptyStar key={`empty-${i}`} />
        ))}
      </>
    );
  };

const Product: React.FC<{
  id: number
  title: string
  price: number
  image: string
  discount: number
  rating: number
  reviews: number
}> = ({ title, price, image, discount, rating, reviews }) => {
  return (
    <div>
      <div className="bg-[#F5F5F5] rounded-[4px]">
        <div className="px-4 py-2 pt-8 flex items-center justify-between h-[50px]">
          {discount !== 0 && (
            <div className="bg-[#DB4444] text-white rounded-lg px-4 py-2 text-[14px]">
              {discount}%
            </div>
          )}
          <div className="flex-1">
            <div className="w-fit ml-auto bg-white rounded-full p-2 cursor-pointer">
              <EyeIcon className="text-black w-6 h-6" />
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center p-8 h-auto min-h-[240px] max-h-[240px]">
          <div className="mt-auto">
            <Image src={image} alt={title} width={178} height={129} />
          </div>
        </div>
        <div className="w-full min-h-[40px] bg-black flex items-center justify-center rounded-b-[4px] cursor-pointer">
          <div>
            <ShoppingCartIcon className="text-white w-6 h-6" />
          </div>
          <Typography
            as="p"
            variant="paragraph"
            className="text-white text-[16px] mx-2">
            Add To Cart
          </Typography>
        </div>
      </div>
      <div>
        <Typography
          as="p"
          variant="paragraph"
          className="py-1.5 text-[16px] text-[black]">
          {title}
        </Typography>
        <Typography
          as="p"
          variant="paragraph"
          className="text-[16px] text-[#DB4444] font-bold">
          ${price - (discount / 100) * price}
        </Typography>
        <div className="flex items-center gap-2">
          <StarRating rating={rating} />
            <Typography
                as="p"
                variant="paragraph"
                className="text-[16px] text-[#828282]">
                ({reviews})
            </Typography>
        </div>
      </div>
    </div>
  )
}

export default Product
