import type { Work } from "../types/WorkMetadata";
import { OpenDrawerLink } from "../components/OpenDrawerLink";

export const Works = {
  enterTheHive: {
    presentation: "standard",
    title: "ENTER THE HIVE",
    category: "GFX",
    year: 2026,
    overview: <>Leaked single cover for an upcoming techno single from "BUGLAND TRAX".</>,
    inspiration: "Early 3D, Banjo Kazooie",
    tools: ["Blender"],
    tags: ["Bug", "Frutiger Aero"],
    imageName: "bugland-EnterTheHive.jpg",
    bgColor: "bg-black",
    textColor: "text-[#fffc00]",
    borderColor: "border-[#fffc00]",
  },
  bangBangBang: {
    presentation: "standard",
    title: "Bang Bang Bang",
    category: "GFX",
    year: 2025,
    overview: 'Techno track cover artwork concept. A stack of identical forged steel sculptures each reading "BANG" sits in a pool of 9mm bullets. Characters are custom-made in Illustrator, see below for gridlines.',
    inspiration: "Metal materials and neo-grunge.",
    tools: ["Illustrator", "Blender", "Photoshop"],
    tags: ["3D"],
    imageName: "bangbangbang.jpg",
    bgColor: "bg-black",
    textColor: "text-[#ea0000]",
    borderColor: "border-[#ea0000]",
  },
  mesh: {
    presentation: "standard",
    title: "Mesh",
    category: "GFX",
    year: 2025,
    overview: "Abstract 3D mesh. This started as a model of a price tag, then was morphed via subdivision modifier, meshing, and simple deform. The final render was composited in Photoshop with field blur and camera raw filter.",
    inspiration: "Early abstract 3D graphics.",
    tools: ["Blender", "Photoshop"],
    tags: ["3D", "Experimental"],
    imageName: "abstract-holes.jpg",
    imageHoverName: "abstract-holes.jpg",
    bgColor: "bg-black",
    textColor: "text-[#5b68d3]",
    borderColor: "border-[#5b68d3]",
  },
  floatingInTheBreeze: {
    presentation: "standard",
    title: "Floating in the Breeze",
    category: "GFX",
    year: 2025,
    overview: "Single cover for Heaven Sample - Floating in the Breeze [VAPERROR Remix]. Hover for the original cover. Part of a larger campaign for the release of Heaven Sample's debut record, Distorted Reality.",
    inspiration: "Y2K chrometype and metalheart (remix) and 70s psychedelia and pop art (original).",
    tools: ["Blender", "Photoshop"],
    tags: [],
    imageName: "FloatingInTheBreeze-Remix-1080.jpg",
    imageHoverName: "FloatingInTheBreeze-Original-1080.jpg",
    bgColor: "bg-sky-400",
    textColor: "text-white",
    borderColor: "border-white",
  },
  drGabbaFlyers: {
    presentation: "standard",
    title: "DR. GABBA Flyers",
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
    tags: ["2D", "Music", "Flyer", "Poster"],
    imageName: "drgabbaflyer.png",
    imageHoverName: "drgabbaflyer.png",
    bgColor: "bg-black",
    textColor: "text-[#32d100]",
    borderColor: "border-[#32d100]",
  },
  manaPoolAlbumCover: {
    presentation: "standard",
    title: "Mana Pool Album Cover",
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
    tags: ["2D", "Music"],
    imageName: "manapool.png",
    imageHoverName: "manapool.png",
    bgColor: "bg-[#23caff]",
    textColor: "text-white",
    borderColor: "white",
  },
  plus100Logo: {
    presentation: "standard",
    title: "PLUS100 Logo",
    category: "BRAND",
    year: 2018,
    overview: "Logo for my record production company, PLUS100 Records. Shown here is the logo. Click the button below to check out our Bandcamp.",
    inspiration: "Minimalism and kawaii Japanese emoji.",
    tools: ["Photoshop"],
    tags: ["2D", "Music"],
    imageName: "plus100logo.png",
    imageHoverName: "plus100logo.png",
    bgColor: "bg-white",
    textColor: "text-[#ff84be]",
    borderColor: "border-[#ff84be]",
  },
  bugland: {
    presentation: "glass",
    title: "BUGLAND",
    category: "GFX",
    year: 2026,
    overview: <>Leaked cover for an upcoming techno album "BUGLAND TRAX". Original robotic bug characters tower over you in a sunny outdoor environment. Additional rigging and modeling assistance provided by <a target="_blank" rel="noreferrer" className="text-[#ea43a3] hover:text-white transition duration-300 underline" href="https://www.instagram.com/woozieface/">Woozieface.</a></>,
    inspiration: "Early 3D, Banjo Kazooie, A Bug's Life",
    tools: ["Blender"],
    tags: ["Bug", "Frutiger Aero", "3D"],
    imageName: "bugland.jpg",
    bgColor: "bg-white",
    textColor: "text-white",
    headerTextColor: "text-[#ea43a3]",
    borderColor: "border-white",
    renderVideo: false,
    bigBgColor: "bg-gradient-to-b from-[#005dfb] to-[#00fef2]",
  },
  folderIcon: {
    presentation: "glass",
    title: "Folder Icon",
    category: "GFX",
    year: 2025,
    overview: "2.5D folder icon. Hover for the original. Original was purposed for the single Open Me Up off of VAPERROR - System Delight (2015). This is a refresh of that icon in a more modern, high resolution style.",
    inspiration: "Windows 95.",
    tools: ["Photoshop"],
    tags: [],
    imageName: "folder.jpg",
    imageHoverName: "folder-og-upscaled.jpg",
    bgColor: "bg-white",
    textColor: "text-white",
    headerTextColor: "text-[#ea43a3]",
    borderColor: "border-white",
    renderVideo: false,
    bigBgColor: "bg-gradient-to-b from-[#005dfb] to-[#00fef2]",
  },
  windowsAngel: {
    presentation: "glass",
    title: "Windows Angel",
    category: "GFX",
    year: 2025,
    overview: "Single cover for Dreaming Diary - Windows Angel. Part of a larger campaign for the release of Dreaming Diary's record Digital Artifacts. Concept, cat eye, and sunset background by Sebastian Haid. 3D models, UI components, and final render by Jeff Cardinal. Check out the 3D demo.",
    inspiration: (
      <>
        Modern meets retro - Windows Vista and Apple Glass UI. Hyperreality of
        digital angels trapped in an outdated computer OS. There is reference to
        our track, {" "}
        <OpenDrawerLink
          options="text-[#ea43a3] hover:text-white transition duration-300"
          scrollToId="blissFeature"
          text="Bliss,"
        />
        {" "}by repurposing the background from that single cover.
      </>
    ),
    tools: ["Blender", "Bryce", "Photoshop"],
    tags: ["3D", "2D", "Composite", "Frutiger Aero", "Motion"],
    imageName: "WindowsAngel-2k.jpg",
    imageHoverName: "WindowsAngel-2k.jpg",
    bgColor: "bg-white",
    textColor: "text-white",
    headerTextColor: "text-[#ea43a3]",
    borderColor: "border-white",
  },
  bliss: {
    presentation: "glass",
    id: "blissFeature",
    title: "Bliss",
    category: "GFX",
    year: 2025,
    overview: "Single cover for Dreaming Diary + VAPERROR - Bliss. Part of a larger campaign for the release of Dreaming Diary's record Digital Artifacts. Layout, icons and background photo by Sebastian Haid. Airbrushing, post-processing and smiley 3D model by Jeff Cardinal. Ferrite Core font by Froyo Tam.",
    inspiration: "Y2K airbrushed hyperreality, icons evoke early cellphone OS feeling.",
    tools: ["Blender", "Illustrator", "Photoshop"],
    tags: ["3D", "2D", "Composite", "Frutiger Aero", "Motion"],
    imageName: "Bliss-JPG-2k.jpg",
    imageHoverName: "Bliss-JPG-2k.jpg",
    bgColor: "bg-white",
    textColor: "text-white",
    headerTextColor: "text-[#ea43a3]",
    borderColor: "border-white",
  },
  cdJacket: {
    presentation: "uiux",
    title: "CD Jacket",
    category: "UI/UX",
    year: 2025,
    overview: "3D motion graphics UI animating a holographic CD jacket. Idea for a rare music drop or pre-save.",
    tools: ["React", "Tailwind", "Framer Motion"],
    tags: ["Interaction Design", "Motion"],
    imageName: "ui-projects/windows-angel-ui.jpg",
    imageHoverName: "ui-projects/windows-angel-ui.jpg",
    bgColor: "bg-slate-900",
    borderColor: "border-indigo-300",
    textColor: "text-indigo-300",
  },
  gpuBooking: {
    presentation: "uiux",
    title: "GPU Booking",
    category: "UI/UX",
    year: 2024,
    overview: "Lightweight UI component for booking GPUs. Hover to open. Desktop only.",
    tools: ["React", "Tailwind"],
    tags: ["Web", "Interaction Design", "Motion"],
    imageName: "ui-projects/gpu.jpg",
    imageHoverName: "ui-projects/gpu-2.jpg",
    bgColor: "bg-black",
    borderColor: "border-indigo-500",
    textColor: "text-indigo-500",
  },
  socialPortal: {
    presentation: "uiux",
    title: "Social Portal",
    category: "UI/UX",
    year: 2019,
    overview: `Here's a "hero" screen for a social portal I designed in 2019. In 2025, I ported the site to use Vite. It animates, so be sure to check the demo (desktop only).`,
    tools: ["React", "Vite", "CSS3 Animations"],
    tags: ["Web", "Motion"],
    imageName: "ui-projects/jeffcardinal-2019.jpg",
    imageHoverName: "ui-projects/jeffcardinal-2019.jpg",
    bgColor: "bg-blue-400",
    borderColor: "border-white",
    textColor: "text-white",
  },
  retroh: {
    presentation: "uiux",
    title: "RetRoh!",
    category: "UI/UX",
    year: 2017,
    overview: "A cute retrospective board for reflecting on your Agile projects after each sprint. Hover for login page.",
    tools: ["React", "Spring Boot", "PostgreSQL"],
    tags: ["Web", "App"],
    imageName: "ui-projects/retroh-board.jpg",
    imageHoverName: "ui-projects/retroh-login.jpg",
    bgColor: "bg-white",
    borderColor: "border-[#00bfff]",
    textColor: "text-[#00bfff]",
  },
  flowgear: {
    presentation: "uiux",
    title: "FLOWGEAR",
    category: "BRAND",
    year: 2026,
    overview: "Work for FLOWGEAR - a rave series. Namu (mascot) illustrations and 3D model by Cubenatural.",
    tools: ["Illustrator", "Photoshop"],
    tags: ["Shirt"],
    imageName: "flowgear/FlowgearShirtBlack.jpg",
    imageHoverName: "flowgear/FlowgearShirtBlack.jpg",
    bgColor: "bg-black",
    borderColor: "border-white",
    textColor: "text-white",
  },
  i2kBranding: {
    presentation: "uiux",
    title: "i2k Branding",
    category: "BRAND",
    year: 2025,
    overview: "i2K was a music festival in Richmond, Virginia. In order to ensure pixel perfection, a grid system was enforced to create the illusory 3D model, which was then captured by an orthographic camera. The final render is composited in Photoshop with precise masking and additional shading. Dynamic logo type was used for promotional motion graphics. A limited t-shirt was screen-printed, featuring an android woman and WinAmp-skin informed mp3 player.",
    tools: ["Illustrator", "Blender", "Photoshop"],
    tags: ["Shirt"],
    imageName: "i2k/i2k-iso-25.jpg",
    imageHoverName: "i2k/i2k-iso-25.jpg",
    bgColor: "bg-white",
    borderColor: "border-[#00bfff]",
    textColor: "text-[#00bfff]",
  },
  metaballAvatarGenerator: {
    presentation: "uiux",
    title: "Metaball Avatar Generator",
    category: "TOYBOX",
    year: 2026,
    overview: "Have fun generating your own avatar.",
    tools: ["React", "Tailwind", "Three.js"],
    tags: [],
    imageName: "metaball-avatar-generator.png",
    bgColor: "bg-black",
    borderColor: "border-[#1694ff]",
    textColor: "text-[#1694ff]",
  },
  goupe: {
    presentation: "font",
    id: "goupe",
    title: "Goupe",
    category: "FONTS",
    overview: `Read like "coupe". Goupe is a fun, funky flowing font for all your goopy design needs.`,
    inspiration: "Modern retro font. Currently available for free download!",
    tools: ["Procreate", "Illustrator", "Fontself"],
    tags: [],
    imageName: "fonts/goopdemo.jpg",
    imageHoverName: "fonts/goopdemo-black.jpg",
    bgColor: "bg-black",
    borderColor: "border-lime-400",
    textColor: "text-lime-400",
  },
} satisfies Record<string, Work>;
