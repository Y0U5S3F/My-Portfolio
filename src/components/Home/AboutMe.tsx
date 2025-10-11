import { Box, Grid, Typography, Button } from "@mui/material";
import { motion } from "framer-motion";

const AboutMe = () => {
  const bgUrl = "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=80";

  return (
    <Box
      id="aboutme"
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
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
        <Box
          sx={{
            position: "absolute",
            top: 0,
            right: 0,
            width: { xs: "100%", md: "50%" },
            height: "100%",
            backgroundImage: `url('${bgUrl}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            zIndex: 0,

            WebkitMaskImage: "linear-gradient(to left, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 60%)",
            maskImage: "linear-gradient(to left, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 60%)",

            "@supports not (mask-image: linear-gradient(to left, #000, transparent))": {
              "&::after": {
                content: '""',
                position: "absolute",
                inset: 0,
                pointerEvents: "none",
                background: "linear-gradient(to left, transparent 0%, var(--neutral-200) 70%)",
              },
            },
          }}
        />
      </motion.div>

      <Grid
        container
        spacing={6}
        alignItems="center"
        justifyContent="center"
        sx={{
          minWidth: "75vw",
          position: "relative",
          zIndex: 2,
        }}
      >
        <Grid size={{ xs: 12, sm: 9 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Typography
              variant="h3"
              sx={{
                fontWeight: 700,
                color: "var(--neutral-1200)",
                mb: 3,
              }}
            >
              Hi, I’m {" "}
              <Box component="span" sx={{ color: "var(--main-dark)" }}>
                Youssef
              </Box>
            </Typography>

            <Typography
              variant="h6"
              sx={{
                color: "var(--neutral-900)",
                maxWidth: 600,
                lineHeight: 1.6,
              }}
            >
              A <strong>full-stack developer</strong> and a {" "}
              <strong>computer science graduate</strong>. Passionate about
              crafting clean, efficient, and aesthetic digital experiences.
              I love working with modern frameworks, building seamless
              front-ends, and scalable back-ends.
            </Typography>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
              <Button
                className="primary-button"
                size="large"
                href="#projects"
                sx={{
                  mt: 3,
                }}
              >
                View My Work
              </Button>
            </motion.div>
          </motion.div>
        </Grid>

        <Grid size={{ xs: 0, sm: 3 }} />
      </Grid>
    </Box>
  );
};

export default AboutMe;