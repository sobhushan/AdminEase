//src/app/api/signup/route.ts
import { NextRequest, NextResponse } from 'next/server';
import pool from '@/app/auth';

export async function POST(request: NextRequest) {
  try {
    const { username, phone, gender, address } = await request.json();
    console.log('Signup attempt:', username, phone, gender, address);

    // Check if user already exists by phone number
    const [existingUser]: any = await pool.query(
      'SELECT * FROM users WHERE phone = ?',
      [phone]
    );

    if (existingUser.length > 0) {
      return NextResponse.json(
        { message: 'User with this phone number already exists' },
        { status: 409 }
      );
    }

    // Insert new user
    await pool.query(
      'INSERT INTO users (username, phone, gender, address) VALUES (?, ?, ?, ?)',
      [username, phone, gender, address]
    );

    return NextResponse.json({ success: true, message: 'Signup successful!' }, { status: 201 });

  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
