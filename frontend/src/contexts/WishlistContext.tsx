import { useSession } from 'next-auth/react'
import React, { createContext, useState, ReactNode, useEffect } from 'react'

export interface WishlistItem {
  id: number
  title: string
  price: number
  image: string
  discount: number
}

interface WishlistContextType {
  wishlistItems: WishlistItem[]
  // eslint-disable-next-line no-unused-vars
  addToWishlist: (item: WishlistItem) => void
  clearWishlist: () => void
  totalItems: () => number
  // eslint-disable-next-line no-unused-vars
  removeItem: (id: number) => void
  // eslint-disable-next-line no-unused-vars
  isItemExist: (id: number) => boolean
}

export const WishlistContext = createContext<WishlistContextType | undefined>(
  undefined
)

interface WishlistProviderProps {
  children: ReactNode
}

export const WishlistProvider: React.FC<WishlistProviderProps> = ({
  children,
}) => {
  const { data: session } = useSession()
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([])

  useEffect(() => {
    const fetchWishlist = async () => {
      const response = await fetch(`
        /api/wishlist/${session?.user?.id}`)
      const data = await response.json()
      const wishlistItems = data.map((product:{
        id: number
        title: string
        price: number
        image: string
        discount: number
        reviews: number
        rating: number
        slug: string
      }) => {
        return {
          id: product.id,
          title: product.title,
          price: product.price,
          discount: product.discount,
          image: product.image
        }
      })
      setWishlistItems(wishlistItems)
      // const res = [
      //   {
      //     id: 1,
      //     title: 'Gucci duffle bag',
      //     price: 1160,
      //     image: `${process.env.NEXT_PUBLIC_REDIRECT_URI}/images/gucci.png`,
      //     discount: 35,
      //   },
      //   {
      //     id: 2,
      //     title: 'RGB liquid CPU Cooler',
      //     price: 1960,
      //     image: `${process.env.NEXT_PUBLIC_REDIRECT_URI}/images/rgb.png`,
      //     discount: 0,
      //   },
      //   {
      //     id: 3,
      //     title: 'GP11 Shooter USB Gamepad',
      //     price: 550,
      //     image: `${process.env.NEXT_PUBLIC_REDIRECT_URI}/images/gamepad.png`,
      //     discount: 0,
      //   },
      //   {
      //     id: 4,
      //     title: 'Quilted Satin Jacket',
      //     price: 750,
      //     image: `${process.env.NEXT_PUBLIC_REDIRECT_URI}/images/jacket.png`,
      //     discount: 0,
      //   },
      // ]
      // setWishlistItems(res)
    }

    if (session) {
      fetchWishlist()
    }
  }, [session])

  const removeWishlist = (id: number) => {
    const newCart = wishlistItems.filter(item => item.id !== id)
    setWishlistItems(newCart)
  }

  const addToWishlist = (item: WishlistItem) => {
    const existingItem = wishlistItems.find(
      wishlistItem => wishlistItem.id === item.id
    )

    if (!existingItem) {
      setWishlistItems([...wishlistItems, item])
    }
  }

  const clearWishlist = () => {
    setWishlistItems([])
  }

  const totalItems = () => {
    return wishlistItems.length
  }

  const removeItem = (id: number) => {
    removeWishlist(id)
  }

  const isItemExist = (id: number) => {
    return wishlistItems.some(item => item.id === id)
  }

  return (
    <WishlistContext.Provider
      value={{
        isItemExist,
        wishlistItems,
        addToWishlist,
        clearWishlist,
        totalItems,
        removeItem,
      }}>
      {children}
    </WishlistContext.Provider>
  )
}
