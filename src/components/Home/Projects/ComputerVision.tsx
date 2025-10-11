import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import { motion } from "framer-motion";
import image from "../../../assets/ComputerVision.png";

const MotionBox = motion(Box);

const ComputerVision: React.FC = () => {
  // text entrance
  const commonVariant = {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
  };
  const commonTransition = { duration: 0.5, easing: [0.2, 0.8, 0.2, 1], delay: 0.08 };

  // square fade
  const squareVariant = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
  };

  return (
    <Box
      sx={{
        py: 6,
        px: { xs: 3, md: 0 },
        minHeight: { xs: "auto", md: "60vh" },
        width: "100%",
        overflow: "hidden",
        boxSizing: "border-box",
      }}
    >
      <Grid
        container
        /* responsive vertical alignment: center on small screens, top (flex-start) on md+ */
        sx={{
          gap: { xs: 4, md: 0 },
          alignItems: { xs: "center", md: "flex-start" },
        }}
      >
        {/* IMAGE */}
        <Grid
          size={{ xs: 12, md: 6, lg: 4, xl: 3 }}
          sx={{
            order: { xs: 2, md: 1 },
            display: "flex",
            justifyContent: { xs: "center", md: "flex-start" },
            alignItems: "center", // keeps the square vertically centered within its column
            height: "100%",
            px: { xs: 0, md: 0 },
          }}
        >
          <MotionBox
            variants={squareVariant}
            initial="initial"
            animate="animate"
            transition={commonTransition}
            sx={{
              width: { xs: "56%", sm: "48%", md: "clamp(260px, 45vw, 620px)" },
              minWidth: { xs: 120, md: 220 },
              maxWidth: 480,
              aspectRatio: "1 / 1",
              backgroundImage: `url(${image})`, // ✅ this makes it display the image
              backgroundSize: "cover",                    // fills the MotionBox nicely
              backgroundPosition: "center",               // centers the image
              backgroundRepeat: "no-repeat",              // no tiling
              borderTopRightRadius: { xs: "12px", md: "12px" },
              borderBottomRightRadius: { xs: "12px", md: "12px" },
              borderTopLeftRadius: 0,
              borderBottomLeftRadius: 0,
              boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
              transformOrigin: "center center",
              p: 2,
            }}
          ></MotionBox>
        </Grid>

        {/* TEXT */}
        <Grid
          size={{ xs: 12, md: 6 }}
          sx={{
            order: { xs: 1, md: 2 },
            px: { xs: 0, md: 6 },

            /* ensure the text column stacks content from the top-left */
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start", // left align horizontally
            justifyContent: "flex-start", // top align vertically
          }}
        >
          <MotionBox
            variants={commonVariant}
            initial="initial"
            animate="animate"
            transition={commonTransition}
            sx={{ width: "100%" }}
          >
            <Typography
              variant="h4"
              component="h2"
              sx={{ fontWeight: 700, mb: 2, color: "var(--neutral-1200)", textAlign: "left", fontSize: { xs: 22, md: 30, lg: 40 } }}
            >
              Computer Vision Project
            </Typography>

            <Typography variant="body1" sx={{ color: "var(--neutral-900)", lineHeight: 1.6, textAlign: "left", fontSize: { xs: 14, md: 18, lg: 22 }, py: 2 }}>
              This computer vision project uses Python, TensorFlow,
              YOLOv8, and Tesseract OCR to build a real-time vehicle monitoring system.
              YOLOv8 handles vehicle detection, while license plates are localized
              using a custom Roboflow model. Plate text is read with EasyOCR and
              classified to identify whether the plate is Tunisian or not.
            </Typography>

            <Typography variant="body1" sx={{ color: "var(--neutral-900)", lineHeight: 1.6, textAlign: "left", fontSize: { xs: 14, md: 18, lg: 22 }, py: 2 }}>
              To estimate vehicle speed,
              a perspective-corrected algorithm was
              implemented. It calculates speed based on
              the time taken for a vehicle to travel
              between two defined points, correcting for
              camera angle and distortion to improve
              measurement accuracy. If a vehicle exceeds
              the defined speed limit, it is automatically
              highlighted in red.
            </Typography>
          </MotionBox>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ComputerVision;