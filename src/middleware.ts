import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // If user is trying to access any admin route EXCEPT the login page
  if (request.nextUrl.pathname.startsWith("/admin") && !request.nextUrl.pathname.startsWith("/admin/login")) {
    const adminToken = request.cookies.get("admin_token");
    
    // If not authenticated, redirect to login page
    if (!adminToken || adminToken.value !== "authenticated") {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
