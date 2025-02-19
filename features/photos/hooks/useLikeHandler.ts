import { useCallback, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createAuthenticatedApi } from '@/lib/unsplash';
import { getServerSession } from '@/lib/session';

interface UseLikeHandlerProps {
    userId: string | null;
}

export interface ApiResponse<T> {
    data?: T;
    error?: string;
}

export function useLikeHandler({
    userId,
}: UseLikeHandlerProps) {
    const queryClient = useQueryClient();
    const [loadingPhotoIds, setLoadingPhotoIds] = useState<string[]>([]);

    // Mutation function for toggling likes using Unsplash API
    const toggleLikeMutation = useMutation({
        mutationFn: async ({ photoId, isLiked }: { photoId: string, isLiked: boolean }) => {
            if (!userId) {
                throw new Error('User ID is required');
            }

            const session = await getServerSession();
            const api = createAuthenticatedApi(session.user.unsplashToken);

            // if already liked unlike it
            if (isLiked) {
                await api.unlikePhoto(photoId);
            } else {
                await api.likePhoto(photoId);
            }

            return { success: true };
        },
        onSuccess: (_, variables) => {
            // Remove photoId from loading state
            setLoadingPhotoIds(prev => prev.filter(id => id !== variables.photoId));
            // Invalidate the photos query to refetch updated data
            queryClient.invalidateQueries({ queryKey: ['photos'] });
          
        },
        onError: (_, variables) => {
            // Remove photoId from loading state on error
            setLoadingPhotoIds(prev => prev.filter(id => id !== variables.photoId));
            console.error('Failed to toggle like');
        },
    });

    // Handle liking/unliking logic
    const handleLike = useCallback(
        (photoId: string, isLiked: boolean) => {
            if (!userId) return;

            // Add photoId to loading state
            setLoadingPhotoIds(prev => [...prev, photoId]);

            // Trigger the mutation
            toggleLikeMutation.mutate(
                { photoId, isLiked },
                {
                    onSuccess: () => {
                        queryClient.invalidateQueries({ queryKey: ['photos'] });
                    },
                }
            );
        },
        [userId, toggleLikeMutation, queryClient]
    );

    return {
        handleLike,
        loadingPhotoIds,
        error: toggleLikeMutation.error,
    };
}