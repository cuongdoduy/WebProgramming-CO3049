import type { NextApiRequest, NextApiResponse } from 'next'

const AddProductToWishList = async (
  req: NextApiRequest,
  res: NextApiResponse<any>
) => {
  if (req.method == 'POST') {
    try {
      const { product_id, customer_id } = req.body
      const response = await fetch(`${process.env.BACKEND_URL}/wishlist`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          product_id: product_id,
          customer_id: customer_id,
        }),
      })
      const data = await response.json()
      return res.status(response.status).json(data)
    } catch (error) {
      console.log(error)
    }
  } else if (req.method == 'DELETE') {
    try {
      const { product_id, customer_id } = req.body
      const response = await fetch(`${process.env.BACKEND_URL}/wishlist`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          product_id: product_id,
          customer_id: customer_id,
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

export default AddProductToWishList
