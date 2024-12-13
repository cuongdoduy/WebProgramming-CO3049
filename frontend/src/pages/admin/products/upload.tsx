import Footer from '@/components/Footer/Footer'
import NavbarWithMegaMenu from '@/components/Navbar/Navbar'
import constants from '@/constant/schema-data'
import S3Uploader from '@/utils/aws'
import { Breadcrumbs, Typography } from '@material-tailwind/react'
import { GetStaticProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import React, { Fragment, useState } from 'react'

const UploadProduct: React.FC<{
  categories: Array<{
    id: number
    name: string
  }>
}> = ({ categories }) => {
  const [product, setProduct] = useState<{
    name: string
    price: number
    discount: number
    category_id: number | string
    status: string
    description: string
    cover: {
      file: File | null
      url: string | null
    }
    images: Array<{
      file: File | null
      url: string
    }>
  }>({
    name: '',
    price: 0,
    discount: 0,
    category_id: '',
    status: 'In Stock',
    description: '',
    cover: {
      file: null,
      url: null,
    },
    images: [],
  })

  const handleChangeCover = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return
    // revoke the old url
    if (product.cover.url) {
      URL.revokeObjectURL(product.cover.url)
    }
    const file = e.target.files[0]
    if (file) {
      setProduct({
        ...product,
        cover: {
          file: file,
          url: URL.createObjectURL(file),
        },
      })
    }
  }

  const handleChangeImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return
    const files = Array.from(e.target.files)
    const images = files.map(file => ({
      file: file,
      url: URL.createObjectURL(file),
    }))
    setProduct({
      ...product,
      images: [...product.images, ...images],
    })
  }

  const handleChangeValue = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
    key: string
  ) => {
    setProduct({
      ...product,
      [key]: e.target.value,
    })
  }

  const handleUploadProduct = async () => {
    const uploader = new S3Uploader(
      process.env.NEXT_PUBLIC_AWS_REGION as string,
      process.env.NEXT_PUBLIC_AWS_BUCKET as string
    )
    const coverResponse = await uploader.upload(
      product.cover.file as File,
      'images'
    )

    const imagesResponse = await Promise.all(
      product.images.map(async image => {
        return await uploader.upload(image.file as File, 'images')
      })
    )

    const productData = {
      name: product.name,
      price: product.price,
      discount: product.discount,
      category_id: product.category_id,
      status: product.status,
      description: product.description,
      cover: coverResponse.Location,
      images: imagesResponse.map(image => image.Location),
    }

    const response = await fetch(`/api/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productData),
    })

    if (response.ok) {
      alert('Product uploaded successfully')
    } else {
      alert('Failed to upload product')
    }
  }

  return (
    <Fragment>
      <MetaTags />
      <NavbarWithMegaMenu />
      <main className="w-[80%] mx-auto my-12">
        <Breadcrumbs className="bg-white p-0">
          <Link href="/admin" className="opacity-60">
            Home
          </Link>
          <Link href="/admin/products">Products</Link>
          <Link href={`/admin/products/upload`}>Upload Product</Link>
        </Breadcrumbs>
        <section className="bg-white dark:bg-gray-900">
          <div className="max-w-4xl px-4 py-8 mx-auto lg:py-16">
            <Typography
              variant="h2"
              className="text-3xl font-semibold text-gray-900 dark:text-white text-center">
              Update product
            </Typography>
            <div>
              <div className="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5">
                <div className="sm:col-span-2">
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Product Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    value={product.name}
                    onChange={e => handleChangeValue(e, 'name')}
                    placeholder="Type product name"
                  />
                </div>
                <div className="w-full">
                  <label
                    htmlFor="discount"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Discount
                  </label>
                  <input
                    type="number"
                    name="discount"
                    id="discount"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    value={product.discount}
                    onChange={e => handleChangeValue(e, 'discount')}
                    placeholder="Product Discount"
                  />
                </div>
                <div className="w-full">
                  <label
                    htmlFor="price"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Price
                  </label>
                  <input
                    type="number"
                    name="price"
                    id="price"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    value={product.price}
                    onChange={e => handleChangeValue(e, 'price')}
                    placeholder="$299"
                  />
                </div>
                <div>
                  <label
                    htmlFor="category"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Category
                  </label>
                  <select
                    value={product.category_id}
                    onChange={e => handleChangeValue(e, 'category_id')}
                    id="category"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                    {categories.map(category => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                    {product.category_id == '' && (
                      <option value="">Select a category</option>
                    )}
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="status"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Status
                  </label>
                  <select
                    value={product.status}
                    onChange={e => handleChangeValue(e, 'status')}
                    id="status"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                    <option value="In Stock">In Stock</option>
                    <option value="Out of Stock">Out of Stock</option>
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label
                    htmlFor="description"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Description
                  </label>
                  <textarea
                    id="description"
                    rows={4}
                    value={product.description}
                    onChange={e => handleChangeValue(e, 'description')}
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Write a product description here..."
                  />
                </div>
                <div className="sm:col-span-2 grid grid-cols-2">
                  <div>
                    <div>
                      <span className="mt-2 text-base leading-normal">
                        Cover Image
                      </span>
                      <label className="w-64 flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-[blue] hover:text-white">
                        <svg
                          className="w-8 h-8"
                          fill="currentColor"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20">
                          <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                        </svg>
                        <span className="mt-2 text-base leading-normal">
                          Select an image
                        </span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleChangeCover}
                        />
                      </label>
                    </div>
                    {product.cover.url && (
                      <div className="mt-4">
                        <Image
                          src={product.cover.url}
                          alt="cover"
                          width={129}
                          height={98}
                        />
                      </div>
                    )}
                  </div>
                  {/* List of detail */}
                  <div>
                    <div className="">
                      <span className="mt-2 text-base leading-normal">
                        Product Images
                      </span>
                      <label className="w-64 flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-[blue] hover:text-white">
                        <svg
                          className="w-8 h-8"
                          fill="currentColor"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20">
                          <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                        </svg>
                        <span className="mt-2 text-base leading-normal">
                          Select images
                        </span>
                        <input
                          type="file"
                          accept="image/*"
                          multiple
                          onChange={handleChangeImages}
                          className="hidden"
                        />
                      </label>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-8">
                      {product.images.map((image, index) => (
                        <div key={index} className="col-span-1">
                          <Image
                            src={image.url}
                            alt="cover"
                            width={100}
                            height={80}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <button
                  onClick={handleUploadProduct}
                  className="text-white bg-[blue] hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                  Upload product
                </button>
              </div>
            </div>
          </div>
        </section>
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

export const getStaticProps: GetStaticProps = async () => {
  const categoriesData = await fetch(`${process.env.BACKEND_URL}/categories`, {
    method: 'GET',
  })

  const categoriesDetailData = await categoriesData.json()

  const categories: Array<{
    id: number
    name: string
  }> = categoriesDetailData.data

  return {
    props: {
      categories: categories,
    },
    revalidate: 60,
  }
}

export default UploadProduct
