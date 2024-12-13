import { Typography } from '@material-tailwind/react'
import React from 'react'
import OrderItem from './OrderItem'

const OrderHistory: React.FC<{
  data: Array<{
    id: number
    date: string
    price: number
    status: string
  }>
}> = ({ data }) => {
  return (
    <div className="w-full shadow-lg rounded-md min-h-[40vh]">
      <div className="w-[80%] mx-auto py-6">
        <Typography
          as="h4"
          variant="p"
          className="font-semibold text-[#DB4444] text-[18px]">
          Order History
        </Typography>
        <div className="mt-[20px]">
          <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
            <div className="mx-auto max-w-5xl">
              <div className="mt-6 flow-root sm:mt-8">
                <div className="divide-y divide-gray-200 dark:divide-gray-700">
                  {data.map((item, index) => (
                    <div className="" key={index}>
                        <OrderItem data={item} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderHistory
