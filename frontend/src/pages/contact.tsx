import Footer from '@/components/Footer/Footer'
import NavbarWithMegaMenu from '@/components/Navbar/Navbar'
import { EnvelopeIcon, PhoneIcon } from '@heroicons/react/24/outline'
import { Breadcrumbs, Button, Typography } from '@material-tailwind/react'
import React, { Fragment } from 'react'

const Contact = () => {
  return (
    <Fragment>
      <NavbarWithMegaMenu />
      <div className="w-[80%] mx-auto my-12">
        <Breadcrumbs className="bg-white">
          <a href="#" className="opacity-60">
            Home
          </a>
          <a href="#">Contact</a>
        </Breadcrumbs>
        <div className="grid grid-cols-12 gap-x-12 mt-[60px] mb-[120px]">
          <div className="col-span-4 flex flex-col shadow-lg py-8 px-4 rounded-lg">
            <div className="">
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
          <div className="col-span-8 flex flex-col shadow-lg py-8 px-4 rounded-lg">
            <form className="grid grid-cols-12 p-1 gap-x-4 gap-y-4">
              <div className="relative bg-gray-50 py-2 mr-4 col-span-4 border border-gray-300 rounded-md bg-gray-50">
                <input
                  type="search"
                  id="default-search"
                  className="block w-full text-sm bg-gray-50 pl-2 py-1 focus:outline-none"
                  placeholder="Your Name"
                  required
                />
              </div>
              <div className="relative bg-gray-50 py-2 mr-4 col-span-4 border border-gray-300 rounded-md bg-gray-50">
                <input
                  type="search"
                  id="default-search"
                  className="block w-full text-sm bg-gray-50 pl-2 py-1 focus:outline-none"
                  placeholder="Your Email"
                  required
                />
              </div>
              <div className="relative bg-gray-50 py-2 mr-4 col-span-4 border border-gray-300 rounded-md bg-gray-50">
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

export default Contact
