import {NextResponse} from "next/server";
import {cookies} from "next/headers";

export async function GET(request: Request) {
  const {searchParams} = new URL(request.url);
  const code = searchParams.get("code");
  const state = searchParams.get("state");
  console.log(
    "tessssssssssssssssssssssssssssssssssssssssssssssssssssssss",
    // code,
    // state,
  );
  if (!code || !state) {
    return NextResponse.json(
      {error: "Authorization code or state is missing"},
      {status: 400},
    );
  }

  // Get Bearer token from cookies
  const cookieStore = await cookies();
  const bearerToken = cookieStore.get("jwtToken")?.value;
  console.log(bearerToken);

  if (!bearerToken) {
    return NextResponse.json({error: "Bearer token is missing"}, {status: 401});
  }

  try {
    const response = await fetch(
      `https://staging-symfony.admin-developer.com/connect/exact/callback?code=${encodeURIComponent(
        code,
      )}&state=${encodeURIComponent(state)}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${bearerToken}`,
        },
      },
    );

    console.log("state", response);

    if (!response.ok) {
      return NextResponse.json(
        {error: "Failed to handle SSO callback"},
        {status: response.status},
      );
    }

    const data = await response.json();

    // console.log("Callback Response:", data);

    const res = NextResponse.redirect("http://localhost:3000/");

    if (data.access_token) {
      res.cookies.set("accessToken", data.access_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 7, // 1 minggu
        path: "/",
      });
    }

    if (data.refresh_token) {
      res.cookies.set("refreshToken", data.refresh_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 30, // 30 hari
        path: "/",
      });
    }

    return res;
  } catch (error: any) {
    console.error("Callback Error:", error);
    return NextResponse.json(
      {error: "An unexpected error occurred"},
      {status: 500},
    );
  }
}
