// Skills.tsx
import React from "react";
import TechMarquee from "./Skills/TechMarquee";
import { Box } from "@mui/material";

const Skills: React.FC = () => {
  return (
    <Box
      id="skills"
      sx={{
        minHeight: "70vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: { xs: 3, md: 10 },
        position: "relative",
        overflow: "hidden",
      }}
    >
      <section
        style={{
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 20px" }}>
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
            My work spans the full technology stack —
            from building dynamic front-ends with React
            to developing robust back-ends using Django
            and PostgreSQL. I have prior experience with
            Spring Boot, Angular, and PHP, and I enjoy
            exploring areas like computer vision in my
            spare time. I regularly work with tools and
            technologies that help me build efficient,
            reliable, and maintainable solutions across
            the stack.
          </p>

          <div style={{ marginTop: 128 }}>
            {/* wrapper that applies the fade mask */}
            <div
              style={{
                position: "relative",
                overflow: "hidden",
                WebkitMaskImage:
                  "linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 12%, rgba(0,0,0,1) 88%, rgba(0,0,0,0) 100%)",
                maskImage:
                  "linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 12%, rgba(0,0,0,1) 88%, rgba(0,0,0,0) 100%)",
              }}
            >
              <TechMarquee
                color="var(--neutral-1200)"
                speed={10}
                size={128}
                iconSize={85}
                gap={20}
                direction="left"
              />
            </div>
          </div>
        </div>
      </section>
    </Box>
  );
};

export default Skills;