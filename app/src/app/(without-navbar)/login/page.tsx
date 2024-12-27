"use client";

import ErrorNotif from "@/components/ErrorNotif";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ChangeEvent, FormEvent, Suspense, useState } from "react";
import { submitLogin } from "@/action";

export default function Login() {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setInput({
      ...input,
      [name]: value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/login`, {
      method: "POST",
      body: JSON.stringify(input),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const response = await res.json();
    if (!res.ok) {
      return router.push(`/login?error=${response.message}`);
    }

    await submitLogin();
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#f5f5f5]">
      <div className="bg-white shadow-md rounded-md p-5 w-full max-w-[500px]">
        <div className="width-full mx-auto max-h-[60px] max-w-[200px] my-8">
          <img
            alt="Undefeated Store Logo"
            id="shop-logo"
            src="https://undefeated.com/cdn/shop/t/92/assets/logo-combo.png?v=180616989015755798321731078717"
          />
        </div>
        <h2 className="font-semibold text-gray-700 mb-2 text-2xl">Log in</h2>
        <p className="text-sm text-gray-500 mb-6">
          Enter your email and we&apos;ll send you a login code
        </p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="sr-only">
              Email
            </label>
            <input
              name="email"
              type="email"
              id="email"
              value={input.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-4 py-2 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
              placeholder="Email"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <input
              name="password"
              type="password"
              id="password"
              value={input.password}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-4 py-2 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
              placeholder="Password"
            />
          </div>
          <Suspense>
            <ErrorNotif />
          </Suspense>
          <button
            type="submit"
            className="w-full bg-[#1878B9] text-white py-2 rounded-md font-medium hover:bg-[#0a466f] transition duration-200"
          >
            Continue
          </button>
        </form>
        <div className="mt-4 text-sm text-gray-500">
          Don&apos;t have an account?
          <Link href="/register">
            <span className="ml-1 text-blue-500 hover:underline cursor-pointer">
              Sign Up
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
