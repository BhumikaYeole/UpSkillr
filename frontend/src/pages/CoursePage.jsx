import { motion } from "framer-motion";
import {
  Search,
  ChevronDown,
  Users,
  Clock,
  UserCircle,
  File
} from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function CoursesPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedLevel, setSelectedLevel] = useState("All Levels");
  const [selectedSort, setSelectedSort] = useState("Newest");
  const [searchQuery, setSearchQuery] = useState("");
  const [courses, setCourses] = useState([]);

  const [showLevelDropdown, setShowLevelDropdown] = useState(false);
  const [showSortDropdown, setShowSortDropdown] = useState(false);

  const BASE_URL = "http://localhost:5000/api";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    fetch(`${BASE_URL}/courses`)
      .then(res => res.json())
      .then(data => setCourses(data.courses || []))
      .catch(err => console.error(err));
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

  const levels = ["All Levels", "Beginner", "Intermediate", "Advanced"];

  const sortOptions = [
    "Newest",
    "Duration (Low to High)",
    "Duration (High to Low)",
    "Lessons (Most)"
  ];

  const filteredCourses = courses
    // CATEGORY FILTER
    .filter(course =>
      selectedCategory === "All" ? true : course.category === selectedCategory
    )
    // LEVEL FILTER
    .filter(course =>
      selectedLevel === "All Levels" ? true : course.level === selectedLevel
    )
    // SEARCH FILTER
    .filter(course => {
      const query = searchQuery.toLowerCase();
      return (
        course.title?.toLowerCase().includes(query) ||
        course.category?.toLowerCase().includes(query) ||
        course.level?.toLowerCase().includes(query) ||
        course.instructor?.name?.toLowerCase().includes(query)
      );
    })
    // SORT
    .sort((a, b) => {
      if (selectedSort === "Newest") {
        return new Date(b.createdAt) - new Date(a.createdAt);
      }
      if (selectedSort === "Duration (Low to High)") {
        return a.duration - b.duration;
      }
      if (selectedSort === "Duration (High to Low)") {
        return b.duration - a.duration;
      }
      if (selectedSort === "Lessons (Most)") {
        return b.lesson_length - a.lesson_length;
      }
      return 0;
    });

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a1525] via-[#050b14] to-[#0f1a2a]">

      {/* HERO */}
      <section className="relative py-20 px-6 text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
          Explore Our Courses
        </h1>
        <p className="text-gray-400 text-lg mb-10">
          Discover expert-led learning paths
        </p>

        {/* SEARCH BAR */}
        <div className="max-w-3xl mx-auto relative">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search courses, instructors, or topics..."
            className="w-full pl-14 pr-6 py-5 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400/50 transition-all"
          />
        </div>
      </section>

      {/* FILTERS */}
      <section className="px-6 pb-8">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between gap-6">

          {/* CATEGORY PILLS */}
          <div className="flex flex-wrap gap-3">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-full font-medium transition-all ${
                  selectedCategory === category
                    ? "bg-purple-600 text-white"
                    : "bg-white/10 text-gray-300 hover:bg-white/20"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* DROPDOWNS */}
          <div className="flex gap-4">

            {/* LEVEL */}
            <div className="relative">
              <button
                onClick={() => setShowLevelDropdown(!showLevelDropdown)}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 border border-white/20 text-white"
              >
                {selectedLevel}
                <ChevronDown className="w-4 h-4" />
              </button>

              {showLevelDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-[#0a1525] border border-white/20 rounded-xl z-20">
                  {levels.map(level => (
                    <button
                      key={level}
                      onClick={() => {
                        setSelectedLevel(level);
                        setShowLevelDropdown(false);
                      }}
                      className="block w-full text-left px-4 py-3 text-gray-300 hover:bg-white/10"
                    >
                      {level}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* SORT */}
            <div className="relative">
              <button
                onClick={() => setShowSortDropdown(!showSortDropdown)}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 border border-white/20 text-white"
              >
                Sort: {selectedSort}
                <ChevronDown className="w-4 h-4" />
              </button>

              {showSortDropdown && (
                <div className="absolute right-0 mt-2 w-64 bg-[#0a1525] border border-white/20 rounded-xl z-20">
                  {sortOptions.map(option => (
                    <button
                      key={option}
                      onClick={() => {
                        setSelectedSort(option);
                        setShowSortDropdown(false);
                      }}
                      className="block w-full text-left px-4 py-3 text-gray-300 hover:bg-white/10"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>

          </div>
        </div>

        <p className="mt-8 text-gray-400 px-2">
          Showing <span className="text-white font-semibold">
            {filteredCourses.length}
          </span> courses
        </p>
      </section>

      {/* COURSES GRID */}
      <section className="px-6 pb-20">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map(course => (
            <div
              key={course._id}
              className="bg-white/10 border border-white/20 rounded-2xl overflow-hidden hover:border-cyan-400/40 transition-all"
            >
              <Link to={`/course/${course._id}`}>
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full h-48 object-cover"
                />
              </Link>

              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-3">
                  {course.title}
                </h3>

                <div className="flex items-center gap-2 text-gray-400 mb-4">
                  <UserCircle className="w-4 h-4" />
                  {course.instructor?.name}
                </div>

                <div className="grid grid-cols-3 gap-3 text-xs text-gray-400 mb-4">
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4 text-cyan-400" />
                    {course.enrolledCount}
                  </div>
                  <div className="flex items-center gap-1">
                    <File className="w-4 h-4 text-yellow-400" />
                    {course.lesson_length}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4 text-purple-400" />
                    {course.duration}m
                  </div>
                </div>

                <Link to={`/course/${course._id}`}>
                  <button className="w-full py-3 rounded-xl bg-cyan-500 text-white font-semibold hover:bg-cyan-400 transition-all">
                    Enroll Now
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
