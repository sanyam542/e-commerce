import User from "@/models/userModel";
import { connectToDB } from "@/utils/dbConfig";
import { NextRequest, NextResponse } from "next/server";

//  GET SINGLE USER --Admin
export const GET = async (request: NextRequest, { params }: any) => {
  try {
    await connectToDB();
    let user = await User.findById(params.id);
    if (!user) {
      return NextResponse.json(
        {
          success: false,
          massage: `User does not exist with Id: ${params.id}`,
        },
        { status: 404 }
      );
    }
    return NextResponse.json(
      {
        success: true,
        user,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};

//  UPDATE USER --Admin

export const PUT = async (request: NextRequest, { params }: any) => {
  connectToDB();
  try {
    const { name, email, role } = await request.json();

    await User.findByIdAndUpdate(
      params.id,
      { name: name, email: email, role: role },
      {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      }
    );

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};

//  GET DELETE USER --Admin

export const DELETE = async (request: NextRequest, { params }: any) => {
  connectToDB();

  try {
    const user = await User.findByIdAndDelete(params.id);
    if (!user) {
      return NextResponse.json(
        {
          success: false,
          massage: `User does not exist with Id: ${params.id}`,
        },
        { status: 404 }
      );
    }

    // we will remove cloudnary

    return NextResponse.json(
      {
        success: true,
        message: "user deleted successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};
