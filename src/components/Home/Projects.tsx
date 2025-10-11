// src/components/Projects.tsx
import React, { useEffect, useRef, useState } from "react";
import GlossedUp from "./Projects/GlossedUp";
import FlexGym from "./Projects/FlexGym";
import ComputerVision from "./Projects/ComputerVision";
import Jumpark from "./Projects/Jumpark";
import { Box } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";

const projectNames = ["Glossed Up", "Flex Gym", "Computer Vision", "Jumpark"];

const Projects: React.FC = () => {
  // store index instead of string (easier for next/prev)
  const [index, setIndex] = useState<number>(0);
  const [isAuto, setIsAuto] = useState<boolean>(true); // auto-advance enabled until user interacts

  // touch refs for swipe detection
  const startX = useRef<number | null>(null);
  const startY = useRef<number | null>(null);
  const threshold = 60; // px required to consider a swipe
  const swipeAllowedRef = useRef<boolean>(true); // prevents multiple triggers per touch

  const n = projectNames.length;

  const goToIndex = (i: number) => {
    setIndex((i + n) % n);
  };
  const goNext = () => goToIndex(index + 1);
  const goPrev = () => goToIndex(index - 1);

  // Auto-advance every 5s if isAuto
  useEffect(() => {
    if (!isAuto) return;
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % n);
    }, 5000);
    return () => clearInterval(id);
  }, [isAuto, n]);

  // render project by index
  const renderProject = (i: number) => {
    switch (projectNames[i]) {
      case "Glossed Up":
        return <GlossedUp />;
      case "Flex Gym":
        return <FlexGym />;
      case "Computer Vision":
        return <ComputerVision />;
      case "Jumpark":
        return <Jumpark />;
      default:
        return <GlossedUp />;
    }
  };

  // Touch handlers
  const onTouchStart = (e: React.TouchEvent) => {
    const t = e.touches[0];
    startX.current = t.clientX;
    startY.current = t.clientY;
    swipeAllowedRef.current = true;
  };

  const onTouchMove = (_e: React.TouchEvent) => {
    // optional: we don't need to do anything here, keep for future enhancements
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (!swipeAllowedRef.current) return;
    swipeAllowedRef.current = false;

    const t = e.changedTouches[0];
    if (startX.current == null || startY.current == null) return;

    const dx = t.clientX - startX.current;
    const dy = t.clientY - startY.current;

    // require mostly horizontal swipe
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > threshold) {
      if (dx < 0) {
        goNext();
      } else {
        goPrev();
      }
      // user interacted -> disable auto-advance
      setIsAuto(false);
    }

    startX.current = null;
    startY.current = null;
  };

  // optional: allow keyboard left/right navigation (desktop)
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        setIsAuto(false);
        goPrev();
      } else if (e.key === "ArrowRight") {
        setIsAuto(false);
        goNext();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  return (
    <Box sx={{ minHeight: "70vh" }}>
      {/* NAV - hidden on mobile (xs, sm). Visible from md and up */}
      <Box
        component="nav"
        sx={{
          minHeight: "10vh",
          display: { xs: "none", md: "flex" }, // <--- hide on mobile
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: 4,
            alignItems: "center",
          }}
        >
          {projectNames.map((name, i) => {
            const isSelected = index === i;

            return (
              <Box
                key={name}
                role="button"
                tabIndex={0}
                onClick={() => {
                  setIndex(i);
                  setIsAuto(false); // user clicked -> stop auto
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setIndex(i);
                    setIsAuto(false);
                  }
                }}
                aria-current={isSelected ? "true" : undefined}
                sx={{
                  position: "relative",
                  cursor: "pointer",
                  color: isSelected ? "var(--neutral-1200)" : "var(--neutral-900)",
                  fontWeight: isSelected ? 700 : 500,
                  fontSize: 24,
                  textTransform: "none",
                  px: 5,
                  py: 1,
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition:
                    "transform 240ms cubic-bezier(.22,0,.1,1), letter-spacing 240ms cubic-bezier(.22,0,.1,1), color 200ms",
                  transform: isSelected ? "scale(1.04)" : "scale(1)",
                  letterSpacing: isSelected ? "0.6px" : "0px",
                  transformOrigin: "center center",
                  willChange: "transform, letter-spacing, color",
                  "&:focus": {
                    outline: "none",
                    boxShadow: "none",
                  },
                  WebkitTapHighlightColor: "transparent",
                  userSelect: "none",

                  "&:hover .underline": {
                    transform: isSelected ? "scaleX(1.03)" : "scaleX(0.6)",
                    opacity: 1,
                  },

                  "&:hover": {
                    transform: isSelected ? "scale(1.06)" : "scale(1.02)",
                  },
                }}
              >
                {name}

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
                    transform: isSelected ? "scaleX(1)" : "scaleX(0)",
                    opacity: isSelected ? 1 : 0,
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

      {/* CONTENT */}
      <Box sx={{ display: "flex" }}>
        <Box
          sx={{
            flex: 1,
            position: "relative",
            overflow: "hidden",
            // on mobile, allow horizontal gestures; avoid interfering with vertical scroll:
            touchAction: "pan-y",
          }}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={index}
              layout
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{
                duration: 0.36,
                ease: [0.22, 0.0, 0.1, 1.0],
              }}
              style={{
                width: "100%",
                display: "block",
              }}
              // touch handlers for swipe on mobile
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
            >
              <Box sx={{ py: 4 }}>{renderProject(index)}</Box>
            </motion.div>
          </AnimatePresence>
        </Box>
      </Box>
    </Box>
  );
};

export default Projects;