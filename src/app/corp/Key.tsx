import { useGLTF } from "@react-three/drei";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Group, Material, MathUtils, Mesh, Plane, Vector3 } from "three";
import { applyKeyProfile, prepareKeyModel } from "./keyModel";
import { generateKeyBittingPattern } from "./generateKeyBittingPattern";

export default function Key({ password, focused, inserting, onInserted, backZ, attempt }: {
  password: string;
  focused: boolean;
  inserting: boolean;
  onInserted: () => void;
  backZ: number;
  attempt: number;
}) {
  const { scene } = useGLTF("/3d-models/key.glb");
  const { model, edges, geometries, clippingPlane, materials } = useMemo(() => {
    const prepared = prepareKeyModel(scene);
    const clippingPlane = new Plane();
    const materials: Material[] = [];
    prepared.model.traverse((object) => {
      if (!(object instanceof Mesh)) return;
      const clone = (source: Material) => {
        const material = source.clone();
        material.clippingPlanes = [clippingPlane];
        material.clipShadows = true;
        materials.push(material);
        return material;
      };
      object.material = Array.isArray(object.material)
        ? object.material.map(clone)
        : clone(object.material);
    });
    return { ...prepared, clippingPlane, materials };
  }, [scene]);
  const localClipPlane = useMemo(() => {
    return new Plane().setFromNormalAndCoplanarPoint(
      new Vector3(0, 0, 1),
      new Vector3(0, 0, backZ),
    );
  }, [backZ]);
  const group = useRef<Group>(null);
  const camera = useThree((state) => state.camera);
  const entrance = useRef(0);
  const entranceY = useRef(8);
  const wasVisible = useRef(false);
  const [hasAppeared, setHasAppeared] = useState(false);
  const progress = useRef(0);
  const completed = useRef(false);
  const insertionStartZ = useRef(3.4);
  const returning = useRef<{ elapsed: number; z: number; rotationY: number } | null>(null);

  useLayoutEffect(() => {
    const visible = focused || inserting;
    if (visible && !wasVisible.current && group.current?.parent) {
      const parent = group.current.parent;
      parent.updateWorldMatrix(true, false);
      camera.updateWorldMatrix(true, false);
      // Start above the viewport at the ready position's depth.
      const start = parent.localToWorld(new Vector3(0, -0.59, 3.4)).project(camera);
      start.y = 1.6;
      start.unproject(camera);
      entranceY.current = parent.worldToLocal(start).y;
      entrance.current = 0;
      group.current.position.y = entranceY.current;
      wasVisible.current = true;
      setHasAppeared(true);
    }
  }, [focused, inserting, camera]);

  useLayoutEffect(() => {
    if (!inserting && !returning.current && group.current && Math.abs(group.current.position.z - 3.4) > 0.0001) {
      returning.current = {
        elapsed: 0,
        z: group.current.position.z,
        rotationY: group.current.rotation.y,
      };
    }
    insertionStartZ.current = returning.current ? 3.4 : (group.current?.position.z ?? 3.4);
    progress.current = 0;
    completed.current = false;
  }, [inserting, attempt]);

  useFrame((_, delta) => {
    if (!group.current) return;
    // Clip key not lock
    if (group.current.parent) {
      group.current.parent.updateWorldMatrix(true, false);
      clippingPlane.copy(localClipPlane).applyMatrix4(group.current.parent.matrixWorld);
    }
    if (wasVisible.current) entrance.current = Math.min(1, entrance.current + delta / 0.5);
    const arrival = 1 - Math.pow(1 - entrance.current, 3);
    group.current.position.y = MathUtils.lerp(entranceY.current, -0.59, arrival);
    if (returning.current) {
      const retreat = returning.current;
      retreat.elapsed = Math.min(0.3, retreat.elapsed + delta);
      const eased = MathUtils.smoothstep(retreat.elapsed, 0, 0.3);
      group.current.position.z = MathUtils.lerp(retreat.z, 3.4, eased);
      group.current.rotation.y = MathUtils.lerp(retreat.rotationY, Math.PI * 1.5, eased);
      if (retreat.elapsed === 0.3) returning.current = null;
      return;
    }
    if (inserting && entrance.current === 1 && !completed.current) {
      progress.current = Math.min(1, progress.current + delta / 0.87);
      if (progress.current === 1) {
        completed.current = true;
        onInserted();
      }
    }
    const elapsed = progress.current * 0.87;
    const insertion = MathUtils.smoothstep(elapsed, 0, 0.45);
    const turn = MathUtils.smoothstep(elapsed, 0.45, 0.75);
    const snapBack = MathUtils.smoothstep(elapsed, 0.75, 0.87);
    group.current.position.z = MathUtils.lerp(insertionStartZ.current, 1.24, insertion);
    group.current.rotation.y = Math.PI * 1.5 + MathUtils.degToRad(12) * turn * (1 - snapBack);
  });

  useLayoutEffect(() => {
    edges.forEach((edge) => {
      applyKeyProfile(edge, generateKeyBittingPattern(password, edge.stations.length - 1));
    });
  }, [password, edges]);

  useEffect(() => () => geometries.forEach((geometry) => geometry.dispose()), [geometries]);
  useEffect(() => () => materials.forEach((material) => material.dispose()), [materials]);

  return (
    <group ref={group} visible={hasAppeared || focused || inserting} position={[0, -0.59, 3.4]} rotation={[Math.PI * 1.5, Math.PI * 1.5, 0]}>
      {/* The prepared blade runs along X; align it before aiming into the lock. */}
      <group rotation={[0, 0, Math.PI / 2]}>
        <primitive object={model} dispose={null} />
      </group>
    </group>
  );
}
