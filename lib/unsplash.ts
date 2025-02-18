import { createApi } from 'unsplash-js';
import { UnsplashPhoto, PhotosResponse } from '@/types';

const unsplash = createApi({
    accessKey: process.env.UNSPLASH_ACCESS_KEY!,
});

export async function getPhotos(page: number = 1, perPage: number = 12): Promise<PhotosResponse> {
    const result = await unsplash.photos.list({ page, perPage });

    // handling if there is any error
    if (result.errors) {
        throw new Error('Failed to fetch photos');
    }

    return {
        photos: result.response.results as UnsplashPhoto[],
        total: result.response.total,
        hasMore: page * perPage < result.response.total,
    };
}