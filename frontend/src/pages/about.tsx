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

export default About
