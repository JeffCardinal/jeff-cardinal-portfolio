"use client";

import { Canvas } from "@react-three/fiber";
import {
  Bounds,
  Center,
  ContactShadows,
  Environment,
  OrbitControls,
  useAnimations,
  useGLTF,
} from "@react-three/drei";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

type BugModel = {
  label: string;
  path: string;
};

function BugMesh({ path }: { path: string }) {
  const gltf = useGLTF(path);
  const scene = useMemo(() => gltf.scene.clone(), [gltf.scene]);
  const group = useRef<THREE.Group>(null);
  const { actions } = useAnimations(gltf.animations, group);

  useMemo(() => {
    scene.traverse((child) => {
      if (!(child instanceof THREE.Mesh)) return;
      child.castShadow = true;
      child.receiveShadow = true;
    });
  }, [scene]);

  useEffect(() => {
    const activeActions = Object.values(actions).filter(
      (action): action is THREE.AnimationAction => Boolean(action),
    );

    activeActions.forEach((action) => {
      action.reset().fadeIn(0.2).play();
    });

    return () => {
      activeActions.forEach((action) => {
        action.fadeOut(0.2).stop();
      });
    };
  }, [actions]);

  return (
    <group ref={group}>
      <Center>
        <primitive object={scene} />
      </Center>
    </group>
  );
}

function Viewer({ path }: { path: string }) {
  return (
    <Canvas shadows camera={{ position: [0, 1.25, 6], fov: 36 }}>
      <color attach="background" args={["#f5ff76"]} />
      <ambientLight intensity={0.7} />
      <directionalLight
        castShadow
        intensity={3}
        position={[4, 6, 5]}
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <spotLight intensity={1.2} position={[-6, 8, 4]} angle={0.35} penumbra={1} />
      <Environment preset="sunset" />
      <Bounds fit clip observe margin={1.35}>
        <BugMesh path={path} />
      </Bounds>
      <ContactShadows
        position={[0, -1.8, 0]}
        opacity={0.45}
        scale={10}
        blur={2}
        far={4}
      />
      <OrbitControls autoRotate autoRotateSpeed={1.8} enablePan={false} />
    </Canvas>
  );
}

export default function BugGallery({ models }: { models: BugModel[] }) {
  if (models.length === 0) {
    return (
      <main className="min-h-screen bg-[radial-gradient(circle_at_top,_#f6ff7f_0%,_#ecff5e_18%,_#0f172a_70%)] px-6 pb-10 pt-28 text-slate-950">
        <div className="mx-auto max-w-4xl rounded-[2rem] border-[6px] border-slate-950 bg-white p-8 shadow-[12px_12px_0_#f472b6]">
          <p className="inline-flex rounded-full border-4 border-slate-950 bg-lime-300 px-4 pt-1 font-distancia text-xl uppercase">
            3D Bugs
          </p>
          <h1 className="mt-4 font-distancia text-5xl uppercase leading-none">
            No Models Found
          </h1>
          <p className="mt-4 text-lg font-medium text-slate-800">
            Add `.glb` or `.gltf` files to `public/3d-models/bugs` and this page
            will render them automatically.
          </p>
          <Link
            href="/"
            className="mt-6 inline-flex rounded-full border-4 border-white bg-slate-950 px-5 py-2 font-distancia text-2xl uppercase text-white transition hover:-translate-y-1 hover:bg-rose-500"
          >
            Back Home
          </Link>
        </div>
      </main>
    );
  }

  const [selectedIndex, setSelectedIndex] = useState(0);
  const selectedModel = models[selectedIndex];

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_#f6ff7f_0%,_#ecff5e_18%,_#0f172a_70%)] text-slate-950">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col px-6 pb-10 pt-28 lg:px-10">
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="mb-3 inline-flex w-fit rounded-full border-4 border-slate-950 bg-white px-4 pt-1 font-distancia text-xl uppercase shadow-[6px_6px_0_#0f172a]">
              3D Bugs
            </p>
            <h1 className="font-distancia text-5xl uppercase leading-none sm:text-7xl">
              Model Viewer
            </h1>
            <p className="mt-4 max-w-xl text-base font-medium text-slate-800 sm:text-lg">
              Spin through your bug models and swap between files in
              `public/3d-models/bugs`.
            </p>
          </div>
          <Link
            href="/"
            className="inline-flex w-fit rounded-full border-4 border-white bg-slate-950 px-5 py-2 font-distancia text-2xl uppercase text-white transition hover:-translate-y-1 hover:bg-rose-500"
          >
            Back Home
          </Link>
        </div>

        <div className="grid flex-1 gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
          <section className="relative overflow-hidden rounded-[2rem] border-[6px] border-slate-950 bg-white shadow-[12px_12px_0_#bef264]">
            <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between border-b-4 border-slate-950 bg-white/85 px-5 py-3 backdrop-blur">
              <div>
                <p className="font-distancia text-2xl uppercase leading-none">
                  {selectedModel.label}
                </p>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-600">
                  {selectedModel.path}
                </p>
              </div>
              <p className="rounded-full border-2 border-slate-950 bg-lime-300 px-3 py-1 text-xs font-black uppercase tracking-[0.2em]">
                Drag to orbit
              </p>
            </div>
            <div className="h-[65dvh] min-h-[460px] w-full">
              <Viewer key={selectedModel.path} path={selectedModel.path} />
            </div>
          </section>

          <aside className="flex flex-col rounded-[2rem] border-[6px] border-slate-950 bg-slate-950 p-5 text-white shadow-[12px_12px_0_#f472b6]">
            <div className="mb-5">
              <p className="font-distancia text-3xl uppercase">Bugs</p>
              <p className="mt-2 text-sm text-slate-300">
                Add more `.glb` or `.gltf` files to the folder and they can be wired
                into this list.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              {models.map((model, index) => {
                const selected = index === selectedIndex;

                return (
                  <button
                    key={model.path}
                    type="button"
                    onClick={() => setSelectedIndex(index)}
                    className={`rounded-[1.5rem] border-4 px-4 py-4 text-left transition ${
                      selected
                        ? "border-lime-300 bg-lime-300 text-slate-950"
                        : "border-white/20 bg-white/5 hover:border-cyan-300 hover:bg-cyan-300 hover:text-slate-950"
                    }`}
                  >
                    <p className="font-distancia text-2xl uppercase leading-none">
                      {model.label}
                    </p>
                    <p className="mt-2 break-all text-xs font-semibold uppercase tracking-[0.18em]">
                      {model.path}
                    </p>
                  </button>
                );
              })}
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
