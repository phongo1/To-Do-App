"use client";

type Props = {
  onClick?: () => void
  className?: string
}

export default function AddItem({ onClick, className }: Props) {
  const base = "h-12 w-12 rounded-full bg-blue-600 text-white text-3xl leading-none flex items-center justify-center shadow-lg hover:bg-blue-700 active:scale-95 transition cursor-pointer";
  return (
    <button
      aria-label="Add item"
      title="Add item"
      onClick={onClick}
      className={`${base} ${className ?? 'fixed bottom-6 right-6'}`}
    >
      +
    </button>
  )
}
