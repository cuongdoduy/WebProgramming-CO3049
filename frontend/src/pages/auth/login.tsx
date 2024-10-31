import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Logo from 'public/logo.svg'
import Link from 'next/link'
import { Button } from '@material-tailwind/react'
import GoogleLogo from 'public/images/google.png'
import Head from 'next/head'
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import { getCsrfToken } from 'next-auth/react'
import { signIn } from 'next-auth/react'
import { toast, ToastContainer } from 'react-toastify'

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
      <main className="bg-[#F7F7F7] fixed top-0 bottom-0 left-0 right-0">
        <div className="absolute top-[50%] -translate-y-[50%] left-[50%] -translate-x-[50%]">
          <header className="flex items-center justify-start w-[70%] mx-auto flex-wrap">
            <h4 className="text-h4 font-bold mr-4">Login to</h4>
            <Link href="/">
              <Image src={Logo} alt="logo" priority />
            </Link>
          </header>
          <p className="text-body text-center">
            We provide detailed information about suppliers and distributors
          </p>
          <div className="flex items-center justify-between p-[40px] bg-white rounded-lg max-w-[500px] my-8">
            <div className="relative flex flex-col text-gray-700 bg-white shadow-none rounded-xl bg-clip-border">
              <Button
                variant="outlined"
                size="lg"
                className="mt-6 flex h-12 items-center justify-center gap-2 border-[#0000000F]"
                fullWidth
                onClick={async () =>
                  await signIn('google', {
                    callbackUrl: `${callBackURL}`,
                  })
                }>
                <Image src={GoogleLogo} alt="google" className="h-6 w-6" />{' '}
                Continue with google
              </Button>
              <hr className="my-6 border border-gray-200" />
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
                    <label className="">
                      <h6 className="block mb-1 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-blue-gray-900">
                        Username
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

                <button
                  className="mt-6 block w-full select-none rounded-lg bg-primary py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                  type="submit">
                  Log in
                </button>
                <p className="block mt-4 font-sans text-base antialiased font-normal leading-relaxed text-center text-gray-700">
                  Not registered? &nbsp;
                  <Link
                    href={`/auth/sign-up?callbackUrl=${encodeURIComponent(
                      callBackURL
                    )}`}
                    className="text-gray-900 underline text-primary font-bold">
                    Create account
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
        <ToastContainer />
      </main>
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
