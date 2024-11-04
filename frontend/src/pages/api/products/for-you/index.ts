import type { NextApiRequest, NextApiResponse } from 'next'

const GetProductForYou = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  if (req.method == 'GET') {
    const data = {
      message: 'Cart items',
      data: [
        {
          id: 1,
          title: 'LCD Monitor',
          price: 200,
          quantity: 1,
          discount: 0,
          image: 'http://localhost:3000/images/lcd-monitor.png',
          rating: 2.5,
          reviews: 10,
        },
        {
          id: 2,
          title: 'Gaming Mouse',
          price: 50,
          discount: 10,
          quantity: 1,
          image: 'http://localhost:3000/images/gaming-mouse.png',
          rating: 3.5,
          reviews: 20,
        },
        {
          id: 3,
          title: 'Wireless Keyboard',
          price: 100,
          discount: 20,
          quantity: 1,
          image: 'http://localhost:3000/images/keyboard.png',
          rating: 4.5,
          reviews: 30,
        },
        {
          id: 4,
          title: 'ASUS FHD Gaming Laptop',
          price: 150,
          discount: 30,
          quantity: 1,
          image: 'http://localhost:3000/images/ideapad.png',
          rating: 5,
          reviews: 40,
        },
        {
            id: 5,
            title: 'Wireless Keyboards',
            price: 100,
            discount: 20,
            quantity: 1,
            image: 'http://localhost:3000/images/keyboard.png',
            rating: 4.5,
            reviews: 30,
          },
          {
            id: 6,
            title: 'ASUS FHD Gaming Laptops',
            price: 150,
            discount: 30,
            quantity: 1,
            image: 'http://localhost:3000/images/ideapad.png',
            rating: 5,
            reviews: 40,
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

export default GetProductForYou
