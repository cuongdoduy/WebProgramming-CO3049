import Footer from '@/components/Footer/Footer'
import NavbarWithMegaMenu from '@/page-sections/AdminPage/Navbar'
import React, { Fragment, useEffect, useState } from 'react'
import { ProductTable } from '@/page-sections/AdminPage/ProductTable'

const UsersPage: React.FC = () => {
  const [products, setProducts] = useState<
    Array<{
      id: number
      name: string
      price: number
      status: string
      slug: string
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
      const res = await fetch(
        `/api/products/filter?page=${pagination.currentPage}&limit=10`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            query: filter.query,
            status: filter.status,
          }),
        }
      )
      const data = await res.json()
      setProducts(
        data.data.map(
          (product: {
            id: number
            name: string
            price: number
            status: string
            slug: string
            created_at: string
          }) => {
            return {
              id: product.id,
              name: product.name,
              price: product.price,
              status: product.status,
              slug: product.slug,
              createdAt: new Date(product.created_at).toLocaleDateString(
                'en-GB'
              ),
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

  return (
    <Fragment>
      <NavbarWithMegaMenu />
      <div>
        <ProductTable
          filter={filter}
          products={products}
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
