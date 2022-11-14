import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

//the function will redirect to home page if user is not signed in
export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === "/") {
    const session = await getToken({
      req: request,
      secret: process.env.JWT_SECRET,
      secureCookie: process.env.NODE_ENV === "production",
    });
    console.log("session", session);
    if (!session) return NextResponse.redirect(new URL("/home", request.url));
  }
}
