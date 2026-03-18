import nodemailer from "nodemailer";
import Otp from "@/models/Otp";
import bcrypt from "bcryptjs";
import connect from "@/utils/db";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  const { email } = await req.json();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    return NextResponse.json(
      { message: "Enter a valid email address" },
      { status: 400 },
    );
  }

  await connect();

  const lastOtp = await Otp.findOne({ email }).sort({ createdAt: -1 });

  if (lastOtp) {
    const diff = Date.now() - new Date(lastOtp.createdAt).getTime();
    if (diff < 60000) {
      return NextResponse.json(
        { message: "Wait 60 seconds before requesting OTP again" },
        { status: 429 },
      );
    }
  }

  const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000);

  const otpCount = await Otp.countDocuments({
    email,
    createdAt: { $gte: tenMinutesAgo },
  });

  if (otpCount >= 3) {
    return NextResponse.json(
      { message: "Too many OTP requests. Try later." },
      { status: 429 },
    );
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  const hashedOtp = await bcrypt.hash(otp, 9);

  const expireat = new Date(Date.now() + 5 * 60 * 1000);

  const deleteat = new Date(Date.now() + 10 * 60 * 1000);

  await Otp.create({ email, otp: hashedOtp, expireat, deleteat });

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.GMAIL_USER,
    to: email,
    subject: "Your OTP Code",
    text: `Your OTP is ${otp}. It will expire in 5 minutes.`,
  });

  return NextResponse.json({ message: "OTP sent to email" });
};
