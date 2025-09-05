"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

type Todo = {
  id: string;
  title: string;
  description?: string | null;
  completed: boolean;
  userId: string;
  dueDate: string | Date;
};

export default function TodoPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const id = params?.id as string;
  const [todo, setTodo] = useState<Todo | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const fetchTodo = async () => {
    setLoading(true);
    const res = await fetch(`/api/todos/${id}`);
    const data = await res.json();
    setTodo(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchTodo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const save = async () => {
    if (!todo) return;
    setSaving(true);
    await fetch(`/api/todos/${todo.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: todo.title,
        description: todo.description ?? undefined,
        completed: todo.completed,
        dueDate: typeof todo.dueDate === 'string' ? todo.dueDate : new Date(todo.dueDate).toISOString().slice(0,10),
      })
    });
    setSaving(false);
    router.back();
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto py-8 px-56">
        <div className="mx-auto max-w-2xl">
          <div className="mb-4">
            <button
              onClick={() => router.back()}
              className="h-10 w-10 rounded-full bg-blue-600 text-white flex items-center justify-center shadow hover:bg-blue-700 transition cursor-pointer"
              aria-label="Go back"
            >
              ←
            </button>
          </div>
          <div className="rounded-2xl bg-white p-6 shadow">

          {loading ? (
            <p className="text-gray-600">Loading…</p>
          ) : todo ? (
            <div className="space-y-4">
              <h1 className="text-2xl font-semibold text-gray-900">Edit Task</h1>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Title</label>
                <input
                  value={todo.title}
                  onChange={(e) => setTodo({ ...(todo as Todo), title: e.target.value })}
                  className="w-full border rounded-md px-3 py-2 text-black"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Due Date</label>
                <input
                  type="date"
                  value={(() => {
                    const d = todo.dueDate;
                    if (typeof d === 'string') return d.slice(0,10);
                    const dt = new Date(d);
                    return new Date(dt.getFullYear(), dt.getMonth(), dt.getDate()).toISOString().slice(0,10);
                  })()}
                  onChange={(e) => setTodo({ ...(todo as Todo), dueDate: e.target.value })}
                  className="w-full border rounded-md px-3 py-2 text-black"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Description</label>
                <textarea
                  value={todo.description ?? ''}
                  onChange={(e) => setTodo({ ...(todo as Todo), description: e.target.value })}
                  rows={4}
                  className="w-full border rounded-md px-3 py-2 text-black"
                />
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={!!todo.completed}
                  onChange={(e) => setTodo({ ...(todo as Todo), completed: e.target.checked })}
                  className="h-5 w-5 accent-blue-600"
                />
                <span className="text-sm text-gray-700">Completed</span>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  onClick={() => router.back()}
                  className="px-4 py-2 rounded-md border hover:bg-gray-50 transition transform hover:scale-105 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={save}
                  disabled={saving}
                  className="px-4 py-2 rounded-md bg-blue-600 text-white disabled:opacity-50 hover:bg-blue-700 transition transform hover:scale-105 cursor-pointer"
                >
                  {saving ? 'Saving…' : 'Save' }
                </button>
              </div>
            </div>
          ) : (
            <p className="text-gray-600">Not found</p>
          )}
          </div>
        </div>
      </div>
    </div>
  );
}
