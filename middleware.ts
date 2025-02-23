// // middleware.js
// import {NextResponse} from "next/server";
// import {cookies} from "next/headers";

// export function middleware(request) {
//   const token = cookies().get("accessToken")?.value;

//   // Daftar route yang perlu diproteksi
//   const protectedRoutes = ["/dashboard", "/profile"];

//   // Jika pengguna mencoba mengakses route yang diproteksi dan tidak memiliki token
//   if (protectedRoutes.includes(request.nextUrl.pathname) && !token) {
//     // Redirect ke halaman login
//     return NextResponse.redirect(new URL("/login", request.url));
//   }

//   // Jika pengguna sudah login dan mencoba mengakses halaman login/register
//   if (["/login", "/register"].includes(request.nextUrl.pathname) && token) {
//     // Redirect ke halaman dashboard
//     return NextResponse.redirect(new URL("/dashboard", request.url));
//   }

//   return NextResponse.next();
// }
