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
import { NavbarElement } from "./Navbar/NavbarElement";
import MobileDrawer from "./Navbar/MobileDrawer";

const navLinks = [
  { name: "Hero", path: "/Hero" },
  { name: "About Me", path: "/AboutMe" },
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
          backgroundColor: scrolled ? "var(--neutral-white, rgba(255,255,255,0.95))" : "transparent",
          boxShadow: scrolled ? "0 1px 2px rgba(0,0,0,0.1)" : "none",
          transition: "all 0.3s ease",
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
              <Link to="/" className="logo-link" aria-label="home">
                <div
                  style={{
                    borderRadius: "50%",
                    width: "45px",
                    height: "45px",
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
              <Box
                sx={{
                  display: { xs: "none", md: "flex" },
                  position: "absolute",
                  left: "50%",
                  transform: "translateX(-50%)",
                }}
              >
                <NavbarElement links={navLinks} isActive={isActive} mode="desktop" />
              </Box>
              <Box
                sx={{
                  display: { xs: "none", md: "flex" },
                  position: "absolute",
                  left: "50%",
                  transform: "translateX(-50%)",
                }}
              >
                <NavbarElement links={navLinks} isActive={isActive} mode="desktop" />
              </Box>
              <IconButton
                aria-label="open menu"
                aria-expanded={isMenuOpen}
                onClick={() => setIsMenuOpen(true)}
                sx={{
                  display: { xs: "inline-flex", md: "none" },
                  transition: "color 200ms ease, transform 150ms ease",
                  // optional tiny scale on press
                  "&:active": { transform: "scale(0.98)" },
                }}
                size="large"
              >
                <MenuIcon
                  sx={{
                    color: "var(--neutral-900)",
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
        isActive={isActive}
      />
    </>
  );
};

export default Navbar;