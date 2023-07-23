import { getDataFromToken } from "@/helpers/getDataFromToken"
import User from "@/models/userModel"
import { connectToDB } from "@/utils/dbConfig"
import { NextRequest, NextResponse } from "next/server"

export const  GET =  async(request:NextRequest) =>{
connectToDB()
// Get User Details
try {
    const  tokenData =  await getDataFromToken(request)

    const user = await User.findById(tokenData.id)

    return NextResponse.json({success:true,user},{status:200})
} catch (error) {
    return NextResponse.json({error},{status:500})
    
}
  
}
