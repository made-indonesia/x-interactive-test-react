import {NextResponse} from "next/server";
import {cookies} from "next/headers";

export async function GET(request) {
  // ✅ Use consistent cookie name
  const token = cookies().get("accessToken")?.value;

  if (!token) {
    return NextResponse.json({error: "Unauthorized"}, {status: 401});
  }

  try {
    const response = await fetch(
      "https://staging-symfony.admin-developer.com/auth/me",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (!response.ok) {
      return NextResponse.json(
        {error: "Failed to fetch user"},
        {status: response.status},
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({error: "Server error"}, {status: 500});
  }
}
