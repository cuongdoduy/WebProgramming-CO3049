import Footer from '@/components/Footer/Footer'
import NavbarWithMegaMenu from '@/components/Navbar/Navbar'
import { Breadcrumbs } from '@material-tailwind/react'
import React, { Fragment, useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

const Account: React.FC = () => {
  const router = useRouter()
  const { id } = router.query

  const [productNotInTag, setProductNotInTag] = React.useState<
    Array<{
      id: number
      name: string
    }>
  >([])
  const [productInTag, setProductInTag] = useState<
    Array<{
      id: number
      name: string
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

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch(`/api/tags/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const data = await res.json()
      setProductInTag(
        data.map((product: { id: number; title: string }) => {
          return {
            id: product.id,
            name: product.title,
          }
        })
      )
    }
    fetchProducts()
  }, [id])

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
            tag_id: id,
          }),
        }
      )
      const data = await res.json()
      setProductNotInTag(data.data)
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
  }, [pagination.currentPage, id])

  console.log(productNotInTag)
  console.log(pagination)
  console.log(productInTag)

  const handlePageChange = (pageNum: number) => {
    setPagination({
      ...pagination,
      currentPage: pageNum,
    })
  }

  const handleAddProductToTag = async (productId: number) => {
    const res = await fetch(`/api/tags/${id}/products/${productId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (res.status === 200) {
      const product = productNotInTag.find(product => product.id === productId)
      if (!product) return
      const newProducts = productNotInTag.filter(
        product => product.id !== productId
      )
      setProductNotInTag(newProducts)
      setProductInTag([
        ...productInTag,
        {
          id: product.id,
          name: product.name,
        },
      ])
    }
  }

  const handleRemoveProductFromTag = async (productId: number) => {
    const res = await fetch(`/api/tags/${id}/products/${productId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (res.status === 200) {
      const product = productInTag.find(product => product.id === productId)
      if (!product) return
      const newProducts = productInTag.filter(
        product => product.id !== productId
      )
      setProductInTag(newProducts)
      setProductNotInTag([
        ...productNotInTag,
        {
          id: product.id,
          name: product.name,
        },
      ])
    }
  }

  return (
    <Fragment>
      <NavbarWithMegaMenu />
      <div className="w-[80%] mx-auto my-12">
        <Breadcrumbs className="bg-white p-0">
          <Link href="/admin" className="opacity-60">
            Home
          </Link>
          <Link href="/admin/tags">Tags</Link>
          <Link href="#" className="text-[#DB4444]">
            {id}
          </Link>
        </Breadcrumbs>
      </div>
      {/* Product Tag */}
      <div className="w-[80%] mx-auto my-12">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Product Tag</h1>
        </div>
        <div className="mt-4">
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-left">Product Name</th>
                <th className="text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {productInTag.map(product => (
                <tr key={product.id}>
                  <td>{product.name}</td>
                  <td>
                    <button
                      className="text-[#DB4444]"
                      onClick={() => handleRemoveProductFromTag(product.id)}>
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Product Not In Tag */}
      <div className="w-[80%] mx-auto my-12">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Product Not In Tag</h1>
        </div>
        <div className="mt-4">
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-left">Product Name</th>
                <th className="text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {productNotInTag.map(product => (
                <tr key={product.id}>
                  <td>{product.name}</td>
                  <td>
                    <button
                      className="text-[#DB4444]"
                      onClick={() => handleAddProductToTag(product.id)}>
                      Add
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-end mt-4">
          <button
            disabled={pagination.currentPage === 1}
            onClick={() => handlePageChange(pagination.currentPage - 1)}
            className="bg-[#DB4444] text-white px-4 py-2 rounded-md">
            Previous
          </button>
          <button
            disabled={pagination.currentPage === pagination.totalPages}
            onClick={() => handlePageChange(pagination.currentPage + 1)}
            className="bg-[#DB4444] text-white px-4 py-2 rounded-md ml-4">
            Next
          </button>
        </div>
      </div>
      <Footer />
    </Fragment>
  )
}

export default Account
