"use client";

import { useThree } from "@react-three/fiber";
import { useEffect } from "react";

type Capture = (context: CanvasRenderingContext2D) => void;
const sources = new Set<Capture>();

export function captureLoaderScene(context: CanvasRenderingContext2D): boolean {
  const capture = Array.from(sources).at(-1);
  if (!capture) return false;
  capture(context);
  return true;
}

export default function LoaderRefractionSource() {
  const { gl, scene, camera } = useThree();

  useEffect(() => {
    const capture: Capture = (context) => {
      // Copy immediately after rendering: the scene's drawing buffer needn't be preserved.
      const target = gl.getRenderTarget();
      gl.setRenderTarget(null);
      gl.render(scene, camera);
      gl.setRenderTarget(target);
      const rect = gl.domElement.getBoundingClientRect();
      const scaleX = context.canvas.width / window.innerWidth;
      const scaleY = context.canvas.height / window.innerHeight;
      context.drawImage(gl.domElement, rect.left * scaleX, rect.top * scaleY,
        rect.width * scaleX, rect.height * scaleY);
    };
    sources.add(capture);
    return () => { sources.delete(capture); };
  }, [gl, scene, camera]);

  return null;
}
