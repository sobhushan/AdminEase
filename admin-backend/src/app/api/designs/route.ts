// src/app/api/designs/route.ts
import { NextRequest, NextResponse } from "next/server";
import pool from "@/app/auth"; // Ensure this imports your MySQL connection

// GET: Fetch all designs
export async function GET(request: NextRequest) {
  try {
    const [designs] = await pool.query("SELECT * FROM designs");
    return NextResponse.json(designs);
  } catch (error) {
    if (error instanceof Error) {
        return NextResponse.json({ error: "Database error", details: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: "Unknown error occurred" }, { status: 500 });
  }
}

// POST: Create a new design
export async function POST(request: NextRequest) {
  try {
    const { name, description, category, image } = await request.json();
    if (!name || !description || !category || !image) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    await pool.query(
      "INSERT INTO designs (name, description, category, image) VALUES (?, ?, ?, ?)",
      [name, description, category, image]
    );

    return NextResponse.json({ message: "Design added successfully" }, { status: 201 });
  } catch (error) {
    if (error instanceof Error) {
        return NextResponse.json({ error: "Database error", details: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: "Unknown error occurred" }, { status: 500 });
  }
}

// PUT: Update a design
export async function PUT(request: NextRequest) {
  try {
    const { design_id, name, description, category, image } = await request.json();
    if (!design_id || !name || !description || !category || !image) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    await pool.query(
      "UPDATE designs SET name = ?, description = ?, category = ?, image = ? WHERE design_id = ?",
      [name, description, category, image, design_id]
    );

    return NextResponse.json({ message: "Design updated successfully" });
  } catch (error) {
    if (error instanceof Error) {
        return NextResponse.json({ error: "Database error", details: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: "Unknown error occurred" }, { status: 500 });
  }
}

// DELETE: Remove a design
export async function DELETE(request: NextRequest) {
  try {
    const { design_id } = await request.json();
    if (!design_id) {
      return NextResponse.json({ error: "Design ID is required" }, { status: 400 });
    }

    await pool.query("DELETE FROM designs WHERE design_id = ?", [design_id]);

    return NextResponse.json({ message: "Design deleted successfully" });
  } catch (error) {
    if (error instanceof Error) {
        return NextResponse.json({ error: "Database error", details: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: "Unknown error occurred" }, { status: 500 });
  }
}