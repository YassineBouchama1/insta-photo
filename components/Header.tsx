'use client';

import { useRouter } from 'next/navigation';

interface HeaderProps {
  username: string;
}

export function Header({ username }: HeaderProps) {
  const router = useRouter();



  // this fun for logout user
  const handleLogout = async () => {
    try {
      const res = await fetch('/api/auth/logout', {
        method: 'POST',
      });

      if (!res.ok) {
        throw new Error('Logout failed');
      }

      router.push('/');
      router.refresh();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };


  
  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <h1 className="text-xl font-semibold text-gray-900">Photo Gallery</h1>
        <div className="flex items-center space-x-4">
          <span className="text-gray-600">Welcome, {username}</span>
          <button
            onClick={handleLogout}
            className="text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-md transition-colors"
          >
            Sign out
          </button>
        </div>
      </div>
    </header>
  );
}
