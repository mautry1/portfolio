import { Link } from "react-router-dom";
import Scene from "../components/Scene";

const NotFound = () => {
  return (
    <div className="min-h-screen relative">
      <Scene />
      <div className="relative z-10 flex flex-col items-center justify-center h-screen text-center px-4">
        <h1 className="text-6xl font-bold text-gray-900 dark:text-white mb-4">
          404
        </h1>
        <p className="text-2xl text-gray-700 dark:text-gray-300 mb-8">
          Oops! The page you're looking for doesn't exist.
        </p>
        <Link
          to="/"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;