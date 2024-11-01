import Image from 'next/image'
import React from 'react'

export interface ProductProps {
  title: string
  price: number
  image: string
  quantity: number
}

const Product: React.FC<ProductProps> = ({ title, price, image, quantity }) => {
  return (
    <div className="grid grid-cols-4 gap-x-4 shadow-lg py-4 rounded-md items-center px-12">
        <div className="flex items-center col-span-1 py-4">
          <div className='w-[48px] mr-4'>
            <Image
              src={image}
              alt={title}
              className="w-full h-full"
              width={0}
              height={0}
              sizes="100vw"
            />
          </div>
          <h4 className="text-lg font-semibold">{title}</h4>
        </div>

        <p className="text-sm text-gray-500 col-span-1">{price}</p>
        <p className="text-sm text-gray-500 col-span-1">{quantity}</p>
        <p className="text-sm text-gray-500 col-span-1">
          {quantity * price}
        </p>
    </div>
  )
}

export default Product
