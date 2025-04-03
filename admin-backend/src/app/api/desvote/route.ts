import { NextRequest, NextResponse } from "next/server";
import pool from "@/app/auth";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const design_id = searchParams.get("design_id");

    if (!design_id) {
      return NextResponse.json({ error: "Design ID is required" }, { status: 400 });
    }

    console.log(`Fetching votes for design_id: ${design_id}`);

    // Fetch votes along with user details
    const [rows]: any = await pool.query(`
      SELECT 
        v.user_id, 
        u.username, 
        u.phone, 
        u.gender, 
        u.address, 
        u.created_at
      FROM votes v
      JOIN users u ON v.user_id = u.user_id
      WHERE v.design_id = ?;
    `, [design_id]);

    console.log("Votes fetched:", rows);

    return NextResponse.json({ success: true, votes: rows }, { status: 200 });
  } catch (error) {
    console.error("Error fetching votes:", error);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}


export async function PUT(req: NextRequest) {
  try {
    const { userId } = await req.json();

    if (!userId) {
      return NextResponse.json({ error: "Missing userId" }, { status: 400 });
    }

    await pool.execute(`UPDATE users SET status = 'blocked' WHERE user_id = ?`, [
      userId,
    ]);

    return NextResponse.json({ message: "User blocked successfully" });
  } catch (error) {
    console.error("Error blocking user:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { userId } = await req.json();

    if (!userId) {
      return NextResponse.json({ error: "Missing userId" }, { status: 400 });
    }

    await pool.execute(`DELETE FROM users WHERE user_id = ?`, [userId]);

    return NextResponse.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
