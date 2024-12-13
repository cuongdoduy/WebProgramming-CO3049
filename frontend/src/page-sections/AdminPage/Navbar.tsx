import React from 'react'
import {
  Navbar,
  Collapse,
  Typography,
  Button,
  IconButton,
} from '@material-tailwind/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { useSession } from 'next-auth/react'
import ProfileMenu from '@/components/UserMenu'

const NavbarWithMegaMenu = () => {
  const [openNav, setOpenNav] = React.useState(false)
  const { data: session } = useSession()
  React.useEffect(() => {
    window.addEventListener(
      'resize',
      () => window.innerWidth >= 960 && setOpenNav(false)
    )
  }, [])

  return (
    <Navbar className="mx-auto w-full mx-0 py-2 max-w-full rounded-b-none shadow-none px-0">
      <div className="flex items-center justify-between text-blue-gray-900 w-[90%] mx-auto mt-4 mb-2">
        <Typography
          as="a"
          href="/admin"
          variant="h5"
          className="mr-4 cursor-pointer py-1.5 lg:ml-2 uppercase font-bold">
          Exclusive
        </Typography>
        <div className="hidden gap-2 lg:flex items-center">
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
        <div className="flex w-full flex-nowrap items-center gap-2 lg:hidden">
          <Button variant="outlined" size="sm" color="blue-gray" fullWidth>
            Log In
          </Button>
          <Button variant="gradient" size="sm" fullWidth>
            Sign In
          </Button>
        </div>
      </Collapse>
      <hr className="my-2 border border-gray-400" />
    </Navbar>
  )
}

export default NavbarWithMegaMenu
