// TODO: todos API endpoints
// GET /api/todos - List all todos
// POST /api/todos - Create new todo

import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  // TODO: Implement GET logic
  return NextResponse.json({ message: "Get all todos" })
}

export async function POST(request: NextRequest) {
  // TODO: Implement POST logic
  return NextResponse.json({ message: "Create new todo" })
}
