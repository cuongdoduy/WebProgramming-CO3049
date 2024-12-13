import Footer from '@/components/Footer/Footer'
import NavbarWithMegaMenu from '@/components/Navbar/Navbar'
import { Breadcrumbs, Typography } from '@material-tailwind/react'
import React, { Fragment } from 'react'
import AccountInformation from '@/page-sections/AdminPage/AccountInformation'
import OrderHistory from '@/page-sections/AccountPage/OrderHistory'
import { GetStaticPaths, GetStaticProps } from 'next'
import Link from 'next/link'
const AccountNavigation: Array<string> = [
  'Account Information',
  'Order History',
]

const Account: React.FC<{
  data: {
    userInformation: {
      id: number
      name: string
      email: string
      address: string
      phone_number: string,
      status: string
    }
    orderHistory: Array<{
      id: number
      date: string
      price: number
      status: string
    }>
  }
}> = ({ data }) => {
  const { userInformation, orderHistory } = data
  const [activeTab, setActiveTab] = React.useState(0)
  return (
    <Fragment>
      <NavbarWithMegaMenu />
      <div className="w-[80%] mx-auto my-12">
        <Breadcrumbs className="bg-white p-0">
          <Link href="/admin" className="opacity-60">
            Home
          </Link>
          <Link href="/admin/users">User List</Link>
          <Link href="#" className="text-[#DB4444]">
            Customer Information
          </Link>
        </Breadcrumbs>
        <div className="grid grid-cols-12 gap-x-4 my-12">
          <div className="col-span-3">
            <div className="flex flex-col items-start">
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
          <div className="col-span-9">
            {activeTab === 0 && (
              <AccountInformation userInformation={userInformation} />
            )}
            {activeTab === 1 && <OrderHistory data={orderHistory} />}
          </div>
        </div>
      </div>
      <Footer />
    </Fragment>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch(`${process.env.BACKEND_URL}/customers`)
  const data = await res.json()
  const paths = data.data.map((customer: any) => ({
    params: { id: customer.id },
  }))
  return {
    paths: paths,
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const id = params?.id
  const [user, orders] = await Promise.all([
    fetch(`${process.env.BACKEND_URL}/customers/${id}`),
    fetch(`${process.env.BACKEND_URL}/customers/${id}/orders`),
  ])
  const userData = await user.json()
  const orderHistory = await orders.json()

  const data = {
    userInformation: userData.data,
    orderHistory: orderHistory.data.map(
      (order: {
        order_id: number
        status: string
        total_price: number
        created_at: string
      }) => {
        return {
          id: order.order_id,
          status: order.status,
          date: new Date(order.created_at).toLocaleDateString('en-GB'),
          price: order.total_price,
        }
      }
    ),
  }

  return {
    props: { data },
    revalidate: 60,
  }
}

export default Account
