import { motion } from "framer-motion";
import { ArrowRight, Check, Star, Users } from "lucide-react";

export default function CTASection() {
  const benefits = [
    { icon: <Check className="w-4 h-4" />, text: "No credit card required" },
    { icon: <Check className="w-4 h-4" />, text: "Cancel anytime" }
  ];

  const handleCreateAccount = () => {
    window.location.href = "/signup";
  };

  const handleBrowseCourses = () => {
    window.location.href = "/courses";
  };

  return (
    <section className="relative bg-gradient-to-br from-[#0a1525] via-[#050b14] to-[#0f1a2a] py-20 px-6 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
            rotate: [0, 180, 360]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-cyan-400/10 to-blue-500/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.1, 0.15, 0.1],
            rotate: [360, 180, 0]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-purple-400/10 to-cyan-400/10 rounded-full blur-3xl"
        />
      </div>

      {/* 100% Free Forever Badge */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="flex justify-center mb-8"
      >
        <div className="relative">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 bg-gradient-to-r from-cyan-400/20 to-green-400/20 
                       border border-cyan-400/30 rounded-full px-6 py-3 backdrop-blur-xl
                       hover:border-cyan-400/50 transition-all duration-300"
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <Star className="w-5 h-5 text-cyan-400 fill-cyan-400" />
            </motion.div>
            <span className="text-cyan-400 font-semibold text-sm">
              100% Free 
            </span>
          </motion.div>
          {/* Glow effect */}
          <div className="absolute inset-0 bg-cyan-400/20 rounded-full blur-xl opacity-50"></div>
        </div>
      </motion.div>

      <div className="relative max-w-4xl mx-auto text-center z-10">
        {/* Main Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-4xl md:text-6xl font-bold text-white mb-6"
        >
          Ready to{" "}
          <span className="relative">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              Start Learning
            </span>
            <motion.div
              animate={{ scaleX: [0, 1] }}
              transition={{ duration: 1, delay: 1 }}
              className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"
            />
          </span>
          ?
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto mb-8 leading-relaxed"
        >
          Join over{" "}
          <span className="text-cyan-400 font-semibold">50,000 learners</span>{" "}
          who are already building their future with UpSkillr. No credit card
          required. Start learning today and earn your first certificate!
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8"
        >
          {/* Primary CTA Button */}
          <motion.button
            onClick={handleCreateAccount}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="group relative bg-gradient-to-r from-cyan-400 to-blue-500 
                       text-white font-semibold px-8 py-4 rounded-2xl
                       hover:from-cyan-300 hover:to-blue-400 transition-all duration-300
                       shadow-lg shadow-cyan-400/25 hover:shadow-xl hover:shadow-cyan-400/40
                       flex items-center gap-3 min-w-[200px] justify-center"
          >
            <span>Create Free Account</span>
            <motion.div
              whileHover={{ x: 5 }}
              transition={{ duration: 0.2 }}
            >
              <ArrowRight className="w-5 h-5" />
            </motion.div>
            {/* Button glow effect */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-400/20 to-blue-500/20 
                            opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></div>
          </motion.button>

          {/* Secondary CTA Button */}
          <motion.button
            onClick={handleBrowseCourses}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="group bg-white/10 backdrop-blur-xl border border-white/20 
                       text-white font-semibold px-8 py-4 rounded-2xl
                       hover:bg-white/15 hover:border-white/30 transition-all duration-300
                       flex items-center gap-3 min-w-[200px] justify-center"
          >
            <Users className="w-5 h-5" />
            <span>Browse Courses</span>
          </motion.button>
        </motion.div>

        {/* Benefits List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-6 text-sm text-gray-400"
        >
          {benefits.map((benefit, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.9 + idx * 0.1 }}
              viewport={{ once: true }}
              className="flex items-center gap-2 group"
            >
              <div className="text-green-400 group-hover:text-green-300 transition-colors duration-200">
                {benefit.icon}
              </div>
              <span className="group-hover:text-gray-300 transition-colors duration-200">
                {benefit.text}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          viewport={{ once: true }}
          className="mt-12 flex flex-wrap justify-center items-center gap-8 opacity-60"
        >
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 border-2 border-[#050b14]"
                />
              ))}
            </div>
            <span className="text-gray-400 text-sm ml-2">50,000+ happy learners</span>
          </div>
          
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            ))}
            <span className="text-gray-400 text-sm ml-2">4.9/5 rating</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}