
import { loginSchema } from '@/schemas/oginSchema';
import { useMutation } from '@tanstack/react-query';
import { useCallback } from 'react';
import { z } from 'zod';

type LoginCredentials = z.infer<typeof loginSchema>;

export function useLogin() {


  //TODO : i will dsiplay eror with nice way


  // this is mutatio  to intract with api
  const mutation = useMutation({
    mutationFn: async (credentials: LoginCredentials) => {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Login failed');
      }
      return res.json();
    },
  });


  const login = useCallback(
    async (username: string, password: string) => {
      try {
        const validatedCredentials = loginSchema.parse({ username, password });
        await mutation.mutateAsync(validatedCredentials);
      } catch (error) {
        if (error instanceof z.ZodError) {
          throw new Error(error.errors[0]?.message || 'Validation failed');
        }
        throw error;
      }
    },
    [mutation.mutateAsync] 
  );

  return {
    login,
    isLoading: mutation.isPending,
    error: mutation.error?.message,
  };
}