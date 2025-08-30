// TODO: signup API endpoint
// POST /api/auth/signup - Create new user account

import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  // TODO:
  // 1. Get email, name, password from request body
  // 2. Hash the password
  // 3. Check if user already exists
  // 4. Create user in database
  // 5. Return success/error response

  return NextResponse.json({ message: "User signup endpoint" })
}
