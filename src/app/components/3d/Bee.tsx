"use client";

import { useGLTF } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import { AnimationMixer, Box3, Euler, Group, LoopRepeat, MathUtils, Plane, Quaternion, Raycaster, Vector3 } from "three";
import { clone } from "three/examples/jsm/utils/SkeletonUtils.js";
import { entranceProgress } from "./entrance";
import { beeOrientation } from "./beeRotation";
import { DESKTOP_START_POSE, MOBILE_START_POSE } from "./beePose";

export default function Bee({ mobile = false }: { mobile?: boolean }) {
  // Each responsive instance retains its own starting pose while it animates.
  const [startingPose] = useState(() => mobile ? MOBILE_START_POSE : DESKTOP_START_POSE);
  const rotation = useMemo<[number, number, number]>(() => [
    MathUtils.degToRad(startingPose.rotation[0]),
    MathUtils.degToRad(startingPose.rotation[1]),
    MathUtils.degToRad(startingPose.rotation[2]),
  ], [startingPose]);
  const { scene, animations } = useGLTF("/3d-models/bugs/Bee.glb");
  const { viewport } = useThree();
  const { model, pivot, pivotOffset, size } = useMemo(() => {
    const model = clone(scene);
    const bounds = new Box3().setFromObject(model);
    const center = bounds.getCenter(new Vector3());
    const head = model.getObjectByName("Head_1") ?? model.getObjectByName("Head");
    const pivot = head ? new Box3().setFromObject(head).getCenter(new Vector3()) : center.clone();
    // Compensate for moving the pivot so the resting pose stays in place.
    const pivotOffset = pivot.clone().sub(center).applyEuler(new Euler(...rotation));

    return {
      model,
      pivot,
      pivotOffset,
      size: bounds.getSize(new Vector3()),
    };
  }, [scene, rotation]);
  const mixerRef = useRef<AnimationMixer | null>(null);
  const entranceRef = useRef<Group>(null);
  const entranceElapsed = useRef(0);
  const beeRef = useRef<Group>(null);
  const following = useRef(false);
  const mouseTarget = useMemo(() => new Vector3(), []);
  const mouseRay = useMemo(() => new Raycaster(), []);
  const followPlane = useMemo(() => new Plane(new Vector3(0, 0, 1), -2.3), []);
  const orientations = useMemo(() => ({
    resting: new Quaternion().setFromEuler(new Euler(...rotation)),
    target: new Quaternion(),
  }), [rotation]);

  useEffect(() => {
    const flying = animations.find((clip) => clip.name === "Flying");
    if (!flying) return;

    const mixer = new AnimationMixer(model);
    mixerRef.current = mixer;
    mixer.clipAction(flying).reset().setLoop(LoopRepeat, Infinity).play();

    return () => {
      mixerRef.current = null;
      mixer.stopAllAction();
      mixer.uncacheRoot(model);
    };
  }, [animations, model]);

  useFrame(({ camera, pointer }, delta) => {
    mixerRef.current?.update(delta);
    entranceElapsed.current += delta;
    if (!entranceRef.current) return;

    const progress = entranceProgress(entranceElapsed.current);
    entranceRef.current.position.y = -viewport.height * (1 - progress);
    entranceRef.current.position.z = 0.08 * Math.sin(entranceElapsed.current * (2 * Math.PI / 3));
    entranceRef.current.visible = progress > 0;

    if (!beeRef.current) return;
    if (mobile) {
      // Repeatedly peek up from the bottom, then drift back out over eight seconds.
      const time = Math.max(entranceElapsed.current - 1, 0);
      const hiddenAmount = (1 + Math.cos(time * (2 * Math.PI / 8))) / 2;
      const travel = size.length() * scale + viewport.height * 0.1;
      entranceRef.current.position.y = -travel * hiddenAmount
        + 0.04 * Math.sin(time * (2 * Math.PI / 3));
      entranceRef.current.visible = time > 0;
      return;
    }
    mouseTarget.set(...position);
    if (following.current) {
      followPlane.constant = -position[2];
      mouseRay.setFromCamera(pointer, camera);
      if (mouseRay.ray.intersectPlane(followPlane, mouseTarget)) {
        mouseTarget.y -= entranceRef.current.position.y;
      }
    }
    beeRef.current.position.lerp(mouseTarget, 1 - Math.exp(-6 * delta));
    if (following.current) {
      beeOrientation(pointer.x, pointer.y, orientations.target);
    } else {
      orientations.target.copy(orientations.resting);
    }
    beeRef.current.quaternion.slerp(orientations.target, 1 - Math.exp(-6 * delta));
  });

  const scale = Math.min(
    (viewport.width * 0.35) / size.x,
    (viewport.height * 0.35) / size.y,
  );
  const position: [number, number, number] = [
    viewport.width * startingPose.position[0] - (mobile ? 0 : (size.x * scale) / 2) + pivotOffset.x * scale,
    viewport.height * startingPose.position[1] + (size.y * scale) / 2 + pivotOffset.y * scale,
    startingPose.position[2] + pivotOffset.z * scale,
  ];

  return (
    <group ref={entranceRef} visible={false}>
      <group
        ref={beeRef}
        position={position}
        scale={scale}
        rotation={rotation}
        onClick={mobile ? undefined : (event) => {
          event.stopPropagation();
          following.current = !following.current;
        }}
      >
        <primitive object={model} position={[-pivot.x, -pivot.y, -pivot.z]} />
      </group>
    </group>
  );
}
