type BeeStartingPose = {
  // X/Y are viewport fractions from the center; Z is in scene units.
  position: [number, number, number];
  // X/Y/Z rotation in degrees, around the head pivot.
  rotation: [number, number, number];
};

export const MOBILE_START_POSE: BeeStartingPose = {
  position: [0, -0.2, 6],
  rotation: [-30, 0, 0],
};

export const DESKTOP_START_POSE: BeeStartingPose = {
  position: [0.45, -0.45, 3],
  rotation: [-30, -60, 0],
};
