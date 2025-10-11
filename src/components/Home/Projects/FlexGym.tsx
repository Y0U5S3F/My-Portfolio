import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import { motion } from "framer-motion";
import image from "../../../assets/FlexGymLogo.png";
import backgroundImage from "../../../assets/FlexGymBackground.png"
const MotionBox = motion(Box);

const FlexGym: React.FC = () => {
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

    // icon zoom
    const iconVariant = {
        initial: { opacity: 0, scale: 0.7 },
        animate: { opacity: 1, scale: 1 },
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
                            backgroundImage: `url(${backgroundImage})`, // ✅ this makes it display the image
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
                    >
                        <motion.img
                            src={image}
                            alt="GlossedUp logo"
                            loading="lazy"
                            variants={iconVariant}
                            initial="initial"
                            animate="animate"
                            // make scale revert quickly while keeping other transitions intact
                            transition={{
                                // scale should be snappy both in and out
                                scale: { duration: 0.18, ease: [0.2, 0.8, 0.2, 1] },
                                // fallback/default for any other properties (opacity, etc.)
                                default: { duration: commonTransition.duration, ease: [0.2, 0.8, 0.2, 1] },
                            }}
                            style={{
                                width: "60%",
                                height: "60%",
                                objectFit: "contain",
                                display: "block",
                                pointerEvents: "auto",
                            }}
                            whileHover={{
                                scale: 1.1,
                                // explicit, just in case — matches the scale transition above
                                transition: { duration: 0.18, ease: [0.2, 0.8, 0.2, 1] },
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
                            Flex Gym
                        </Typography>

                        <Typography variant="body1" sx={{ color: "var(--neutral-900)", lineHeight: 1.6, textAlign: "left", fontSize: { xs: 14, md: 18, lg: 22 }, py: 2 }}>
                            FlexGym is a full-stack gym management system developed as
                            a university project, using Angular for the frontend
                            and PHP for the backend. The platform offers a
                            seamless experience for regular users,
                            allowing them to view membership details,
                            check gym hours, and access class schedules easily.
                        </Typography>

                        <Typography variant="body1" sx={{ color: "var(--neutral-900)", lineHeight: 1.6, textAlign: "left", fontSize: { xs: 14, md: 18, lg: 22 }, py: 2 }}>
                            On the admin side, FlexGym provides robust management
                            tools to oversee members, staff, memberships,
                            and scheduling through a built-in calendar.
                            Designed with usability and scalability in
                            mind, the system streamlines daily gym operations for
                            both users and administrators.
                        </Typography>
                    </MotionBox>
                </Grid>
            </Grid>
        </Box>
    );
};

export default FlexGym;