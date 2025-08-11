import { shaderMaterial } from '@react-three/drei'
import { extend, ReactThreeFiber } from '@react-three/fiber'
import { Texture } from 'three'

// 5x5 Gaussian kernel weights (approximated)
const gaussianWeights = `
  float kernel[25];
  kernel[ 0] = 1.0; kernel[ 1] = 4.0; kernel[ 2] = 7.0; kernel[ 3] = 4.0; kernel[ 4] = 1.0;
  kernel[ 5] = 4.0; kernel[ 6] = 16.0; kernel[ 7] = 26.0; kernel[ 8] = 16.0; kernel[ 9] = 4.0;
  kernel[10] = 7.0; kernel[11] = 26.0; kernel[12] = 41.0; kernel[13] = 26.0; kernel[14] = 7.0;
  kernel[15] = 4.0; kernel[16] = 16.0; kernel[17] = 26.0; kernel[18] = 16.0; kernel[19] = 4.0;
  kernel[20] = 1.0; kernel[21] = 4.0; kernel[22] = 7.0; kernel[23] = 4.0; kernel[24] = 1.0;
`

const FrostedGlassMaterial = shaderMaterial(
  {
    uTexture: null,
  },
  // Vertex Shader
  `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // Fragment Shader
  `
    precision mediump float;

    uniform sampler2D uTexture;
    varying vec2 vUv;

    ${gaussianWeights}

    void main() {
      vec2 texel = vec2(0.003, 0.003); // adjust blur scale
      vec3 color = vec3(0.0);
      float total = 0.0;
      int i = 0;

      for (int x = -2; x <= 2; x++) {
        for (int y = -2; y <= 2; y++) {
          vec2 offset = vec2(float(x), float(y)) * texel;
          color += texture2D(uTexture, vUv + offset).rgb * kernel[i];
          total += kernel[i];
          i++;
        }
      }

      color /= total;
      gl_FragColor = vec4(color, 0.75); // semi-transparent
    }
  `
)

extend({ FrostedGlassMaterial })

declare global {
  namespace JSX {
    interface IntrinsicElements {
      frostedGlassMaterial: ReactThreeFiber.ThreeElements['shaderMaterial'] & {
        uTexture: Texture
      }
    }
  }
}

export { FrostedGlassMaterial }
