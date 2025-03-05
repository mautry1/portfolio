import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Scene from "./components/Scene";
import LoadingSpinner from "./components/LoadingSpinner"; // New component

// Lazy load pages for better performance
const Home = lazy(() => import("./pages/Home"));
const Projects = lazy(() => import("./pages/Projects"));
const AboutMe = lazy(() => import("./pages/AboutMe"));
const Contact = lazy(() => import("./pages/Contact"));
const NotFound = lazy(() => import("./pages/NotFound")); // New 404 page

const App = () => {
  return (
    <Router>
      <div className="fixed top-0 left-0 w-full h-full -z-50">
        {/* 3D Background */}
        <Scene />
      </div> 

        {/* Content Container */}
        <div className="relative z-10 h-full">
          <Navbar />
          <main className="pt-20 h-full">
            <Suspense fallback={<LoadingSpinner />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/about" element={<AboutMe />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="*" element={<NotFound />} /> {/* 404 Route */}
              </Routes>
            </Suspense>
          </main>
        </div>
    </Router>
  );
};

export default App;