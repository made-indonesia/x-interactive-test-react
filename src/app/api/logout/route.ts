import {NextResponse} from "next/server";

export function GET(request: Request) {
  const response = NextResponse.redirect(new URL("/login", request.url));

  response.cookies.delete("accessToken");
  response.cookies.delete("jwtToken");
  response.cookies.delete("refreshToken");

  return response;
}
