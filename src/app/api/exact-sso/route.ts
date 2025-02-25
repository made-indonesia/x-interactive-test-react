import {NextResponse} from "next/server";
import axiosInstance from "@/lib/axiosInstance";
import {cookies} from "next/headers";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("jwtToken")?.value;
    if (!token) {
      return NextResponse.json({error: "Unauthorized"}, {status: 401});
    }

    const response = await axiosInstance.get("/connect/exact", {
      headers: {Authorization: `Bearer ${token}`},
    });

    return NextResponse.json(response.data);
  } catch (error: any) {
    return NextResponse.json(
      {error: error.response?.data?.error || "SSO failed"},
      {status: error.response?.status || 500},
    );
  }
}
