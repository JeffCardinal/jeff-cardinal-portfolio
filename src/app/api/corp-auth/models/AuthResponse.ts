import { z } from 'zod';

export const AuthResponseSchema = z.union([
  z.object({ valid: z.boolean() }),
  z.object({ error: z.string() }),
]);

export type AuthResponse = z.infer<typeof AuthResponseSchema>;