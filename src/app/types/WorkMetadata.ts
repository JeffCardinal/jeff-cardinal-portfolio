import type { ReactNode } from "react";

export enum MetadataType {
  Category = "category",
  Year = "year",
  Overview = "overview",
  Inspiration = "inspiration",
  Tools = "tools",
  Tag = "tag",
}

export type Metadata =
  | { type: MetadataType.Category; value: string }
  | { type: MetadataType.Year; value: number }
  | { type: MetadataType.Overview; value: ReactNode }
  | { type: MetadataType.Inspiration; value: ReactNode }
  | { type: MetadataType.Tools; value: string[] }
  | { type: MetadataType.Tag; value: string };

export type MetadataOfType<Type extends MetadataType> = Extract<Metadata, { type: Type }>;

export type WorkMetadata = {
  category: MetadataOfType<MetadataType.Category>;
  year: MetadataOfType<MetadataType.Year>;
  overview: MetadataOfType<MetadataType.Overview>;
  inspiration: MetadataOfType<MetadataType.Inspiration>;
  tools: MetadataOfType<MetadataType.Tools>;
  tags: MetadataOfType<MetadataType.Tag>[];
};
