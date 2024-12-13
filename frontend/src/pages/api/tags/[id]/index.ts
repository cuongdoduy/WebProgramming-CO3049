import type { NextApiRequest, NextApiResponse } from 'next'

const GetProductTag = async (
  req: NextApiRequest,
  res: NextApiResponse<any>
) => {
  if (req.method == 'GET') {
    try {
      const { id } = req.query
      const response = await fetch(
        `${process.env.BACKEND_URL}/tags/${id}`,
        {
          method: 'GET',
        }
      )
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
            quantity: 1,
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
  } else {
    return res.status(405).json({
      message: 'Method not allowed',
    })
  }
}

export default GetProductTag
