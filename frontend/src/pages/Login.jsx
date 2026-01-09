import React, { useState } from "react";
import { motion } from "framer-motion";
import {
    Mail,
    Lock,
    Eye,
    EyeOff,
    ArrowRight,
    Check,
    GraduationCap,
    BookOpen,
    Award,
    TrendingUp,
    Sparkles
} from "lucide-react";

import { useAuth } from "../hooks/useAuth";

export default function LoginPage() {
    const { login } = useAuth();

    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const benefits = [
        { icon: <BookOpen className="w-5 h-5" />, text: "Continue your courses" },
        { icon: <Award className="w-5 h-5" />, text: "Access certificates" },
        { icon: <TrendingUp className="w-5 h-5" />, text: "Track your progress" },
        { icon: <Sparkles className="w-5 h-5" />, text: "Personalized learning" }
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await login({
                email: formData.email,
                password: formData.password
            });

            window.location.href = "/learner-dashboard";
        } catch (err) {
            alert("Invalid email or password");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#0a1525] via-[#050b14] to-[#0f1a2a] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            {/* Animated background */}
            <div className="absolute inset-0 overflow-hidden">
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.05, 0.1, 0.05],
                        rotate: [0, 180, 360]
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-cyan-400/20 to-blue-500/20 rounded-full blur-3xl"
                />
                <motion.div
                    animate={{
                        scale: [1.2, 1, 1.2],
                        opacity: [0.05, 0.1, 0.05],
                        rotate: [360, 180, 0]
                    }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                    className="absolute bottom-20 left-20 w-96 h-96 bg-gradient-to-tr from-purple-400/20 to-cyan-400/20 rounded-full blur-3xl"
                />
            </div>

            <div className="max-w-6xl w-full relative z-10">
                <div className="grid lg:grid-cols-2 gap-8 items-center">
                    {/* LEFT – BENEFITS */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="hidden lg:block"
                    >


                        <h1 className="text-5xl font-bold text-white mb-6 leading-tight">
                            Welcome Back
                            <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                                Continue Learning
                            </span>
                        </h1>

                        <p className="text-gray-400 text-lg mb-8">
                            Log in to continue your learning journey and pick up where you left off.
                        </p>

                        <div className="space-y-4">
                            {benefits.map((benefit, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5, delay: 0.2 + idx * 0.1 }}
                                    className="flex items-center gap-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4"
                                >
                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-400/20 to-blue-500/20 flex items-center justify-center text-cyan-400">
                                        {benefit.icon}
                                    </div>
                                    <span className="text-white font-medium">{benefit.text}</span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* RIGHT – LOGIN FORM */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Email Address
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white"
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full pl-12 pr-12 py-3 bg-white/5 border border-white/10 rounded-xl text-white"
                                />
                            </div>
                        </div>

                        {/* Submit */}
                        <motion.button
                            type="submit"
                            disabled={loading}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full py-4 bg-gradient-to-r from-cyan-400 to-blue-500 text-white font-semibold rounded-xl"
                        >
                            {loading ? "Signing In..." : "Sign In"}
                        </motion.button>
                    </form>

                    <div className="mt-6 text-center">
                        <span className="text-gray-400">Don’t have an account? </span>
                        <button
                            onClick={() => (window.location.href = "/signup")}
                            className="text-cyan-400 hover:text-cyan-300 font-semibold"
                        >
                            Create one
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
