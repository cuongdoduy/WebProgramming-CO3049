import type { NextApiRequest, NextApiResponse } from 'next'

const UserPassword = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  if (req.method == 'POST') {
    try {
      const { id } = req.query
      const { current_password, new_password, confirm_password } = req.body
      const response = await fetch(
        `${process.env.BACKEND_URL}/customers/${id}/password`,
        {
          method: 'POST',
          body: JSON.stringify({
            old_password: current_password,
            new_password: new_password,
            confirm_password: confirm_password,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
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

export default UserPassword
