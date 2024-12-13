import type { NextApiRequest, NextApiResponse } from 'next'

const Order = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  if (req.method == 'GET') {
    try {
      const { id } = req.query
      const response = await fetch(`${process.env.BACKEND_URL}/order/${id}`, {
        method: 'GET',
      })
      const data = await response.json()
      const orders = data.data.map(
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
            quantity: product.quantity,
            image: product.img,
            slug: product.slug,
          }
        }
      )

      return res.status(200).json(orders)
    } catch (error) {
      console.log(error)
    }
  } else if (req.method == 'PUT') {
    try {
      const { id } = req.query
      const { status } = req.body
      const response = await fetch(`${process.env.BACKEND_URL}/order/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ status }),
        headers: {
          'Content-Type': 'application/json',
        },
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

export default Order
