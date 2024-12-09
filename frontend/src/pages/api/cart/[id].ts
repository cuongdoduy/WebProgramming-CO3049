import type { NextApiRequest, NextApiResponse } from 'next'

const GetProductInCart = async (
  req: NextApiRequest,
  res: NextApiResponse<any>
) => {
  if (req.method == 'GET') {
    try {
      const { id } = req.query
      const response = await fetch(`${process.env.BACKEND_URL}/cart/${id}`, {
        method: 'GET',
      })
      const data = await response.json()
      const productData = data.map(
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
          quantity: number
        }) => {
          return {
            id: product.id,
            title: product.name,
            price: product.price,
            discount: product.discount,
            quantity: product.quantity,
            image: product.img,
            rating: product.average_rating,
            reviews: product.total_ratings,
            slug: product.slug,
          }
        }
      )
      return res.status(200).json(productData)
    } catch (error) {
      console.log(error)
    }
  } else if (req.method == 'PUT') {
    try {
      const { id } = req.query
      const { product_id, quantity } = req.body
      const response = await fetch(`${process.env.BACKEND_URL}/cart/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          product_id,
          quantity,
        }),
      })
      const data = await response.json()
      return res.status(response.status).json(data)
    } catch (error) {
      console.log(error)
    }
  } else if (req.method == 'DELETE') {
    try {
      const { id } = req.query
      const { product_id } = req.body
      const response = await fetch(`${process.env.BACKEND_URL}/cart/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          product_id,
        }),
      })
      const data = await response.json()
      return res.status(response.status).json(data)
    } catch (error) {
      console.log(error)
    }
  } else if (req.method == 'POST') {
    try {
      const { id } = req.query
      const { product_id, quantity } = req.body
      const response = await fetch(`${process.env.BACKEND_URL}/cart/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          product_id,
          quantity,
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

export default GetProductInCart
