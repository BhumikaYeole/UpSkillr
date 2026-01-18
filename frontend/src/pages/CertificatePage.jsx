import { Award, Download, Share2, CheckCircle, Star, Trophy, Medal, Sparkles, TrendingUp, ExternalLink, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";
import { verifyCertificateApi } from "../api/auth";

export default function CertificatePage() {
  const [showVerifyModal, setShowVerifyModal] = useState(false);
  const [certificateId, setCertificateId] = useState("");
  const [verificationResult, setVerificationResult] = useState(null);

  const features = [
    {
      icon: <Award className="w-6 h-6" />,
      title: "Performance-Based",
      description: "Certificates based on quiz scores and assessments",
      gradient: "from-cyan-400 to-blue-500"
    },
    {
      icon: <CheckCircle className="w-6 h-6" />,
      title: "Industry Recognized",
      description: "Trusted by employers worldwide",
      gradient: "from-green-400 to-emerald-500"
    },
    {
      icon: <Share2 className="w-6 h-6" />,
      title: "Easy Sharing",
      description: "Share on LinkedIn and social media",
      gradient: "from-purple-400 to-pink-500"
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Career Growth",
      description: "Boost your resume and career prospects",
      gradient: "from-orange-400 to-red-500"
    }
  ];

  const handleVerifyCertificate = () => {
    if (!certificateId.trim()) {
      setVerificationResult({ success: false, message: "Please enter a certificate ID" });
      return;
    }

    setTimeout(async() => {
      const res = await verifyCertificateApi(certificateId)
      console.log(res)
      
      setVerificationResult({
         success: true,
          message: "Certificate verified successfully!",
          details: {
            name: res.name,
            course: res.course,
            score: res.score,
            date: res.date,
            instructor: res.instructor
      }})
    }, 1000);
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a1525] via-[#050b14] to-[#0f1a2a]">
      {/* HERO SECTION */}
      <section className="relative py-20 px-6 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.15, 0.25, 0.15],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-20 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.15, 0.25, 0.15],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-40 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl"
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 mb-6 px-5 py-2 rounded-full text-sm bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-400/20 text-cyan-400 font-medium"
          >
            <Award className="w-4 h-4" />
            Performance-Based Certificates
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold text-white mb-6"
          >
            Get{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              Certified
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-gray-400 text-lg mb-12 max-w-3xl mx-auto"
          >
            Earn industry-recognized certificates based on your performance. Showcase your skills and advance your career with credentials that matter.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto mb-16"
          >
            <div>
              <div className="text-4xl font-bold text-white mb-2">500K+</div>
              <div className="text-sm text-gray-400">Certificates Issued</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">95%</div>
              <div className="text-sm text-gray-400">Employer Recognition</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">100+</div>
              <div className="text-sm text-gray-400">Course Categories</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">24/7</div>
              <div className="text-sm text-gray-400">Verification Access</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="relative py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                whileHover={{ y: -8 }}
                className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-white/30 transition-all duration-300"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center text-white mb-4`}>
                  {feature.icon}
                </div>
                <h3 className="text-white font-bold text-lg mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SAMPLE CERTIFICATE SECTION */}
      <section className="relative py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Sample Certificate
            </h2>
            <p className="text-gray-400 text-lg">
              Here's what your certificate will look like
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative"
          >
            <div className="relative rounded-3xl p-8 md:p-12 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 shadow-2xl">
              <div className="absolute top-6 left-6 w-12 h-12 border-t-2 border-l-2 border-cyan-400/30 rounded-tl-2xl"></div>
              <div className="absolute top-6 right-6 w-12 h-12 border-t-2 border-r-2 border-cyan-400/30 rounded-tr-2xl"></div>
              <div className="absolute bottom-6 left-6 w-12 h-12 border-b-2 border-l-2 border-cyan-400/30 rounded-bl-2xl"></div>
              <div className="absolute bottom-6 right-6 w-12 h-12 border-b-2 border-r-2 border-cyan-400/30 rounded-br-2xl"></div>

              <motion.div
                animate={{ y: [0, -10, 0], opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute top-1/4 right-16 text-cyan-400/40"
              >
                <Sparkles className="w-5 h-5" />
              </motion.div>
              <motion.div
                animate={{ y: [0, 10, 0], opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                className="absolute bottom-1/4 left-16 text-purple-400/40"
              >
                <Sparkles className="w-6 h-6" />
              </motion.div>

              <div className="flex justify-center mb-6">
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="w-20 h-20 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center shadow-lg shadow-cyan-400/50"
                >
                  <Award className="w-10 h-10 text-white" />
                </motion.div>
              </div>

              <p className="text-center text-xs tracking-[0.3em] text-gray-400 font-semibold mb-4">
                CERTIFICATE OF COMPLETION
              </p>

              <h3 className="text-center text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-6">
                UpSkillr Academy
              </h3>

              <div className="w-24 h-[2px] mx-auto bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent mb-6"></div>

              <p className="text-center text-gray-400 text-base mb-3">This is to certify that</p>
              <h4 className="text-center text-2xl md:text-3xl font-bold text-white mb-6">John Doe</h4>

              <p className="text-center text-gray-400 text-base mb-3">has successfully completed the course</p>
              <p className="text-center text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-6">
                "Complete Web Development Bootcamp"
              </p>

              <div className="flex justify-center mb-6">
                <span className="px-6 py-2 rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-400/30 text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                  Score: 95% – Distinction ⭐
                </span>
              </div>

              <div className="grid md:grid-cols-3 gap-6 pt-6 border-t border-white/10">
                <div className="text-center">
                  <p className="text-gray-500 text-xs mb-1">Instructor</p>
                  <p className="text-white font-semibold text-sm">Sarah Johnson</p>
                </div>
                <div className="text-center">
                  <p className="text-gray-500 text-xs mb-1">Date Issued</p>
                  <p className="text-white font-semibold text-sm">December 12, 2024</p>
                </div>
                <div className="text-center">
                  <p className="text-gray-500 text-xs mb-1">Certificate ID</p>
                  <p className="text-white font-semibold text-sm">USK-2024-12345</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mt-8">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="py-3 rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-500 text-white font-semibold flex items-center justify-center gap-2 shadow-lg shadow-cyan-400/30 hover:shadow-cyan-400/50 transition-all"
                >
                  <Download className="w-5 h-5" />
                  Download Certificate
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="py-3 rounded-2xl bg-white/10 border border-white/20 text-white font-semibold flex items-center justify-center gap-2 hover:bg-white/20 transition-all"
                >
                  <Share2 className="w-5 h-5" />
                  Share on LinkedIn
                </motion.button>
              </div>
            </div>

            <motion.div
              animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -top-6 -right-6 w-16 h-16 rounded-full bg-gradient-to-br from-green-400/20 to-emerald-500/20 backdrop-blur-md border border-green-400/30 flex items-center justify-center shadow-lg"
            >
              <CheckCircle className="w-8 h-8 text-green-400" />
            </motion.div>

            <motion.div
              animate={{ y: [0, 10, 0], rotate: [0, -5, 0] }}
              transition={{ duration: 5, repeat: Infinity, delay: 1 }}
              className="absolute -bottom-6 -left-6 w-16 h-16 rounded-full bg-gradient-to-br from-purple-400/20 to-pink-500/20 backdrop-blur-md border border-purple-400/30 flex items-center justify-center shadow-lg"
            >
              <TrendingUp className="w-8 h-8 text-purple-400" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section className="relative py-20 px-6 bg-gradient-to-b from-transparent to-white/5">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              How to Earn Your Certificate
            </h2>
            <p className="text-gray-400 text-lg">
              Follow these simple steps to get certified
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Enroll in Course", desc: "Choose from 100+ courses across various topics", icon: <Star /> },
              { step: "02", title: "Complete Lessons", desc: "Learn at your own pace with video lectures and resources", icon: <CheckCircle /> },
              { step: "03", title: "Pass Assessments", desc: "Score 70% or higher on quizzes and final exam", icon: <Trophy /> },
              { step: "04", title: "Get Certified", desc: "Download and share your certificate instantly", icon: <Medal /> }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className="text-center relative"
              >
                <div className="text-7xl font-bold text-white/5 mb-4">{item.step}</div>
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-white shadow-lg shadow-cyan-400/30">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                <p className="text-gray-400">{item.desc}</p>
                
                {idx < 3 && (
                  <div className="hidden md:block absolute top-12 -right-4 text-cyan-400/30 text-3xl">
                    →
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* VERIFICATION SECTION */}
      <section className="relative py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-400/20 rounded-3xl p-12 text-center"
          >
            <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center">
              <ExternalLink className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">
              Verify Any Certificate
            </h2>
            <p className="text-gray-400 text-lg mb-8">
              All our certificates come with a unique ID that can be verified by employers and institutions
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowVerifyModal(true)}
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-400 to-pink-500 text-white font-semibold shadow-lg shadow-purple-400/30 hover:shadow-purple-400/50 transition-all duration-300"
            >
              Verify a Certificate
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="relative py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-400/20 rounded-3xl p-12"
          >
            <Sparkles className="w-12 h-12 text-cyan-400 mx-auto mb-6" />
            <h2 className="text-4xl font-bold text-white mb-4">
              Ready to Get Certified?
            </h2>
            <p className="text-gray-400 text-lg mb-8">
              Start learning today and earn certificates that showcase your skills
            </p>
            <Link to="/courses">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-500 text-white font-semibold text-lg shadow-lg shadow-cyan-400/30 hover:shadow-cyan-400/50 transition-all duration-300"
              >
                Browse Courses →
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* VERIFICATION MODAL */}
      <AnimatePresence>
        {showVerifyModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6"
            onClick={() => {
              setShowVerifyModal(false);
              setVerificationResult(null);
              setCertificateId("");
            }}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-gradient-to-br from-[#1a2332] to-[#0f1620] border border-white/20 rounded-3xl p-8 max-w-md w-full relative shadow-2xl"
            >
              <button
                onClick={() => {
                  setShowVerifyModal(false);
                  setVerificationResult(null);
                  setCertificateId("");
                }}
                className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all"
              >
                <X className="w-5 h-5 text-white" />
              </button>

              <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center">
                <ExternalLink className="w-8 h-8 text-white" />
              </div>

              <h3 className="text-2xl font-bold text-white text-center mb-2">
                Verify Certificate
              </h3>
              <p className="text-gray-400 text-center mb-6">
                Enter the certificate ID to verify authenticity
              </p>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Certificate ID
                </label>
                <input
                  type="text"
                  value={certificateId}
                  onChange={(e) => setCertificateId(e.target.value)}
                  placeholder="e.g., USK-2024-12345"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-purple-400/50 transition-all"
                />
              </div>

              {verificationResult && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`mb-6 p-4 rounded-xl border ${
                    verificationResult.success
                      ? "bg-green-500/10 border-green-400/30"
                      : "bg-red-500/10 border-red-400/30"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {verificationResult.success ? (
                      <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    ) : (
                      <X className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                    )}
                    <div className="flex-1">
                      <p className={`font-semibold mb-1 ${
                        verificationResult.success ? "text-green-400" : "text-red-400"
                      }`}>
                        {verificationResult.message}
                      </p>
                      {verificationResult.success && verificationResult.details && (
                        <div className="text-sm text-gray-300 space-y-1 mt-3">
                          <p><span className="text-gray-400">Name:</span> {verificationResult.details.name}</p>
                          <p><span className="text-gray-400">Course:</span> {verificationResult.details.course}</p>
                          <p><span className="text-gray-400">Score:</span> {verificationResult.details.score}</p>
                          <p><span className="text-gray-400">Date:</span> {verificationResult.details.date}</p>
                          <p><span className="text-gray-400">Instructor:</span> {verificationResult.details.instructor}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleVerifyCertificate}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-400 to-pink-500 text-white font-semibold shadow-lg shadow-purple-400/30 hover:shadow-purple-400/50 transition-all"
              >
                Verify Now
              </motion.button>

              <p className="text-xs text-gray-500 text-center mt-4">
                Try with ID: USK-2024-12345
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}