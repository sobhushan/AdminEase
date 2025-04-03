import { NextResponse, NextRequest } from "next/server";
import pool from "@/app/auth";

export async function GET(req: NextRequest) {
  const category = req.nextUrl.pathname.split("/").pop(); // Extract category from URL

  if (!category) {
    return NextResponse.json({ message: "Category is missing" }, { status: 400 });
  }

  try {
    const [designs]: [any[], any] = await pool.query(
      "SELECT * FROM designs WHERE category = ?", [category]
    );

    if (designs.length === 0) {
      return NextResponse.json({ message: "No designs found in this category" }, { status: 404 });
    }

    return NextResponse.json(designs);
  } catch (error) {
    console.error("Error fetching category designs:", error);
    return NextResponse.json({ message: "Error fetching category designs" }, { status: 500 });
  }
}
