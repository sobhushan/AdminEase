// app/api/hello/route.ts
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const name = request.headers.get('name');
  const message = { message: `Hello ${name}, from the server GET!` };
  return new Response(JSON.stringify(message), {
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function POST(request: NextRequest) {
  const { name } = await request.json();
  const message = { message: `Hello ${name}, from Next.js POST API!` };
  return new Response(JSON.stringify(message), {
    headers: { 'Content-Type': 'application/json' },
  })};