import { useSession } from 'next-auth/react'
import React, { createContext, useState, ReactNode, useEffect } from 'react'

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
  const { data: session } = useSession()
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  // const updateCart = (item: CartItem) => {
  //   const newCart = cartItems.map(cartItem => {
  //     if (cartItem.id === item.id) {
  //       return {
  //         ...cartItem,
  //         quantity: item.quantity,
  //       }
  //     }
  //     return cartItem
  //   })

  //   setCartItems(newCart)
  // }

  const removeCart = (id: number) => {
    const newCart = cartItems.filter(item => item.id !== id)
    setCartItems(newCart)
  }

  const addToCart = async (item: CartItem) => {
    const existingItem = cartItems.find(cartItem => cartItem.id === item.id)

    if (existingItem) {
      await updateItemInCart({
        ...existingItem,
        quantity: existingItem.quantity + item.quantity,
      })
    } else {
      const res = await fetch(`/api/cart/${session?.user?.cart_id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          product_id: item.id,
          quantity: item.quantity,
        }),
      })
      const data = await res.json()
      console.log(data)

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

  const removeItem = async (id: number) => {
    const res = await fetch(`/api/cart/${session?.user?.cart_id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        product_id: id,
      }),
    })
    const data = await res.json()
    console.log(data)
    removeCart(id)
  }

  const isItemExist = (id: number) => {
    return cartItems.some(item => item.id === id)
  }

  const updateItemInCart = async (item: CartItem) => {
    const response = await fetch(`/api/cart/${session?.user?.cart_id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        product_id: item.id,
        quantity: item.quantity,
      }),
    })
    const data = await response.json()
    console.log(data)

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

  useEffect(() => {
    const fetchcartItems = async () => {
      const response = await fetch(`
        /api/cart/${session?.user?.cart_id}`)
      const data = await response.json()
      const cartItems = data.map(
        (product: {
          id: number
          title: string
          price: number
          image: string
          discount: number
          reviews: number
          rating: number
          slug: string
          quantity: number
        }) => {
          return {
            id: product.id,
            title: product.title,
            price: product.price,
            quantity: product.quantity,
            image: product.image,
          }
        }
      )
      setCartItems(cartItems)
    }

    if (session) {
      fetchcartItems()
    }
  }, [session])

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
