import Footer from '@/components/Footer/Footer'
import NavbarWithMegaMenu from '@/components/Navbar/Navbar'
import SecondaryButton from '@/components/SecondaryButton'
import constants from '@/constant/schema-data'
import ProductDescription from '@/page-sections/ProductDetailPage/ProductDescription'
import ProductImageList from '@/page-sections/ProductDetailPage/ProductImageList'
import ForYouList from '@/page-sections/WishlistPage/ForYouList'
import { Breadcrumbs, Typography } from '@material-tailwind/react'
import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
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
    description: string
    colors: Array<string>
    sizes: Array<'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL'>
    images: Array<string>
  }
}> = ({ data }) => {
  const [forYouItems, setForYouItems] = useState<
    Array<{
      id: number
      title: string
      price: number
      image: string
      discount: number
      rating: number
      reviews: number
    }>
  >([])

  useEffect(() => {
    const fetchData = async () => {
      const items_for_you = await fetch('/api/products/for-you')
      const forYouItems = await items_for_you.json()
      setForYouItems(forYouItems)
    }
    fetchData()
  }, [])

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
          <Link href={`/products/${data.slug}`}>{data.name}</Link>
        </Breadcrumbs>
        <div className="mt-[60px] grid grid-cols-12 gap-6">
          <div className="col-span-12 lg:col-span-6">
            <ProductImageList productImages={data.images} />
          </div>
          <div className="col-span-12 lg:col-span-6">
            <ProductDescription data={data} />
          </div>
        </div>
        <div className="my-12 mb-6 flex justify-between w-full items-center">
          <div className="flex items-center justify-start gap-x-4">
            <div className="w-[20px] h-[50px] bg-[#DB4444] rounded-md"></div>
            <Typography
              as="h5"
              variant="h5"
              className="py-1.5 text-[20px] font-normal">
              Related Products
            </Typography>
          </div>
          <SecondaryButton title="See All" />
        </div>
        <div className="mt-[60px]">
          <div className="mt-[60px]">
            <ForYouList data={forYouItems} />
          </div>
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

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch(`${process.env.BACKEND_URL}/products`)
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
  const res = await fetch(`${process.env.BACKEND_URL}/product?slug=${slug}`)
  const data = await res.json()

  const productDetailData: {
    id: number
    name: string
    price: number
    description: string
    status: string
    img: string
    discount: number
    slug: string
    total_ratings: number
    average_rating: number
    images: Array<string>
  } = data.data[0]

  return {
    props: {
      data: {
        id: productDetailData.id,
        name: productDetailData.name,
        rate: productDetailData.average_rating,
        reviews: productDetailData.total_ratings,
        status: productDetailData.status,
        price: productDetailData.price,
        slug: productDetailData.slug,
        discount: productDetailData.discount,
        description: productDetailData.description,
        images: productDetailData.images,
        sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
        colors: ['#A0BCE0', '#E07575'],
      },
    },
    revalidate: 60,
  }
}

export default ProductDetail
