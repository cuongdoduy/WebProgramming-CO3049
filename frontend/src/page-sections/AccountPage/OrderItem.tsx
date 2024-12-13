import React, { useEffect } from 'react'
import OrderDetail from './OrderDetail'

const OrderStatus: React.FC<{
  status: string
}> = ({ status }) => {
  return status === 'Pending' ? (
    <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
      <dt className="text-base font-medium text-gray-500 dark:text-gray-400">
        Status:
      </dt>
      <dd className="me-2 mt-1.5 inline-flex items-center rounded bg-[#dbeafe] px-2.5 py-0.5 text-xs font-medium text-primary-800 dark:bg-primary-900 dark:text-primary-300">
        <svg
          className="me-1 h-3 w-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24">
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M18.5 4h-13m13 16h-13M8 20v-3.333a2 2 0 0 1 .4-1.2L10 12.6a1 1 0 0 0 0-1.2L8.4 8.533a2 2 0 0 1-.4-1.2V4h8v3.333a2 2 0 0 1-.4 1.2L13.957 11.4a1 1 0 0 0 0 1.2l1.643 2.867a2 2 0 0 1 .4 1.2V20H8Z"
          />
        </svg>
        {status}
      </dd>
    </dl>
  ) : (
    <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
      <dt className="text-base font-medium text-gray-500 dark:text-gray-400">
        Status:
      </dt>
      <dd className="me-2 mt-1.5 inline-flex items-center rounded bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-300">
        <svg
          className="me-1 h-3 w-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24">
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 11.917 9.724 16.5 19 7.5"
          />
        </svg>
        {status}
      </dd>
    </dl>
  )
}

const OrderItem: React.FC<{
  data: {
    id: number
    date: string
    price: number
    status: string
  }
}> = ({ data }) => {
  const { id, date, price, status } = data
  const [openDialog, setOpenDialog] = React.useState(false)
  const [orderDetail, setOrderDetail] = React.useState<
    Array<{
      id: number
      title: string
      price: number
      quantity: number
      image: string
      slug: string
    }>
  >([])

  useEffect(() => {
    const fetchOrderDetail = async () => {
      const response = await fetch(`/api/orders/${id}`)
      const data = await response.json()
      setOrderDetail(data)
    }
    fetchOrderDetail()
  }, [id])

  return (
    <div className="flex flex-wrap items-center gap-y-4 py-6">
      <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
        <dt className="text-base font-medium text-gray-500 dark:text-gray-400">
          Order ID:
        </dt>
        <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">
          <a href="#" className="hover:underline">
            #ORDER_{id}
          </a>
        </dd>
      </dl>

      <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
        <dt className="text-base font-medium text-gray-500 dark:text-gray-400">
          Date:
        </dt>
        <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">
          {date}
        </dd>
      </dl>

      <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
        <dt className="text-base font-medium text-gray-500 dark:text-gray-400">
          Price:
        </dt>
        <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">
          ${price}
        </dd>
      </dl>

      <OrderStatus status={status} />

      <div className="w-full grid sm:grid-cols-2 lg:flex lg:w-64 lg:items-center lg:justify-end gap-4">
        <button
          className="w-full inline-flex justify-center rounded-lg  border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700 lg:w-auto"
          onClick={() => setOpenDialog(true)}>
          View details
        </button>

        <OrderDetail
          open={openDialog}
          data={orderDetail}
          handleClose={() => setOpenDialog(false)}
        />
      </div>
    </div>
  )
}

export default OrderItem
