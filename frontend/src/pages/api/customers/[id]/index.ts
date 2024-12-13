import type { NextApiRequest, NextApiResponse } from 'next'

const Order = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  if (req.method == 'GET') {
    try {
      const { id } = req.query
      const response = await fetch(
        `${process.env.BACKEND_URL}/customers/${id}`,
        {
          method: 'GET',
        }
      )
      const data = await response.json()
      return res.status(200).json(data.data)
    } catch (error) {
      console.log(error)
    }
  } else if (req.method == 'PUT') {
    try {
      const { id } = req.query
      const { name, email, phone, address } = req.body
      const response = await fetch(
        `${process.env.BACKEND_URL}/customers/${id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name,
            email,
            phone,
            address,
          }),
        }
      )
      const data = await response.json()
      return res.status(200).json(data)
    } catch (error) {
      console.log(error)
    }
  } else if (req.method == 'DELETE') {
    try {
      const { id } = req.query
      const response = await fetch(
        `${process.env.BACKEND_URL}/customers/${id}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      const data = await response.json()
      return res.status(200).json(data)
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
