// src/app/api/userdesign/route.ts
import { NextResponse, NextRequest } from "next/server";
import pool from "@/app/auth";

export async function GET(req: NextRequest) {
  const user_id = req.nextUrl.searchParams.get("user_id");

  if (!user_id) {
    console.error("User ID is missing");
    return NextResponse.json({ message: "User ID is missing" }, { status: 400 });
  }

  try {
    // Query to fetch designs that the user has voted on
    const [results]: [any[], any] = await pool.query(
      "SELECT d.* FROM designs d JOIN votes v ON d.design_id = v.design_id WHERE v.user_id = ?",
      [user_id]
    );

    // Check if no designs are returned (access 'rows' from QueryResult)
    if (results.length === 0) {
      return NextResponse.json({ message: "No voted designs found" }, { status: 404 });
    }

    // Return the designs
    return NextResponse.json(results);
  } catch (error) {
    // Log error for debugging purposes
    console.error("Error fetching voted designs:", error);

    // Return a generic error message
    return NextResponse.json({ message: "Error fetching voted designs" }, { status: 500 });
  }
}
