import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  message: string
}

type response = {
  data: any
  message: string
  statusCode: number
  success: boolean
}

const SignUp = async (
  req: NextApiRequest,
  res: NextApiResponse<Data | response>
) => {
  if (req.method === 'POST') {
    const { email, password, confirm_password } = req.body

    if (password !== confirm_password) {
      res.status(400).json({
        message: 'Passwords do not match',
        statusCode: 400,
      })
    }

    const endpoint = `${process.env.BACKEND_URL}/register`

    const data = {
      email,
      password,
    }

    const response = await fetch(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const responseData: response = await response.json()

    return res.status(response.status).json(responseData)
    // res.status(405).json({ message: "Method Not Allowed" });
  } else {
    // Handle any other HTTP method
    res.status(405).json({ message: 'Method Not Allowed' })
  }
}

export default SignUp
