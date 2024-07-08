import { z } from 'zod';

export const DelRedisCacheSchema = z.object({
  dbUrl: z.string({ invalid_type_error: "host must be a string" }).url(),
  key: z.string({ invalid_type_error: "username must be a string" })
    .min(1, { message: "username is required" }),
});


