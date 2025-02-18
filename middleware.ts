import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { cookies } from 'next/headers';

interface Session {
    user: {
        id: string;
        username: string;
    };
    expiresAt: number;
}

export async function middleware(request: NextRequest) {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("session");
    let session: Session | null = null;

    // after fetch cookies i parse and valid the session
    if (sessionCookie) {
        try {
            session = JSON.parse(sessionCookie.value) as Session;

            // checkk if session has expired
            if (session.expiresAt < Date.now()) {
                session = null;
            }
        } catch {
            session = null;
        }
    }

    // protect gallery route
    if (request.nextUrl.pathname.startsWith("/gallery")) {
        if (!session) {

            const callbackUrl = encodeURIComponent(request.nextUrl.pathname);
            return NextResponse.redirect(
                new URL(`/?callbackUrl=${callbackUrl}`, request.url)
            );
        }
    }


    if (request.nextUrl.pathname === "/" && session) {
        return NextResponse.redirect(new URL("/gallery", request.url));
    }

    const response = NextResponse.next();

    //    if session expired clear cookies
    if (!session && sessionCookie) {
        await cookieStore.delete("session");
    }

    return response;
}

export const config = {
    matcher: [
        "/((?!api|_next|public|favicon.ico).*)",
    ],
};