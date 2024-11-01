import type { NextApiRequest, NextApiResponse } from 'next'

const GetUserCart = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  if (req.method == 'GET') {
    const data = {
      message: 'Cart items',
      data: [
        {
          id: 1,
          title: 'LCD Monitor',
          price: 200,
          quantity: 1,
          image: 'http://localhost:3000/images/lcd-monitor.png',
        },
        {
          id: 2,
          title: 'Gaming Mouse',
          price: 50,
          quantity: 1,
          image: 'http://localhost:3000/images/gaming-mouse.png',
        },
      ],
    }

    return res.status(200).json(data.data)
  } else {
    return res.status(405).json({
      message: 'Method not allowed',
    })
  }
}

export default GetUserCart
