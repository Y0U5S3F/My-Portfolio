import React, { useState } from "react";
import { Box, Grid, Typography, TextField, Button, Snackbar, Alert } from "@mui/material";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

const Contact: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});
  const [openSnack, setOpenSnack] = useState(false);

  const validate = () => {
    const e: typeof errors = {};
    if (!name.trim()) e.name = "Name is required";
    if (!email.trim()) e.email = "Email is required";
    else if (!/^[\w-.]+@[\w-]+\.[a-zA-Z]{2,}$/.test(email)) e.email = "Enter a valid email";
    if (!message.trim()) e.message = "Message is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (ev?: React.FormEvent) => {
    ev?.preventDefault();
    if (!validate()) return;

    // placeholder: replace with your API call or 3rd-party integration
    // e.g. await fetch('/api/contact', { method: 'POST', body: JSON.stringify({ name, email, message }) })
    console.log("Contact submitted:", { name, email, message });

    // show success feedback and reset
    setOpenSnack(true);
    setName("");
    setEmail("");
    setMessage("");
    setErrors({});
  };

  return (
    <MotionBox
      id="contact"
      initial={{ y: 30, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.6, ease: "circOut" }}
      sx={{ py: { xs: 6, md: 12 }, px: { xs: 3, md: 10 }, background: "var(--neutral-100)" }}
    >
      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12} md={8}>
          <Box sx={{ textAlign: "center", mb: 4 }}>
            <Typography variant="h4" component="h2" sx={{ fontWeight: 700, mb: 1 }}>
              Get in touch
            </Typography>
            <Typography variant="body1" sx={{ color: "var(--neutral-800)" }}>
              Have a question or want to work together? Send a message and we'll respond as soon as we can.
            </Typography>
          </Box>

          <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 820, mx: "auto" }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  error={Boolean(errors.name)}
                  helperText={errors.name}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  error={Boolean(errors.email)}
                  helperText={errors.email}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  error={Boolean(errors.message)}
                  helperText={errors.message}
                  multiline
                  rows={6}
                />
              </Grid>

              <Grid item xs={12} sx={{ textAlign: "center", mt: 1 }}>
                <Button type="submit" variant="contained" size="large">
                  Send message
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>

      <Snackbar open={openSnack} autoHideDuration={4000} onClose={() => setOpenSnack(false)}>
        <Alert onClose={() => setOpenSnack(false)} severity="success" sx={{ width: "100%" }}>
          Message sent — thanks!
        </Alert>
      </Snackbar>
    </MotionBox>
  );
};

export default Contact;