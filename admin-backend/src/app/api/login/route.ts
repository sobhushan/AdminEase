//app/api/login/route.ts
import { NextResponse, NextRequest } from "next/server";
import pool from "@/app/auth";

export async function POST(request: NextRequest) {
  const { email, password } = await request.json();

  try {
    const [user]: any = await pool.query(
      "SELECT * FROM users WHERE email = ? AND password = ?",
      [email, password]
    );
    if (user.length > 0) {
      // Return user_id, username, and email after successful login
      return NextResponse.json({
        message: `Login successful! Welcome, ${user[0].username}`,
        user_id: user[0].id,
        username: user[0].username,
        role: user[0].role,
      });
    } else {
      return NextResponse.json({ message: "Invalid Credentials" });
    }
  } catch (error) {
    console.error("Login Error:", error);
    return NextResponse.json({ message: "Login failed." }, { status: 500 });
  }
}
