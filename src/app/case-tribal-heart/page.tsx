'use client';

import React, { useRef } from 'react';
import Splash from '../components/Splash'
import Image from 'next/image'
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float, Lightformer, MeshTransmissionMaterial, OrbitControls } from '@react-three/drei';
import Loader from '../components/Loader';
import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import * as THREE from 'three';

function Heart() {
    const gltf = useLoader(GLTFLoader, '/3d-models/heart.glb');
    const heart = gltf.scene.clone();
    return <primitive object={heart} scale={2} position={[0, -1, 0]} />;
}

function Piece() {
    const ref = useRef<THREE.Mesh>(null!);
    const gltf = useLoader(GLTFLoader, '/3d-models/piece.glb');
    useFrame(() => (ref.current.rotation.y += 0.01));
    const flippedPiece  = gltf.scene.clone();
    const flippedPiece2 = gltf.scene.clone();
    const flippedPiece3 = gltf.scene.clone();
    flippedPiece.rotation.y = Math.PI;
    flippedPiece2.rotation.y = Math.PI / 2;
    flippedPiece3.rotation.y = -(Math.PI / 2);
    return (
        <mesh ref={ref}>
            <primitive object={gltf.scene}    scale={2} position={[0, -3, 0]} />
            <primitive object={flippedPiece}  scale={2} position={[0, -3, 0]} />
            <primitive object={flippedPiece2} scale={2} position={[0, -3, 0]} />
            <primitive object={flippedPiece3} scale={2} position={[0, -3, 0]} />
        </mesh>
    );
}

function Torus(
    { rotation = [0, 0, 0], scale = 15 }: { rotation: [number, number, number], scale: number }
) {
    const ref = useRef<THREE.Mesh>(null!);
    useFrame(() => (ref.current.rotation.x += 0.01));
    useFrame(() => (ref.current.rotation.y += 0.01));
    useFrame(() => (ref.current.rotation.z += 0.01));

    return (
        <mesh ref={ref} scale={scale} rotation={rotation}>
        <torusGeometry args={[1, 0.05, 32, 32]} />
        <meshPhysicalMaterial
                color="white"
                metalness={1}
                roughness={0}
                envMapIntensity={1}
            />
        </mesh>
    );
}

export default function _3JS() {
  return (
    <Splash bgColor={'bg-black'}>
    <Canvas camera={{ position: [0, 2, 10] }}>
        <React.Suspense fallback={<Loader />}>
            <Environment 
                preset="studio"
                // files="/hdri/kloofendal_48d_partly_cloudy_puresky_4k.hdr"
                backgroundIntensity={1}
                background={false}
                backgroundRotation={[0, 0, 0]}
            >
            <directionalLight
                intensity={10}
                position={[2, 2, 5]}
            />
            <ambientLight intensity={10} />
            </Environment>
            <Heart />
            <Piece />
            {/* <Torus rotation={[0, 0, 0]} scale={30}/> */}
            {/* <Torus rotation={[Math.PI, 0, 0]} scale={15}/> */}
            <OrbitControls enableZoom={false}/>
        </React.Suspense>
    </Canvas>
    </Splash>
    );
}
