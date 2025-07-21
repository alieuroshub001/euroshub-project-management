// src/app/api/auth/logout/route.ts
import { NextResponse } from "next/server";
import { auth } from "@/auth";

export async function GET() {
  try {
    const session = await auth();
    
    if (!session) {
      return NextResponse.json(
        { message: "No active session" },
        { status: 200 }
      );
    }

    // Invalidate session on server-side
    await fetch(`${process.env.NEXTAUTH_URL}/api/auth/signout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ sessionToken: session.sessionToken }),
    });

    // Clear client-side cookies
    const response = NextResponse.json(
      { message: "Logged out successfully" },
      { status: 200 }
    );

    // Clear all auth cookies
    response.cookies.delete("next-auth.session-token");
    response.cookies.delete("__Secure-next-auth.session-token");

    return response;

  } catch (error: any) {
    console.error("Logout error:", error);
    return NextResponse.json(
      { message: "Logout failed", error: error.message },
      { status: 500 }
    );
  }
}

export async function POST() {
  return GET(); // Handle POST requests the same way
}