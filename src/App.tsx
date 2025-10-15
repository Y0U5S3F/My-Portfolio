// src/App.tsx
import React, { useEffect, useState, useRef } from "react";
import { CssBaseline } from "@mui/material";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/Navbar";
import Main from "./pages/Main";
import Background from "./components/Background"; // <-- your canvas stars component

const LoadingOverlay: React.FC = () => {
  const [progress, setProgress] = useState(0); // 0..100
  const [isLoaded, setIsLoaded] = useState(false); // window load happened
  const [fadeOut, setFadeOut] = useState(false); // start fade animation
  const [visible, setVisible] = useState(true); // whether to render overlay
  const intervalRef = useRef<number | null>(null);

  // Smooth, slower progress animation
  useEffect(() => {
    if (intervalRef.current) window.clearInterval(intervalRef.current);
    intervalRef.current = window.setInterval(() => {
      setProgress((p) => {
        if (p >= 98 || isLoaded) return p;
        const step = p < 60 ? 2 : p < 85 ? 1 : 0.5;
        return Math.min(99, p + step);
      });
    }, 120); // slightly slower update rate
    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
    };
  }, [isLoaded]);

  // Handle real load event
  useEffect(() => {
    const onLoad = () => {
      setIsLoaded(true);
      setProgress(100);
    };
    if (document.readyState === "complete") {
      onLoad();
    } else {
      window.addEventListener("load", onLoad);
    }
    return () => window.removeEventListener("load", onLoad);
  }, []);

  // After progress is 100, wait 0.5s then fade for 1s, then unmount overlay
  useEffect(() => {
    if (progress >= 100) {
      const wait = window.setTimeout(() => {
        setFadeOut(true);
        const remove = window.setTimeout(() => {
          setVisible(false);
        }, 3000); // fade duration 1s
        return () => clearTimeout(remove);
      }, 1000); // wait 0.5s before fading
      return () => clearTimeout(wait);
    }
    return;
  }, [progress]);

  if (!visible) return null;

  return (
    <div
      aria-hidden={false}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--neutral-200)", // full page background requested
        transition: "opacity 1s ease, visibility 1s ease",
        opacity: fadeOut ? 0 : 1,
        pointerEvents: fadeOut ? "none" : "auto",
      }}
    >
      <div
        style={{
          width: "min(520px, 90%)",
          padding: "28px",
          borderRadius: 12,
          boxShadow: "0 8px 30px rgba(10,10,10,0.06)",
          display: "flex",
          flexDirection: "column",
          gap: 16,
          alignItems: "center",
          background: "transparent",
        }}
      >
        <div
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(progress)}
          style={{
            width: "100%",
            height: 10,
            borderRadius: 999,
            background: "rgba(0,0,0,0.06)",
            overflow: "hidden",
          }}
        >
          {/* Progress fill: uses requested color var-900 (interpreted as --neutral-900) with fallback */}
          <div
            style={{
              width: `${Math.max(0, Math.min(100, progress))}%`,
              height: "100%",
              borderRadius: 999,
              transition: "width 300ms ease, opacity 300ms ease",
              background: "var(--main-dark, var(--main-dark, #111))",
            }}
          />
        </div>
      </div>
    </div>
  );
};

const App: React.FC = () => (
  <>
    <CssBaseline />
    <Router>
      <div style={{ position: "relative", minHeight: "100vh", overflow: "hidden" }}>
        <Background />
        <div style={{ position: "relative", zIndex: 2 }}>
          <Navbar />
          <Main />
        </div>

        {/* Loading overlay is mounted at the end so it sits above everything */}
        <LoadingOverlay />
      </div>
    </Router>
  </>
);

export default App;
