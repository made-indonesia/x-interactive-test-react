import axiosInstance from "@/lib/axiosInstance";
import axios from "axios";
import {NextResponse} from "next/server";

interface RegisterRequest {
  email: string;
  password: string;
}

export async function POST(request: Request) {
  try {
    const {email, password}: RegisterRequest = await request.json();

    const response = await axiosInstance.post("/auth/register", {
      email,
      password,
    });

    return NextResponse.json({message: "Registration successful"});
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return NextResponse.json(
        {error: error.response?.data?.error || "Registration failed"},
        {status: error.response?.status || 400},
      );
    }

    return NextResponse.json(
      {error: "An unexpected error occurred"},
      {status: 500},
    );
  }
}
