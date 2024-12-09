import Footer from '@/components/Footer/Footer'
import NavbarWithMegaMenu from '@/components/Navbar/Navbar'
import PrimaryButton from '@/components/PrimaryButton'
import { CheckIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import React, { Fragment } from 'react'

const OrderSuccess = () => {
  return (
    <Fragment>
      <NavbarWithMegaMenu />
      <div className="px-5 my-4 min-h-[80vh] flex flex-col items-center justify-center">
        <div className="w-fit ml-auto bg-[#DEF7EC] rounded-full p-4 cursor-pointer mx-auto my-8">
          <CheckIcon className="text-primary w-20 h-20" />
        </div>
        <p className="text-lg text-center my-2 text-gray-700">
          Thank you for giving us the opportunity to serve you.
        </p>
        <p className="text-lg text-center my-2 mb-8 text-gray-700">
          Your order is being processed. Our staff will contact you soon.
        </p>
        <Link href="/">
          <PrimaryButton
            title="Continue shopping"
            className="!py-4 min-w-[250px]"
          />
        </Link>
      </div>

      <Footer />
    </Fragment>
  )
}

export default OrderSuccess
