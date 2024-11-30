import { z } from 'zod';

export const UserSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  createdAt: z.date(),
});

export type User = z.infer<typeof UserSchema>;