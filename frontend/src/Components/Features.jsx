import { Link } from "react-router-dom";
import { Book, Trophy, Users, Zap, Shield, Globe, TrendingUp, Award, Heart } from "lucide-react";
import { motion } from "framer-motion";

export default function WhyChooseUs() {
  const features = [
    {
      icon: <Book />,
      title: "Expert-Led Courses",
      text: "Learn from industry professionals with real-world experience and proven teaching methods that have been refined through years of practical application.",
      gradient: "from-cyan-400 to-blue-500"
    },
    {
      icon: <Trophy />,
      title: "Performance Certificates",
      text: "Earn certificates based on your quiz scores and assessments that truly reflect your skills and demonstrate your expertise to potential employers.",
      gradient: "from-yellow-400 to-orange-500"
    },
    {
      icon: <Users />,
      title: "Active Community",
      text: "Join 50,000+ learners, share knowledge, and grow together with peer support in our vibrant learning ecosystem.",
      gradient: "from-purple-400 to-pink-500"
    },
    {
      icon: <TrendingUp />,
      title: "Progress Tracking",
      text: "Monitor your learning journey with detailed analytics, completion rates, and performance insights to stay motivated and achieve your goals.",
      gradient: "from-green-400 to-emerald-500"
    },
    {
      icon: <Shield />,
      title: "Quality Guaranteed",
      text: "All courses are reviewed and updated regularly to ensure high-quality content that meets current industry standards and best practices.",
      gradient: "from-indigo-400 to-purple-500"
    },
    {
      icon: <Globe />,
      title: "Learn Anywhere",
      text: "Access courses on any device – desktop, tablet, or mobile, anytime, anywhere with our responsive platform designed for seamless learning.",
      gradient: "from-cyan-400 to-teal-500"
    },
    {
      icon: <Award />,
      title: "Skill Assessments",
      text: "Test your knowledge with interactive quizzes and challenges that help reinforce learning and validate your understanding of key concepts.",
      gradient: "from-orange-400 to-red-500"
    },
    {
      icon: <Heart />,
      title: "Personalized Learning",
      text: "Get course recommendations based on your interests and goals. Our AI-powered system adapts to your learning style and pace.",
      gradient: "from-red-400 to-pink-500"
    },
  ];

  return (
    <section className="relative bg-gradient-to-br from-[#0a1525] via-[#050b14] to-[#0f1a2a] py-28 px-6 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.2, 0.1],
            rotate: [0, 180, 360]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute top-40 right-20 w-[500px] h-[500px] bg-gradient-to-br from-cyan-400/20 to-blue-500/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.1, 0.15, 0.1],
            rotate: [360, 180, 0]
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-40 left-20 w-[500px] h-[500px] bg-gradient-to-tr from-purple-400/20 to-cyan-400/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.08, 0.12, 0.08],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-blue-500/15 to-purple-500/15 rounded-full blur-3xl"
        />
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        viewport={{ once: true }}
        className="relative max-w-7xl mx-auto text-center z-10"
      >
        {/* Badge */}
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 mb-6 px-5 py-2 rounded-full text-sm bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-400/20 text-cyan-400 font-medium"
        >
          <Zap className="w-4 h-4" />
          Why Choose Us
        </motion.span>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-4xl md:text-6xl font-bold text-white mb-6"
        >
          Everything You Need to{" "}
          <span className="relative inline-block">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              Succeed
            </span>
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              viewport={{ once: true }}
              className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"
            />
          </span>
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-gray-400 text-lg max-w-3xl mx-auto leading-relaxed"
        >
          We provide all the tools and resources you need to master new skills and
          advance your career with confidence. Experience learning reimagined.
        </motion.p>

        {/* Features Grid */}
        <div className="mt-20 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.05 }}
              viewport={{ once: true }}
              whileHover={{ 
                y: -12,
                scale: 1.02,
                transition: { duration: 0.3, ease: "easeOut" }
              }}
              className="group relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-2xl p-8 flex flex-col items-start gap-5 transition-all duration-300 hover:border-white/40 hover:shadow-2xl overflow-hidden"
            >
              {/* Animated background glow */}
              <motion.div 
                className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-all duration-500 ease-out`}
              />
              
              {/* Top corner gradient accent */}
              <div className={`absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-20 blur-3xl transition-all duration-500`}></div>
              
              {/* Icon container */}
              <motion.div 
                whileHover={{ rotate: 360, scale: 1.15 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className={`relative w-14 h-14 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center text-white shadow-lg z-10`}
              >
                {feature.icon}
                {/* Icon glow */}
                <motion.div 
                  className={`absolute inset-0 rounded-xl bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-50 blur-xl transition-opacity duration-300`}
                />
              </motion.div>
              
              {/* Content section */}
              <div className="relative z-10 flex-1">
                <motion.h4 
                  className="text-white font-bold text-lg mb-3 group-hover:text-cyan-100 transition-colors duration-300"
                  whileHover={{ x: 3 }}
                  transition={{ duration: 0.2 }}
                >
                  {feature.title}
                </motion.h4>
                <motion.p 
                  className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors duration-300"
                  whileHover={{ x: 3 }}
                  transition={{ duration: 0.2, delay: 0.05 }}
                >
                  {feature.text}
                </motion.p>
              </div>
              
              {/* Bottom accent line */}
              <motion.div 
                className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${feature.gradient} rounded-full`}
                initial={{ width: 0 }}
                whileInView={{ width: "0%" }}
                whileHover={{ width: "100%" }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
              
              {/* Corner accent dot */}
              <motion.div 
                className={`absolute top-4 right-4 w-2 h-2 rounded-full bg-gradient-to-br ${feature.gradient} opacity-30 group-hover:opacity-100 group-hover:scale-150 transition-all duration-300`}
              />

              {/* Decorative corner */}
              <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-white/10 group-hover:border-cyan-400/30 rounded-tr-xl transition-all duration-300"></div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA with Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <Link to="/about">
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="group relative px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-500 text-white font-semibold text-lg hover:from-cyan-300 hover:to-blue-400 transition-all duration-300 shadow-lg shadow-cyan-400/30 hover:shadow-xl hover:shadow-cyan-400/50 flex items-center gap-3 mx-auto"
            >
              Explore All Features
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              >
                →
              </motion.span>
              {/* Button glow effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-400/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></div>
            </motion.button>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}