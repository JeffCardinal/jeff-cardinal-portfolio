import { z } from 'zod';

export const AuthRequestSchema = z.object({
	password: z.string().min(1).max(256),
});

export type AuthRequest = z.infer<typeof AuthRequestSchema>;

export function serializeAuthRequest(request: AuthRequest): string {
	return JSON.stringify(request);
}