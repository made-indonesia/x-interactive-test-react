import {NextResponse, type NextRequest} from "next/server";
import {cookies} from "next/headers";
import axiosInstance from "@/lib/axiosInstance";

export async function GET(_: NextRequest, context: {params: any}) {
  const id = context.params.id;

  console.log("Customer ID:", id);

  if (!id) {
    return NextResponse.json({error: "Customer ID is required"}, {status: 400});
  }

  const cookieStore = await cookies();
  const token = cookieStore.get("jwtToken")?.value;

  if (!token) {
    return NextResponse.json({error: "Unauthorized"}, {status: 401});
  }

  try {
    const response = await axiosInstance.get(`/customer/${id}/pdf`, {
      responseType: "arraybuffer",
      headers: {Authorization: `Bearer ${token}`},
    });

    return new NextResponse(response.data, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `inline; filename="customer_${id}.pdf"`,
      },
    });
  } catch (error) {
    console.error("PDF Fetch Error:", error);
    return NextResponse.json(
      {error: "Failed to fetch customer PDF"},
      {status: 500},
    );
  }
}
