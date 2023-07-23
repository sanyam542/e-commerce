import { NextRequest } from "next/server";
import jwt from "jsonwebtoken"
import User from "@/models/userModel";




export const isAdmin = async(request:NextRequest) => {
    try {
        const token = request.cookies.get("token")

        if(token){

            const decodedData = jwt.verify(token?.value, process.env.JWT_SECRET!);
            const user = await User.findById(Object(decodedData).id)
            if(user.role==="admin"){
                return user
            }
        }
    } catch (error:any) {
        throw new Error(error)
    }
    return 
}

