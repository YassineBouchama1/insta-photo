import { useCallback, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createAuthenticatedApi, unsplashApi } from '@/lib/unsplash';
import { userDb } from "@/lib/db"
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



    // Mutation function for toggling likes using Unsplash API
    const toggleLikeMutation = useMutation({
        mutationFn: async ({ photoId, isLiked }: { photoId: string, isLiked: boolean }) => {
            if (!userId) {
                throw new Error('User ID is required');
            }

            const session = await getServerSession();
            console.log(session)

            const api = createAuthenticatedApi(session.user.unsplashToken)

            // if already liked unlike it 
            if (isLiked) {
                await api.likePhoto(photoId);

            } else {
                await api.unlikePhoto(photoId);

            }


            return { success: true };
        },
        onSuccess: () => {
            // Invalidate the photos query to refetch updated data
            queryClient.invalidateQueries({ queryKey: ['photos'] });
        },
        onError: (error) => {
            console.error('Failed to toggle like:', error);
        },
    });

    // Handle liking/unliking logic
    const handleLike = useCallback(
        (photoId: string, isLiked: boolean) => {
            if (!userId) return;

            // Trigger the mutation
            toggleLikeMutation.mutate(
                { photoId, isLiked },
                {

                    onSuccess: () => {
                        // Invalidate the photos query to refetch updated data
                        queryClient.invalidateQueries({ queryKey: ['photos'] });
                    },

                }
            );
        },
        [userId, toggleLikeMutation]
    );

    return {

        handleLike,
        isLoading: toggleLikeMutation.isPending,
        error: toggleLikeMutation.error,
    };
}