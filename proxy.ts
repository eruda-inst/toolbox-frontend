import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const publicRoutes = [
  "/login",
  "/login/esqueci-minha-senha",
  "/login/esqueci-minha-senha/verificar-codigo",
  "/login/esqueci-minha-senha/redefinir-senha",
];

export default async function proxy(request: NextRequest) {
  const url = request.nextUrl;
  const { pathname } = url;

  if (
    url.searchParams.has("_rsc") ||
    pathname.startsWith("/_next") ||
    pathname === "/favicon.ico" ||
    pathname.startsWith("/api") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  const accessToken = request.cookies.get("access_token")?.value;
  const hasToken = !!accessToken;

  const isPublicRoute = publicRoutes.some((route) => pathname === route);

  // 1. If there is no token and we are trying to access a protected route -> redirect to /login
  if (!hasToken && !isPublicRoute) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // 2. If there is token and it is trying to access a public route (login)
  if (hasToken && isPublicRoute) {
    if (
      pathname === "/login" &&
      url.searchParams.get("error") === "unauthorized"
    ) {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
