import { getDataFromToken } from "@/helpers/getDataFromToken";

import Order from "@/models/orderModel"

import { connectToDB } from "@/utils/dbConfig";

import { NextRequest, NextResponse } from "next/server";


  // Get All Orders - Admin
  export const GET = async (request:NextRequest,) => {

      await connectToDB();
    try {
        const user = await getDataFromToken(request);

        const allOrders = await Order.find()
        
          if (!allOrders) {
        return NextResponse.json({message:"Order not found with this Id"},{status:404})

          }
        

          let totalAmount = 0;


          allOrders.forEach((order) => {
            totalAmount += order.totalPrice;
          });


      return NextResponse.json({
        success: true,
        allOrders,totalAmount },
        { status: 200 }
    )
    } catch (error) {
    console.log(error);

        
      return  NextResponse.json({ message:"Failed to get order",error }, { status: 500}  );
    }
  };