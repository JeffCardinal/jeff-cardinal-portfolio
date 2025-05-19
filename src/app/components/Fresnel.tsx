import { shaderMaterial } from '@react-three/drei'
import { extend, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import React, { useRef } from 'react'

// Your GLSL from the Fresnel class
const vertexShader = `
  varying vec3 v_worldPosition;
  varying vec3 v_worldNormal;

  void main() {
    v_worldPosition = vec3(-viewMatrix[0][2], -viewMatrix[1][2], -viewMatrix[2][2]);
    v_worldNormal = normalize(mat3(modelMatrix) * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const fragmentShader = `
  uniform vec3 u_color;
  uniform float u_alpha;
  uniform float u_bias;
  uniform float u_intensity;
  uniform float u_power;
  uniform float u_factor;

  varying vec3 v_worldPosition;
  varying vec3 v_worldNormal;

  void main() {
    float f_a = (u_factor + dot(v_worldPosition, v_worldNormal));
    float f_fresnel = u_bias + u_intensity * pow(abs(f_a), u_power);
    f_fresnel = clamp(f_fresnel, 0.0, 1.0);
    gl_FragColor = vec4(f_fresnel * u_color, u_alpha);
  }
`

const FresnelMaterialImpl = shaderMaterial(
  {
    u_color: new THREE.Color('white'),
    u_alpha: 1,
    u_bias: 0.4,
    u_intensity: 4,
    u_power: 4,
    u_factor: 0.1,
  },
  vertexShader,
  fragmentShader
)

extend({ FresnelMaterialImpl })

export const FresnelMaterial = React.forwardRef((props: any, ref) => {
  const materialRef = useRef<THREE.ShaderMaterial>(null!)
  return <fresnelMaterialImpl ref={ref || materialRef} attach="material" {...props} />
})
