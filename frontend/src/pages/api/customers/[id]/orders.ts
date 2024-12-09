import type { NextApiRequest, NextApiResponse } from 'next'

const Order = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  if (req.method == 'GET') {
    try {
      const { id } = req.query
      const response = await fetch(
        `${process.env.BACKEND_URL}/customers/${id}/orders`,
        {
          method: 'GET',
        }
      )
      const data = await response.json()
      //   const orders = data.data.map(
      //     (order: {
      //       order_id: number
      //       products: Array<{
      //         id: number
      //         name: string
      //         price: number
      //         description: string
      //         status: string
      //         img: string
      //         discount: number
      //         total_ratings: number
      //         average_rating: number
      //         slug: string
      //         quantity: number
      //       }>
      //     }) => {
      //       return {
      //         order_id: order.order_id,
      //         products: order.products.map(
      //           (product: {
      //             id: number
      //             name: string
      //             price: number
      //             description: string
      //             status: string
      //             img: string
      //             discount: number
      //             total_ratings: number
      //             average_rating: number
      //             slug: string
      //             quantity: number
      //           }) => {
      //             return {
      //               id: product.id,
      //               title: product.name,
      //               price: product.price,
      //               quantity: product.quantity,
      //               image: product.img,
      //               slug: product.slug,
      //             }
      //           }
      //         ),
      //       }
      //     }
      //   )
      const orders = data.data.map(
        (order: {
          order_id: number
          status: string
          total_price: number
          created_at: string
        }) => {
          return {
            id: order.order_id,
            status: order.status,
            date: new Date(order.created_at).toLocaleDateString('en-GB'),
            price: order.total_price,
          }
        }
      )
      return res.status(200).json(orders)
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
