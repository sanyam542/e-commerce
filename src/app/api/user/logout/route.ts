import { NextResponse } from "next/server";

import { cookies } from "next/headers";

export const POST = async () => {
  try {
    cookies().set("token", "", {
      expires: new Date(0),
      httpOnly: true,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Logged Out",
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to Logout", error },
      { status: 500 }
    );
  }
};
