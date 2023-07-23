import { getDataFromToken } from "@/helpers/getDataFromToken";
import { sendToken } from "@/helpers/sendToken";
import User from "@/models/userModel";
import { connectToDB } from "@/utils/dbConfig";
import { NextRequest, NextResponse } from "next/server";

export const PUT = async (request: NextRequest) => {
  connectToDB();

  // Update User Profile
  try {
    const { name, email } = await request.json();

    // we will add cloudinary later

    const tokenData = await getDataFromToken(request);
    const user = await User.findByIdAndUpdate(
      tokenData.id,
      { name: name, email: email },
      {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      }
    );

    const result = sendToken(user);
    return result;
  } catch (error) {
    console.log(error);

    return NextResponse.json({ error }, { status: 500 });
  }
};
