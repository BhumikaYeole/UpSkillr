import { motion } from "framer-motion";
import { Search, ChevronDown, Users, Star, Clock, UserCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function CoursesPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedLevel, setSelectedLevel] = useState("All Levels");
  const [selectedSort, setSelectedSort] = useState("Most Popular");

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const categories = [
    "All",
    "Development",
    "Design",
    "Data Science",
    "Marketing",
    "Mobile",
    "Security",
    "Cloud"
  ];

  const courses = [
    {
      id: "web-development-bootcamp",
      title: "Complete Web Development Bootcamp",
      category: "Development",
      level: "All Levels",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800",
      students: "45.2K",
      rating: 4.8,
      hours: "52",
      instructor: "Sarah Johnson"
    },
    {
      id: "data-science-python",
      title: "Data Science with Python",
      category: "Data Science",
      level: "Beginner",
      image: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=800",
      students: "38.5K",
      rating: 4.9,
      hours: "42",
      instructor: "Michael Chen"
    },
    {
      id: "data-science-machine-learning",
      title: "Data Science & Machine Learning",
      category: "Data Science",
      level: "Advanced",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800",
      students: "32.1K",
      rating: 4.7,
      hours: "68",
      instructor: "Dr. Emily Rodriguez"
    },
    {
      id: "data-analytics-excel-powerbi",
      title: "Data Analytics with Excel & Power BI",
      category: "Data Science",
      level: "Intermediate",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
      students: "28.3K",
      rating: 4.6,
      hours: "36",
      instructor: "David Kim"
    },
    {
      id: "react-development",
      title: "Complete React Development",
      category: "Development",
      level: "Intermediate",
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800",
      students: "41.7K",
      rating: 4.8,
      hours: "48",
      instructor: "Alex Turner"
    },
    {
      id: "aws-cloud-practitioner",
      title: "AWS Cloud Practitioner",
      category: "Cloud",
      level: "Beginner",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800",
      students: "35.9K",
      rating: 4.7,
      hours: "32",
      instructor: "Jennifer Martinez"
    },
    {
      id: "nodejs-backend-development",
      title: "Node.js Backend Development",
      category: "Development",
      level: "Intermediate",
      image: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=800",
      students: "29.4K",
      rating: 4.8,
      hours: "44",
      instructor: "Ryan Thompson"
    },
    {
      id: "uiux-design-fundamentals",
      title: "UI/UX Design Fundamentals",
      category: "Design",
      level: "Beginner",
      image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800",
      students: "52.6K",
      rating: 4.9,
      hours: "38",
      instructor: "Sophie Anderson"
    },
    {
      id: "digital-marketing-masterclass",
      title: "Digital Marketing Masterclass",
      category: "Marketing",
      level: "Intermediate",
      image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800",
      students: "37.2K",
      rating: 4.7,
      hours: "40",
      instructor: "Mark Williams"
    },
    {
      id: "mobile-app-development",
      title: "Mobile App Development",
      category: "Mobile",
      level: "Advanced",
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800",
      students: "24.8K",
      rating: 4.6,
      hours: "56",
      instructor: "Jessica Lee"
    },
    {
      id: "cybersecurity-essentials",
      title: "Cybersecurity Essentials",
      category: "Security",
      level: "Beginner",
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800",
      students: "31.5K",
      rating: 4.8,
      hours: "34",
      instructor: "Robert Garcia"
    },
    {
      id: "docker-kubernetes-mastery",
      title: "Docker & Kubernetes Mastery",
      category: "Cloud",
      level: "Advanced",
      image: "https://images.unsplash.com/photo-1605745341112-85968b19335b?w=800",
      students: "22.9K",
      rating: 4.7,
      hours: "50",
      instructor: "Chris Brown"
    }
  ];

  // Filter courses based on selected category
  const filteredCourses = selectedCategory === "All" 
    ? courses 
    : courses.filter(course => course.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a1525] via-[#050b14] to-[#0f1a2a]">
      {/* HERO SECTION */}
      <section className="relative py-20 px-6 text-center overflow-hidden">
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

        <div className="relative z-10 max-w-4xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl font-bold text-white mb-6"
          >
            Explore Our Courses
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-gray-400 text-lg mb-10"
          >
            Discover 12+ courses from expert instructors
          </motion.p>

          {/* SEARCH BAR */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="max-w-3xl mx-auto"
          >
            <div className="relative">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search for courses, instructors, or topics..."
                className="w-full pl-14 pr-6 py-5 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400/50 transition-all duration-300"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* FILTERS SECTION */}
      <section className="relative px-6 pb-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap items-center justify-between gap-6">
            {/* Category Pills */}
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <motion.button
                  key={category}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${selectedCategory === category
                    ? "bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg shadow-purple-500/30"
                    : "bg-white/10 text-gray-300 hover:bg-white/20 border border-white/10"
                    }`}
                >
                  {category}
                </motion.button>
              ))}
            </div>

            {/* Dropdowns */}
            <div className="flex gap-4">
              <div className="relative">
                <button className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 backdrop-blur-xl border border-white/20 text-white hover:bg-white/20 transition-all duration-300">
                  {selectedLevel}
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>
              <div className="relative">
                <button className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 backdrop-blur-xl border border-white/20 text-white hover:bg-white/20 transition-all duration-300">
                  {selectedSort}
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Results count */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-8 text-gray-400"
          >
            Showing <span className="text-white font-semibold">{filteredCourses.length}</span> courses
          </motion.p>
        </div>
      </section>

      {/* COURSES GRID */}
      <section className="relative px-6 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                whileHover={{ y: -8 }}
                className="group relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-2xl overflow-hidden hover:border-cyan-400/40 transition-all duration-300 cursor-pointer"
              >
                {/* Image */}
                <Link to={`/course/${course.id}`}>
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a1525] via-black/40 to-transparent opacity-60"></div>

                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex gap-2">
                      <span className="px-3 py-1 rounded-full bg-white/90 text-[#0a1525] text-xs font-semibold">
                        {course.category}
                      </span>
                      <span className="px-3 py-1 rounded-full bg-cyan-400/90 text-white text-xs font-semibold">
                        {course.level}
                      </span>
                    </div>
                  </div>
                </Link>

                {/* Content */}
                <div className="p-6">
                  <Link to={`/course/${course.id}`}>
                    <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors duration-300 mb-4">
                      {course.title}
                    </h3>
                  </Link>

                  {/* Instructor */}
                  <div className="flex items-center gap-2 mb-4 text-gray-400">
                    <UserCircle className="w-4 h-4" />
                    <span className="text-sm">{course.instructor}</span>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-3 gap-3 mb-4 pb-4 border-b border-white/10">
                    <div className="flex items-center gap-1.5">
                      <Users className="w-4 h-4 text-cyan-400" />
                      <span className="text-xs text-gray-400">{course.students}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      <span className="text-xs text-gray-400">{course.rating}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-purple-400" />
                      <span className="text-xs text-gray-400">{course.hours}h</span>
                    </div>
                  </div>

                  {/* Enroll Button */}
                  <Link to={`/course/${course.id}`}>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-cyan-600 text-white font-semibold hover:from-cyan-400 hover:to-cyan-500 transition-all duration-300 shadow-lg shadow-cyan-500/20"
                    >
                      Enroll Now
                    </motion.button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}