import {NextResponse} from "next/server";
import axiosInstance from "@/lib/axiosInstance";
import {cookies} from "next/headers";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("jwtToken")?.value;
    // console.log("token", token);
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

// export async function GET() {
//   try {
//     const cookieStore = await cookies();
//     const token = cookieStore.get("accessToken")?.value;
//     console.log("token", token);

//     if (!token) {
//       return NextResponse.json({error: "Unauthorized"}, {status: 401});
//     }

//     // Panggil API
//     const response = await axiosInstance.get("/connect/exact", {
//       headers: {Authorization: `Bearer ${token}`},
//     });

//     // ✅ Ambil auth_url dari response
//     const originalAuthUrl = response.data.auth_url;

//     // 🔄 Ganti redirect_uri di dalam auth_url
//     const newRedirectUri = encodeURIComponent("https://localhost:3000");
//     const modifiedAuthUrl = originalAuthUrl.replace(
//       /redirect_uri=([^&]+)/,
//       `redirect_uri=${newRedirectUri}`,
//     );

//     // ✅ Buat data baru dengan auth_url yang sudah diganti
//     const modifiedData = {
//       ...response.data,
//       auth_url: modifiedAuthUrl,
//     };

//     return NextResponse.json(modifiedData);
//   } catch (error: any) {
//     return NextResponse.json(
//       {error: error.response?.data?.error || "SSO failed"},
//       {status: error.response?.status || 500},
//     );
//   }
// }
