// SmileyParticles.tsx
'use client';

import React, { useRef, useMemo } from 'react';
import { useLoader, useFrame, useThree, ReactThreeFiber } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import * as THREE from 'three';
import { extend } from '@react-three/fiber';
import { shaderMaterial } from '@react-three/drei';

const VertexShader = `
uniform float uTime;
uniform vec2 uMouse;
varying float vDistortion;

void main() {
  vec3 newPos = position;

  vec2 dir = position.xy - uMouse;
  float dist = length(dir);
  vec2 normDir = normalize(dir);

  // Tighter radius = more localized influence
  float radius = 0.1;
  float falloff = exp(-pow(dist / radius, 2.0));

  float repulsion = 0.15 * falloff;
  newPos.x += normDir.x * repulsion;
  newPos.y += normDir.y * repulsion;

  float ripple = sin(uTime * 5.0 + position.y * 25.0) * 0.05 * falloff;
  newPos.xy += normDir * ripple;

  vDistortion = falloff;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(newPos, 1.0);
}
`;

const FragmentShader = `
  varying float vDistortion;
  void main() {
    gl_FragColor = vec4(vec3(1.0), vDistortion);
  }
`;

const SmileyShaderMaterial = shaderMaterial(
  {
    uTime: 0,
    uMouse: new THREE.Vector2(0, 0)
  },
  VertexShader,
  FragmentShader
);

extend({ SmileyShaderMaterial });

declare global {
  namespace JSX {
    interface IntrinsicElements {
      smileyShaderMaterial: ReactThreeFiber.Node<typeof SmileyShaderMaterial, typeof SmileyShaderMaterial>;
    }
  }
}

export default function SmileyParticles() {
  const gltf = useLoader(GLTFLoader, '/3d-models/smile-smooth.glb')
  const shaderRef = useRef<THREE.ShaderMaterial>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const { camera, mouse, viewport } = useThree();

    const geometry = useMemo(() => {
      let foundGeometry: THREE.BufferGeometry | null = null
      gltf.scene.traverse((child) => {
        if ((child as THREE.Mesh).isMesh && (child as THREE.Mesh).geometry) {
          foundGeometry = (child as THREE.Mesh).geometry.clone()
        }
      })
      return foundGeometry ?? new THREE.BufferGeometry()
    }, [gltf])
  useFrame(({ clock }) => {
    if (shaderRef.current) {
      shaderRef.current.uniforms.uTime.value = clock.getElapsedTime();
      shaderRef.current.uniforms.uMouse.value.set(
        (mouse.x * viewport.width) / 2,
        (mouse.y * viewport.height) / 2
      );
    }
    if (meshRef.current) {
      meshRef.current.quaternion.copy(camera.quaternion);
    }
  });

  return (
    <mesh
      ref={meshRef}
      geometry={geometry}
      scale={[15, 15, 15]}
      position={[0, -1, 0]}
    >
      <smileyShaderMaterial ref={shaderRef} />
    </mesh>
  );
}
