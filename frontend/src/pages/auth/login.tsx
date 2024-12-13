import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Typography } from '@material-tailwind/react'
import Head from 'next/head'
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import { getCsrfToken } from 'next-auth/react'
import { toast } from 'react-toastify'
import NavbarWithMegaMenu from '@/components/Navbar/Navbar'
import Footer from '@/components/Footer/Footer'
import SidebarImage from 'public/images/login_side_picture.png'

const Login = ({
  csrfToken,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [callBackURL, setCallBackURL] = useState('')

  useEffect(() => {
    const callbackurl =
      window && new URLSearchParams(window.location.search).get('callbackUrl')
    const error =
      window && new URLSearchParams(window.location.search).get('error')
    if (error) {
      toast.error('Invalid credentials, please try again')
    }
    setCallBackURL(callbackurl || '/')
  }, [])

  return (
    <>
      <MetaTags />
      <div>
        <NavbarWithMegaMenu />
        <main>
          <div className="grid grid-cols-12 mt-[40px] mb-[80px]">
            <div className="hidden lg:block col-span-6">
              <Image
                src={SidebarImage}
                alt="sidebar"
                width={600}
                height={400}
              />
            </div>
            <div className="col-span-12 lg:col-span-6 w-[80%] mx-auto lg:w-full lg:mx-0">
              <header className="flex items-center justify-start mx-auto flex-wrap">
                <Typography as="h4" variant="h4" className="cursor-pointer">
                  Login to
                  <Link href="/"> Exclusive</Link>
                </Typography>
              </header>
              <Typography as="p" variant="paragraph" className="py-2">
                Enter your details below
              </Typography>
              <form
                name="Credentials"
                className="max-w-screen-lg mt-4 mb-2 w-80 sm:w-96"
                method="post"
                action="/api/auth/callback/credentials">
                <input
                  name="csrfToken"
                  type="hidden"
                  defaultValue={csrfToken}
                />
                <div className="flex flex-col gap-6 mb-1">
                  <div className="relative w-full min-w-[200px]">
                    <label>
                      <h6 className="block mb-1 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-blue-gray-900">
                        Email
                      </h6>
                      <input
                        name="username"
                        placeholder="john_doe"
                        className="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent !border-t-blue-gray-200 bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                      />
                    </label>
                  </div>

                  <div className="relative w-full min-w-[200px]">
                    <label className="">
                      <h6 className="block mb-1 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-blue-gray-900">
                        Password
                      </h6>
                      <input
                        name="password"
                        autoComplete="new-password"
                        type="password"
                        placeholder="********"
                        className="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent !border-t-blue-gray-200 bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                      />
                    </label>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-6 items-center mt-6">
                  <button
                    className="block w-full select-none rounded-lg bg-[#DB4444] py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                    type="submit">
                    Log in
                  </button>
                  <Typography
                    as="p"
                    variant="paragraph"
                    className="text-center text-[#DB4444]">
                    Forgot password?
                  </Typography>
                </div>
                <p className="block mt-4 font-sans text-base antialiased font-normal leading-relaxed text-center text-gray-700">
                  Not registered? &nbsp;
                  <Link
                    href={`/auth/sign-up?callbackUrl=${encodeURIComponent(
                      callBackURL
                    )}`}
                    className="underline text-[#DB4444] font-bold">
                    Create account
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  )
}

const MetaTags = () => {
  return (
    <Head>
      <title>Hàng Việt Tại Úc - Mua bán sản phẩm yêu thích của bạn</title>
      <meta
        name="description"
        content="Trang web trao đổi mua bán hàng hóa uy tín tại Úc, cung cấp các sản phẩm chất lượng với giá cả cạnh tranh, đảm bảo giao dịch an toàn và nhanh chóng."
      />
      <meta
        name="keywords"
        content="mua bán hàng hóa, trao đổi hàng hóa, mua bán online, trang web mua bán tại Úc, sản phẩm chất lượng, giá rẻ, giao dịch an toàn"
      />
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta charSet="utf-8" />
      <meta
        property="og:title"
        content="Trang web trao đổi mua bán hàng hóa tại Úc"
      />
      <meta
        property="og:description"
        content="Cung cấp các sản phẩm chất lượng với giá cả cạnh tranh, đảm bảo giao dịch an toàn và nhanh chóng tại Úc."
      />
      <meta property="og:sitename" content="HangVietTaiUc" />
      <meta property="og:url" content="https://hangviettaiuc.com.vn/" />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="en_US" />
      <meta property="og:updated_time" content="2024-06-20T02:08:26+00:00" />
      <meta
        property="og:image"
        content={`${process.env.NEXT_PUBLIC_REDIRECT_URI}/social_image_homepage.jpg`}
      />
      <meta
        property="og:image:secure_url"
        content={`${process.env.NEXT_PUBLIC_REDIRECT_URI}/social_image_homepage.jpg`}
      />
      <meta property="og:image:width" content="900" />
      <meta property="og:image:height" content="900" />
      <meta property="og:image:alt" content="Trao đổi hàng hóa Việt Nam - Úc" />
      <meta property="og:image:type" content="image/jpeg" />
      <meta
        property="article:published_time"
        content="2024-06-01T08:07:31+00:00"
      />
      <meta
        property="article:modified_time"
        content="2024-06-22T02:08:26+00:00"
      />
      <meta name="twitter:card" content="summary_large_image" />
      <meta
        name="twitter:title"
        content="Trang web trao đổi mua bán hàng hóa tại Úc"
      />
      <meta
        name="twitter:description"
        content="Cung cấp các sản phẩm chất lượng với giá cả cạnh tranh, đảm bảo giao dịch an toàn và nhanh chóng tại Úc."
      />
      <meta
        name="twitter:image"
        content={`${process.env.NEXT_PUBLIC_REDIRECT_URI}/social_image_homepage.jpg`}
      />
      <meta name="twitter:label1" content="Written by" />
      <meta name="twitter:data1" content="Academic Team" />
      <meta name="twitter:label2" content="Time to read" />
      <meta name="twitter:data2" content="2 minutes" />
      <link rel="icon" href="/logo.svg" />
    </Head>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  }
}

export default Login
