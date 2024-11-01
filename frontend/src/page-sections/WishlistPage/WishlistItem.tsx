import { ShoppingCartIcon, TrashIcon } from '@heroicons/react/24/outline'
import { Typography } from '@material-tailwind/react'
import Image from 'next/image'
import React from 'react'

const WishlistItem: React.FC<{
  id: number
  title: string
  price: number
  image: string
  discount: number
}> = ({ title, price, image, discount }) => {
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
                <TrashIcon className="text-black w-6 h-6" />
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center p-8 h-auto h-[240px]">
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
      </div>
    </div>
  )
}

export default WishlistItem
