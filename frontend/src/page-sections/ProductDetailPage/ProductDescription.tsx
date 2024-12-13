import { StarRating } from '@/components/Product'
import { Typography } from '@material-tailwind/react'
import Image from 'next/image'
import React, { useContext } from 'react'

import AddIcon from 'public/icons/addition.svg'
import MinusIcon from 'public/icons/subtraction.svg'
import PrimaryButton from '@/components/PrimaryButton'
import { HeartIcon } from '@heroicons/react/24/outline'
import { HeartIcon as SolidHeartIcon } from '@heroicons/react/24/solid'

import IconDelivery from 'public/icons/icon-delivery.svg'
import IconReturn from 'public/icons/icon-return.svg'
import { WishlistContext } from '@/contexts/WishlistContext'
import { useSession } from 'next-auth/react'
import { CartContext } from '@/contexts/CartContext'

interface ProductDescriptionProps {
  data: {
    id: number
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
  const { addToWishlist, isItemExist, removeItem } = useContext(
    WishlistContext
  ) || {
    addToWishlist: () => {},
    // eslint-disable-next-line no-unused-vars
    isItemExist: (id: number) => {},
    // eslint-disable-next-line no-unused-vars
    removeItem: (id: number) => {},
  }

  const { addToCart } = useContext(CartContext) || {
    // eslint-disable-next-line no-unused-vars
    addToCart: (item: {
      id: number
      title: string
      quantity: number
      price: number
      image: string
    }) => {},
  }

  const { data: session } = useSession()

  const [quantity, setQuantity] = React.useState(1)

  const { id, description, colors, sizes, name, rate, reviews, status } = data

  const handleAddToWishlist = async () => {
    const res = await fetch(`/api/products/${id}`)
    const data = await res.json()
    const product = data.data
    const wishlistItem = {
      id: product.id,
      title: product.name,
      price: product.price,
      image: product.cover,
      discount: product.discount,
    }
    addToWishlist(wishlistItem)

    if (session && session.user && session.user.id) {
      const res = await fetch(`/api/wishlist`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          product_id: id,
          customer_id: session.user.id,
        }),
      })
      const data = await res.json()
      console.log(data)
    }
  }

  const handleRemoveFromWishlist = async () => {
    removeItem(id)
    if (session && session.user && session.user.id) {
      const res = await fetch(`/api/wishlist`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          product_id: id,
          customer_id: session.user.id,
        }),
      })
      const data = await res.json()
      console.log(data)
    }
  }

  const handleAddToCart = async () => {
    const res = await fetch(`/api/products/${id}`)
    const data = await res.json()
    const product = data.data
    const item = {
      id: product.id,
      title: product.name,
      quantity: quantity,
      price: product.price,
      image: product.cover,
    }
    await addToCart(item)
  }

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
      <div className=" mt-6 h-[40px] flex justify-between items-center">
        <div className="flex items-center h-full">
          <div
            className={`border-[1px] border-[black] rounded-l-[4px] h-full flex items-center justify-center p-2 px-3 cursor-pointer ${
              quantity === 1 && 'opacity-40 cursor-auto'
            }`}
            onClick={() => {
              if (quantity > 1) {
                setQuantity(quantity - 1)
              }
            }}>
            <Image src={MinusIcon} alt="minus" width={16} height={16} />
          </div>
          <div className="h-full border-y-[1px] border-[black] min-w-[60px] text-center flex items-center justify-center">
            {quantity}
          </div>
          <div
            className="border-[1px] border-[black] rounded-r-[4px] h-full flex items-center justify-center p-2 bg-[#DB4444] px-3 cursor-pointer"
            onClick={() => {
              setQuantity(quantity + 1)
            }}>
            <Image src={AddIcon} alt="plus" width={16} height={16} />
          </div>
        </div>
        <div onClick={handleAddToCart}>
          <PrimaryButton title="Add To Cart" className="min-w-[150px] lg:min-w-[200px] py-4" />
        </div>

        {isItemExist(id) ? (
          <div
            className="border-[1px] border-[black] h-full p-2 rounded-[4px] cursor-pointer hidden md:block"
            onClick={handleRemoveFromWishlist}>
            <SolidHeartIcon className="h-full w-6 text-[#DB4444]" />
          </div>
        ) : (
          <div
            className="border-[1px] border-[black] h-full p-2 rounded-[4px] cursor-pointer hidden hidden md:block"
            onClick={handleAddToWishlist}>
            <HeartIcon className="h-full w-6" />
          </div>
        )}
      </div>
      <div className="md:hidden my-4 max-w-[40px]">
        {isItemExist(id) ? (
          <div
            className="border-[1px] border-[black] p-2 rounded-[4px] cursor-pointer"
            onClick={handleRemoveFromWishlist}>
            <SolidHeartIcon className="h-full w-6 text-[#DB4444]" />
          </div>
        ) : (
          <div
            className="border-[1px] border-[black] p-2 rounded-[4px] cursor-pointer"
            onClick={handleAddToWishlist}>
            <HeartIcon className="h-full w-6" />
          </div>
        )}
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
