import { connectToDB } from "@/utils/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";

// Register a User

export const POST = async (request: NextRequest) => {
  await connectToDB();
  try {
    const { name, email, password } = await request.json();

    const user = new User({
      name,
      email,
      password,
      avatar: {
        public_id: "this is a sample id",
        url: "profilepicUrl",
      },
    });

    await user.save();

    const token = user.getJWTToken();

    return NextResponse.json(
      {
        success: true,
        token,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to Create a new user", error },
      { status: 500 }
    );
  }
};
