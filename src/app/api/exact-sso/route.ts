// app/api/exact-sso/route.js
import {NextResponse} from "next/server";

export async function GET(request) {
  // Panggil API Be Syimphony untuk memulai SSO dengan Exact Online
  const response = await fetch("https://be-syimphony.com/api/exact-sso", {
    method: "GET",
  });

  const data = await response.json();
  return NextResponse.json(data);
}
