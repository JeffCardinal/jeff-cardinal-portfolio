import { ShaderMaterial, Texture, Vector2 } from "three";

export const LOADER_MELT_FRAGMENT_SHADER = `
  precision highp float;
  varying vec2 vUv;
  uniform float uProgress;
  uniform float uSeed;
  uniform float uAspect;
  uniform float uPass;
  uniform float uHasScene;
  uniform vec2 uTexel;
  uniform sampler2D uScene;

  const float EDGE_FADE_WIDTH = 0.01;
  const float RIM_WIDTH = 0.01;
  const float REFRACTION_STRENGTH = 0.25;

  // Stable variation for this melt: never reseed while the animation is running.
  float randomValue(float key) {
    return fract(sin(key * 127.1 + uSeed * 311.7) * 43758.5453);
  }

  float liquidDistance(vec2 uv) {
    // A continuous liquid surface sinks below the screen, revealing it top-down.
    float flow = sin(uProgress * 3.14159265);
    float baseSurface = mix(1.0 + EDGE_FADE_WIDTH + 0.05, -0.45, uProgress);
    float surface = baseSurface;
    float x = uv.x * uAspect;
    float phase = randomValue(1.0) * 6.2831853;
    surface += flow * (
      0.055 * sin(x * mix(7.0, 12.0, randomValue(2.0)) + uProgress * 4.0 + phase)
      + 0.025 * sin(x * mix(14.0, 20.0, randomValue(3.0)) - uProgress * 6.0 - phase)
    );

    // Rounded fingers stretch upward as the liquid drains downward.
    for (int i = 0; i < 6; i++) {
      float index = float(i);
      float key = 10.0 + index * 5.0;
      float dripPhase = randomValue(key) * 6.2831853;
      float center = (index + mix(0.2, 0.8, randomValue(key + 1.0))) * uAspect / 6.0;
      center += 0.025 * sin(uProgress * 5.0 + dripPhase);
      float width = mix(0.075, 0.035, uProgress) * mix(0.7, 1.4, randomValue(key + 2.0));
      float distance = (x - center) / width;
      float dripLength = 0.6 * (mix(0.1, 0.23, randomValue(key + 3.0))
        + 0.06 * sin(dripPhase + uProgress * 3.0));
      surface += flow * dripLength * exp(-distance * distance);
    }

    return uv.y - surface;
  }

  void main() {
    float distance = liquidDistance(vUv);
    // Thin the opaque goop into a broad translucent lip before its outer edge.
    float alpha = 1.0 - smoothstep(-EDGE_FADE_WIDTH, 0.014, distance);
    if (uPass < 0.5) {
      gl_FragColor = vec4(vec3(1.0), alpha);
      return;
    }

    float rim = 1.0 - smoothstep(0.006, RIM_WIDTH, abs(distance));
    vec2 gradient = vec2(
      liquidDistance(vUv + vec2(uTexel.x, 0.0)) - liquidDistance(vUv - vec2(uTexel.x, 0.0)),
      liquidDistance(vUv + vec2(0.0, uTexel.y)) - liquidDistance(vUv - vec2(0.0, uTexel.y))
    ) / (2.0 * uTexel);
    gradient.x /= uAspect;
    vec2 normal = normalize(gradient + vec2(0.00001));
    float lens = rim * REFRACTION_STRENGTH * sin(uProgress * 3.14159265);
    vec2 refractedUv = clamp(vUv + normal * lens / vec2(uAspect, 1.0), vec2(0.001), vec2(0.999));
    vec4 sceneColor = texture2D(uScene, refractedUv);
    float highlight = pow(max(dot(normal, normalize(vec2(-0.6, 0.8))), 0.0), 2.0);
    float crest = 1.0 - smoothstep(0.001, 0.01, abs(distance));
    vec3 color = sceneColor.rgb
      + vec3(0.65, 0.85, 1.0) * (highlight * 0.65 + crest * 0.25);
    // Keep the wider lens translucent, letting the undistorted scene show through.
    float coverage = rim * mix(highlight * 0.45 + crest * 0.2, 0.72, uHasScene * sceneColor.a);
    gl_FragColor = vec4(color, coverage);
  }
`;

type LoaderDissolveShaderOptions = {
  aspect: number;
  sceneTexture: Texture;
  texel: Vector2;
  seed: number;
};

export default class LoaderDissolveShaderMaterial extends ShaderMaterial {
  constructor({ aspect, sceneTexture, texel, seed }: LoaderDissolveShaderOptions) {
    super({
      uniforms: {
        uProgress: { value: 0 }, uAspect: { value: aspect },
        uSeed: { value: seed },
        uPass: { value: 0 }, uHasScene: { value: 0 },
        uScene: { value: sceneTexture },
        uTexel: { value: texel },
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = vec4(position.xy, 0.0, 1.0);
        }
      `,
      fragmentShader: LOADER_MELT_FRAGMENT_SHADER,
      transparent: true,
      depthTest: false,
      depthWrite: false,
      toneMapped: false,
    });
  }
}
