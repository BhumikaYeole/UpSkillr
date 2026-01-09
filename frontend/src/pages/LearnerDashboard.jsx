import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  BookOpen,
  Award,
  TrendingUp,
  Clock,
  Target,
  Search,
  Bell,
  Calendar,
  PlayCircle,
  Star,
  ChevronRight,
  Sparkles,
  Download,
  Lock,
  Eye,
  FileText,
  Code,
  Layers,
  Gift,
  Book,
  Notebook,
  BookOpenIcon
} from "lucide-react";
import { courseProgressApi, fetchActiveCoursesApi, fetchCoursesApi, getMeApi, getCourseResourcesApi, downloadResourceApi } from "../api/auth";
import { useNavigate } from "react-router-dom";
import { useProfile } from "../hooks/useProfile";

export default function LearnerDashboard() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const data = await getMeApi();
      setUserData(data.profile);
    }
    fetchUserData();
  }, [])

  const name = userData ? userData.user.name : "User";
  const coins = userData ? userData.user.coins : 0;
  const enrolledCoursesCount = userData ? userData.enrolledCourses.length : 0;
  const enrolledCourses = userData ? userData.enrolledCourses : []; // Total completed courses
  const [inProgressCourses, setInProgressCourses] = useState(0); // Courses in progress
  const [recommendedCourses, setRecommendedCourses] = useState([])
  const [activeCourses, setActiveCourses] = useState([])
  const [courseResources, setCourseResources] = useState([]);
  const [downloadedResources, setDownloadedResources] = useState(new Set());



  const { user, loading, learningTime, progressData, completedCourses, refetchProfile } = useProfile();


  useEffect(() => {
    const fetchCourses = async () => {

      const data = await fetchCoursesApi();
      setRecommendedCourses(data.courses.slice(0, 3))
    }
    fetchCourses();

    const fetchActiveCourses = async () => {
      const data = await fetchActiveCoursesApi();
      const enrollments = data.enrollments

      const validEnrollments = enrollments.filter(e => e.course);

      const mapped = validEnrollments.map(e => ({
        enrollmentId: e._id,
        courseId: e.course._id,
        title: e.course.title,
        category: e.course.category,
        thumbnail: e.course.thumbnail,
        lastAccessed: new Date(e.enrolledAt).toLocaleDateString(),
        progress: 0 // placeholder, fetched next
      }));

      setActiveCourses(mapped);
    }
    fetchActiveCourses();

  }, [])

  useEffect(() => {
    if (!activeCourses.length) return;

    const fetchProgress = async () => {
      const updated = await Promise.all(
        activeCourses.map(async course => {
          try {
            const res = await courseProgressApi(course.courseId);
            return {
              ...course,
              progress: res.progress.progressPercentage ?? 0
            };
          } catch {
            return { ...course, progress: 0 };
          }
        })
      );

      setActiveCourses(updated);
    };

    fetchProgress();
  }, [activeCourses.length]);

  useEffect(() => {
    if (!activeCourses.length) return;

    const fetchResources = async () => {
      try {
        const responses = await Promise.all(
          activeCourses.map(async (course) => {
            const res = await getCourseResourcesApi(course.courseId);

            return res.resources.map((r) => ({
              ...r,
              courseTitle: course.title,
            }));
          })
        );


        setCourseResources(responses.flat());
      } catch (err) {
        console.error("Failed to load resources", err);
      }
    };

    fetchResources();
  }, [activeCourses]);


  let total = 0;
  progressData.map(p => {
    total = total + p.progressPercentage
  })
  const overallProgress = (total / progressData?.length)

  const completedCoursesData = progressData
    ?.filter(p => p.progressPercentage === 100)
    .map(p => ({
      id: p.course._id,
      title: p.course.title,
      image: p.course.thumbnail,
      lessonsCount: p.completedLessons.length,
      enrolledDate: new Date(p.createdAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric"
      }),
      completedDate: new Date(p.updatedAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric"
      })
    })) || [];


  const stats = [
    {
      icon: <BookOpen className="w-6 h-6" />,
      label: "Enrolled Courses",
      value: enrolledCoursesCount,
      change: enrolledCoursesCount > 0 ? `+${enrolledCoursesCount} this month` : "+0%",
      gradient: "from-blue-400 to-cyan-500"
    },
    {
      icon: <Award className="w-6 h-6" />,
      label: "Certificates Earned",
      value: completedCourses,
      change: completedCourses > 0 ? `+${completedCourses} this month` : "+0%",
      gradient: "from-purple-400 to-pink-500"
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      label: "Learning Hours",
      value: `${learningTime}`,
      change: learningTime > 0 ? `+${learningTime} this week` : "+0%",
      gradient: "from-orange-400 to-red-500"
    },
    {
      icon: <Target className="w-6 h-6" />,
      label: "Overall Progress",
      value: `${overallProgress}%`,
      change: overallProgress > 0 ? `+${overallProgress}% this week` : "+0%",
      gradient: "from-green-400 to-emerald-500"
    }
  ];

  const earningMethods = [
    {
      icon: <PlayCircle className="w-5 h-5" />,
      title: "Complete Lesson",
      coins: 5,
      gradient: "from-blue-400 to-cyan-500"
    },
    {
      icon: <Award className="w-5 h-5" />,
      title: "Finish Course",
      coins: 50,
      gradient: "from-green-400 to-emerald-500"
    },
    {
      icon: <Target className="w-5 h-5" />,
      title: "Assessment Test",
      coins: 30,
      gradient: "from-purple-400 to-pink-500"
    },
    {
      icon: <BookOpen className="w-5 h-5" />,
      title: "Enroll in Course",
      coins: 10,
      gradient: "from-orange-400 to-red-500"
    },
    {
      icon: <Sparkles className="w-5 h-5" />,
      title: "Daily Login",
      coins: 25,
      gradient: "from-yellow-400 to-orange-500"
    }
  ];

  const handleUnlockResource = async (resourceId) => {
    try {
      // console.log(resourceId._id)
      const res = await downloadResourceApi(resourceId._id);

      // Open file securely
      window.open(res.fileUrl, "_blank");

      setDownloadedResources(prev => new Set(prev).add(resourceId._id));

      // Refresh profile to sync coins
      refetchProfile();

    } catch (err) {
      alert(err.message || "Download failed");
    }
  };

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a1525] via-[#050b14] to-[#0f1a2a] py-8 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                Welcome back, {name}! 👋
              </h1>
              <p className="text-gray-400">Continue your learning journey</p>
            </div>

            <div className="flex items-center gap-3">
              {/* Coin Balance */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-yellow-400/10 to-orange-400/10 border border-yellow-400/30"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <div>
                  <div className="text-xs text-gray-400">Your Coins</div>
                  <div className="text-lg font-bold text-white">{coins}</div>
                </div>
              </motion.div>

              <button className="p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all relative">
                <Bell className="w-5 h-5 text-gray-400" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </button>
              <button className="p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
                <Calendar className="w-5 h-5 text-gray-400" />
              </button>
            </div>
          </div>

        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -5 }}
              className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center text-white`}>
                  {stat.icon}
                </div>
                <span className="text-xs text-gray-400 bg-white/5 px-2 py-1 rounded-full">
                  {stat.change}
                </span>
              </div>
              <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          {/* Left Column - 2/3 width */}
          <div className="lg:col-span-2 space-y-8">
            {/* Analytics Row */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Overall Progress Circle */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
              >
                <h3 className="text-lg font-bold text-white mb-6">Overall Progress</h3>
                <div className="flex flex-col items-center justify-center">
                  <div className="relative w-40 h-40">
                    <svg className="w-full h-full transform -rotate-90">
                      {/* Background circle */}
                      <circle
                        cx="80"
                        cy="80"
                        r="70"
                        stroke="currentColor"
                        strokeWidth="12"
                        fill="none"
                        className="text-white/10"
                      />
                      {/* Progress circle */}
                      <motion.circle
                        cx="80"
                        cy="80"
                        r="70"
                        stroke="url(#progressGradient)"
                        strokeWidth="12"
                        fill="none"
                        strokeLinecap="round"
                        initial={{ strokeDasharray: "0 440" }}
                        animate={{ strokeDasharray: `${(overallProgress / 100) * 440} 440` }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                      />
                      <defs>
                        <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#6366f1" />
                          <stop offset="100%" stopColor="#8b5cf6" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <div className="text-3xl font-bold text-white">{overallProgress}%</div>
                      <div className="text-xs text-gray-400 mt-1">Complete</div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-400 mt-4 text-center">
                    {completedCourses} of {enrolledCoursesCount} courses completed
                  </p>
                </div>
              </motion.div>

              {/* Course Status Donut Chart */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
              >
                <h3 className="text-lg font-bold text-white mb-6">Course Status</h3>
                <div className="flex flex-col items-center justify-center">
                  <div className="relative w-40 h-40">
                    <svg className="w-full h-full transform -rotate-90">
                      {/* Background circle */}
                      <circle
                        cx="80"
                        cy="80"
                        r="70"
                        stroke="currentColor"
                        strokeWidth="20"
                        fill="none"
                        className="text-white/10"
                      />

                      {/* Calculate segments */}
                      {(() => {
                        const total = enrolledCoursesCount || 1;
                        const completedPercent = (completedCourses / total) * 100;
                        const inProgressPercent = (inProgressCourses / total) * 100;
                        const notStartedPercent = 100 - completedPercent - inProgressPercent;

                        const circumference = 2 * Math.PI * 70;
                        const completedLength = (completedPercent / 100) * circumference;
                        const inProgressLength = (inProgressPercent / 100) * circumference;
                        const notStartedLength = (notStartedPercent / 100) * circumference;

                        let offset = 0;

                        return (
                          <>
                            {/* Completed segment - Green */}
                            {completedCourses > 0 && (
                              <motion.circle
                                cx="80"
                                cy="80"
                                r="70"
                                stroke="#10b981"
                                strokeWidth="20"
                                fill="none"
                                strokeLinecap="round"
                                strokeDasharray={`${completedLength} ${circumference}`}
                                strokeDashoffset={offset}
                                initial={{ strokeDasharray: "0 440" }}
                                animate={{ strokeDasharray: `${completedLength} ${circumference}` }}
                                transition={{ duration: 1, delay: 0.5 }}
                              />
                            )}
                            {/* In Progress segment - Blue */}
                            {inProgressCourses > 0 && (
                              <motion.circle
                                cx="80"
                                cy="80"
                                r="70"
                                stroke="#6366f1"
                                strokeWidth="20"
                                fill="none"
                                strokeLinecap="round"
                                strokeDasharray={`${inProgressLength} ${circumference}`}
                                strokeDashoffset={-(offset + completedLength)}
                                initial={{ strokeDasharray: "0 440" }}
                                animate={{ strokeDasharray: `${inProgressLength} ${circumference}` }}
                                transition={{ duration: 1, delay: 0.7 }}
                              />
                            )}
                            {/* Not Started segment - Gray */}
                            {enrolledCoursesCount === 0 || (enrolledCoursesCount > completedCourses + inProgressCourses) ? (
                              <motion.circle
                                cx="80"
                                cy="80"
                                r="70"
                                stroke="#6366f1"
                                strokeWidth="20"
                                fill="none"
                                strokeLinecap="round"
                                strokeDasharray={`${notStartedLength} ${circumference}`}
                                strokeDashoffset={-(offset + completedLength + inProgressLength)}
                                initial={{ strokeDasharray: "0 440" }}
                                animate={{ strokeDasharray: `${notStartedLength} ${circumference}` }}
                                transition={{ duration: 1, delay: 0.9 }}
                              />
                            ) : null}
                          </>
                        );
                      })()}
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <div className="text-2xl font-bold text-white">{enrolledCoursesCount}</div>
                      <div className="text-xs text-gray-400">Courses</div>
                    </div>
                  </div>

                  {/* Legend */}
                  <div className="mt-4 space-y-2 w-full">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-green-400"></div>
                        <span className="text-gray-400">Completed</span>
                      </div>
                      <span className="text-white font-medium">{completedCourses}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-blue-400"></div>
                        <span className="text-gray-400">In Progress</span>
                      </div>
                      <span className="text-white font-medium">{enrolledCoursesCount - completedCourses}</span>
                    </div>

                  </div>
                </div>
              </motion.div>
            </div>

            {/* How to Earn Coins */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
            >
              <div className="flex items-center gap-2 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-xl font-bold text-white">How to Earn UpSkillr Coins</h2>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
                {earningMethods.map((method, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.3 + idx * 0.1 }}
                    whileHover={{ y: -5 }}
                    className="bg-white/5 border border-white/10 rounded-xl p-4 hover:border-yellow-400/30 transition-all text-center"
                  >
                    <div className={`w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br ${method.gradient} flex items-center justify-center text-white`}>
                      {method.icon}
                    </div>
                    <h3 className="text-white font-semibold text-sm mb-2">{method.title}</h3>
                    <div className="text-yellow-400 font-bold text-lg">+{method.coins} coins</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Continue Learning */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h2 className="text-2xl font-bold text-white mb-4">Continue Learning</h2>

              {activeCourses.length > 0 ? (
                <div className="grid md:grid-cols-2 gap-6">
                  {activeCourses.map((course) => (
                    <motion.div
                      key={course.enrollmentId}
                      whileHover={{ y: -5 }}
                      className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden hover:border-cyan-400/50 transition-all"
                    >
                      <div className="flex gap-4 p-4">
                        <img
                          src={course.thumbnail}
                          alt={course.title}
                          className="w-24 h-24 rounded-xl object-cover"
                        />
                        <div className="flex-1">
                          <span className="text-xs text-cyan-400 font-medium">
                            {course.category}
                          </span>

                          <h3 className="text-white font-bold text-sm mt-1 mb-2">
                            {course.title}
                          </h3>

                          <div className="flex items-center gap-2 text-xs text-gray-400 mb-3">
                            <Calendar className="w-3 h-3" />
                            <span>Enrolled on: {course.lastAccessed}</span>
                          </div>

                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-gray-400">Progress</span>
                              <span className="text-white font-semibold">
                                {course.progress}%
                              </span>
                            </div>

                            <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${course.progress}%` }}
                                transition={{ duration: 1 }}
                                className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => navigate(`/course/${course.courseId}`)}
                        className="w-full py-3 bg-gradient-to-r from-cyan-400 to-blue-500 text-white font-semibold hover:from-cyan-300 hover:to-blue-400 transition-all flex items-center justify-center gap-2"
                      >
                        <PlayCircle className="w-4 h-4" />
                        Continue
                      </motion.button>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 border-dashed rounded-2xl p-12 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-blue-400/20 to-cyan-400/20 flex items-center justify-center">
                    <BookOpen className="w-8 h-8 text-blue-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">No Active Courses</h3>
                  <p className="text-gray-400 mb-6">Start learning by enrolling in your first course!</p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate("/courses")}
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 text-white font-semibold hover:from-cyan-300 hover:to-blue-400 transition-all inline-flex items-center gap-2"
                  >
                    Browse Courses
                    <ChevronRight className="w-4 h-4" />
                  </motion.button>
                </div>
              )}
            </motion.div>

            {/* Completed Courses */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <h2 className="text-2xl font-bold text-white mb-4">Completed Courses</h2>

              {completedCoursesData.map((course) => (
                <motion.div
                  key={course.id}
                  whileHover={{ y: -5 }}
                  className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden hover:border-green-400/50 transition-all"
                >
                  <div className="flex gap-4 p-4">
                    <div className="relative">
                      <img
                        src={course.image}
                        alt={course.title}
                        className="w-24 h-24 rounded-xl object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 rounded-xl flex items-center justify-center">
                        <div className="w-10 h-10 rounded-full bg-green-400 flex items-center justify-center">
                          <Award className="w-5 h-5 text-white" />
                        </div>
                      </div>
                    </div>

                    <div className="flex-1">
                      <span className="text-xs text-green-400 font-medium">
                        {course.lessonsCount} lessons completed
                      </span>

                      <h3 className="text-white font-bold text-sm mt-1 mb-2">
                        {course.title}
                      </h3>

                      <div className="flex items-center gap-2 text-xs text-gray-400">
                        <Calendar className="w-3 h-3" />
                        <span>Completed: {course.completedDate}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}

            </motion.div>
          </div>

          {/* Right Sidebar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-6"
          >
            {/* Course Resources */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-white">Course Resources</h3>
                <div className="flex items-center gap-1 text-xs text-yellow-400">
                  <Sparkles className="w-3 h-3" />
                  <span>Use coins to unlock</span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-4">
                  {courseResources.map((resource, idx) => {
                    const isDownloaded = downloadedResources.has(resource._id);
                    // console.log(resource)

                    return (
                      <motion.div
                        key={resource._id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: 0.3 + idx * 0.1 }}
                        className="group bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-xl p-4 hover:border-cyan-400/40 transition-all"
                      >
                        {/* Header */}
                        <div className="flex items-start gap-3 mb-4">
                          {/* File Icon */}
                          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-white">
                            <FileText className="w-5 h-5" />
                          </div>

                          <div className="flex-1 min-w-0">
                            <h4 className="text-white font-semibold text-sm truncate">
                              {resource.title}
                            </h4>
                            <p className="text-xs text-gray-400">Course : {resource.courseTitle}</p>
                            <p className="text-xs text-gray-500">Size : {resource.size} MB</p>
                          </div>
                        </div>

                        {/* Action */}
                        {resource.unlocked ? (
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => window.open(resource.fileUrl, "_blank")}
                            className="w-full py-2 rounded-lg bg-gradient-to-r from-green-400 to-emerald-500 text-white text-sm font-semibold flex items-center justify-center gap-2"
                          >
                            <Eye className="w-4 h-4" />
                            View / Download
                          </motion.button>
                        ) : (
                          <motion.button
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={() => handleUnlockResource(resource)}
                            className="w-full py-2 rounded-lg bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-sm font-bold flex items-center justify-center gap-2"
                          >
                            <Lock className="w-4 h-4" />
                            Unlock for {resource.requiredCoins} coins
                          </motion.button>
                        )}
                      </motion.div>
                    );
                  })}
                </div>
                </div>


                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setCoins(coins + 25)}
                  className="w-full mt-4 py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 text-white font-semibold hover:from-cyan-300 hover:to-blue-400 transition-all flex items-center justify-center gap-2"
                >
                  <Gift className="w-4 h-4" />
                  Claim Daily Bonus
                </motion.button>
              </div>

              {/* Quick Stats */}
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-white mb-4">Quick Stats</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-blue-400/10 flex items-center justify-center">
                        <BookOpen className="w-5 h-5 text-blue-400" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-400">Enrolled Courses</div>
                        <div className="text-xl font-bold text-white">{enrolledCoursesCount}</div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-green-400/10 flex items-center justify-center">
                        <Award className="w-5 h-5 text-green-400" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-400">Completed</div>
                        <div className="text-xl font-bold text-white">{completedCourses}</div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-orange-400/10 flex items-center justify-center">
                        <TrendingUp className="w-5 h-5 text-orange-400" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-400">In Progress</div>
                        <div className="text-xl font-bold text-white">{inProgressCourses}</div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-purple-400/10 flex items-center justify-center">
                        <Clock className="w-5 h-5 text-purple-400" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-400">Learning Minutes</div>
                        <div className="text-xl font-bold text-white">{learningTime}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
          </motion.div>
        </div>

        {/* Recommended Courses */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-white mb-1">Discover More Courses</h2>
              <p className="text-gray-400">Expand your skills with these popular courses</p>
            </div>
            <button
              onClick={() => navigate("/courses")}
              className="text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-1 text-sm font-medium">
              View All
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendedCourses.map((course, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 + idx * 0.1 }}
                whileHover={{ y: -8 }}
                className="group bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden hover:border-cyan-400/50 transition-all cursor-pointer"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">

                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-all"
                    >
                      <PlayCircle className="w-5 h-5" />
                    </motion.button>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                    {course.title}
                  </h3>
                  <p className="text-sm text-gray-400 mb-4">by {course.instructor.name}</p>

                  <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                    <div className="flex items-center gap-1">
                      <BookOpenIcon className="w-4 h-4 text-yellow-400 " />
                      <span className="text-white font-medium">{course.lesson_length}</span>
                    </div>
                    <span>{course.enrolledCount} students</span>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{course.duration}</span>
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => navigate(`/course/${course._id}`)}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 text-white font-semibold hover:from-cyan-300 hover:to-blue-400 transition-all"
                  >
                    Enroll Now
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}