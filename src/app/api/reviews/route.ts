import { getDataFromToken } from "@/helpers/getDataFromToken";
import Product from "@/models/productModel";
import { connectToDB } from "@/utils/dbConfig";
import { NextRequest,NextResponse } from "next/server";



export const GET = async(request:NextRequest) =>{
await connectToDB()
try {

const query =  request.nextUrl.searchParams.get("id")


    const product = await Product.findById(query);

    if (!product) {
    return NextResponse.json({message:"Product not found"},{status:400})

 
      }
    
    return NextResponse.json({sucess:true,reviews:product.reviews},{status:200})

} catch (error) {
    return NextResponse.json(error,{status:500})

}

}

export const DELETE = async(request:NextRequest) =>{
    await connectToDB()
    try {
        const id =  request.nextUrl.searchParams.get("id")
        const productId= request.nextUrl.searchParams.get("productId")
        const product = await Product.findById(id);

        if (!product) {
        return NextResponse.json({message:"Product not found"},{status:400})
    
     
          }

          const reviews = product.reviews.filter(
            (rev:any) => rev._id.toString() !== id?.toString()
          );
        
          let avg = 0;
        
          reviews.forEach((rev:any) => {
            avg += rev.rating;
          });
        
          let ratings = 0;
        
          if (reviews.length === 0) {
            ratings = 0;
          } else {
            ratings = avg / reviews.length;
          }
        
          const numOfReviews = reviews.length;
        
          await Product.findByIdAndUpdate(
            productId,
            {
              reviews,
              ratings,
              numOfReviews,
            },
            {
              new: true,
              runValidators: true,
              useFindAndModify: false,
            }
          );
        

        return NextResponse.json({sucess:true},{status:200})
    
    } catch (error) {
        return NextResponse.json(error,{status:500})
    
    }
    
    }