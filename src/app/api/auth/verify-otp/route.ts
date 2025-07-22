// src/app/api/auth/verify-otp/route.ts
import dbConnect from "@/lib/db";
import { User } from "@/models/auth/User.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    const body = await req.json();
    const { email, otp } = body;

    // Debug logs:
    console.log("Received verify-otp body:", body);

    if (!email || !otp) {
      console.log("Missing email or otp:", { email, otp });
      return NextResponse.json(
        { message: "Email and OTP are required" },
        { status: 400 }
      );
    }

    // Ensure email case-insensitive comparison
  const user = await User.findOne({
  email: email.toLowerCase(),
  verificationOTPExpires: { $gt: new Date() },
}).select('+verificationOTP +verificationOTPExpires +verificationAttempts');


    console.log("User found for email:", user ? user.email : null);

    if (!user) {
      console.log("No user found or OTP expired for:", email);
      return NextResponse.json(
        { message: "OTP expired or invalid email" },
        { status: 400 }
      );
    }

    // Defensive: ensure verificationAttempts is a number
    const currentAttempts = typeof user.verificationAttempts === "number"
      ? user.verificationAttempts
      : 0;
    console.log("Current verification attempts:", currentAttempts);

    if (currentAttempts >= 5) {
      console.log("Too many OTP attempts for:", email);
      return NextResponse.json(
        { message: "Too many attempts. Please request a new OTP." },
        { status: 429 }
      );
    }

    // String compare for OTP (important if DB might store as number)
    if (String(user.verificationOTP) !== String(otp)) {
      user.verificationAttempts = currentAttempts + 1;
      await user.save();
      console.log(
        "Invalid OTP. Provided:", otp,
        "Expected:", user.verificationOTP
      );
      return NextResponse.json(
        { message: "Invalid OTP" },
        { status: 400 }
      );
    }

    // Success: verify user
    user.isVerified = true;
    user.verificationOTP = undefined;
    user.verificationOTPExpires = undefined;
    user.verificationAttempts = 0;
    await user.save();

    console.log("User verified successfully:", email);

    return NextResponse.json(
      { message: "Email verified successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Verification error:", error);
    return NextResponse.json(
      { message: "Verification failed", error: error.message },
      { status: 500 }
    );
  }
}
