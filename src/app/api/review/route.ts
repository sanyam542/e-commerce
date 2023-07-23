import { getDataFromToken } from "@/helpers/getDataFromToken";
import Product from "@/models/productModel";
import { connectToDB } from "@/utils/dbConfig";
import { NextRequest,NextResponse } from "next/server";



export const PUT = async(request:NextRequest) =>{
await connectToDB()
try {
  const user = await getDataFromToken(request)

  const {rating , comment , productId} = await request.json()
    const review = {
        user: user._id,
        name: user.name,
        rating:Number(rating),
        comment

    }

    
  const product = await Product.findById(productId)


const isReviewed = product.reviews.find(
    (rev:any) => rev.user.toString() === user.id.toString()
  );

  if (isReviewed) {
    product.reviews.forEach((rev:any) => {
      if (rev.user.toString() === user._id.toString())
      {
        (rev.rating = rating), (rev.comment = comment)
    }
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;

  }


  let avg = 0;

  product.reviews.forEach((rev:any) => {
    avg += rev.rating;
  });

  product.ratings = avg / product.reviews.length;

  await product.save({ validateBeforeSave: false });
    
    return NextResponse.json({success:true},{status:200})

} catch (error) {
    return NextResponse.json(error,{status:500})

}

}