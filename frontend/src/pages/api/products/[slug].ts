import type { NextApiRequest, NextApiResponse } from 'next'

const GetProductForYou = async (
  req: NextApiRequest,
  res: NextApiResponse<any>
) => {
  if (req.method == 'GET') {
    // const { slug } = req.query

    const url = process.env.NEXT_PUBLIC_REDIRECT_URI

    const product_images: Array<string> = [
      `${url}/images/Havic-Hv-G92-Gamepad/image_1.png`,
      `${url}/images/Havic-Hv-G92-Gamepad/image_2.png`,
      `${url}/images/Havic-Hv-G92-Gamepad/image_3.png`,
      `${url}/images/Havic-Hv-G92-Gamepad/image_4.png`,
    ]

    const product_data: {
      name: string
      rate: number
      reviews: number
      status: 'In Stock' | 'Out of Stock'
      price: number
      discount: number
      description: string
      colors: Array<string>
      sizes: Array<'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL'>
      images: Array<string>
    } = {
      name: 'Havic HV G-92 Gamepad',
      rate: 4,
      reviews: 150,
      status: 'In Stock',
      price: 192,
      discount: 0,
      description:
        'PlayStation 5 Controller Skin High quality vinyl with air channel adhesive for easy bubble free install & mess free removal Pressure sensitive.',
      colors: ['#A0BCE0', '#E07575'],
      sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      images: product_images,
    }

    return res.status(200).json({
      message: 'Cart items',
      data: product_data,
    })
  } else {
    return res.status(405).json({
      message: 'Method not allowed',
    })
  }
}

export default GetProductForYou
