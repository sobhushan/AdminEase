//app/api/login/route.ts
import { NextResponse, NextRequest } from "next/server";
import pool from "@/app/auth";

export async function POST(request: NextRequest) {
  const { phone, otp } = await request.json();

  try {
    // Check if user exists
    const [user]: any = await pool.query("SELECT * FROM users WHERE phone = ?", [phone]);

    if (user.length === 0) {
      // Return exists: false for new users
      return NextResponse.json({
        message: "User not found. Redirecting to signup...",
        exists: false, // ✅ Changed from userExists
      });
    }

    // If OTP is provided, verify it
    if (otp) {
      if (otp !== "1234") {
        return NextResponse.json({ message: "Invalid OTP. Try again." });
      }

      // OTP is valid, return user details
      return NextResponse.json({
        message: `Login successful! Welcome, ${user[0].username}`,
        user_id: user[0].user_id,
        username: user[0].username,
        role: user[0].role,
        exists: true, // ✅ Ensure correct key is returned
      });
    }

    // If OTP is not provided, it's the OTP request step
    return NextResponse.json({
      message: "OTP sent to your phone number",
      exists: true, // ✅ Ensure correct key is returned
    });
  } catch (error) {
    console.error("Login Error:", error);
    return NextResponse.json({ message: "Login failed." }, { status: 500 });
  }
}

