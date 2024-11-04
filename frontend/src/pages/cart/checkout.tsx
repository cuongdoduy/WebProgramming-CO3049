import React, { Fragment, useContext } from 'react'

import { Breadcrumbs, Typography } from '@material-tailwind/react'
import NavbarWithMegaMenu from '@/components/Navbar/Navbar'
import Footer from '@/components/Footer/Footer'
import Link from 'next/link'
import { CartContext } from '@/contexts/CartContext'
import { ProductProps } from '@/page-sections/CartPage/Product'
import PrimaryButton from '@/components/PrimaryButton'
import ItemList from '@/page-sections/CheckoutPage/ItemList'
import ContactInformation from '@/page-sections/CheckoutPage/ContactInformation'

const Checkout = () => {
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
          <Link href="/cart" className="opacity-60">
            Cart
          </Link>
          <Link href="/cart/checkout">Checkout</Link>
        </Breadcrumbs>
        <div className="grid grid-cols-12 gap-6 mt-[40px]">
          <div className="col-span-6">
            <ContactInformation />
          </div>
          <div className="col-span-6  max-w-[550px] mr-auto">
            <div>
              <ItemList list={cartItems} />
            </div>
            <div className="mb-[12px] grid grid-cols-2 items-start">
              <div className="col-span-2 mt-[12px]">
                <div>
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
                </div>
              </div>
              <div className="flex justify-start items-center space-x-4 col-span-2">
                <div className="relative bg-transparent mr-4 border border-black rounded-md">
                  <input
                    type="search"
                    id="default-search"
                    className="block w-full text-sm bg-transparent h-full focus:outline-none pl-4 py-4 min-w-[240px]"
                    placeholder="Coupon Code"
                    required
                  />
                </div>
                <div className="my-4">
                  <PrimaryButton title="Apply Coupon" />
                </div>
              </div>
              <div className="my-4">
                <Link href="/cart/checkout">
                  <PrimaryButton title="Place Order" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </Fragment>
  )
}

export default Checkout
