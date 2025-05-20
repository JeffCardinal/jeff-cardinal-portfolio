'use client';

import React, { useRef, useEffect, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import * as THREE from 'three';
import PlayBlissButton from './PlayBlissButton';

function Smiley() {
    const gltf = useLoader(GLTFLoader, '/3d-models/smile-smooth.glb')
    const meshRef = useRef<THREE.Mesh>(null)
    const materialRef = useRef<THREE.ShaderMaterial>(null)
    const dissolveMeshRef = useRef<THREE.Mesh>(null)
    const originalPositions = useRef<Float32Array | null>(null)
    const { camera } = useThree()

    const groupRef = useRef<THREE.Group>(null)
    const { size } = useThree()
    const mouse = useRef({ x: 0, y: 0 })

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
                transparent
                // depthWrite={false}
                // depthTest={false}
                side={THREE.DoubleSide}
                stencilWrite={true}
                stencilRef={1}
                stencilFunc={THREE.AlwaysStencilFunc}
                stencilZPass={THREE.ReplaceStencilOp}
                stencilZFail={THREE.KeepStencilOp}
                depthWrite={true} // ✅ don't write to depth buffer
                depthTest={true}   // still respect camera z order
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
            transparent
            // depthWrite={false}
            // stencilWrite={false}
            // stencilRef={1}
            // stencilFunc={THREE.EqualStencilFunc}
            // stencilZPass={THREE.KeepStencilOp}
            // depthTest={true}
            // // transparent={true}
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
        <group scale={scaleFactor} position={[0, -1.15, 0]}>
            <Smiley />
            {/* <SmileyParticles /> */}
        </group>
    );
}

function StaticBackground() {
    const tex = useLoader(THREE.TextureLoader, '/bliss/bliss-bg.jpg');
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
                depthTest={true}
                toneMapped={false}
                transparent={false}
            />
        </mesh>
    );
}

export default function Three() {
    return (
        <div className="h-screen overflow-hidden">
            {/* <div className="fixed top-0 left-0 w-full h-[20.3vh] bg-white z-10"/> */}
            <img
                src="/bliss/bliss-header.png"
                className="fixed top-0 max-h-[550px] object-cover z-20 pointer-events-none"
                alt="Bliss Header"
            />
            {/* <div className="fixed top-[50px] left-0 w-full h-full bg-[url('/bliss/bliss-bg.jpg')] bg-cover bg-center bg-no-repeat pointer-events-none z-0" /> */}
            <div className="bg-white w-full h-full bg-cover bg-center fixed" />
            <PlayBlissButton />
            <Canvas 
                camera={{ position: [0, 2, 10] }}
                gl={{ antialias: true, alpha: true, stencil: true, depth: true }}
                onCreated={({ gl }) => {
                    gl.setClearAlpha(0);
                    gl.setClearColor(0x000000, 0);
                }}
                >
                {/* <Environment files="/hdri/kloofendal_48d_partly_cloudy_puresky_4k.hdr" /> */}
                <ambientLight intensity={1} />
                <directionalLight position={[2, 2, 5]} intensity={10.5} />
                <React.Suspense fallback={null}>
                    <Comp />
                    <StaticBackground />
                </React.Suspense>
                {/* <OrbitControls/> */}
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
