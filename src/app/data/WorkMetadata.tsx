import type { WorkMetadata as WorkMetadataType } from "../types/WorkMetadata";
import { OpenDrawerLink } from "../components/OpenDrawerLink";

export const WorkMetadata = {
  enterTheHive: {
    category: "GFX",
    year: 2026,
    overview: <>Leaked single cover for an upcoming techno single from "BUGLAND TRAX".</>,
    inspiration: "Early 3D, Banjo Kazooie",
    tools: ["Blender"],
    tags: ["Bug"],
  },
  bangBangBang: {
    category: "GFX",
    year: 2025,
    overview: 'Techno track cover artwork concept. A stack of identical forged steel sculptures each reading "BANG" sits in a pool of 9mm bullets. Characters are custom-made in Illustrator, see below for gridlines.',
    inspiration: "Metal materials and neo-grunge.",
    tools: ["Illustrator", "Blender", "Photoshop"],
    tags: [],
  },
  mesh: {
    category: "GFX",
    year: 2025,
    overview: "Abstract 3D mesh. This started as a model of a price tag, then was morphed via subdivision modifier, meshing, and simple deform. The final render was composited in Photoshop with field blur and camera raw filter.",
    inspiration: "Early abstract 3D graphics.",
    tools: ["Blender", "Photoshop"],
    tags: [],
  },
  floatingInTheBreeze: {
    category: "GFX",
    year: 2025,
    overview: "Single cover for Heaven Sample - Floating in the Breeze [VAPERROR Remix]. Hover for the original cover. Part of a larger campaign for the release of Heaven Sample's debut record, Distorted Reality.",
    inspiration: "Y2K chrometype and metalheart (remix) and 70s psychedelia and pop art (original).",
    tools: ["Blender", "Photoshop"],
    tags: [],
  },
  drGabbaFlyers: {
    category: "GFX",
    year: { start: 2024, end: 2025 },
    overview: "Flyer advertisements for various techno parties - Chicago at Empty Bottle, Montréal at Les Foufounes Électriques, and Elsewhere (Main Hall) in Brooklyn, New York.",
    inspiration: (
        <>
          Liquid chrome entangles an iconic 90s acid smiley in Y2K fashion.
          Matrix-like background. Custom goop font for DR. GABBA, which informed
          the later{" "}
          <OpenDrawerLink
            options="text-[#8846e1] hover:text-[#32d100] transition duration-300"
            openDrawerId="fonts"
            scrollToId="goupe"
            text="Goupe"
          />
          {" "}font.
          <br />
          <br />
          The Montréal flyer features a balloon smiley physics simulation made
          in Blender.
          <br />
          <br />
          The New York flyer references the Dragon Warrior Monsters 2 Official
          Strategy Guide for the Game Boy Color.
        </>
    ),
    tools: ["Cinema 4D", "Blender", "Illustrator", "Photoshop"],
    tags: [],
  },
  manaPoolAlbumCover: {
    category: "GFX",
    year: 2018,
    overview: (
        <>
          Album cover for my debut album, Mana Pool. Upscaled with help from{" "}
          <a
            target="_blank"
            rel="noreferrer"
            className="text-white hover:text-white transition duration-300 underline"
            href="https://drewwise.com/"
          >
            Drew Wise.
          </a>
        </>
    ),
    inspiration: "Minimalistic aquatic ambiance.",
    tools: ["Illustrator", "Photoshop"],
    tags: [],
  },
  plus100Logo: {
    category: "BRAND",
    year: 2018,
    overview: "Logo for my record production company, PLUS100 Records. Shown here is the logo. Click the button below to check out our Bandcamp.",
    inspiration: "Minimalism and kawaii Japanese emoji.",
    tools: ["Photoshop"],
    tags: [],
  },
} satisfies Record<string, WorkMetadataType>;
