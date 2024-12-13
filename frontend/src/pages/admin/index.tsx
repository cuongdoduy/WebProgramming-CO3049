import Footer from '@/components/Footer/Footer'
import PrimaryButton from '@/components/PrimaryButton'
import NavbarWithMegaMenu from '@/page-sections/AdminPage/Navbar'
import { Typography } from '@material-tailwind/react'
import Link from 'next/link'
import React, { Fragment } from 'react'
import { ShoppingBagIcon, TagIcon, UserIcon } from '@heroicons/react/24/outline'

const AdminPage: React.FC = () => {
  const cards = [
    {
      imageSrc: <UserIcon className="w-20 h-20 mx-auto text-white" />,
      url: '/admin/users',
      buttonTitle: 'Manage users',
      description: 'Get to know who is using your website',
    },
    {
      imageSrc: <ShoppingBagIcon className="w-20 h-20 mx-auto text-white" />,
      url: '/admin/products',
      buttonTitle: 'Manage products',
      description: 'Manage your products and inventory',
    },
    {
      imageSrc: <ShoppingBagIcon className="w-20 h-20 mx-auto text-white" />,
      url: '/admin/orders',
      buttonTitle: 'Manage orders',
      description: 'Manage your products and inventory',
    },
    {
      imageSrc: <TagIcon className="w-20 h-20 mx-auto text-white" />,
      url: '/admin/tags',
      buttonTitle: 'Manage tags',
      description: 'Manage your products and tags',
    },
  ]
  return (
    <Fragment>
      <NavbarWithMegaMenu />
      <Link href="/">
        <Typography
          as="a"
          variant="h5"
          className="cursor-pointer py-1.5 lg:ml-[120px] uppercase font-bold">
          Back to home
        </Typography>
      </Link>
      <div className="m-auto xl:w-[70%] w-[66%]">
        <div className="m-auto w-fit my-[20px]">
          <Typography
            as="a"
            href="#"
            variant="h1"
            className="mr-4 cursor-pointer py-1.5 lg:ml-2 uppercase font-bold">
            Exclusive
          </Typography>
        </div>
        <div className="text-justify flex-cols items-center">
          <div className="cards grid grid-cols-2 justify-items-center gap-4 my-[40px]">
            {cards.map((card, index) => (
              <div
                key={index}
                className="w-[380px] transition-transform hover:transform hover:-translate-y-2 border-[1px] border-gray-400 rounded-md">
                <div className="bg-[#DB4444] py-8">{card.imageSrc}</div>
                <div className="description rounded-b-md border-[2px] border-t-0 border-[#F5F5F5] px-[10px] py-[10px]">
                  <Link href={card.url}>
                    <div className="my-4 mx-auto w-fit">
                      <PrimaryButton
                        title={card.buttonTitle}
                        className="!min-w-[250px] py-4"
                      />
                    </div>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </Fragment>
  )
}

export default AdminPage
