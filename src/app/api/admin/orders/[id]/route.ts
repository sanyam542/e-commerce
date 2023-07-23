import { getDataFromToken } from "@/helpers/getDataFromToken";

import Order from "@/models/orderModel";
import Product from "@/models/productModel";

import { connectToDB } from "@/utils/dbConfig";

import { NextRequest, NextResponse } from "next/server";

// UPDATE Order status - Admin
export const PUT = async (request: NextRequest, { params }: any) => {
  await connectToDB();
  try {
    const user = await getDataFromToken(request);

    const order = await Order.findById(params.id);

    if (!order) {
      return NextResponse.json(
        { message: "Order not found with this Id" },
        { status: 404 }
      );
    }

    if (order.orderStatus === "Delivered") {
      return NextResponse.json(
        { message: "You have already delivered this order" },
        { status: 400 }
      );
    }

    const { status } = await request.json();
    if (status === "Shipped") {
      order.orderItems.forEach(async (o: any) => {
        await updateStock(o.product, o.quantity);
      });
    }
    order.orderStatus = status;

    if (status === "Delivered") {
      order.deliveredAt = Date.now();
    }

    await order.save({ validateBeforeSave: false });

    return NextResponse.json(
      {
        success: true,
        order,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { message: "Failed to get order", error },
      { status: 500 }
    );
  }
};

async function updateStock(id: any, quantity: any) {
  const product = await Product.findById(id);

  product.Stock -= quantity;

  await product.save({ validateBeforeSave: false });
}

// Delete Order

export const DELETE = async ({ params }: any) => {
  const order = await Order.findById(params.id);

  if (!order) {
    return NextResponse.json(
      { message: "Order not found with this Id" },
      { status: 404 }
    );
  }

  await order.remove();

  return NextResponse.json(
    {
      success: true,
    },
    { status: 200 }
  );
};
