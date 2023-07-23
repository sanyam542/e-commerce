import { connectToDB } from "@/utils/dbConfig";

import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";

import { sendToken } from "@/helpers/sendToken";

// Login User

export const POST = async (request: NextRequest) => {
  await connectToDB();
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json("Please Enter email and Password");
    }
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return NextResponse.json("Invalid email ");
    }

    const isPasswordMatched = user.comparePassword(password);

    if (!isPasswordMatched) {
      return NextResponse.json("Invalid  password");
    }

    const result = await sendToken(user);
    return result;
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to Login", error },
      { status: 500 }
    );
  }
};
