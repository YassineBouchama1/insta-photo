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

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={handleOverlayClick}
        >
            <div className="bg-white p-4 rounded-lg max-w-4xl max-h-[90vh] overflow-auto relative">
                <div className="relative w-[500px] h-[300px] md:w-[700px] md:h-[500px]">

                    {isLoading && (
                        <div className="absolute inset-0 bg-gray-200 animate-pulse rounded w-full h-full" />
                    )}

                    <Image
                        src={photo.urls.full || "/placeholder.svg"}
                        alt="Photo"
                        quality={100}
                        width={'700'}  // Fixed width
                        height={'500'} // Fixed height
                        className={`object-cover transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
                        onLoadingComplete={() => setIsLoading(false)}
                        sizes="(max-width: 768px) 100vw, 700px"
                        priority
                    />
                </div>
            </div>
        </div>
    );
}
