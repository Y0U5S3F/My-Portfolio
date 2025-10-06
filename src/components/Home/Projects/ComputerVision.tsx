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

const ComputerVision: React.FC = () => {
  // container ref for scroll target
  const containerRef = useRef<HTMLDivElement | null>(null);

  // detect when the section is in view
  const inView = useInView(containerRef, { amount: 0 });

  // scroll progress relative to the container (0..1)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // mapped motion values
  const rawY = useTransform(scrollYProgress, [0, 1], [40, 0]);
  const rawOpacity = useTransform(scrollYProgress, [0, 0.25, 1], [0, 1, 1]);
  const rawScale = useTransform(scrollYProgress, [0, 1], [0.98, 1]);

  // horizontal motion: image slides in from the right, text slides in from the left
  const rawImgX = useTransform(scrollYProgress, [0, 1], [40, 0]);
  const rawTextX = useTransform(scrollYProgress, [0, 1], [-40, 0]);

  // springs for smoothness
  const y = useSpring(rawY, { stiffness: 150, damping: 25 });
  const opacity = useSpring(rawOpacity, { stiffness: 120, damping: 20 });
  const scale = useSpring(rawScale, { stiffness: 120, damping: 20 });
  const imgX = useSpring(rawImgX, { stiffness: 150, damping: 25 });
  const textX = useSpring(rawTextX, { stiffness: 150, damping: 25 });

  // keep starting state while out of view
  useEffect(() => {
    if (!inView) {
      (y as MotionValue<number>).set(40);
      (opacity as MotionValue<number>).set(0);
      (scale as MotionValue<number>).set(0.98);
      (imgX as MotionValue<number>).set(40);
      (textX as MotionValue<number>).set(-40);
    }
  }, [inView, y, opacity, scale, imgX, textX]);

  return (
    <Box
      ref={containerRef}
      sx={{
        py: 6,
        px: { xs: 3, md: 10 },
        background: "var(--neutral-200)",
        // ensure enough vertical space so vertical centering works nicely
        minHeight: { xs: "auto", md: "50vh" },
      }}
    >
      <Grid container spacing={4} alignItems="center">
        {/* Left: text column (60%) */}
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
          {/* wrap text in a motion Box so it moves in with the scroll */}
          <MotionBox style={{ x: textX, opacity }} sx={{ width: "100%" }}>
            <Typography
              variant="h4"
              component="h2"
              sx={{ fontWeight: 700, mb: 2, color: "var(--neutral-1200)" }}
            >
              ComputerVision
            </Typography>

            <Typography
              variant="body1"
              sx={{ color: "var(--neutral-900)", lineHeight: 1.6 }}
            >
              ComputerVision is a sleek UI element that combines a strong visual with a modern textual layout. The
              image sits on the right and the text on the left. Both parts slide into place as you scroll —
              the text comes from the left and the image from the right.
            </Typography>
          </MotionBox>
        </Grid>

        {/* Right: image column (40%) */}
        <Grid
          size={{ xs: 12, md: 5 }}
          sx={{
            display: "flex",
            alignItems: "center", // vertical center inside the column
            justifyContent: "center", // horizontal center
          }}
        >
          {/* control image size responsively here */}
          <Box
            sx={{
              width: { xs: "70%", sm: "70%", md: "100%" }, // tweak these if you want the img bigger/smaller
              maxWidth: 640,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <MotionImg
              src={image}
              alt="ComputerVision"
              loading="lazy"
              style={{
                width: "100%",
                height: "auto",
                x: imgX,
                y,
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

export default ComputerVision;
