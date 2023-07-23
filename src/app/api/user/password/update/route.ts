import { getDataFromToken } from "@/helpers/getDataFromToken";
import { sendToken } from "@/helpers/sendToken";
import User from "@/models/userModel";
import { connectToDB } from "@/utils/dbConfig";
import { NextRequest, NextResponse } from "next/server";

export const PUT = async (request: NextRequest) => {
  connectToDB();

  // Update Password

  try {
    const tokenData = await getDataFromToken(request);
    const user = await User.findById(tokenData.id).select("+password");

    const { oldPassword, newPassword, confirmPassword } = await request.json();
    const isPasswordMatched = await user.comparePassword(oldPassword);

    if (!isPasswordMatched) {
      return NextResponse.json(
        { message: "Old Password is incorrect" },
        { status: 400 }
      );
    }
    if (newPassword !== confirmPassword) {
      return NextResponse.json(
        { message: "Password and Confirm Password does not match" },
        { status: 400 }
      );
    }
    user.password = newPassword;
    await user.save();
    const result = sendToken(user);
    return result;
  } catch (error) {
    return NextResponse.json(
      { message: "error occured in updating password", error },
      { status: 500 }
    );
  }
};
