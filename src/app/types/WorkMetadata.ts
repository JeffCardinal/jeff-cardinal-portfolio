import type { ReactNode } from "react";

export type WorkMetadata = {
  category: string;
  year: number | { start: number; end: number };
  overview: ReactNode;
  inspiration: ReactNode;
  tools: string[];
  tags: string[];
};
