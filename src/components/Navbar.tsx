// src/components/Navbar.tsx
import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import "../App.css";
import {
  AppBar,
  Toolbar,
  Box,
  IconButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Logo from "../assets/react.svg";
import MobileDrawer from "./Navbar/MobileDrawer";

const navLinks = [
  { name: "Hero", path: "/Hero" },
  { name: "About\u00A0Me", path: "/AboutMe" }, // non-breaking space
  { name: "Skills", path: "/Skills" },
  { name: "Projects", path: "/Projects" },
  { name: "Contact", path: "/Contact" },
];

type NavbarProps = {
  isDark?: boolean;
  setIsDark?: (v: boolean) => void;
};

const STORAGE_KEY = "site-theme";

const Navbar: React.FC<NavbarProps> = ({ isDark: isDarkProp, setIsDark: setIsDarkProp }) => {
  const { pathname } = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const [isDarkLocal, setIsDarkLocal] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return saved === "dark";
    } catch { }
    return typeof window !== "undefined" && window.matchMedia
      ? window.matchMedia("(prefers-color-scheme: dark)").matches
      : false;
  });

  useEffect(() => {
    const className = isDarkLocal ? "theme-dark" : "theme-light";
    const html = document.documentElement;
    html.classList.remove("theme-dark", "theme-light");
    html.classList.add(className);
    try {
      localStorage.setItem(STORAGE_KEY, isDarkLocal ? "dark" : "light");
    } catch { }
    if (typeof setIsDarkProp === "function") {
      setIsDarkProp(isDarkLocal);
    }
  }, [isDarkLocal, setIsDarkProp]);

  useEffect(() => {
    if (typeof isDarkProp === "boolean" && isDarkProp !== isDarkLocal) {
      setIsDarkLocal(isDarkProp);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDarkProp]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // close mobile drawer when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const isActive = (path: string) => pathname === path;

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
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 2,
            }}
          >
            {/* LEFT: logo only */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Link to="/" className="logo-link" aria-label="home" style={{ textDecoration: "none" }}>
                <div
                  style={{
                    borderRadius: "50%",
                    width: "64px",
                    height: "64px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: 5,
                  }}
                >
                  <img src={Logo} alt="logo" style={{ height: "38px" }} />
                </div>
              </Link>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              {/* CENTER: desktop nav - matches Projects.tsx styling */}
              <Box
                component="nav"
                sx={{
                  display: { xs: "none", lg: "flex" }, // hide on small screens
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
                    const active = isActive(link.path);
                    return (
                      <Box
                        key={link.path}
                        component={Link}
                        to={link.path}
                        role="link"
                        tabIndex={0}
                        aria-current={active ? "true" : undefined}
                        onClick={() => {
                          // close mobile/menu if needed (no-op for desktop, safe)
                          setIsMenuOpen(false);
                        }}
                        onKeyDown={(e: React.KeyboardEvent) => {
                          if (e.key === "Enter" || e.key === " ") {
                            // Let the Link handle navigation; prevent page jump for space
                            e.preventDefault();
                            (e.target as HTMLElement).click();
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
                          textDecoration: "none", // avoid link underline
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

                        {/* underline */}
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

              {/* Mobile menu button */}
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
        isActive={(p: string) => pathname === p}
      />
    </>
  );
};

export default Navbar;