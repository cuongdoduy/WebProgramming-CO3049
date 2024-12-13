import type { NextApiRequest, NextApiResponse } from 'next'

const Order = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  if (req.method == 'POST') {
    try {
      const {
        cart_id,
        customer_id,
        first_name,
        last_name,
        street_address,
        apartment_floor,
        town_city,
        phone_number,
        email_address,
      } = req.body
      const response = await fetch(`${process.env.BACKEND_URL}/order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cart_id,
          customer_id,
          first_name,
          last_name,
          street_address,
          apartment_floor,
          town_city,
          phone_number,
          email_address,
        }),
      })
      const data = await response.json()
      return res.status(response.status).json(data)
    } catch (error) {
      console.log(error)
    }
  } else if (req.method == 'GET') {
    try {
      const { page, limit, status } = req.query
      let endpoint = `${process.env.BACKEND_URL}/order`
      if (page && limit) {
        endpoint = endpoint + `?page=${page}&limit=${limit}`
      }
      if (status) {
        endpoint = endpoint + `&status=${status}`
      }
      const response = await fetch(endpoint, {
        method: 'GET',
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
