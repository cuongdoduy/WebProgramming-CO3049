import Footer from '@/components/Footer/Footer'
import NavbarWithMegaMenu from '@/page-sections/AdminPage/Navbar'
import React, { Fragment, useEffect, useState } from 'react'
import { OrderTable } from '@/page-sections/AdminPage/OrderTable'

const OrdersPage: React.FC = () => {
  const [orders, setOrders] = useState<
    Array<{
      id: number
      price: number
      status: string
      quantity: number
      createdAt: string
    }>
  >([])

  const [pagination, setPagination] = useState<{
    totalItems: number
    totalPages: number
    currentPage: number
  }>({
    totalItems: 0,
    totalPages: 0,
    currentPage: 1,
  })

  const [filter, setFilter] = useState<{
    query: string
    status: string
  }>({
    query: '',
    status: '',
  })

  useEffect(() => {
    const fetchData = async () => {
      let endpoint = `/api/orders?page=${pagination.currentPage}&limit=10`
      if (filter.status) {
        endpoint = endpoint + `&status=${filter.status}`
      }
      const res = await fetch(endpoint, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const data = await res.json()
      setOrders(
        data.data.map(
          (order: {
            id: number
            total_price: number
            quantity: number
            status: string
            created_at: string
          }) => {
            return {
              id: order.id,
              price: order.total_price,
              quantity: order.quantity,
              status: order.status,
              createdAt: new Date(order.created_at).toLocaleDateString('en-GB'),
            }
          }
        )
      )
      const new_pagination: {
        current_page: number
        total_pages: number
        total_items: number
      } = data.pagination

      setPagination({
        totalItems: new_pagination.total_items,
        totalPages: new_pagination.total_pages,
        currentPage: new_pagination.current_page,
      })
    }
    fetchData()
  }, [pagination.currentPage, filter])

  const handlePageChange = (pageNum: number) => {
    setPagination({
      ...pagination,
      currentPage: pageNum,
    })
  }

  const handleFilterChange = ({
    name,
    value,
  }: {
    name: string
    value: string
  }) => {
    setFilter({
      ...filter,
      [name]: value,
    })
    setPagination({
      totalItems: 0,
      currentPage: 1,
      totalPages: 1,
    })
  }

  const handleChangeOrderStatus = async (id: number, status: string) => {
    const res = await fetch(`/api/orders/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status: status }),
    })
    const data = await res.json()
    if (res.status === 200) {
      const newOrders = orders.map((order) => {
        if (order.id === id) {
          return {
            ...order,
            status: status,
          }
        }
        return order
      })
      setOrders(newOrders)
    } else {
      alert(data)
    }
  }

  return (
    <Fragment>
      <NavbarWithMegaMenu />
      <div>
        <OrderTable
          filter={filter}
          orders={orders}
          pagination={pagination}
          handleFilterChange={handleFilterChange}
          handlePageChange={handlePageChange}
          handleChangeOrderStatus={handleChangeOrderStatus}
        />
      </div>
      <Footer />
    </Fragment>
  )
}

export default OrdersPage
