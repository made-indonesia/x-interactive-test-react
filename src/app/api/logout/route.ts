import {NextResponse} from "next/server";

export function GET(request: Request) {
  console.log("tes");

  // ✅ Use absolute URL for redirection
  const response = NextResponse.redirect(new URL("/login", request.url));

  // 🧹 Delete the accessToken cookie
  response.cookies.delete("accessToken");
  response.cookies.delete("jwtToken");
  response.cookies.delete("refreshToken");

  return response;
}
