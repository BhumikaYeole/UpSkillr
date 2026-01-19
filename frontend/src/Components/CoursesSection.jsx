import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Clock, Users, BookOpen } from "lucide-react";

export default function CoursesSection() {
  const [courses, setCourses] = useState([]);
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch(`${BASE_URL}/courses`);
        const data = await res.json();
        setCourses(data.courses.slice(0, 6) || []); 
      } catch (err) {
        console.error("Failed to fetch courses:", err);
      }
    };

    fetchCourses();
  }, []);

  return (
    <section className="px-6 py-24 bg-[#050b14]">
      {/* Courses Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {courses.map((course) => (
          <CourseCard key={course._id} course={course} />
        ))}
      </div>

      {/* View All Courses */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="text-center mt-16"
      >
        <Link to="/courses">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 rounded-2xl border border-white/20 bg-white/5 backdrop-blur-sm hover:bg-white/10 hover:border-cyan-400/50 hover:shadow-[0_0_25px_rgba(34,211,238,0.35)] transition-all duration-300 font-semibold text-white"
          >
            View All Courses →
          </motion.button>
        </Link>
      </motion.div>
    </section>
  );
}

function CourseCard({ course }) {
  const formatDuration = (minutes) => {
    if (!minutes) return "0 min";
    if (minutes < 60) return `${minutes} min`;

    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;

    return mins === 0 ? `${hours}h` : `${hours}h ${mins}m`;
  };

  return (
    <div className="group bg-[#0b1220] rounded-2xl overflow-hidden shadow-xl hover:shadow-cyan-500/20 transition-all">
      
      {/* Thumbnail */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={course.thumbnail}
          alt={course.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-125"
        />

        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition" />

        <span className="absolute top-3 left-3 bg-emerald-400 text-black text-xs px-3 py-1 rounded-full font-semibold z-20">
          Free
        </span>
      </div>

      {/* Content */}
      <div className="p-6 space-y-3">
        <span className="text-xs px-3 py-1 bg-white/10 rounded-full text-gray-300">
          {course.category}
        </span>

        <h3 className="text-lg font-semibold text-white">
          {course.title}
        </h3>

        <p className="text-sm text-gray-400">
          by {course.instructor?.name}
        </p>

        {/* Stats */}
        <div className="flex justify-between text-sm text-gray-400 pt-2">
          <span className="flex items-center gap-1">
            <Clock className="w-4 h-4 text-purple-400" />
            {formatDuration(course.duration)}
          </span>

          <span className="flex items-center gap-1">
            <Users className="w-4 h-4 text-cyan-400" />
            {course.enrolledCount}
          </span>

          <span className="flex items-center gap-1">
            <BookOpen className="w-4 h-4 text-green-400" />
            {course.lesson_length}
          </span>
        </div>

        {/* Enroll */}
        <Link to={`/course/${course._id}`}>
          <button className="w-full mt-4 py-3 rounded-xl border border-white/20 text-white font-medium hover:bg-cyan-400 hover:text-black hover:border-cyan-400 transition-all duration-300">
            Enroll Now
          </button>
        </Link>
      </div>
    </div>
  );
}
