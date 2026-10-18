'use client';
import React, { createContext, useContext } from "react";

type WorkNavigation = {
  openDrawer?: (id: string) => void;
  scrollTo?: (id: string) => void;
};

export const WorkNavigationContext = createContext<WorkNavigation>({});

type OpenDrawerLinkProps = {
  options?: string;
  openDrawerId?: string,
  scrollToId: string,
  text: string,
  openDrawer?: (id: string) => void;
  scrollTo?: (id: string) => void;
};

export const OpenDrawerLink: React.FC<OpenDrawerLinkProps> = ({
  options,
  openDrawerId,
  scrollToId,
  text,
  openDrawer: openDrawerProp,
  scrollTo: scrollToProp,
}) => {
  const navigation = useContext(WorkNavigationContext);
  const openDrawer = openDrawerProp ?? navigation.openDrawer;
  const scrollTo = scrollToProp ?? navigation.scrollTo;

  return (
    <a
      className={`underline hover:text-white ${options}`}
      href=""
      onClick={(event) => {
        event.preventDefault();
        if (openDrawer && openDrawerId) openDrawer(openDrawerId);
        scrollTo?.(scrollToId);
      }}
    >
      {text}
    </a>
  );
};
