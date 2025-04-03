// src/app/api/categories/route.ts
import { NextResponse } from "next/server";
import pool from "@/app/auth";

export async function GET() {
  try {
    const [categories]: [any[], any] = await pool.query("SELECT DISTINCT category, image FROM designs");
    return NextResponse.json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json({ message: "Error fetching categories" }, { status: 500 });
  }
}
