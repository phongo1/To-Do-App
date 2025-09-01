// TODO: individual todo API endpoints
// GET /api/todos/[id] - Get specific todo
// PUT /api/todos/[id] - Update specific todo
// DELETE /api/todos/[id] - Delete specific todo

import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const todo = await prisma.todoItem.findUnique({ where: { id: params.id } })
  return NextResponse.json(todo)
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const body = await request.json()
  const data: { title?: string; description?: string; completed?: boolean; userId?: string; dueDate?: Date } = {}
  if (body.title !== undefined) data.title = body.title
  if (body.description !== undefined) data.description = body.description
  if (body.completed !== undefined) data.completed = body.completed
  if (body.userId !== undefined) data.userId = body.userId
  if (body.dueDate !== undefined) {
    const str = String(body.dueDate || '')
    const parts = str.split('-').map((n: string) => Number(n))
    const valid = parts.length === 3 && parts.every((n) => !Number.isNaN(n))
    data.dueDate = valid
      ? new Date(Date.UTC(parts[0], parts[1] - 1, parts[2], 12, 0, 0))
      : new Date(body.dueDate)
  }

  const updated = await prisma.todoItem.update({ where: { id: params.id }, data })
  return NextResponse.json(updated)
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const deleted = await prisma.todoItem.delete({ where: { id: params.id } })
  return NextResponse.json(deleted)
}
