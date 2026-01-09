import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  GraduationCap,
  ChevronDown,
  LayoutDashboard,
  User,
  LogOut
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Footer from "./FooterComponents";
import { useAuth } from "../hooks/useAuth";

export default function Layout({ children }) {
  const location = useLocation();
  const navigate = useNavigate();

  const { user, isAuthenticated, role, logout } = useAuth();

  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);

  // console.log(isAuthenticated)

  // Close user dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleDashboardClick = () => {
    setIsUserMenuOpen(false);
    if (role === "learner") navigate("/learner-dashboard");
    if (role === "instructor") navigate("/instructor-dashboard");
  };

  const handleProfileClick = () => {
    setIsUserMenuOpen(false);
    if (role === "learner") navigate("/learner-profile");
    if (role === "instructor") navigate("/instructor-profile");
  };

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
    navigate("/");
  };

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Courses", path: "/courses" },
    { name: "About", path: "/about" },
    { name: "Teach", path: "/teach" },
    { name: "Certificates", path: "/certificates" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a1525] via-[#050b14] to-[#0f1a2a]">
      {/* NAVBAR */}
      <nav className="fixed top-0 w-full z-50 bg-[#0a1525]/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-6">
          {/* LOGO */}
          <Link to="/" className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-cyan-400 to-cyan-500 flex items-center justify-center shadow-lg shadow-cyan-400/20">
              <GraduationCap className="w-7 h-7 text-[#050b14]" />
            </div>
            <span className="text-2xl font-bold text-white">UpSkillr</span>
          </Link>

          {/* NAV LINKS */}
          <ul className="hidden md:flex gap-8 text-gray-400">
            {navItems.map((item) => (
              <motion.li
                key={item.name}
                whileHover={{ color: "#ffffff" }}
                className={`cursor-pointer transition-colors duration-200 ${
                  location.pathname === item.path
                    ? "text-white font-semibold"
                    : ""
                }`}
              >
                <Link to={item.path}>{item.name}</Link>
              </motion.li>
            ))}
          </ul>

          {/* AUTH SECTION */}
          <div className="flex items-center">
            {!isAuthenticated ? (
              /* SIGN IN BUTTON (LOGGED OUT) */
              <motion.button
                onClick={() => navigate("/login")}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 rounded-2xl bg-gradient-to-r from-cyan-400 to-cyan-500 text-[#050b14] font-semibold shadow-lg"
              >
                Sign In
              </motion.button>
            ) : (
              /* USER MENU (LOGGED IN) */
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-3 px-4 py-2 rounded-2xl bg-white/10 hover:bg-white/20 transition-all border border-white/20"
                >
                  {/* Avatar */}
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-white font-bold uppercase">
                    {user?.name?.charAt(0)}
                  </div>

                  {/* Username */}
                  <span className="text-white font-medium hidden md:block">
                    {user?.name}
                  </span>

                  <ChevronDown
                    className={`w-4 h-4 text-white transition-transform ${
                      isUserMenuOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {isUserMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl overflow-hidden"
                    >
                      <button
                        onClick={handleDashboardClick}
                        className="w-full px-6 py-3 text-left hover:bg-gray-50 flex items-center gap-3"
                      >
                        <LayoutDashboard className="w-5 h-5" />
                        Dashboard
                      </button>

                      <button
                        onClick={handleProfileClick}
                        className="w-full px-6 py-3 text-left hover:bg-gray-50 flex items-center gap-3"
                      >
                        <User className="w-5 h-5" />
                        Profile
                      </button>

                      <button
                        onClick={handleLogout}
                        className="w-full px-6 py-3 text-left text-red-600 hover:bg-red-50 flex items-center gap-3 border-t"
                      >
                        <LogOut className="w-5 h-5" />
                        Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* PAGE CONTENT */}
      <main className="pt-24">{children}</main>

      <Footer />
    </div>
  );
}
