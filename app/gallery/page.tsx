/* eslint-disable @typescript-eslint/no-unused-vars */
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { createAuthenticatedApi } from '@/lib/unsplash';
import { Header } from '@/components/Header';
import type { Session } from '@/types';
import { PhotoGrid } from '@/features/photos/components/PhotoGrid';
import { RefreshCw } from 'lucide-react';

export default async function GalleryPage() {
    // fetch cookies to get user id
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('session');

    if (!sessionCookie) {
        redirect('/');
    }

    const session = JSON.parse(sessionCookie.value) as Session;
    const api = createAuthenticatedApi(session.user.unsplashToken);

    // fetch photos with error handling
    let photos;
    let error = null;

    try {
        [photos] = await Promise.all([
            api.getPhotos(1),
        ]);
    } catch (err) {
        error = "Unable to load photos"
        photos = { photos: [], total: 0, hasMore: false };
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <Header username={session.user.username} />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {error ? (
                    <div className="text-center py-8 space-y-4">
                        <p className="text-red-600">{error} or Rate Limit Exceeded In Unsplash Account</p>
                        <form action="/gallery">
                            <button
                                type="submit"
                                className="inline-flex items-center gap-2"
                            >
                                <RefreshCw className="h-4 w-4" />
                                Try Again
                            </button>
                        </form>
                    </div>
                ) : (
                    <PhotoGrid
                        initialPhotos={photos.photos}
                        userId={session.user.id}
                    />
                )}
            </main>
        </div>
    );
}