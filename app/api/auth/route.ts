import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { userDb } from "@/lib/db"
import type { ApiResponse, Session } from "@/types"
import { envConfig } from "@/lib/env"

const MAX_LOGIN_ATTEMPTS = 3

export async function POST(request: Request) {
    try {
        const { username, password } = await request.json()
        const user = userDb.get(username)

        if (!user) {
            return NextResponse.json<ApiResponse<never>>({
                error: "Invalid login information"
            }, { status: 401 })
        }

        if (user.isBlocked) {
            return NextResponse.json<ApiResponse<never>>({
                error: "This account has been blocked."
            }, { status: 403 })
        }

        if (user.password !== password) {
            // incemnt failed login attempts
            user.loginAttempts = (user.loginAttempts || 0) + 1

            if (user.loginAttempts >= MAX_LOGIN_ATTEMPTS) {
                user.isBlocked = true
                return NextResponse.json<ApiResponse<never>>({
                    error: "This account has been blocked due to multiple failed login attempts."
                }, { status: 403 })
            }

            return NextResponse.json<ApiResponse<never>>({
                error: "Invalid login information"
            }, { status: 401 })
        }

        // rest login attempts in successful login
        user.loginAttempts = 0

        // Generate Unsplash auth URL if user doesn't have a token
        const unsplashAuthUrl = !user.unsplashToken
            ? `https://unsplash.com/oauth/authorize?` +
            `client_id=${envConfig.UNSPLASH_ACCESS_KEY}` +
            `&redirect_uri=${encodeURIComponent(envConfig.NEXT_PUBLIC_BASE_URL + '/api/unsplash/callback')}` +
            `&response_type=code` +
            `&scope=public+write_likes`
            : null;

        const session: Session = {
            user: {
                id: user.id,
                username: user.username,
                unsplashToken: user.unsplashToken?.access_token
            },
            expiresAt: Date.now() + 24 * 60 * 60 * 1000,
        }

        const response = NextResponse.json<ApiResponse<{
            username: string,
            unsplashAuthUrl: string | null
        }>>({
            data: {
                username: user.username,
                unsplashAuthUrl
            }
        })

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
        return NextResponse.json<ApiResponse<never>>({
            error: "Authentication failed"
        }, { status: 500 })
    }
}