import axiosInstance from "@/lib/axiosInstance";
import axios from "axios";
import {NextResponse} from "next/server";
import {cookies} from "next/headers";

export async function GET(request: Request) {
  const cookieStore = await cookies();
  const token = cookieStore.get("jwtToken")?.value;

  if (!token) {
    return NextResponse.json({error: "Unauthorized"}, {status: 401});
  }

  try {
    const response = await axiosInstance.get("/customers", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return NextResponse.json(response.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return NextResponse.json(
        {error: error.response?.data?.error || "Failed to fetch customers"},
        {status: error.response?.status || 400},
      );
    }

    return NextResponse.json(
      {error: "An unexpected error occurred"},
      {status: 500},
    );
  }
}
