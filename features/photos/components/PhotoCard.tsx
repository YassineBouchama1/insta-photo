'use client';
import { Heart } from 'lucide-react';

interface PhotoCardProps {
    photo: {
        id: string;
        urls: { regular: string };
        user: { name: string };
    };
    isLiked: boolean;
    onToggleLike: () => void;
}

export function PhotoCard({ photo, isLiked, onToggleLike }: PhotoCardProps) {
    return (
        <div className="relative group">
            <img
                src={photo.urls.regular}
                alt={`Photo by ${photo.user.name}`}
                className="w-full h-64 object-cover rounded-lg"
            />
            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity rounded-lg" />
            <button
                onClick={onToggleLike}
                className="absolute bottom-4 right-4 bg-white p-2 rounded-full shadow-lg transform transition-transform group-hover:scale-110"
                aria-label={isLiked ? 'Unlike photo' : 'Like photo'}
            >
                <Heart
                    className={`w-6 h-6 ${isLiked ? 'text-red-500 fill-red-500' : 'text-gray-500'}`}
                />
            </button>
            <div className="absolute bottom-4 left-4 text-white text-sm">
                <p className="font-medium">{photo.user.name}</p>
            </div>
        </div>
    );
}