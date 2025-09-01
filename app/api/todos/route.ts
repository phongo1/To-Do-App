// TODO: todos API endpoints
// GET /api/todos - List all todos
// POST /api/todos - Create new todo

import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma';

export async function GET() {
  const todos = await prisma.todoItem.findMany({
    orderBy: { dueDate: 'asc' }
  });
  return NextResponse.json(todos);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  // Normalize dueDate (YYYY-MM-DD) to a stable UTC-noon to avoid timezone off-by-one
  const str = String(body.dueDate || '')
  const parts = str.split('-').map(Number)
  const due = parts.length === 3 && parts.every(n => !Number.isNaN(n))
    ? new Date(Date.UTC(parts[0], parts[1] - 1, parts[2], 12, 0, 0))
    : new Date(body.dueDate)

  const todo = await prisma.todoItem.create({
    data: {
      title: body.title,
      description: body.description,
      userId: body.userId,
      dueDate: due,
      // completed defaults to false in schema
    },
  });
  return NextResponse.json(todo, { status: 201 });
}
