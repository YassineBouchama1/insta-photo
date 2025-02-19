import { NextResponse } from 'next/server';
import { ApiResponse, PhotosResponse, Session } from '@/types';
import { createAuthenticatedApi, unsplashApi } from '@/lib/unsplash';
import { cookies } from 'next/headers';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') || '1');
  const perPage = parseInt(searchParams.get('perPage') || '4');
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get('session');




  if (!sessionCookie) {
    return NextResponse.json<ApiResponse<never>>(
      { error: 'session required' },
      { status: 500 }
    );
  }

  const session = JSON.parse(sessionCookie.value) as Session;

  // Changed condition here
  if (!session || !session.user) {
    return NextResponse.json<ApiResponse<never>>(
      { error: 'session required' },
      { status: 500 }
    );
  }

  const api = createAuthenticatedApi(session.user.unsplashToken);

  try {
    const photos = await api.getPhotos(page, perPage);
    return NextResponse.json<ApiResponse<PhotosResponse>>({ data: photos });
  } catch (error) {
    return NextResponse.json<ApiResponse<never>>(
      { error: 'Failed to fetch photos' },
      { status: 500 }
    );
  }
}