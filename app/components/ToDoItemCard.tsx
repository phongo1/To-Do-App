"use client";
import type { TodoItem } from "@/app/generated/prisma"
import { useRouter } from "next/navigation"
import { FiTrash2 } from "react-icons/fi"

type Props = {
  item: TodoItem
  onToggle: (id: string, completed: boolean) => void
  onDelete: (id: string) => void
}

export default function ToDoItemCard({ item, onToggle, onDelete }: Props) {
  const router = useRouter()
  const due = item?.dueDate ? new Date(item.dueDate) : null
  return (
    <div
      className="group cursor-pointer rounded-xl px-5 py-4 bg-gray-100 text-black shadow-sm hover:shadow-md transition border-l-4 border-blue-500"
      onClick={() => router.push(`/todos/${item.id}`)}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            checked={!!item.completed}
            onChange={(e) => onToggle(item.id, e.target.checked)}
            onClick={(e) => e.stopPropagation()}
            className="mt-1 h-5 w-5 accent-blue-600"
          />
          <div>
            <p className="text-lg font-semibold tracking-tight text-gray-900">
              {item.title}
            </p>
            {item.description && (
              <p className="text-sm text-gray-600 leading-snug">{item.description}</p>
            )}
            {due && (
              <p className="text-sm text-gray-700 mt-2">Due: <span className="text-blue-600 font-semibold">{due.toLocaleDateString()}</span></p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={(e) => { e.stopPropagation(); onDelete(item.id); }}
            className="p-2 rounded-md text-red-600 hover:text-red-700 hover:bg-red-50 transition transform hover:scale-110 cursor-pointer"
            aria-label="Delete task"
            title="Delete"
          >
            <FiTrash2 className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  )
}
