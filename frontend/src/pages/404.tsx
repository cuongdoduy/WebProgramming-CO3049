import Footer from '@/components/Footer/Footer'
import NavbarWithMegaMenu from '@/components/Navbar/Navbar'
import { Breadcrumbs, Button } from '@material-tailwind/react'
import React, { Fragment } from 'react'

const NotFound = () => {
  return (
    <Fragment>
      <NavbarWithMegaMenu />
      <div className="w-[80%] mx-auto my-12">
        <Breadcrumbs className="bg-white">
          <a href="#" className="opacity-60">
            Home
          </a>
          <a href="#">404 Error</a>
        </Breadcrumbs>
        <div className="flex flex-col items-center justify-center my-[120px]">
          <h1 className="text-6xl font-bold text-center text-black">
            404 Not Found
          </h1>
          <p className="text-body mt-8">
            Your visited page not found. You may go home page.
          </p>
          <Button className="bg-[#DB4444] rounded-md w-[240px] mt-8 py-4">
            Back to home page
          </Button>
        </div>
      </div>
      <Footer />
    </Fragment>
  )
}

export default NotFound
