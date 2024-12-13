import type { NextApiRequest, NextApiResponse } from 'next'

const Customers = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  if (req.method == 'POST') {
    try {
      const { query, role } = req.body
      const { page, limit } = req.query
      const response = await fetch(
        `${process.env.BACKEND_URL}/customers?page=${page}&limit=${limit}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            query_value: query,
            role,
          }),
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

export default Customers
