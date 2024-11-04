import React, { Fragment } from 'react'

import { Breadcrumbs, Typography } from '@material-tailwind/react'
import NavbarWithMegaMenu from '@/components/Navbar/Navbar'
import Footer from '@/components/Footer/Footer'
import Image from 'next/image'
import SideImage from 'public/images/side_image.png'

import IconShop from 'public/icons/icon_shop.svg'
import IconSale from 'public/icons/icon_sale.svg'
import IconActive from 'public/icons/icon_active.svg'
import IconMoney from 'public/icons/icon_money.svg'
import ItemList from '@/page-sections/AboutPage/Archivement/ItemList'

import Employee01 from 'public/images/employee01.png'
import Employee02 from 'public/images/employee02.png'
import Employee03 from 'public/images/employee03.png'
import EmployeeSlider from '@/page-sections/AboutPage/EmployeeIntroduction/EmployeeSlider'

import IconGuarantee from 'public/icons/icon_guarantee.svg'
import IconCustomerService from 'public/icons/icon_customerservice.svg'
import IconFastDelivery from 'public/icons/icon_delivery.svg'
import ServiceList from '@/page-sections/AboutPage/Archivement/ServiceList'
import Head from 'next/head'
import constants from '@/constant/schema-data'

const About = () => {
  const services = [
    {
      title: 'FREE AND FAST DELIVERY',
      description: 'Free delivery for all orders over $140',
      icon: IconFastDelivery,
    },
    {
      title: '24/7 CUSTOMER SERVICE',
      description: 'Friendly 24/7 customer support',
      icon: IconCustomerService,
    },
    {
      title: 'MONEY BACK GUARANTEE',
      description: 'We return money within 30 days',
      icon: IconGuarantee,
    },
  ]

  const Employees = [
    {
      name: 'John Doe',
      position: 'CEO',
      image: Employee01,
      socials: {
        facebook: '#',
        twitter: '#',
        linkedin: '#',
      },
    },
    {
      name: 'Jane Doe',
      position: 'CTO',
      image: Employee02,
      socials: {
        facebook: '#',
        twitter: '#',
        linkedin: '#',
      },
    },
    {
      name: 'James Doe',
      position: 'CFO',
      image: Employee03,
      socials: {
        facebook: '#',
        twitter: '#',
        linkedin: '#',
      },
    },
    {
      name: 'Jen Doe',
      position: 'COO',
      image: Employee01,
      socials: {
        facebook: '#',
        twitter: '#',
        linkedin: '#',
      },
    },
  ]

  const achievements = [
    {
      title: '10.5K',
      description: 'Sallers active our site',
      icon: IconShop,
    },
    {
      title: '33K',
      description: 'Monthly Produduct Sale',
      icon: IconSale,
    },
    {
      title: '45.5K',
      description: 'Customer active in our site',
      icon: IconActive,
    },
    {
      title: '25K',
      description: 'Anual gross sale in our site',
      icon: IconMoney,
    },
  ]

  return (
    <Fragment>
      <MetaTags />
      <NavbarWithMegaMenu />

      <div className="w-[80%] mx-auto my-12">
        <Breadcrumbs className="bg-white p-0">
          <a href="#" className="opacity-60">
            Home
          </a>
          <a href="#">About</a>
        </Breadcrumbs>
        <div className="grid grid-cols-12 gap-x-4 items-center">
          <div className="col-span-6 pr-12">
            <Typography
              as="h1"
              variant="h1"
              className="font-normal font-semibold">
              Our Story
            </Typography>
            <Typography
              as="p"
              variant="paragraph"
              className="mt-4 text-justify">
              Launced in 2015, Exclusive is South Asia’s premier online shopping
              makterplace with an active presense in Bangladesh. Supported by
              wide range of tailored marketing, data and service solutions,
              Exclusive has 10,500 sallers and 300 brands and serves 3 millioons
              customers across the region.
            </Typography>
            <Typography
              as="p"
              variant="paragraph"
              className="mt-4 text-justify">
              Exclusive has more than 1 Million products to offer, growing at a
              very fast. Exclusive offers a diverse assotment in categories
              ranging from consumer.
            </Typography>
          </div>
          <div className="col-span-6">
            <Image
              src={SideImage}
              alt="Side Image"
              width={0}
              height={0}
              sizes="100vw"
              className="w-full h-full rounded-md"
            />
          </div>
        </div>
        <div className="w-full my-12">
          <ItemList data={achievements} />
        </div>
        <div className="w-full my-12">
          <EmployeeSlider employees={Employees} />
        </div>
        <div className="w-[90%] mx-auto my-[60px]">
          <ServiceList data={services} />
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

export default About
