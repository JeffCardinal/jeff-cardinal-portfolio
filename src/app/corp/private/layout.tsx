import type { ReactNode } from 'react';
import { redirect } from 'next/navigation';
import { getCorpSession } from '../../lib/corp-session';

export default async function PrivateLayout({ children }: { children: ReactNode }) {
  const session = await getCorpSession();
  if (!session.isAuthenticated) redirect('/corp');

  return children;
}
