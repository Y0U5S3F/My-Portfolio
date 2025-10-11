import React from "react";
import { Box, Button, Typography, Grid } from "@mui/material";

const Hero: React.FC = () => {
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        px: 3,
        backgroundColor: "transparent !important",
      }}
    >
      <Typography
        variant="h3"
        sx={{ fontWeight: 600, mb: 2, color: "var(--neutral-1200)" }}
      >
        Building Scalable, Modern Web Applications
      </Typography>

      <Typography
        variant="h6"
        sx={{ maxWidth: 600, color: "var(--neutral-900)", mb: 4 }}
      >
        Specializing in responsive design, high-performance frontends, and clean, maintainable code using React, TypeScript, and modern development practices.
      </Typography>

      <Grid container spacing={2} justifyContent="center">
        <Grid size={{ xs: 12, sm: 6 }}>
          <Button
            className="primary-button"
            fullWidth
            href="#projects"
            size="large"
          >
            View Work
          </Button>
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <Button
            className="secondary-button"
            fullWidth
            href="#contact"
            size="large"
            variant="outlined"
            color="primary"
          >
            Contact
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Hero;