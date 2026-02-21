import React, { useEffect, useLayoutEffect, useMemo, useRef } from "react";
import { ThreeEvent, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { createNoise4D } from "simplex-noise";

const noise4D = createNoise4D();
const SPHERE_RADIUS = 0.4;
const SPAWN_LIFETIME_SECONDS = 1.45;

type BlobProps = {
  position: [number, number, number];
  scale?: number;
  isSpawned?: boolean;
  initialVelocity?: [number, number, number];
  onBubbleClick?: (
    origin: [number, number, number],
    parentScale: number,
    parentCurrentScale: number
  ) => void;
  onExpire?: () => void;
};

export default function Blob({
  position,
  scale = 1,
  isSpawned = false,
  initialVelocity,
  onBubbleClick,
  onExpire,
}: BlobProps) {
  const groupRef = useRef<THREE.Group>(null!);
  const meshRef = useRef<THREE.Mesh>(null!);
  const hoverWiggleTarget = useRef(0);
  const hoverScaleTarget = useRef(0);
  const wiggleStrength = useRef(0);
  const scaleStrength = useRef(0);
  const basePositions = useRef<Float32Array | null>(null);
  const shotOffset = useRef(new THREE.Vector3(0, 0, 0));
  const shotVelocity = useRef(new THREE.Vector3(0, 0, 0));
  const age = useRef(0);
  const expired = useRef(false);
  const scratch = useRef({
    direction: new THREE.Vector3(),
    tempScale: new THREE.Vector3(),
  });
  const rand = useMemo(() => Math.random(), []);

  useEffect(() => {
    if (!meshRef.current) return;
    const geometry = meshRef.current.geometry as THREE.BufferGeometry;
    basePositions.current = new Float32Array(geometry.attributes.position.array);
  }, []);

  useLayoutEffect(() => {
    if (!meshRef.current) return;
    meshRef.current.scale.setScalar(scale);
  }, [scale]);

  useEffect(() => {
    if (!initialVelocity) return;
    shotVelocity.current.set(initialVelocity[0], initialVelocity[1], initialVelocity[2]);
  }, [initialVelocity]);

  useFrame(({ clock }, delta) => {
    if (!meshRef.current || !groupRef.current || !basePositions.current) return;

    const time = clock.getElapsedTime();
    const geom = meshRef.current.geometry as THREE.BufferGeometry;
    const pos = geom.attributes.position as THREE.BufferAttribute;
    const original = basePositions.current;

    wiggleStrength.current = THREE.MathUtils.lerp(
      wiggleStrength.current,
      hoverWiggleTarget.current,
      0.33
    );
    scaleStrength.current = THREE.MathUtils.lerp(
      scaleStrength.current,
      hoverScaleTarget.current,
      0.24
    );

    for (let i = 0; i < pos.count; i++) {
      const ix = i * 3;
      const x = original[ix];
      const y = original[ix + 1];
      const z = original[ix + 2];

      const n = noise4D(x * 4, y * 4, z * 4, time);
      const falloff = Math.pow(
        THREE.MathUtils.clamp(new THREE.Vector3(x, y, z).length() / 0.5, 0.5, 0.5),
        1
      );
      const displacement = n * 0.1 * wiggleStrength.current * falloff;
      const ripple =
        Math.sin(time * 2 + y * 15) *
        Math.sin(time * 2 + x * 15) *
        Math.sin(time * 2 + z * 15) *
        0.1 *
        wiggleStrength.current;

      pos.setXYZ(
        i,
        x + (displacement + ripple) * x,
        y + (displacement + ripple) * y,
        z + (displacement + ripple) * z
      );
    }
    pos.needsUpdate = true;

    if (isSpawned) {
      shotVelocity.current.multiplyScalar(Math.exp(-2.8 * delta));
      shotVelocity.current.y -= 0.35 * delta;
      shotOffset.current.addScaledVector(shotVelocity.current, delta);
    } else {
      shotVelocity.current.addScaledVector(shotOffset.current, -14 * delta);
      shotVelocity.current.multiplyScalar(Math.exp(-3.2 * delta));
      shotOffset.current.addScaledVector(shotVelocity.current, delta);
    }

    const bob = Math.sin(time + rand * 100) * 0.1 - 0.2;
    groupRef.current.position.set(
      position[0] + shotOffset.current.x,
      position[1] + bob + shotOffset.current.y,
      position[2] + shotOffset.current.z
    );

    let lifeScale = 1;
    if (isSpawned) {
      age.current += delta;
      const life = THREE.MathUtils.clamp(1 - age.current / SPAWN_LIFETIME_SECONDS, 0, 1);
      lifeScale = life;
      if (life <= 0 && !expired.current) {
        expired.current = true;
        onExpire?.();
      }
    }

    const hoverScaleBoost = 0.25 * scaleStrength.current;
    const targetScale = scale * (1 + hoverScaleBoost) * lifeScale;
    scratch.current.tempScale.set(targetScale, targetScale, targetScale);
    if (isSpawned && age.current < 0.12) {
      meshRef.current.scale.copy(scratch.current.tempScale);
    } else {
      meshRef.current.scale.lerp(scratch.current.tempScale, 0.14);
    }
  });

  const handleClick = (event: ThreeEvent<MouseEvent>) => {
    event.stopPropagation();
    if (!meshRef.current) return;

    const camera = event.camera as THREE.PerspectiveCamera | THREE.OrthographicCamera;
    const centerWorld = new THREE.Vector3();
    meshRef.current.getWorldPosition(centerWorld);

    // 2D view-plane click delta (NDC), depth-independent.
    const centerNdc = centerWorld.clone().project(camera);
    const clickNdc = event.point.clone().project(camera);
    const delta2d = new THREE.Vector2(clickNdc.x - centerNdc.x, clickNdc.y - centerNdc.y);
    const distance2d = delta2d.length();

    // Projected sphere radius in NDC so force scales consistently with perspective.
    const camRight = new THREE.Vector3()
      .setFromMatrixColumn(camera.matrixWorld, 0)
      .normalize();
    const interactionRadiusWorld = SPHERE_RADIUS * scale;
    const edgeNdc = centerWorld
      .clone()
      .add(camRight.clone().multiplyScalar(interactionRadiusWorld))
      .project(camera);
    const projectedRadiusNdc = Math.max(
      0.01,
      new THREE.Vector2(edgeNdc.x - centerNdc.x, edgeNdc.y - centerNdc.y).length()
    );
    const normalizedDistance = THREE.MathUtils.clamp(distance2d / projectedRadiusNdc, 0, 1);

    const direction = scratch.current.direction;
    if (distance2d < 0.0001) {
      direction.set(Math.random() - 0.5, Math.random() - 0.5, 0).normalize();
    } else {
      const dir2d = delta2d.clone().normalize().multiplyScalar(-1);
      const camUp = new THREE.Vector3()
        .setFromMatrixColumn(camera.matrixWorld, 1)
        .normalize();

      direction
        .copy(camRight)
        .multiplyScalar(dir2d.x)
        .add(camUp.multiplyScalar(dir2d.y))
        .normalize();
    }

    const clickSpeed = THREE.MathUtils.lerp(0.45, 5.4, Math.pow(normalizedDistance, 1.35));
    shotVelocity.current.addScaledVector(direction, clickSpeed);

    const origin: [number, number, number] = [
      centerWorld.x,
      centerWorld.y,
      centerWorld.z,
    ];
    onBubbleClick?.(origin, scale, meshRef.current.scale.x);
  };

  return (
    <group ref={groupRef}>
      <mesh
        ref={meshRef}
        onPointerEnter={() => {
          hoverWiggleTarget.current = 1;
          hoverScaleTarget.current = 1;
        }}
        onPointerLeave={() => {
          hoverWiggleTarget.current = 0;
          hoverScaleTarget.current = 0;
        }}
        onClick={handleClick}
      >
        <sphereGeometry args={[SPHERE_RADIUS, 64, 64]} />
        <meshPhysicalMaterial
          transmission={1}
          roughness={0.005}
          thickness={5}
          ior={1.45}
          reflectivity={1}
          clearcoat={1}
          clearcoatRoughness={0}
          envMapIntensity={3.5}
          iridescence={1}
          iridescenceIOR={1}
          iridescenceThicknessRange={[300, 700]}
          attenuationColor="#ffffff"
          attenuationDistance={0.1}
          metalness={0}
          toneMapped={false}
          specularColor="#ffffff"
          specularIntensity={1}
        />
      </mesh>
    </group>
  );
}
