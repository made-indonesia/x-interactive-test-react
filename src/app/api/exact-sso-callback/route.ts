// app/api/exact-sso-callback/route.js
import {NextResponse} from "next/server";

export async function GET(request) {
  // Ambil authorization code dari query parameter
  const {searchParams} = new URL(request.url);
  const code = searchParams.get("code");

  if (!code) {
    return NextResponse.json(
      {error: "Authorization code is missing"},
      {status: 400},
    );
  }

  // Data untuk menukar code dengan access token
  //    const tokenUrl = "https://start.exactonline.nl/api/oauth2/token";
  //    const params = new URLSearchParams();
  //    params.append("client_id", process.env.EXACT_ONLINE_CLIENT_ID);
  //    params.append("client_secret", process.env.EXACT_ONLINE_CLIENT_SECRET);
  //    params.append("grant_type", "authorization_code");
  //    params.append("code", code);
  //    params.append("redirect_uri", process.env.EXACT_ONLINE_REDIRECT_URI);

  //    // Panggil API Exact Online untuk menukar code dengan access token
  //    const response = await fetch(tokenUrl, {
  //      method: "POST",
  //      headers: {
  //        "Content-Type": "application/x-www-form-urlencoded",
  //      },
  //      body: params,
  //    });

  // Panggil API Be Syimphony untuk menangani callback
  const response = await fetch(
    `https://be-syimphony.com/api/exact-sso-callback?code=${code}`,
    {
      method: "GET",
    },
  );

  // Jika respons dari API Be Syimphony gagal
  if (!response.ok) {
    return NextResponse.json(
      {error: "Failed to handle SSO callback"},
      {status: 500},
    );
  }

  // Ambil data dari API Be Syimphony
  const data = await response.json();

  // Simpan access token di cookie (opsional)
  if (data.accessToken) {
    const cookies = new NextResponse();
    cookies.cookies.set("accessToken", data.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 1 minggu
    });
    return cookies;
  }

  // Kembalikan data ke frontend
  return NextResponse.json(data);
}
