import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GraduationCap, ChevronDown, LayoutDashboard, User, RefreshCw, LogOut } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Footer from "./FooterComponents";


export default function Layout({ children }) {
    const location = useLocation();
    const navigate = useNavigate();
    const [isSignInOpen, setIsSignInOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userType, setUserType] = useState(null); // 'learner' or 'instructor'
    const [userName, setUserName] = useState("John Doe");

    const signInRef = useRef(null);
    const userMenuRef = useRef(null);

    // Close dropdowns when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (signInRef.current && !signInRef.current.contains(event.target)) {
                setIsSignInOpen(false);
            }
            if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
                setIsUserMenuOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSignIn = (type) => {
        setUserType(type);
        setIsLoggedIn(true);
        setIsSignInOpen(false);
        setIsUserMenuOpen(true);  // Open user menu dropdown immediately!
        console.log(`Signed in as ${type}`);
    };

    const handleSignOut = () => {
        setIsLoggedIn(false);
        setUserType(null);
        setIsUserMenuOpen(false);
        navigate('/');
    };

    const handleSwitchRole = () => {
        const newRole = userType === 'learner' ? 'instructor' : 'learner';
        setUserType(newRole);
        setIsUserMenuOpen(false);
        
        // Navigate to the new dashboard
        if (newRole === 'learner') {
            navigate('/learner-dashboard');
        } else {
            navigate('/instructor-dashboard');
        }
    };

    const handleDashboardClick = () => {
        setIsUserMenuOpen(false);
        
        // Navigate to appropriate dashboard based on user type
        if (userType === 'learner') {
            navigate('/learner-dashboard');
        } else if (userType === 'instructor') {
            navigate('/instructor-dashboard');
        }
    };

    const handleProfileClick = () => {
        setIsUserMenuOpen(false);
        
        // Navigate to appropriate profile based on user type
        if (userType === 'learner') {
            navigate('/learner-profile');
        } else if (userType === 'instructor') {
            navigate('/instructor-profile');
        }
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
                    <Link to="/" className="flex items-center gap-3">
                        <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-cyan-400 to-cyan-500 flex items-center justify-center shadow-lg shadow-cyan-400/20">
                            <GraduationCap className="w-7 h-7 text-[#050b14]" />
                        </div>
                        <span className="text-2xl font-bold text-white">UpSkillr</span>
                    </Link>

                    <ul className="hidden md:flex gap-8 text-gray-400">
                        {navItems.map((item) => (
                            <motion.li
                                key={item.name}
                                whileHover={{ color: "#ffffff" }}
                                className={`cursor-pointer transition-colors duration-200 ${location.pathname === item.path ? "text-white font-semibold" : ""
                                    }`}
                            >
                                <Link to={item.path}>{item.name}</Link>
                            </motion.li>
                        ))}
                    </ul>

                    {/* Auth Buttons */}
                    <div className="flex gap-4 items-center">
                        {!isLoggedIn ? (
                            <>
                                {/* Sign In Dropdown */}
                                <div className="relative" ref={signInRef}>
                                    <button
                                        onClick={() => setIsSignInOpen(!isSignInOpen)}
                                        className="text-white font-medium hover:text-cyan-400 transition-colors flex items-center gap-1"
                                    >
                                        Sign In
                                        <ChevronDown className={`w-4 h-4 transition-transform ${isSignInOpen ? 'rotate-180' : ''}`} />
                                    </button>

                                    <AnimatePresence>
                                        {isSignInOpen && (
                                            <motion.div
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -10 }}
                                                transition={{ duration: 0.2 }}
                                                className="absolute top-full right-0 mt-2 w-56 bg-white rounded-2xl shadow-2xl overflow-hidden"
                                            >
                                                <button
                                                    onClick={() => handleSignIn('learner')}
                                                    className="w-full px-6 py-4 text-left text-gray-800 hover:bg-gray-50 transition-colors border-b border-gray-100"
                                                >
                                                    <div className="font-semibold">Sign in as Learner</div>
                                                    <div className="text-sm text-gray-500 mt-1">Access your courses</div>
                                                </button>
                                                <button
                                                    onClick={() => handleSignIn('instructor')}
                                                    className="w-full px-6 py-4 text-left text-gray-800 hover:bg-gray-50 transition-colors"
                                                >
                                                    <div className="font-semibold">Sign in as Instructor</div>
                                                    <div className="text-sm text-gray-500 mt-1">Manage your courses</div>
                                                </button>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>

                                {/* Get Started Button */}
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-6 py-3 rounded-2xl bg-gradient-to-r from-cyan-400 to-cyan-500 text-[#050b14] font-semibold shadow-lg shadow-cyan-400/25 hover:shadow-cyan-400/40 transition-all"
                                >
                                    Get Started
                                </motion.button>
                            </>
                        ) : (
                            /* User Profile Dropdown */
                            <div className="relative" ref={userMenuRef}>
                                {/* Avatar Button - Opens Dropdown */}
                                <button
                                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                                    className="flex items-center gap-3 px-4 py-2 rounded-2xl bg-white/10 hover:bg-white/20 transition-all border border-white/20"
                                >
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-white font-bold shadow-lg">
                                        {userName.charAt(0)}
                                    </div>
                                    <div className="hidden md:block text-left">
                                        <div className="text-white font-semibold text-sm">{userName}</div>
                                        <div className="text-gray-400 text-xs capitalize">{userType}</div>
                                    </div>
                                    <ChevronDown className={`w-4 h-4 text-white transition-transform ${isUserMenuOpen ? 'rotate-180' : ''}`} />
                                </button>

                                {/* Dropdown Menu */}
                                <AnimatePresence>
                                    {isUserMenuOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            transition={{ duration: 0.2 }}
                                            className="absolute top-full right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl overflow-hidden"
                                        >
                                            {/* User Info Header */}
                                            <div className="px-6 py-4 border-b border-gray-100 bg-gradient-to-br from-cyan-50 to-blue-50">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-white font-bold shadow-lg text-lg">
                                                        {userName.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <div className="font-bold text-gray-900">{userName}</div>
                                                        <div className="text-sm text-gray-600 capitalize">{userType}</div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Menu Items */}
                                            <div className="py-2">
                                                {/* Dashboard Button */}
                                                <button
                                                    onClick={handleDashboardClick}
                                                    className="w-full px-6 py-3 text-left text-gray-800 hover:bg-gray-50 transition-colors flex items-center gap-3"
                                                >
                                                    <LayoutDashboard className="w-5 h-5 text-gray-600" />
                                                    <span className="font-medium">Dashboard</span>
                                                </button>

                                                {/* Profile Button */}
                                                <button
                                                    onClick={handleProfileClick}
                                                    className="w-full px-6 py-3 text-left text-gray-800 hover:bg-gray-50 transition-colors flex items-center gap-3"
                                                >
                                                    <User className="w-5 h-5 text-gray-600" />
                                                    <span className="font-medium">Profile</span>
                                                </button>

                                                {/* Switch Role Button */}
                                                <button
                                                    onClick={handleSwitchRole}
                                                    className="w-full px-6 py-3 text-left text-gray-800 hover:bg-gray-50 transition-colors flex items-center gap-3 border-t border-gray-100"
                                                >
                                                    <RefreshCw className="w-5 h-5 text-gray-600" />
                                                    <span className="font-medium">
                                                        Switch to {userType === 'learner' ? 'Instructor' : 'Learner'}
                                                    </span>
                                                </button>

                                                {/* Sign Out Button */}
                                                <button
                                                    onClick={handleSignOut}
                                                    className="w-full px-6 py-3 text-left text-red-600 hover:bg-red-50 transition-colors flex items-center gap-3 border-t border-gray-100"
                                                >
                                                    <LogOut className="w-5 h-5" />
                                                    <span className="font-medium">Sign Out</span>
                                                </button>
                                            </div>
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

            {/* FOOTER */}
            <Footer />
        </div>
    );
}