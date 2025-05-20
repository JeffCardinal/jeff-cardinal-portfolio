import * as THREE from "three";
import { shaderMaterial } from '@react-three/drei'
import { extend, ReactThreeFiber } from '@react-three/fiber'
import React, { useRef } from 'react'

const vertexShader = `
  varying vec3 vPosition;
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vViewPosition;
  
  void main() {
    vPosition = position;
    vUv = uv;
    vNormal = normal;
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    vViewPosition = -mvPosition.xyz;
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const fragmentShader = `
  uniform float uTime;
  uniform float uProgress;
  uniform float uNoiseScale;
  uniform vec3 uColor;
  uniform float uEdgeSharpness;
  
  varying vec3 vPosition;
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vViewPosition;

  // Simple random function
  float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453);
  }

  // Value noise
  float valueNoise(vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);
    
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));

    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
  }

  // Schlick's approximation for Fresnel
  vec3 fresnelSchlick(float cosTheta, vec3 F0) {
    return F0 + (1.0 - F0) * pow(1.0 - cosTheta, 5.0);
  }

  void main() {
    // Create multiple layers of noise
    vec2 st = vUv * uNoiseScale;
    
    // Base noise layer
    float noise1 = valueNoise(st);
    
    // Second noise layer with different scale
    float noise2 = valueNoise(st * 2.0 + uTime * 0.1);
    
    // Third noise layer with different scale
    float noise3 = valueNoise(st * 4.0 - uTime * 0.05);
    
    // Combine noise layers with more contrast
    float combinedNoise = (noise1 * 0.6 + noise2 * 0.3 + noise3 * 0.1);
    
    // Increase contrast
    combinedNoise = pow(combinedNoise, 0.6);
    
    // Add some grain
    float grain = random(vUv + uTime) * 0.05;
    
    // Apply dissolve effect with sharper edges
    float threshold = uProgress;
    // Old value + 0.05
    float dissolveEdge = smoothstep(threshold - 0.05, threshold + 0.05, combinedNoise);
    
    // Calculate glass properties
    vec3 normal = normalize(vNormal);
    vec3 viewDir = normalize(vViewPosition);
    float NdotV = max(dot(normal, viewDir), 0.0);
    
    // Calculate reflection and refraction
    vec3 F0 = vec3(0.04);
    vec3 fresnel = fresnelSchlick(NdotV, F0);
    
    // Base glass color with stronger blue tint
    vec3 glassColor = vec3(0.85, 0.92, 1.0);
    
    // Calculate final color
    vec3 finalColor = glassColor;
    
    // Add edge glow with more contrast
    float edgeGlow = smoothstep(0.0, 0.05, dissolveEdge);
    finalColor = mix(finalColor, vec3(1.0), edgeGlow * 0.4);
    
    // Calculate alpha with more contrast
    float baseAlpha = 0.1; // More transparent base
    float alpha = mix(baseAlpha, 0.9, dissolveEdge); // Higher max alpha for more contrast
    
    // Apply dissolve effect to alpha
    alpha *= dissolveEdge;
    
    // Discard pixels based on dissolve effect
    if (alpha < 0.01) {
      discard;
    }
    
    gl_FragColor = vec4(finalColor, alpha);
  }
`;

const DissolveGlassMaterial = shaderMaterial(
  {
    uTime: 0,
    uProgress: 0,
    uNoiseScale: 10.0,
    uColor: new THREE.Color('#ffffff'),
    uEdgeSharpness: 1.5,
  },
  vertexShader,
  fragmentShader
)

extend({ DissolveGlassMaterial })

declare global {
  namespace JSX {
    interface IntrinsicElements {
      dissolveGlassMaterial: ReactThreeFiber.Node<
        typeof DissolveGlassMaterial,
        typeof DissolveGlassMaterial
      >
    }
  }
}

export const DissolveGlass = React.forwardRef((props: any, ref) => {
  const materialRef = useRef<THREE.ShaderMaterial>(null!)
  return <dissolveGlassMaterial ref={ref || materialRef} attach="material" {...props} />
})

DissolveGlass.displayName = 'DissolveGlass'

export { DissolveGlassMaterial } 