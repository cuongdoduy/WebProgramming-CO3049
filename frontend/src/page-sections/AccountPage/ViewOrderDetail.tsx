import React, { useEffect } from 'react'
import OrderDetail from './OrderDetail'

const ViewOrderDetail: React.FC<{
  id: number
}> = ({ id }) => {
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
    <div>
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
  )
}

export default ViewOrderDetail
