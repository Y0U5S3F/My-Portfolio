// src/components/Navbar.tsx
import React, { useEffect, useState } from "react";
import "../App.css";
import {
  AppBar,
  Toolbar,
  Box,
  IconButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import MobileDrawer from "./Navbar/MobileDrawer";

const navLinks = [
  { name: "Hero", id: "hero" },
  { name: "About\u00A0Me", id: "aboutme" },
  { name: "Skills", id: "skills" },
  { name: "Projects", id: "projects" },
  { name: "Contact", id: "contact" },
];

type NavbarProps = {
  isDark?: boolean;
  setIsDark?: (v: boolean) => void;
};

const Navbar: React.FC<NavbarProps> = ({ isDark: isDarkProp, setIsDark: setIsDarkProp }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  const [isDarkLocal, setIsDarkLocal] = useState<boolean>(() => {
    return typeof window !== "undefined" && window.matchMedia
      ? window.matchMedia("(prefers-color-scheme: dark)").matches
      : false;
  });

  useEffect(() => {
    const className = isDarkLocal ? "theme-dark" : "theme-light";
    const html = document.documentElement;
    html.classList.remove("theme-dark", "theme-light");
    html.classList.add(className);
    if (typeof setIsDarkProp === "function") {
      setIsDarkProp(isDarkLocal);
    }
  }, [isDarkLocal, setIsDarkProp]);

  useEffect(() => {
    if (typeof isDarkProp === "boolean" && isDarkProp !== isDarkLocal) {
      setIsDarkLocal(isDarkProp);
    }
  }, [isDarkProp, isDarkLocal]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveSection(id);
    }
    setIsMenuOpen(false);
  };

  const isActive = (id: string) => activeSection === id;

  return (
    <>
      <AppBar
        position="fixed"
        elevation={scrolled ? 2 : 0}
        sx={{
          top: 0,
          backgroundColor: scrolled ? "rgba(13,17,23,0.75)" : "transparent",
          backdropFilter: scrolled ? "blur(8px) saturate(130%)" : "none",
          borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
          boxShadow: scrolled ? "0 1px 6px rgba(0,0,0,0.18)" : "none",
          transition: "background-color 250ms ease, backdrop-filter 250ms ease, box-shadow 250ms ease",
          zIndex: 1200,
        }}
      >
        <Toolbar sx={{ justifyContent: "center", px: { xs: 1, md: 3 } }}>
          <Box
            sx={{
              width: "100%",
              maxWidth: 1100,
              minHeight: { xs: 0, lg: 80 },
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 2,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Box
                component="nav"
                sx={{
                  display: { xs: "none", lg: "flex" },
                  position: "absolute",
                  left: "50%",
                  transform: "translateX(-50%)",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    gap: 4,
                    alignItems: "center",
                  }}
                >
                  {navLinks.map((link) => {
                    const active = isActive(link.id);
                    return (
                      <Box
                        key={link.id}
                        component="button"
                        role="link"
                        tabIndex={0}
                        aria-current={active ? "true" : undefined}
                        onClick={() => scrollToSection(link.id)}
                        onKeyDown={(e: React.KeyboardEvent) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            scrollToSection(link.id);
                          }
                        }}
                        sx={{
                          position: "relative",
                          cursor: "pointer",
                          color: active ? "var(--neutral-1200)" : "var(--neutral-900)",
                          fontWeight: active ? 700 : 500,
                          fontSize: 20,
                          textTransform: "none",
                          px: 5,
                          py: 1,
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          transition:
                            "transform 240ms cubic-bezier(.22,0,.1,1), letter-spacing 240ms cubic-bezier(.22,0,.1,1), color 200ms",
                          transform: active ? "scale(1.04)" : "scale(1)",
                          letterSpacing: active ? "0.6px" : "0px",
                          transformOrigin: "center center",
                          willChange: "transform, letter-spacing, color",
                          textDecoration: "none",
                          background: "none",
                          border: "none",
                          "&:focus": {
                            outline: "none",
                            boxShadow: "none",
                          },
                          WebkitTapHighlightColor: "transparent",
                          userSelect: "none",

                          "&:hover .underline": {
                            transform: active ? "scaleX(1.03)" : "scaleX(0.6)",
                            opacity: 1,
                          },

                          "&:hover": {
                            transform: active ? "scale(1.06)" : "scale(1.02)",
                          },
                        }}
                      >
                        {link.name}

                        <Box
                          className="underline"
                          sx={{
                            position: "absolute",
                            left: 0,
                            right: 0,
                            bottom: -6,
                            height: "3px",
                            background: "var(--neutral-900)",
                            transformOrigin: "left center",
                            transform: active ? "scaleX(1)" : "scaleX(0)",
                            opacity: active ? 1 : 0,
                            transition:
                              "transform 320ms cubic-bezier(.22,0,.1,1), opacity 220ms cubic-bezier(.22,0,.1,1)",
                            pointerEvents: "none",
                          }}
                        />
                      </Box>
                    );
                  })}
                </Box>
              </Box>

              <IconButton
                aria-label="open menu"
                aria-expanded={isMenuOpen}
                onClick={() => setIsMenuOpen(true)}
                sx={{
                  display: { xs: "inline-flex", lg: "none" },
                  transition: "color 200ms ease, transform 150ms ease",
                  "&:active": { transform: "scale(0.98)" },
                }}
                size="large"
              >
                <MenuIcon
                  sx={{
                    color: scrolled ? "var(--neutral-1200)" : "var(--neutral-900)",
                    transition: "color 200ms ease",
                    fontSize: 28,
                  }}
                />
              </IconButton>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>

      <MobileDrawer
        open={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        navLinks={navLinks}
        isActive={(id: string) => activeSection === id}
        onLinkClick={scrollToSection}
      />
    </>
  );
};

export default Navbar;