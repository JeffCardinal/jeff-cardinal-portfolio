"use client";

import { useEffect, useRef } from "react";

const GLYPHS = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZアイウエオカキクケコサシスセソ";
const CELL_SIZE = 24;
const TRAIL_LIFETIME = 2200;
const MAX_TRAIL_GLYPHS = 14;
type TrailGlyph = { y: number; character: string; born: number };

export default function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let columns: { y: number; speed: number; lastRow: number; trail: TrailGlyph[] }[] = [];
    let frame: number | null = null;
    let disposed = false;
    let width = -1;
    let height = -1;
    let lastDraw = 0;
    const glyph = () => GLYPHS[Math.floor(Math.random() * GLYPHS.length)];

    const paint = (now: number) => {
      // Repaint opaque pixels rather than blending over the previous frame.
      // Repeated alpha blending can leave rounded pixel values that never fade.
      context.fillStyle = "#10151c";
      context.fillRect(0, 0, canvas.width, canvas.height);
      columns.forEach((column, index) => {
        column.trail = column.trail.filter((entry) => now - entry.born < TRAIL_LIFETIME);
        column.trail.forEach((entry) => {
          const alpha = Math.pow(1 - (now - entry.born) / TRAIL_LIFETIME, 2);
          const color = index % 4 === 0 ? "196, 161, 236" : "152, 37, 230";
          context.fillStyle = `rgba(${color}, ${alpha})`;
          context.fillText(entry.character, index * CELL_SIZE, entry.y);
        });
      });
    };

    const resize = () => {
      if (disposed) return;
      if (width === canvas.clientWidth && height === canvas.clientHeight) return;
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      // One pixel per CSS pixel keeps this decorative layer inexpensive on phones.
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
      context.font = "16px monospace";
      const now = performance.now();
      columns = Array.from({ length: Math.ceil(canvas.width / CELL_SIZE) }, () => {
        const y = Math.floor(Math.random() * canvas.height / CELL_SIZE) * CELL_SIZE;
        const speed = 45 + Math.random() * 65;
        const trail = Array.from({ length: MAX_TRAIL_GLYPHS }, (_, index) => ({
          y: y - index * CELL_SIZE,
          character: glyph(),
          born: now - index * CELL_SIZE / speed * 1000,
        }));
        return { y, speed, lastRow: Math.floor(y / CELL_SIZE), trail };
      });
      paint(now);
    };

    const draw = (now: number) => {
      frame = null;
      if (disposed || motion.matches || document.hidden) return;
      frame = requestAnimationFrame(draw);
      if (now - lastDraw < 50) return;
      const delta = Math.min((now - lastDraw) / 1000, 0.1);
      lastDraw = now;
      columns.forEach((column) => {
        column.y += column.speed * delta;
        const row = Math.floor(column.y / CELL_SIZE);
        if (row !== column.lastRow) {
          column.trail.push({ y: row * CELL_SIZE, character: glyph(), born: now });
          if (column.trail.length > MAX_TRAIL_GLYPHS) column.trail.shift();
          column.lastRow = row;
        }
        if (column.y > canvas.height + CELL_SIZE) column.y = -Math.random() * canvas.height * 0.5;
      });
      paint(now);
    };

    const updateMotion = () => {
      if (frame !== null) cancelAnimationFrame(frame);
      frame = null;
      if (disposed) return;
      lastDraw = performance.now();
      if (!motion.matches && !document.hidden) frame = requestAnimationFrame(draw);
    };

    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    resize();
    updateMotion();
    motion.addEventListener("change", updateMotion);
    document.addEventListener("visibilitychange", updateMotion);
    return () => {
      disposed = true;
      if (frame !== null) cancelAnimationFrame(frame);
      frame = null;
      observer.disconnect();
      motion.removeEventListener("change", updateMotion);
      document.removeEventListener("visibilitychange", updateMotion);
      columns = [];
      // Release the canvas backing buffer, including during Strict Mode cleanup.
      canvas.width = 0;
      canvas.height = 0;
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full opacity-50"
      style={{ maskImage: "radial-gradient(ellipse at center, rgba(0,0,0,0.3), black)" }}
    />
  );
}
