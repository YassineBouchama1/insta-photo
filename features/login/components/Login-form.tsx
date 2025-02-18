'use client';
import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useLogin } from '../hooks/useLogin';

interface LoginFormProps {
  callbackUrl?: string;
}

export function LoginForm({ callbackUrl = '/gallery' }: LoginFormProps) {
  const router = useRouter();
  const { login, isLoading, error } = useLogin();

  // State for form inputs
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Handle form submission
  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      try {
        await login(username, password);
        router.push(callbackUrl);
        router.refresh();
      } catch (err) {
        console.error('Login failed:', err);
      }
    },
    [login, username, password, router, callbackUrl]
  );

  return (
    <div className="mx-auto max-w-xs h-full">
      <h1 className="text-3xl font-bold mb-2 text-left">Welcome back</h1>
      <p className="text-gray-600 mb-8 text-left">Welcome back! Please enter your details.</p>

      <form onSubmit={handleSubmit}>
        {/* Username Input */}
        <div className="mt-10">
          <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">
            Username
          </label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-8 py-4 rounded-lg font-medium bg-gray-50 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
            placeholder="Enter your username"
            required
            disabled={isLoading}
            aria-label="Username"
          />
        </div>

        {/* Password Input */}
        <div className="mt-4">
          <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-8 py-4 rounded-lg font-medium bg-gray-50 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
            placeholder="Enter your password"
            required
            disabled={isLoading}
            aria-label="Password"
          />
        </div>

        {/* Error Message */}
        {error && (
          <p className="text-red-500 text-sm mt-2" role="alert">
            {error.startsWith('Validation Error:') ? error.replace('Validation Error:', 'Validation failed: ') : error}
          </p>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className={`mt-5 tracking-wide font-semibold w-full py-4 rounded-lg transition-all duration-300 ease-in-out flex items-center justify-center ${isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-black hover:bg-black/80 text-gray-100'
            }`}
          aria-disabled={isLoading}
        >
          {isLoading ? 'Signing in...' : 'Sign in'}
        </button>
      </form>
    </div>
  );
}