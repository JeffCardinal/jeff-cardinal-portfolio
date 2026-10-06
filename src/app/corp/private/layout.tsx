import { requireCorpSession } from "../auth.server";

export default async function PrivateLayout({ children }: { children: React.ReactNode }) {
  await requireCorpSession();
  return children;
}
