'use client';

import { useState, type ReactNode } from "react";
import Image from "next/image";
import { WorkNavigationContext } from "../OpenDrawerLink";
import type { Work } from "../../types/WorkMetadata";

type FeatureProps = {
  work: Work;
  children?: ReactNode;
  openDrawer?: (id: string) => void;
  scrollTo?: (id: string) => void;
};

type MetadataPanelProps = {
  label: string;
  content: ReactNode;
  work: Work;
  isGlass: boolean;
  headerTextColor: string;
  isLast: boolean;
  hasChildren: boolean;
};

function formatYear(year: NonNullable<Work["year"]>): string {
  return typeof year === "number" ? String(year) : `${year.start}-${year.end}`;
}

function MetadataPanel({
  label,
  content,
  work,
  isGlass,
  headerTextColor,
  isLast,
}: MetadataPanelProps) {
  const margin = isLast ? "my-6" : "my-8";
  const labelClass = [
    "metadata-label",
    isGlass && "glass-metadata-label",
    work.bgColor,
    headerTextColor,
    work.borderColor,
  ]
    .filter(Boolean)
    .join(" ");
  const contentClass = isGlass
    ? `shadow-[0px_4px_8px_rgba(0,0,0,0.1),inset_0px_-2px_4px_rgba(75,200,255,1),inset_0px_-8px_8px_rgba(255,255,255,0.5),inset_0px_2px_2px_rgba(255,255,255,1),inset_0px_-2px_8px_rgba(0,75,111,0.2),inset_0px_-4px_16px_rgba(200,255,255,1)] p-8 border-[3px] border-white rounded-xl backdrop-filter backdrop-blur-md ${work.bgColor} bg-opacity-20 border-opacity-100`
    : `p-8 border-[3px] rounded-xl ${work.borderColor} border-opacity-50`;

  return (
    <div className={`observableRight opacity-0 relative ${margin}`}>
      <div className={labelClass}>{label}</div>
      <div className={contentClass}>
        <p className={isGlass ? work.textColor : undefined}>{content}</p>
      </div>
    </div>
  );
}

export default function Feature({ work, children, openDrawer, scrollTo }: FeatureProps) {
  const [hovering, setHovering] = useState(true);
  const isGlass = work.presentation === "glass";
  const isUiux  = work.presentation === "uiux";
  const isFont  = work.presentation === "font";
  const year    = work.year == null ? undefined : formatYear(work.year);
  const hasHoverImage = Boolean(work.imageHoverName);
  const imageSrc = !hovering && hasHoverImage ? work.imageHoverName! : work.imageName;
  const headerTextColor = work.headerTextColor ?? work.textColor;
  const panels: { label: string; content: ReactNode }[] = [];

  if (work.year != null) {
    panels.push({ label: "Year", content: year });
  }
  panels.push({ label: "Overview", content: work.overview });
  if (work.inspiration != null) {
    panels.push({ label: isFont ? "Information" : "Inspiration", content: work.inspiration });
  }
  panels.push({ label: "Tools", content: work.tools.join(", ") });

  const frameClass = isGlass
    ? `relative box-border p-8 flex flex-col lg:flex-row overflow-hidden ${work.bigBgColor ?? ""} ${work.textColor}`
    : `         box-border p-8 flex flex-col lg:flex-row ${work.bgColor} ${work.textColor}`;
  const imageWidth = isFont ? 800 : 1000;
  const imageHeight = isUiux || isFont ? 0 : 1000;
  const titleClass = "w-full block observableRight opacity-0 relative w-full block text-3xl lg:text-4xl font-distancia z-10"

  return (
    <WorkNavigationContext.Provider value={{ openDrawer, scrollTo }}>
      <div id={work.id} className={frameClass}>
        {isGlass && work.renderVideo !== false && (
          <video className="absolute inset-0 w-full h-full object-cover z-[0]" autoPlay muted loop playsInline>
            <source src="/images/bliss-bg-video-6.mp4" />
            Your browser does not support the video tag.
          </video>
        )}
        <div className={`flex flex-1 justify-center ${isGlass ? "z-10" : "items-center"} lg:justify-end observableLeft opacity-0`}>
          <Image
            className="work-image pb-8 lg:pb-0"
            onMouseEnter={hasHoverImage ? () => setHovering(false) : undefined}
            onMouseLeave={hasHoverImage ? () => setHovering(true) : undefined}
            src={`/images/${imageSrc}`}
            alt={work.title}
            width={imageWidth}
            height={imageHeight}
            sizes="100vw"
          />
        </div>

        <div className={"flex-1 lg:pl-8 relative z-10"}>
          <div className={"flex-col max-w-[1000px]"}>
            <span className={titleClass} style={isUiux || isFont ? undefined : { lineHeight: 1 }}>
              {isFont ? (
                <Image className="observableRight opacity-0 object-contain" src="/images/fonts/GoupeTitle.png" alt="" width={600} height={0} sizes="100vw" />
              ) : work.title}
            </span>
            {panels.map((panel, index) => (
              <MetadataPanel
                key={panel.label}
                label={panel.label}
                content={panel.content}
                work={work}
                isGlass={isGlass}
                headerTextColor={headerTextColor}
                isLast={index === panels.length - 1}
                hasChildren={Boolean(children)}
              />
            ))}
            {/* {work.tags.length > 0 && (
              <div className="observableRight opacity-0 flex flex-wrap gap-2 z-10">
                {work.tags.map((tag) => (
                  <span
                    key={tag}
                    className={`work-tag border rounded-md px-2 py-1 text-sm ${work.borderColor} ${work.textColor}`}
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )} */}
            <div className={`observableRight opacity-0`}>{children}</div>
          </div>
        </div>
      </div>
    </WorkNavigationContext.Provider>
  );
}
