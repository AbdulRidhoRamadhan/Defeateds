import { cookies } from "next/headers";
import { verifyWithJose } from "./helpers/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const auth = cookies().get("Authorization")?.value;

  if (request.nextUrl.pathname.startsWith("/api/wishlists")) {
    if (!auth) {
      return Response.json(
        {
          message: "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }
    const [type, token] = auth?.split(" ");
    if (type !== "Bearer") {
      return Response.json(
        {
          message: "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

    const verrified = await verifyWithJose<{ _id: string }>(token);
    console.log(verrified);

    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-user-id", verrified._id);

    const response = NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });

    return response;
  }

  if (request.nextUrl.pathname.startsWith("/wishlists")) {
    if (!auth) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }
}

export const config = {
  matcher: ["/wishlists/:path*", "/api/wishlists/:path*"],
};
