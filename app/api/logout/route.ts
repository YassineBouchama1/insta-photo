import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { ApiResponse } from '@/types';

export async function POST() {
    const cookieStore = await cookies();
    cookieStore.delete('session');
    return NextResponse.json<ApiResponse<{ success: true }>>({ data: { success: true } });
}