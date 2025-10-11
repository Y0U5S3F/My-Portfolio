import Hero from "../components/Home/Hero";
import AboutMe from "../components/Home/AboutMe";
import Skills from "../components/Home/Skills";
import Projects from "../components/Home/Projects";
import Contact from "../components/Home/Contact";
import { Box } from "@mui/material";

const Main = () => (
  <Box
    component="main"
    sx={{
      width: "100vw",
    }}
  >
    <Hero />
    <AboutMe />
    <Skills />
    <Projects />
    <Contact />
  </Box>
);

export default Main;