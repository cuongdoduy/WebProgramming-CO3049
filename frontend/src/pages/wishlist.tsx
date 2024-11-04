import React, { Fragment, useContext, useEffect, useState } from 'react'

import { Breadcrumbs, Typography } from '@material-tailwind/react'
import NavbarWithMegaMenu from '@/components/Navbar/Navbar'
import Footer from '@/components/Footer/Footer'
import Link from 'next/link'
import SecondaryButton from '@/components/SecondaryButton'
import { WishlistContext } from '@/contexts/WishlistContext'
import WishlistList from '@/page-sections/WishlistPage/WishlistList'
import ForYouList from '@/page-sections/WishlistPage/ForYouList'
import Head from 'next/head'
import constants from '@/constant/schema-data'

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
      rating: number
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
      <MetaTags />
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

const MetaTags = () => {
  return (
    <Head>
      <title>Exclusive - The best place to buy your favorite products</title>
      <meta
        name="description"
        content="Exclusive - The best place to buy your favorite products"
      />
      <meta
        name="description"
        content="
          The best place to buy your favorite products. We offer a wide range of products from electronics to fashion."
      />
      <meta
        name="keywords"
        content="electronics, fashion, gadgets, clothing, accessories"
      />
      <link rel="canonical" href="https://web-programming-co-3049.vercel.app" />
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta charSet="utf-8" />
      <meta
        property="og:title"
        content="Exclusive - The best place to buy your favorite products"
      />
      <meta
        property="og:description"
        content="The best place to buy your favorite products. We offer a wide range of products from electronics to fashion."
      />
      <meta property="og:sitename" content="Exclusive" />
      <meta property="og:url" content="https://web-programming-co-3049.vercel.app" />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="en_US" />
      <meta property="og:updated_time" content="2024-10-22T02:08:26+00:00" />
      <meta
        property="og:image"
        content={`${process.env.NEXT_PUBLIC_REDIRECT_URI}/social_image_homepage.webp`}
      />
      <meta
        property="og:image:secure_url"
        content={`${process.env.NEXT_PUBLIC_REDIRECT_URI}/social_image_homepage.webp`}
      />
      <meta property="og:image:width" content="900" />
      <meta property="og:image:height" content="900" />
      <meta property="og:image:alt" content="Exclusive" />
      <meta property="og:image:type" content="image/jpeg" />
      <meta
        property="article:published_time"
        content="2024-05-01T08:07:31+00:00"
      />
      <meta
        property="article:modified_time"
        content="2024-05-22T02:08:26+00:00"
      />
      <meta name="twitter:card" content="summary_large_image" />
      <meta
        name="twitter:title"
        content="Exclusive - The best place to buy your favorite products"
      />
      <meta
        name="twitter:description"
        content="The best place to buy your favorite products. We offer a wide range of products from electronics to fashion."
      />
      <meta
        name="twitter:image"
        content={`${process.env.NEXT_PUBLIC_REDIRECT_URI}/social_image_homepage.webp`}
      />
      <meta name="twitter:label1" content="Written by" />
      <meta name="twitter:data1" content="Academic Team" />
      <meta name="twitter:label2" content="Time to read" />
      <meta name="twitter:data2" content="2 minutes" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(constants),
        }}
      />
    </Head>
  )
}

export default Wishlist
