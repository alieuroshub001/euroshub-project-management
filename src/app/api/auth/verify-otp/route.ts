// src/app/api/auth/verify/route.ts
import dbConnect from "@/lib/db";
import { User } from "@/models/auth/User.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    
    const { email, otp } = await req.json();
    
    if (!email || !otp) {
      return NextResponse.json(
        { message: "Email and OTP are required" },
        { status: 400 }
      );
    }
    
    const user = await User.findOne({
      email,
      verificationOTPExpires: { $gt: new Date() }
    });
    
    if (!user) {
      return NextResponse.json(
        { message: "OTP expired or invalid email" },
        { status: 400 }
      );
    }
    
    // Handle potential undefined verificationAttempts
    const currentAttempts = user.verificationAttempts || 0;
    
    if (currentAttempts >= 5) {
      return NextResponse.json(
        { message: "Too many attempts. Please request a new OTP." },
        { status: 429 }
      );
    }
    
    if (user.verificationOTP !== otp) {
      user.verificationAttempts = currentAttempts + 1;
      await user.save();
      return NextResponse.json(
        { message: "Invalid OTP" },
        { status: 400 }
      );
    }
    
    user.isVerified = true;
    user.verificationOTP = undefined;
    user.verificationOTPExpires = undefined;
    user.verificationAttempts = 0;
    await user.save();
    
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