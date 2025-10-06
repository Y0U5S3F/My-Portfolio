import React, { useRef, useEffect } from "react";
import { Box, Grid, Typography } from "@mui/material";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
  MotionValue,
} from "framer-motion";
import image from "../../../assets/glossedup.png";

const MotionImg = motion.img;
const MotionBox = motion(Box);

const Jumpark: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const inView = useInView(containerRef, { amount: 0 });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // overall opacity/scale
  const rawOpacity = useTransform(scrollYProgress, [0, 0.25, 1], [0, 1, 1]);
  const rawScale = useTransform(scrollYProgress, [0, 1], [0.98, 1]);

  // vertical motion: both elements come from below (down -> up)
  const rawImgY = useTransform(scrollYProgress, [0, 1], [60, 0]);
  const rawTextY = useTransform(scrollYProgress, [0, 1], [40, 0]);

  const opacity = useSpring(rawOpacity, { stiffness: 120, damping: 20 });
  const scale = useSpring(rawScale, { stiffness: 120, damping: 20 });
  const imgY = useSpring(rawImgY, { stiffness: 150, damping: 25 });
  const textY = useSpring(rawTextY, { stiffness: 150, damping: 25 });

  useEffect(() => {
    if (!inView) {
      (imgY as MotionValue<number>).set(60);
      (textY as MotionValue<number>).set(40);
      (opacity as MotionValue<number>).set(0);
      (scale as MotionValue<number>).set(0.98);
    }
  }, [inView, imgY, textY, opacity, scale]);

  return (
    <Box
      ref={containerRef}
      sx={{
        py: 6,
        px: { xs: 3, md: 10 },
        background: "var(--neutral-200)",
        minHeight: { xs: "auto", md: "50vh" },
      }}
    >
      <Grid container spacing={4} alignItems="center">
        {/* Left: text (60%) */}
        <Grid
          size={{ xs: 12, md: 7 }}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "flex-start",
            textAlign: "left",
            pr: { xs: 0, md: 2 },
          }}
        >
          <MotionBox style={{ y: textY, opacity }} sx={{ width: "100%" }}>
            <Typography
              variant="h4"
              component="h2"
              sx={{ fontWeight: 700, mb: 2, color: "var(--neutral-1200)" }}
            >
              Jumpark
            </Typography>

            <Typography variant="body1" sx={{ color: "var(--neutral-900)", lineHeight: 1.6 }}>
              Jumpark is a dynamic section where both text and image rise into place as you scroll. The image sits
              on the right and the content pushes up from below for a playful, energetic entrance.
            </Typography>
          </MotionBox>
        </Grid>

        {/* Right: image (40%) */}
        <Grid
          size={{ xs: 12, md: 5 }}
          sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
        >
          <Box
            sx={{
              width: { xs: "70%", sm: "70%", md: "100%" },
              maxWidth: 640,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <MotionImg
              src={image}
              alt="Jumpark"
              loading="lazy"
              style={{
                width: "100%",
                height: "auto",
                y: imgY,
                opacity,
                scale,
                borderRadius: 8,
                boxShadow: "var(--mui-shadow-3)",
                display: "block",
              }}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Jumpark;
