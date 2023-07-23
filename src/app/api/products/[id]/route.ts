import Product from "@/models/productModel";
import { connectToDB } from "@/utils/dbConfig";
import { NextRequest, NextResponse } from "next/server";

// Get Single Product

export const GET = async (request: NextRequest, { params }: any) => {
  await connectToDB();
  try {
    const product = await Product.findById(params.id);
    if (!product) {
      return NextResponse.json({
        success: false,
        massage: "Product not found",
      });
    }
    return NextResponse.json(
      {
        success: true,
        product,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};
