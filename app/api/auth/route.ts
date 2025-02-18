import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { userDb } from "@/lib/db"
import type { ApiResponse, Session } from "@/types"

export async function POST(request: Request) {

    try {
        const { username, password } = await request.json()
        const user = await userDb.get(username) // fetch user usiing his name

        if (!user || user.password !== password) {
            return NextResponse.json<ApiResponse<never>>({ error: "Invalid login information" }, { status: 401 })
        }

        if (user.isBlocked) {
            return NextResponse.json<ApiResponse<never>>({ error: "This account has been blocked." }, { status: 403 })
        }

        // prepare to store user inf in cocoks
        const session: Session = {
            user: {
                id: user.id,
                username: user.username,
            },
            expiresAt: Date.now() + 24 * 60 * 60 * 1000,
        }

        const response = NextResponse.json<ApiResponse<{ username: string }>>({ data: { username: user.username } })

        const cookieStore = await cookies()
        cookieStore.set({
            name: "session",
            value: JSON.stringify(session),
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 24 * 60 * 60,
        })

        return response
    } catch (error) {
        console.error(error)
        return NextResponse.json<ApiResponse<never>>({ error: "Authentication failed" }, { status: 500 })
    }
}