import { z } from 'zod';

export const SetRedisCacheSchema = z.object({
  dbUrl: z.string({ invalid_type_error: "host must be a string" }).url(),
  key: z.string({ invalid_type_error: "username must be a string" })
    .min(1, { message: "username is required" }),
  value: z.object({
    userId: z.string().uuid(),
    name: z.string(),
  })
});


