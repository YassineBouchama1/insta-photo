import { NextResponse } from 'next/server';
import { likesDb } from '@/lib/db';
import { ApiResponse } from '@/types';

export async function POST(
    request: Request,

) {
    try {
        const { userId, photoId } = await request.json();



        if (!userId || !photoId) {
            return NextResponse.json<ApiResponse<never>>(
                { error: 'userid and photiid is required' },
                { status: 401 }
            );
        }
        const likeKey = `${userId}:${photoId}`;
        let liked = true;

        // chekc if like already exists
        try {
            const existingLike = likesDb.get(likeKey);
            if (existingLike) {
                // If yes delete it
                likesDb.delete(likeKey);
                liked = false;
            } else {
                // If no add it
                likesDb.set(likeKey, { userId, photoId });
            }
        } catch (error) {
            // if there is erri aume like dosnt exist
            likesDb.set(likeKey, { userId, photoId });
        }

        return NextResponse.json<ApiResponse<{ liked: boolean }>>({
            data: { liked },
        });
    } catch (error) {
        return NextResponse.json<ApiResponse<never>>(
            { error: 'Failed to toggle like' },
            { status: 500 }
        );
    }
}