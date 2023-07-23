import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import User from "@/models/userModel.js";
import { connectToDB } from "@/utils/dbConfig";

export const getDataFromToken = async (request: NextRequest) => {
  try {
    connectToDB();
    const token = request.cookies.get("token");

    if (token) {
      const decodedData = jwt.verify(token?.value, process.env.JWT_SECRET!);
      console.log(decodedData);

      const user = await User.findById(Object(decodedData).id);

      return user;
    } else if (!token) {
      return;
    }
  } catch (error: any) {
    throw new Error(error);
  }
  return;
};
