'use client';

import React, { useEffect, useState } from 'react';
import { Canvas, Euler, ExtendedColors, Layers, Matrix4, NodeProps, NonFunctionKeys, Overwrite, Quaternion, useFrame, useThree, Vector3 } from '@react-three/fiber';
import { 
    Center,
    Text3D,
    Environment,
    Float,
    Lightformer,
} from '@react-three/drei';
import Blob from './Blob'; // Import the Blob component
import * as THREE from 'three';
import NoiseGradientShaderMaterial from './NoiseGradientShaderMaterial';
import { EventHandlers } from '@react-three/fiber/dist/declarations/src/core/events';
import RotatingText from './RotatingText';
import HelloText from './HelloText';
import Loader from './Loader';

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
          </Text3D>
        </Center>
      </group>
    </>
  );
}

function Striplight(props: React.JSX.IntrinsicAttributes & Omit<ExtendedColors<Overwrite<Partial<THREE.Mesh<THREE.BufferGeometry<THREE.NormalBufferAttributes>, THREE.Material | THREE.Material[], THREE.Object3DEventMap>>, NodeProps<THREE.Mesh<THREE.BufferGeometry<THREE.NormalBufferAttributes>, THREE.Material | THREE.Material[], THREE.Object3DEventMap>, typeof THREE.Mesh>>>, NonFunctionKeys<{ position?: Vector3; up?: Vector3; scale?: Vector3; rotation?: Euler; matrix?: Matrix4; quaternion?: Quaternion; layers?: Layers; dispose?: (() => void) | null; }>> & { position?: Vector3; up?: Vector3; scale?: Vector3; rotation?: Euler; matrix?: Matrix4; quaternion?: Quaternion; layers?: Layers; dispose?: (() => void) | null; } & EventHandlers) {
    return (
        <mesh {...props}>
            <boxGeometry />
            <meshBasicMaterial color="white" />
        </mesh>
    )
}

export default function _3JS() {

    const [isMobile, setIsMobile] = useState(false);

    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 800);
    };
  
    useEffect(() => {
      checkScreenSize();
      window.addEventListener("resize", checkScreenSize);
      return () => window.removeEventListener("resize", checkScreenSize);
    }, []);

    //this config is just for the 3d text, so it may be moved later to something that makes more sense
    const { ...config } = {
    backside: true,
    backsideThickness: 1,
    transmission: 2,
    chromaticAberration: 50,
    };

    return (
    <>
        <Canvas camera={{ position: [0, 0, 10] }}>
            <React.Suspense fallback={<Loader />}>
                {!isMobile && (
                    <group>
                        <Blob scale={1} position={[-5, 5, -3]} />
                        <Blob scale={1.2} position={[-5, 1.5, 5]} />
                        <Blob scale={1.3} position={[5, 3, 1]} />
                        <Blob scale={1.5} position={[-5, -2, 4]} />
                        <Blob scale={1.1} position={[8, 1, 2]} />
                    </group>
                )}
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
                    position={[2, 2, 5]}
                />
                <ambientLight intensity={10} />
                <Striplight position={[10, 2, 0]} scale={[1, 3, -10]} />
                <Striplight position={[-10, 2, 0]} scale={[1, 3, -10]} />
                <group rotation={[0, 0, 0]}>
                    <Lightformer intensity={1} rotation-x={ Math.PI / 2} position={[0, 5, 9]}   scale={[10, 10, 1]} />
                </group>
                </Environment>
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
