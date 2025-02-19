import { ImageModal } from "@/features/photos/components/ImageModal";
import { createAuthenticatedApi, unsplashApi } from "@/lib/unsplash";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";


export default async function PhotoPage({ params }: { params: { id: string } }) {


    const api = unsplashApi // extend api contain endpoint isnplash

    const photo = await api.getPhotoById(params.id);
    return <ImageModal photo={photo} />;
}