import { NextResponse } from "next/server";

export async function GET() {
    const clientId = process.env.UNSPLASH_CLIENT_ID!;
    const redirectUri = process.env.UNSPLASH_REDIRECT_URI!;
    const scope = "public+write_likes";
    const authUrl = `https://unsplash.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}`;

    return NextResponse.redirect(authUrl);
}