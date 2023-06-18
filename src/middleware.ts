import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};

export function middleware(request: NextRequest) {
  let cookie = request.cookies;

  const hasKey = cookie.has("key");
  const hasUserId = cookie.has("userId");
  const now = new Date();

  // Make sure the user has always a "key" Cookie active. We use the timestamp as ID (not the best but ok for the traffic)
  const response = NextResponse.next();
  // if (!hasKey) {
  //   response.cookies.set({
  //     name: "key",
  //     value: now.getTime().toString(),
  //     path: "/",
  //     expires: now.setTime(now.getTime() + 24 * 60 * 60 * 1000),
  //   });
  // }

  if (!hasUserId) {
    response.cookies.set({
      name: "userId",
      value: "1",
      path: "/",
    });
  }

  return response;
}
