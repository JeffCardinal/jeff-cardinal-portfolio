'use client';

import React, { useRef, useEffect, useMemo, useState } from 'react';
import { Canvas, useFrame, useThree, extend, ReactThreeFiber, Object3DNode } from '@react-three/fiber';
import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import * as THREE from 'three';
import PlayBlissButton from './PlayBlissButton';
import NoiseGradientShaderMaterial from '../components/shaders/NoiseGradientShaderMaterial';
import { DissolveGlass } from './dissolve-glass';
import { PlaybackProvider, usePlayback } from './PlaybackContext';    
import { BurnShaderMaterial } from './BurnShaderMaterial';
extend({ BurnShaderMaterial });

declare global {
  namespace JSX {
    interface IntrinsicElements {
      burnShaderMaterial: Object3DNode<typeof BurnShaderMaterial, typeof BurnShaderMaterial>;
    }
  }
}

const bpm = 155;
const secondsPerBeat = 60 / bpm;

function Smiley() {
    const gltf = useLoader(GLTFLoader, '/3d-models/smile-smooth.glb')
    const meshRef = useRef<THREE.Mesh>(null)
    const materialRef = useRef<THREE.ShaderMaterial>(null)
    const dissolveMeshRef = useRef<THREE.Mesh>(null)
    const originalPositions = useRef<Float32Array | null>(null)
    const { camera } = useThree()
    const { audioRef } = usePlayback();

    const groupRef = useRef<THREE.Group>(null)
    const { size } = useThree()
    const mouse = useRef({ x: 0, y: 0 })

    useFrame(() => {
        const t = audioRef.current?.currentTime || 0;
        if (meshRef.current) {
            let beatPhase = (t % secondsPerBeat) / secondsPerBeat;
            meshRef.current.scale.setScalar(1 + 0.025 * Math.sin(beatPhase * Math.PI * 2));
        }
      });

    // Listen to mouse movement on mount
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouse.current.x = (e.clientX / size.width) * 2 - 1
            mouse.current.y = -(e.clientY / size.height) * 2 + 1
        }
        window.addEventListener('mousemove', handleMouseMove)
        return () => window.removeEventListener('mousemove', handleMouseMove)
    }, [size.width, size.height])

    // Apply subtle rotation
    useFrame(() => {
        if (!groupRef.current) return
        groupRef.current.rotation.y = mouse.current.x * 0.4
        groupRef.current.rotation.x = -mouse.current.y * 0.3
    })
  
    useEffect(() => {
      if (meshRef.current) {
        const positionAttr = meshRef.current.geometry.attributes.position
        originalPositions.current = new Float32Array(positionAttr.array)
      }
    }, [])
  
    useFrame(({ clock }) => {
        if (!meshRef.current || !originalPositions.current) return
      
        meshRef.current.quaternion.copy(camera.quaternion)
        if (dissolveMeshRef.current) {
          dissolveMeshRef.current.quaternion.copy(camera.quaternion)
        }
      
        const posAttr = meshRef.current.geometry.attributes.position
        const time = clock.getElapsedTime()
      
        const mouseX = mouse.current.x
        const mouseY = mouse.current.y
      
        for (let i = 0; i < posAttr.count; i++) {
          const x = originalPositions.current[i * 3]
          const y = originalPositions.current[i * 3 + 1]
          const z = originalPositions.current[i * 3 + 2]
          let wiggleX = x

          const xFalloff = Math.min(Math.max(Math.abs(x) / 1.0, 0), 1)
          const yFalloff = 1 - Math.min(Math.max(Math.abs(mouseY) / 1.0, 0), 1)
      
          let strength = 0
      
          if (x > 0 && mouseX > 0) {
            strength = mouseX * xFalloff * yFalloff
          } else if (x < 0 && mouseX < 0) {
            strength = -mouseX * xFalloff * yFalloff
          }
      
          const wiggle = Math.sin(time * 3 + y * 30) * 0.2 * strength
          wiggleX += wiggle
      
          posAttr.setXYZ(i, wiggleX, y, z)
        }
      
        posAttr.needsUpdate = true
      
        if (materialRef.current) {
          materialRef.current.uniforms.uTime.value = time
          materialRef.current.uniforms.uProgress.value = Math.sin(time * 0.5) * 0.5 + 0.5
        //   materialRef.current.uniforms.uProgress.value = 0.75;
        }
      })

    const geometry = useMemo(() => {
      let foundGeometry: THREE.BufferGeometry | null = null
      gltf.scene.traverse((child) => {
        if ((child as THREE.Mesh).isMesh && (child as THREE.Mesh).geometry) {
          foundGeometry = (child as THREE.Mesh).geometry.clone()
        }
      })
      return foundGeometry ?? new THREE.BufferGeometry()
    }, [gltf])
  
    return (
        <group ref={groupRef} scale={[15, 15, 15]} position={[0, -1, 0]}>
            {/* <mesh
                geometry={geometry} 
                ref={dissolveMeshRef}
                renderOrder={2} // First in render sequence
            >
            <DissolveGlass
                ref={materialRef}
                uTime={0}
                uProgress={0}
                uNoiseScale={1000.0}
                uColor={new THREE.Color('#ffffff')}
                uEdgeSharpness={1}
                // transparent
                // depthWrite={false}
                // depthTest={false}
                side={THREE.DoubleSide}
                stencilWrite={true}
                stencilRef={1}
                stencilFunc={THREE.AlwaysStencilFunc}
                stencilZPass={THREE.ReplaceStencilOp}
                stencilZFail={THREE.KeepStencilOp}
                depthWrite={true}
                depthTest={true}
            />
            </mesh> */}

        <mesh geometry={geometry} ref={meshRef} renderOrder={1}>

          <meshPhysicalMaterial
            transmission={1}
            roughness={0.3}
            thickness={0.4}
            ior={1.45}
            reflectivity={0.5}
            attenuationDistance={1}
            metalness={0}
            toneMapped={false}
            specularColor={'#ffffff'}
            specularIntensity={1}
            // transparent
            // depthWrite={false}
            // stencilWrite={false}
            // stencilRef={1}
            // stencilFunc={THREE.EqualStencilFunc}
            // stencilZPass={THREE.KeepStencilOp}
            // depthTest={true}
            // transparent={true}
            // blending={THREE.NormalBlending} 
            // polygonOffset={true}
            // polygonOffsetFactor={-1}
            // polygonOffsetUnits={-4}
          />
        </mesh>
      </group>
    )
  }

function Comp() {
    const { viewport } = useThree();
    const scaleFactor = Math.min(viewport.width, viewport.height) * 0.065;
    return (
        <group scale={scaleFactor} position={[0, -1, 0]}>
            <Smiley />
        </group>
    );
}

function StaticBackground() {
    const tex = useLoader(THREE.TextureLoader, '/bliss/bliss-bg.jpg');
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
        <mesh ref={meshRef} position={[0, -25, -35]}>
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
    const shaderRef = useRef<any>();
    const BPM = 155;
    const totalBeatsToFullyBurn = 64;
    const { audioRef } = usePlayback();
    const texture = useLoader(THREE.TextureLoader, '/bliss/bliss-bg.jpg');
  
    const startBeat = 56;
    const endBeat = 64;
    const reverseStart = 92;
    const reverseEnd = 96;

    useFrame((state) => {
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
        <mesh  position={[0, -25, -35]}>
        <planeGeometry args={[200, 100]} />
        <burnShaderMaterial
          ref={shaderRef}
          uTime={0}
          uProgress={0}
          uTexture={texture}
        //   uReverse={false}
          side={THREE.DoubleSide}
          depthTest={true}
          transparent={false}
          opacity={1}
        />
      </mesh>
  );
}

export default function Three() {
    return (
        <PlaybackProvider>
            <div className="h-screen overflow-hidden">
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
                    <ambientLight intensity={1} />
                    <directionalLight position={[2, 2, 5]} intensity={10.5} />
                    <React.Suspense fallback={null}>
                        <Comp />
                        <mesh scale={[50, 50, 1]} renderOrder={-1}>
                            <planeGeometry args={[1, 1]} />
                            <NoiseGradientShaderMaterial />
                        </mesh>
                        <BurnEffectPlane/>
                        {/* <StaticBackground/> */}
                    </React.Suspense>
                </Canvas>
            </div>
            <PlayBlissButton />
        </PlaybackProvider>
    );
}
