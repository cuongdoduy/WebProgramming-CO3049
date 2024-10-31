import Footer from '@/components/Footer/Footer'
import NavbarWithMegaMenu from '@/components/Navbar/Navbar'
import React, { Fragment } from 'react'

const Home: React.FC = () => {
  return (
    <Fragment>
      <main>
        <NavbarWithMegaMenu />
        <h1 className="my-6 text-1xl text-center font-bold text-gray-900 sm:text-1xl md:text-2xl min-h-screen">
          Welcome to Inventory Master Home 🏆
        </h1>
        <Footer />
      </main>
    </Fragment>
  )
}

export default Home
