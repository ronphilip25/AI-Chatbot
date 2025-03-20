import { NextResponse } from "next/server";
import { supabase } from "./lib/supabaseClient";

export async function middleware(req) {
  const { data } = await supabase.auth.getSession();
  if (!data?.session && req.nextUrl.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"], // Protect /dashboard and subpaths
};
