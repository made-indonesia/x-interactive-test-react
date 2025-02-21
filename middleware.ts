// import {NextResponse} from "next/server";
// import type {NextRequest} from "next/server";
// import {getToken} from "next-auth/jwt";

// export async function middleware(req: NextRequest) {
//   // const token = await getToken({req, secret: process.env.NEXTAUTH_SECRET});
//   const token = null;
//   const {pathname} = req.nextUrl;

//   if (pathname === "/" || pathname === "") {
//     return NextResponse.redirect(new URL(token ? "/" : "/login", req.url));
//   }

//   const protectedPaths = ["/"];
//   const isProtected = protectedPaths.some(path => pathname.startsWith(path));

//   if (isProtected && !token) {
//     return NextResponse.redirect(new URL("/login", req.url));
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/"],
// };
