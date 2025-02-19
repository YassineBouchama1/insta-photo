'use client';

import { UnsplashPhoto } from '@/types';
import { Heart, Loader } from 'lucide-react';
import Link from 'next/link';
import toast from 'react-hot-toast';

interface PhotoCardProps {
  photo: UnsplashPhoto;
  isLiked: boolean;
  onToggleLike: () => void;
  isLikeLoading: boolean;
}

export function PhotoCard({
  photo,
  isLiked,
  onToggleLike,
  isLikeLoading
}: PhotoCardProps) {
  const handleLikeClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (isLikeLoading) return;
    await onToggleLike();

  };

  return (
    <div className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200">

      <Link href={`/gallery/${photo.id}`} scroll={false}>
        {/* Image Container */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={photo.urls.regular}
            alt={`Design by ${photo.user.name}`}
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-200"
          />
        </div>
      </Link>
      {/* Footer */}
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden">
              <img
                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(photo.user.name)}&background=random`}
                alt={photo.user.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">{photo.user.name}</p>
              <p className="text-xs text-gray-500">@{photo.user.name}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 text-gray-500">
            <div className="flex items-center space-x-1">
              <button
                onClick={handleLikeClick}
                disabled={isLikeLoading}
                className="relative"
              >
                {isLikeLoading ? (
                  <Loader className="w-5 h-5  animate-spin text-gray-400" />
                ) : (
                  <Heart
                    className={`w-5 h-5 ${isLiked ? 'text-red-500 fill-red-500' : 'text-gray-700'
                      }`}
                  />
                )}
              </button>
              <span className="text-xs">{photo.likes}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}