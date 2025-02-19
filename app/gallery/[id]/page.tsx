import { ImageModal } from "@/features/photos/components/ImageModal";
import { unsplashApi } from "@/lib/unsplash";

export default async function PhotoPage({ params }: { params: { id: string } }) {


    const api = unsplashApi // extend api contain endpoint isnplash

    const photo = await api.getPhotoById(params.id);
    return <ImageModal photo={photo} />;
}