import type { Metadata } from "next";
import { readdirSync } from "fs";
import path from "path";

import BugGallery from "./BugGallery";

const BUGS_DIR = path.join(process.cwd(), "public", "3d-models", "bugs");

function formatLabel(fileName: string) {
  return fileName
    .replace(/\.[^.]+$/, "")
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function getBugModels() {
  return readdirSync(BUGS_DIR)
    .filter((file) => /\.(glb|gltf)$/i.test(file))
    .sort((a, b) => a.localeCompare(b))
    .map((file) => ({
      label: formatLabel(file),
      path: `/3d-models/bugs/${file}`,
    }));
}

export const metadata: Metadata = {
  title: "3D Bugs | Jeff Cardinal Portfolio",
  description: "A viewer for Jeff Cardinal's 3D bug models.",
};

export default function BugsPage() {
  const models = getBugModels();

  return <BugGallery models={models} />;
}
