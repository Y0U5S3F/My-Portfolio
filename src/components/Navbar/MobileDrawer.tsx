// src/components/Navbar/MobileDrawer.tsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Drawer,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";

type NavLink = { name: string; path: string };

interface MobileDrawerProps {
  open: boolean;
  onClose: () => void;
  navLinks: NavLink[];
  isActive: (path: string) => boolean;
}

const MobileDrawer: React.FC<MobileDrawerProps> = ({ open, onClose, navLinks, isActive }) => {
  // play controls when the menu-item animations run.
  // We only set it true after the Drawer/Slide has finished opening.
  const [play, setPlay] = useState(false);

  // ensure we reset play when drawer closes (so it will replay next open)
  useEffect(() => {
    if (!open) setPlay(false);
  }, [open]);

  return (
    <Drawer
      anchor="top"
      open={open}
      onClose={onClose}
      transitionDuration={{ enter: 280, exit: 240 }}
      SlideProps={{
        direction: "down",
        onEntered: () => setPlay(true),
        onExited: () => setPlay(false),
      }}
      sx={{ display: { lg: "none" }, }}
      PaperProps={{
        sx: {
          backgroundColor: "var(--main-light)",
          borderRadius: 0,
          boxShadow: 3,
          minHeight: 180, // ensure a bit of space so vertical centering is visible
        },
      }}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",    // <-- important
          alignItems: "center",       // horizontal center of the column
          justifyContent: "center",   // vertical centering inside the drawer area
          gap: 1,
        }}
      >
        <List
          sx={{
            width: "auto",            // shrink to content so the whole block is centered
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 1,
          }}
        >
          {navLinks.map((link, i) => {
            const delayMs = i * 150;
            return (
              <ListItem key={link.name} disablePadding>
                <ListItemButton
                  component={Link}
                  to={link.path}
                  onClick={onClose}
                  disableRipple
                  selected={isActive(link.path)}
                  sx={{
                    width: "auto",                  // don't stretch full width
                    justifyContent: "center",       // center the content of the button
                    textAlign: "center",
                    // animate vertically so horizontal centering isn't broken
                    // remove hover background & color changes
                    backgroundColor: "transparent",
                    "&:hover": { backgroundColor: "transparent" },
                    "&.Mui-selected, &.Mui-selected:hover": { backgroundColor: "transparent" },

                    // IMPORTANT: use `play` (not `open`) so animation starts only after slide finished
                    transform: play ? "translateX(0)" : "translateX(-40px)",
                    opacity: play ? 1 : 0,

                    // transition & stagger via delay (only applied when play is true)
                    transitionProperty: "opacity, transform",
                    transitionDuration: "520ms",
                    transitionTimingFunction: "cubic-bezier(.2,.9,.2,1)",
                    transitionDelay: `${play ? delayMs : 0}ms`,

                    // accessibility focus outline
                    "&:focus-visible": {
                      outline: "none",
                      boxShadow: (theme) => `0 0 0 3px ${theme.palette.action.focus}`,
                    },

                    // respect reduced motion
                    "@media (prefers-reduced-motion: reduce)": {
                      transform: "none",
                      opacity: 1,
                      transition: "none",
                    },
                  }}
                >
                  <ListItemText
                    primary={link.name}
                    primaryTypographyProps={{ align: "center" }} // center the text itself
                    sx={{
                      ".MuiListItemText-primary": {
                        color: "var(--neutral-900)",
                      },
                    }}
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Box>
    </Drawer>
  );
};

export default MobileDrawer;