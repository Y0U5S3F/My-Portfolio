import React, { useEffect, useRef, useState } from "react";
import { Grid, Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import { motion } from "framer-motion";
import AboutMeShape from "./Shapes/AboutMeShape";

const MotionBox = motion(Box);

const AboutMe: React.FC = () => {
  const [shouldRender, setShouldRender] = useState(false);
  const [inView, setInView] = useState(false);
  const rootRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShouldRender(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const node = rootRef.current;
    if (!node) return;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            obs.unobserve(node);
          }
        });
      },
      { threshold: 0.25 }
    );

    obs.observe(node);
    return () => obs.disconnect();
  }, []);

  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down("sm"));
  const shapeScale = isXs ? 0.15 : 0.2;

  const textInitial = isXs ? { y: 60, opacity: 0 } : { x: -200, opacity: 0 };
  const shapeInitial = isXs ? { y: 60, opacity: 0 } : { x: 200, opacity: 0 };
  const visible = { x: 0, y: 0, opacity: 1 };
  const transition = { duration: 1.5, Easing: "easeOut" };

  return (
    <Box
      id="aboutme"
      ref={rootRef as any}
      display="flex"
      flexDirection="column"
      sx={{
        maxHeight: "60vh",
        width: "100%",
      }}
    >
      <Grid
        container
        spacing={4}
        alignItems="center"
        justifyContent="center"
        sx={{ width: "100%", mx: "auto", maxWidth: 1600 }}
      >
        <Grid size={{ xs: 12, lg: 6 }}>
          <MotionBox
            initial={textInitial}
            animate={inView ? visible : undefined}
            transition={transition}
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems={{ xs: "center", lg: "flex-start" }}
            textAlign={{ xs: "center", lg: "left" }}
            sx={{
              width: "100%",
              maxWidth: { xs: "100%", lg: 640 },
              mx: "auto",
              py: { xs: 4, lg: 0 },
            }}
          >
            <Typography
              variant="h3"
              sx={{
                fontWeight: 700,
                color: "var(--neutral-1200)",
                mb: 3,
              }}
            >
              Hi, I'm {" "}
              <Box component="span" sx={{ color: "var(--main-dark)" }}>
                Youssef
              </Box>
            </Typography>

            <Typography
              variant="h6"
              sx={{
                color: "var(--neutral-900)",
                maxWidth: { xs: "100%", lg: 600 },
                lineHeight: 1.6,
              }}
            >
              A <strong>full-stack developer</strong> and a {" "}
              <strong>computer science graduate</strong>. Passionate about
              crafting clean, efficient, and aesthetic digital experiences.
              I love working with modern frameworks, building seamless
              front-ends, and scalable back-ends.
            </Typography>
          </MotionBox>
        </Grid>

        <Grid size={{ xs: 12, lg: 6 }}>
          <MotionBox
            initial={shapeInitial}
            animate={inView ? visible : undefined}
            transition={{ ...transition, delay: 0.08 }}
            sx={{
              width: "100%",
              height: { xs: "60vh", lg: "60vh" },
              position: "relative",
            }}
          >
            {shouldRender && (
              <Box
                sx={{
                  position: "absolute",
                  top: { xs: "-100px", lg: "90px" },
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  pointerEvents: "none",
                }}
              >
                <AboutMeShape scale={shapeScale} position={[0, 0, 0]} />
              </Box>
            )}
          </MotionBox>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AboutMe;