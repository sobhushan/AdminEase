import { NextResponse } from "next/server";
import pool from "@/app/auth";

export async function GET() {
  try {
    const [newArrivals]: [any[], any] = await pool.query(
      "SELECT * FROM designs ORDER BY created_at DESC LIMIT 10"
    );
    return NextResponse.json(newArrivals);
  } catch (error) {
    console.error("Error fetching new arrivals:", error);
    return NextResponse.json({ message: "Error fetching new arrivals" }, { status: 500 });
  }
}
