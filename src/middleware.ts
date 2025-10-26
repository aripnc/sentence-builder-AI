import { type NextRequest, NextResponse } from "next/server";

const publicRoutes = [
  { path: "/login", whenAuthenticated: "redirect" },
  { path: "/signup", whenAuthenticated: "redirect" },
] as const;

const REDIRECT_WHEN_NOT_AUTHENTICATED = "/login";

export function middleware(req: NextRequest) {
  console.log(
    "[MIDDLEWARE_SESSION_TOKEN]: ",
    req.cookies.get("better-auth.session_token"),
  );

  const currentPath = req.nextUrl.pathname;
  const isPublicRoute = publicRoutes.find(
    (route) => route.path === currentPath,
  );

  // const authtoken = req.cookies.get("__Secure-better-auth.session_token");
  const authtoken = req.cookies.get("better-auth.session_token");

  if (!authtoken && isPublicRoute) {
    return NextResponse.next();
  }

  if (!authtoken && !isPublicRoute) {
    const redirectUrl = req.nextUrl.clone();

    redirectUrl.pathname = REDIRECT_WHEN_NOT_AUTHENTICATED;

    return NextResponse.redirect(redirectUrl);
  }

  if (authtoken && isPublicRoute) {
    const redirectUrl = req.nextUrl.clone();

    redirectUrl.pathname = "/dashboard";

    return NextResponse.redirect(redirectUrl);
  }

  if (authtoken && !isPublicRoute) {
    // (checar se jwt esta expirado)
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
