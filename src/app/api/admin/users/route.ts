import User from "@/models/userModel";
import { connectToDB } from "@/utils/dbConfig";
import { NextResponse } from "next/server";

// GET All Users

export const GET = async () => {
  connectToDB();
  try {
    const users = await User.find();
    return NextResponse.json({ users, success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};
