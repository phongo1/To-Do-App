"use client";

import { useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";

function formatLocalYMD(d: Date) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function parseYMD(value: string | undefined) {
  if (!value) return undefined;
  const [y, m, d] = value.split('-').map(Number);
  if (!y || !m || !d) return undefined;
  return new Date(y, m - 1, d);
}

type Props = {
  open: boolean;
  onClose: () => void;
  onCreated?: () => void;
  userId?: string;
};

export default function AddItemModal({ open, onClose, onCreated, userId }: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState<string>("");
  const [submitting, setSubmitting] = useState(false);
  const [showPicker, setShowPicker] = useState(false);
  const [touched, setTouched] = useState<{title?: boolean; dueDate?: boolean}>({});

  if (!open) return null;

  const submit = async () => {
    // simple required checks
    if (!title || !dueDate) {
      setTouched({ title: true, dueDate: true });
      return;
    }
    setSubmitting(true);
    await fetch('/api/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title,
        description: description || undefined,
        userId,
        dueDate,
      }),
    });
    setSubmitting(false);
    setTitle("");
    setDescription("");
    setDueDate("");
    setShowPicker(false);
    onClose();
    onCreated?.();
  };

  return (
    <div className="fixed inset-0 z-50">
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
        aria-hidden
      />
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="w-full max-w-xl rounded-2xl bg-white shadow-xl p-6 text-black">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Add New Task</h2>
            <button
              onClick={onClose}
              className="h-8 w-8 rounded-full flex items-center justify-center hover:bg-gray-100"
              aria-label="Close"
            >
              X
            </button>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">Title</label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onBlur={() => setTouched((t) => ({ ...t, title: true }))}
                className={`w-full border rounded-md px-3 py-2 text-black ${touched.title && !title ? 'border-red-500' : ''}`}
                placeholder="Task title"
              />
              {touched.title && !title && (
                <p className="text-xs text-red-600 mt-1">Title is required.</p>
              )}
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Due Date</label>
              <div className="relative">
                <div className="flex items-center gap-2">
                  <input
                    value={dueDate}
                    onChange={() => {}}
                    onBlur={() => setTouched((t) => ({ ...t, dueDate: true }))}
                    readOnly
                    placeholder="YYYY-MM-DD"
                    className={`flex-1 border rounded-md px-3 py-2 text-black bg-white ${touched.dueDate && !dueDate ? 'border-red-500' : ''}`}
                  />
                  <button
                    type="button"
                    className="h-10 w-10 flex items-center justify-center rounded-md border hover:bg-gray-50"
                    onClick={() => setShowPicker((v) => !v)}
                    aria-label="Open calendar"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                      <path d="M7 2a1 1 0 011 1v1h8V3a1 1 0 112 0v1h1a2 2 0 012 2v13a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2h1V3a1 1 0 011-1zm12 8H5v9a1 1 0 001 1h12a1 1 0 001-1v-9zM5 8h14V6H5v2z" />
                    </svg>
                  </button>
                </div>
                {touched.dueDate && !dueDate && (
                  <p className="text-xs text-red-600 mt-1">Due date is required.</p>
                )}
                {showPicker && (
                  <div className="absolute z-10 mt-2 border rounded-md bg-white shadow p-2">
                    <DayPicker
                      mode="single"
                      selected={parseYMD(dueDate)}
                      onSelect={(d) => {
                        const val = d ? formatLocalYMD(d) : "";
                        setDueDate(val);
                        setTouched((t) => ({ ...t, dueDate: true }));
                        setShowPicker(false);
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full border rounded-md px-3 py-2 text-black"
                rows={3}
                placeholder="Optional details"
              />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={submit}
                disabled={submitting}
                className="px-4 py-2 rounded-md bg-blue-600 text-white disabled:opacity-50 hover:bg-blue-700 transition transform hover:scale-105 cursor-pointer"
              >
                {submitting ? 'Adding…' : 'Add Item'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
