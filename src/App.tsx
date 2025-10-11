import { CssBaseline } from "@mui/material";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Main from "./pages/Main";

const App = () => (
  <>
    <CssBaseline />
    <Router>
      <Navbar />
      <Main />
      <Footer />
    </Router>
  </>
);

export default App;
