// app/auth.ts
import mysql from 'mysql2/promise';
import { NextRequest, NextResponse } from "next/server";


// Create MySQL connection
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
//   password: '**********', // Replace with your MySQL password
  database: 'adminease',
  waitForConnections: true, // Prevents overload
  connectionLimit: 10, // Limits simultaneous connections
  queueLimit: 0, // Ensures requests are queued
});

// Test MySQL connection
const testConnection = async () => {
  let connection;
  try {
    connection = await pool.getConnection(); 
    await connection.query('SELECT 1'); 
    console.log('✅ Connected to MySQL database!');
  } catch (error) {
    console.error('❌ Error connecting to MySQL database:', error);
  } finally {
    if (connection) connection.release(); 
  }
};
testConnection();
export default pool;
