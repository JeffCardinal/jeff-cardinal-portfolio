import { shaderMaterial } from '@react-three/drei'
import { ReactThreeFiber } from '@react-three/fiber';
import { Texture } from 'three';

const HoloMaterial = shaderMaterial(
  {
    uTime: 0,
    uProgress: 0,
    uMouse: [0, 0],
    uTexture: null,
    uNormalMap: null,
  },
  `
    varying vec2 vUv;

    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  `
    uniform float uTime;
    uniform vec2 uMouse;
    uniform sampler2D uTexture;
    uniform sampler2D uNormalMap;

    varying vec2 vUv;

    float hash(vec2 p) {
        return fract(sin(dot(p ,vec2(127.1,311.7))) * 43758.5453);
    }

    float noise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        float a = hash(i);
        float b = hash(i + vec2(1.0, 0.0));
        float c = hash(i + vec2(0.0, 1.0));
        float d = hash(i + vec2(1.0, 1.0));
        vec2 u = f*f*(3.0-2.0*f);

        return mix(a, b, u.x) +
                (c - a)* u.y * (1.0 - u.x) +
                (d - b) * u.x * u.y;
    }

    // vec3 holoColor(vec2 uv, float angle) {
    //     float r = sin((uv.x + angle * 0.02) * 40.0 + angle * 2.0) * 0.5 + 0.5;
    //     float g = sin((uv.x + angle * 0.03 + 1.0) * 40.0 + angle * 1.5) * 0.5 + 0.5;
    //     float b = sin((uv.x + angle * 0.04 + 2.0) * 40.0 + angle) * 0.5 + 0.5;

    //     float rClamped = min(r, 32.0 / 255.0);

    //     return vec3(r, g, b);
    // }

    vec3 holoColor(vec2 uv, float angle) {
        float hue = mod((uv.x + angle * 0.05 + sin(angle * 0.5)) * 3.0, 3.0);

        vec3 color;
        if (hue < 1.0) {
            // Between blue and cyan
            color = mix(vec3(0.0, 0.0, 1.0), vec3(0.0, 1.0, 1.0), hue);
        } else if (hue < 2.0) {
            // Between cyan and magenta
            hue -= 1.0;
            color = mix(vec3(0.0, 1.0, 1.0), vec3(1.0, 0.0, 1.0), hue);
        } else {
            // Between magenta and blue
            hue -= 2.0;
            color = mix(vec3(1.0, 0.0, 1.0), vec3(0.0, 0.0, 1.0), hue);
        }

        return color;
    }

    vec3 getNormal() {
        vec3 normalColor = texture2D(uNormalMap, vUv).rgb;
        normalColor = normalize(normalColor * 2.0 - 1.0); // Unpack normal
        return normalColor;
    }

    float holoLayer(vec2 uv, float speed, float intensity, float offset) {
        float n = noise(uv * 25.0 + uTime * speed + offset);
        return smoothstep(0.4, 0.6, n) * intensity;
    }

    vec3 screen(vec3 base, vec3 blend) {
        return 1.0 - (1.0 - base) * (1.0 - blend);
    }

    vec3 softLight(vec3 base, vec3 blend) {
        return mix(
            sqrt(base) * (2.0 * blend - 1.0) + 2.0 * base * (1.0 - blend),
            1.0 - (1.0 - base) * (1.0 - blend),
            step(0.5, blend)
        );
    }

    vec3 linearLight(vec3 base, vec3 blend) {
        return clamp(base + 2.0 * blend - 1.0, 0.0, 1.0);
    }

    vec3 hardLight(vec3 base, vec3 blend) {
        return mix(
            2.0 * base * blend,
            1.0 - 2.0 * (1.0 - base) * (1.0 - blend),
            step(0.5, blend)
        );
    }

    void main() {
        vec2 uv = vUv;

        float n = noise(uv * 2.0);
        float angle = distance(uv, uMouse) * 8.0;

        vec3 holo = holoColor(uv, angle + n * 1.0);

        vec2 redUV = uv;// + angle * 0.003;
        vec2 greenUV = uv;
        vec2 blueUV = uv;// - angle * 0.003;

        vec4 red = texture2D(uTexture, redUV);
        vec4 green = texture2D(uTexture, greenUV);
        vec4 blue = texture2D(uTexture, blueUV);

        vec3 texColor = vec3(red.r, green.g, blue.b);

        vec3 normal = getNormal();

        vec3 final = screen(texColor, (holo * 0.75 + texColor * 0.25));

        gl_FragColor = vec4(final, red.a);
    }

  `
);

declare global {
  namespace JSX {
      interface IntrinsicElements {
          holoMaterial: ReactThreeFiber.ThreeElements['meshStandardMaterial'] & {
            uTime: 0,
            uProgress: 0,
            uMouse: [number, number],
            uTexture: Texture,
            uNormalMap: Texture,
          },
      }
  }
}

export { HoloMaterial };
