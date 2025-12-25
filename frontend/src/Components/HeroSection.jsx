import { motion, useMotionValue, useTransform } from "framer-motion";
import { Play, GraduationCap, Users, BookOpen, Star } from "lucide-react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function HeroSection() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX - window.innerWidth / 2);
      mouseY.set(e.clientY - window.innerHeight / 2);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const moveSlow = (factor) => ({
    x: useTransform(mouseX, (v) => v * factor),
    y: useTransform(mouseY, (v) => v * factor),
  });

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-[#0a1525] via-[#050b14] to-[#0f1a2a] text-white overflow-hidden">
      {/* Animated Background Blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 left-20 w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/15 rounded-full blur-3xl"
        />
      </div>

      {/* FLOATING ELEMENTS */}
      <div className="absolute inset-0 pointer-events-none hidden md:block">
        {/* Certificate - Top Left */}
        <motion.div
          style={moveSlow(0.02)}
          animate={{ 
            y: [0, -20, 0],
            rotate: [-2, 2, -2]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-32 left-16 w-72 h-44 rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 backdrop-blur-md p-6 shadow-2xl"
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg bg-cyan-400/20 flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-cyan-400" />
            </div>
            <p className="text-xs text-white/60 font-medium">Certificate of Completion</p>
          </div>
          <div className="space-y-2 mt-6">
            <div className="h-2 w-3/4 bg-white/10 rounded-full" />
            <div className="h-2 w-1/2 bg-white/10 rounded-full" />
          </div>
          <p className="mt-4 text-white/40 text-sm font-medium">Web Development</p>
        </motion.div>

        {/* Book - Bottom Left */}
        <motion.div
          style={moveSlow(0.04)}
          animate={{ 
            y: [0, 30, 0],
            rotate: [2, -2, 2]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-32 left-20 w-64 h-40 rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 backdrop-blur-md p-6 shadow-2xl"
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg bg-purple-400/20 flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-purple-400" />
            </div>
            <p className="text-xs text-white/60 font-medium">Learning Guide</p>
          </div>
          <p className="mt-6 text-white/40 text-sm">JavaScript Basics</p>
          <div className="mt-3 flex gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3 h-3 text-yellow-400 fill-yellow-400" />
            ))}
          </div>
        </motion.div>

        {/* Document - Top Right */}
        <motion.div
          style={moveSlow(0.03)}
          animate={{ 
            y: [0, -25, 0],
            rotate: [2, -1, 2]
          }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-40 right-20 w-72 h-44 rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 backdrop-blur-md p-6 shadow-2xl"
        >
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-blue-400/20 flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-blue-400" />
            </div>
            <p className="text-xs text-white/60 font-medium">Course Outline</p>
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-cyan-400" />
              <div className="h-1.5 w-3/4 bg-white/10 rounded-full" />
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-cyan-400/60" />
              <div className="h-1.5 w-2/3 bg-white/10 rounded-full" />
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-cyan-400/30" />
              <div className="h-1.5 w-1/2 bg-white/10 rounded-full" />
            </div>
          </div>
        </motion.div>

        {/* Additional Certificate - Bottom Right */}
        <motion.div
          style={moveSlow(0.025)}
          animate={{ 
            y: [0, 20, 0],
            rotate: [-1, 1, -1]
          }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-40 right-32 w-64 h-40 rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 backdrop-blur-md p-6 shadow-2xl"
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg bg-green-400/20 flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-green-400" />
            </div>
            <p className="text-xs text-white/60 font-medium">Achievement</p>
          </div>
          <p className="mt-6 text-white/40 text-sm">Python Programming</p>
          <div className="mt-3 text-green-400 text-xs font-semibold">Completed</div>
        </motion.div>
      </div>

      {/* HERO CONTENT */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 pt-20 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="mb-8 px-6 py-3 rounded-full bg-gradient-to-r from-cyan-400/10 to-blue-500/10 border border-cyan-400/20 text-cyan-400 text-sm font-medium inline-flex items-center gap-2">
            🚀 100% Free Courses with Certificates
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-7xl font-extrabold max-w-5xl leading-tight"
        >
          Unlock Your Potential <br />
          with{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
            Free Learning
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-6 text-gray-400 text-lg max-w-3xl leading-relaxed"
        >
          Master in-demand skills with our expert-led courses. Earn certificates
          based on your performance and accelerate your career growth.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 mt-10"
        >
          <Link to="/courses">
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-400 to-cyan-500 text-[#050b14] font-semibold shadow-lg shadow-cyan-400/25 hover:shadow-xl hover:shadow-cyan-400/40 transition-all duration-300 flex items-center justify-center gap-2"
            >
              Start Learning Free
              <span className="text-lg">→</span>
            </motion.button>
          </Link>
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', '_blank')}
            className="px-8 py-4 rounded-2xl border border-white/20 bg-white/5 backdrop-blur-sm hover:bg-white/10 hover:border-white/30 transition-all duration-300 flex items-center justify-center gap-2 font-semibold"
          >
            <Play size={18} className="fill-current" />
            Watch Demo
          </motion.button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-12 md:gap-16 mt-20"
        >
          {[
            { icon: <Users className="w-6 h-6" />, value: "50K+", label: "Active Learners" },
            { icon: <BookOpen className="w-6 h-6" />, value: "200+", label: "Free Courses" },
            { icon: <Star className="w-6 h-6" />, value: "4.9", label: "Average Rating" },
          ].map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 + idx * 0.1 }}
              className="flex flex-col items-center"
            >
              <div className="text-cyan-400 mb-2">{stat.icon}</div>
              <h3 className="text-4xl font-bold">{stat.value}</h3>
              <p className="text-gray-400 mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}