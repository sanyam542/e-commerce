import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getDataFromToken } from "./helpers/getDataFromToken";
import User from "./models/userModel";
import jwt from "jsonwebtoken";
import { auth } from "./helpers/auth";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const isPublic = pathname === "/login" || pathname === "/register";

  const token = request.cookies.get("token")?.value || "";

  const user = await auth(token);

  if (isPublic && user) {
    return NextResponse.redirect("/");
  }

  if (!isPublic && !user) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }

  if (
    pathname.startsWith("/api/admin") ||
    (pathname.startsWith("/admin") && user?.role !== "admin")
  ) {
    return NextResponse.json({ message: "you are not admin" }, { status: 403 });
  }

  // if (!isPublic && token) {
  //   return NextResponse.redirect(new URL(pathname, request.nextUrl));
  // }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/",
    "/admin",
    "/admin/orders/",

    "/admin/product/new",
    "/admin/users",
    "/api/admin/users",

    "/order",

    "/order/id",
    "/order/me",
    "/order/new",
    "/user/me",
    "/user/me/update",
    "/user/password/update",
  ],
};
