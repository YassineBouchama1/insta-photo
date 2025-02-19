import { z } from 'zod'

const envSchema = z.object({
  UNSPLASH_ACCESS_KEY: z.string().min(1),
  UNSPLASH_CLIENT_SECRET: z.string().min(1),
  NEXT_PUBLIC_BASE_URL: z.string().url(),
})

const env = envSchema.safeParse({
  UNSPLASH_ACCESS_KEY: process.env.UNSPLASH_ACCESS_KEY,
  NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
  UNSPLASH_CLIENT_SECRET: process.env.UNSPLASH_CLIENT_SECRET,
})

if (!env.success) {
  console.error('❌ Invalid environment variables:', JSON.stringify(env.error.format(), null, 4))
  process.exit(1)
} else {
  console.log('Valid environment variables')

}


// here i export the validated and transfared env variables
export const envConfig = env.data

// types for fix typescript and  better autocomplete
declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof envSchema> { }
  }
}
