import Footer from '@/components/Footer/Footer'
import NavbarWithMegaMenu from '@/components/Navbar/Navbar'
import constants from '@/constant/schema-data'
import S3Uploader from '@/utils/aws'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { Breadcrumbs, Typography } from '@material-tailwind/react'
import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import React, { Fragment, useEffect, useState } from 'react'

const ProductDetail: React.FC<{
  data: {
    id: number
    name: string
    rate: number
    reviews: number
    status: 'In Stock' | 'Out of Stock'
    price: number
    slug: string
    discount: number
    category_id: number | string
    description: string
    cover: string
    colors: Array<string>
    sizes: Array<'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL'>
    images: Array<string>
  }
  categories: Array<{
    id: number
    name: string
  }>
}> = ({ data, categories }) => {
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

  useEffect(() => {
    setProduct({
      name: data.name,
      price: data.price,
      discount: data.discount,
      category_id: data.category_id,
      status: data.status,
      description: data.description,
      cover: {
        file: null,
        url: data.cover,
      },
      images: data.images.map(image => ({
        file: null,
        url: image,
      })),
    })

    const loadCoverImage = async () => {
      if (!data.cover) return
      const response = await fetch(data.cover)
      const blob = await response.blob()
      const file = new File([blob], 'cover.jpg', { type: 'image/jpeg' })
      setProduct(prevState => ({
        ...prevState,
        cover: {
          file,
          url: data.cover,
        },
      }))
    }

    const loadImages = async () => {
      if (data.images.length === 0) return
      const images = await Promise.all(
        data.images.map(async image => {
          const response = await fetch(image)
          const blob = await response.blob()
          return new File([blob], 'image.jpg', { type: 'image/jpeg' })
        })
      )
      setProduct(prevState => ({
        ...prevState,
        images: images.map((image, index) => ({
          file: image,
          url: data.images[index],
        })),
      }))
    }

    loadCoverImage()
    loadImages()
  }, [data])

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

  const handleRemoveImage = (index: number) => {
    if (product.images[index].url) {
      URL.revokeObjectURL(product.images[index].url)
    }

    const images = product.images.filter((_, i) => i !== index)
    setProduct({
      ...product,
      images: images,
    })
  }

  const handleRemoveCover = () => {
    if (product.cover.url) {
      URL.revokeObjectURL(product.cover.url)
    }
    setProduct({
      ...product,
      cover: {
        file: null,
        url: null,
      },
    })
  }

  const handleUpdateProduct = async () => {
    const uploader = new S3Uploader(
      process.env.NEXT_PUBLIC_AWS_REGION as string,
      process.env.NEXT_PUBLIC_AWS_BUCKET as string
    )

    let cover = product.cover.url

    if (product.cover.url && !product.cover.url.startsWith('https://')) {
      const response = await uploader.upload(
        product.cover.file as File,
        'images'
      )
      cover = response.Location
    }

    const oldImages = data.images.filter(image => image.startsWith('https://'))
    const newImages = product.images.filter(
      image => !image.url.startsWith('https://')
    )

    const images = await Promise.all(
      newImages.map(async image => {
        const response = await uploader.upload(image.file as File, 'images')
        return response.Location
      })
    )

    const mergedImages = [...oldImages, ...images]

    const response = await fetch(
      `/api/products/${data.id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: product.name,
          price: product.price,
          discount: product.discount,
          category_id: product.category_id,
          status: product.status,
          description: product.description,
          cover: cover,
          images: mergedImages,
        }),
      }
    )

    if (response.ok) {
      alert('Product updated successfully')
    } else {
      alert('Failed to update product')
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
          <Link href={`/admin/products/${data.slug}`}>{data.name}</Link>
        </Breadcrumbs>
        <section className="bg-white dark:bg-gray-900">
          <div className="max-w-2xl px-4 py-8 mx-auto lg:py-16">
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
                    onChange={e => handleChangeValue(e, 'status')}
                    value={product.status}
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
                      <div className="mt-4 relative w-fit pt-4">
                        <Image
                          src={product.cover.url}
                          alt="cover"
                          width={129}
                          height={98}
                        />
                        <div
                          className="absolute top-0 right-[-20%] rounded-full bg-[#DB4444] p-1"
                          onClick={handleRemoveCover}>
                          <XMarkIcon className="w-4 h-4 text-white cursor-pointer" />
                        </div>
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
                        <div
                          key={index}
                          className="col-span-1 relative w-fit pt-4">
                          <Image
                            src={image.url}
                            alt="cover"
                            width={100}
                            height={80}
                          />
                          <div
                            className="absolute top-0 right-[-20%] rounded-full bg-[#DB4444] p-1"
                            onClick={() => handleRemoveImage(index)}>
                            <XMarkIcon className="w-4 h-4 text-white cursor-pointer" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <button
                  onClick={handleUpdateProduct}
                  className="text-white bg-[blue] hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                  Update product
                </button>
                <button
                  type="button"
                  className="text-red-600 inline-flex items-center hover:text-white border border-red-600 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900">
                  <svg
                    className="w-5 h-5 mr-1 -ml-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      fill-rule="evenodd"
                      d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                      clip-rule="evenodd"></path>
                  </svg>
                  Delete
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

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch(`${process.env.BACKEND_URL}/products/1`)
  const data = await res.json()

  const paths = data.data.map(
    (product: {
      id: number
      name: string
      price: number
      description: string
      status: string
      img: string
      discount: number
      total_ratings: number
      average_rating: number
      slug: string
    }) => ({
      params: { id: product.slug.toString() },
    })
  )
  return { paths, fallback: true }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.id

  const [productDetailData, categoriesData] = await Promise.all([
    fetch(`${process.env.BACKEND_URL}/product?slug=${slug}`),
    fetch(`${process.env.BACKEND_URL}/categories`),
  ])

  const [productDetail, categoriesDetailData] = await Promise.all([
    productDetailData.json(),
    categoriesData.json(),
  ])

  const productData: {
    id: number
    name: string
    price: number
    description: string
    status: string
    img: string
    discount: number
    slug: string
    category_id: number
    total_ratings: number
    average_rating: number
    images: Array<string>
  } = productDetail.data[0]

  const categories: Array<{
    id: number
    name: string
  }> = categoriesDetailData.data

  return {
    props: {
      data: {
        id: productData.id,
        name: productData.name,
        rate: productData.average_rating,
        reviews: productData.total_ratings,
        status: productData.status,
        price: productData.price,
        slug: productData.slug,
        discount: productData.discount,
        category_id: productData.category_id,
        description: productData.description,
        cover: productData.img,
        images: productData.images,
        sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
        colors: ['#A0BCE0', '#E07575'],
      },
      categories: categories,
    },
    revalidate: 60,
  }
}

export default ProductDetail
