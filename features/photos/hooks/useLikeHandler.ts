import { useCallback, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface UseLikeHandlerProps {
    userId: string | null;
    initialLikes: string[];
}

export interface ApiResponse<T> {
    data?: T;
    error?: string;
}

export function useLikeHandler({
    userId,
    initialLikes,
}: UseLikeHandlerProps) {
    const [likes, setLikes] = useState<Set<string>>(new Set(initialLikes));
    const queryClient = useQueryClient();

    //this mutation func for toggling likes
    const toggleLikeMutation = useMutation({
        mutationFn: async ({ userId, photoId }: { userId: string; photoId: string }) => {
            const res = await fetch('/api/photos/onlike', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId, photoId }),
            });
            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.error || 'Failed to toggle like');
            }
            return res.json() as Promise<ApiResponse<{ success: boolean }>>;
        },
        onSuccess: () => {
            //  after  update like invalid photos
            queryClient.invalidateQueries({ queryKey: ['photos'] });
        },
        onError: (error) => {
            console.error('Failed to toggle like:', error);
        },
    });

    //  this handle unlick and like
    const handleLike = useCallback(
        (photoId: string) => {
            if (!userId) return;


            setLikes((prev) => {
                const newLikes = new Set(prev);
                if (newLikes.has(photoId)) {
                    newLikes.delete(photoId);
                } else {
                    newLikes.add(photoId);
                }
                return newLikes;
            });

            // Trigger the mutation
            toggleLikeMutation.mutate(
                { userId, photoId },
                {
                    onError: () => {

                        setLikes((prev) => {
                            const newLikes = new Set(prev);
                            if (newLikes.has(photoId)) {
                                newLikes.delete(photoId);
                            } else {
                                newLikes.add(photoId);
                            }
                            return newLikes;
                        });
                    },
                }
            );
        },
        [userId, toggleLikeMutation]
    );

    return {
        likes,
        handleLike,
        isLoading: toggleLikeMutation.isPending,
        error: toggleLikeMutation.error,
    };
}