import { XMarkIcon } from '@heroicons/react/24/outline'
import { Typography } from '@material-tailwind/react'
import Image from 'next/image'
import React from 'react'

const OrderDetail: React.FC<{
  data: Array<{
    id: number
    title: string
    price: number
    quantity: number
    image: string
    slug: string
  }>
  handleClose: () => void
  open: boolean
}> = ({ data, handleClose, open }) => {
  return (
    <>
      <div
        className={`fixed top-0 bottom-0 left-0 right-0 z-[99] bg-[#000] ${
          open ? 'opacity-80 visible' : 'opacity-0 invisible'
        }`}
        aria-hidden="true"
        onClick={handleClose}
        style={{
          transition: 'opacity 1s ease-in-out',
        }}></div>
      <div
        className={`flex flex-col fixed top-0 bottom-0 right-0 w-fith sm:w-[450px] z-[100] bg-blue-10 w-fit
            ${
              open
                ? 'transform transition-all delay-100 duration-[1s] opacity-1 translate-x-0'
                : 'transform transition-all ease-in-out translate-x-[100%] delay-100 duration-[1.5s]'
            }
        `}>
        <div className="relative w-full max-w-3xl h-full">
          {/*content*/}
          <div className="relative flex flex-col w-full bg-white border-0 shadow-lg outline-none focus:outline-none h-full">
            {/*header*/}
            <div className="flex items-start justify-between p-5 border-b border-solid rounded-t border-blue-gray-200">
              <h3 className="text-3xl font-semibold">Order Detail</h3>
              <button
                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={handleClose}>
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>
            {/*body*/}
            <div className="relative flex-auto p-6">
              <div className="grid grid-cols-1 gap-4">
                <div className="flex justify-between w-full">
                  <div className="grid grid-cols-1 gap-y-8 w-full">
                    {data.map(product => (
                      <div className="flex justify-between " key={product.id}>
                        <div className="flex">
                          <div className="w-[48px] mr-4">
                            <Image
                              src={product.image}
                              alt={product.title}
                              className="w-full h-full"
                              width={0}
                              height={0}
                              sizes="100vw"
                            />
                          </div>
                          <div className="ml-4">
                            <h6 className="font-semibold">{product.title}</h6>
                            <p>Quantity: {product.quantity}</p>
                          </div>
                        </div>
                        <p className="font-bold">${product.price}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            {/*footer total price*/}
            <div className="flex w-full p-6 border-t border-solid rounded-b border-blue-gray-200">
              <div className='w-full'>
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
                    $
                    {data.reduce(
                      (acc, item) => acc + item.price * item.quantity,
                      0
                    )}
                  </Typography>
                </div>
                {/* <hr className="my-2 border border-gray-400" /> */}
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
                    $
                    {data.reduce(
                      (acc, item) => acc + item.price * item.quantity,
                      0
                    )}
                  </Typography>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
    // Modal From Right
  )
}

export default OrderDetail
