import { UseInfiniteQueryResult, useInfiniteQuery } from '@tanstack/react-query';
import { UnsplashPhoto, PhotosResponse, ApiResponse } from '@/types';
import { useLikeHandler } from './useLikeHandler';

interface UsePhotoGridProps {
    initialPhotos: UnsplashPhoto[];
    userId: string | null;
}

export function usePhotoGrid({ initialPhotos, userId }: UsePhotoGridProps) {
    const { handleLike, loadingPhotoIds } = useLikeHandler({ userId });

    // Fetch photos with pagination support
    const fetchPhotos = async ({ pageParam = 1 }: { pageParam?: number }): Promise<PhotosResponse> => {
        const res = await fetch(`/api/photos?page=${pageParam}&perPage=12`);
        if (!res.ok) {
            throw new Error('Failed to fetch photos');
        }
        const data: ApiResponse<PhotosResponse> = await res.json();
        if (!data.data) {
            throw new Error(data.error || 'No data returned from API');
        }
        return data.data;
    };

    const {
        data,
        isLoading,
        isError,
        error,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    }: UseInfiniteQueryResult<PhotosResponse> = useInfiniteQuery({
        queryKey: ['photos'],
        queryFn: fetchPhotos,
        initialPageParam: 1,
        getNextPageParam: (lastPage) => (lastPage.hasMore ? lastPage.photos.length + 1 : undefined),
        initialData: {
            pages: [{
                photos: initialPhotos,
                hasMore: true,
                total: initialPhotos.length
            }],
            pageParams: [1],
        } as unknown as { pages: PhotosResponse[], pageParams: number[] },
    });

    const photos = data?.pages.flatMap((page) => page.photos) || [];

    return {
        photos,
        isLoading,
        isError,
        error,
        hasNextPage,
        fetchNextPage,
        isFetchingNextPage,
        handleLike,
        loadingPhotoIds
    };
}