"use client";
import React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import OtpForm from "@/components/otpForm/OtpForm";

const Register = () => {
  const [err, setErr] = useState("");
  const [key, setKey] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [otpverifyed, setOtpverifyed] = useState(false);

  const router = useRouter();
  const isMatch = password === confirmPassword;

  const handleUpload = async (file) => {
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setErr("Image size must be under 5MB");
      return;
    }

    if (!file.type.startsWith("image/")) {
      setErr("Only image files allowed");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);

    const res = await fetch("/api/images", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    console.log(data.img_url);
  };

  const handlesubmit = async (e) => {
    e.preventDefault();

    if (otpverifyed === false) {
      setErr("Please verify OTP first");
      return;
    }

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
          verifyed: otpverifyed,
          key,
        }),
      });

      if (res.status === 201) {
        router.push("/dashboard/login");
      } else {
        setErr(error);
      }
    } catch (error) {
      setErr(error);
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
          type="text"
          placeholder="username"
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        {/* file uplload input */}
        <input
          className="border rounded-md p-3 w-1/2"
          type="file"
          onChange={(e) => handleUpload(e.target.files[0])}
        />
        <input
          className="border rounded-md p-3 w-1/2"
          type="email"
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <OtpForm
          email={email}
          setOtpverifyed={setOtpverifyed}
          setKey={setKey}
        />
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
        {confirmPassword && (
          <p className={isMatch ? "text-green-500" : "text-red-400"}>
            {!isMatch && "Passwords do not match "}
          </p>
        )}
        <button
          type="submit"
          className="p-1.5 text-white cursor-pointer w-1/2 rounded-md border-0 bg-[#53c38b]"
          disabled={!isMatch || !otpverifyed}
        >
          Register
        </button>
      </form>
      {err && <div>{err}</div>}
      <Link
        className="p-1.5 cursor-pointer font-bold w-1/3 hover:rounded-md hover:border-0 text-[#53c38b] text-center hover:bg-[#486456]"
        href="login"
      >
        Login
      </Link>
    </div>
  );
};

export default Register;
