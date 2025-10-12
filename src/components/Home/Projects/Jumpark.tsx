import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import { motion } from "framer-motion";
import image from "../../../assets/JumparkLogoWhite.svg";
import backgroundImage from "../../../assets/SplashJumpark.png"
const MotionBox = motion(Box);

const Jumpark: React.FC = () => {
  // text entrance
  const commonVariant = {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
  };
  const commonTransition = { duration: 0.5, easing: [0.2, 0.8, 0.2, 1], delay: 0.08 };

  const squareVariant = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    hover: {},
  };

  const iconVariant = {
    initial: { opacity: 0, scale: 0.7 },
    animate: { opacity: 1, scale: 1 },
    hover: { scale: 1.1 },
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
          {/* Replace your existing MotionBox / motion.img with this block */}
          <MotionBox
            variants={squareVariant}
            initial="initial"
            animate="animate"
            // parent drives hover state for the whole square
            whileHover="hover"
            transition={commonTransition}
            sx={{
              width: { xs: "56%", sm: "48%", md: "clamp(260px, 45vw, 620px)" },
              minWidth: { xs: 120, md: 220 },
              maxWidth: 480,
              aspectRatio: "1 / 1",
              backgroundImage: `url(${backgroundImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
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
              cursor: "pointer", // optional, makes it clear it's interactive
            }}
          >
            <motion.img
              src={image}
              alt="GlossedUp logo"
              loading="lazy"
              variants={iconVariant}
              // remove child's initial/animate props so it inherits from parent
              transition={{
                scale: { duration: 0.18, ease: [0.2, 0.8, 0.2, 1] },
                default: { duration: commonTransition.duration, ease: [0.2, 0.8, 0.2, 1] },
              }}
              style={{
                width: "90%",
                height: "90%",
                objectFit: "contain",
                display: "block",
                pointerEvents: "none", // disable pointer events on the image so parent receives hover consistently
              }}
            />
          </MotionBox>
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
              Jumpark HR
            </Typography>

            <Typography variant="body1" sx={{ color: "var(--neutral-900)", lineHeight: 1.6, textAlign: "left", fontSize: { xs: 14, md: 18, lg: 22 }, py: 2 }}>
              JumparkHR is an HR management platform
              designed specifically for Jumpark,a Tunisian indoor trampoline park.
              Built using Django and React, it delivers a seamless
              and efficient experience for managing
              HR tasks with precision and ease.
            </Typography>

            <Typography variant="body1" sx={{ color: "var(--neutral-900)", lineHeight: 1.6, textAlign: "left", fontSize: { xs: 14, md: 18, lg: 22 }, py: 2 }}>
              The platform features real-time
              employee tracking through connections to
              pointing devices, enabling accurate monitoring of
              staff activities. It also includes payslip creation,
              comprehensive employee management, absence tracking
              , and a host of other essential HR functions.
              From development to deployment,
              JumparkHR was built with performance, scalability,
              and user experience as top priorities.
            </Typography>
          </MotionBox>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Jumpark;