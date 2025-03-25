// src/app/api/designs/liked/route.ts
import { NextResponse, NextRequest } from "next/server";
import pool from "@/app/auth";

export async function GET(req: NextRequest) {
  const user_id = req.nextUrl.searchParams.get("user_id");

  try {
    const [designs] = await pool.query(
      "SELECT * FROM designs WHERE id IN (SELECT design_id FROM liked_designs WHERE user_id = ?)",
      [user_id]
    );
    return NextResponse.json(designs);
  } catch (error) {
    return NextResponse.json({ message: "Error fetching liked designs" }, { status: 500 });
  }
}
