import type { NextApiRequest, NextApiResponse } from 'next'

const GetTags = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  if (req.method == 'GET') {
    try {
      const response = await fetch(`${process.env.BACKEND_URL}/tags`, {
        method: 'GET',
      })
      const data = await response.json()
      const tagData = data.data.map(
        (tag: {
          id: number
          name: string

          description: string
        }) => {
          return {
            id: tag.id,
            title: tag.name,
            description: tag.description,
          }
        }
      )
      return res.status(200).json(tagData)
    } catch (error) {
      console.log(error)
    }
  } else {
    return res.status(405).json({
      message: 'Method not allowed',
    })
  }
}

export default GetTags
