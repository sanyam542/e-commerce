import { getDataFromToken } from "@/helpers/getDataFromToken";
import { isAdmin } from "@/helpers/isAdmin";
import Order from "@/models/orderModel"
import Product from "@/models/productModel";
import { connectToDB } from "@/utils/dbConfig";
import { error, log } from "console";
import { NextRequest, NextResponse } from "next/server";
import { json } from "stream/consumers";

  // CREATE PRODUCT - Admin
  export const POST = async (request:NextRequest) => {

      await connectToDB();
    try {


      const {
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
      } = await request.json()

    
    const user = await getDataFromToken(request);
      
      if(!user){
        return NextResponse.json({message:"Not logged in"},{status:401})
      }
  

      const order = await Order.create({
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paidAt: Date.now(),
        user: user._id,
      });




     

      return NextResponse.json({
        success: true,
        order},
        { status: 201 }
    )
    } catch (error) {
    console.log(error);

        
      return  NextResponse.json({ message:"Failed to Create a new order",error }, { status: 500}  );
    }
  };