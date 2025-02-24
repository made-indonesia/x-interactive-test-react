import {NextResponse, NextRequest} from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("jwtToken")?.value;
  const currentPath = request.nextUrl.pathname;

  console.log("Current Path:", currentPath);
  console.log("JWT Token:", token);

  // ✅ If user is at "/" and logged in, redirect to "/dashboard"
  if (currentPath === "/" && token) {
    console.log("User logged in, redirecting to /dashboard");
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // ✅ Redirect to login if accessing "/" or "/dashboard" without token
  if ((currentPath === "/" || currentPath === "/dashboard") && !token) {
    console.log("No token, redirecting to /login");
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // ✅ Redirect to dashboard if already logged in and accessing login/register
  if (["/login", "/register"].includes(currentPath) && token) {
    console.log("Already logged in, redirecting to /dashboard");
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/login", "/register", "/dashboard/:path*"],
};
