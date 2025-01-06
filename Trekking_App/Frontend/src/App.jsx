import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./componets/NavBar";
import CoverPage from "./pages/CoverPage";
import Footer from "./pages/Footer";
import Founders from "./pages/Founders";
import Activities from "./pages/Activities";
import SignUp from "./pages/SignUp";

const App = () => {
  return (
    <Router>
      <NavBar />

      <Routes>
        <Route
          path="/"
          element={
            <>
              <section id="cover">
                <CoverPage />
              </section>
              <section id="activities">
  <Activities />
</section>

              <section id="founders">
                <Founders />
              </section>
              <section id="footer">
                <Footer />
              </section>
            </>
          }
        />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
  );
};

export default App;
