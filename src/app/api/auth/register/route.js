import connect from "@/utils/db";
import { NextResponse } from "next/server";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import Verifycationkey from "@/models/Verifycationkey";

export const POST = async (req) => {
  const { username, email, password, profileimg, verifyed, key } = await req.json();

  await connect();

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return NextResponse.json(
      { message: "User already exists" },
      { status: 400 },
    );
  }

  const userKey = await Verifycationkey.findOne({ email });

  if (!userKey || !key) {
    return NextResponse.json(
      { message: "Please verify otp first" },
      { status: 400 },
    );
  }

  const verifyedKey = await bcrypt.compare(key, userKey.key);

  if (verifyedKey) {
    await Verifycationkey.deleteMany({ email });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    username,
    email,
    password: hashedPassword,
    profileimg,
    verifyed,
  });

  try {
    await newUser.save();
    return new NextResponse("User has been created", {
      status: 201,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong", error: error.message },
      { status: 500 },
    );
  }
};
