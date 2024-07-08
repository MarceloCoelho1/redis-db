import { z } from 'zod';

export const GetDbSizeRedisCacheSchema = z.object({
  dbUrl: z.string({ invalid_type_error: "host must be a string" }).url(),
});


