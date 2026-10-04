import {
  CanvasTexture, Mesh, OrthographicCamera, PlaneGeometry, Scene, Vector2, WebGLRenderer,
} from "three";
import { captureLoaderScene } from "./LoaderRefractionSource";
import LoaderDissolveShaderMaterial from "./shaders/LoaderDissolveShaderMaterial";

// A bounded-resolution WebGL mask lets the liquid shader reveal the live DOM visuals.
export function createLoaderDissolve(width: number, height: number, seed = Math.random() * 1000) {
  const renderer = new WebGLRenderer({ alpha: true, preserveDrawingBuffer: true, antialias: false });
  const resolutionScale = Math.min(1, 768 / Math.max(width, height));
  renderer.setPixelRatio(1);
  renderer.setSize(Math.max(1, Math.round(width * resolutionScale)), Math.max(1, Math.round(height * resolutionScale)), false);
  renderer.setClearColor(0x000000, 0);
  const sceneCanvas = document.createElement("canvas");
  sceneCanvas.width = renderer.domElement.width;
  sceneCanvas.height = renderer.domElement.height;
  const sceneContext = sceneCanvas.getContext("2d");
  const sceneTexture = new CanvasTexture(sceneCanvas);
  Object.assign(renderer.domElement.style, {
    position: "fixed", inset: "0", width: "100dvw", height: "100dvh",
    pointerEvents: "none", zIndex: "1000000",
  });
  renderer.domElement.setAttribute("aria-hidden", "true");

  const material = new LoaderDissolveShaderMaterial({
    aspect: width / height,
    sceneTexture,
    texel: new Vector2(1 / sceneCanvas.width, 1 / sceneCanvas.height),
    seed,
  });
  const geometry = new PlaneGeometry(2, 2);
  const scene = new Scene();
  scene.add(new Mesh(geometry, material));
  const camera = new OrthographicCamera(-1, 1, 1, -1, 0, 1);

  return {
    edgeCanvas: renderer.domElement,
    render(progress: number) {
      material.uniforms.uProgress.value = progress;
      material.uniforms.uPass.value = 0;
      renderer.render(scene, camera);
      const mask = `url("${renderer.domElement.toDataURL("image/png")}")`;
      if (sceneContext) {
        sceneContext.clearRect(0, 0, sceneCanvas.width, sceneCanvas.height);
        material.uniforms.uHasScene.value = captureLoaderScene(sceneContext) ? 1 : 0;
        sceneTexture.needsUpdate = true;
      }
      material.uniforms.uPass.value = 1;
      renderer.render(scene, camera);
      return mask;
    },
    dispose() {
      geometry.dispose();
      material.dispose();
      sceneTexture.dispose();
      renderer.domElement.remove();
      renderer.dispose();
      renderer.forceContextLoss();
    },
  };
}
