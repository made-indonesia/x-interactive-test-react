// app/api/me/route.js
import {NextResponse} from "next/server";
import {cookies} from "next/headers";

export async function GET(request) {
  const token = cookies().get("accessToken")?.value;

  if (!token) {
    return NextResponse.json({error: "Unauthorized"}, {status: 401});
  }

  // Panggil API Be Syimphony untuk mendapatkan informasi pengguna
  const response = await fetch("https://be-syimphony.com/api/me", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();
  return NextResponse.json(data);
}
