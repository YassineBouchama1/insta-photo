import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getPhotos } from '@/lib/unsplash';
import { Header } from '@/components/Header';
import type { Session } from '@/types';


// fetch user likes
async function getUserLikes(userId: string) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/photos/likes?userId=${userId}`, {
        cache: 'no-cache',
    });
    const data = await res.json();
    return data.data?.likes || [];
}


export default async function GalleryPage() {

    // fetch ookies to get user id
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('session');

    if (!sessionCookie) {
        redirect('/');
    }

    const session = JSON.parse(sessionCookie.value) as Session;


    // fetch photos and likes 
    const [photos, likes] = await Promise.all([
        getPhotos(1),
        getUserLikes(session.user.id),
    ]);

    console.table(photos)
    return (
        <div className="min-h-screen bg-gray-100">
            <Header username={session.user.username} />
            {/* TODO : i will add galery list here */}
        </div>
    );
}