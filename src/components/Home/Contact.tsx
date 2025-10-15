import React, { useState } from "react";
import {
  Box,
  Grid,
  Typography,
  TextField,
  Button,
  Snackbar,
  Alert,
  Paper,
  Avatar,
  IconButton,
  CircularProgress,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

const Contact: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});
  const [openSnack, setOpenSnack] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");
  const [snackSeverity, setSnackSeverity] = useState<"success" | "error">("success");
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e: typeof errors = {};
    if (!name.trim()) e.name = "Name is required";
    if (!email.trim()) e.email = "Email is required";
    else if (!/^[\w-.]+@[\w-]+\.[a-zA-Z]{2,}$/.test(email)) e.email = "Enter a valid email";
    if (!message.trim()) e.message = "Message is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (ev?: React.FormEvent) => {
    ev?.preventDefault();
    if (!validate()) return;

    setLoading(true);

    try {
      await new Promise((res) => setTimeout(res, 700));

      setSnackMessage("Message sent — thanks!");
      setSnackSeverity("success");
      setOpenSnack(true);
      setName("");
      setEmail("");
      setMessage("");
      setErrors({});
    } catch (err) {
      setSnackMessage("Something went wrong. Try again later.");
      setSnackSeverity("error");
      setOpenSnack(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <MotionBox
      id="contact"
      initial={{ y: 30, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      sx={{ py: { xs: 6, md: 10 }, px: { xs: 3, md: 8 } }}
    >
      <Grid container spacing={6} justifyContent="center">
        <Grid size={{ xs: 12, lg: 10 }}>
          <Paper
            elevation={0}
            sx={{
              display: "flex",
              gap: 4,
              padding: { xs: 3, md: 4 },
              background: "transparent",
              borderRadius: 2,
              alignItems: "stretch",
            }}
          >
            <Box sx={{ flex: "0 0 320px", display: { xs: "none", md: "block" } }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
                <Avatar sx={{ bgcolor: "var(--main-dark)", width: 92, height: 92 }}>
                  <Box
                    component="img"
                    src="https://avatars.githubusercontent.com/u/110101516?v=4"
                    alt="Youssef"
                    loading="lazy"
                    sx={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",      // avoids inline element gaps
                      borderRadius: "50%",   // keep circular crop inside Avatar
                    }}
                  />
                </Avatar>
                <Box>
                  <Typography variant="h5" sx={{ fontWeight: 700, color: "var(--neutral-1200)" }}>
                    Let's build something
                  </Typography>
                  <Typography variant="body2" sx={{ color: "var(--neutral-900)" }}>
                    I usually respond within a short time.
                  </Typography>
                </Box>
              </Box>

              <Paper
                variant="outlined"
                sx={{
                  p: 2,
                  mt: 2,
                  background: "transparent",
                  borderColor: "rgba(139,148,158,0.12)",
                }}
              >
                <Typography variant="subtitle2" sx={{ color: "var(--main-muted)", mb: 1 }}>
                  Contact
                </Typography>
                <Typography variant="body2" sx={{ color: "var(--neutral-900)", fontSize: 13 }}>
                  youssefsaidani19@gmail.com
                </Typography>
                <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
                  <IconButton
                    href="https://github.com/Y0U5S3F/"
                    aria-label="GitHub"
                    sx={{
                      color: "var(--neutral-1200)",
                      transition: "color 0.3s ease",
                      "&:hover": { color: "var(--main-default)" },
                    }}
                  >
                    <GitHubIcon sx={{ fontSize: 34 }} />
                  </IconButton>

                  <IconButton
                    href="https://www.linkedin.com/in/youssef-saidani/"
                    aria-label="LinkedIn"
                    sx={{
                      color: "var(--neutral-1200)",
                      transition: "color 0.3s ease",
                      "&:hover": { color: "var(--main-default)" },
                    }}
                  >
                    <LinkedInIcon sx={{ fontSize: 34 }} />
                  </IconButton>
                </Box>
              </Paper>
            </Box>
            <Box component="form" onSubmit={handleSubmit} sx={{ flex: 1 }}>
              <Typography variant="h4" sx={{ color: "var(--neutral-1200)", fontWeight: 700, mb: 1 }}>
                Get in touch
              </Typography>
              <Typography variant="body2" sx={{ color: "var(--neutral-900)", mb: 3 }}>
                Have a question or want to work together? Send a message and I&apos;ll get back to you.
              </Typography>

              <Grid container spacing={2}>
                <Grid size={{ xs: 12, lg: 6 }}>
                  <TextField
                    fullWidth
                    label="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    error={Boolean(errors.name)}
                    helperText={errors.name}
                    variant="outlined"
                    InputLabelProps={{ style: { color: "var(--neutral-600)" } }}
                    sx={{
                      background: "var(--neutral-200)",
                      borderRadius: 1,
                      '& .MuiOutlinedInput-notchedOutline': { borderColor: 'transparent' },
                      '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(35,132,255,0.12)' },
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'var(--main-dark)' },
                      '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'var(--main-dark)',
                      },
                    }}
                  />
                </Grid>

                <Grid size={{ xs: 12, lg: 6 }}>
                  <TextField
                    fullWidth
                    label="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    error={Boolean(errors.email)}
                    helperText={errors.email}
                    variant="outlined"
                    InputLabelProps={{ style: { color: "var(--neutral-600)" } }}
                    sx={{
                      background: "var(--neutral-200)",
                      borderRadius: 1,
                      '& .MuiOutlinedInput-notchedOutline': { borderColor: 'transparent' },
                      '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(35,132,255,0.12)' },
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'var(--main-dark)' },
                      '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'var(--main-dark)',
                      },
                    }}
                  />
                </Grid>

                <Grid size={12}>
                  <TextField
                    fullWidth
                    label="Message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    error={Boolean(errors.message)}
                    helperText={errors.message}
                    multiline
                    rows={6}
                    variant="outlined"
                    InputLabelProps={{ style: { color: "var(--neutral-600)" } }}
                    sx={{
                      background: "var(--neutral-200)",
                      borderRadius: 1,
                      '& .MuiOutlinedInput-notchedOutline': { borderColor: 'transparent' },
                      '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(35,132,255,0.12)' },
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'var(--main-dark)' },
                      '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'var(--main-dark)',
                      },
                    }}
                  />
                </Grid>

                <Grid size={12} sx={{ display: "flex", justifyContent: "flex-end", mt: 1 }}>
                  <Button
                    type="submit"
                    className="primary-button"
                    size="large"
                    disabled={loading}
                    endIcon={loading ? <CircularProgress size={18} /> : <SendIcon />}

                  >
                    {loading ? "Sending..." : "Send message"}
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      <Snackbar open={openSnack} autoHideDuration={4500} onClose={() => setOpenSnack(false)}>
        <Alert onClose={() => setOpenSnack(false)} severity={snackSeverity} sx={{ width: "100%" }}>
          {snackMessage}
        </Alert>
      </Snackbar>
    </MotionBox >
  );
};

export default Contact;
