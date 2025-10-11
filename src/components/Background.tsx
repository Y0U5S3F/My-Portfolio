import React, { useEffect, useRef, useState } from "react";

type VantaEffect = "GLOBE" | "TOPOLOGY" | "WAVES" | "BIRDS" | "FOG" | "CLOUDS" | "NET" | "CELLS" | "TRUNK" | "HALO" | "RINGS";

type Props = {
  effect?: VantaEffect;
  backgroundColor?: number;
  color?: number;
  color2?: number;
  size?: number;
  showDebug?: boolean;
  style?: React.CSSProperties;
  className?: string;
};

const VANTA_SCRIPTS: Record<VantaEffect, string> = {
  GLOBE: "https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.globe.min.js",
  TOPOLOGY: "https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.topology.min.js",
  WAVES: "https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.waves.min.js",
  BIRDS: "https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.birds.min.js",
  FOG: "https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.fog.min.js",
  CLOUDS: "https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.clouds.min.js",
  NET: "https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.net.min.js",
  CELLS: "https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.cells.min.js",
  TRUNK: "https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.trunk.min.js",
  HALO: "https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.halo.min.js",
  RINGS: "https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.rings.min.js",
};

// Track loaded scripts globally to prevent re-loading
const loadedScripts = new Set<string>();
const initializingEffects = new Map<string, boolean>();

const Background: React.FC<Props> = ({
  effect = "GLOBE",
  backgroundColor = 0x23153c,
  color = 0xff3f81,
  color2 = 0xffffff,
  size = 1,
  showDebug = false,
  style,
  className,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const effectRef = useRef<any>(null);
  const [debug, setDebug] = useState<string>("Initializing...");
  const mountedRef = useRef(true);
  const effectKey = `${effect}-${backgroundColor}-${color}`;

  useEffect(() => {
    mountedRef.current = true;

    const loadScript = (src: string, name: string): Promise<void> => {
      return new Promise((resolve, reject) => {
        if (loadedScripts.has(src)) {
          setDebug(`${name} cached`);
          resolve();
          return;
        }

        const existing = document.querySelector(`script[src="${src}"]`);
        if (existing) {
          loadedScripts.add(src);
          setDebug(`${name} already loaded`);
          resolve();
          return;
        }

        setDebug(`Loading ${name}...`);
        const script = document.createElement("script");
        script.src = src;
        script.async = false;
        script.onload = () => {
          loadedScripts.add(src);
          setDebug(`✅ ${name} loaded`);
          resolve();
        };
        script.onerror = () => {
          setDebug(`❌ ${name} failed`);
          reject(new Error(`Failed to load ${name}`));
        };
        document.head.appendChild(script);
      });
    };

    const initVanta = () => {
      if (initializingEffects.get(effectKey)) {
        return false;
      }

      const VANTA = (window as any).VANTA;
      const THREE = (window as any).THREE;

      if (!THREE || !VANTA || !VANTA[effect]) {
        return false;
      }

      if (!mountedRef.current || !containerRef.current) {
        return false;
      }

      // Only destroy if we're changing effects
      if (effectRef.current && effectRef.current.effectName !== effect) {
        try {
          effectRef.current.destroy();
        } catch (e) {
          console.error("Error destroying:", e);
        }
        effectRef.current = null;
      }

      // Don't re-init if already running
      if (effectRef.current) {
        setDebug(`✅ ${effect} running`);
        return true;
      }

      try {
        initializingEffects.set(effectKey, true);
        setDebug(`Initializing ${effect}...`);
        
        effectRef.current = VANTA[effect]({
          el: containerRef.current,
          THREE: THREE,
          backgroundColor,
          color,
          color2,
          size,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          scale: 1.0,
          scaleMobile: 1.0,
        });
        
        effectRef.current.effectName = effect;
        
        setDebug(`✅ ${effect} running`);
        initializingEffects.set(effectKey, false);
        return true;
      } catch (err) {
        console.error("❌ Vanta init failed:", err);
        setDebug(`❌ Init error`);
        initializingEffects.set(effectKey, false);
        return false;
      }
    };

    const init = async () => {
      try {
        if (!(window as any).THREE) {
          await loadScript(
            "https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js",
            "THREE.js"
          );
          await new Promise(resolve => setTimeout(resolve, 50));
        }
        
        await loadScript(VANTA_SCRIPTS[effect], `Vanta ${effect}`);
        await new Promise(resolve => setTimeout(resolve, 50));
        
        if (mountedRef.current) {
          initVanta();
        }
      } catch (err) {
        console.error("Script loading failed:", err);
        setDebug(`❌ Script load failed`);
      }
    };

    init();

    return () => {
      mountedRef.current = false;
      // DON'T destroy the effect on unmount - let it keep running
      // Only destroy if we're actually removing the component permanently
    };
  }, [effect, backgroundColor, color, color2, size, effectKey]);

  return (
    <>
      {showDebug && (
        <div
          style={{
            position: "fixed",
            top: 10,
            right: 10,
            background: "rgba(0,0,0,0.8)",
            color: "white",
            padding: "10px",
            borderRadius: "5px",
            zIndex: 9999,
            fontSize: "12px",
            fontFamily: "monospace",
          }}
        >
          {debug}
        </div>
      )}
      
      <div
        ref={containerRef}
        className={className}
        style={{
          width: "100%",
          height: "100%",
          ...style,
        }}
      />
    </>
  );
};

export default Background;