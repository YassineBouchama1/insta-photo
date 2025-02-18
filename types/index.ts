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
        unsplashToken?: string,
        unsplashUserId?: number | undefined

    };
    expiresAt: number;

}

export interface UnsplashToken {
    access_token: string
    token_type: string
    scope: string
    user_id: number,
    refresh_token?: string,
    created_at: number
}
export interface UnsplashPhoto {
    id: string;
    created_at: string;
    updated_at: string;
    width: number;
    height: number;
    color: string;
    blur_hash: string;
    likes: number;
    liked_by_user: boolean;
    description: string | null;
    user: {
        name: string;
        profile_image: string[]
    },
    urls: {
        raw: string;
        full: string;
        regular: string;
        small: string;
        thumb: string;
    };
    links: {
        self: string;
        html: string;
        download: string;
        download_location: string;
    };
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