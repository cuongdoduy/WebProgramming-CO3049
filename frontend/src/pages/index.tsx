import Footer from '@/components/Footer/Footer'
import NavbarWithMegaMenu from '@/components/Navbar/Navbar'
import constants from '@/constant/schema-data'
import Countdown from '@/page-sections/HomePage/Countdown'
import ProductSlider from '@/page-sections/HomePage/ProductSlider'
import { Typography } from '@material-tailwind/react'
import Head from 'next/head'
import React, { Fragment, useEffect, useState } from 'react'
import Slider from 'react-slick'

import ArrowRight from 'public/icons/arrow-right.svg'
import ArrowLeft from 'public/icons/arrow-left.svg'
import Image from 'next/image'
import PrimaryButton from '@/components/PrimaryButton'
import Link from 'next/link'
import ProductList from '@/page-sections/HomePage/ProductList'

const Home: React.FC = () => {
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

  console.log(forYouItems)

  const sliderRef = React.useRef<Slider>(null)

  const handleNext = () => {
    sliderRef.current?.slickNext()
  }

  const handlePrev = () => {
    sliderRef.current?.slickPrev()
  }

  return (
    <Fragment>
      <MetaTags />
      <main>
        <NavbarWithMegaMenu />
        <div className="min-h-screen my-12">
          <div className="my-12 mb-6 flex flex-col w-full overflow-hidden">
            <div className="flex items-center justify-start gap-x-4 mx-auto w-[80vw]">
              <div className="w-[20px] h-[50px] bg-[#DB4444] rounded-md"></div>
              <Typography
                as="h5"
                variant="h5"
                className="py-1.5 text-[20px] font-normal text-[#DB4444]">
                Today’s
              </Typography>
            </div>
            <div className="flex  mx-auto w-[80vw] items-center justify-between">
              <div className="flex items-center space-x-[40px]">
                <Typography as="h1" variant="h1">
                  Flash Sales
                </Typography>
                <Countdown />
              </div>
              <div className="flex justify-between min-w-[100px]">
                <button
                  onClick={handlePrev}
                  className="bg-[#F5F5F5] text-white p-2 rounded-full border-[1px] border-black">
                  <Image
                    src={ArrowLeft}
                    alt="arrow-left"
                    width={24}
                    height={24}
                  />
                </button>
                <button
                  onClick={handleNext}
                  className="bg-[#F5F5F5] text-white p-2 rounded-full border-[1px] border-black">
                  <Image
                    src={ArrowRight}
                    alt="arrow-right"
                    width={24}
                    height={24}
                  />
                </button>
              </div>
            </div>
            <div className="w-[100vw] translate-x-[10vw] mt-6">
              <ProductSlider data={forYouItems} sliderRef={sliderRef} />
            </div>
            <div className="mt-6 mx-auto w-[80vw] flex items-center justify-center">
              <Link href={'/products'}>
                <PrimaryButton
                  title="View All Product"
                  className="min-w-[250px] !py-4"
                />
              </Link>
            </div>
            <hr className="my-12 border-[1px] border-[gray] opacity-50 mx-auto w-[80vw]" />
            <div className="flex items-center justify-start gap-x-4 mx-auto w-[80vw]">
              <div className="w-[20px] h-[50px] bg-[#DB4444] rounded-md"></div>
              <Typography
                as="h5"
                variant="h5"
                className="py-1.5 text-[20px] font-normal text-[#DB4444]">
                This Month
              </Typography>
            </div>
            <div className="flex  mx-auto w-[80vw] items-center justify-between">
              <div className="flex items-center justify-between w-full">
                <Typography as="h1" variant="h1">
                  Best Selling Products
                </Typography>
                <div className="">
                  <Link href={'/products'}>
                    <PrimaryButton
                      title="View All"
                      className="min-w-[250px] !py-4"
                    />
                  </Link>
                </div>
              </div>
            </div>
            <div className="w-[80vw] mx-auto mt-6">
              <ProductList data={forYouItems.slice(0, 4)} />
            </div>
            <hr className="my-12 border-[1px] border-[gray] opacity-50 mx-auto w-[80vw]" />
            <div className="flex items-center justify-start gap-x-4 mx-auto w-[80vw]">
              <div className="w-[20px] h-[50px] bg-[#DB4444] rounded-md"></div>
              <Typography
                as="h5"
                variant="h5"
                className="py-1.5 text-[20px] font-normal text-[#DB4444]">
                Our Products
              </Typography>
            </div>
            <div className="flex  mx-auto w-[80vw] items-center justify-between">
              <div className="flex items-center justify-between w-full">
                <Typography as="h1" variant="h1">
                  Explore Our Products
                </Typography>
                <div className="">
                  <Link href={'/products'}>
                    <PrimaryButton
                      title="View All"
                      className="min-w-[250px] !py-4"
                    />
                  </Link>
                </div>
              </div>
            </div>
            <div className="w-[80vw] mx-auto mt-6">
              <ProductList data={forYouItems} />
            </div>
          </div>
        </div>
        <Footer />
      </main>
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
      <link rel="canonical" href="https://exclusive.com.vn" />
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
      <meta property="og:url" content="https://exclusive.com.vn" />
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

export default Home
