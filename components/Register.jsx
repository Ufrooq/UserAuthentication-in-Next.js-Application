"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Register = () => {
  const router = useRouter();
  const [userData, setuserData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errors, seterrors] = useState(false);
  const [errorMessage, seterrorMessage] = useState(false);

  const handleChange = (e) => {
    setuserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = userData;
    if (name == "" || email == "" || password == "") {
      seterrors(true);
      seterrorMessage("Invalid Credientials!");
      return;
    }
    try {
      const response = await fetch("api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        seterrors(false);
        e.target.reset();
        router.push("/");
      } else {
        seterrorMessage(data.formattedErrorMessage.email);
      }
    } catch (error) {
      seterrorMessage("Unexpected Error occured !");
    }
  };
  return (
    <div className="rounded-lg border px-7 py-6 transition border-neutral-700 hover:dark:bg-neutral-800/30">
      {errors && (
        <p className="text-center text-red-600 pb-4">{errorMessage}</p>
      )}
      <h2 className={`my-2 text-3xl font-semibold`}>Registration Form</h2>
      <p className={`m-0 mb-3 max-w-[30ch] text-md opacity-50`}>
        Enter Your details below :
      </p>
      <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
        <input
          className="px-2 py-2 bg-transparent outline-none rounded-sm border border-neutral-700 placeholder:text-neutral-600"
          placeholder="Enter fullname"
          type="text"
          onChange={handleChange}
          name="name"
          id="name"
        />
        <input
          className="px-2 py-2 bg-transparent outline-none rounded-sm border border-neutral-700 placeholder:text-neutral-600"
          placeholder="Enter Email"
          type="text"
          onChange={handleChange}
          name="email"
          id="email"
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
          Register
        </button>
      </form>
      <p className="text-md mt-4 text-center text-neutral-500">
        Already have an account?
        <span className="font-bold text-lg text-neutral-400">
          <Link href="/"> Login</Link>
        </span>
      </p>
    </div>
  );
};

export default Register;
