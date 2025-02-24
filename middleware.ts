import {NextResponse, NextRequest} from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("accessToken")?.value;
  const currentPath = request.nextUrl.pathname;

  console.log("Current Path:", currentPath);
  console.log("Access Token:", token);

  // Protected routes
  const protectedRoutes = ["/"];

  // Redirect to login if accessing protected routes without a token
  if (protectedRoutes.includes(currentPath) && !token) {
    console.log("Redirecting to /login");
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Redirect to root if already logged in and accessing login/register
  if (["/login", "/register"].includes(currentPath) && token) {
    console.log("User already logged in, redirecting to /");
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/login", "/register"],
};
