// src/App.tsx
import React from "react";
import { CssBaseline } from "@mui/material";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Main from "./pages/Main";
import Background from "./components/Background"; // <-- your canvas stars component

const App: React.FC = () => (
  <>
    <CssBaseline />
    <Router>
      <div style={{ position: "relative", minHeight: "100vh", overflow: "hidden" }}>
        <Background />
        <div style={{ position: "relative", zIndex: 2 }}>
          <Navbar />
          <Main />
          <Footer />
        </div>
      </div>
    </Router>
  </>
);

export default App;