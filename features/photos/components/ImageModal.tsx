'use client';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { UnsplashPhoto } from '@/types';
import { useState } from 'react';

export function ImageModal({ photo }: { photo: UnsplashPhoto }) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);

    const handleOverlayClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            router.back();
        }
    };


    const aspectRatio = photo.height / photo.width;
    const maxWidth = Math.min(photo.width, 1200);
    const calculatedHeight = maxWidth * aspectRatio;

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={handleOverlayClick}
        >
            <div className="bg-white p-4 rounded-lg max-w-4xl max-h-[90vh] overflow-auto relative">
                <div
                    style={{
                        width: `${maxWidth}px`,
                        height: `${calculatedHeight}px`,
                        maxHeight: '80vh',
                    }}
                    className="relative"
                >
                    {isLoading && (
                        <div
                            className="absolute inset-0 bg-gray-200 animate-pulse rounded"
                            style={{
                                aspectRatio: `${photo.width} / ${photo.height}`,
                            }}
                        />
                    )}

                    <Image
                        src={photo.urls.full || "/placeholder.svg"}
                        alt={'Photo'}
                        quality={100}
                        fill
                        className={`object-contain transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'
                            }`}
                        onLoad={() => setIsLoading(false)}
                        sizes={`(max-width: ${maxWidth}px) 100vw, ${maxWidth}px`}
                        priority
                    />
                </div>

                <div className="flex justify-between items-center mt-4">

                    <button
                        onClick={() => router.back()}
                        className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition-colors"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}