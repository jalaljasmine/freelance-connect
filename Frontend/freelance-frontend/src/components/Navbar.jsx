// components/Navbar.jsx — Top navigation bar for SkillLink
// Shows different links based on login status

import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // Helper to check if a link is active
  const isActive = (path) => location.pathname === path;
  const linkClass = (path) =>
    `text-sm font-medium transition-colors duration-200 ${
      isActive(path)
        ? "text-brand-600"
        : "text-gray-500 hover:text-brand-600"
    }`;

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-gray-100 px-6 py-4 flex items-center justify-between sticky top-0 z-50 shadow-sm">
      {/* Logo */}
      <Link to="/" className="flex items-center gap-2 group">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
          <span className="text-white font-bold text-sm">S</span>
        </div>
        <span className="text-xl font-bold text-gray-800">
          Skill<span className="text-brand-600">Link</span>
        </span>
      </Link>

      {/* Links */}
      <div className="flex items-center gap-6">
        <Link to="/" className={linkClass("/")}>
          Home
        </Link>
        <Link to="/tutors" className={linkClass("/tutors")}>
          Find Tutors
        </Link>

        {user ? (
          <>
            <Link to="/booking" className={linkClass("/booking")}>
              Book Session
            </Link>
            <Link to="/dashboard" className={linkClass("/dashboard")}>
              Dashboard
            </Link>

            <div className="flex items-center gap-3 ml-2 pl-4 border-l border-gray-200">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center text-white text-sm font-bold shadow-sm">
                {user.name?.charAt(0).toUpperCase()}
              </div>
              <span className="text-sm font-medium text-gray-700">{user.name}</span>
              <button
                onClick={handleLogout}
                className="text-sm text-gray-400 hover:text-red-500 font-medium transition-colors duration-200"
              >
                Logout
              </button>
            </div>
          </>
        ) : (
          <div className="flex items-center gap-3 ml-2">
            <Link
              to="/login"
              className="text-sm font-medium text-gray-500 hover:text-brand-600 transition-colors duration-200"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="bg-brand-600 text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-brand-700 transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5"
            >
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
