// src/app/api/designs/route.ts
import { NextRequest, NextResponse } from "next/server";
import pool from "@/app/auth"; // Ensure this imports your MySQL connection

const allowedOrigin = "http://localhost:5173";

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
export async function PUT(req: NextRequest) {
    try {
      const body = await req.json();
      console.log("Received PUT request body:", body);
  
      const { design_id, name, description, category, image } = body;
  
      if (!design_id || !name || !description || !category || !image) {
        return NextResponse.json({ error: "All fields are required" }, { status: 400 });
      }
  
      console.log("Updating design with ID:", design_id);
  
      // Update design in the database
      const [result]: any = await pool.query(
        "UPDATE designs SET name = ?, description = ?, category = ?, image = ? WHERE design_id = ?",
        [name, description, category, image, design_id]
      );
  
      console.log("Update result:", result);
  
      if (result.affectedRows === 0) {
        return NextResponse.json({ error: "Design not found" }, { status: 404 });
      }
  
      return NextResponse.json({ message: "Design updated successfully" }, { status: 200 });
    } catch (error) {
      console.error("PUT Error:", error);
      return NextResponse.json({ error: "Database error" }, { status: 500 });
    }
  }
  

// DELETE: Remove a design
export async function DELETE(req: NextRequest) {
    try {
      const body = await req.json();
      console.log("Received DELETE request body:", body);
  
      const design_id = body.design_id;
  
      if (!design_id) {
        console.error("Design ID is missing in request body!");
        return NextResponse.json({ error: "Design ID is required" }, { status: 400 });
      }
  
      console.log("Deleting design with ID:", design_id);
  
      // Delete design from database
      const [result]: any = await pool.query("DELETE FROM designs WHERE design_id = ?", [design_id]);
  
      console.log("Delete result:", result);
  
      if (result.affectedRows === 0) {
        return NextResponse.json({ error: "Design not found" }, { status: 404 });
      }
  
      return NextResponse.json({ message: "Design deleted successfully" }, { status: 200 });
    } catch (error) {
      console.error("DELETE Error:", error);
      return NextResponse.json({ error: "Database error" }, { status: 500 });
    }
  }
  

// // Handle CORS Preflight Requests
export async function OPTIONS() {
    return new NextResponse(null, {
        status: 204,
        headers: {
            "Access-Control-Allow-Origin": allowedOrigin,
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type, Authorization, user-id",
        }
    });
}