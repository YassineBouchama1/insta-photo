'use client';
import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useLogin } from '../hooks/useLogin';
import { AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';

interface LoginFormProps {
  callbackUrl?: string;
}

export function LoginForm({ callbackUrl = '/gallery' }: LoginFormProps) {
  const router = useRouter();

  // fetch login logic 
  const { login, isLoading, error } = useLogin();
  const [validationError, setValidationError] = useState<string | null>(null);

  const [username, setUsername] = useState('muser1');
  const [password, setPassword] = useState('mpassword1');

  // hanlde  form subm
  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setValidationError(null);

      try {
        await login(username, password);

        toast.success('login Successfully!');
        router.push(callbackUrl);
        router.refresh();
      } catch (err) {
        if (err instanceof Error) {
          setValidationError(err.message);
        } else {
          setValidationError('An unexpected error occurred');
        }
      }
    },
    [login, username, password, router, callbackUrl]
  );

  const errorMessage = validationError || error;

  return (
    <div className="mx-auto max-w-xs h-full">
      <h1 className="text-3xl font-bold mb-2 text-left">Welcome back</h1>
      <p className="text-gray-600 mb-8 text-left">Welcome back! Please enter your details.</p>

      <form onSubmit={handleSubmit} className="space-y-4 min-w-80">
        {/* Username Input */}
        <div>
          <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">
            Username
          </label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-4 rounded-lg font-medium bg-gray-50 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
            placeholder="Enter your username"
            required
            disabled={isLoading}
            aria-label="Username"
          />
        </div>

        {/* Password Input */}
        <div>
          <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-4 rounded-lg font-medium bg-gray-50 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
            placeholder="Enter your password"
            required
            disabled={isLoading}
            aria-label="Password"
          />
        </div>

        {/* Error Message */}
        {errorMessage && (
          <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg" role="alert">
            <AlertCircle className="h-4 w-4 text-red-500" />
            <p className="text-red-600 text-sm">
              {errorMessage.startsWith('Validation Error:')
                ? errorMessage.replace('Validation Error:', '').trim()
                : errorMessage}
            </p>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className={`mt-5 tracking-wide font-semibold w-full py-4 rounded-lg transition-all duration-300 ease-in-out flex items-center justify-center ${isLoading
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-black hover:bg-black/80 text-gray-100'
            }`}
          aria-disabled={isLoading}
        >
          {isLoading ? 'Signing in...' : 'Sign in'}
        </button>
      </form>
    </div>
  );
}