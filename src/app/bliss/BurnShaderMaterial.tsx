// BurnShaderMaterial.tsx
import { shaderMaterial } from '@react-three/drei'
import { extend, ReactThreeFiber } from '@react-three/fiber'
import { Texture } from 'three';
// import { Texture } from 'three/src/Three.js';

const BurnShaderMaterial = shaderMaterial(
  {
    uTime: 0,
    uProgress: 0,
    uTexture: null,
  },
  `
    varying vec2 vUv;

    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  `
    varying vec2 vUv;
    uniform float uTime;
    uniform float uProgress;
    uniform sampler2D uTexture;

    // Classic 2D noise from https://thebookofshaders.com
    float random(vec2 st) {
      return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
    }

    float noise(vec2 st) {
      vec2 i = floor(st);
      vec2 f = fract(st);

      float a = random(i);
      float b = random(i + vec2(1.0, 0.0));
      float c = random(i + vec2(0.0, 1.0));
      float d = random(i + vec2(1.0, 1.0));

      vec2 u = f * f * (3.0 - 2.0 * f);

      return mix(a, b, u.x) +
             (c - a) * u.y * (1.0 - u.x) +
             (d - b) * u.x * u.y;
    }

    void main() {
      vec2 uv = vUv;

        if (uProgress <= 0.0) {
          gl_FragColor = texture2D(uTexture, uv);
          return;
        }

      vec2 noiseUV = vec2(uv.x * 1.5, uv.y);
      float n = noise(noiseUV * 15.0 + vec2(uTime * 0.5));
      float edgeNoise = noise(noiseUV * 4000.0 + uTime * 50.0);
      float noisyCutoff = uProgress + edgeNoise * 0.5 * uProgress;
      float threshold = step(noisyCutoff, n);

      // Chromatic aberration
      float offset = 0.1 * (1.0 - threshold);
      vec4 texR = texture2D(uTexture, uv + vec2(offset, 0.0));
      vec4 texG = texture2D(uTexture, uv);
      vec4 texB = texture2D(uTexture, uv - vec2(offset, 0.0));
      vec4 color = vec4(texR.r, texG.g, texB.b, 1.0);

      color.a *= threshold;

      if (color.a < 0.5) discard;
      // Sample the texture
      vec4 tex = texture2D(uTexture, vUv);

      // Convert from sRGB to linear color space
      tex.rgb = pow(tex.rgb, vec3(2.2));

      // Output final color
      gl_FragColor = tex;

      gl_FragColor = color;
    }
  `
);

declare global {
  namespace JSX {
      interface IntrinsicElements {
          burnShaderMaterial: ReactThreeFiber.ThreeElements['meshStandardMaterial'] & {
            uTime: 0,
            uProgress: 0,
            uTexture: Texture,
          },
      }
  }
}

extend({ BurnShaderMaterial });
export { BurnShaderMaterial };
