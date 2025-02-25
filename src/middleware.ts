import {NextResponse, NextRequest} from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("jwtToken")?.value;
  const currentPath = request.nextUrl.pathname;

  if (currentPath === "/" && token) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if ((currentPath === "/" || currentPath === "/dashboard") && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (["/login", "/register"].includes(currentPath) && token) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/login", "/register", "/dashboard/:path*"],
};
