import { getDataFromToken } from "@/helpers/getDataFromToken";
import { isAdmin } from "@/helpers/isAdmin";

import Product from "@/models/productModel";
import { connectToDB } from "@/utils/dbConfig";
import { error, log } from "console";
import { NextRequest, NextResponse } from "next/server";
import { json } from "stream/consumers";

// CREATE PRODUCT - Admin
export const POST = async (request: NextRequest) => {
  try {
    await connectToDB();

    const user = await getDataFromToken(request);

    if (!user) {
      return NextResponse.json({ message: "Not logged in" }, { status: 401 });
    } else if (user.role !== "admin") {
      return NextResponse.json(
        { message: "you are not admin" },
        { status: 403 }
      );
    }

    const reqBody = await request.json();
    reqBody.user = user.id;
    console.log(reqBody);

    const product = new Product(reqBody);
    await product.save();

    return NextResponse.json(
      {
        success: true,
        product,
      },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        message: "Failed to Create a new product",
        error,
      },
      { status: 500 }
    );
  }
};
