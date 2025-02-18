export interface User {
    id: string;
    username: string;
    password: string;
    isBlocked: boolean;
}

export interface Session {
    user: {
        id: string;
        username: string;
    };
    expiresAt: number;
}

export interface UnsplashPhoto {
    id: string;
    urls: {
        raw: string;
        regular: string;
        small: string;
    };
    description: string | null;
    user: {
        name: string;
        username: string;
    };
    likes: number;
}

export interface PhotosResponse {
    photos: UnsplashPhoto[];
    total: number;
    hasMore: boolean;
}

export interface ApiResponse<T> {
    data?: T;
    error?: string;
}