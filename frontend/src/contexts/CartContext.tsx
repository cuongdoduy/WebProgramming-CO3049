import React, { createContext, useState, ReactNode } from 'react'

export interface CartItem {
  id: number
  title: string
  quantity: number
  price: number
  image: string
}

interface CartContextType {
  cartItems: CartItem[]
  // eslint-disable-next-line no-unused-vars
  addToCart: (item: CartItem) => void
  clearCart: () => void
  getCartTotal: () => number
  totalItems: () => number
  // eslint-disable-next-line no-unused-vars
  removeItem: (id: number) => void
  // eslint-disable-next-line no-unused-vars
  isItemExist: (id: number) => boolean
  // eslint-disable-next-line no-unused-vars
  updateItemInCart: (item: CartItem) => void
}

export const CartContext = createContext<CartContextType | undefined>(undefined)

interface CartProviderProps {
  children: ReactNode
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      title: 'LCD Monitor',
      price: 200,
      quantity: 1,
      image: `${process.env.NEXT_PUBLIC_REDIRECT_URI}/images/lcd-monitor.png`,
    },
    {
      id: 2,
      title: 'Gaming Mouse',
      price: 50,
      quantity: 1,
      image: `${process.env.NEXT_PUBLIC_REDIRECT_URI}/images/gaming-mouse.png`,
    },
  ])

  const updateCart = (item: CartItem) => {
    const newCart = cartItems.map(cartItem => {
      if (cartItem.id === item.id) {
        return {
          ...cartItem,
          quantity: item.quantity,
        }
      }
      return cartItem
    })

    setCartItems(newCart)
  }

  const removeCart = (id: number) => {
    const newCart = cartItems.filter(item => item.id !== id)
    setCartItems(newCart)
  }

  const addToCart = (item: CartItem) => {
    const existingItem = cartItems.find(cartItem => cartItem.id === item.id)

    if (existingItem) {
      updateCart({
        ...existingItem,
        quantity: existingItem.quantity + 1,
      })
    } else {
      setCartItems([...cartItems, item])
    }
  }

  const clearCart = () => {
    setCartItems([])
  }

  const getCartTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.quantity * item.price,
      0
    )
  }

  const totalItems = () => {
    return cartItems.length
  }

  const removeItem = (id: number) => {
    removeCart(id)
  }

  const isItemExist = (id: number) => {
    return cartItems.some(item => item.id === id)
  }

  const updateItemInCart = (item: CartItem) => {
    const newCart = cartItems.map(cartItem => {
      if (cartItem.id === item.id) {
        return {
          ...cartItem,
          quantity: item.quantity,
        }
      }
      return cartItem
    })

    setCartItems(newCart)
  }

  return (
    <CartContext.Provider
      value={{
        updateItemInCart,
        isItemExist,
        cartItems,
        addToCart,
        clearCart,
        totalItems,
        getCartTotal,
        removeItem,
      }}>
      {children}
    </CartContext.Provider>
  )
}
