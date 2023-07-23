import User from "@/models/userModel";
import { connectToDB } from "@/utils/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { sendToken } from "@/helpers/sendToken";

export const POST = async (request: NextRequest, { params }: any) => {
  connectToDB();
  // Reseting password

  try {
    // creating token hash
    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(params.token)
      .digest("hex");

    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return NextResponse.json(
        { message: "Reset Password Token is invalid or has been expired" },
        { status: 400 }
      );
    }
    const { password, confirmPassword } = await request.json();

    if (password !== confirmPassword) {
      return NextResponse.json(
        { message: "Password does not match Confirm password" },
        { status: 400 }
      );
    }

    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    const result = sendToken(user);

    return result;
  } catch (error) {
    return NextResponse.json(
      { message: "error occured while reseting password", error },
      { status: 500 }
    );
  }
};
