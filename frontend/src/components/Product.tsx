import { WishlistContext } from '@/contexts/WishlistContext'
import {
  EyeIcon,
  HeartIcon,
  ShoppingCartIcon,
} from '@heroicons/react/24/outline'
import {
  StarIcon,
  HeartIcon as HeartIconSolid,
} from '@heroicons/react/24/solid'

import { Typography } from '@material-tailwind/react'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useContext } from 'react'

const FullStar = () => <StarIcon className="w-4 h-4 text-[#FFC107]" />
const HalfStar = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    className="w-4 h-4">
    <defs>
      <linearGradient id="half-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="50%" stopColor="#FFC107" />
        <stop offset="50%" stopColor="white" />
      </linearGradient>
    </defs>
    <path
      fill="url(#half-gradient)"
      fillRule="evenodd"
      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
      clipRule="evenodd"
    />
  </svg>
)
const EmptyStar = () => <StarIcon className="w-4 h-4 text-[#E0E0E0]" />

export const StarRating: React.FC<{
  rating: number
}> = ({ rating }) => {
  const fullStars = Math.floor(rating)
  const hasHalfStar = rating % 1 !== 0
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0)

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
  )
}

const Product: React.FC<{
  id: number
  title: string
  price: number
  image: string
  discount: number
  rating: number
  reviews: number
  slug: string
}> = ({ title, price, image, discount, rating, reviews, slug, id }) => {

  const { data: session } = useSession()

  // create a state to check if the product is hovered
  const [isHovered, setIsHovered] = React.useState(false)
  const { isItemExist, addToWishlist, removeItem } = useContext(WishlistContext) || {
    // eslint-disable-next-line no-unused-vars
    isItemExist: (id: number) => {},
    addToWishlist: () => {},
    // eslint-disable-next-line no-unused-vars
    removeItem: (id: number) => {},
  }

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

  // handle mouse enter and leave events
  const handleMouseEnter = () => setIsHovered(true)
  const handleMouseLeave = () => setIsHovered(false)

  return (
    <div>
      <Link href={`/products/${slug}`}>
        <div
          className="bg-[#F5F5F5] rounded-[4px] relative"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}>
          <div className="px-4 py-2 pt-8 flex items-center justify-between h-[50px]">
            {discount !== 0 && (
              <div className="bg-[#DB4444] text-white rounded-lg px-4 py-2 text-[14px]">
                {discount}%
              </div>
            )}
            {isHovered && (
              <div className="absolute top-0 right-[10%] top-[5%] flex-1 flex flex-col space-y-2 animate-fadeIn">
                {isItemExist(id) ? (
                  <div
                    className="w-fit ml-auto bg-white rounded-full p-2 cursor-pointer"
                    onClick={e => {
                      e.preventDefault()
                      e.stopPropagation()
                      handleRemoveFromWishlist()
                    }}>
                    <HeartIconSolid className="text-[#DB4444] w-6 h-6" />
                  </div>
                ) : (
                  <div
                    className="w-fit ml-auto bg-white rounded-full p-2 cursor-pointer"
                    onClick={e => {
                      e.preventDefault()
                      e.stopPropagation()
                      handleAddToWishlist()
                    }}>
                    <HeartIcon className="text-black w-6 h-6" />
                  </div>
                )}
                <div
                  className="w-fit ml-auto bg-white rounded-full p-2 cursor-pointer"
                  onClick={e => {
                    e.preventDefault()
                    e.stopPropagation()
                  }}>
                  <EyeIcon className="text-black w-6 h-6" />
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-col items-center p-8 h-auto min-h-[240px] max-h-[240px]">
            <div className="mt-auto">
              <Image src={image} alt={title} width={178} height={129} />
            </div>
          </div>

          <div
            className={`absolute bottom-0 left-0 right-0 min-h-[40px] bg-black flex items-center justify-center rounded-b-[4px] cursor-pointer transition-all duration-700 ease-out ${
              isHovered
                ? 'translate-y-0 opacity-100'
                : 'translate-y-[40px] opacity-0'
            }`}>
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
      </Link>
      <Link href={`/products/${slug}`}>
        <div className="z-5 relative">
          <Typography
            as="p"
            variant="paragraph"
            className="py-1.5 text-[16px] text-[black] hover:font-bold">
            {title}
          </Typography>
          <Typography
            as="p"
            variant="paragraph"
            className="text-[16px] text-[#DB4444] font-bold">
            <span className="text-[#DB4444] font-bold">
              ${price - (discount / 100) * price}{' '}
              {discount != 0 && <del className="text-[#828282]">${price}</del>}
            </span>
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
      </Link>
    </div>
  )
}

export default Product
