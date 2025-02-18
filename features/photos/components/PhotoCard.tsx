'use client';
import { UnsplashPhoto } from '@/types';
import { Heart, MessageCircle, Eye } from 'lucide-react';

interface PhotoCardProps {
  photo: UnsplashPhoto;
  isLiked: boolean;
  onToggleLike: () => void;
}

export function PhotoCard({ photo, isLiked, onToggleLike }: PhotoCardProps) {

  console.log(photo)
  return (
    <div className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200">
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={photo.urls.regular}
          alt={`Design by ${photo.user.name}`}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-200"
        />



      </div>

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
                onClick={onToggleLike}
              >
                <Heart className={`w-5 h-5 ${isLiked ? 'text-red-500 fill-red-500' : 'text-gray-700'}`} />
              </button>
              <span className="text-xs">{photo.likes}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Eye className="w-4 h-4" />
              <span className="text-xs">{Math.floor(Math.random() * 1000)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}