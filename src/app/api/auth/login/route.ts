import { prisma } from "@/src/lib/db";
import { Role } from "@prisma/client";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: Request) {
  try {
    const { email, name, role } = await req.json();

    if (!email || !name || !role) {
      return NextResponse.json(
        { error: "Email, name, and role are required" },
        { status: 400 }
      );
    }

    if (role !== "employee" && role !== "employer") {
      return NextResponse.json(
        { error: "Invalid role selection" },
        { status: 400 }
      );
    }

    const firstName = name.split(" ")[0] || "User";
    const lastName = name.split(" ").slice(1).join(" ") || "";
    const prismaRole = role === "employer" ? Role.employer : Role.employee;

    // Check if user exists, else create
    let user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          id: uuidv4(),
          email,
          firstName,
          lastName,
          role: prismaRole,
        },
      });
    } else {
      // Keep role synced with selection
      if (user.role !== prismaRole) {
        user = await prisma.user.update({
          where: { email },
          data: { role: prismaRole },
        });
      }
    }

    const cookieStore = cookies();
    cookieStore.set("mock_user_email", email, { path: "/" });
    cookieStore.set("user_role", role, { path: "/" });
    cookieStore.set("mock_user_name", name, { path: "/" });
    cookieStore.set("mock_user_id", user.id, { path: "/" });

    return NextResponse.json({ success: true, user });
  } catch (error) {
    console.error("Login API Error:", error);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
