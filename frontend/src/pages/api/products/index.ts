import type { NextApiRequest, NextApiResponse } from 'next'

const GetProduct = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  if (req.method == 'GET') {
    try {
      const { page, limit, slug } = req.query

      if (slug) {
        const response = await fetch(`${process.env.BACKEND_URL}/product?slug=${slug}`, {
          method: 'GET',
        })
        const data = await response.json()
        const productDetailData: {
          id: number
          name: string
          price: number
          description: string
          status: string
          img: string
          discount: number
          total_ratings: number
          average_rating: number
          images: Array<string>
        } = data.data[0]

        return res.status(200).json({
          message: 'Product details',
          data: {
            id: productDetailData.id,
            name: productDetailData.name,
            rate: productDetailData.average_rating,
            reviews: productDetailData.total_ratings,
            status: productDetailData.status,
            price: productDetailData.price,
            discount: productDetailData.discount,
            description: productDetailData.description,
            cover: productDetailData.img,
            images: productDetailData.images,
            sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
            colors: ['#A0BCE0', '#E07575'],
          },
        })
      }

      let endpoint = `${process.env.BACKEND_URL}/products`
      if (page && limit) {
        endpoint = `${process.env.BACKEND_URL}/products?page=${page}&limit=${limit}`
      }
      const response = await fetch(endpoint, {
        method: 'GET',
      })
      const data = await response.json()
      const productData = data.data.map(
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
        }) => {
          return {
            id: product.id,
            title: product.name,
            price: product.price,
            discount: product.discount,
            image: product.img,
            rating: product.average_rating,
            reviews: product.total_ratings,
            slug: product.slug,
            status: product.status,
          }
        }
      )
      return res.status(200).json({
        products: productData,
        pagination: data.pagination,
      })
    } catch (error) {
      console.log(error)
    }
  } else if (req.method == 'POST') {
    try {
      const {
        name,
        price,
        description,
        status,
        discount,
        cover,
        images,
        category_id,
      } = req.body
      const response = await fetch(`${process.env.BACKEND_URL}/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          price,
          description,
          status,
          discount,
          cover,
          images,
          category_id,
        }),
      })
      const data = await response.json()
      return res.status(response.status).json(data)
    } catch (error) {
      console.log(error)
    }
  } else {
    return res.status(405).json({
      message: 'Method not allowed',
    })
  }
}

export default GetProduct
