import { StarRating } from '@/components/Product'
import { Typography } from '@material-tailwind/react'
import Image from 'next/image'
import React from 'react'

import AddIcon from 'public/icons/addition.svg'
import MinusIcon from 'public/icons/subtraction.svg'
import PrimaryButton from '@/components/PrimaryButton'
import { HeartIcon } from '@heroicons/react/24/outline'

import IconDelivery from 'public/icons/icon-delivery.svg'
import IconReturn from 'public/icons/icon-return.svg'

interface ProductDescriptionProps {
  data: {
    name: string
    rate: number
    reviews: number
    status: 'In Stock' | 'Out of Stock'
    price: number
    discount: number
    description: string
    colors: Array<string>
    sizes: Array<'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL'>
    images: Array<string>
  }
}

const ProductDescription: React.FC<ProductDescriptionProps> = ({ data }) => {
  const { description, colors, sizes, name, rate, reviews, status } = data

  const beneficials = [
    {
      icon: IconDelivery,
      title: 'Free Delivery',
      description: 'Enter your postal code for Delivery Availability',
    },
    {
      icon: IconReturn,
      title: 'Return Delivery',
      description: 'Free 30 Days Delivery Returns. Details',
    },
  ]

  return (
    <div>
      <Typography as="h4" variant="h4" className="font-semibold text-[20px]">
        {name}
      </Typography>
      <div className="flex space-x-2 items-center">
        <div className="flex">
          <StarRating rating={rate} />
        </div>
        <Typography
          as="p"
          variant="paragraph"
          className="text-[16px] text-gray-600">
          ({reviews} reviews ) |
        </Typography>
        <Typography
          as="p"
          variant="paragraph"
          className="text-[16px] text-[#00FF66]">
          {status}
        </Typography>
      </div>
      <div className="my-4">
        <Typography
          as="p"
          variant="paragraph"
          className="text-[16px] text-justify">
          {description}
        </Typography>
      </div>
      <hr className="my-1 border-[1px] border-[black]" />
      <div className="mt-6 flex items-center">
        <Typography as="h6" variant="h6">
          Colours:
        </Typography>
        <div className="flex space-x-2 ml-2">
          {colors.map((color, index) => (
            <div
              key={index}
              className="p-[2px] border-[black] border-[3px] rounded-full flex items-center">
              <div
                className="w-3 h-3 rounded-full cursor-pointer"
                style={{ backgroundColor: color }}></div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-6 flex">
        <Typography as="h6" variant="h6" className="font-normal">
          Size:
        </Typography>
        <div className="flex space-x-4 ml-2 items-center">
          {sizes.map((size, index) => (
            <div
              key={index}
              className="px-2 py-1 text-sm rounded-[4px] border-[1px] border-[black] min-w-[28px] w-auto mx-auto">
              {size}
            </div>
          ))}
        </div>
      </div>
      <div className=" mt-6 h-[40px] flex justify-between">
        <div className="flex items-center h-full">
          <div className="border-[1px] border-[black] rounded-l-[4px] h-full flex items-center justify-center p-2 px-3 cursor-pointer">
            <Image src={MinusIcon} alt="minus" width={16} height={16} />
          </div>
          <div className="h-full border-y-[1px] border-[black] min-w-[60px] text-center flex items-center justify-center">
            1
          </div>
          <div className="border-[1px] border-[black] rounded-r-[4px] h-full flex items-center justify-center p-2 bg-[#DB4444] px-3 cursor-pointer">
            <Image src={AddIcon} alt="plus" width={16} height={16} />
          </div>
        </div>
        <PrimaryButton title="Buy Now" className="!min-w-[150px]" />
        <div className="border-[1px] border-[black] h-full p-2 rounded-[4px] cursor-pointer">
          <HeartIcon className="h-full w-6" />
        </div>
      </div>
      <div className="mt-6 rounded-[4px] border-[1px] border-[black]">
        {beneficials.map((beneficial, index) => (
          <div
            key={index}
            className="flex items-center p-4 border-b-[1px] border-[black]">
            <Image src={beneficial.icon} alt="icon" width={24} height={24} />
            <div className="ml-4">
              <Typography
                as="h6"
                variant="h6"
                className="font-semibold text-[16px]">
                {beneficial.title}
              </Typography>
              <Typography
                as="p"
                variant="paragraph"
                className="text-footnote underline">
                {beneficial.description}
              </Typography>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProductDescription
