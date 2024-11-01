import React from 'react'
import { AppProps } from 'next/app'
import { ThemeProvider } from '@material-tailwind/react'
import { SessionProvider } from 'next-auth/react'
import '../styles/globals.css'
import 'react-toastify/dist/ReactToastify.css'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { CartProvider } from '@/contexts/CartContext'
import { WishlistProvider } from '@/contexts/WishlistContext'

const MyApp: React.FC<AppProps> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <ThemeProvider>
        <CartProvider>
          <WishlistProvider>
            <Component {...pageProps} />
          </WishlistProvider>
        </CartProvider>
      </ThemeProvider>
    </SessionProvider>
  )
}

export default MyApp
