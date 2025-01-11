'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Canvas, Euler, ExtendedColors, Layers, Matrix4, NodeProps, NonFunctionKeys, Overwrite, Quaternion, useFrame, useThree, Vector3 } from '@react-three/fiber';
import { 
    Center,
    Text3D,
    Environment,
    OrbitControls,
    MeshTransmissionMaterial,
    Float,
    Lightformer,
    useProgress,
    Html,
    Stars,
    MeshWobbleMaterial,
    MeshRefractionMaterial,
    // Html,
} from '@react-three/drei';
import Blob from './Blob'; // Import the Blob component
import { LayerMaterial, Depth, Noise, Color } from 'lamina';
import * as THREE from 'three';
import NoiseGradientShaderMaterial from './NoiseGradientShaderMaterial';
import { EventHandlers } from '@react-three/fiber/dist/declarations/src/core/events';
import RotatingText from './RotatingText';
import HelloText from './HelloText';

function Torus() {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame(() => (ref.current.rotation.x += 0.01));
  useFrame(() => (ref.current.rotation.y += 0.005));
  useFrame(() => (ref.current.rotation.z += 0.01));

  return (
    <mesh ref={ref}>
      <torusGeometry args={[1, 0.1, 32, 32]} />
      <meshBasicMaterial attach="material" args={[{ color: '#FFF' }]} />
    </mesh>
  );
}

function Loader() {
    const { progress } = useProgress();
  
    return (
      <Html center>
        <div
          style={{
            minHeight: "100vh",
            minWidth: "100vw",
            zIndex: 100,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(0, 0, 0)",
            color: "#FFFFFF",
          }}
        >
          <h1>Initializing start up sequence...</h1>
          <p>{Math.floor(progress)}%</p>
        </div>
      </Html>
    );
  }
  

function ThreeDText({
  config,
  font = "/fonts/Distancia-800-ExtraBold.json",
  text,
  size = 1,
  position = [0, 0, 0],
  ...props
}: {
  config: any;
  font?: string;
  text?: string;
  size?: number;
  position?: [number, number, number];
}) {

  const { viewport } = useThree();
  const scaleFactor = Math.min(viewport.width, viewport.height) * 0.03 * size;
  const adjustedPosition: [number, number, number] = [position[0], (position[1]+3)*scaleFactor-1, position[2]];

  return (
    <>
      <group>
        <Center scale={[scaleFactor, scaleFactor, scaleFactor]} position={adjustedPosition} {...props}>
          <Text3D
            font={font}
            scale={3.5}
            letterSpacing={0}
            height={0.3/size}
            curveSegments={10}
            bevelEnabled
            bevelSize={0.05}
            bevelSegments={1}
            bevelThickness={0.05/size}
          >
            {text}
            <meshStandardMaterial color="white" roughness={0.1} metalness={1} />
            {/* <LayerMaterial side={THREE.BackSide}>
                <Color color="blue" alpha={1} mode="normal" />
                <Depth colorA="#ffffff" colorB="#00BFFF" alpha={0.5} mode="normal" near={0} far={300} origin={[100, 100, 100]} />
                <Noise mapping="local" type="cell" scale={0.5} mode="softlight" />
            </LayerMaterial> */}
            {/* <meshPhysicalMaterial
                color="white"
                metalness={1}
                roughness={0}
                // reflectivity={1}
                clearcoat={1}
                clearcoatRoughness={0}
                envMapIntensity={1}
            /> */}
            {/* <MeshTransmissionMaterial {...config} /> */}
          </Text3D>
        </Center>
      </group>
    </>
  );
}

// function RotatingText() {
//     const phrases = ["software engineer", "multimedia designer", "music producer"];
//     const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
//     const [opacity, setOpacity] = useState(1);
  
//     useEffect(() => {
//       const interval = setInterval(() => {
//         setOpacity(0);
//         setTimeout(() => {
//           setCurrentPhraseIndex((prevIndex) => (prevIndex + 1) % phrases.length);
//           setOpacity(1);
//         }, 500);
//       }, 2500);
  
//       return () => clearInterval(interval);
//     }, []);
  
//     return (
//       <div
//         style={{
//           position: "absolute",
//           top: "65%",
//           transform: "translate(0%, -100%)",
//           fontSize: "48px",
//           fontWeight: "bold",
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//         }}
//       >
//         <span style={{ color: "#FFFFFF", whiteSpace:"pre" }}>I'm a </span>
//         <span
//           style={{
//             color: "magenta",
//             opacity: opacity,
//             transition: "opacity 0.5s ease-in-out",
//           }}
//         >
//           {phrases[currentPhraseIndex]}.
//         </span>
//       </div>
//     );
// }
  

function Striplight(props: React.JSX.IntrinsicAttributes & Omit<ExtendedColors<Overwrite<Partial<THREE.Mesh<THREE.BufferGeometry<THREE.NormalBufferAttributes>, THREE.Material | THREE.Material[], THREE.Object3DEventMap>>, NodeProps<THREE.Mesh<THREE.BufferGeometry<THREE.NormalBufferAttributes>, THREE.Material | THREE.Material[], THREE.Object3DEventMap>, typeof THREE.Mesh>>>, NonFunctionKeys<{ position?: Vector3; up?: Vector3; scale?: Vector3; rotation?: Euler; matrix?: Matrix4; quaternion?: Quaternion; layers?: Layers; dispose?: (() => void) | null; }>> & { position?: Vector3; up?: Vector3; scale?: Vector3; rotation?: Euler; matrix?: Matrix4; quaternion?: Quaternion; layers?: Layers; dispose?: (() => void) | null; } & EventHandlers) {
    return (
        <mesh {...props}>
            <boxGeometry />
            <meshBasicMaterial color="white" />
        </mesh>
    )
}

function FullScreenPlane() {
  const { size } = useThree(); // Get screen dimensions
  const aspect = size.width / size.height;

  return (
    <mesh scale={[aspect * 10, 10, 1]} position={[0, 0, -5]}>
      <planeGeometry args={[1, 1, 32, 32]} />
      <NoiseGradientShaderMaterial />
    </mesh>
  );
}

export default function _3JS() {
    //this config is just for the 3d text, so it may be moved later to something that makes more sense
  const { ...config } = {
    backside: true,
    backsideThickness: 1,
    transmission: 2,
    chromaticAberration: 50,
    // ior: 10,
    // color: '#000000',
  };

  return (
    <>
    <Canvas camera={{ position: [0, 0, 10] }}>
        <React.Suspense fallback={<Loader />}>
            <Blob position={[-5, 5, -3]} />
            <Blob position={[-5, 1.5, 5]} />
            <Blob position={[5, 3, 1]} />
            <Blob position={[-5, -2, 4]} />
            <Blob position={[8, 1, 2]} />
            <Float speed={3} rotationIntensity={0.5}>
                <ThreeDText config={config} position={[-0.75, 0.6, 0]} text="Jeff" />
                <ThreeDText config={config} position={[0.75, -0.5, 0]} size={0.45} text="Cardinal" />
            </Float>
            <Environment 
                // preset="studio"
                files="/hdri/kloofendal_48d_partly_cloudy_puresky_4k.hdr"
                // blur={}
                backgroundIntensity={5}
                background={false}
                backgroundRotation={[0, 0, 0]}
            >
            <Striplight position={[10, 2, 0]} scale={[1, 3, 10]} />
            <Striplight position={[-10, 2, 0]} scale={[1, 3, 10]} />
            <directionalLight
                intensity={10}
                position={[2, 2, 5]} // Front-light position
            />
            <ambientLight intensity={10} />

            <Striplight position={[10, 2, 0]} scale={[1, 3, -10]} />
            <Striplight position={[-10, 2, 0]} scale={[1, 3, -10]} />
            <group rotation={[0, 0, 0]}>
                <Lightformer intensity={1} rotation-x={ Math.PI / 2} position={[0, 5, 9]}   scale={[10, 10, 1]} />
                {/* <Lightformer intensity={2}  rotation-y={ Math.PI / 2} position={[-5, 1, 1]}  scale={[10, 2, 1]}  />
                <Lightformer intensity={2}  rotation-y={ Math.PI / 2} position={[-5, -1, 1]} scale={[10, 2, 1]}  />
                <Lightformer intensity={2}  rotation-y={-Math.PI / 2} position={[10, 1, 0]}   scale={[20, 2, 1]}  /> */}
                {/* <Lightformer type="ring" intensity={2} rotation-y={Math.PI / 2} position={[-0.1, -1, 5]} scale={10} /> */}
            </group>
            </Environment>
            {/* <OrbitControls enableZoom={false} /> */}
            <mesh position={[0, 0, -5]}>
                <planeGeometry args={[45, 25]} />
                <NoiseGradientShaderMaterial />
            </mesh>
        </React.Suspense>
    </Canvas>
    <HelloText/>
    <RotatingText/>
    </>
  );
}
