import React from "react";
import { useState } from "react";
import { toast } from "react-toastify";

const OtpForm = ({ email, setOtpverifyed, setKey }) => {
  const [otp, setOtp] = useState("");
  const [err, setErr] = useState("");

  const handlesendOtp = async () => {
    try {
      const res = await fetch("/api/auth/otp/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
        }),
      });
      
      const data = await res.json();

      if (!res.ok) {
        setErr(data.message || "Failed to send OTP");
      }
      toast.success(data.message);
    } catch (err) {
      setErr(err);
    }
  };

  const handlesubmitotp = async () => {
    try {
      const res = await fetch("/api/auth/otp/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          otp,
        }),
      });

      const data = await res.json();

      if (data.verifyed) {
        setOtpverifyed(true);
        setKey(data.key);
        setErr("");
        toast.success(data.message);
      }

      if (!res.ok) {
        setErr(data.message || "Invalid OTP");
      }
    } catch (err) {
      setErr(err.message || "Something went wrong");
    }
  };

  if (!email) {
    return "";
  }

  return (
    <>
      <button
        onClick={() => handlesendOtp()}
        className="p-1.5 text-white cursor-pointer w-1/2 rounded-md border-0 bg-[#53c38b]"
      >
        Get OTP
      </button>

      {err && (
        <div className="p-1.5 font-bold text-xl text-center w-1/2 ">{err}</div>
      )}
      <div className="flex gap-5 items-center w-1/2">
        <input
          className="border rounded-md p-3 w-2/3"
          type="text"
          placeholder="otp"
          onChange={(e) => setOtp(e.target.value)}
          required
        />
        <button
          onClick={handlesubmitotp}
          className="p-3 text-white cursor-pointer w-1/3 rounded-md border-0 bg-[#53c38b]"
        >
          Verify OTP
        </button>
      </div>
    </>
  );
};

export default OtpForm;
