import Footer from '@/components/Footer/Footer'
import NavbarWithMegaMenu from '@/components/Navbar/Navbar'
import { Breadcrumbs, Typography } from '@material-tailwind/react'
import React, { Fragment, useEffect } from 'react'
import AccountInformation from '@/page-sections/AccountPage/AccountInformation'
import OrderHistory from '@/page-sections/AccountPage/OrderHistory'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
const AccountNavigation: Array<string> = [
  'Account Information',
  'Order History',
]

const Account: React.FC = () => {
  const { data: session } = useSession()
  const [activeTab, setActiveTab] = React.useState(0)
  const [orderHistory, setOrderHistory] = React.useState<
    Array<{
      id: number
      date: string
      price: number
      status: string
    }>
  >([])
  const [userInformation, setUserInformation] = React.useState({
    id: 0,
    name: '',
    email: '',
    address: '',
    phone_number: '',
    current_password: '',
    new_password: '',
    confirm_password: '',
  })

  useEffect(() => {
    if (!session || !session.user || !session.user.id) return
    const fetchData = async (customer_id: number) => {
      const [user, orders] = await Promise.all([
        fetch(`/api/customers/${customer_id}`),
        fetch(`/api/customers/${customer_id}/orders`),
      ])
      const userData = await user.json()
      const orderHistory = await orders.json()
      setOrderHistory(orderHistory)
      setUserInformation(prev => ({
        ...prev,
        ...userData,
      }))
    }
    fetchData(session.user.id)
  }, [session])

  const handleChangeUserInformation = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: string
  ) => {
    const { value } = e.target
    setUserInformation(prev => ({
      ...prev,
      [key]: value,
    }))
  }

  const handleSave = async () => {
    if (!session || !session.user || !session.user.id) return
    const res = await fetch(`/api/customers/${session.user.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: userInformation.name,
        email: userInformation.email,
        address: userInformation.address,
        phone: userInformation.phone_number,
      }),
    })
    if (res.ok) {
      alert('User information updated successfully')
    }

    if (
      userInformation.current_password.length > 0 &&
      userInformation.new_password === userInformation.confirm_password
    ) {
      const res = await fetch(`/api/customers/${session.user.id}/password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          current_password: userInformation.current_password,
          new_password: userInformation.new_password,
          confirm_password: userInformation.confirm_password,
        }),
      })
      const data = await res.json()
      if (res.ok) {
        alert('Password updated successfully')
      } else {
        alert(data.message)
      }
    }
    setUserInformation(prev => ({
      ...prev,
      current_password: '',
      new_password: '',
      confirm_password: '',
    }))
  }

  return (
    <Fragment>
      <NavbarWithMegaMenu />
      <div className="w-[80%] mx-auto my-12">
        <Breadcrumbs className="bg-white p-0">
          <Link href="/" className="opacity-60">
            Home
          </Link>
          <Link href="#">My Account</Link>
        </Breadcrumbs>
        <div className="grid grid-cols-12 gap-x-4 my-12">
          <div className="col-span-12 lg:col-span-3">
            <div className="flex justify-between lg:flex-col lg:items-start">
              {AccountNavigation.map((nav, index) => (
                <Typography
                  as="h4"
                  variant="p"
                  href="#"
                  key={index}
                  onClick={() => setActiveTab(index)}
                  className={`py-1 ${
                    activeTab === index
                      ? 'text-[#DB4444] font-semibold cursor-pointer'
                      : 'text-[#666] cursor-pointer'
                  }`}>
                  {nav}
                </Typography>
              ))}
            </div>
          </div>
          <div className="col-span-12 lg:col-span-9">
            {activeTab === 0 && (
              <AccountInformation
                userInformation={userInformation}
                handleChangeUserInformation={handleChangeUserInformation}
                handleSave={handleSave}
              />
            )}
            {activeTab === 1 && <OrderHistory data={orderHistory} />}
          </div>
        </div>
      </div>
      <Footer />
    </Fragment>
  )
}

export default Account
