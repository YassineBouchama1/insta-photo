import { NextResponse } from 'next/server';
import { getPhotos } from '@/lib/unsplash';
import { ApiResponse, PhotosResponse } from '@/types';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') || '1');
  const perPage = parseInt(searchParams.get('perPage') || '12');

  try {
    const photos = await getPhotos(page, perPage);
    return NextResponse.json<ApiResponse<PhotosResponse>>({ data: photos });
  } catch (error) {
    return NextResponse.json<ApiResponse<never>>(
      { error: 'Failed to fetch photos' },
      { status: 500 }
    );
  }
}