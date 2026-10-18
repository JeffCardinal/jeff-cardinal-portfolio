import type { ReactNode } from "react";

export type WorkMetadata = {
  category: string;
  year?: number | { start: number; end: number };
  overview: ReactNode;
  inspiration?: ReactNode;
  tools: string[];
  tags: string[];
};

type WorkBase = WorkMetadata & {
  id?: string;
  title: string;
  imageName: string;
  imageHoverName?: string;
  bgColor: string;
  borderColor: string;
  textColor: string;
  headerTextColor?: string;
};

export type Work =
  | (WorkBase & { presentation: "standard"; })
  | (WorkBase & { presentation: "uiux"; })
  | (WorkBase & { presentation: "font"; })
  | (WorkBase & {
      presentation: "glass";
      renderVideo?: boolean;
      bigBgColor?: string;
    });
  