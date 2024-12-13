import Footer from '@/components/Footer/Footer'
import NavbarWithMegaMenu from '@/page-sections/AdminPage/Navbar'
import { CustomersTable } from '@/page-sections/AdminPage/CustomerTable'
import React, { Fragment, useEffect, useState } from 'react'

const UsersPage: React.FC = () => {
  const [customers, setCustomers] = useState<
    Array<{
      id: number
      name: string
      email: string
      phone_number: string
      address: string
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
    role: string
  }>({
    query: '',
    role: '',
  })

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        `/api/customers?page=${pagination.currentPage}&limit=10`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            query: filter.query,
            role: filter.role,
          }),
        }
      )
      const data = await res.json()
      setCustomers(data.data)
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

  return (
    <Fragment>
      <NavbarWithMegaMenu />
      <div>
        <CustomersTable
          filter={filter}
          members={customers}
          pagination={pagination}
          handleFilterChange={handleFilterChange}
          handlePageChange={handlePageChange}
        />
      </div>
      <Footer />
    </Fragment>
  )
}

export default UsersPage
