import { getDataFromToken } from "@/helpers/getDataFromToken";

import Order from "@/models/orderModel"

import { connectToDB } from "@/utils/dbConfig";

import { NextRequest, NextResponse } from "next/server";


  // CREATE PRODUCT - Admin
  export const GET = async (request:NextRequest,{params}:any) => {

      await connectToDB();
    try {

        const order = await Order.findById(params.id).populate(
            "user",
            "name email"
          );
        
          if (!order) {
        return NextResponse.json({message:"Order not found with this Id"},{status:404})

          }
        
     
      return NextResponse.json({
        success: true,
        order},
        { status: 200 }
    )
    } catch (error) {
    console.log(error);

        
      return  NextResponse.json({ message:"Failed to get order",error }, { status: 500}  );
    }
  };