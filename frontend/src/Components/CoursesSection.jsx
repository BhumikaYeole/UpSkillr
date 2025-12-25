import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function CoursesSection() {
  const courses = [
    {
      id: "web-development-bootcamp",
      title: "Complete Web Development Bootcamp",
      category: "Development",
      students: "25.5K",
      rating: 4.8,
      hours: "42 hours",
      instructor: "UpSkillr Team",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800",
      preview: "https://www.w3schools.com/html/mov_bbb.mp4",
    },
    {
      id: "data-analytics-excel-powerbi",
      title: "Data Analytics with Excel & Power BI",
      category: "Data Science",
      instructor: "Ryan Cooper",
      hours: "35 hours",
      students: "8,900",
      rating: 4.6,
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800",
      preview: "https://www.w3schools.com/html/mov_bbb.mp4",
    },
    {
      id: "uiux-design-masterclass",
      title: "UI/UX Design Masterclass",
      category: "Design",
      students: "32.1K",
      rating: 4.7,
      hours: "28 hours",
      instructor: "Sarah Lee",
      image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800",
    },
    {
      id: "cloud-computing-aws",
      title: "Cloud Computing with AWS",
      category: "Cloud & DevOps",
      students: "7.6K",
      rating: 4.8,
      hours: "40 hours",
      instructor: "James Thompson",
      image: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=800",
    },
    {
      id: "python-data-science-ml",
      title: "Python for Data Science & ML",
      category: "Programming",
      students: "28.9K",
      rating: 4.9,
      hours: "35 hours",
      instructor: "Anita Verma",
      image: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=800",
      preview: "https://www.w3schools.com/html/movie.mp4",
    },
    {
      id: "mobile-app-development",
      title: "Mobile App Development",
      category: "Mobile",
      students: "15.6K",
      rating: 4.7,
      hours: "45 hours",
      instructor: "David Chen",
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800",
    },
  ];

  return (
    <section className="px-6 py-24 bg-[#050b14]">
      {/* Courses Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {courses.map((course, index) => (
          <CourseCard key={index} course={course} />
        ))}
      </div>

      {/* View All Courses Button */}
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
  const videoRef = useRef(null);
  const playBtnRef = useRef(null);
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <div className="group bg-[#0b1220] rounded-2xl overflow-hidden shadow-xl hover:shadow-cyan-500/20 transition-all">
      {/* Media */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={course.image}
          alt={course.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-125"
        />

        {course.preview && isDesktop && (
          <video
            ref={videoRef}
            src={course.preview}
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          />
        )}

        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition" />

        <span className="absolute top-3 left-3 bg-emerald-400 text-black text-xs px-3 py-1 rounded-full font-semibold z-20">
          Free
        </span>

        {course.preview && (
          <div className="absolute inset-0 flex items-center justify-center z-20">
            <div
              ref={playBtnRef}
              className="bg-cyan-400 p-5 rounded-full text-black text-xl opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500 shadow-[0_0_35px_rgba(34,211,238,0.7)]"
            >
              ▶
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6 space-y-3">
        <span className="text-xs px-3 py-1 bg-white/10 rounded-full text-gray-300">
          {course.category}
        </span>

        <h3 className="text-lg font-semibold text-white">{course.title}</h3>

        <p className="text-sm text-gray-400">by {course.instructor}</p>

        <div className="flex justify-between text-sm text-gray-400">
          <span>⏱ {course.hours}</span>
          <span>👥 {course.students}</span>
          <span className="text-yellow-400">⭐ {course.rating}</span>
        </div>

        <Link to={`/course/${course.id}`}>
          <button className="w-full mt-4 py-3 rounded-xl border border-white/20 text-white font-medium hover:bg-cyan-400 hover:text-black hover:border-cyan-400 transition-all duration-300">
            Enroll Now
          </button>
        </Link>
      </div>
    </div>
  );
}