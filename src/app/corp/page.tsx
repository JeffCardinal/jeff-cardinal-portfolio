"use client";

import { Suspense, useLayoutEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Box3, Group, MathUtils, Vector3 } from "three";
import { Bounds, Environment, Lightformer, OrbitControls, useGLTF } from "@react-three/drei";
import Loader from "../components/Loader";
import LoaderRefractionSource from "../components/LoaderRefractionSource";
import MatrixRain from "./MatrixRain";
import styles from "./password.module.css";
import Key from "./Key";

function Padlock({ unlocked, password, focused, inserting, onInserted, attempt, failedAttempt }: {
  unlocked: boolean;
  password: string;
  focused: boolean;
  inserting: boolean;
  onInserted: () => void;
  attempt: number;
  failedAttempt: number;
}) {
  const { scene } = useGLTF("/3d-models/lock.glb");
  const model = useMemo(() => scene.clone(true), [scene]);
  const modelCenter = useMemo(() => new Box3().setFromObject(model).getCenter(new Vector3()), [model]);
  const group = useRef<Group>(null);
  const shakeElapsed = useRef(0.6);
  useLayoutEffect(() => {
    shakeElapsed.current = failedAttempt > 0 ? 0 : 0.6;
  }, [failedAttempt]);
  const backZ = useMemo(() => {
    const bounds = new Box3().setFromObject(model);
    return bounds.min.z - bounds.getCenter(new Vector3()).z;
  }, [model]);
  const mechanism = useMemo(() => {
    const object = model.getObjectByName("LockMech");
    if (!object) return null;
    return {
      object,
      closedY: object.position.y,
      travel: new Box3().setFromObject(object).getSize(new Vector3()).y * 0.24,
    };
  }, [model]);

  useFrame((_, delta) => {
    if (group.current) {
      shakeElapsed.current = Math.min(0.6, shakeElapsed.current + delta);
      const shake = Math.sin(shakeElapsed.current * Math.PI * 20)
        * (1 - shakeElapsed.current / 0.6);
      group.current.rotation.z = shake * 0.035;
    }
    if (!mechanism) return;
    mechanism.object.position.y = MathUtils.damp(
      mechanism.object.position.y,
      mechanism.closedY + (unlocked ? mechanism.travel : 0),
      8,
      delta,
    );
  });

  return (
    <group rotation={[0.08, -0.3, 0]}>
      <group ref={group}>
        <Bounds fit clip observe margin={1.8}>
          <primitive object={model} dispose={null} />
        </Bounds>
        <group position={modelCenter}>
          <Key password={password} focused={focused} inserting={inserting} onInserted={onInserted} backZ={backZ} attempt={attempt} />
        </group>
      </group>
    </group>
  );
}

export default function Page() {
  const [unlocked, setUnlocked] = useState(false);
  const [password, setPassword] = useState("");
  const [focused, setFocused] = useState(false);
  const [inserting, setInserting] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const [result, setResult] = useState<"success" | "failure" | "error" | null>(null);
  const [accessError, setAccessError] = useState("");
  const busy = inserting && result === null;

  return (
    <main className="relative h-[100svh] min-h-[400px] bg-[#10151c]">
      <MatrixRain />
      <h1 className="pointer-events-none absolute inset-x-0 top-24 z-10 text-center font-distancia text-3xl text-white">
        AUTH CHECK
      </h1>
      <Canvas camera={{ position: [-5.6282, 0.52607, 5.56997], fov: 40 }} dpr={[1, 1.5]} gl={{ localClippingEnabled: true }}>
        <LoaderRefractionSource />
        <ambientLight intensity={0.6} />
        <directionalLight position={[3, 4, 5]} intensity={3} />
        <Suspense fallback={null}>
          <Environment
            preset="night"
            backgroundIntensity={1}
            background={false}
            backgroundRotation={[0, 0, 0]}
          >
            <Lightformer color={[0,0,255]} position={[-4, 10, 1]} rotation={[0, Math.PI / 2, 0]} scale={[1000, 10, 1]} intensity={0.1} />
            <Lightformer position={[4, 0, 1]} rotation={[0, -Math.PI / 2, 0]} scale={[33, 10, 1]} intensity={0.25} />
          </Environment>
          <Padlock
            unlocked={unlocked} password={password} focused={focused} inserting={inserting}
            attempt={attempt} failedAttempt={result === "failure" ? attempt : 0}
            onInserted={async () => {
              try {
                const response = await fetch("/corp/auth", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ password }),
                  cache: "no-store",
                  signal: AbortSignal.timeout(15000),
                });
                const data = await response.json();
                const success = response.ok && data.success === true;
                setUnlocked(success);
                setResult(success ? "success" : response.status === 401 ? "failure" : "error");
                if (!success && response.status !== 401) setAccessError(data.message ?? "Unable to verify password. Please try again.");
              } catch {
                setResult("error");
                setAccessError("Unable to connect. Please try again.");
              }
            }}
          />
        </Suspense>
        <OrbitControls makeDefault enablePan={false} enableZoom={false} />
      </Canvas>
      <form
        className="absolute inset-x-0 top-[72%] z-10 mx-auto flex w-full max-w-lg gap-3 px-6 md:top-[88%]"
        onBlur={(event) => {
          // Moving from the textbox to Submit must not hide the key.
          if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false);
        }}
        onSubmit={(event) => {
          event.preventDefault();
          if (busy) return;
          setUnlocked(false);
          setResult(null);
          setAccessError("");
          setAttempt((value) => value + 1);
          setInserting(true);
        }}
      >
        <label htmlFor="corp-password" className="sr-only">Password</label>
        <input
          id="corp-password"
          name="password"
          type="password"
          required
          maxLength={256}
          value={password}
          onFocus={() => {
            setFocused(true);
          }}
          readOnly={busy}
          onChange={(event) => {
            setPassword(event.target.value);
            setInserting(false);
            setUnlocked(false);
            setResult(null);
            setAccessError("");
          }}
          autoComplete="current-password"
          spellCheck={false}
          placeholder="Password"
          className={`${styles.password} h-12 min-w-0 flex-1 rounded-lg border border-purple-400/25 bg-[#15121e] px-4 text-base text-white shadow-[0_0_18px_rgba(168,85,247,0.12)] outline-none transition-all duration-300 placeholder:text-purple-200/40 hover:border-purple-400/50 hover:shadow-[0_0_22px_rgba(168,85,247,0.2)] focus:border-purple-400/70 focus:ring-1 focus:ring-purple-400/40 focus:shadow-[0_0_24px_rgba(168,85,247,0.25)]`}
        />
        <button
          type="submit"
          disabled={busy}
          className="h-12 shrink-0 rounded-lg border border-purple-400/40 bg-purple-500/15 px-5 text-sm font-semibold text-purple-100 shadow-[0_0_18px_rgba(168,85,247,0.12)] transition-all duration-300 hover:border-purple-300/70 hover:bg-purple-500/25 hover:shadow-[0_0_22px_rgba(168,85,247,0.25)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
        >
          Submit
        </button>
        <span role="status" className={result === "error" ? "absolute left-6 right-6 top-full mt-2 text-xs text-purple-100" : "sr-only"}>{result === "success" ? "Lock opened." : result === "failure" ? "Incorrect password. Try again." : result === "error" ? accessError : ""}</span>
      </form>
      <Loader />
    </main>
  );
}
