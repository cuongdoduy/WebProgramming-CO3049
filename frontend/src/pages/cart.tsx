import React, { Fragment, useContext } from 'react'

import { Breadcrumbs, Typography } from '@material-tailwind/react'
import NavbarWithMegaMenu from '@/components/Navbar/Navbar'
import Footer from '@/components/Footer/Footer'
import Link from 'next/link'
import ProductList from '@/page-sections/CartPage/ProductList'
import { CartContext } from '@/contexts/CartContext'
import { ProductProps } from '@/page-sections/CartPage/Product'
import SecondaryButton from '@/components/SecondaryButton'
import PrimaryButton from '@/components/PrimaryButton'

const Cart = () => {
  const { cartItems } =
    useContext(CartContext) ||
    ({
      cartItems: [],
    } as { cartItems: ProductProps[] })
  return (
    <Fragment>
      <NavbarWithMegaMenu />

      <div className="w-[80%] mx-auto my-12">
        <Breadcrumbs className="bg-white p-0">
          <Link href="/" className="opacity-60">
            Home
          </Link>
          <Link href="/cart">Cart</Link>
        </Breadcrumbs>
        <div className="mt-[60px]">
          <ProductList list={cartItems} />
        </div>
        <div className="my-12 mb-6 flex justify-between w-full items-center">
          <SecondaryButton title="Return To Shop" />
          <SecondaryButton title="Update Cart" />
        </div>
        <div className="my-12 grid grid-cols-2 items-start">
          <div className="flex justify-start items-center space-x-4 col-span-1">
            <div className="relative bg-transparent mr-4 border border-black rounded-md">
              <input
                type="search"
                id="default-search"
                className="block w-full text-sm bg-transparent h-full focus:outline-none pl-4 py-4 min-w-[240px]"
                placeholder="Coupon Code"
                required
              />
            </div>
            <PrimaryButton title="Apply Coupon" />
          </div>
          <div className="col-span-1 min-w-[450px] max-w-[550px] border border-black p-4 ml-auto rounded-md">
            <div>
              <Typography as="h5" variant="h5" className="py-1.5 font-[600]">
                Cart Total
              </Typography>
              <div className="flex justify-between">
                <Typography
                  as="p"
                  variant="paragraph"
                  className="py-1.5 font-[400] text-[18px]">
                  Subtotal
                </Typography>
                <Typography
                  as="p"
                  variant="paragraph"
                  className="py-1.5 font-[400] text-[18px]">
                  ${cartItems.reduce((acc, item) => acc + item.price, 0)}
                </Typography>
              </div>
              <hr className="my-2 border border-gray-400" />
              <div className="flex justify-between">
                <Typography
                  as="p"
                  variant="paragraph"
                  className="py-1.5 font-[400] text-[18px]">
                  Shipping:
                </Typography>
                <Typography
                  as="p"
                  variant="paragraph"
                  className="py-1.5 font-[400] text-[18px]">
                  Free
                </Typography>
              </div>
              <hr className="my-2 border border-gray-400" />
              <div className="flex justify-between">
                <Typography
                  as="p"
                  variant="paragraph"
                  className="py-1.5 font-[400] text-[18px]">
                  Total:
                </Typography>
                <Typography
                  as="p"
                  variant="paragraph"
                  className="py-1.5 font-[400] text-[18px]">
                  ${cartItems.reduce((acc, item) => acc + item.price, 0)}
                </Typography>
              </div>
              <div className='w-fit mx-auto my-2'>
                <PrimaryButton title="Proceed To Checkout" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </Fragment>
  )
}

export default Cart
