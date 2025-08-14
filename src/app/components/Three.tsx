'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, useLoader, useThree, Vector3 } from '@react-three/fiber';
import { 
    Center,
    Text3D,
    Environment,
    Float,
    Lightformer,
    useProgress,
    Preload,
    Stats,
} from '@react-three/drei';
import Blob from './Blob';
import * as THREE from 'three';
import NoiseGradientShaderMaterial from './shaders/NoiseGradientShaderMaterial';

import RotatingText from './RotatingText';
import HelloText from './HelloText';
import Loader from './Loader';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { Displace } from 'lamina'

function ThreeDText({
  font = "/fonts/Distancia-800-ExtraBold.json",
  text,
  size = 1,
  position = [0, 0, 0],
}: {
  font?: string;
  text?: string;
  size?: number;
  position?: [number, number, number];
}) {
  return (
    <>
      <group>
        <Center position={position}>
          <Text3D
            font={font}
            scale={2*size}
            letterSpacing={0}
            height={0.3/size}
            curveSegments={10}
            bevelEnabled
            bevelSize={0.05}
            bevelSegments={1}
            bevelThickness={0.05/size}
            position={position}
          >
            {text}
            <meshStandardMaterial color="white" roughness={0.125} metalness={1} />
          </Text3D>
        </Center>
      </group>
    </>
  );
}

function JeffCardinalText() {
  const { viewport } = useThree();
  const scaleFactor = Math.min(viewport.width, viewport.height) * 0.065;

  return (
    <group scale={scaleFactor}>
      <Float speed={3} rotationIntensity={0.5}>
        <ThreeDText position={[-0.85, 0.8, 0]} text="Jeff" />
        <ThreeDText position={[0.75, -0.8, 0]} size={0.45} text="Cardinal" />
      </Float>
    </group>
  );
}

function Striplight(props: any) {
  return (
    <mesh {...props}>
      <boxGeometry />
      <meshBasicMaterial color="white" />
    </mesh>
  );
}

function Smiley() {
  const { camera, size } = useThree();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [smileyPosition, setSmileyPosition] = useState({ x: 0, y: 0 });

  const gltf = useLoader(GLTFLoader, "/3d-models/smiley.glb");
  const smiley = gltf.scene.clone();

  const rand = useMemo(() => Math.random(), []);
  const displaceRef = useRef(null);
  const ref = useRef<THREE.Mesh>(null);

  useEffect(() => {
    const handleMouseMove = (event: { clientX: number; clientY: number; }) => {
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = -(event.clientY / window.innerHeight) * 2 + 1;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);

    const updatePosition = () => {
      const x = (size.width / 2) / window.innerWidth * 2 - 1;
      const y = -(size.height / 2) / window.innerHeight * 2 + 1;
      setSmileyPosition({ x, y });
    };

    updatePosition();

    window.addEventListener('resize', updatePosition);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', updatePosition);
    };
  }, [size]);

  useFrame(({ clock }) => {
    if (!ref.current) return;

    const mouseVector = new THREE.Vector3(mousePosition.x, mousePosition.y, 0.5);
    mouseVector.unproject(camera);

    mouseVector.sub(camera.position).normalize().multiplyScalar(5);
    mouseVector.add(camera.position);

    ref.current.lookAt(mouseVector);

    const worldPosition = new THREE.Vector3(smileyPosition.x, smileyPosition.y, 0);
    worldPosition.unproject(camera);
    ref.current.position.set(worldPosition.x, worldPosition.y, -2);
  });

  return (
    <mesh position={[7, -3, 0]}>
      <primitive ref={ref} object={smiley} scale={[15, 15, 15]} position={[0, 0, -2]} />
      <meshStandardMaterial
        metalness={1} 
        roughness={0.2}
        color="#FFFFFF"
      />
      <Displace ref={displaceRef} strength={0} scale={5} offset={[0, 0, 0]} />
    </mesh>
  );
}

export default function Three() {
    const { progress } = useProgress();
    const isLoaded = progress === 100;
    const [isMobile, setIsMobile] = useState(false);

    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 800);
    };
  
    useEffect(() => {
      checkScreenSize();
      window.addEventListener("resize", checkScreenSize);
      return () => window.removeEventListener("resize", checkScreenSize);
    }, []);

    return (
    <>
      <Canvas camera={{ position: [0, 0, 10] }} id="Canvas">
      {/* <Stats/> */}
        <React.Suspense fallback={<Loader />}>
            {!isMobile && (
              <group>
                <Blob scale={1} position={[-5, 5, -3]} />
                <Blob scale={1} position={[-4, 1.5, 6]} />
                <Blob scale={1} position={[4, 2, 4]} />
                <Blob scale={1} position={[-2, -0.6, 7.5]} />
                <Blob scale={1} position={[8, 1, 2]} />
              </group>
            )}
            {isLoaded && <JeffCardinalText />}
            {/* <Smiley/> */}
            
            <Environment 
              preset="warehouse"
              backgroundIntensity={5}
              background={false}
              backgroundRotation={[0, 0, 0]}
            >
              <Striplight position={[10, 2, 0]} scale={[1, 3, 10]} />
              <Striplight position={[-10, 2, 0]} scale={[1, 3, 10]} />
              <directionalLight intensity={10} position={[2, 2, 5]} />
              <Striplight position={[10, 2, 0]} scale={[1, 3, -10]} />
              <Striplight position={[-10, 2, 0]} scale={[1, 3, -10]} />
              <ambientLight intensity={10} />
              <Lightformer intensity={1} rotation-x={ Math.PI / 2} position={[0, 5, 9]} scale={[10, 10, 1]} />
            </Environment>
            {/* TODO: Maybe let's consider moving this to a scene background instead of rendering a mesh */}
            <mesh scale={[50, 50, 1]} renderOrder={-1}>
              <planeGeometry args={[1, 1]} />
              <NoiseGradientShaderMaterial />
            </mesh>
        </React.Suspense>
        <Preload all />
      </Canvas>
      <HelloText/>
      <RotatingText/>
    </>
  );
}
