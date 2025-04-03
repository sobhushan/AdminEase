import { NextResponse, NextRequest } from "next/server";
import pool from "@/app/auth";

export async function POST(request: NextRequest) {
  const { phone } = await request.json();

  try {
    // Check if user exists
    const [user]: any = await pool.query("SELECT * FROM users WHERE phone = ?", [phone]);

    if (user.length === 0) {
      // ✅ If phone is not found, return exists: false
      return NextResponse.json({ exists: false });
    }

    // ✅ If phone exists, return exists: true
    return NextResponse.json({ exists: true });
  } catch (error) {
    console.error("Error checking user:", error);
    return NextResponse.json({ message: "Server error." }, { status: 500 });
  }
}
