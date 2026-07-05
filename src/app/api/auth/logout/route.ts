import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  const cookieStore = cookies();
  cookieStore.delete("mock_user_email");
  cookieStore.delete("user_role");
  cookieStore.delete("mock_user_name");
  cookieStore.delete("mock_user_id");

  return NextResponse.json({ success: true });
}

export async function GET() {
  const cookieStore = cookies();
  cookieStore.delete("mock_user_email");
  cookieStore.delete("user_role");
  cookieStore.delete("mock_user_name");
  cookieStore.delete("mock_user_id");

  // Also support direct GET redirect to login page
  return NextResponse.redirect(new URL("/login", process.env.KINDE_SITE_URL || "http://localhost:3000"));
}
