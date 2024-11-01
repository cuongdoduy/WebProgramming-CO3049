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
    <div className="grid grid-cols-2 gap-x-4 py-4 items-center">
        <div className="flex items-center col-span-1 py-2">
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
          <h4 className="text-md">{title}</h4>
        </div>
        <p className="text-[16px] col-span-1 justify-self-end">
          ${quantity * price}
        </p>
    </div>
  )
}

export default Product
