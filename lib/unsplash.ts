import axios from 'axios';
import { UnsplashPhoto, PhotosResponse } from '@/types';

// axios instance for authenticated requests
const createUnsplashApi = (accessToken?: string) => {
    const unsplashAxios = axios.create({
        baseURL: "https://api.unsplash.com",
        headers: {
            Authorization: accessToken
                ? `Bearer ${accessToken}`
                : `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`,
            "Content-Type": "application/json",
        },
    });

    return {
        // Fetch a list of photos
        async getPhotos(page: number = 1, perPage: number = 12): Promise<PhotosResponse> {
            try {
                const response = await unsplashAxios.get('/photos', {
                    params: { page, per_page: perPage },
                });
                if (response.status !== 200) {
                    throw new Error('Failed to fetch photos');
                }
                return {
                    photos: response.data as UnsplashPhoto[],
                    total: response.headers['x-total'] ? parseInt(response.headers['x-total'], 10) : 0,
                    hasMore: page * perPage < (response.headers['x-total'] ? parseInt(response.headers['x-total'], 10) : 0),
                };
            } catch (error: any) {
                console.log(error)
                const errorMessage = error.response?.data?.errors?.[0] || error.message;
                console.error("Error fetching photos:", errorMessage);
                throw new Error(`Failed to fetch photos: ${errorMessage}`);
            }
        },

        // Like a photo
        async likePhoto(photoId: string): Promise<void> {
            if (!accessToken) {
                throw new Error('Authentication required to like photos');
            }
            try {
                const response = await unsplashAxios.post(`/photos/${photoId}/like`);
                if (response.status !== 201) {
                    throw new Error('Failed to like photo');
                }
                console.log("Photo liked successfully");
            } catch (error: any) {
                const errorMessage = error.response?.data?.errors?.[0] || error.message;
                console.error("Error liking photo:", errorMessage);
                throw new Error(`Failed to like photo: ${errorMessage}`);
            }
        },

        // Unlike a photo
        async unlikePhoto(photoId: string): Promise<void> {
            if (!accessToken) {
                throw new Error('Authentication required to unlike photos');
            }
            try {
                const response = await unsplashAxios.delete(`/photos/${photoId}/like`);
                if (response.status !== 200) {
                    throw new Error('Failed to unlike photo');
                }
                console.log("Photo unliked successfully");
            } catch (error: any) {
                const errorMessage = error.response?.data?.errors?.[0] || error.message;
                console.error("Error unliking photo:", errorMessage);
                throw new Error(`Failed to unlike photo: ${errorMessage}`);
            }
        },
    };
};

// expory the default API instance
export const unsplashApi = createUnsplashApi();

// export a function to create an authenticated API instance
export const createAuthenticatedApi = (accessToken: string) => createUnsplashApi(accessToken);