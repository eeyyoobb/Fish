import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { routeAccessMap } from "./lib/settings"; // Ensure this map is defined correctly
import { NextResponse } from "next/server";

const matchers = Object.keys(routeAccessMap).map((route) => ({
  matcher: createRouteMatcher([route]),
  allowedRoles: routeAccessMap[route],
}));

export default clerkMiddleware((auth, req) => {
  const { sessionClaims } = auth();

  const role = (sessionClaims?.metadata as { role?: string })?.role;

  // Check each route matcher against the incoming request
  for (const { matcher, allowedRoles } of matchers) {
    if (matcher(req)) {
      // If the role is not allowed for the matched route
      if (!allowedRoles.includes(role!)) {
        // Redirect to a page based on role or a default page
        return NextResponse.redirect(new URL(`/${role}`, req.url));
      }
    }
  }

  // Continue processing the request if everything is fine
  return NextResponse.next();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
