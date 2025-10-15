import React, { useEffect, useState } from "react";
import {
  Drawer,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";

type NavLink = { name: string; id: string };

interface MobileDrawerProps {
  open: boolean;
  onClose: () => void;
  navLinks: NavLink[];
  isActive: (id: string) => boolean;
  onLinkClick: (id: string) => void; 
}

const MobileDrawer: React.FC<MobileDrawerProps> = ({ open, onClose, navLinks, isActive, onLinkClick }) => {
  const [play, setPlay] = useState(false);
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
          minHeight: 180, 
        },
      }}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",    
          alignItems: "center",       
          justifyContent: "center",   
          gap: 1,
        }}
      >
        <List
          sx={{
            width: "auto",            
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
                  component="button" 
                  onClick={() => onLinkClick(link.id)} 
                  disableRipple
                  selected={isActive(link.id)} 
                  sx={{
                    width: "auto",                  
                    justifyContent: "center",       
                    textAlign: "center",
                    backgroundColor: "transparent",
                    "&:hover": { backgroundColor: "transparent" },
                    "&.Mui-selected, &.Mui-selected:hover": { backgroundColor: "transparent" },

                    transform: play ? "translateX(0)" : "translateX(-40px)",
                    opacity: play ? 1 : 0,

                    transitionProperty: "opacity, transform",
                    transitionDuration: "520ms",
                    transitionTimingFunction: "cubic-bezier(.2,.9,.2,1)",
                    transitionDelay: `${play ? delayMs : 0}ms`,

                    "&:focus-visible": {
                      outline: "none",
                      boxShadow: (theme) => `0 0 0 3px ${theme.palette.action.focus}`,
                    },

                    "@media (prefers-reduced-motion: reduce)": {
                      transform: "none",
                      opacity: 1,
                      transition: "none",
                    },
                  }}
                >
                  <ListItemText
                    primary={link.name}
                    primaryTypographyProps={{ align: "center" }} 
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