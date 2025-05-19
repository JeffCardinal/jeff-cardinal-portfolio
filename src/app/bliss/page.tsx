'use client';

import React, { useRef, useEffect, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import * as THREE from 'three';
import PlayBlissButton from './PlayBlissButton';
import { DissolveGlass } from './dissolve-glass';
import Marquee from 'react-fast-marquee';
import Scroller from '../components/Scroller';
import SparkleSvg from '../svg/SparkleSvg';
import Footer from '../components/Footer';

function Smiley() {
    const gltf = useLoader(GLTFLoader, '/3d-models/smile-smooth.glb')
    const meshRef = useRef<THREE.Mesh>(null)
    const materialRef = useRef<THREE.ShaderMaterial>(null)
    const dissolveMeshRef = useRef<THREE.Mesh>(null)
    const originalPositions = useRef<Float32Array | null>(null)
    const { camera } = useThree()
  
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
  
      for (let i = 0; i < posAttr.count; i++) {
        const x = originalPositions.current[i * 3]
        const y = originalPositions.current[i * 3 + 1]
        const z = originalPositions.current[i * 3 + 2]
        let wiggleX = x
  
        if (x > 0) {
          const falloff = Math.min(Math.max(x / 1.0, 0), 1)
          const wiggle = Math.sin(time * 3 + y * 30) * 0.2 * falloff
          wiggleX += wiggle
        }
  
        posAttr.setXYZ(i, wiggleX, y, z)
      }
  
      posAttr.needsUpdate = true
  
      if (materialRef.current) {
        materialRef.current.uniforms.uTime.value = clock.getElapsedTime();
        materialRef.current.uniforms.uProgress.value = Math.sin(clock.getElapsedTime() * 0.5) * 0.5 + 0.5;
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
      <group scale={[15, 15, 15]} position={[0, -1, 0]}>
        <mesh geometry={geometry} ref={meshRef}>
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
            transparent
            depthWrite={false}
            stencilWrite={true}
            stencilRef={1}
            stencilFunc={THREE.EqualStencilFunc}
            stencilZPass={THREE.KeepStencilOp}
            stencilZFail={THREE.ReplaceStencilOp}
          />
        </mesh>
        <mesh 
          geometry={geometry} 
          ref={dissolveMeshRef}
        >
          <DissolveGlass
            ref={materialRef}
            uTime={0}
            uProgress={0}
            uNoiseScale={1000.0}
            uColor={new THREE.Color('#ffffff')}
            uEdgeSharpness={1}
            transparent
            depthWrite={false}
            depthTest={false}
            side={THREE.DoubleSide}
            renderOrder={1}
            stencilWrite={true}
            stencilRef={1}
            stencilFunc={THREE.AlwaysStencilFunc}
            stencilZPass={THREE.ReplaceStencilOp}
            stencilZFail={THREE.ReplaceStencilOp}
          />
        </mesh>
      </group>
    )
  }

function Comp() {
    const { viewport } = useThree();
    const scaleFactor = Math.min(viewport.width, viewport.height) * 0.065;
    return (
        <group scale={scaleFactor} position={[0, -1.15, 0]}>
            <Smiley />
        </group>
    );
}

function StaticBackground() {
    const tex = useLoader(THREE.TextureLoader, '/bliss/bliss-bg-large.png');
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
    
    const meshRef = useRef<THREE.Mesh>(null);

    const { camera } = useThree();
    
    useFrame(() => {
        if (meshRef.current) {
            meshRef.current.quaternion.copy(camera.quaternion);
        }
    });
    
    return (
        <mesh ref={meshRef} position={[0, -30, -50]}>
        <planeGeometry args={[200, 100]} />
        <meshBasicMaterial
            map={tex}
            side={THREE.DoubleSide}
            depthTest={false}
            toneMapped={false}
            transparent={false}
        />
        </mesh>
    );
}

export default function _3JS() {
    return (
        <div className="bg-white h-screen">
            <div className="fixed top-0 w-full max-h-[500px] bg-white z-10"></div>
            <img
                src="/bliss/bliss-textonly-header.png"
                className="fixed top-0 left-1/2 -translate-x-1/2 w-auto max-h-[510px] object-cover z-20 pointer-events-none"
                alt="Bliss Header"
            />
            <PlayBlissButton />
            <Canvas 
                camera={{ position: [0, 2, 10] }}
                gl={{ antialias: true }}
                onCreated={({ gl }) => {
                    gl.setClearColor('#00BFFF');
                }}
            >
                {/* <Environment files="/hdri/kloofendal_48d_partly_cloudy_puresky_4k.hdr" /> */}
                <ambientLight intensity={1} />
                <directionalLight position={[2, 2, 5]} intensity={10.5} />
                <React.Suspense fallback={null}>
                    <Comp/>
                    <StaticBackground />
                </React.Suspense>
            </Canvas>
            {/* <Marquee
                pauseOnHover={false}
                speed={100}
                className="border-t-[5px] border-b-[5px] border-white bg-[#ea43a3]"
            >
                <Scroller pad={true}><div className="text-white">NEW SINGLE OUT MAY 30 2025</div></Scroller>
                <Scroller pad={false}> <SparkleSvg color={"white"} dim={"36px"}/> </Scroller>
                <Scroller pad={true}><div className="text-white">PRODUCTION BY DREAMING DIARY AND VAPERROR</div></Scroller>
                <Scroller pad={false}> <SparkleSvg color={"white"} dim={"36px"}/> </Scroller>
                <Scroller pad={true}><div className="text-white">WE'RE SO BACK, BABY!</div></Scroller>
                <Scroller pad={false}> <SparkleSvg color={"white"} dim={"36px"}/> </Scroller>
            </Marquee>
            <div className="h-dvh bg-[#ea43a3]"></div>
            <Footer textColor={'text-white'} bgColor={'bg-black'}/> */}
        </div>
    );
}
