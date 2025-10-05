// Skills.tsx
import React from "react";
import TechMarquee from "./Skills/TechMarquee";

const Skills: React.FC = () => {
  return (
    <section
      style={{
        padding: "100px 0",
        textAlign: "center",
        background: "var(--neutral-100)",
      }}
    >
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 20px" }}>
        <h1 style={{
          margin: 0,
          fontSize: "2.25rem",
          lineHeight: 1.1,
          color: "var(--neutral-1200)",
        }}>
          Tech Stack & Capabilities
        </h1>

        <p
          style={{
            marginTop: 12,
            color: "var(--neutral-900)",
            fontSize: "1.05rem",
            maxWidth: 680,
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          My work spans the full technology stack.
          from modern front-end frameworks and
          scalable back-end systems to databases, DevOps tools,
          and containerization. Below is a selection of the
          technologies I regularly use to build efficient,
          reliable, and maintainable solutions.
        </p>

        <div style={{ marginTop: 36 }}>
          <TechMarquee color="var(--neutral-1200)" speed={14} size={128} iconSize={75} gap={25} direction="left" />
        </div>
      </div>
    </section>
  );
};

export default Skills;