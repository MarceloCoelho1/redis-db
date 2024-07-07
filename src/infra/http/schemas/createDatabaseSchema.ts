import { z } from 'zod';

export const createDatabaseSchema = z.object({
  name: z.string({ invalid_type_error: "name must be a string" })
    .max(100, { message: "the name must contain a maximum of 100 characters" }),
  host: z.string({ invalid_type_error: "host must be a string" })
    .min(1, { message: "host is required" }),
  username: z.string({ invalid_type_error: "username must be a string" })
    .min(1, { message: "username is required" }),
  password: z.string({ invalid_type_error: "password must be a string" })
    .min(1, { message: "password is required" }),
  port: z.number({ invalid_type_error: "port must be a number" })
    .positive({ message: "port must be a positive number" }),
  environmentId: z.string({ invalid_type_error: "environmentId must be a string" })
    .uuid({ message: "environmentId must be a valid UUID" }),
});


