import { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import API_BASE_URL from "../utils/api";

export default function Navbar({ score }) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const { user, logout, loading } = useAuth();

  // ✅ Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const linkClass = ({ isActive }) =>
    `text-sm font-medium ${
      isActive ? "text-blue-300" : "text-white/80 hover:text-white"
    }`;

  function handleLogout() {
    logout();
    setOpen(false);
    navigate("/login");
  }

  function goTo(path) {
    setOpen(false);
    navigate(path);
  }

  // 🖼️ Profile image (PRODUCTION SAFE)
  const profileImage =
    user?.profileImage
      ? `${API_BASE_URL}${user.profileImage}`
      : "https://i.pravatar.cc/40";

  return (
    <nav className="fixed top-0 left-0 w-full bg-indigo-900 text-white shadow-md z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <h1
          onClick={() => navigate("/")}
          className="text-xl font-bold cursor-pointer"
        >
          EduQ
        </h1>

        {/* Nav Links */}
        <div className="hidden md:flex items-center space-x-6">
          <NavLink to="/" className={linkClass}>
            Home
          </NavLink>

          <NavLink to="/leaderboard" className={linkClass}>
            Leaderboard
          </NavLink>

          <NavLink to="/leaderboard/global" className={linkClass}>
            Global Leaderboard
          </NavLink>

          {user?.isAdmin && (
            <NavLink to="/admin" className={linkClass}>
              Admin
            </NavLink>
          )}
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-3">
          {/* ⏳ Wait until auth loads */}
          {loading ? null : !user ? (
            <>
              <button
                onClick={() => navigate("/login")}
                className="text-sm bg-blue-600 px-4 py-1.5 rounded-md hover:bg-blue-700"
              >
                Login
              </button>

              <button
                onClick={() => navigate("/register")}
                className="text-sm border border-white/30 px-4 py-1.5 rounded-md hover:bg-white/10"
              >
                Register
              </button>
            </>
          ) : (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setOpen(!open)}
                className="flex items-center space-x-2 cursor-pointer focus:outline-none"
              >
                <img
                  src={profileImage}
                  alt="profile"
                  className="w-9 h-9 rounded-full border-2 border-white object-cover"
                />

                <span className="hidden sm:block text-sm font-medium">
                  {user.name}
                </span>
              </button>

              {open && (
                <div className="absolute right-0 mt-3 w-52 bg-white text-gray-700 rounded-lg shadow-lg overflow-hidden z-50">
                  <div className="px-4 py-3 border-b">
                    <p className="font-semibold text-purple-900">
                      {user.name}
                    </p>
                    <p className="text-xs">
                      Score: <b>{score}</b>
                    </p>
                  </div>

                  <button
                    onClick={() => goTo("/leaderboard")}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                  >
                    Leaderboard
                  </button>

                  <button
                    onClick={() => goTo("/leaderboard/global")}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                  >
                    Global Leaderboard
                  </button>

                  {user.isAdmin && (
                    <button
                      onClick={() => goTo("/admin")}
                      className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                    >
                      Admin Panel
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => goTo("/profile")}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                  >
                    Edit Profile
                  </button>

                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 font-semibold hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
