import React, { createContext, useState, ReactNode } from 'react'

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
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([
    {
      id: 1,
      title: 'Gucci duffle bag',
      price: 1160,
      image: 'http://localhost:3000/images/gucci.png',
      discount: 35,
    },
    {
      id: 2,
      title: 'RGB liquid CPU Cooler',
      price: 1960,
      image: 'http://localhost:3000/images/rgb.png',
      discount: 0,
    },
    {
      id: 3,
      title: 'GP11 Shooter USB Gamepad',
      price: 550,
      image: 'http://localhost:3000/images/gamepad.png',
      discount: 0,
    },
    {
        id: 4,
        title: 'Quilted Satin Jacket',
        price: 750,
        image: 'http://localhost:3000/images/jacket.png',
        discount: 0,
    }
  ])

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
