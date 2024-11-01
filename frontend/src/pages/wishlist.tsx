import React, { Fragment, useContext, useEffect, useState } from 'react'

import { Breadcrumbs, Typography } from '@material-tailwind/react'
import NavbarWithMegaMenu from '@/components/Navbar/Navbar'
import Footer from '@/components/Footer/Footer'
import Link from 'next/link'
import SecondaryButton from '@/components/SecondaryButton'
import { WishlistContext } from '@/contexts/WishlistContext'
import WishlistList from '@/page-sections/WishlistPage/WishlistList'
import ForYouList from '@/page-sections/WishlistPage/ForYouList'

const Wishlist = () => {
  const { wishlistItems } = useContext(WishlistContext) || {
    wishlistItems: [],
  }
  const [forYouItems, setForYouItems] = useState<
    Array<{
      id: number
      title: string
      price: number
      image: string
      discount: number
      rating: number,
      reviews: number
    }>
  >([])

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/api/products/for-you')
      const data = await response.json()
      setForYouItems(data)
    }
    fetchData()
  }, [])

  return (
    <Fragment>
      <NavbarWithMegaMenu />
      <div className="w-[80%] mx-auto my-12">
        <Breadcrumbs className="bg-white p-0">
          <Link href="/" className="opacity-60">
            Home
          </Link>
          <Link href="/wishlist">Wishlist</Link>
        </Breadcrumbs>
        <div className="my-12 mb-6 flex justify-between w-full items-center">
          <Typography
            as="h5"
            variant="h5"
            className="py-1.5 text-[20px] font-normal">
            Wishlist ({wishlistItems.length})
          </Typography>
          <SecondaryButton title="Move All To Bag" />
        </div>
        <div className="mt-[60px]">
          <WishlistList data={wishlistItems} />
        </div>
        <div className="my-12 mb-6 flex justify-between w-full items-center">
          <div className="flex items-center justify-start gap-x-4">
            <div className="w-[20px] h-[50px] bg-[#DB4444] rounded-md"></div>
            <Typography
              as="h5"
              variant="h5"
              className="py-1.5 text-[20px] font-normal">
              Just For You
            </Typography>
          </div>
          <SecondaryButton title="See All" />
        </div>
        <div className="mt-[60px]">
          <ForYouList data={forYouItems} />
        </div>
      </div>
      <Footer />
    </Fragment>
  )
}

export default Wishlist
