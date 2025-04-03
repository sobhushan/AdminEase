// src/app/api/votecount/route.ts
import { NextResponse, NextRequest } from "next/server";
import pool from "@/app/auth";

export async function GET(req: NextRequest) {
  try {
    console.log("Fetching vote counts for all designs...");

    const [rows]: any = await pool.query(`
      SELECT design_id, COUNT(*) AS total_votes
      FROM votes
      GROUP BY design_id
      ORDER BY total_votes DESC;
    `);

    console.log("Vote counts fetched:", rows);

    return NextResponse.json({ success: true, votes: rows }, { status: 200 });
  } catch (error) {
    console.error("Error fetching vote counts:", error);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}
