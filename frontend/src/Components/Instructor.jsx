import { Link, Navigate, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { DollarSign, Globe, Zap, ArrowRight, Users, BookOpen, Award, Shield } from "lucide-react";

export default function BecomeInstructorSection() {
  const features = [
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Secure Platform",
      description: "Your content is protected. We handle all the technical aspects.",
      gradient: "from-yellow-400 to-orange-500"
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Global Reach",
      description: "Share your expertise with learners from around the world",
      gradient: "from-cyan-400 to-blue-500"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Easy Tools",
      description: "Create engaging content with our intuitive course builder",
      gradient: "from-purple-400 to-pink-500"
    }
  ];

  const stats = [
    { value: "10K+", label: "Active Instructors", icon: <Users className="w-5 h-5" /> },
    { value: "500K+", label: "Students Taught", icon: <BookOpen className="w-5 h-5" /> },
    { value: "$2M+", label: "Earned by Instructors", icon: <Award className="w-5 h-5" /> }
  ];

  const navigate = useNavigate();

  return (
    <section className="relative bg-gradient-to-br from-[#0a1525] via-[#050b14] to-[#0f1a2a] py-28 px-6 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.15, 0.25, 0.15],
            rotate: [0, 180, 360]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-20 right-20 w-[500px] h-[500px] bg-gradient-to-br from-orange-400/20 to-yellow-500/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.1, 0.2, 0.1],
            rotate: [360, 180, 0]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-20 left-20 w-[500px] h-[500px] bg-gradient-to-tr from-purple-400/20 to-cyan-400/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-blue-500/15 to-purple-500/15 rounded-full blur-3xl"
        />
      </div>

      <div className="relative max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center z-10">
        {/* LEFT CONTENT */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <span className="inline-block mb-6 px-5 py-2 rounded-full text-sm bg-gradient-to-r from-orange-500/10 to-yellow-500/10 border border-orange-400/20 text-orange-400 font-medium">
              Become an Instructor
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-5xl md:text-6xl font-bold text-white leading-tight mb-6"
          >
            Share Your Knowledge,{" "}
            <span className="relative inline-block">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-500">
                Impact Lives
              </span>
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                viewport={{ once: true }}
                className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-orange-400 to-yellow-500 rounded-full"
              />
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-gray-400 text-lg leading-relaxed mb-8"
          >
            Join thousands of instructors who are making a difference by teaching
            what they love. Create courses, connect with learners, and build your
            educational legacy.
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={()=>navigate("/teach")}
              className="group relative px-8 py-4 rounded-2xl bg-gradient-to-r from-orange-400 to-yellow-500 text-white font-semibold text-lg hover:from-orange-300 hover:to-yellow-400 transition-all duration-300 shadow-lg shadow-orange-400/30 hover:shadow-xl hover:shadow-orange-400/50 flex items-center gap-3"
            >
              Start Teaching Today
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <ArrowRight className="w-5 h-5" />
              </motion.div>
              {/* Button glow effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-orange-400/20 to-yellow-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></div>
            </motion.button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
            className="mt-12 grid grid-cols-3 gap-6"
          >
            {stats.map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 + idx * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="flex justify-center mb-2 text-orange-400">
                  {stat.icon}
                </div>
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-sm text-gray-400 mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* RIGHT FEATURES */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 + idx * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ x: -8, scale: 1.02 }}
              className="group relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-2xl p-8 hover:border-white/40 transition-all duration-300 cursor-pointer"
            >
              {/* Card glow effect */}
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300 blur-xl`}></div>
              
              <div className="relative flex items-start gap-6">
                {/* Icon */}
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className={`flex-shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center text-white shadow-lg`}
                >
                  {feature.icon}
                </motion.div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-orange-400 group-hover:to-yellow-500 transition-all duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                {/* Arrow indicator */}
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  whileHover={{ opacity: 1, x: 0 }}
                  className="opacity-0 group-hover:opacity-100 transition-all duration-300"
                >
                  <ArrowRight className="w-5 h-5 text-orange-400" />
                </motion.div>
              </div>

              {/* Decorative corner */}
              <div className={`absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 rounded-tr-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                   style={{ borderColor: 'rgb(251 146 60 / 0.3)' }}>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Bottom Wave Decoration */}
      <div className="absolute bottom-0 left-0 w-full h-32 opacity-20">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 0L60 10C120 20 240 40 360 46.7C480 53 600 47 720 43.3C840 40 960 40 1080 46.7C1200 53 1320 67 1380 73.3L1440 80V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V0Z" fill="url(#gradient)" />
          <defs>
            <linearGradient id="gradient" x1="0" y1="0" x2="1440" y2="0">
              <stop offset="0%" stopColor="#fb923c" stopOpacity="0.3" />
              <stop offset="50%" stopColor="#eab308" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#fb923c" stopOpacity="0.3" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </section>
  );
}