import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { createAuthenticatedApi, unsplashApi } from '@/lib/unsplash';
import { Header } from '@/components/Header';
import type { Session } from '@/types';
import { PhotoGrid } from '@/features/photos/components/PhotoGrid';




export default async function GalleryPage() {

    // fetch ookies to get user id
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('session');
    if (!sessionCookie) {
        redirect('/');
    }

    const session = JSON.parse(sessionCookie.value) as Session;

    const api = createAuthenticatedApi(session.user.unsplashToken);

    // fetch photos and likes 
    const [photos] = await Promise.all([
        api.getPhotos(1),

    ]);

    return (
        <div className="min-h-screen bg-gray-100">
            <Header username={session.user.username} />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <PhotoGrid
                    initialPhotos={photos.photos}
                    userId={session.user.id}

                />
            </main>
        </div>
    );
}