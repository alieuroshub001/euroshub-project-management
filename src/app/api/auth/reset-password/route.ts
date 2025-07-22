import dbConnect from "@/lib/db";
import { User } from "@/models/auth/User.model";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await dbConnect();
    const { email, otp, newPassword } = await req.json();

    if (!email || !otp || otp.length !== 6 || !newPassword) {
      return NextResponse.json(
        { error: "Valid email, 6-digit OTP and new password are required" },
        { status: 400 }
      );
    }

    if (newPassword.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters" },
        { status: 400 }
      );
    }

    const user = await User.findOne({
      email: email.toLowerCase(),
      resetPasswordOTPExpires: { $gt: new Date() }
    }).select("+resetPasswordOTP");

    if (!user) {
      return NextResponse.json(
        { error: "Invalid OTP or expired" },
        { status: 400 }
      );
    }

    // Verify OTP
    const isValidOTP = await bcrypt.compare(otp, user.resetPasswordOTP || "");
    if (!isValidOTP) {
      return NextResponse.json(
        { error: "Invalid OTP" },
        { status: 400 }
      );
    }

    // Set new password as plain; let pre-save hook hash it!
    user.password = newPassword;
    user.isVerified = true;
    user.resetPasswordOTP = undefined;
    user.resetPasswordOTPExpires = undefined;
    await user.save();

    return NextResponse.json(
      { 
        message: "Password reset successfully",
        note: "Your email has also been verified"
      },
      { status: 200 }
    );

  } catch (error) {
    console.error("Reset password error:", error);
    return NextResponse.json(
      { error: "Failed to reset password" },
      { status: 500 }
    );
  }
}
