import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // If user is trying to access any admin route EXCEPT the login page
  if (request.nextUrl.pathname.startsWith("/admin") && !request.nextUrl.pathname.startsWith("/admin/login")) {
    const roleCookie = request.cookies.get("auth_role");
    
    // If not authenticated, redirect to login page
    if (!roleCookie || (roleCookie.value !== "admin" && roleCookie.value !== "user")) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }

    // Role-based route protection
    const role = roleCookie.value;
    const path = request.nextUrl.pathname;

    // Routes restricted to admin ONLY
    const adminOnlyRoutes = [
      "/admin/members",
      "/admin/deposits",
      "/admin/cases"
    ];

    if (role === "user" && adminOnlyRoutes.some(route => path.startsWith(route))) {
      // Redirect users trying to access admin-only pages to the main admin dashboard
      return NextResponse.redirect(new URL("/admin", request.url));
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
