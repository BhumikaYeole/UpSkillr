import { Award, CheckCircle, TrendingUp, Share2, Download, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function CertificateSection() {
  return (
    <section className="relative bg-gradient-to-br from-[#0a1525] via-[#050b14] to-[#0f1a2a] py-28 px-6 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.2, 0.1],
            rotate: [0, 90, 180]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-20 -right-20 w-96 h-96 bg-gradient-to-br from-cyan-400/20 to-blue-500/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.1, 0.15, 0.1],
            rotate: [180, 90, 0]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-20 -left-20 w-96 h-96 bg-gradient-to-tr from-purple-400/20 to-cyan-400/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.05, 0.1, 0.05],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl"
        />
      </div>

      {/* Floating Sparkles */}
      <motion.div
        animate={{ 
          y: [0, -20, 0],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-40 right-1/4 text-cyan-400/40"
      >
        <Sparkles className="w-6 h-6" />
      </motion.div>
      <motion.div
        animate={{ 
          y: [0, 20, 0],
          opacity: [0.2, 0.5, 0.2]
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-40 left-1/4 text-purple-400/40"
      >
        <Sparkles className="w-8 h-8" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        viewport={{ once: true }}
        className="relative max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center z-10"
      >
        {/* LEFT CONTENT */}
        <div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <span className="inline-flex items-center gap-2 mb-6 px-5 py-2 rounded-full text-sm bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-400/20 text-cyan-400 font-medium">
              <Award className="w-4 h-4" />
              Earn Certificates
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-bold text-white leading-tight"
          >
            Get{" "}
            <span className="relative inline-block">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                Certified
              </span>
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                viewport={{ once: true }}
                className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"
              />
            </span>{" "}
            Based on Your Performance
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="mt-6 text-gray-400 text-lg max-w-xl leading-relaxed"
          >
            Complete courses and assessments to earn certificates that showcase
            your skills. Our performance-based certification system ensures your
            achievements reflect your true capabilities.
          </motion.p>

          {/* FEATURES */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
            className="mt-10 grid sm:grid-cols-2 gap-6"
          >
            <Feature
              icon={<Award />}
              title="Performance-Based"
              text="Earn certificates based on quiz scores and completion"
              delay={0.6}
            />
            <Feature
              icon={<CheckCircle />}
              title="Industry Recognized"
              text="Trusted by employers worldwide"
              delay={0.7}
            />
            <Feature
              icon={<TrendingUp />}
              title="Track Progress"
              text="Detailed analytics & performance tracking"
              delay={0.8}
            />
            <Feature
              icon={<Share2 />}
              title="Share Everywhere"
              text="LinkedIn & social media ready"
              delay={0.9}
            />
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
            viewport={{ once: true }}
          >
            <Link to="/certificates">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="mt-12 group relative px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-500 text-white font-semibold text-lg hover:from-cyan-300 hover:to-blue-400 transition-all duration-300 shadow-lg shadow-cyan-400/30 hover:shadow-xl hover:shadow-cyan-400/50 flex items-center gap-2"
              >
                Start Earning Certificates
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
        </div>

        {/* RIGHT CERTIFICATE */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotateY: -20 }}
          whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          viewport={{ once: true }}
          animate={{ y: [0, -15, 0] }}
          className="relative perspective-1000"
          style={{ perspective: "1000px" }}
        >
          <motion.div
            whileHover={{
              scale: 1.02,
              rotateY: 5,
              boxShadow: "0 30px 80px rgba(34,211,238,0.4)",
            }}
            transition={{ duration: 0.3 }}
            className="relative rounded-3xl p-10 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 shadow-2xl"
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* Decorative corner elements */}
            <div className="absolute top-6 left-6 w-12 h-12 border-t-2 border-l-2 border-cyan-400/30 rounded-tl-2xl"></div>
            <div className="absolute top-6 right-6 w-12 h-12 border-t-2 border-r-2 border-cyan-400/30 rounded-tr-2xl"></div>
            <div className="absolute bottom-6 left-6 w-12 h-12 border-b-2 border-l-2 border-cyan-400/30 rounded-bl-2xl"></div>
            <div className="absolute bottom-6 right-6 w-12 h-12 border-b-2 border-r-2 border-cyan-400/30 rounded-br-2xl"></div>

            {/* Glow effect behind certificate */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/10 via-blue-500/10 to-purple-500/10 rounded-3xl blur-2xl opacity-50"></div>

            {/* ICON */}
            <div className="relative flex justify-center mb-6">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 w-20 h-20 mx-auto bg-gradient-to-r from-cyan-400/20 to-blue-500/20 rounded-full blur-xl"
              />
              <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-white shadow-lg shadow-cyan-400/50">
                <Award size={32} strokeWidth={2.5} />
              </div>
            </div>

            <p className="text-center text-xs tracking-[0.3em] text-gray-400 font-semibold">
              CERTIFICATE OF COMPLETION
            </p>

            <h3 className="mt-4 text-center text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              UpSkillr Academy
            </h3>

            <div className="my-6 w-24 h-[2px] mx-auto bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent"></div>

            <p className="text-center text-gray-400 text-sm">
              This is to certify that
            </p>

            <h4 className="mt-3 text-center text-2xl font-bold text-white">
              John Doe
            </h4>

            <p className="mt-6 text-center text-gray-400 text-sm">
              has successfully completed the course
            </p>

            <p className="mt-3 text-center text-cyan-400 font-semibold text-lg">
              "Complete Web Development Bootcamp"
            </p>

            {/* SCORE */}
            <div className="mt-8 flex justify-center">
              <motion.span
                whileHover={{ scale: 1.05 }}
                className="px-6 py-2 rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-400 border border-cyan-400/30 font-semibold backdrop-blur-sm"
              >
                Score: 95% – Distinction ⭐
              </motion.span>
            </div>

            {/* FOOTER */}
            <div className="mt-8 pt-6 border-t border-white/10 flex justify-between text-sm">
              <div>
                <p className="text-gray-500 text-xs">Date</p>
                <p className="text-white font-semibold mt-1">Dec 12, 2024</p>
              </div>
              <div className="text-right">
                <p className="text-gray-500 text-xs">Certificate ID</p>
                <p className="text-white font-semibold mt-1">USK-2024-12345</p>
              </div>
            </div>

            {/* DOWNLOAD BUTTON */}
            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="mt-8 w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 text-white font-semibold hover:from-cyan-300 hover:to-blue-400 transition-all duration-300 shadow-lg shadow-cyan-400/30"
            >
              <Download size={18} />
              Download Certificate
            </motion.button>
          </motion.div>

          {/* Floating badges around certificate */}
          <motion.div
            animate={{ 
              y: [0, -10, 0],
              rotate: [0, 5, 0]
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-6 -right-6 w-20 h-20 rounded-full bg-gradient-to-br from-green-400/20 to-emerald-500/20 backdrop-blur-md border border-green-400/30 flex items-center justify-center shadow-lg"
          >
            <CheckCircle className="w-10 h-10 text-green-400" />
          </motion.div>

          <motion.div
            animate={{ 
              y: [0, 10, 0],
              rotate: [0, -5, 0]
            }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute -bottom-6 -left-6 w-20 h-20 rounded-full bg-gradient-to-br from-purple-400/20 to-pink-500/20 backdrop-blur-md border border-purple-400/30 flex items-center justify-center shadow-lg"
          >
            <TrendingUp className="w-10 h-10 text-purple-400" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* FEATURE ITEM */
function Feature({ icon, title, text, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true }}
      whileHover={{ x: 5 }}
      className="flex gap-4 group cursor-pointer"
    >
      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-400/20 text-cyan-400 flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:border-cyan-400/40 transition-all duration-300">
        {icon}
      </div>
      <div>
        <h4 className="text-white font-semibold text-lg group-hover:text-cyan-400 transition-colors duration-200">
          {title}
        </h4>
        <p className="text-gray-400 text-sm mt-1 leading-relaxed">{text}</p>
      </div>
    </motion.div>
  );
}