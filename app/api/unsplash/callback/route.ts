import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { userDb } from "@/lib/db"
import type { ApiResponse, Session, UnsplashToken } from "@/types"

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url)
        const code = searchParams.get('code')

        if (!code) {
            return NextResponse.json<ApiResponse<never>>({
                error: "Missing authorization code"
            }, { status: 400 })
        }

        // Get current session
        const cookieStore = await cookies()
        const sessionCookie = cookieStore.get('session')

        if (!sessionCookie) {
            return NextResponse.json<ApiResponse<never>>({
                error: "No active session"
            }, { status: 401 })
        }

        const session: Session = JSON.parse(sessionCookie.value)

        console.log(session)

        // Exchange code for access token
        const tokenResponse = await fetch('https://unsplash.com/oauth/token', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                client_id: process.env.UNSPLASH_ACCESS_KEY,
                client_secret: process.env.UNSPLASH_CLIENT_SECRET,
                redirect_uri: `${process.env.NEXT_PUBLIC_BASE_URL}/api/unsplash/callback`,
                code,
                grant_type: 'authorization_code',
            }),
        })



        const tokenData: UnsplashToken = await tokenResponse.json()
        console.log(tokenData)


        if (tokenData?.error) {
            console.log('here logout')
            //TODO : if auth unplah vaild logout
        }


        // Update session with new token
        const updatedSession: Session = {
            ...session,
            user: {
                ...session.user,
                unsplashToken: tokenData.access_token,
                unsplashUserId: tokenData.user_id
            }
        }

        // Update session cookie
        cookieStore.set({
            name: "session",
            value: JSON.stringify(updatedSession),
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 24 * 60 * 60,
        })

        // Redirect to success page
        return NextResponse.redirect(
            `${process.env.NEXT_PUBLIC_BASE_URL}/?unsplash=success`
        )
    } catch (error) {
        console.error('Unsplash callback error:', error)
        return NextResponse.redirect(
            `${process.env.NEXT_PUBLIC_BASE_URL}/?unsplash=error`
        )
    }
}