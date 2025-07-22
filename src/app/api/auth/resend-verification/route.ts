// src/app/api/auth/resend-verification/route.ts
import { generateVerificationEmail, sendEmail } from "@/lib/email";
import dbConnect from "@/lib/db";
import { User } from "@/models/auth/User.model";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await dbConnect();
    const { email } = await req.json();

    // Validate email
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Valid email is required" },
        { status: 400 }
      );
    }

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    if (user.isVerified) {
      return NextResponse.json(
        { message: "Email is already verified" },
        { status: 200 }
      );
    }

    // Generate new OTP and expiration
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpires = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes

    // Update user with new OTP
    await User.findByIdAndUpdate(user._id, {
      verificationOTP: otp,
      verificationOTPExpires: otpExpires,
      verificationAttempts: 0
    });

    // Send verification email
    await sendEmail({
      to: email,
      subject: "Verify Your Email",
      html: generateVerificationEmail(user.name, otp)
    });

    return NextResponse.json(
      { message: "Verification OTP resent successfully" },
      { status: 200 }
    );

  } catch (error) {
    console.error("Resend verification error:", error);
    return NextResponse.json(
      { error: "Failed to resend verification email" },
      { status: 500 }
    );
  }
}