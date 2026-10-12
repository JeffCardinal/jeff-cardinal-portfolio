import { verifyPassword } from '../../lib/auth';
import { getCorpSession, isCorpAuthConfigured } from '../../lib/corp-session';
import { AuthRequestSchema } from './models/AuthRequest';
import type { AuthResponse } from './models/AuthResponse';

const MAX_REQUEST_BYTES = 1024;

function authJson(response: AuthResponse, status = 200): Response {
  return Response.json(response, {
    status,
    headers: { 'Cache-Control': 'no-store' },
  });
}

export async function POST(request: Request): Promise<Response> {
  const contentType = request.headers.get('content-type') ?? '';
  if (!contentType.toLowerCase().includes('application/json')) {
    return authJson({ error: 'Expected JSON.' }, 415);
  }

  const contentLength = Number(request.headers.get('content-length'));
  if (Number.isFinite(contentLength) && contentLength > MAX_REQUEST_BYTES) {
    return authJson({ error: 'Request too large.' }, 413);
  }

  let body: unknown;
  try { body = await request.json(); } 
  catch { return authJson({ error: 'Invalid request.' }, 400); }

  const parsedRequest = AuthRequestSchema.safeParse(body);
  if (!parsedRequest.success) {
    return authJson({ error: 'Invalid request.' }, 400);
  }

  const passwordHash = process.env.CORP_PASSWORD_HASH;
  const sessionSecretConfigured = Boolean(
    process.env.CORP_SESSION_SECRET && process.env.CORP_SESSION_SECRET.length >= 32,
  );
  if (!passwordHash || !isCorpAuthConfigured()) {
    console.error('Corp auth environment configuration is incomplete.', {
      CORP_PASSWORD_HASH: Boolean(passwordHash),
      CORP_SESSION_SECRET: sessionSecretConfigured,
    });
    return authJson({ error: 'Password verification is not configured.' }, 503);
  }

  try {
    const valid = await verifyPassword(parsedRequest.data.password, passwordHash);
    const session = await getCorpSession();
    if (valid) {
      session.isAuthenticated = true;
      await session.save();
    } else {
      await session.destroy();
    }
    return authJson({ valid });
  } catch {
    return authJson({ error: 'Password verification service is unavailable.' }, 503);
  }
}