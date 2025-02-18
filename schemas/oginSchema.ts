import { z } from 'zod';

export const loginSchema = z.object({
  username: z.string().min(1, 'Username is required').max(50, 'Username must not exceed 50 characters'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
});