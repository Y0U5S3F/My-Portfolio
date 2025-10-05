import { CssBaseline } from "@mui/material";
import { BrowserRouter as Router } from "react-router-dom";
import Main from "./pages/Main";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const App = () => {
  return (
    <>
      <CssBaseline />
      <Router>
        <Navbar />
        <Main />
        <Footer />
      </Router>
    </>
  );
};

export default App;
