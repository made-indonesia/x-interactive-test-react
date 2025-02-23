import {NextResponse} from "next/server";
import {cookies} from "next/headers";

export async function POST(request) {
  const {email, password} = await request.json();

  // Panggil API Be Syimphony untuk login
  const response = await fetch("https://be-syimphony.com/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({email, password}),
  });

  const data = await response.json();

  // Simpan token di cookie
  if (data.accessToken) {
    cookies().set("accessToken", data.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 1 minggu
    });
  }

  return NextResponse.json(data);
}
