import axiosInstance from "@/lib/axiosInstance";
import axios from "axios";
import {NextResponse} from "next/server";
import {cookies} from "next/headers";

export async function GET(request: Request) {
  const cookieStore = cookies(); // ✅ No need for await
  const token = cookieStore.get("jwtToken")?.value;

  if (!token) {
    return NextResponse.json({error: "Unauthorized"}, {status: 401});
  }

  try {
    // Extract customerId from query params if needed
    const url = new URL(request.url);
    const customerId = url.searchParams.get("customerId"); // e.g., ?customerId=123

    if (!customerId) {
      return NextResponse.json(
        {error: "Customer ID is required"},
        {status: 400},
      );
    }

    const response = await axiosInstance.get(`/customer/${customerId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return NextResponse.json(response.data);
  } catch (error) {
    console.error("Error fetching customer:", error); // ✅ Log the error

    if (axios.isAxiosError(error)) {
      return NextResponse.json(
        {error: error.response?.data?.error || "Failed to fetch customer"},
        {status: error.response?.status || 400},
      );
    }

    return NextResponse.json(
      {error: "An unexpected error occurred"},
      {status: 500},
    );
  }
}
