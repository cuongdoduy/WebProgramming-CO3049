import React, { useContext } from 'react'
import {
  Navbar,
  Collapse,
  Typography,
  IconButton,
  List,
  ListItem,
} from '@material-tailwind/react'
import {
  Bars3Icon,
  HeartIcon,
  ShoppingBagIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import Link from 'next/link'
import { WishlistContext } from '@/contexts/WishlistContext'
import { CartContext } from '@/contexts/CartContext'
import { signOut, useSession } from 'next-auth/react'
import ProfileMenu from '../UserMenu'

const NavList = () => {
  const { data: session } = useSession()
  return (
    <List className="lg:mt-4 lg:mb-6 p-0 lg:mt-0 lg:mb-0 lg:flex-row lg:p-1">
      <Link href={'/'} className="m-0">
        <Typography variant="h6" color="blue-gray" className="font-medium">
          <ListItem className="flex items-center gap-2 py-2 px-8">
            Home
          </ListItem>
        </Typography>
      </Link>
      <Link href={'/products'} className="m-0">
        <Typography variant="h6" color="blue-gray" className="font-medium">
          <ListItem className="flex items-center gap-2 py-2 px-8">
            Products
          </ListItem>
        </Typography>
      </Link>
      <Link href={'/about'} className="m-0">
        <Typography variant="h6" color="blue-gray" className="font-medium">
          <ListItem className="flex items-center gap-2 py-2 px-8">
            About
          </ListItem>
        </Typography>
      </Link>
      {/* <NavListMenu /> */}
      <Link href={'/contact'} className="m-0">
        <Typography variant="h6" color="blue-gray" className="font-medium">
          <ListItem className="flex items-center gap-2 py-2 px-8">
            Contact
          </ListItem>
        </Typography>
      </Link>
      {!session && (
        <Link href={'/auth/login'} className="m-0">
          <Typography variant="h6" color="blue-gray" className="font-medium">
            <ListItem className="flex items-center gap-2 py-2 px-8">
              Sign Up
            </ListItem>
          </Typography>
        </Link>
      )}
    </List>
  )
}

const NavbarWithMegaMenu = () => {
  const [openNav, setOpenNav] = React.useState(false)
  const { data: session } = useSession()
  React.useEffect(() => {
    window.addEventListener(
      'resize',
      () => window.innerWidth >= 960 && setOpenNav(false)
    )
  }, [])

  const { totalItems } = useContext(WishlistContext) || {
    totalItems: () => 0,
  }

  const { totalItems: totalCartItems } = useContext(CartContext) || {
    totalItems: () => 0,
  }

  return (
    <Navbar className="mx-auto w-full mx-0 py-2 max-w-full rounded-b-none shadow-none px-0">
      <div className="flex items-center justify-between text-blue-gray-900 w-[90%] mx-auto mt-4 mb-2">
        <Typography
          as="a"
          href="#"
          variant="h5"
          className="mr-4 cursor-pointer py-1.5 lg:ml-2 uppercase font-bold">
          Exclusive
        </Typography>
        <div className="hidden lg:block">
          <NavList />
        </div>
        <div className="hidden gap-2 lg:flex items-center">
          <form className="max-w-md mx-auto flex border border-gray-300 rounded-md bg-gray-50 p-1">
            <div className="relative bg-gray-50 ml-2 py-2 mr-1">
              <input
                type="search"
                id="default-search"
                className="block w-full text-sm bg-gray-50 focus:outline-none min-w-[190px]"
                placeholder="What are you looking for ?"
                required
              />
            </div>
            <button
              type="submit"
              className="font-medium rounded-lg text-sm mr-2 py-2">
              <div className="flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20">
                  <path
                    color="black"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
            </button>
          </form>
          <Link href={'/wishlist'} className="m-0">
            <div className="flex justify-center flex-col ml-2 items-center h-full relative">
              <HeartIcon className="h-6 w-6" strokeWidth={2} />
              <div className="absolute -top-2 -right-2 bg-[#DB4444] text-white rounded-full w-5 h-5 flex items-center justify-center">
                {totalItems()}
              </div>
            </div>
          </Link>
          <Link href={'/cart'} className="m-0">
            <div className="flex justify-center flex-col ml-2 items-center h-full relative">
              <ShoppingBagIcon className="h-6 w-6" strokeWidth={2} />
              <div className="absolute -top-2 -right-2 bg-[#DB4444] text-white rounded-full w-5 h-5 flex items-center justify-center">
                {totalCartItems()}
              </div>
            </div>
          </Link>
          {session && <ProfileMenu />}
        </div>
        <IconButton
          variant="text"
          color="blue-gray"
          className="lg:hidden"
          onClick={() => setOpenNav(!openNav)}>
          {openNav ? (
            <XMarkIcon className="h-6 w-6" strokeWidth={2} />
          ) : (
            <Bars3Icon className="h-6 w-6" strokeWidth={2} />
          )}
        </IconButton>
      </div>
      <Collapse open={openNav}>
        <NavList />
        {/* <hr className="my-2 border border-gray-400" /> */}
        <div className="flex w-full flex-col items-start space-y-1 lg:hidden">
          {session && (
            <>
              <Link href={'/account'} className="m-0">
                <Typography
                  variant="h6"
                  color="blue-gray"
                  className="font-medium">
                  <ListItem className="flex items-center gap-2 py-2 px-8">
                    Account
                  </ListItem>
                </Typography>
              </Link>
              <button
                onClick={() =>
                  signOut({
                    callbackUrl: '/',
                  })
                }>
                <Typography
                  variant="h6"
                  color="blue-gray"
                  className="font-medium">
                  <ListItem className="flex items-center gap-2 py-2 px-8">
                    Log out
                  </ListItem>
                </Typography>
              </button>
            </>
          )}
        </div>
      </Collapse>
      <hr className="my-2 border border-gray-400" />
    </Navbar>
  )
}

export default NavbarWithMegaMenu
