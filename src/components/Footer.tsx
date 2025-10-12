import React from "react";
import { Box, Grid, Typography, Link, IconButton } from "@mui/material";
import { motion } from "framer-motion";
import GitHubIcon from "@mui/icons-material/GitHub";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const MotionBox = motion(Box);

const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  return (
    <MotionBox
      initial={{ y: 20, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      sx={{
        py: { xs: 6, md: 8 },
        px: { xs: 3, md: 10 },
        borderTop: "1px solid var(--neutral-300)",
      }}
    >
      <Grid container spacing={4} alignItems="center">
        <Grid item xs={12} md={4}>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            Footer
          </Typography>
          <Typography variant="body2" sx={{ color: "var(--neutral-800)" }}>
            Small description or tagline — place your brand message here.
          </Typography>
        </Grid>

        <Grid item xs={12} md={4}>
          <Box sx={{ display: "flex", gap: 3, justifyContent: { xs: "center", md: "flex-start" } }}>
            <Link href="#about" underline="hover" variant="body2">
              About
            </Link>
            <Link href="#services" underline="hover" variant="body2">
              Services
            </Link>
            <Link href="#contact" underline="hover" variant="body2">
              Contact
            </Link>
          </Box>
        </Grid>

        <Grid item xs={12} md={4} sx={{ textAlign: { xs: "center", md: "right" } }}>
          <Typography variant="body2" sx={{ mb: 1 }}>
            hello@yourdomain.com
          </Typography>
          <Box sx={{ display: "inline-flex", gap: 1 }}>
            <IconButton aria-label="github" href="#" size="small">
              <GitHubIcon fontSize="small" />
            </IconButton>
            <IconButton aria-label="twitter" href="#" size="small">
              <TwitterIcon fontSize="small" />
            </IconButton>
            <IconButton aria-label="linkedin" href="#" size="small">
              <LinkedInIcon fontSize="small" />
            </IconButton>
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Box sx={{ mt: 4, textAlign: "center" }}>
            <Typography variant="caption" sx={{ color: "var(--neutral-700)" }}>
              © {year} Your Company. All rights reserved.
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </MotionBox>
  );
};

export default Footer;
