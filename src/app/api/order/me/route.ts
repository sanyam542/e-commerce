import { getDataFromToken } from "@/helpers/getDataFromToken";

import Order from "@/models/orderModel"

import { connectToDB } from "@/utils/dbConfig";

import { NextRequest, NextResponse } from "next/server";


  // Get LoogedIn Users orders
  export const GET = async (request:NextRequest,) => {

      await connectToDB();
    try {
        const user = await getDataFromToken(request);

        const orders = await Order.find({user:user.id})
        
          if (!orders) {
        return NextResponse.json({message:"Order not found with this Id"},{status:404})

          }
        
     
      return NextResponse.json({
        success: true,
        orders},
        { status: 200 }
    )
    } catch (error) {
    console.log(error);

        
      return  NextResponse.json({ message:"Failed to get order",error }, { status: 500}  );
    }
  };