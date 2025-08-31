"use client"

import { signIn, signOut, useSession } from "next-auth/react"
import Image from "next/image"

export function SignIn() {
  return (
    <button
      onClick={() => signIn("google")}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >
      Sign in with Google
    </button>
  )
}

export function SignOut() {
  return (
    <button
      onClick={() => signOut()}
      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
    >
      Sign out
    </button>
  )
}

export function UserProfile() {
  const { data: session, status } = useSession()

  console.log("Session status:", status, "Session data:", session)

  if (status === "loading") {
    return (
      <div className="w-8 h-8 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin" />
    )
  }

  if (status === "unauthenticated") return <SignIn />

  return (
    <div className="flex items-center gap-10">
      <div className="flex flex-col gap-1 items-center">
        <Image
          src={session?.user?.image ?? "/default-profile.png"}
          alt={session?.user?.name ? `Profile image of ${session.user.name}` : "User profile image"}
          width={40}
          height={40}
          className="rounded-full"
        />
        <span className="text-black font-bold">Welcome, {session?.user?.name || "User"}!</span>
      </div>
      <SignOut />
    </div>
  )
}
