import { Box, Grid, Typography, Button } from "@mui/material";
import { motion } from "framer-motion";
import AboutMeShape from "./Shapes/AboutMeShape";

const MotionBox = motion(Box);
const MotionDiv = motion.div;

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      // stagger the children so text parts appear slightly one after the other
      staggerChildren: 0.10,
      when: "beforeChildren",
    },
  },
};

const textVariant = {
  hidden: { x: -80, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 120, damping: 16, duration: 0.6 },
  },
};

const subTextVariant = {
  hidden: { x: -40, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 100, damping: 14, duration: 0.6 },
  },
};

const shapeVariant = {
  hidden: { x: 100, opacity: 0, scale: 0.98 },
  visible: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 90, damping: 14, duration: 0.8 },
  },
};

const AboutMe = () => {
  return (
    <Box
      id="aboutme"
      sx={{
        minHeight: "70vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: { xs: 3, md: 6 },
        position: "relative",
        overflow: "visible",
      }}
    >
      <Grid
        container
        spacing={4}
        alignItems="center"
        sx={{
          maxWidth: "1400px",
          width: "100%",
        }}
      >
        <Grid size={{ xs: 12, lg: 6 }}>
          <MotionDiv
            // animate when in view once
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={containerVariants}
          >
            <MotionDiv variants={textVariant}>
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 700,
                  color: "var(--neutral-1200)",
                  mb: 3,
                }}
              >
                Hi, I'm{" "}
                <Box component="span" sx={{ color: "var(--main-dark)" }}>
                  Youssef
                </Box>
              </Typography>
            </MotionDiv>

            <MotionDiv variants={subTextVariant}>
              <Typography
                variant="h6"
                sx={{
                  color: "var(--neutral-900)",
                  maxWidth: 600,
                  lineHeight: 1.6,
                }}
              >
                A <strong>full-stack developer</strong> and a{" "}
                <strong>computer science graduate</strong>. Passionate about
                crafting clean, efficient, and aesthetic digital experiences.
                I love working with modern frameworks, building seamless
                front-ends, and scalable back-ends.
              </Typography>
            </MotionDiv>

            <MotionDiv
              variants={{
                hidden: { opacity: 0, y: 8 },
                visible: { opacity: 1, y: 0, transition: { delay: 0.15 } },
              }}
            >
              <Button
                className="primary-button"
                size="large"
                href="#projects"
                sx={{ mt: 3 }}
              >
                View My Work
              </Button>
            </MotionDiv>
          </MotionDiv>
        </Grid>

        <Grid size={{ xs: 12, lg: 6 }}>
          <Box
            sx={{
              width: "100%",
              height: { xs: "400px", lg: "60vh" },
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              minHeight: 0,
              maxHeight: { xs: "400px", lg: "70vh" },
            }}
          >
            <Box
              sx={{
                width: "100%",
                height: "100%",
                maxWidth: 400,
                maxHeight: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {/* Wrap the shape in a motion div so it slides from the right */}
              <MotionBox
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={shapeVariant}
                sx={{ width: "100%", height: "100%", display: "flex" }}
              >
                <AboutMeShape autoRotate={true} scale={1} />
              </MotionBox>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AboutMe;