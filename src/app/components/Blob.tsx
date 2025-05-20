import React, { useEffect, useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { createNoise4D } from 'simplex-noise';

type GroupProps = JSX.IntrinsicElements['group']

const noise4D = createNoise4D();

export default function Blob(props: GroupProps) {
  const meshRef = useRef<THREE.Mesh>(null!)
  const strength = useRef(0)
  const effectStrength = useRef(0)
  const basePositions = useRef<Float32Array | null>(null)
  const rand = useMemo(() => Math.random(), [])

  useEffect(() => {
    if (meshRef.current) {
      const geometry = meshRef.current.geometry as THREE.BufferGeometry
      basePositions.current = new Float32Array(geometry.attributes.position.array)
    }
  }, [])

  useFrame(({ clock }) => {
    if (!meshRef.current || !basePositions.current) return

    const time = clock.getElapsedTime()
    const geom = meshRef.current.geometry as THREE.BufferGeometry
    const pos = geom.attributes.position as THREE.BufferAttribute
    const original = basePositions.current

    effectStrength.current = THREE.MathUtils.lerp(effectStrength.current, strength.current, 0.33)

    for (let i = 0; i < pos.count; i++) {
      const ix = i * 3
      const x = original[ix]
      const y = original[ix + 1]
      const z = original[ix + 2]
    
      const frequency = 4
      const n = noise4D(x * frequency, y * frequency, z * frequency, time * 1)
    
      const falloff = Math.pow(THREE.MathUtils.clamp(new THREE.Vector3(x, y, z).length() / 0.5, 0.5, 0.5), 1)
      const displacement = n * 0.1 * effectStrength.current * falloff
    
      const ripple = Math.sin(time * 2 + y * 15) * Math.sin(time * 2 + x * 15) * 0.1 * Math.sin(time * 2 + z * 15) * 1 * effectStrength.current;
    
      pos.setXYZ(
        i,
        x + (displacement + ripple) * x,
        y + (displacement + ripple) * y,
        z + (displacement + ripple) * z
      );
    }

    pos.needsUpdate = true

    meshRef.current.position.y = Math.sin(time + rand * 100) * 0.1 - 0.2

    const targetScale = 1 + 0.25 * effectStrength.current
    meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1)
  })

  return (
    <group {...props}>
      <mesh
        ref={meshRef}
        scale={props.scale}
        onPointerEnter={() => (strength.current = 1)}
        onPointerLeave={() => (strength.current = 0)}
      >
        <sphereGeometry args={[0.4, 64, 64]} />
        <meshPhysicalMaterial
          transmission={1}
          roughness={0.005}
          thickness={5}
          ior={1.45}
          reflectivity={1}
          clearcoat={1}
          clearcoatRoughness={0.0}
          envMapIntensity={3.5}

          iridescence={1}
          iridescenceIOR={1.0}
          iridescenceThicknessRange={[300, 700]}

          attenuationColor="#ffffff"
          attenuationDistance={0.1}

          metalness={0}
          toneMapped={false}
          specularColor={"#ffffff"}
          specularIntensity={1}
        />
      </mesh>
    </group>
  )
}
