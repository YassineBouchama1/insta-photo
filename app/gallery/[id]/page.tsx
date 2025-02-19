import { ImageModal } from "@/features/photos/components/ImageModal";
import { createAuthenticatedApi } from "@/lib/unsplash";
import { Session } from "@/types";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";


export default async function PhotoPage({ params }: { params: { id: string } }) {

    // fetch cookies to get user id
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('session');

    if (!sessionCookie) {
        redirect('/');
    }

    const session = JSON.parse(sessionCookie.value) as Session;
    const api = createAuthenticatedApi(session.user.unsplashToken);

    const photo = await api.getPhotoById(params.id);
    return <ImageModal photo={photo} />;
}