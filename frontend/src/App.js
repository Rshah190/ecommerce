import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import webFont from "webfontloader";
import React from "react";

/*************import components*********** */
import Header from "./components/layouts/Header/Header.js";
import Footer from "./components/layouts/Footer/Footer.js";
import Home from "./components/Home/Home.js";
function App() {
  React.useEffect(() => {
    webFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "chilanka"],
      },
    });
  }, []);
  return (
    <Router>
      <Header />

      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
