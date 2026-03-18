import connect from "@/utils/db";
import { NextResponse } from "next/server";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import Verifycationkey from "@/models/Verifycationkey";

export const PUT = async (req) => {
  try {
    const { email, password, key } = await req.json();

    await connect();

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

    const updateUser = await User.findOneAndUpdate(
      { email },
      { password: hashedPassword },
      { returnDocument: "after" },
    );

    if (!updateUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "User has been updated" },
      { status: 200 },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Something went wrong", error: error.message },
      { status: 500 },
    );
  }
};
