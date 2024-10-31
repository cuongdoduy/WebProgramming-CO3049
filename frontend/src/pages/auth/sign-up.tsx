import React from "react";
import Image from "next/image";
import Logo from "public/logo.svg";
import Link from "next/link";
import Head from "next/head";
import { signIn } from "next-auth/react";
import { set, useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import ErrorMessage from "@/components/Form/ErrorMessage";
import { toast, ToastContainer } from "react-toastify";

const Signup = () => {
  const formSchema = z
    .object({
      username: z
        .string()
        .min(3, {
          message: "Username must be at least 3 characters long",
        })
        .max(20, {
          message: "Username must be at most 20 characters long",
        }),
      email: z.string().email({
        message: "Invalid email address",
      }),
      password: z
        .string()
        .min(6, {
          message: "Password must be at least 6 characters long",
        })
        .max(100, {
          message: "Password must be at most 100 characters long",
        }),
      confirm_password: z.string().min(0).max(100),
    })
    .refine((data) => data.password === data.confirm_password, {
      message: "Passwords do not match",
      path: ["confirm_password"],
    });

  type UserFormValues = z.infer<typeof formSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormValues>({
    resolver: zodResolver(formSchema),
    mode: "all",
    reValidateMode: "onChange",
  });

  const onSubmit = async (data: UserFormValues) => {
    const { username, email, password, confirm_password } = data;
    const res = await fetch("/api/sign-up", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password, confirm_password }),
    });
    const response = await res.json();
    if (response.statusCode === 200) {
      toast.success(response.message);
      setTimeout(() => {
        signIn("credentials", {
          username,
          password,
          callbackUrl: "/",
        });
      }, 2000);
    } else {
      toast.error(response.message);
    }
  };

  return (
    <>
      <MetaTags />
      <main className="relative">
        <div className="bg-[#F7F7F7]">
          <div className="grid place-items-center">
            <div className="w-fit grid place-items-center mb-[80px] mt-[20px]">
              <header className="flex items-center justify-start flex-wrap">
                <h4 className="text-h4 font-bold mr-4 text-center">
                  Sign up to
                </h4>
                <Link href="/">
                  <Image src={Logo} alt="logo" priority />
                </Link>
              </header>
              <p className="text-body text-center">
                We provide detailed information about suppliers and distributors
              </p>
              <div className="flex items-center justify-between p-[40px] bg-white rounded-lg max-w-[500px] my-[20px]">
                <div className="relative flex flex-col text-gray-700 bg-white shadow-none rounded-xl bg-clip-border">
                  <form
                    className="max-w-screen-lg mb-2 w-80 sm:w-96"
                    method="POST"
                    action="/api/sign-up"
                    onSubmit={handleSubmit(onSubmit)}
                  >
                    <div className="flex flex-col gap-6 mb-1">
                      <h6 className="block -mb-3 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-blue-gray-900">
                        Username
                      </h6>
                      <div className="relative h-[60px] w-full min-w-[200px]">
                        <input
                          placeholder="john_doe"
                          {...register("username")}
                          className="peer h-11 w-full rounded-md border border-blue-gray-200 border-t-transparent !border-t-blue-gray-200 bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                        />
                        <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all before:content-none after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all after:content-none peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"></label>
                        {errors.username?.message && (
                          <ErrorMessage message={errors.username.message} />
                        )}
                      </div>
                      <h6 className="block -mb-3 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-blue-gray-900">
                        Email Address
                      </h6>
                      <div className="relative h-[60px] w-full min-w-[200px]">
                        <input
                          {...register("email")}
                          placeholder="name@mail.com"
                          autoComplete="email"
                          className="peer h-11 w-full rounded-md border border-blue-gray-200 border-t-transparent !border-t-blue-gray-200 bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                        />
                        <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all before:content-none after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all after:content-none peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"></label>
                        {errors.email?.message && (
                          <ErrorMessage message={errors.email.message} />
                        )}
                      </div>
                      <h6 className="block -mb-3 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-blue-gray-900">
                        Password
                      </h6>
                      <div className="relative h-[60px] w-full min-w-[200px]">
                        <input
                          {...register("password")}
                          autoComplete="new-password"
                          type="password"
                          placeholder="********"
                          className="peer h-11 w-full rounded-md border border-blue-gray-200 border-t-transparent !border-t-blue-gray-200 bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                        />
                        <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all before:content-none after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all after:content-none peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"></label>
                        {errors.password?.message && (
                          <ErrorMessage message={errors.password.message} />
                        )}
                      </div>
                      <h6 className="block -mb-3 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-blue-gray-900">
                        Confirm Password
                      </h6>
                      <div className="relative h-[60px] w-full min-w-[200px]">
                        <input
                          {...register("confirm_password")}
                          type="password"
                          autoComplete="new-password"
                          placeholder="********"
                          className="peer h-11 w-full rounded-md border border-blue-gray-200 border-t-transparent !border-t-blue-gray-200 bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                        />
                        <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all before:content-none after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all after:content-none peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"></label>
                        {errors.confirm_password?.message && (
                          <ErrorMessage
                            message={errors.confirm_password.message}
                          />
                        )}
                      </div>
                    </div>
                    <div className="inline-flex items-center mt-2">
                      <label
                        className="relative -ml-2.5 flex cursor-pointer items-center rounded-full p-3"
                        htmlFor="remember"
                      >
                        <input
                          type="checkbox"
                          className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-gray-900 checked:bg-gray-900 checked:before:bg-gray-900 hover:before:opacity-10"
                          id="remember"
                        />
                        <span className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-3.5 w-3.5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            stroke="currentColor"
                            strokeWidth="1"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                        </span>
                      </label>
                      <label
                        className="mt-px font-light text-gray-700 cursor-pointer select-none"
                        htmlFor="remember"
                      >
                        <p className="flex items-center font-sans text-sm antialiased font-normal leading-normal text-gray-700">
                          I agree the
                          <a
                            href="#"
                            className="font-medium transition-colors hover:text-gray-900"
                          >
                            &nbsp;Terms and Conditions
                          </a>
                        </p>
                      </label>
                    </div>
                    <button
                      className="mt-6 block w-full select-none rounded-lg bg-primary py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                      type="submit"
                    >
                      sign up
                    </button>
                    <div className="block mt-4 font-sans text-base antialiased font-normal leading-relaxed text-center text-gray-700">
                      Already have an account? &nbsp;
                      <div
                        className="font-bold text-primary underline cursor-pointer"
                        onClick={() => signIn()}
                      >
                        Sign In
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer />
      </main>
    </>
  );
};

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
  );
};

export default Signup;
