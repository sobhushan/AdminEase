// src/app/api/users/route.ts
import { NextRequest, NextResponse } from "next/server";
import pool from "@/app/auth"; // Ensure this imports your MySQL connection

// GET: Fetch all users
export async function GET() {
    try {
      const [rows] = await pool.query("SELECT * FROM users WHERE role= 'user' ");
      console.log("data sent users: ", rows);
      return NextResponse.json(rows, { status: 200 });
    } catch (error) {
      return NextResponse.json({ error: "Database connection failed" }, { status: 500 });
    }
  }
  
