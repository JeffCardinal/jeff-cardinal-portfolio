'use client';
import React from "react";

type OpenDrawerLinkProps = {
  options?: string;
  openDrawerId?: string,
  scrollToId: string,
  text: string,
  openDrawer?: (id: string) => void;
  scrollTo: (id: string) => void;
};

export const OpenDrawerLink: React.FC<OpenDrawerLinkProps> = ({ options, openDrawerId, scrollToId, text, openDrawer, scrollTo }) => (
  <a
    className={`underline hover:text-white ${options}`}
    href=""
    onClick={(e) => {
      e.preventDefault();
      console.log(`OpenDrawerLink clicked: openDrawerId=${openDrawerId}, scrollToId=${scrollToId}`);
      if (openDrawer && openDrawerId) {
        openDrawer(openDrawerId);
      }
      scrollTo(scrollToId);
    }}
  >
    {text}
  </a>
);
