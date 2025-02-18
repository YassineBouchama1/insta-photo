'use client';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { PhotoCard } from './PhotoCard';
import { Session, UnsplashPhoto } from '@/types';
import { usePhotoGrid } from '../hooks/usePhotoGrid';

interface PhotoGridProps {
    initialPhotos: UnsplashPhoto[];

    userId: string | null;
}

export function PhotoGrid({ initialPhotos, userId }: PhotoGridProps) {
    const {
        photos,
        isLoading,
        isError,
        error,
        hasNextPage,
        fetchNextPage,
        isFetchingNextPage,
        handleLike,
    } = usePhotoGrid({ initialPhotos, userId });

    const { ref, inView } = useInView();

    useEffect(() => {
        if (inView && hasNextPage) {
            fetchNextPage();
        }
    }, [inView, hasNextPage, fetchNextPage]);

    if (isError) {
        return <div>Error: {(error as any)?.message}</div>;
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {photos.map((photo: UnsplashPhoto, index: number) => (
                <PhotoCard
                    key={photo.id + index}
                    photo={photo}
                    isLiked={photo.liked_by_user}
                    onToggleLike={() => handleLike(photo.id, photo.liked_by_user)}
                />
            ))}
            {isLoading && (
                <div className="col-span-full flex justify-center py-4">
                    <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                </div>
            )}
            {isFetchingNextPage && (
                <div className="col-span-full flex justify-center py-4">
                    <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                </div>
            )}
            <div ref={ref} className="col-span-full h-10" />
        </div>
    );
}