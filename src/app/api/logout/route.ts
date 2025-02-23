// app/api/logout/route.js
import {NextResponse} from "next/server";

export async function GET() {
  // Hapus cookie accessToken
  const response = NextResponse.redirect("/login");
  response.cookies.delete("accessToken");

  return response;
}
