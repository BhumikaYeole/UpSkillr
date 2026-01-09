import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Lock,
  User,
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

import { useAuth } from "../hooks/useAuth.js";

export default function SignUpPage() {

  const { signupLearner } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const benefits = [
    { icon: <BookOpen className="w-5 h-5" />, text: "Access 1000+ courses" },
    { icon: <Award className="w-5 h-5" />, text: "Earn certificates" },
    { icon: <TrendingUp className="w-5 h-5" />, text: "Track your progress" },
    { icon: <Sparkles className="w-5 h-5" />, text: "Earn UpSkillr coins" }
  ];
  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      signupLearner({
        name: formData.fullName,
        email: formData.email,
        password: formData.password,
        role: "learner"
      })
      alert("Signup successful! You can now sign in.");
      window.location.href = "/learner-dashboard";
    }
    catch (err) {
      alert("Signup failed. Try changing your email or password.");
      console.error(err);

    };

  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a1525] via-[#050b14] to-[#0f1a2a] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      {/* Animated background elements */}
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
          {/* Left Column - Benefits */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="hidden lg:block"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-cyan-400 to-cyan-500 flex items-center justify-center shadow-lg shadow-cyan-400/20">
                <GraduationCap className="w-8 h-8 text-[#050b14]" />
              </div>
              <span className="text-3xl font-bold text-white">UpSkillr</span>
            </div>

            <h1 className="text-5xl font-bold text-white mb-6 leading-tight">
              Start Your Learning
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                Journey Today
              </span>
            </h1>

            <p className="text-gray-400 text-lg mb-8">
              Join thousands of learners building their skills and advancing their careers with UpSkillr.
            </p>

            <div className="space-y-4">
              {benefits.map((benefit, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + idx * 0.1 }}
                  className="flex items-center gap-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 hover:bg-white/10 transition-all"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-400/20 to-blue-500/20 flex items-center justify-center text-cyan-400">
                    {benefit.icon}
                  </div>
                  <span className="text-white font-medium">{benefit.text}</span>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-8 flex items-center gap-6"
            >
              <div className="flex -space-x-3">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 border-2 border-[#050b14]"
                  />
                ))}
              </div>
              <div>
                <div className="text-white font-semibold">50,000+ Learners</div>
                <div className="text-gray-400 text-sm">Already learning with us</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Sign Up Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 lg:p-10 shadow-2xl"
          >
            {/* 100% Free Badge */}
            <div className="flex justify-center mb-6">
              <div className="flex items-center gap-2 bg-gradient-to-r from-green-400/20 to-emerald-400/20 border border-green-400/30 rounded-full px-4 py-2">
                <Check className="w-4 h-4 text-green-400" />
                <span className="text-green-400 font-semibold text-sm">100% Free Forever</span>
              </div>
            </div>

            <h2 className="text-3xl font-bold text-white mb-2 text-center">Create Your Account</h2>
            <p className="text-gray-400 text-center mb-8">Start learning in less than 2 minutes</p>

            <div className="space-y-6">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="John Doe"
                    className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition-all"
                  />
                </div>
              </div>

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
                    placeholder="john@example.com"
                    className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition-all"
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
                    placeholder="••••••••"
                    className="w-full pl-12 pr-12 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="••••••••"
                    className="w-full pl-12 pr-12 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Terms & Conditions */}
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="terms"
                  className="mt-1 w-4 h-4 rounded border-white/20 bg-white/5 text-cyan-400 focus:ring-cyan-400"
                />
                <label htmlFor="terms" className="text-sm text-gray-400">
                  I agree to the{" "}
                  <span className="text-cyan-400 hover:text-cyan-300 transition-colors cursor-pointer">
                    Terms of Service
                  </span>{" "}
                  and{" "}
                  <span className="text-cyan-400 hover:text-cyan-300 transition-colors cursor-pointer">
                    Privacy Policy
                  </span>
                </label>
              </div>

              {/* Submit Button */}
              <motion.button
                onClick={handleSubmit}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 bg-gradient-to-r from-cyan-400 to-blue-500 text-white font-semibold rounded-xl hover:from-cyan-300 hover:to-blue-400 transition-all shadow-lg shadow-cyan-400/25 hover:shadow-xl hover:shadow-cyan-400/40 flex items-center justify-center gap-2"
              >
                Create Free Account
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </div>

            {/* Sign In Link */}
            <div className="mt-6 text-center">
              <span className="text-gray-400">Already have an account? </span>
              <button
                onClick={() => window.location.href = "/login"}
                className="text-cyan-400 hover:text-cyan-300 font-semibold transition-colors"
              >
                Sign In
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}