// src/app/api/auth/signup/route.ts
import { generateVerificationEmail, sendEmail } from "@/lib/email";
import dbConnect from "@/lib/db";
import { User } from "@/models/auth/User.model";
import { NextRequest, NextResponse } from "next/server";

// Define allowed roles for signup (excluding super-admin for security)
const ALLOWED_SIGNUP_ROLES = ['team', 'client', 'hr', 'admin'] as const;
type AllowedRole = typeof ALLOWED_SIGNUP_ROLES[number];

export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    const { fullname, email, password, phone, role } = await req.json();

    // Validate required fields
    if (!fullname || !email || !password || !role) {
      return NextResponse.json(
        { message: "Missing required fields (fullname, email, password, role)" },
        { status: 400 }
      );
    }

    // Validate role
    if (!ALLOWED_SIGNUP_ROLES.includes(role as AllowedRole)) {
      return NextResponse.json(
        { message: "Invalid role selected" },
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

    // Check if phone number already exists (if provided)
    if (phone) {
      const existingPhoneUser = await User.findOne({ phone: phone.trim() });
      if (existingPhoneUser) {
        return NextResponse.json(
          { message: "Phone number already registered" },
          { status: 409 }
        );
      }
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpires = new Date(Date.now() + 15 * 60 * 1000);

    // Save the password as plain; pre('save') will hash it!
    const newUser = new User({
      name: fullname,
      email: email.toLowerCase(),
      password,
      phone: phone || undefined,
      role: role as AllowedRole, // Use the selected role
      verificationOTP: otp,
      verificationOTPExpires: otpExpires,
      modifiedBy: "System",
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
      { 
        message: "Verification OTP sent to email", 
        user: {
          ...user,
          role: user.role // Include role in response for confirmation
        }
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Signup error:", error);
    
    // Handle specific MongoDB errors
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      const message = field === 'email' 
        ? 'Email already registered' 
        : field === 'phone' 
        ? 'Phone number already registered'
        : 'Duplicate field error';
      
      return NextResponse.json(
        { message },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { message: "Signup failed", error: error.message },
      { status: 500 }
    );
  }
}