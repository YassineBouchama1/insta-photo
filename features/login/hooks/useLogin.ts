import { loginSchema } from '@/schemas/oginSchema';
import { useMutation } from '@tanstack/react-query';
import { useCallback } from 'react';
import { z } from 'zod';

type LoginCredentials = z.infer<typeof loginSchema>;

export function useLogin() {
  // this mutation interacts with the API
  const mutation = useMutation({
    mutationFn: async (credentials: LoginCredentials) => {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Authentication failed. Please check your credentials.');
      }

      return res.json();
    },
  });

  const login = useCallback(
    async (username: string, password: string) => {
      try {
        // Validate credentials using Zod schema
        const validatedCredentials = loginSchema.parse({ username, password });
        await mutation.mutateAsync(validatedCredentials);
      } catch (error) {
        if (error instanceof z.ZodError) {
          const validationErrors = error.errors.map((err) => err.message).join(', ');
          throw new Error(`Validation Error: ${validationErrors}`);
        }
        // Re-throw other errors (like API errors)
        throw error;
      }
    },
    [mutation.mutateAsync]
  );

  return {
    login,
    isLoading: mutation.isPending,
    error: mutation.error?.message || null,
  };
}