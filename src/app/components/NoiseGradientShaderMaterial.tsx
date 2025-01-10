import React, { useEffect, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function NoiseGradientShaderMaterial(): JSX.Element {
  const shaderMaterialRef = useRef<THREE.ShaderMaterial | null>(null);

  const vertexShader = `
    varying vec2 vUv;
    uniform float time; // Declare the time uniform

    void main() {
      vUv = uv; // Pass UV coordinates to the fragment shader
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;

  const fragmentShader = `
    varying vec2 vUv;
    uniform float time; // Declare the time uniform

    float random(vec2 st) {
      return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453);
    }

    float noise(vec2 st) {
      vec2 i = floor(st);
      vec2 f = fract(st);

      float a = random(i);
      float b = random(i + vec2(1.0, 0.0));
      float c = random(i + vec2(0.0, 1.0));
      float d = random(i + vec2(1.0, 1.0));

      vec2 u = f * f * (3.0 - 2.0 * f);

      return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
    }

    vec3 rainbow(float time) {
        float r = sin(time + 0.0) * 0.5 + 0.5; // Red cycle
        float g = sin(time + 2.0) * 0.5 + 0.5; // Green cycle
        float b = sin(time + 4.0) * 0.5 + 0.5; // Blue cycle
        return vec3(r, g, b); // Return RGB value
    }

    void main() {
      vec2 uv = vUv * 3.0; // Scale the UV coordinates for more detail
      uv.x += sin(time * 0.05); // Modify the x-component of UV by time to animate the noise
      uv.y += cos(time * 0.05); // Modify the y-component of UV by time for motion in both directions

      float n = noise(uv); // Generate noise with moving texture coordinates
      // vec3 color = vec3(
      //   float(0x00) / 255.0,
      //   float(0x3D) / 255.0,
      //   float(0xFF) / 255.0
      // ) * n; // Apply noise-based gradient to color

      vec3 color = rainbow(time + n * 5.0); // Add noise influence to rainbow colors
      gl_FragColor = vec4(color, 1.0);
    }
  `;

  useFrame(() => {
    if (shaderMaterialRef.current) {
      shaderMaterialRef.current.uniforms.time.value += 0.01;
    }
  });

  const epochTime = Date.now() / 1000; // Used for random seed generation

  return (
    <shaderMaterial
      ref={shaderMaterialRef}
      vertexShader={vertexShader}
      fragmentShader={fragmentShader}
      uniforms={{
        time: { value: 0 },
      }}
    />
  );
}
