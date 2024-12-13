// import Filter from '@/components/Filter'
import Footer from '@/components/Footer/Footer'
import NavbarWithMegaMenu from '@/components/Navbar/Navbar'
import constants from '@/constant/schema-data'
import ProductList from '@/page-sections/HomePage/ProductList'
import { Breadcrumbs } from '@material-tailwind/react'
import Head from 'next/head'
import Link from 'next/link'
import React, { Fragment, useEffect, useState } from 'react'

const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<
    Array<{
      id: number
      title: string
      price: number
      image: string
      discount: number
      rating: number
      reviews: number
      slug: string
    }>
  >([])

  const [pagination, setPagination] = useState<{
    totalItems: number
    totalPages: number
    currentPage: number
  }>({
    totalItems: 0,
    totalPages: 0,
    currentPage: 0,
  })

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/products?page=1&limit=8')
      const data = await res.json()
      setProducts(data.products)
      const pagination: {
        current_page: number
        total_pages: number
        total_items: number
      } = data.pagination

      setPagination({
        totalItems: pagination.total_items,
        totalPages: pagination.total_pages,
        currentPage: pagination.current_page,
      })
    }
    fetchData()
  }, [])

  const handleNext = async () => {
    const res = await fetch(
      `/api/products?page=${pagination.currentPage + 1}&limit=8`
    )
    const data = await res.json()
    setProducts(data.products)
    setPagination(prev => ({
      ...prev,
      currentPage: prev.currentPage + 1,
    }))
  }

  const handlePrev = async () => {
    const res = await fetch(
      `/api/products?page=${pagination.currentPage - 1}&limit=8`
    )
    const data = await res.json()
    setProducts(data.products)
    setPagination(prev => ({
      ...prev,
      currentPage: prev.currentPage - 1,
    }))
  }

  return (
    <Fragment>
      <MetaTags />
      <NavbarWithMegaMenu />
      <main className="w-[80%] mx-auto my-12">
        <Breadcrumbs className="bg-white p-0">
          <Link href="/" className="opacity-60">
            Home
          </Link>
          <Link href="/products">Products</Link>
        </Breadcrumbs>
        <div className="grid grid-cols-10 gap-4 my-[20px]">
          <div className="col-span-10">
            <ProductList data={products} />
          </div>
        </div>
        <div className="flex items-center gap-8 justify-center">
          <button
            onClick={handlePrev}
            disabled={pagination.currentPage == 1}
            className="rounded-md border border-slate-300 p-2.5 text-center text-sm transition-all shadow-sm hover:shadow-lg text-slate-600 hover:text-black hover:bg-slate-800 hover:border-slate-800 focus:text-black focus:bg-slate-800 focus:border-slate-800 active:border-slate-800 active:text-white active:bg-slate-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            type="button">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-4 h-4">
              <path
                fillRule="evenodd"
                d="M11.03 3.97a.75.75 0 0 1 0 1.06l-6.22 6.22H21a.75.75 0 0 1 0 1.5H4.81l6.22 6.22a.75.75 0 1 1-1.06 1.06l-7.5-7.5a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 0 1 1.06 0Z"
                clipRule="evenodd"
              />
            </svg>
          </button>

          <p className="text-slate-600">
            Page{' '}
            <strong className="text-slate-800">{pagination.currentPage}</strong>{' '}
            of&nbsp;
            <strong className="text-slate-800">{pagination.totalPages}</strong>
          </p>

          <button
            onClick={handleNext}
            className="rounded-md border border-slate-300 p-2.5 text-center text-sm transition-all shadow-sm hover:shadow-lg text-slate-600 hover:text-black hover:bg-slate-800 hover:border-slate-800 focus:text-black focus:bg-slate-800 focus:border-slate-800 active:border-slate-800 active:text-white active:bg-slate-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            disabled={pagination.currentPage == pagination.totalPages}
            type="button">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-4 h-4">
              <path
                fillRule="evenodd"
                d="M12.97 3.97a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 1 1-1.06-1.06l6.22-6.22H3a.75.75 0 0 1 0-1.5h16.19l-6.22-6.22a.75.75 0 0 1 0-1.06Z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </main>
      <Footer />
    </Fragment>
  )
}

const MetaTags = () => {
  return (
    <Head>
      <title>Exclusive - The best place to buy your favorite products</title>
      <meta
        name="description"
        content="Exclusive - The best place to buy your favorite products"
      />
      <meta
        name="description"
        content="
            The best place to buy your favorite products. We offer a wide range of products from electronics to fashion."
      />
      <meta
        name="keywords"
        content="electronics, fashion, gadgets, clothing, accessories"
      />
      <link rel="canonical" href="https://web-programming-co-3049.vercel.app" />
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta charSet="utf-8" />
      <meta
        property="og:title"
        content="Exclusive - The best place to buy your favorite products"
      />
      <meta
        property="og:description"
        content="The best place to buy your favorite products. We offer a wide range of products from electronics to fashion."
      />
      <meta property="og:sitename" content="Exclusive" />
      <meta
        property="og:url"
        content="https://web-programming-co-3049.vercel.app"
      />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="en_US" />
      <meta property="og:updated_time" content="2024-10-22T02:08:26+00:00" />
      <meta
        property="og:image"
        content={`${process.env.NEXT_PUBLIC_REDIRECT_URI}/social_image_homepage.webp`}
      />
      <meta
        property="og:image:secure_url"
        content={`${process.env.NEXT_PUBLIC_REDIRECT_URI}/social_image_homepage.webp`}
      />
      <meta property="og:image:width" content="900" />
      <meta property="og:image:height" content="900" />
      <meta property="og:image:alt" content="Exclusive" />
      <meta property="og:image:type" content="image/jpeg" />
      <meta
        property="article:published_time"
        content="2024-05-01T08:07:31+00:00"
      />
      <meta
        property="article:modified_time"
        content="2024-05-22T02:08:26+00:00"
      />
      <meta name="twitter:card" content="summary_large_image" />
      <meta
        name="twitter:title"
        content="Exclusive - The best place to buy your favorite products"
      />
      <meta
        name="twitter:description"
        content="The best place to buy your favorite products. We offer a wide range of products from electronics to fashion."
      />
      <meta
        name="twitter:image"
        content={`${process.env.NEXT_PUBLIC_REDIRECT_URI}/social_image_homepage.webp`}
      />
      <meta name="twitter:label1" content="Written by" />
      <meta name="twitter:data1" content="Academic Team" />
      <meta name="twitter:label2" content="Time to read" />
      <meta name="twitter:data2" content="2 minutes" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(constants),
        }}
      />
    </Head>
  )
}

export default ProductsPage
