import type { NextApiRequest, NextApiResponse } from 'next'

const GetProductForYou = async (
  req: NextApiRequest,
  res: NextApiResponse<any>
) => {
  if (req.method == 'GET') {
    try {
      const { currentPage } = req.query
      const response = await fetch(
        `${process.env.BACKEND_URL}/products/${currentPage || 1}`,
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

    const data = {
      message: 'Cart items',
      data: [
        {
          id: 1,
          title: 'LCD Monitor',
          price: 200,
          quantity: 1,
          discount: 0,
          image: `${process.env.NEXT_PUBLIC_REDIRECT_URI}/images/lcd-monitor.png`,
          rating: 2.5,
          reviews: 10,
        },
        {
          id: 2,
          title: 'Gaming Mouse',
          price: 50,
          discount: 10,
          quantity: 1,
          image: `${process.env.NEXT_PUBLIC_REDIRECT_URI}/images/gaming-mouse.png`,
          rating: 3.5,
          reviews: 20,
        },
        {
          id: 3,
          title: 'Wireless Keyboard',
          price: 100,
          discount: 20,
          quantity: 1,
          image: `${process.env.NEXT_PUBLIC_REDIRECT_URI}/images/keyboard.png`,
          rating: 4.5,
          reviews: 30,
        },
        {
          id: 4,
          title: 'ASUS FHD Gaming Laptop',
          price: 150,
          discount: 30,
          quantity: 1,
          image: `${process.env.NEXT_PUBLIC_REDIRECT_URI}/images/ideapad.png`,
          rating: 5,
          reviews: 40,
        },
        {
          id: 5,
          title: 'Wireless Keyboards',
          price: 100,
          discount: 20,
          quantity: 1,
          image: `${process.env.NEXT_PUBLIC_REDIRECT_URI}/images/keyboard.png`,
          rating: 4.5,
          reviews: 30,
        },
        {
          id: 6,
          title: 'ASUS FHD Gaming Laptops',
          price: 150,
          discount: 30,
          quantity: 1,
          image: `${process.env.NEXT_PUBLIC_REDIRECT_URI}/images/ideapad.png`,
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
