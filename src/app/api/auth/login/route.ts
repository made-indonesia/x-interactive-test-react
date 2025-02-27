import {NextResponse} from "next/server";
import axiosInstance from "@/lib/axiosInstance";

interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  token?: string;
  error?: string;
}

export async function POST(request: Request) {
  try {
    const {email, password}: LoginRequest = await request.json();
    const response = await axiosInstance.post<LoginResponse>("/auth/login", {
      email,
      password,
    });

    const {token} = response.data;
    if (!token) {
      return NextResponse.json(
        {error: "No access token received"},
        {status: 401},
      );
    }

    const res = NextResponse.json({success: true, token});
    res.cookies.set("jwtToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60,
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    });

    return res;
  } catch (error) {
    return NextResponse.json({error: "Login failed"}, {status: 500});
  }
}
