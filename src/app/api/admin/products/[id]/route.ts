import { getDataFromToken } from "@/helpers/getDataFromToken";
import Product from "@/models/productModel";
import { connectToDB } from "@/utils/dbConfig";
import { NextRequest, NextResponse } from "next/server";

// Update Product -- Admin

export const PUT = async (request: NextRequest, { params }: any) => {
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

    let product = await Product.findById(params.id);
    const reqBody = await request.json();

    if (!product) {
      return NextResponse.json({
        success: false,
        massage: "Product not found",
      });
    }

    product = await Product.findByIdAndUpdate(params.id, reqBody);

    return NextResponse.json(
      {
        success: true,
        reqBody,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Failed to get products",

        error,
      },
      { status: 500 }
    );
  }
};

//Delete Product -- Admin
export const DELETE = async (request: NextRequest, { params }: any) => {
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

    let product = await Product.findByIdAndDelete(params.id);

    if (!product) {
      return NextResponse.json({
        success: false,
        massage: "Product not found",
      });
    }

    return NextResponse.json(
      {
        success: true,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};
