import Footer from '@/components/Footer/Footer'
import NavbarWithMegaMenu from '@/components/Navbar/Navbar'
import constants from '@/constant/schema-data'
import { EnvelopeIcon, PhoneIcon } from '@heroicons/react/24/outline'
import { Breadcrumbs, Button, Typography } from '@material-tailwind/react'
import Head from 'next/head'
import React, { Fragment } from 'react'

const Contact = () => {
  return (
    <Fragment>
      <MetaTags />
      <NavbarWithMegaMenu />
      <div className="w-[80%] mx-auto my-12">
        <Breadcrumbs className="bg-white">
          <a href="#" className="opacity-60">
            Home
          </a>
          <a href="#">Contact</a>
        </Breadcrumbs>
        <div className="grid grid-cols-12 lg:gap-x-12 mt-[60px] mb-[120px]">
          <div className="col-span-12 lg:col-span-4 flex flex-col shadow-lg py-8 px-4 rounded-lg">
            <div className="w-full">
              <div className="flex">
                <div className="bg-[#DB4444] rounded-full w-[36px] h-[36px]">
                  <PhoneIcon className="text-white text-center m-2" />
                </div>
                <Typography
                  as="h5"
                  variant="h5"
                  className="mr-4 cursor-pointer py-1.5 lg:ml-2 font-[400]">
                  Call To Us
                </Typography>
              </div>
              <Typography
                as="p"
                variant="paragraph"
                className="mr-4 cursor-pointer py-1.5 mt-4 text-[16px]">
                We are available 24/7, 7 days a week.
              </Typography>
              <Typography
                as="p"
                variant="paragraph"
                className="mr-4 cursor-pointer py-1.5 mt-1  text-[16px]">
                Phone: +8801611112222
              </Typography>
            </div>
            <hr className="my-4 bg-black" />
            <div className="">
              <div className="flex">
                <div className="bg-[#DB4444] rounded-full w-[36px] h-[36px]">
                  <EnvelopeIcon className="text-white text-center m-2" />
                </div>
                <Typography
                  as="h5"
                  variant="h5"
                  className="mr-4 cursor-pointer py-1.5 lg:ml-2 font-[400]">
                  Write To Us
                </Typography>
              </div>
              <Typography
                as="p"
                variant="paragraph"
                className="mr-4 cursor-pointer py-1.5 mt-4 text-[16px]">
                Fill out our form and we will contact you within 24 hours.
              </Typography>
              <Typography
                as="p"
                variant="paragraph"
                className="mr-4 cursor-pointer py-1.5 mt-1  text-[16px]">
                Emails: customer@exclusive.com
              </Typography>
              <Typography
                as="p"
                variant="paragraph"
                className="mr-4 cursor-pointer py-1.5 mt-1  text-[16px]">
                Emails: support@exclusive.com
              </Typography>
            </div>
          </div>
          <div className="col-span-12 lg:col-span-8 flex flex-col shadow-lg py-8 px-4 rounded-lg">
            <form className="grid grid-cols-12 p-1 gap-x-4 gap-y-4">
              <div className="relative bg-gray-50 py-2 mr-4 col-span-12 lg:col-span-4 border border-gray-300 rounded-md bg-gray-50">
                <input
                  type="search"
                  id="default-search"
                  className="block w-full text-sm bg-gray-50 pl-2 py-1 focus:outline-none"
                  placeholder="Your Name"
                  required
                />
              </div>
              <div className="relative bg-gray-50 py-2 mr-4 col-span-12 lg:col-span-4 border border-gray-300 rounded-md bg-gray-50">
                <input
                  type="search"
                  id="default-search"
                  className="block w-full text-sm bg-gray-50 pl-2 py-1 focus:outline-none"
                  placeholder="Your Email"
                  required
                />
              </div>
              <div className="relative bg-gray-50 py-2 mr-4 col-span-12 lg:col-span-4 border border-gray-300 rounded-md bg-gray-50">
                <input
                  type="search"
                  id="default-search"
                  className="block w-full text-sm bg-gray-50 pl-2 py-1 focus:outline-none"
                  placeholder="Your Phone"
                  required
                />
              </div>
              <div className="relative bg-gray-50 py-2 mr-4 col-span-12 border border-gray-300 rounded-md bg-gray-50">
                <textarea
                  id="default-search"
                  cols={80}
                  className="block w-full text-sm bg-gray-50 pl-2 py-1 focus:outline-none min-h-[200px]"
                  placeholder="Your Message"
                  required
                />
              </div>
            </form>
            {/* <div className=""> */}
              <Button className="bg-[#DB4444] rounded-md w-[240px] mt-8 py-4 w-fit ml-auto mr-4">
                Send Message
              </Button>
            {/* </div> */}
          </div>
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

export default Contact
