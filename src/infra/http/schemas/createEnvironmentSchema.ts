import { z } from 'zod'

export const createEnvironmentSchema = z.object({
  name: z.string({ invalid_type_error: "name must be a string" })
    .max(10, { message: "the name must contain a maximum of 10 letters" }),
})