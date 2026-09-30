import { Euler, MathUtils, Quaternion } from "three";
import { DESKTOP_START_POSE } from "./beePose";

const BEE_ROTATION = DESKTOP_START_POSE.rotation.map(MathUtils.degToRad);

// X/Y/Z offsets in degrees, relative to the bee's resting rotation.
const TOP_LEFT = [90, 120, -90];
const TOP_RIGHT = [-15, -60, -60];
const BOTTOM_LEFT = [-60, 150, 90];
const BOTTOM_RIGHT = [0, 0, 0];

function cornerOrientation(offset: number[]): Quaternion {
  return new Quaternion().setFromEuler(new Euler(
    BEE_ROTATION[0] + MathUtils.degToRad(offset[0]),
    BEE_ROTATION[1] + MathUtils.degToRad(offset[1]),
    BEE_ROTATION[2] + MathUtils.degToRad(offset[2]),
  ));
}

const topLeft = cornerOrientation(TOP_LEFT);
const topRight = cornerOrientation(TOP_RIGHT);
const bottomLeft = cornerOrientation(BOTTOM_LEFT);
const bottomRight = cornerOrientation(BOTTOM_RIGHT);
const corners = [bottomLeft, bottomRight, topLeft, topRight];
// q and -q describe the same pose. Use one hemisphere for a continuous blend.
corners.forEach((corner) => {
  if (corner.dot(bottomRight) < 0) {
    corner.set(-corner.x, -corner.y, -corner.z, -corner.w);
  }
});

export function beeOrientation(
  x: number,
  y: number,
  target: Quaternion,
): Quaternion {
  const horizontal = MathUtils.clamp((x + 1) / 2, 0, 1);
  const vertical = MathUtils.clamp((y + 1) / 2, 0, 1);
  const weights = [
    (1 - horizontal) * (1 - vertical),
    horizontal * (1 - vertical),
    (1 - horizontal) * vertical,
    horizontal * vertical,
  ];
  target.set(0, 0, 0, 0);
  corners.forEach((corner, index) => {
    target.x += corner.x * weights[index];
    target.y += corner.y * weights[index];
    target.z += corner.z * weights[index];
    target.w += corner.w * weights[index];
  });
  return target.normalize();
}
