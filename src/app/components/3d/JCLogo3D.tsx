import { Environment } from "@react-three/drei";
import { useFrame, useLoader } from "@react-three/fiber";
import { useEffect, useLayoutEffect, useRef } from "react";
import { Group, Mesh, MeshPhysicalMaterial } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import Striplight from "./Striplight";

export default function JCLogo3D({
  onReady,
  onIntroComplete,
  playIntro = false,
}: {
  onReady?: () => void;
  onIntroComplete?: () => void;
  playIntro?: boolean;
}) {
  const ref = useRef<Group>(null!);
  const gltf = useLoader(GLTFLoader, "/3d-models/jc-logo-v2-bevel.gltf");

  useEffect(() => {
    onReady?.();
  }, []);

  const intro = useRef({ active: false, t: 0, fromY: 0, duration: 0.9 });
  const startedOnce = useRef(false);
  const completedOnce = useRef(false);

  useEffect(() => {
    if (playIntro && !startedOnce.current && ref.current) {
      startedOnce.current = true;
      intro.current.active = true;
      intro.current.t = 0;
      intro.current.fromY = ref.current.rotation.y;
    }
  }, [playIntro]);

  const easeInOutCubic = (t: number) =>
    t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

  useFrame((_, delta) => {
    if (!ref.current) return;

    if (intro.current.active) {
      const d = intro.current.duration;
      intro.current.t += delta;
      const p = Math.min(intro.current.t / d, 1);
      const e = easeInOutCubic(p);
      ref.current.rotation.y = intro.current.fromY + e * Math.PI * 2;

      if (p >= 1) {
        intro.current.active = false;
        if (!completedOnce.current) {
          completedOnce.current = true;
          onIntroComplete?.();
        }
      }
      return;
    }

    if (completedOnce.current) {
      ref.current.rotation.x += 0.01;
      ref.current.rotation.y += 0.01;
}
  });

  useLayoutEffect(() => {
    gltf.scene.traverse((o) => {
      if (o.type === "Mesh") {
        (o as Mesh).material = new MeshPhysicalMaterial({
          transmission: 0.5,
          roughness: 0,
          thickness: 1,
          ior: 1.45,
          reflectivity: 0.75,
          clearcoat: 1,
          clearcoatRoughness: 0,
          envMapIntensity: 2.5,
          iridescence: 1,
          iridescenceIOR: 1.7,
          iridescenceThicknessRange: [100, 800],
          color: "#00bfff",
          attenuationColor: "ffffff",
          attenuationDistance: 0.1,
          metalness: 0,
          toneMapped: false,
          specularColor: "#00bfff",
          specularIntensity: 10,
        });
      }
    });
  }, [gltf.scene]);


  return (
    <group ref={ref}>
      <Environment
        files="/3d-models/hdri/club2.jpg"
        backgroundIntensity={2}
        background={false}
      >
        <Striplight position={[10, 2, 0]} scale={[1, 3, 10]} />
        <Striplight position={[-10, 2, 0]} scale={[1, 3, 10]} />
        <directionalLight intensity={10} position={[2, 2, 5]} />
        <Striplight position={[10, 2, 0]} scale={[1, 3, -10]} />
        <Striplight position={[-10, 2, 0]} scale={[1, 3, -10]} />
        <ambientLight intensity={10} />
      </Environment>
      <primitive
        object={gltf.scene}
        scale={[10.5, 10.5, 10.5]}
        rotation={[0, 0, Math.PI / 4]}
      />
    </group>
  );
}
