'use client';
import { useState, useMemo, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useLogin } from '../hooks/useLogin';

interface LoginFormProps {
  callbackUrl?: string;
}

export function LoginForm({ callbackUrl = '/gallery' }: LoginFormProps) {
  const router = useRouter();

  // fetch logic logic 
  const { login, isLoading, error } = useLogin();
  const [username, setUsername] = useState(useMemo(() => '', []));
  const [password, setPassword] = useState(useMemo(() => '', []));

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      try {
        await login(username, password);
        router.push(callbackUrl);
        router.refresh();
      } catch (err) {
        console.error(err);
      }
    },
    [login, username, password, router, callbackUrl]
  );

  return (
    <div className="mx-auto max-w-xs h-full">
      <h1 className="text-3xl font-bold mb-2 text-left">Welcome back</h1>
      <p className="text-gray-600 mb-8 text-left">Welcome back! Please enter your details.</p>
      <form onSubmit={handleSubmit} className='flex flex-col gap-52' >
        {/* Email Input */}
        <div className="mt-10">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-8 py-4 rounded-lg font-medium bg-gray-50 border border-gray-200 placeholder-gray-50 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
            placeholder="Email"
            required
            disabled={isLoading}
          />
        </div>

        {/* Password Input */}
        <div className="mt-10">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-8 py-4 rounded-lg font-medium bg-gray-50 border border-gray-200 placeholder-gray-50 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
            placeholder="********"
            required
            disabled={isLoading}
          />
        </div>

        {/* Error Message */}
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className={`mt-5 tracking-wide font-semibold w-full py-4 rounded-lg transition-all duration-300 ease-in-out flex items-center justify-center ${isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-black hover:bg-black/80 text-gray-100'
            }`}
        >
          {isLoading ? 'Signing in...' : 'Sign in'}
        </button>
      </form>
    </div>
  );
}