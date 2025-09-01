"use client";

import type { TodoItem } from "@/app/generated/prisma";
import { useState } from "react";
import ToDoItemCard from "./ToDoItemCard";

type Props = {
  items: TodoItem[];
  onToggle: (id: string, completed: boolean) => void;
  onDelete: (id: string) => void;
};

export default function CompletedTasks({ items, onToggle, onDelete }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div className="mt-13">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition cursor-pointer"
        aria-expanded={open}
        aria-controls="completed-list"
      >
        <svg
          className={`h-3 w-3 text-gray-500 transition-transform ${open ? 'rotate-90' : ''}`}
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M8 5l8 7-8 7V5z" />
        </svg>
        <span className="text-sm">Completed ({items.length})</span>
      </button>

      {open && (
        <ul id="completed-list" className="space-y-2 mt-3">
          {items.length === 0 ? (
            <li className="text-gray-500">No completed tasks.</li>
          ) : (
            items.map((t) => (
              <li key={t.id}>
                <ToDoItemCard item={t} onToggle={onToggle} onDelete={onDelete} />
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}
