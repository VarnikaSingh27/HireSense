import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = cookies();
  const email = cookieStore.get("mock_user_email")?.value;
  const name = cookieStore.get("mock_user_name")?.value || "User";
  const id = cookieStore.get("mock_user_id")?.value;

  if (!email || !id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const firstName = name.split(" ")[0];
  const lastName = name.split(" ").slice(1).join(" ") || "";

  return NextResponse.json({
    email,
    id,
    firstName,
    lastName,
    profileImage: null,
  });
}
