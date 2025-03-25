// src/app/api/designs/route.ts
import { NextResponse } from "next/server";
import pool from "@/app/auth";

export async function GET() {
  try {
    const [designs] = await pool.query("SELECT * FROM designs");
    return NextResponse.json(designs);
  } catch (error) {
    return NextResponse.json({ message: "Error fetching designs" }, { status: 500 });
  }
}
