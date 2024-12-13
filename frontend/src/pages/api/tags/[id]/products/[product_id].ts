import type { NextApiRequest, NextApiResponse } from 'next'

const GetProductTag = async (
  req: NextApiRequest,
  res: NextApiResponse<any>
) => {
  if (req.method == 'POST') {
    try {
      const { id, product_id } = req.query
      const response = await fetch(
        `${process.env.BACKEND_URL}/tags/${id}/product/${product_id}`,
        {
          method: 'POST',
        }
      )
      const data = await response.json()
      return res.status(response.status).json(data)
    } catch (error) {
      console.log(error)
    }
  } else if (req.method == 'DELETE') {
    try {
      const { id, product_id } = req.query
      const response = await fetch(
        `${process.env.BACKEND_URL}/tags/${id}/product/${product_id}`,
        {
          method: 'DELETE',
        }
      )
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

export default GetProductTag
