// TODO: individual todo API endpoints
// GET /api/todos/[id] - Get specific todo
// PUT /api/todos/[id] - Update specific todo
// DELETE /api/todos/[id] - Delete specific todo

import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  // TODO: Implement GET logic
  return NextResponse.json({ message: `Get todo ${params.id}` })
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  // TODO: Implement PUT logic
  return NextResponse.json({ message: `Update todo ${params.id}` })
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  // TODO: Implement DELETE logic
  return NextResponse.json({ message: `Delete todo ${params.id}` })
}
