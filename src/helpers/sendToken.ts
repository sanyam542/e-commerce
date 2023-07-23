// Create Token and saving in cookie

import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const sendToken = async (user: any) => {
  try {
    const token = user.getJWTToken();

    // options for cookie
    const options = {
      expires: new Date(
        Date.now() + Number(process.env.COOKIE_EXPIRE) * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
    };
    const cookie = cookies();
    cookie.set("token", token, options);
    return NextResponse.json({ success: true, user, token }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};
