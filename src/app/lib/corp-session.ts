import 'server-only';

import { getIronSession, type SessionOptions } from 'iron-session';
import { cookies } from 'next/headers';

export interface CorpSessionData {
  isAuthenticated?: boolean;
}

const SESSION_COOKIE_NAME = 'corp_session';
const SESSION_TTL_SECONDS = 60 * 60 * 8;

export function isCorpAuthConfigured(): boolean {
  const secret = process.env.CORP_SESSION_SECRET;
  const passwordHash = process.env.CORP_PASSWORD_HASH;
  return (
    typeof passwordHash === 'string' &&
    passwordHash.length > 0 &&
    typeof secret === 'string' &&
    secret.length >= 32
  );
}

function getSessionOptions(): SessionOptions {
  const secret = process.env.CORP_SESSION_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error('CORP_SESSION_SECRET must be set to at least 32 characters.');
  }

  return {
    cookieName: SESSION_COOKIE_NAME,
    password: secret,
    cookieOptions: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: SESSION_TTL_SECONDS,
    },
  };
}

export async function getCorpSession() {
  return getIronSession<CorpSessionData>(await cookies(), getSessionOptions());
}