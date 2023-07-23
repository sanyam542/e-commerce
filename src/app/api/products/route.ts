

import Product from "@/models/productModel";
import { filter, pagination, search } from "@/utils/apifeatures";
import { connectToDB } from "@/utils/dbConfig";

import {  NextRequest, NextResponse } from "next/server";


// Get All Product

export const GET =  async (request:NextRequest,) => {
  await connectToDB();
    try {


const queryStr = request.nextUrl.searchParams

queryStr.forEach((key:any)=>key)

// for (const [key, value] of queryStr.entries()) {
  
  
// }

console.log(request.nextUrl);

console.log(queryStr);

let paramsObject:any = {}
queryStr.forEach((value:any,key:any)=>{
  paramsObject[key] = value;

})
  

  


//Search

const searchResult = await search(Product,queryStr)

// Filter
// const filterResult = filter(Product,paramsObject)






// Pagination 
// const paginationResult = await pagination(Product,queryStr,3)


      return NextResponse.json({
        success: true,

searchResult,


},{status:201})


    } catch (error) {
      console.log(error);
      return  NextResponse.json({ message:"Failed to get products",  status: 500 ,error });
      
    }
  };

  