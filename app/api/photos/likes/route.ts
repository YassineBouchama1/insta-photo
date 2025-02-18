import { NextResponse } from 'next/server';
import { likesDb } from '@/lib/db';
import { ApiResponse } from '@/types';

export async function GET(request: Request): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');

  // valid user ID
  if (!userId) {
    return NextResponse.json<ApiResponse<never>>(
      { error: 'User ID is required' },
      { status: 400 }
    );
  }

  try {
    const likes = new Set<string>();


    for (const [key, value] of likesDb.entries()) {
      if (key.startsWith(userId)) {
        likes.add(value.photoId);
      }
    }


    return NextResponse.json<ApiResponse<{ likes: string[] }>>({
      data: { likes: Array.from(likes) }
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json<ApiResponse<never>>(
      { error: 'Failed to fetch likes' },
      { status: 500 }
    );
  }
}