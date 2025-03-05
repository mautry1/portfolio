import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import Navbar from "./components/Navbar";
import Scene from "./components/Scene";

const App = () => {
  return (
    <Router>
      <div className="min-h-screen relative">
        {/* 3D Background */}
        <Scene />
        
        {/* Content Container */}
        <div className="relative z-10">
          <Navbar />
          <main className="pt-20"> {/* Add padding for navbar */}
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
};

export default App;