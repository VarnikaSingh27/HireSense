import { prisma } from "@/src/lib/db";
import { Role } from "@prisma/client";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: Request) {
  try {
    const { email, name, role, mode = "login" } = await req.json();

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    // Check if user exists
    let user = await prisma.user.findUnique({
      where: { email },
    });

    if (mode === "login") {
      if (!user) {
        return NextResponse.json(
          { error: "User ID not found. Please sign up." },
          { status: 404 }
        );
      }
    } else {
      // Sign Up mode
      if (user) {
        return NextResponse.json(
          { error: "Email is already registered. Please log in." },
          { status: 400 }
        );
      }

      if (!name || !role) {
        return NextResponse.json(
          { error: "Name and role are required for sign up." },
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

      user = await prisma.user.create({
        data: {
          id: uuidv4(),
          email,
          firstName,
          lastName,
          role: prismaRole,
        },
      });
    }

    const resolvedRole = user.role === "employer" ? "employer" : "employee";
    const resolvedName = `${user.firstName} ${user.lastName || ""}`.trim();

    const cookieStore = cookies();
    cookieStore.set("mock_user_email", user.email, { path: "/" });
    cookieStore.set("user_role", resolvedRole, { path: "/" });
    cookieStore.set("mock_user_name", resolvedName, { path: "/" });
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
