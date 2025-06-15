'use client';

import React, { useRef, useEffect, useMemo, useState } from 'react';
import { Canvas, useFrame, useThree, extend } from '@react-three/fiber';
import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import * as THREE from 'three';
import PlayBlissButton from './PlayBlissButton';
import NoiseGradientShaderMaterial from '../components/shaders/NoiseGradientShaderMaterial';
import { PlaybackProvider, usePlayback } from './PlaybackContext';    
import { BurnShaderMaterial } from './BurnShaderMaterial';
import { Environment } from '@react-three/drei';
import Loader from '../components/Loader';
extend({ BurnShaderMaterial });

const bpm = 155;
const secondsPerBeat = 60 / bpm;

function Smiley({ gyroBaseline }: { gyroBaseline: { gamma: number; beta: number } | null }) {
    const gltf = useLoader(GLTFLoader, '/3d-models/smile-smooth.glb');
    const meshRef = useRef<THREE.Mesh>(null);
    const materialRef = useRef<THREE.ShaderMaterial>(null);
    const dissolveMeshRef = useRef<THREE.Mesh>(null);
    const originalPositions = useRef<Float32Array | null>(null);
    const { camera } = useThree();
    const { audioRef } = usePlayback();

    const groupRef = useRef<THREE.Group>(null);
    const { size } = useThree();
    const mouse = useRef({ x: 0, y: 0 });

    useFrame(() => {
        const t = audioRef.current?.currentTime || 0;
        if (meshRef.current) {
            let beatPhase = (t % secondsPerBeat) / secondsPerBeat;
            meshRef.current.scale.setScalar(1 + 0.025 * Math.sin(beatPhase * Math.PI * 2));
        }
    });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouse.current.x = (e.clientX / size.width) * 2 - 1;
            mouse.current.y = -(e.clientY / size.height) * 2 + 1;
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [size.width, size.height]);

    useEffect(() => {
        if (!gyroBaseline || !isMobileDevice()) return;
        const handleOrientation = (e: DeviceOrientationEvent) => {
            if (e.gamma !== null && e.beta !== null && gyroBaseline) {
                const sensitivity = 3.0;
                const gamma = THREE.MathUtils.clamp((e.gamma - gyroBaseline.gamma) * sensitivity, -90, 90);
                const beta = THREE.MathUtils.clamp((e.beta - gyroBaseline.beta) * sensitivity, -90, 90);
                mouse.current.x = gamma / 90;
                mouse.current.y = beta / 90;
            }
        };
        window.addEventListener('deviceorientation', handleOrientation, true);
        return () => window.removeEventListener('deviceorientation', handleOrientation);
    }, [gyroBaseline]);

    useFrame(() => {
        if (!groupRef.current) return;
        groupRef.current.rotation.y = mouse.current.x * 0.4;
        groupRef.current.rotation.x = -mouse.current.y * 0.3;
    });

    useEffect(() => {
        if (meshRef.current) {
            const positionAttr = meshRef.current.geometry.attributes.position;
            originalPositions.current = new Float32Array(positionAttr.array);
        }
    }, []);

    useFrame(({ clock }) => {
        if (!meshRef.current || !originalPositions.current) return;

        meshRef.current.quaternion.copy(camera.quaternion);
        if (dissolveMeshRef.current) {
            dissolveMeshRef.current.quaternion.copy(camera.quaternion);
        }

        const posAttr = meshRef.current.geometry.attributes.position;
        const time = clock.getElapsedTime();
        const mouseX = mouse.current.x;
        const mouseY = mouse.current.y;

        for (let i = 0; i < posAttr.count; i++) {
            const x = originalPositions.current[i * 3];
            const y = originalPositions.current[i * 3 + 1];
            const z = originalPositions.current[i * 3 + 2];
            let wiggleX = x;

            const xFalloff = Math.min(Math.max(Math.abs(x) / 1.0, 0), 1);
            const yFalloff = 1 - Math.min(Math.max(Math.abs(mouseY) / 1.0, 0), 1);

            let strength = 0;

            if (x > 0 && mouseX > 0) {
                strength = mouseX * xFalloff * yFalloff;
            } else if (x < 0 && mouseX < 0) {
                strength = -mouseX * xFalloff * yFalloff;
            }

            const wiggle = Math.sin(time * 3 + y * 30) * 0.2 * strength;
            wiggleX += wiggle;

            posAttr.setXYZ(i, wiggleX, y, z);
        }

        posAttr.needsUpdate = true;

        if (materialRef.current) {
            materialRef.current.uniforms.uTime.value = time;
            materialRef.current.uniforms.uProgress.value = Math.sin(time * 0.5) * 0.5 + 0.5;
        }
    });

    const geometry = useMemo(() => {
        let foundGeometry: THREE.BufferGeometry | null = null;
        gltf.scene.traverse((child) => {
            if ((child as THREE.Mesh).isMesh && (child as THREE.Mesh).geometry) {
                foundGeometry = (child as THREE.Mesh).geometry.clone();
            }
        });
        return foundGeometry ?? new THREE.BufferGeometry();
    }, [gltf]);

    return (
        <group ref={groupRef} scale={[15, 15, 15]} position={[0, -1, 0]}>
            <mesh geometry={geometry} ref={meshRef} renderOrder={1} castShadow={false} receiveShadow={false}>
                <meshPhysicalMaterial
                    transmission={1}
                    roughness={0.15}
                    thickness={1}
                    ior={1.45}
                    reflectivity={0.5}
                    attenuationDistance={1}
                    metalness={0}
                    toneMapped={false}
                    specularColor={'#ffffff'}
                    specularIntensity={2}
                    attenuationColor="white"
                />
            </mesh>
        </group>
    );
}

function Comp({ gyroBaseline }: { gyroBaseline: { gamma: number; beta: number } | null }) {
    const { viewport } = useThree();
    const scaleFactor = Math.min(viewport.width, viewport.height) * 0.065;
    return (
        <group scale={scaleFactor} position={[0, -1, 0]}>
            <Smiley gyroBaseline={gyroBaseline} />
        </group>
    );
}
function StaticBackground() {
    const tex = useLoader(THREE.TextureLoader, '/bliss/bliss-bg-optimized.jpg');
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
    const meshRef = useRef<THREE.Mesh>(null);
    const { camera } = useThree();
    const { audioRef } = usePlayback();

    const targetBeat = 64;
    const lastBeat = useRef(-1);
    
    useFrame(() => {
        if (meshRef.current) {
            meshRef.current.quaternion.copy(camera.quaternion);
            
            const material = meshRef.current.material as THREE.MeshBasicMaterial;

            const time = audioRef.current?.currentTime || 0;
            const currentBeat = Math.floor(time / secondsPerBeat);
            const looped = currentBeat < lastBeat.current;
          
            if (looped) {
                lastBeat.current = 0;
                material.transparent = false;
                material.opacity = 1;
            }

            if (currentBeat !== lastBeat.current) {
                lastBeat.current = currentBeat;

                if (currentBeat === targetBeat && meshRef.current) {
                    material.transparent = true;
                    material.opacity = 0;
                }
            }
        }
    });
    
    return (
        <mesh ref={meshRef} position={[0, -25, -35]} castShadow={false} receiveShadow={false}>
            <planeGeometry args={[200, 100]} />
            <meshBasicMaterial
                map={tex}
                side={THREE.DoubleSide}
                depthTest={true}
                toneMapped={false}
                transparent={false}
                opacity={1}
            />
        </mesh>
    );
}

function BurnEffectPlane() {
    const BPM = 155;
    const texture = useLoader(THREE.TextureLoader, '/bliss/bliss-bg-optimized.jpg');
    const shaderRef = useRef<any>();

    const { audioRef } = usePlayback();
    const { camera } = useThree();

    const startBeat = 60;
    const endBeat = 64;
    const reverseStart = 92;
    const reverseEnd = 96;

    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
      if (meshRef.current) {
        meshRef.current.quaternion.copy(camera.quaternion);
      }
      if (shaderRef.current) {
        const time = state.clock.elapsedTime;
        const beat = (audioRef.current?.currentTime ?? 0) * (BPM / 60);
        shaderRef.current.uTime = time;
        let progress;
        if (beat < startBeat) {
            progress = 0;
        } else if (beat >= startBeat && beat < endBeat) {
            progress = (beat - startBeat) / (endBeat - startBeat);
        } else if (beat >= endBeat && beat < reverseStart) {
            progress = 1;
        } else if (beat >= reverseStart && beat < reverseEnd) {
            progress = 1 - (beat - reverseStart) / (reverseEnd - reverseStart); // 1 → 0
        } else if (beat >= reverseEnd) {
            progress = 0;
        }
        shaderRef.current.uProgress = progress;
      }
    });
  
  return (
    <mesh ref={meshRef} position={[0, -25, -35]} castShadow={false} receiveShadow={false}>
        <planeGeometry args={[200, 100]} />
        <burnShaderMaterial
        ref={shaderRef}
        uTime={0}
        uProgress={0}
        uTexture={texture}
        side={THREE.DoubleSide}
        depthTest={true}
        transparent={false}
        opacity={1}
        toneMapped={true}
        />
    </mesh>
  );
}

const requestGyroPermission = async (setBaseline: Function) => {
    if (
        typeof DeviceOrientationEvent !== 'undefined' &&
        typeof (DeviceOrientationEvent as any).requestPermission === 'function'
    ) {
        try {
            const response = await (DeviceOrientationEvent as any).requestPermission?.();
            if (response === 'granted') {
                setTimeout(() => {
                    const handle = (e: DeviceOrientationEvent) => {
                        if (e.gamma !== null && e.beta !== null) {
                            setBaseline({ gamma: e.gamma, beta: e.beta });
                            window.removeEventListener('deviceorientation', handle);
                        }
                    };
                    window.addEventListener('deviceorientation', handle);
                }, 100);
            }
        } catch (err) {
            console.error('Gyroscope permission error:', err);
        }
    }
};

const isMobileDevice = () =>
    typeof window !== 'undefined' &&
    /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  

export default function Three() {
    const [showModal, setShowModal] = useState(() => isMobileDevice());
    const [gyroBaseline, setGyroBaseline] = useState<{ gamma: number; beta: number } | null>(null);

    const handlePermission = async () => {
        await requestGyroPermission(setGyroBaseline);
        setShowModal(false);
    };

    return (
        <PlaybackProvider>
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-70 z-[999] flex items-center justify-center">
                    <div className="bg-white rounded-xl p-8 text-center shadow-xl max-w-sm m-8">
                        <h2 className="text-xl font-semibold mb-4 text-black">Permissions Request</h2>
                        <p className="mb-6 text-sm text-gray-700 text-left">
                            To interact with the scene using your device's motion, please enable gyroscope access.
                        </p>
                        <p className="mb-6 text-sm text-gray-300 text-left">
                            Note: For best effect, please also lock your screen tilt.
                        </p>
                        <button
                            onClick={handlePermission}
                            className="bg-[#ea43a3] text-white px-4 py-2 hover:bg-gray-800 transition rounded-full"
                        >
                            Enable Gyroscope
                        </button>
                    </div>
                </div>
            )}
            <div className="h-screen overflow-hidden position-fixed">
                <div className="fixed top-0 w-full h-[20vh] bg-white flex justify-center z-50">
                    <div 
                        className="absolute bg-red-500 w-[90vw] max-w-[800px] h-[0px] rounded-full z-100" 
                        style={{
                            bottom: 0,
                            left: '50%',
                            transform: 'translateX(-50%) translateY(50%)',
                            paddingLeft: '50px',
                            paddingRight: '50px',
                        }}
                    >
                        <img
                            src="/bliss/bliss-header-2.png"
                            className="fixed top-0 z-50 pointer-events-none"
                            alt="Bliss Header"
                            style={{
                                left: '50%',
                                bottom: 0,
                                transform: 'translateX(-50%) translateY(-50%)',
                                transformOrigin: 'center center',
                            }}
                        />
                    </div>
                </div>
                <Canvas 
                    camera={{ position: [0, 2, 10] }}
                    gl={{ antialias: true, alpha: true, stencil: true, depth: true }}
                    onCreated={({ gl }) => {
                        gl.setClearAlpha(0);
                        gl.setClearColor(0x000000, 0);
                    }}
                >
                    <React.Suspense fallback={<Loader/>}>
                        <directionalLight position={[-2, 3, 5]} intensity={300} />
                        <Comp gyroBaseline={gyroBaseline} />
                        <Environment 
                            // files="/hdri/kloofendal_48d_partly_cloudy_puresky_4k.hdr"
                            preset="warehouse"
                            backgroundIntensity={5}
                            background={true}
                        />
                        <mesh scale={[50, 50, 1]} renderOrder={-1} castShadow={false} receiveShadow={false}>
                            <planeGeometry args={[1, 1]} />
                            <NoiseGradientShaderMaterial />
                        </mesh>
                        <BurnEffectPlane/>
                    </React.Suspense>
                </Canvas>
            </div>
            <PlayBlissButton />
        </PlaybackProvider>
    );
}