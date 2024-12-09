import type { NextApiRequest, NextApiResponse } from 'next'

const GetProductForYou = async (
  req: NextApiRequest,
  res: NextApiResponse<any>
) => {
  if (req.method == 'GET') {
    const { id } = req.query

    try {
      const response = await fetch(`${process.env.BACKEND_URL}/product/${id}`, {
        method: 'GET',
      })
      const data = await response.json()
      const productDetailData: {
        id: number
        name: string
        price: number
        description: string
        status: string
        img: string
        discount: number
        total_ratings: number
        average_rating: number
        images: Array<string>
      } = data.data[0]

      return res.status(200).json({
        message: 'Product details',
        data: {
          id: productDetailData.id,
          name: productDetailData.name,
          rate: productDetailData.average_rating,
          reviews: productDetailData.total_ratings,
          status: productDetailData.status,
          price: productDetailData.price,
          discount: productDetailData.discount,
          description: productDetailData.description,
          cover: productDetailData.img,
          images: productDetailData.images,
          sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
          colors: ['#A0BCE0', '#E07575'],
        },
      })
    } catch (error) {
      console.log(error)
    }

    // const url = process.env.NEXT_PUBLIC_REDIRECT_URI

    // const product_images: Array<string> = [
    //   `${url}/images/Havic-Hv-G92-Gamepad/image_1.png`,
    //   `${url}/images/Havic-Hv-G92-Gamepad/image_2.png`,
    //   `${url}/images/Havic-Hv-G92-Gamepad/image_3.png`,
    //   `${url}/images/Havic-Hv-G92-Gamepad/image_4.png`,
    // ]

    // const product_data: {
    //   name: string
    //   rate: number
    //   reviews: number
    //   status: 'In Stock' | 'Out of Stock'
    //   price: number
    //   discount: number
    //   description: string
    //   colors: Array<string>
    //   sizes: Array<'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL'>
    //   images: Array<string>
    // } = {
    //   name: 'Havic HV G-92 Gamepad',
    //   rate: 4,
    //   reviews: 150,
    //   status: 'In Stock',
    //   price: 192,
    //   discount: 0,
    //   description:
    //     'PlayStation 5 Controller Skin High quality vinyl with air channel adhesive for easy bubble free install & mess free removal Pressure sensitive.',
    //   colors: ['#A0BCE0', '#E07575'],
    //   sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    //   images: product_images,
    // }

    // return res.status(200).json({
    //   message: 'Cart items',
    //   data: product_data,
    // })
  } else {
    return res.status(405).json({
      message: 'Method not allowed',
    })
  }
}

export default GetProductForYou
