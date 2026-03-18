import Otp from "@/models/Otp";
import Verifycationkey from "@/models/Verifycationkey";
import bcrypt from "bcryptjs";
import connect from "@/utils/db";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  const { email, otp } = await req.json();

  await connect();

  const emailuser = await Otp.findOne({ email }).sort({ createdAt: -1 });

  const expiredOtp = Date.now() > emailuser?.expireat;

  const otpVerify = await bcrypt.compare(otp, emailuser?.otp);

  if (expiredOtp || !otpVerify) {
    return NextResponse.json({ message: "Unvalid OTP" }, { status: 400 });
  }

  const deleteat = new Date(Date.now() + 10 * 60 * 1000);

   const dbKey = Math.floor(10000000 + Math.random() * 90000000).toString();

  const key = await bcrypt.hash(dbKey, 7);

  await Verifycationkey.create({ email, key, deleteat });

  await Otp.deleteMany({ email });

  return NextResponse.json({message:"OTP Verifyed Succesfully", verifyed: true, key }, { status: 200 });
};