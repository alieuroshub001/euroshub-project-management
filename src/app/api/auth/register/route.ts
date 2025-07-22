// src/app/api/auth/signup/route.ts
import { generateVerificationEmail, sendEmail } from "@/lib/email";
import dbConnect from "@/lib/db";
import { User } from "@/models/auth/User.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    const { fullname, email, password, phone } = await req.json();

    if (!fullname || !email || !password) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Always store and compare emails in lowercase
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 409 }
      );
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpires = new Date(Date.now() + 15 * 60 * 1000);

    // Save the password as plain; pre('save') will hash it!
    const newUser = new User({
      name: fullname,
      email: email.toLowerCase(),
      password,
      phone: phone || undefined,
      verificationOTP: otp,
      verificationOTPExpires: otpExpires,
      modifiedBy: "System",
      role: "team",
      status: "pending"
    });
    await newUser.save();

    await sendEmail({
      to: email,
      subject: "Verify Your Email",
      html: generateVerificationEmail(fullname, otp)
    });

    // Remove sensitive fields from response
    const user = newUser.toObject();
    delete user.password;
    delete user.verificationOTP;
    delete user.verificationOTPExpires;

    return NextResponse.json(
      { message: "Verification OTP sent to email", user },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { message: "Signup failed", error: error.message },
      { status: 500 }
    );
  }
}
