"use client";

import { useSession } from "next-auth/react"
import Image from "next/image"
import { useEffect, useState } from "react"
import type { TodoItem } from "@/app/generated/prisma"
import ToDoItemCard from "./ToDoItemCard"
import AddItem from "./AddItem"
import AddItemModal from "./AddItemModal"
import CompletedTasks from "./CompletedTasks"

export default function Body() {
    const { status, data } = useSession()
    const [todos, setTodos] = useState<TodoItem[]>([])
    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState(false)

    const getAllToDoItems = async () => {
        setLoading(true)
        const res = await fetch('/api/todos')
        const data = await res.json()
        setTodos(Array.isArray(data) ? data : [])
        setLoading(false)
    }

    const toggleCompleted = async (id: string, completed: boolean) => {
        await fetch(`/api/todos/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ completed }),
        })
        getAllToDoItems()
    }

    const deleteTodo = async (id: string) => {
        await fetch(`/api/todos/${id}`, { method: 'DELETE' })
        getAllToDoItems()
    }

    useEffect(() => {
        if (status === 'authenticated') {
            getAllToDoItems()
        }
    }, [status])

    // ==> SIGN IN PLACE HOLDER COMPONENT
    if (status === "unauthenticated") return (
        <div className="flex flex-col items-center py-40 min-h-screen gap-4 h-svh">
            <Image
                src="/empty-box.png"
                alt="Empty box"
                width={300}
                height={300}
                priority
            />
            <p className="text-gray-600 text-lg">
                Please sign in to view and manage your tasks
            </p>
        </div>
    )

    // ==> TODO LIST (signed in user)
    return (
        <div className="flex flex-col px-56 gap-6 pt-8 mt-14 min-h-[30vh] max-h-[60vh]">
            <div className="flex items-center justify-between">
                <span className="font-bold text-3xl text-black">To-Do List</span>
                <button
                    onClick={getAllToDoItems}
                    className="px-4 py-2 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 transition transform hover:scale-105 cursor-pointer"
                >
                    Refresh
                </button>
            </div>
            {loading ? (
                <div className="flex items-center justify-center py-10">
                    <div className="h-8 w-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" aria-label="Loading" />
                </div>
            ) : (
                <ul className="space-y-2">
                    {todos
                      .filter(t => !t.completed)
                      .map((t) => (
                        <li key={t.id}>
                            <ToDoItemCard
                                item={t as TodoItem}
                                onToggle={toggleCompleted}
                                onDelete={deleteTodo}
                            />
                        </li>
                    ))}
                    {todos.length === 0 && (
                        <li className="text-gray-500">No items yet!</li>
                    )}
                </ul>
            )}

            <div className="mt-auto flex justify-end">
              <AddItem
                onClick={() => setOpen(true)}
                className="h-12 w-12 rounded-full bg-blue-600 text-white text-2xl leading-none flex items-center justify-center shadow hover:bg-blue-700 transition transform hover:scale-105 cursor-pointer"
              />
            </div>
            <AddItemModal
              open={open}
              onClose={() => setOpen(false)}
              onCreated={getAllToDoItems}
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              userId={data?.user && (data.user as any).id}
            />
            <CompletedTasks
              items={todos.filter(t => t.completed) as TodoItem[]}
              onToggle={toggleCompleted}
              onDelete={deleteTodo}
            />
        </div>
    )
}
