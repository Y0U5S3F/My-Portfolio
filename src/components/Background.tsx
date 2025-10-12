// src/components/Stars.tsx
import React, { useRef, useEffect } from "react";

type Star = { x: number; y: number; z: number; r: number; vx: number; vy: number };

const Background: React.FC<{ count?: number }> = ({ count = 3000 }) => {
  const ref = useRef<HTMLCanvasElement | null>(null);
  const animRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;
    let w = (canvas.width = canvas.clientWidth);
    let h = (canvas.height = canvas.clientHeight);
    const cx = w / 2;
    const cy = h / 2;

    const rand = (min: number, max: number) =>
      Math.random() * (max - min) + min;

    // create stars in 3D-ish space
    const stars: Star[] = new Array(count).fill(0).map(() => ({
      x: rand(-w, w),
      y: rand(-h, h),
      z: rand(0.1, w),
      r: rand(0.3, 1.6),
      vx: rand(-0.02, 0.02),
      vy: rand(-0.02, 0.02),
    }));

    function resize() {
      w = canvas.width = canvas.clientWidth;
      h = canvas.height = canvas.clientHeight;
    }

    const render = () => {
      ctx.clearRect(0, 0, w, h);

      // subtle gradient background (optional)
      const g = ctx.createLinearGradient(0, 0, 0, h);
      g.addColorStop(0, "#000010");
      g.addColorStop(1, "#000016");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);

      for (const s of stars) {
        // move star slightly
        s.x += s.vx;
        s.y += s.vy;
        s.z -= 0.6; // move forward toward viewer

        if (s.z < 0.5) {
          // recycle star
          s.x = rand(-w, w);
          s.y = rand(-h, h);
          s.z = rand(w * 0.5, w);
          s.r = rand(0.3, 1.6);
        }

        // perspective projection
        const px = cx + (s.x / s.z) * (w / 2);
        const py = cy + (s.y / s.z) * (w / 2);
        const scale = (w / s.z) * 0.6;
        const radius = Math.max(0.2, s.r * scale);

        // twinkle via alpha oscillation
        const alpha = Math.min(1, Math.max(0.15, 0.5 + Math.sin((s.z + Date.now() * 0.002) / 50)));

        ctx.beginPath();
        ctx.fillStyle = `rgba(255,255,255,${alpha})`;
        ctx.arc(px, py, radius, 0, Math.PI * 2);
        ctx.fill();
      }

      animRef.current = requestAnimationFrame(render);
    };

    window.addEventListener("resize", resize);
    render();

    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [count]);

  return (
    <canvas
      ref={ref}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "none",
        display: "block",
      }}
    />
  );
};

export default Background;