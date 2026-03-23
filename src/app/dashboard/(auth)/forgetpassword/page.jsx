"use client";
import React from "react";
import OtpForm from "@/components/otpForm/OtpForm";
import { useState } from "react";
import { useRouter } from "next/navigation";

const Forgetpassword = () => {
  const [err, setErr] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [email, setEmail] = useState("");
  const [otpverifyed, setOtpverifyed] = useState(false);
  const [key, setKey] = useState("")

  const router = useRouter();
  const isMatch = password === confirmPassword;

  const handlesubmit = async (e) => {
    e.preventDefault();

    if (otpverifyed === false) {
      setErr("Please verify OTP first");
      return;
    }

    try {
      const res = await fetch("/api/auth/forgetpassword", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          key,
        }),
      });

      if (res.status === 200) {
        router.push("/dashboard/login");
      } else {
        setErr(true);
      }
    } catch (err) {
      setErr(err);
    }
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
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <OtpForm email={email} setOtpverifyed={setOtpverifyed} setKey={setKey}/>
        <div className="relative w-1/2">
          <input
            className="border rounded-md p-3 w-full"
            type={showPassword1 ? "text" : "password"}
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div
            onClick={() => setShowPassword1(!showPassword1)}
            className={`cursor-pointer absolute w-8 h-8 top-[20%] right-2 rounded-full ${showPassword1 === true ? "bg-red-500" : "bg-green-700"} `}
          />
        </div>
        <div className="relative w-1/2">
          <input
            className="border rounded-md p-3 w-full"
            type={showPassword2 ? "text" : "password"}
            placeholder="confirm password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <div
            onClick={() => setShowPassword2(!showPassword2)}
            className={`cursor-pointer absolute w-8 h-8 top-[20%] right-2 rounded-full ${showPassword2 === true ? "bg-red-500" : "bg-green-700"} `}
          />
        </div>
        <button
          type="submit"
          disabled={!isMatch || !otpverifyed}
          className="p-1.5 text-white cursor-pointer w-1/2 rounded-md border-0 bg-[#53c38b]"
        >
          Login
        </button>
        {err && (
          <div className="p-1.5 font-bold text-xl text-center w-1/2 ">
            {err}
          </div>
        )}
      </form>
    </div>
  );
};

export default Forgetpassword;
