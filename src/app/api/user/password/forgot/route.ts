import { sendEmail } from "@/helpers/sendEmail";
import User from "@/models/userModel";
import { connectToDB } from "@/utils/dbConfig";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  connectToDB();
  // Forgot Password
  const { email } = await request.json();

  const user = await User.findOne({ email: email });

  if (!user) {
    return NextResponse.json({ message: "user not found" }, { status: 404 });
  }
  const resetToken = await user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  const protocol = request.nextUrl.protocol;
  const host = request.nextUrl.host;
  const resetPasswordUrl = `${protocol}//${host}/api/user/password/reset/${resetToken}`;

  const message = `Your Password Reset Link is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore it.`;

  try {
    await sendEmail({
      email: user.email,
      subject: `Ecommerce Password Recovery`,
      message: message,
    });

    return NextResponse.json(
      {
        success: true,
        message: `Email sent to ${user.email} successfully`,
      },
      { status: 200 }
    );
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });
    return NextResponse.json(
      { message: "error occured in forgot password", error },
      { status: 500 }
    );
  }
};
