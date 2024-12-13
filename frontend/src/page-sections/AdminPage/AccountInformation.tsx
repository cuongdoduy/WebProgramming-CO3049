import PrimaryButton from '@/components/PrimaryButton'
import { Button, Typography } from '@material-tailwind/react'
import React from 'react'

const AccountInformation: React.FC<{
  userInformation: {
    id: number
    name: string
    email: string
    address: string
    phone_number: string
    status: string
  }
}> = ({ userInformation }) => {
  const { id, name, email, address, phone_number, status } = userInformation

  const [userStatus, setUserStatus] = React.useState(status)

  const handleSaveChange = async () => {
    if (userStatus === status) return
    const res = await fetch(`/api/customers/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const data = await res.json()
    console.log(data)
  }

  return (
    <div className="w-full shadow-lg rounded-md min-h-[40vh]">
      <div className="w-[80%] mx-auto py-6">
        <Typography
          as="h4"
          variant="p"
          className="font-semibold text-[#DB4444] text-[18px]">
          Customer Profile
        </Typography>
        <div className="grid grid-cols-2 gap-[20px] py-4">
          <div className="relative w-full max-w-[350px]">
            <label>
              <h6 className="block mb-1 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-blue-gray-900">
                Full Name
              </h6>
              <input
                name="fullname"
                placeholder="john_doe"
                value={name}
                disabled
                className="peer w-full rounded-md px-3 py-3 font-sans text-sm font-normal bg-gray-200 text-gray-700 focus:text-black"
              />
            </label>
          </div>
          <div className="relative w-full max-w-[350px] ml-auto">
            <label>
              <h6 className="block mb-1 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-blue-gray-900">
                Email
              </h6>
              <input
                name="email"
                placeholder="john@gmail.com"
                value={email}
                disabled
                className="peer w-full rounded-md px-3 py-3 font-sans text-sm font-normal bg-gray-200 text-gray-700 focus:text-black"
              />
            </label>
          </div>
          <div className="relative w-full max-w-[350px]">
            <label>
              <h6 className="block mb-1 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-blue-gray-900">
                Address
              </h6>
              <input
                name="address"
                placeholder="1234 Main St, Springfield, IL 62701"
                value={address}
                disabled
                className="peer w-full rounded-md px-3 py-3 font-sans text-sm font-normal bg-gray-200 text-gray-700 focus:text-black"
              />
            </label>
          </div>
          <div className="relative w-full max-w-[350px] ml-auto">
            <label>
              <h6 className="block mb-1 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-blue-gray-900">
                Phone Number
              </h6>
              <input
                name="address"
                placeholder="1234 Main St, Springfield, IL 62701"
                value={phone_number}
                disabled
                className="peer w-full rounded-md px-3 py-3 font-sans text-sm font-normal bg-gray-200 text-gray-700 focus:text-black"
              />
            </label>
          </div>
          <div className="relative w-full max-w-[350px] ml-auto">
            <label>
              <h6 className="block mb-1 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-blue-gray-900">
                Status
              </h6>
              <select
                name="status"
                value={userStatus}
                onChange={e => setUserStatus(e.target.value)}
                className="peer w-full rounded-md px-3 py-3 font-sans text-sm font-normal bg-gray-200 text-gray-700 focus:text-black">
                <option value="Active">Active</option>
                <option value="Deleted">Inactive</option>
              </select>
            </label>
          </div>
        </div>
        <div className="w-fit ml-auto flex space-x-4 my-4">
          <Button className="!py-4 min-w-[250px] bg-white shadow-none text-black hover:shadow-none">
            {' '}
            Cancel{' '}
          </Button>
          <div onClick={handleSaveChange}>
            <PrimaryButton
              title="Save Changes"
              className="!py-4 min-w-[250px]"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default AccountInformation
