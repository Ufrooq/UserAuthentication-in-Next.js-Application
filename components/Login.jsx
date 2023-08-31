"use client";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Login = () => {
  const router = useRouter();
  const [userData, setuserData] = useState({
    email: "",
    password: "",
  });
  const [errors, seterrors] = useState(false);

  const handleChange = (e) => {
    setuserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = userData;
    if (email == "" || password == "") {
      seterrors(true);
      return;
    }
    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      console.log(res);
      // if (!res.ok) {
      //   seterrors(true);
      //   return;
      // }
      router.replace("dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="rounded-lg border px-7 py-6 transition border-neutral-700 hover:dark:bg-neutral-800/30">
      {errors && (
        <p className="text-center text-red-600 pb-4">Invalid Credientials !</p>
      )}
      <h2 className={`my-2 text-3xl font-semibold`}>Login Form</h2>
      <p className={`m-0 mb-3 max-w-[30ch] text-md opacity-50`}>
        Enter Your details below :
      </p>
      <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
        <input
          className="px-2 py-2 bg-transparent outline-none rounded-sm border border-neutral-700 placeholder:text-neutral-600"
          placeholder="Enter Email"
          type="text"
          onChange={handleChange}
          name="email"
          id="name"
        />
        <input
          className="px-2 py-2 bg-transparent outline-none rounded-sm border border-neutral-700 placeholder:text-neutral-600"
          placeholder="Enter Password"
          type="password"
          onChange={handleChange}
          name="password"
          id="password"
        />
        <button
          type="submit"
          className="px-6 py-1 text-xl rounded-sm self-center duration-200 border border-neutral-700 bg-neutral-700 hover:bg-transparent"
        >
          Login
        </button>
      </form>
      <p className="text-md text-center mt-4 text-neutral-500">
        Do not have an account?
        <span className="font-bold text-lg text-neutral-400">
          <Link href="/register"> Register</Link>
        </span>
      </p>
    </div>
  );
};

export default Login;
