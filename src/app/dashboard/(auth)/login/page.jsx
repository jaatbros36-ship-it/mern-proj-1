"use client";
import { signIn } from "next-auth/react";
import React from "react";
import { useState } from "react";
import Link from "next/link";

const Login = () => {

  const [showPassword, setShowPassword] = useState(false);

  const handlesubmit = async (e) => {
    e.preventDefault();

    const email = e.target[0].value;
    const password = e.target[1].value;

    signIn("credentials", {
  email,
  password,
  callbackUrl: "/dashboard",
});
  };

  return (
    <div className="flex flex-col gap-5 items-center w-full justify-center">
      <form
        onSubmit={handlesubmit}
        className="flex flex-col gap-5 items-center w-2/3"
      >
        <input
          className="border rounded-md p-3 w-1/2"
          type="email"
          placeholder="email"
          required
        />
        <div className="relative w-1/2">
          <input
            className="border rounded-md p-3 w-full"
            type={showPassword ? "text" : "password"}
            placeholder="password"
            required
          />
          <div
            onClick={() => setShowPassword(!showPassword)}
            className={`cursor-pointer absolute w-8 h-8 top-[20%] right-2 rounded-full ${showPassword === true ? "bg-red-500" : "bg-green-700"} `}
          />
        </div>
        <button
          type="submit"
          className="p-1.5 text-white cursor-pointer w-1/2 rounded-md border-0 bg-[#53c38b]"
        >
          Login
        </button>
      </form>
      <button
        className="p-1.5 cursor-pointer font-bold w-1/3 hover:rounded-md hover:border-0 text-[#53c38b] hover:bg-[#486456]"
        onClick={() => {
          signIn("google", { callbackUrl: "/dashboard" });
        }}
      >
        Login with Google
      </button>
      <div className="w-1/3  flex justify-between">

      <Link href="register" className="text-center w-1/2 p-1.5 cursor-pointer font-bold  hover:rounded-md hover:border-0 text-[#53c38b] hover:bg-[#486456]"
         >Register</Link>
      <Link href="forgetpassword" className="text-center w-1/2 p-1.5 cursor-pointer font-bold  hover:rounded-md hover:border-0 text-[#53c38b] hover:bg-[#486456]"
         >Forget Password</Link>
         </div>
    </div>
  );
};

export default Login;
