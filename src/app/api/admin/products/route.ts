import Product from "@/models/productModel";
import { connectToDB } from "@/utils/dbConfig";
import { NextResponse } from "next/server";

export const GET = async () => {
  connectToDB();

  try {
    const products = await Product.find();

    return NextResponse.json({ success: true, products }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};
