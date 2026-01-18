import { motion } from "framer-motion";
import {
  BookOpen,
  Users,
  Bell,
  Calendar,
  Plus,
  Search,
  Edit,
  MoreVertical,
  ChevronRight,
  Award,
  User,
  Info,
  DeleteIcon,
  Delete,
  Trash,
} from "lucide-react";
import { useProfile } from "../hooks/useProfile";
import { Link } from "react-router-dom";
import { addResourceApi, deleteCourseApi } from "../api/course";
import { useState } from "react";

export default function InstructorDashboard() {
  const { loading, dashboard, user, refetchProfile } = useProfile();
  const [activeCourseId, setActiveCourseId] = useState(null);

  const [resourceData, setResourceData] = useState({
    title: "",
    type: "pdf",
    fileUrl: "",
    fileSize: "",
    requiredCoins: 0,
    isDownloadable: true,
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading dashboard...
      </div>
    );
  }

  const totalCourses = dashboard?.dashboard?.totalCourses || 0;
  const totalStudents = dashboard?.dashboard?.totalStudents || 0;
  const publishedCourses = dashboard?.dashboard?.publishedCourses || [];

  const stats = [
    {
      icon: <BookOpen className="w-6 h-6" />,
      label: "Total Courses",
      value: totalCourses,
      gradient: "from-blue-400 to-cyan-500",
    },
    {
      icon: <Users className="w-6 h-6" />,
      label: "Total Students",
      value: totalStudents,
      gradient: "from-purple-400 to-pink-500",
    },
    {
      icon: <Award className="w-6 h-6" />,
      label: "Expertise",
      value: user?.expertise || "Not set",
      subValue: user?.experience || "Experience not added",
      gradient: "from-orange-400 to-red-500",
    },
  ];

  const handleDeleteCourse = async (courseId) => {
    const res = await deleteCourseApi(courseId);
    if (res.success) {
      alert("Course Deleted Successfully");
      refetchProfile();
    }
  };

  const handleAddResource = async (activeCourseId, data) => {
    const res = await addResourceApi(activeCourseId, data);
    if (res.success) {
      alert("Resource added Successfully");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a1525] via-[#050b14] to-[#0f1a2a] py-8 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* ================= HEADER ================= */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                Welcome, {user?.name} 👨‍🏫
              </h1>
              <p className="text-gray-400">
                Manage your courses and grow your teaching presence
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Link to="/create-course">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 text-white font-semibold flex items-center gap-2"
                >
                  <Plus className="w-5 h-5" />
                  Create Course
                </motion.button>
              </Link>

            
            </div>
          </div>
        </motion.div>

        {/* ================= STATS ================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -6 }}
              className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
            >
              <div
                className={`w-12 h-12 mb-4 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center text-white`}
              >
                {stat.icon}
              </div>

              <div className="text-2xl font-bold text-white mb-1">
                {stat.value}
              </div>

              {stat.subValue && (
                <div className="text-sm text-gray-400">{stat.subValue}</div>
              )}

              <div className="text-xs text-gray-500 mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* ================= MAIN GRID ================= */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* ===== LEFT: MY COURSES ===== */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-white">My Courses</h2>
            </div>

            {publishedCourses.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-6">
                {publishedCourses.map((course) => (
                  <motion.div
                    key={course._id}
                    whileHover={{ y: -6 }}
                    className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden"
                  >
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="h-40 w-full object-cover"
                    />

                    <div className="p-6">
                      <h3 className="text-lg font-bold text-white mb-2">
                        {course.title}
                      </h3>

                      <p className="text-sm text-gray-400 mb-4">
                        {course.students} students enrolled
                      </p>

                      {/* Updated buttons section with Create Assessment */}
                      <div className="flex flex-col gap-3">
                        {/* First Row: Add Resources and Edit */}
                        <div className="flex gap-3">
                          <button
                            onClick={() => setActiveCourseId(course._id)}
                            className="flex-1 py-2 rounded-lg bg-gradient-to-r from-cyan-400 to-blue-500 text-white text-sm font-semibold flex items-center justify-center gap-2"
                          >
                            <Plus className="w-4 h-4" />
                            Add Resources
                          </button>

                          <Link to={`/course/${course._id}/edit`}>
                            <button className="px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-400 to-blue-500 text-white text-sm font-semibold flex items-center justify-center gap-2">
                              <Edit className="w-4 h-4" />
                              Edit
                            </button>
                          </Link>

                          <button
                            onClick={() => handleDeleteCourse(course._id)}
                            className="p-2 rounded-lg bg-white/5 border border-white/10 text-red-400"
                          >
                            <Trash className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Second Row: Create Assessment Button */}
                        <Link
                          to={`/instructor/create-assessment?courseId=${course._id}`}
                        >
                          <button className="w-full py-2 rounded-lg bg-gradient-to-r from-purple-400 to-pink-500 text-white text-sm font-semibold flex items-center justify-center gap-2">
                            📝 Create Assessment
                          </button>
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="bg-white/5 border border-white/10 border-dashed rounded-2xl p-12 text-center">
                <BookOpen className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">
                  No Courses Yet
                </h3>
                <p className="text-gray-400 mb-6">
                  Start teaching by creating your first course
                </p>
                <Link to="/create-course">
                  <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 text-white font-semibold">
                    Create Course
                  </button>
                </Link>
              </div>
            )}
          </div>

          {/* ===== RIGHT: PROFILE + TIPS ===== */}
          <div className="space-y-6">
            {/* Instructor Profile */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <User className="w-5 h-5" />
                Instructor Profile
              </h3>

              <p className="text-sm text-gray-400 mb-2">
                <span className="text-white">Email:</span> {user?.email}
              </p>
              <p className="text-sm text-gray-400 mb-2">
                <span className="text-white">Expertise:</span>{" "}
                {user?.expertise || "Not added"}
              </p>
              <p className="text-sm text-gray-400 mb-4">
                <span className="text-white">Experience:</span>{" "}
                {user?.experience || "Not added"}
              </p>

              <Link to="/instructor-profile">
                <button className="w-full py-2 rounded-lg bg-white/10 hover:bg-white/20 transition">
                  Edit Profile
                </button>
              </Link>
            </div>

            {/* Instructor Tips */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Info className="w-5 h-5" />
                Teaching Tips
              </h3>

              <ul className="text-sm text-gray-400 space-y-2">
                <li>• Add a clear course thumbnail</li>
                <li>• Define learning outcomes</li>
                <li>• Upload at least 5 lessons</li>
                <li>• Add downloadable resources</li>
              </ul>
            </div>
          </div>

          {/* Add Resource Modal */}
          {activeCourseId && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="w-full max-w-lg bg-[#0a1525] border border-white/10 rounded-2xl p-6 space-y-4"
              >
                <h2 className="text-xl font-bold text-white">
                  Add Course Resource
                </h2>

                {/* TITLE */}
                <input
                  placeholder="Resource Title"
                  className="w-full p-3 rounded bg-white/10 text-white"
                  value={resourceData.title}
                  onChange={(e) =>
                    setResourceData({ ...resourceData, title: e.target.value })
                  }
                />

                {/* TYPE */}
                <select
                  className="w-full p-3 rounded bg-white/10 text-white"
                  value={resourceData.type}
                  onChange={(e) =>
                    setResourceData({ ...resourceData, type: e.target.value })
                  }
                >
                  <option value="pdf" className="text-black">
                    PDF
                  </option>
                  <option value="doc" className="text-black">
                    DOC
                  </option>
                  <option value="ppt" className="text-black">
                    PPT
                  </option>
                  <option value="cheatsheet" className="text-black">
                    Cheatsheet
                  </option>
                  <option value="link" className="text-black">
                    External Link
                  </option>
                </select>

                {/* FILE URL */}
                <input
                  placeholder="File URL"
                  className="w-full p-3 rounded bg-white/10 text-white"
                  value={resourceData.fileUrl}
                  onChange={(e) =>
                    setResourceData({
                      ...resourceData,
                      fileUrl: e.target.value,
                    })
                  }
                />

                {/* FILE SIZE */}
                <input
                  type="number"
                  placeholder="File Size (KB / MB)"
                  className="w-full p-3 rounded bg-white/10 text-white"
                  value={resourceData.fileSize}
                  onChange={(e) =>
                    setResourceData({
                      ...resourceData,
                      fileSize: e.target.value,
                    })
                  }
                />

                {/* REQUIRED COINS */}
                <div>
                  <span className="text-white py-10">Coins Required</span>
                  <input
                    type="number"
                    placeholder="Coins Required"
                    className="w-full p-3 rounded bg-white/10 text-white"
                    value={resourceData.requiredCoins}
                    onChange={(e) =>
                      setResourceData({
                        ...resourceData,
                        requiredCoins: Number(e.target.value),
                      })
                    }
                  />
                </div>

                {/* DOWNLOADABLE */}
                <label className="flex items-center gap-3 text-gray-300 text-sm">
                  <input
                    type="checkbox"
                    checked={resourceData.isDownloadable}
                    onChange={(e) =>
                      setResourceData({
                        ...resourceData,
                        isDownloadable: e.target.checked,
                      })
                    }
                    className="accent-cyan-400"
                  />
                  Allow Download
                </label>

                {/* ACTIONS */}
                <div className="flex justify-end gap-3 pt-4">
                  <button
                    onClick={() => setActiveCourseId(null)}
                    className="px-5 py-2 rounded-lg bg-white/10 text-gray-300 hover:bg-white/20"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={() => {
                      handleAddResource(activeCourseId, resourceData);
                      setActiveCourseId(null);
                    }}
                    className="px-5 py-2 rounded-lg bg-gradient-to-r from-cyan-400 to-blue-500 text-white font-semibold"
                  >
                    Save Resource
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}