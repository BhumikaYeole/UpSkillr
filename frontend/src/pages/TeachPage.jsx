import { motion, AnimatePresence } from "framer-motion";
import { 
  Award, 
  DollarSign, 
  Globe, 
  Zap, 
  Users, 
  BarChart3, 
  Shield, 
  PlayCircle,
  X
} from "lucide-react";
import { useState } from "react";

export default function TeachPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    expertise: "",
    experience: ""
  });
  const [showVideoModal, setShowVideoModal] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  const BASE_URL = "http://localhost:5000/api";

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`${BASE_URL}/auth/sign-up/instructor`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    } 
    ) .then(response => response.json())
      .then(data => {
        // console.log("Success:", data);  
        alert("Application submitted successfully!");
        window.location.href = "/instructor-dashboard"; 
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    
  };


  const features = [
    {
      icon: <DollarSign className="w-6 h-6" />,
      title: "Earn Revenue",
      description: "Set your own prices and earn up to 97% revenue share on every enrollment. Get paid monthly.",
      gradient: "from-blue-400 to-indigo-500"
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Global Reach",
      description: "Reach millions of learners worldwide. Our platform supports multiple languages and currencies.",
      gradient: "from-cyan-400 to-blue-500"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Easy Course Builder",
      description: "Create engaging content with our intuitive drag-and-drop course builder. No technical skills needed.",
      gradient: "from-purple-400 to-pink-500"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Community Support",
      description: "Join a vibrant community of instructors. Share experiences, get advice, and grow together.",
      gradient: "from-green-400 to-emerald-500"
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Analytics & Insights",
      description: "Track your performance with detailed analytics. Understand your audience and improve your content.",
      gradient: "from-orange-400 to-red-500"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Secure Platform",
      description: "Your content is protected. We handle all the technical aspects so you can focus on teaching.",
      gradient: "from-indigo-400 to-purple-500"
    }
  ];

  const steps = [
    {
      number: "01",
      title: "Create Your Content",
      description: "Use our course builder to upload videos, create quizzes, and organize your curriculum."
    },
    {
      number: "02",
      title: "Publish & Promote",
      description: "Go live instantly. We'll help promote your course to our growing community of learners."
    },
    {
      number: "03",
      title: "Grow",
      description: "Use analytics to improve your content and grow your student base."
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "React Instructor",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200",
      quote: "UpSkillr gave me the platform to share my knowledge and build a sustainable income doing what I love.",
      students: "12,450"
    },
    {
      name: "Michael Chen",
      role: "Design Instructor",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200",
      quote: "The course builder is incredibly intuitive. I created my first course in just a weekend!",
      students: "8,920"
    },
    {
      name: "Emily Roberts",
      role: "Data Science Instructor",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200",
      quote: "From zero to six figures in 18 months. The support team and community made all the difference.",
      students: "15,680"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a1525] via-[#050b14] to-[#0f1a2a]">
      {/* VIDEO MODAL */}
      <AnimatePresence>
        {showVideoModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowVideoModal(false)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl bg-[#0a1525] rounded-2xl overflow-hidden shadow-2xl"
            >
              {/* Close Button */}
              <button
                onClick={() => setShowVideoModal(false)}
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Video Content */}
              <div className="aspect-video bg-black">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                  title="How It Works"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                ></iframe>
              </div>

              {/* Video Info */}
              <div className="p-6 border-t border-white/10">
                <h3 className="text-2xl font-bold text-white mb-2">
                  How to Become an Instructor on UpSkillr
                </h3>
                <p className="text-gray-400">
                  Learn how to create your first course, set pricing, and start earning from your expertise in just a few simple steps.
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO SECTION */}
      <section className="relative py-20 px-6 overflow-hidden">
        {/* Background gradient blobs */}
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

        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-block mb-6 px-5 py-2 rounded-full text-sm bg-white/10 border border-white/20 text-white font-medium"
              >
                Become an Instructor
              </motion.span>

              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                Share Your Knowledge,{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
                  Earn Income
                </span>
              </h1>

              <p className="text-gray-400 text-lg mb-10 leading-relaxed">
                Join thousands of instructors who are making a difference by teaching what they love. Create courses, build your audience, and earn from your expertise.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 mb-10">
                <div>
                  <div className="text-3xl font-bold text-white mb-1">50K+</div>
                  <div className="text-sm text-gray-400">Active Instructors</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-white mb-1">$25M+</div>
                  <div className="text-sm text-gray-400">Paid to Instructors</div>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => document.getElementById('application-form').scrollIntoView({ behavior: 'smooth' })}
                  className="px-8 py-4 rounded-2xl bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-semibold shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 transition-all duration-300"
                >
                  Start Teaching Today →
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowVideoModal(true)}
                  className="px-8 py-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold hover:bg-white/20 transition-all duration-300 flex items-center gap-2"
                >
                  <PlayCircle className="w-5 h-5" />
                  Watch How It Works
                </motion.button>
              </div>
            </motion.div>

            {/* Right - Instructor Card */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-white rounded-3xl p-8 shadow-2xl">
                <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-200">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-400 to-indigo-500 flex items-center justify-center">
                    <Award className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">Top Instructor</div>
                    <div className="text-gray-600">This Month</div>
                  </div>
                </div>

                <div className="flex items-center gap-4 mb-6">
                  <img
                    src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200"
                    alt="Emily Roberts"
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <div className="text-xl font-bold text-gray-900">Emily Roberts</div>
                    <div className="text-gray-600">Data Science Instructor</div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">15.6K</div>
                    <div className="text-sm text-gray-600">Students</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">$156K</div>
                    <div className="text-sm text-gray-600">Earnings</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-500 flex items-center justify-center gap-1">
                      4.9 <span className="text-lg">⭐</span>
                    </div>
                    <div className="text-sm text-gray-600">Rating</div>
                  </div>
                </div>
              </div>

              {/* Floating element */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-6 -left-6 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-2xl p-4 shadow-xl"
              >
                <div className="text-white text-sm font-medium">💰 New Payout</div>
                <div className="text-white text-2xl font-bold">$2,450</div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* WHY TEACH SECTION */}
      <section className="relative py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <span className="inline-block mb-4 px-5 py-2 rounded-full text-sm bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-400/20 text-blue-400 font-medium">
              Why Teach on UpSkillr
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Everything You Need to Succeed
            </h2>
            <p className="text-gray-400 text-lg max-w-3xl mx-auto">
              We provide the tools, support, and audience so you can focus on what you do best—teaching.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                whileHover={{ y: -8 }}
                className="group bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-white/30 transition-all duration-300"
              >
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
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
            <span className="inline-block mb-4 px-5 py-2 rounded-full text-sm bg-gradient-to-r from-orange-500/10 to-yellow-500/10 border border-orange-400/20 text-orange-400 font-medium">
              Simple Process
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              How It Works
            </h2>
            <p className="text-gray-400 text-lg">
              Get started in four simple steps. From idea to income in no time.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className="relative"
              >
                <div className="text-8xl font-bold text-white/5 mb-4">{step.number}</div>
                <h3 className="text-2xl font-bold text-white mb-3">{step.title}</h3>
                <p className="text-gray-400 leading-relaxed">{step.description}</p>
                
                {idx < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-12 -right-4 text-cyan-400/30 text-3xl">
                    →
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SUCCESS STORIES SECTION */}
      <section className="relative py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <span className="inline-block mb-4 px-5 py-2 rounded-full text-sm bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-400/20 text-green-400 font-medium">
              Success Stories
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Join Thousands of Successful Instructors
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-white/30 transition-all duration-300"
              >
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <div className="text-lg font-bold text-white">{testimonial.name}</div>
                    <div className="text-sm text-gray-400">{testimonial.role}</div>
                  </div>
                </div>
                
                <p className="text-gray-400 text-sm italic mb-6 leading-relaxed">
                  "{testimonial.quote}"
                </p>

                <div className="flex justify-between pt-4 border-t border-white/10">
                  <div className="text-right">
                    <div className="text-2xl font-bold text-white">{testimonial.students}</div>
                    <div className="text-xs text-gray-500">Students</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* APPLICATION FORM SECTION */}
      <section id="application-form" className="relative py-20 px-6 bg-gradient-to-br from-purple-900/20 to-indigo-900/20">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Ready to Start Teaching?
            </h2>
            <p className="text-gray-400 text-lg">
              Apply now and join our community of expert instructors
            </p>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            onSubmit={handleSubmit}
            className="bg-white rounded-3xl p-8 shadow-2xl space-y-6"
          >
            <div>
              <label className="block text-gray-900 font-medium mb-2">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="John Doe"
                required
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 focus:outline-none focus:border-blue-400 transition-colors"
              />
            </div>

            <div>
              <label className="block text-gray-900 font-medium mb-2">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="john@example.com"
                required
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 focus:outline-none focus:border-blue-400 transition-colors"
              />
            </div>

            <div>
              <label className="block text-gray-900 font-medium mb-2">
                Area of Expertise <span className="text-red-500">*</span>
              </label>
              <select
                name="expertise"
                value={formData.expertise}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 focus:outline-none focus:border-blue-400 transition-colors appearance-none cursor-pointer"
              >
                <option value="">Select your expertise</option>
                <option value="web-development">Web Development</option>
                <option value="data-science">Data Science</option>
                <option value="design">Design</option>
                <option value="business">Business</option>
                <option value="marketing">Marketing</option>
                <option value="photography">Photography</option>
                <option value="music">Music</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-900 font-medium mb-2">
                Teaching Experience
              </label>
              <select
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 focus:outline-none focus:border-blue-400 transition-colors appearance-none cursor-pointer"
              >
                <option value="">Select experience level</option>
                <option value="beginner">Beginner (0-1 years)</option>
                <option value="intermediate">Intermediate (1-3 years)</option>
                <option value="experienced">Experienced (3-5 years)</option>
                <option value="expert">Expert (5+ years)</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-900 font-medium mb-2">
                Set Password <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="........"
                required
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 focus:outline-none focus:border-blue-400 transition-colors"
              />
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold text-lg shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 transition-all duration-300"
            >
              Submit Application →
            </motion.button>

            <p className="text-center text-sm text-gray-600 mt-4">
              By submitting, you agree to our{" "}
              <a href="#" className="text-blue-600 hover:underline">Terms of Service</a>
              {" "}and{" "}
              <a href="#" className="text-blue-600 hover:underline">Instructor Agreement</a>.
            </p>
          </motion.form>
        </div>
      </section>
    </div>
  );
}