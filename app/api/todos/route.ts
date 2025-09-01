// TODO: todos API endpoints
// GET /api/todos - List all todos
// POST /api/todos - Create new todo

import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma';

export async function GET() {
  const todos = await prisma.todoItem.findMany({
    orderBy: { dueDate: 'desc' }
  });
  return NextResponse.json(todos);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const todo = await prisma.todoItem.create({
    data: {
      title: body.title,
      description: body.description,
      userId: body.userId,
      dueDate: new Date(body.dueDate),
      // completed defaults to false in schema
    },
  });
  return NextResponse.json(todo, { status: 201 });
}
