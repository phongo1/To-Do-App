"use client";

import { useSession } from "next-auth/react"
import Image from "next/image"

export default function Body() {
    const { status } = useSession()

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

    return (
        <div>
            <h1>BODY</h1>
        </div>
    )
}
