import { Link } from "react-router-dom";
import "../index.css";

export default function NotFound() {
  return (
    <div className="notfound-container">
      {/* Floating glowing shapes */}
      <div className="shape shape1"></div>
      <div className="shape shape2"></div>
      <div className="shape shape3"></div>

      {/* Content */}
      <div className="text-center text-white relative z-10 px-4">
        <h1 className="text-8xl font-extrabold mb-4 animate-bounce drop-shadow-lg">
          404
        </h1>
        <p className="text-xl mb-6 opacity-90">
          Oops! The page you’re looking for doesn’t exist.
        </p>
        <Link
          to="/"
          className="bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-3 rounded-full font-semibold shadow-lg hover:opacity-90 transition"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
