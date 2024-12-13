import PrimaryButton from '@/components/PrimaryButton'
import { Typography } from '@material-tailwind/react'
import React from 'react'

const AccountInformation: React.FC<{
  userInformation: {
    name: string
    email: string
    address: string
    phone_number: string
    current_password: string
    new_password: string
    confirm_password: string
  }
  handleChangeUserInformation: (
    // eslint-disable-next-line no-unused-vars
    e: React.ChangeEvent<HTMLInputElement>,
    // eslint-disable-next-line no-unused-vars
    key: string
  ) => void
  handleSave: () => Promise<void>
}> = ({ userInformation, handleChangeUserInformation, handleSave }) => {
  const {
    name,
    email,
    address,
    phone_number,
    current_password,
    new_password,
    confirm_password,
  } = userInformation

  return (
    <div className="w-full shadow-lg rounded-md min-h-[40vh]">
      <div className="w-[90%] lg:w-[80%] mx-auto py-6">
        <Typography
          as="h4"
          variant="p"
          className="font-semibold text-[#DB4444] text-[18px]">
          Edit Your Profile
        </Typography>
        <div className="grid grid-cols-2 gap-[20px] py-4">
          <div className="col-span-2 md:col-span-1 relative w-full max-w-[350px]">
            <label>
              <h6 className="block mb-1 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-blue-gray-900">
                Full Name
              </h6>
              <input
                name="fullname"
                placeholder="john_doe"
                value={name}
                onChange={e => handleChangeUserInformation(e, 'name')}
                className="peer w-full rounded-md px-3 py-3 font-sans text-sm font-normal bg-gray-200 text-gray-700 focus:text-black"
              />
            </label>
          </div>
          <div className="col-span-2 md:col-span-1 relative w-full max-w-[350px] ml-auto">
            <label>
              <h6 className="block mb-1 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-blue-gray-900">
                Email
              </h6>
              <input
                name="email"
                placeholder="john@gmail.com"
                value={email}
                onChange={e => handleChangeUserInformation(e, 'email')}
                className="peer w-full rounded-md px-3 py-3 font-sans text-sm font-normal bg-gray-200 text-gray-700 focus:text-black"
              />
            </label>
          </div>
          <div className="col-span-2 md:col-span-1 relative w-full max-w-[350px]">
            <label>
              <h6 className="block mb-1 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-blue-gray-900">
                Address
              </h6>
              <input
                name="address"
                placeholder="1234 Main St, Springfield, IL 62701"
                value={address}
                onChange={e => handleChangeUserInformation(e, 'address')}
                className="peer w-full rounded-md px-3 py-3 font-sans text-sm font-normal bg-gray-200 text-gray-700 focus:text-black"
              />
            </label>
          </div>
          <div className="col-span-2 md:col-span-1 relative w-full max-w-[350px] ml-auto">
            <label>
              <h6 className="block mb-1 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-blue-gray-900">
                Phone Number
              </h6>
              <input
                name="address"
                placeholder="1234 Main St, Springfield, IL 62701"
                value={phone_number}
                onChange={e => handleChangeUserInformation(e, 'phone_number')}
                className="peer w-full rounded-md px-3 py-3 font-sans text-sm font-normal bg-gray-200 text-gray-700 focus:text-black"
              />
            </label>
          </div>
          <div className="col-span-2">
            <h6 className="block mb-1 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-blue-gray-900">
              Password Changes
            </h6>
            <div className="flex space-y-4 flex-col my-4">
              <input
                name="current_password"
                placeholder="Çurrent Password"
                value={current_password}
                onChange={e =>
                  handleChangeUserInformation(e, 'current_password')
                }
                type="password"
                className="peer w-full rounded-md px-3 py-3 font-sans text-sm font-normal bg-gray-200 text-gray-700 focus:text-black"
              />
              <input
                name="new_password"
                placeholder="New Password"
                value={new_password}
                onChange={e => handleChangeUserInformation(e, 'new_password')}
                className="peer w-full rounded-md px-3 py-3 font-sans text-sm font-normal bg-gray-200 text-gray-700 focus:text-black"
              />
              <input
                name="confirm_password"
                placeholder="Confirm New Password"
                value={confirm_password}
                onChange={e =>
                  handleChangeUserInformation(e, 'confirm_password')
                }
                className="peer w-full rounded-md px-3 py-3 font-sans text-sm font-normal bg-gray-200 text-gray-700 focus:text-black"
              />
            </div>
          </div>
        </div>
        <div className="w-fit ml-auto flex space-x-4 my-4">
          <div onClick={handleSave}>
            <PrimaryButton
              title="Save Changes"
              className="!py-4 lg:min-w-[250px]"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default AccountInformation
