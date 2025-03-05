import { Link } from "react-router-dom";
import { useState } from "react";
import { SunIcon, MoonIcon } from "@heroicons/react/24/solid";

const Navbar = () => {
  const [isDark, setIsDark] = useState(false);

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-lg fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <button
              onClick={() => {
                setIsDark(!isDark);
                document.documentElement.classList.toggle("dark");
              }}
              className="text-gray-900 dark:text-white"
            >
              {isDark ? <SunIcon className="h-6 w-6" /> : <MoonIcon className="h-6 w-6" />}
            </button>
            <Link
              to="/"
              className="ml-4 text-xl font-bold text-gray-900 dark:text-white"
            >
              My Portfolio
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link
              to="/"
              className="text-gray-900 dark:text-white hover:text-gray-700 dark:hover:text-gray-300"
            >
              Home
            </Link>
            <Link
              to="/projects"
              className="text-gray-900 dark:text-white hover:text-gray-700 dark:hover:text-gray-300"
            >
              Projects
            </Link>
            <Link
              to="/about"
              className="text-gray-900 dark:text-white hover:text-gray-700 dark:hover:text-gray-300"
            >
              About Me
            </Link>
            <Link
              to="/contact"
              className="text-gray-900 dark:text-white hover:text-gray-700 dark:hover:text-gray-300"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;