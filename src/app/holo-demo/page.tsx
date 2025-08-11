'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, extend, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { Environment, OrbitControls, useCursor, useGLTF, useTexture, Text } from '@react-three/drei';
import Loader from '../components/Loader';
import { HoloMaterial } from './holo';
import { FrostedGlassMaterial } from './FrostedGlassMaterial';

import { MeshTransmissionMaterial } from '@react-three/drei'
import { HoloRealMaterial } from './holoReal';
import { clone } from 'three/examples/jsm/utils/SkeletonUtils.js';

extend({ FrostedGlassMaterial })
extend({ HoloMaterial });
extend({ HoloRealMaterial });

function Card() {
    const materialRef = useRef<any>();
    const groupRef = useRef<THREE.Group>(null);
    const { size } = useThree();
    const mouse = useRef({ x: 0, y: 0 });
    const smoothedMouse = useRef({ x: 0, y: 0 });
  
    useFrame(({ clock }) => {
      smoothedMouse.current.x = THREE.MathUtils.lerp(
        smoothedMouse.current.x,
        mouse.current.x,
        0.1
      );
      smoothedMouse.current.y = THREE.MathUtils.lerp(
        smoothedMouse.current.y,
        mouse.current.y,
        0.1
      );
  
      if (groupRef.current) {
        groupRef.current.rotation.y = smoothedMouse.current.x * 0.4;
        groupRef.current.rotation.x = -smoothedMouse.current.y * 0.3;
      }
  
      if (materialRef.current) {
        materialRef.current.uTime = clock.getElapsedTime();
        materialRef.current.uMouse = [
          smoothedMouse.current.x * 0.5 + 0.5,
          smoothedMouse.current.y * 0.5 + 0.5,
        ];
      }
    });
  
    useEffect(() => {
      const handleMouseMove = (e: MouseEvent) => {
        mouse.current.x = (e.clientX / size.width) * 2 - 1;
        mouse.current.y = -(e.clientY / size.height) * 2 + 1;
      };
      window.addEventListener('mousemove', handleMouseMove);
      return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [size]);

    return (
        <group ref={groupRef}>
            {/* <mesh scale={[0.25, 0.25, 0.25]} position={[0.5, -2.75, 0]}><HanariText/></mesh> */}
            <FrostedPanel/>
            <HanariCard/>
            <HoloCardMesh/>
            <HoloCardOutline/>
            <BackCard/>
        </group>
    );
}

function HoloCardMesh() {
    const materialRef = useRef<any>();
    const [texture, normalMap] = useTexture(['/3d-models/card/metal-black.png', '/3d-models/card/rock_bump.jpg']);
    const { size } = useThree();
    const mouse = useRef({ x: 0, y: 0 });
    const smoothedMouse = useRef({ x: 0, y: 0 });
  
    useFrame(({ clock }) => {
      smoothedMouse.current.x = THREE.MathUtils.lerp(
        smoothedMouse.current.x,
        mouse.current.x,
        0.1
      );
      smoothedMouse.current.y = THREE.MathUtils.lerp(
        smoothedMouse.current.y,
        mouse.current.y,
        0.1
      );
  
      if (materialRef.current) {
        materialRef.current.uTime = clock.getElapsedTime();
        materialRef.current.uMouse = [
          smoothedMouse.current.x * 0.5 + 0.5,
          smoothedMouse.current.y * 0.5 + 0.5,
        ];
      }
    });
  
    useEffect(() => {
      const handleMouseMove = (e: MouseEvent) => {
        mouse.current.x = (e.clientX / size.width) * 2 - 1;
        mouse.current.y = -(e.clientY / size.height) * 2 + 1;
      };
      window.addEventListener('mousemove', handleMouseMove);
      return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [size]);  
  
    return (  
        <mesh scale={[2, 2, 1]} position={[0, 0, -0.3]}>
            <planeGeometry args={[2.5, 3.5]} />
            {/* <holoMaterial
                side={THREE.DoubleSide} 
                ref={materialRef}
                uTexture={texture}
                uNormalMap={normalMap}
                uTime={0}
                uMouse={[0.5, 0.5]}
                uProgress={0}
                transparent
            /> */}

            <meshPhysicalMaterial
                color={new THREE.Color('#00bfff')}
                transmission={0.75}
                roughness={0.1}
                thickness={0.75}
                iridescence={1}
                iridescenceIOR={1.6}
                ior={1.5}
                reflectivity={1}
                metalness={0}
                clearcoat={1}
                clearcoatRoughness={0}
                envMapIntensity={10}
                // texture={texture}
                normalMap={normalMap}
                side={THREE.DoubleSide}
                ref={materialRef}
                transparent={true}
            />
        </mesh>
    );
}

function HoloCardOutline() {
    const materialRef = useRef<any>();
    const texture = useTexture('/3d-models/card/metal-outline.png');
    const { size } = useThree();
    const mouse = useRef({ x: 0, y: 0 });
    const smoothedMouse = useRef({ x: 0, y: 0 });
  
    useFrame(({ clock }) => {
      smoothedMouse.current.x = THREE.MathUtils.lerp(
        smoothedMouse.current.x,
        mouse.current.x,
        0.1
      );
      smoothedMouse.current.y = THREE.MathUtils.lerp(
        smoothedMouse.current.y,
        mouse.current.y,
        0.1
      );
  
      if (materialRef.current) {
        materialRef.current.uTime = clock.getElapsedTime();
        materialRef.current.uMouse = [
          smoothedMouse.current.x * 0.5 + 0.5,
          smoothedMouse.current.y * 0.5 + 0.5,
        ];
      }
    });
  
    useEffect(() => {
      const handleMouseMove = (e: MouseEvent) => {
        mouse.current.x = (e.clientX / size.width) * 2 - 1;
        mouse.current.y = -(e.clientY / size.height) * 2 + 1;
      };
      window.addEventListener('mousemove', handleMouseMove);
      return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [size]);  
  
    return (  
        <mesh scale={[2, 2, 1]}>
            <planeGeometry args={[2.5, 3.5]} />
            <holoRealMaterial
                side={THREE.DoubleSide} 
                ref={materialRef}
                uTexture={texture}
                uTime={0}
                uMouse={[0.5, 0.5]}
                uProgress={0}
                transparent
            />
        </mesh>
    );
}

function FrostedPanel() {
    const texture = useTexture('/3d-models/card/frosted-glass.png')
  
    return (
        <mesh position={[0, 0, 0.01]}>
            <planeGeometry args={[2.5 * 2, 3.5 * 2]} />
            <MeshTransmissionMaterial
                map={texture} // apply it as a color map
                alphaMap={texture}
                transmission={1}
                thickness={0.5}
                roughness={0.5}
                ior={1.6}
                transparent={true}
                opacity={1} // Required for alphaMap to take effect
                side={THREE.DoubleSide}
            />
        </mesh>
    )
}

function HanariText() {
    const gltf = useGLTF('/3d-models/hanari-chisel.glb');

    useEffect(() => {
        gltf.scene.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;
            mesh.material = new THREE.MeshStandardMaterial({
              metalness: 1,
              roughness: 0.2,
              envMapIntensity: 1,
              color: new THREE.Color('#FFFFFF'),
            });
          }
        });
      }, [gltf.scene]);

    return <primitive object={gltf.scene} />;
}

function HanariCard() {
    const texture = useTexture('/3d-models/card/hanari-card.png');

    return (
        <mesh scale={[1.75, 1.75, 1.75]} position={[0, 0, -0.1]}>
            <planeGeometry args={[2.5, 3.5]} />
            <meshStandardMaterial
                map={texture}
                side={THREE.DoubleSide}
                roughness={0.9}
                metalness={0.1}
                transparent
                envMapIntensity={0.1}
                toneMapped={true}
            />
        </mesh>
    );
}

function BackCard() {
    return (
        <mesh position={[0, 0, -0.2]}>
            <planeGeometry args={[2.5 * 1.75, 3.5 * 1.75]} />
            <MeshTransmissionMaterial
                transmission={1}
                thickness={0.1}
                roughness={0.1}
                ior={1.5}
                transparent={true}
                opacity={1}
                metalness={0.5}
                side={THREE.DoubleSide}
            />
        </mesh>
    );
}

function Chains() {
    const gltf = useGLTF('/3d-models/windows-angel/chain-circle-2.glb')
    const meshRef = useRef<THREE.Group>(null)
  
    // 🧠 Clone the scene only once
    const scene = useMemo(() => clone(gltf.scene), [gltf.scene])
  
    useFrame(() => {
      if (!meshRef.current) return
      meshRef.current.rotation.y += 0.005
    })
  
    useEffect(() => {
      scene.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          const mesh = child as THREE.Mesh
          mesh.material = new THREE.MeshPhysicalMaterial({
            color: new THREE.Color('#00bfff'),
            transmission: 0.75,
            roughness: 0.1,
            thickness: 0.75,
            iridescence: 1,
            iridescenceIOR: 1.6,
            ior: 1.5,
            reflectivity: 1,
            metalness: 0,
            clearcoat: 1,
            clearcoatRoughness: 0,
            envMapIntensity: 10,
          })
          mesh.material.needsUpdate = true
        }
      })
    }, [scene])
  
    return (
      <mesh rotation={[-Math.PI / 2, 0, 0]} scale={[0.8, 0.8, 0.8]}>
        <primitive object={scene} ref={meshRef} />
      </mesh>
    )
  }

  // export function TestPanel() {
  //   const gltf = useGLTF('/3d-models/windows-angel/test-panel.glb')
  //   const groupRef = useRef<THREE.Group>(null)
  //   const [hovered, setHovered] = useState(false)
  
  //   useEffect(() => {
  //     gltf.scene.traverse((child) => {
  //       if ((child as THREE.Mesh).isMesh) {
  //         const mesh = child as THREE.Mesh
  //         mesh.material = new THREE.MeshPhysicalMaterial({
  //           color: new THREE.Color('#00bfff'),
  //           transmission: 0.8,
  //           roughness: 0.1,
  //           thickness: 0.5,
  //           iridescence: 1,
  //           iridescenceIOR: 1.6,
  //           ior: 1.5,
  //           reflectivity: 0.1,
  //           metalness: 0,
  //           clearcoat: 1,
  //           clearcoatRoughness: 0,
  //           envMapIntensity: 10,
  //         })
  //       }
  //     })
  //   }, [gltf.scene])
  
  //   return (
  //     <primitive
  //       object={gltf.scene}
  //       ref={groupRef}
  //       onPointerOver={() => setHovered(true)}
  //       onPointerOut={() => setHovered(false)}
  //     />
  //   )
  // }

  // function VistaWindow({ position = [0, 0, 0] as [number, number, number] }) {
  //   const ref = useRef<THREE.Group>(null)
  //   const [hovered, setHovered] = useState(false)
  
  //   useCursor(hovered)
  
  //   // 🧲 Drag logic
  //   // useDrag(({ offset: [x, y] }) => {
  //   //   if (ref.current) {
  //   //     ref.current.position.x = x / 100
  //   //     ref.current.position.y = -y / 100
  //   //   }
  //   // }, { target: ref })
  
  //   // ✨ Glow effect (optional animated pulse)
  //   useFrame(() => {
  //     if (ref.current) {
  //       const time = performance.now() * 0.002
  //       const glow = 0.5 + Math.sin(time) * 0.3
  //       ref.current.children.forEach(child => {
  //         if (child.name === 'icon') {
  //           const material = (child as THREE.Mesh).material;
  //           if (material instanceof THREE.MeshStandardMaterial) {
  //               material.emissiveIntensity = glow;
  //           }
  //         }
  //       })
  //     }
  //   })
  
  //   return (
  //     <group ref={ref} position={position}>
  //       {/* 🌫️ Glass Window */}
  //       <mesh onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}>
  //         <planeGeometry args={[2.5, 1.5]} />
  //         <meshPhysicalMaterial
  //           color={new THREE.Color('#00bfff')}
  //           transmission={0.8}
  //           roughness={0.1}
  //           thickness={0.5}
  //           iridescence={1}
  //           iridescenceIOR={1.6}
  //           ior={1.5}
  //           reflectivity={0.1}
  //           metalness={0}
  //           clearcoat={1}
  //           clearcoatRoughness={0}
  //           envMapIntensity={10}
  //         />
  //       </mesh>
  
  //       <mesh position={[0, 0, 0.01]}>
  //         <planeGeometry args={[2, 1]} />
  //         <meshBasicMaterial map={/* your loaded texture */ undefined} />
  //       </mesh>
  
  //       {/* {['X', '-', '▢'].map((char, i) => (
  //         <mesh
  //           key={char}
  //           name="icon"
  //           position={[-0.8 + i * 0.3, 0.45, 0.01]}
  //         >
  //           <planeGeometry args={[0.15, 0.15]} />
  //           <meshStandardMaterial emissive={'#ffffff'} emissiveIntensity={1} color={'#333'} />
  //           <Text position={[0, 0, 0.01]} fontSize={0.07} color="white" anchorX="center" anchorY="middle">
  //             {char}
  //           </Text>
  //         </mesh>
  //       ))} */}
  //     </group>
  //   )
  // }

  function VistaWindow({ position = [0, 0, 0] as [number, number, number] }) {
    const ref = useRef<THREE.Group>(null)
    const [hovered, setHovered] = useState(false)

  
    return (
      <group ref={ref} position={position}>
        <mesh position={[0, 0, 0.01]}>
          <planeGeometry args={[2.06, 1.535]} />
          <meshBasicMaterial
            map={useTexture('/3d-models/windows-angel/window.png')}
            transparent={true}
            opacity={1} // dial this if it feels too strong
          />
        </mesh>
      </group>
    )
  }
  

export default function Three() {
    return (
        <div className="w-[100dvw] h-[100dvh] overflow-hidden">
            <Canvas camera={{ position: [0, 2, 10] }} >
                <React.Suspense fallback={<Loader/>}>
                    <directionalLight position={[-2, 3, 5]} intensity={3} />
                    <OrbitControls/>
                    <group rotation={[0, -Math.PI / 2, 0]}>
                        <Environment 
                            // preset="warehouse"
                            files={'3d-models/windows-angel/partly_cloudy_1k.hdr'}
                            backgroundIntensity={2}
                            background={true}
                        />
                    </group>
                    {/* <Card/> */}
                    
                    <mesh scale={[3, 3, 3]}><VistaWindow/></mesh>
                    <mesh position={[-15, 0, 0]}><Chains/></mesh>
                    <mesh position={[15, 0, 0]}><Chains/></mesh>
                    {/* <mesh rotation={[-Math.PI / 2, 0, 0]}><TestPanel/></mesh> */}
                </React.Suspense>
            </Canvas>
        </div>
    );
}
