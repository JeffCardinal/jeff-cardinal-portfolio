import { useEffect, useRef } from "react";
import {
  Mesh,
  OrthographicCamera,
  PlaneGeometry,
  Scene,
  ShaderMaterial,
  Vector2,
  WebGLRenderer,
} from "three";

const vertexShader = `
  void main() {
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

const fragmentShader = `
  precision highp float;
  uniform float uTime;
  uniform float uSeed;
  uniform vec2 uResolution;

  float sphereDistance(vec3 p, vec3 center, float radius) {
    return length(p - center) - radius;
  }

  float smoothUnion(float a, float b, float softness) {
    float h = max(softness - abs(a - b), 0.0) / softness;
    return min(a, b) - h * h * softness * 0.25;
  }

  float sceneDistance(vec3 p) {
    float time = uTime * 2.5 + uSeed;
    vec3 movingPoint = p - vec3(0.25 * sin(time * 0.25), 0.0, 0.0);
    vec3 movingPoint2 = p - vec3(0.55 * sin(time * 0.55), 0.0, 0.0);
    float first = sphereDistance(movingPoint, vec3(-0.44 + 0.30 * sin(time * 0.9), 0.14 * cos(time * 1.1), 0.0), 0.93);
    float second = sphereDistance(movingPoint2, vec3(0.84 * cos(time * 0.8), 0.62 * sin(time), 0.04), 0.72);
    float third = sphereDistance(movingPoint, vec3(0.50 * sin(time * 1.2), -0.94 * cos(time * 0.72), -0.16), 0.51);
    float fourth = sphereDistance(movingPoint2, vec3(-0.94 + 0.30 * sin(time * 0.9), 0.70 + 0.14 * cos(time * 1.1), 0.08), 0.42);
    float fifth = sphereDistance(movingPoint, vec3(1.26 * cos(time * 0.8), 0.62 * sin(time) - 0.48, -0.12), 0.40);
    float orbiterOne = sphereDistance(movingPoint2, vec3(1.45 * cos(time * 0.72), 0.95 * sin(time * 0.72), 0.12 * sin(time * 0.72)), 0.44);
    float orbiterTwo = sphereDistance(movingPoint, vec3(1.12 * cos(time * 0.72 + 2.1), 1.42 * sin(time * 0.72 + 2.1), -0.10 * sin(time * 0.72 + 2.1)), 0.36);
    float orbiterThree = sphereDistance(movingPoint2, vec3(1.62 * cos(time * 0.72 + 4.2), 0.72 * sin(time * 0.72 + 4.2), 0.08 * cos(time * 0.72 + 4.2)), 0.30);

    float merged = smoothUnion(smoothUnion(first, second, 0.38), third, 0.34);
    merged = smoothUnion(merged, fourth, 0.32);
    merged = smoothUnion(merged, fifth, 0.32);
    merged = smoothUnion(merged, orbiterOne, 0.2);
    merged = smoothUnion(merged, orbiterTwo, 0.2);
    return smoothUnion(merged, orbiterThree, 0.2);
  }

  vec3 surfaceNormal(vec3 p) {
    const float e = 0.004;
    return normalize(vec3(
      sceneDistance(p + vec3(e, 0.0, 0.0)) - sceneDistance(p - vec3(e, 0.0, 0.0)),
      sceneDistance(p + vec3(0.0, e, 0.0)) - sceneDistance(p - vec3(0.0, e, 0.0)),
      sceneDistance(p + vec3(0.0, 0.0, e)) - sceneDistance(p - vec3(0.0, 0.0, e))
    ));
  }

  void main() {
    vec2 point = (2.0 * gl_FragCoord.xy - uResolution) / min(uResolution.x, uResolution.y);
    vec3 rayOrigin = vec3(0.0, 0.0, 3.4);
    vec3 rayDirection = normalize(vec3(point * 0.83, -1.0));
    float distanceAlongRay = 0.0;
    bool hit = false;
    vec3 position = rayOrigin;

    for (int i = 0; i < 40; i++) {
      position = rayOrigin + rayDirection * distanceAlongRay;
      float distanceToSurface = sceneDistance(position);
      if (distanceToSurface < 0.003) {
        hit = true;
        break;
      }
      distanceAlongRay += max(distanceToSurface * 0.8, 0.01);
      if (distanceAlongRay > 7.0) break;
    }

    if (!hit) {
      gl_FragColor = vec4(0.0);
      return;
    }

    vec3 normal = surfaceNormal(position);
    vec3 lightDirection = normalize(vec3(-0.55, 0.8, 1.4));
    vec3 viewDirection = normalize(rayOrigin - position);
    float diffuse = max(dot(normal, lightDirection), 0.0);
    float specular = pow(max(dot(reflect(-lightDirection, normal), viewDirection), 0.0), 36.0);
    float fresnel = pow(1.0 - max(dot(normal, viewDirection), 0.0), 3.0);
    vec3 color = mix(vec3(1.0, 0.0, 0.0), vec3(1.0, 0.4, 1.0), diffuse * 0.75 + 0.16);
    color = color * (0.42 + diffuse * 0.82)
      + vec3(1.0) * specular * 0.85
      + vec3(0.22, 0.42, 0.9) * fresnel * 0.5;
    gl_FragColor = vec4(color, 1.0);
  }
`;

export default function MetaballLoader() {
  const canvasContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = canvasContainerRef.current;
    if (!container) return;

    let renderer: WebGLRenderer | undefined;
    let geometry: PlaneGeometry | undefined;
    let material: ShaderMaterial | undefined;
    let resizeObserver: ResizeObserver | undefined;
    let animationFrame = 0;

    try {
      renderer = new WebGLRenderer({ alpha: true, antialias: false, powerPreference: "low-power" });
      renderer.setClearColor(0x000000, 0);
      renderer.domElement.setAttribute("aria-hidden", "true");
      Object.assign(renderer.domElement.style, { display: "block", width: "100%", height: "100%" });
      container.appendChild(renderer.domElement);

      const uniforms = {
        uTime: { value: 0 },
        uSeed: { value: Math.random() * Math.PI * 2 },
        uResolution: { value: new Vector2(1, 1) },
      };
      material = new ShaderMaterial({
        uniforms,
        vertexShader,
        fragmentShader,
        transparent: true,
        depthTest: false,
        depthWrite: false,
        toneMapped: false,
      });
      geometry = new PlaneGeometry(2, 2);
      const scene = new Scene();
      scene.add(new Mesh(geometry, material));
      const camera = new OrthographicCamera(-1, 1, 1, -1, 0, 1);
      const isMobile = window.matchMedia("(pointer: coarse)").matches;

      const resize = () => {
        const { width, height } = container.getBoundingClientRect();
        if (width <= 0 || height <= 0 || !renderer) return;
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isMobile ? 0.4 : 0.65));
        renderer.setSize(width, height, false);
        uniforms.uResolution.value.set(renderer.domElement.width, renderer.domElement.height);
      };
      resizeObserver = new ResizeObserver(resize);
      resizeObserver.observe(container);
      resize();

      const start = performance.now();
      const frameInterval = 1000 / 30;
      let lastRender = -Infinity;
      const render = (now: number) => {
        if (now - lastRender >= frameInterval) {
          uniforms.uTime.value = (now - start) / 1000;
          renderer?.render(scene, camera);
          lastRender = now;
        }
        animationFrame = requestAnimationFrame(render);
      };
      animationFrame = requestAnimationFrame(render);
    } catch {
      resizeObserver?.disconnect();
      cancelAnimationFrame(animationFrame);
      geometry?.dispose();
      material?.dispose();
      renderer?.dispose();
      renderer?.domElement.remove();
    }

    return () => {
      resizeObserver?.disconnect();
      cancelAnimationFrame(animationFrame);
      geometry?.dispose();
      material?.dispose();
      renderer?.dispose();
      renderer?.forceContextLoss();
      renderer?.domElement.remove();
    };
  }, []);

  return (
    <div ref={canvasContainerRef} className="relative h-[400px] w-[400px]">
    </div>
  );
}