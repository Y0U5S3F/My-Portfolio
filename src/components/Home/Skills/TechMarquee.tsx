import { TECH_ICONS } from "./TechIcons";

type Props = {
    color?: string; // color applied to all icons
    speed?: number; // seconds for one full loop
    size?: number; // px size for the square that contains the icon
    iconSize?: number; // icon size directly
    gap?: number; // px gap between icons
    direction?: "left" | "right";
};

export default function TechMarquee({
    color = "#61dafb",
    speed = 20,
    size = 106,
    iconSize = 80,
    gap = 16,
    direction = "left",
}: Props) {
    // We duplicate the icon set to create a seamless loop
    const icons = TECH_ICONS;

    // Keyframes depend on direction
    const from = direction === "left" ? "translateX(0)" : "translateX(-50%)";
    const to = direction === "left" ? "translateX(-50%)" : "translateX(0)";

    return (
        <div className="tech-marquee" aria-hidden>
            <style>{`
        .tech-marquee { overflow: hidden; width: 100%; }
        .marquee-track { display: flex; align-items: center; gap: ${gap}px; will-change: transform; }
        .marquee-inner { display: flex; align-items: center; gap: ${gap}px; }
        .marquee-track { animation-name: techMarqueeAnim; animation-timing-function: linear; animation-iteration-count: infinite; }
        @keyframes techMarqueeAnim { from { transform: ${from}; } to { transform: ${to}; } }
        .marquee-icon svg, .marquee-icon svg * { stroke: currentColor !important; }
        @media (prefers-reduced-motion: reduce) {
          .marquee-track { animation: none !important; }
        }
      `}</style>

            <div
                className="marquee-track"
                style={{
                    animationDuration: `${speed}s`,
                    color, // this sets currentColor for children SVGs
                }}
            >
                <div className="marquee-inner">
                    {icons.map((it) => (
                        <div key={it.label} className="marquee-icon" style={{ width: size, height: size, display: "flex", alignItems: "center", justifyContent: "center", flex: "0 0 auto" }}>
                            <it.Icon size={iconSize} />
                        </div>
                    ))}
                </div>

                {/* duplicated for seamless loop */}
                <div className="marquee-inner">
                    {icons.map((it) => (
                        <div key={it.label + "-dup"} className="marquee-icon" style={{ width: size, height: size, display: "flex", alignItems: "center", justifyContent: "center", flex: "0 0 auto" }}>
                            <it.Icon size={iconSize} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
