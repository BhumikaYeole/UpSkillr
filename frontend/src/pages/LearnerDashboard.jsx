import { useState } from "react";
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
  Gift
} from "lucide-react";

export default function LearnerDashboard() {
  const [timeRange, setTimeRange] = useState("week");
  
  // USER DATA - Connect these to your backend/API
  const [coins, setCoins] = useState(0); // Start with 0 coins
  const [enrolledCourses, setEnrolledCourses] = useState(0); // Total enrolled courses
  const [completedCourses, setCompletedCourses] = useState(0); // Total completed courses
  const [inProgressCourses, setInProgressCourses] = useState(0); // Courses in progress
  const [learningHours, setLearningHours] = useState(0); // Total learning hours
  const [overallProgress, setOverallProgress] = useState(0); // Overall progress percentage

  const stats = [
    {
      icon: <BookOpen className="w-6 h-6" />,
      label: "Enrolled Courses",
      value: enrolledCourses,
      change: enrolledCourses > 0 ? `+${enrolledCourses} this month` : "+0%",
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
      value: `${learningHours}h`,
      change: learningHours > 0 ? `+${learningHours}h this week` : "+0%",
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

  const courseResources = [
    {
      icon: <FileText className="w-5 h-5" />,
      title: "React Cheat Sheet.pdf",
      course: "Complete React Development Masterclass",
      size: "2.4 MB",
      unlocked: true,
      coins: 0
    },
    {
      icon: <Layers className="w-5 h-5" />,
      title: "Project Starter Template",
      course: "Complete React Development Masterclass",
      size: "15 MB",
      unlocked: false,
      coins: 100
    },
    {
      icon: <Code className="w-5 h-5" />,
      title: "Source Code Bundle",
      course: "Complete React Development Masterclass",
      size: "8.2 MB",
      unlocked: false,
      coins: 150
    }
  ];

  // COURSE DATA - Connect to your backend
  // When user enrolls/completes courses, update these arrays
  const activeCourses = [
    // Example structure - empty by default
    // {
    //   title: "Complete React Development Masterclass",
    //   category: "Development",
    //   lastAccessed: "10/3/2024",
    //   progress: 65,
    //   image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800"
    // }
  ];

  const completedCoursesData = [
    // Example structure - empty by default
    // {
    //   title: "Node.js Backend Development",
    //   category: "Development",
    //   completedDate: "8/5/2024",
    //   image: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=800"
    // }
  ];

  const recommendedCourses = [
    {
      title: "Complete Web Development Bootcamp",
      instructor: "Sarah Johnson",
      rating: 4.8,
      students: "45.2K",
      duration: "52 hours",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800",
      gradient: "from-cyan-400 to-blue-500"
    },
    {
      title: "Data Science with Python",
      instructor: "Michael Chen",
      rating: 4.9,
      students: "38.5K",
      duration: "42 hours",
      image: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=800",
      gradient: "from-purple-400 to-pink-500"
    },
    {
      title: "UI/UX Design Masterclass",
      instructor: "Sophie Anderson",
      rating: 4.9,
      students: "52.6K",
      duration: "38 hours",
      image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800",
      gradient: "from-orange-400 to-red-500"
    }
  ];

  const handleUnlockResource = (resource) => {
    if (coins >= resource.coins) {
      setCoins(coins - resource.coins);
      // Update resource unlock status in your backend
      alert(`Unlocked ${resource.title}!`);
    } else {
      alert(`You need ${resource.coins - coins} more coins to unlock this resource.`);
    }
  };

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
                Welcome back, John! 👋
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

          {/* Search Bar */}
          <div className="relative max-w-xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search courses, instructors, or topics..."
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400/50 transition-all"
            />
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
                    {completedCourses} of {enrolledCourses} courses completed
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
                        const total = enrolledCourses || 1;
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
                            {enrolledCourses === 0 || (enrolledCourses > completedCourses + inProgressCourses) ? (
                              <motion.circle
                                cx="80"
                                cy="80"
                                r="70"
                                stroke="#4b5563"
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
                      <div className="text-2xl font-bold text-white">{enrolledCourses}</div>
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
                      <span className="text-white font-medium">{inProgressCourses}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-gray-600"></div>
                        <span className="text-gray-400">Not Started</span>
                      </div>
                      <span className="text-white font-medium">{Math.max(0, enrolledCourses - completedCourses - inProgressCourses)}</span>
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
                  {activeCourses.map((course, idx) => (
                    <motion.div
                      key={idx}
                      whileHover={{ y: -5 }}
                      className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden hover:border-cyan-400/50 transition-all"
                    >
                      <div className="flex gap-4 p-4">
                        <img
                          src={course.image}
                          alt={course.title}
                          className="w-24 h-24 rounded-xl object-cover"
                        />
                        <div className="flex-1">
                          <span className="text-xs text-cyan-400 font-medium">{course.category}</span>
                          <h3 className="text-white font-bold text-sm mt-1 mb-2">{course.title}</h3>
                          <div className="flex items-center gap-2 text-xs text-gray-400 mb-3">
                            <Calendar className="w-3 h-3" />
                            <span>Last accessed: {course.lastAccessed}</span>
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-gray-400">Progress</span>
                              <span className="text-white font-semibold">{course.progress}%</span>
                            </div>
                            <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${course.progress}%` }}
                                transition={{ duration: 1, delay: 0.5 }}
                                className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
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
              
              {completedCoursesData.length > 0 ? (
                <div className="grid gap-6">
                  {completedCoursesData.map((course, idx) => (
                    <motion.div
                      key={idx}
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
                          <span className="text-xs text-green-400 font-medium">{course.category}</span>
                          <h3 className="text-white font-bold text-sm mt-1 mb-2">{course.title}</h3>
                          <div className="flex items-center gap-2 text-xs text-gray-400">
                            <Calendar className="w-3 h-3" />
                            <span>Completed: {course.completedDate}</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 border-dashed rounded-2xl p-12 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-green-400/20 to-emerald-400/20 flex items-center justify-center">
                    <Award className="w-8 h-8 text-green-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">No Completed Courses Yet</h3>
                  <p className="text-gray-400">Complete your first course to earn a certificate!</p>
                </div>
              )}
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
                {courseResources.map((resource, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.4 + idx * 0.1 }}
                    className="bg-white/5 border border-white/10 rounded-xl p-4 hover:border-white/20 transition-all"
                  >
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-white flex-shrink-0">
                        {resource.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-white font-semibold text-sm mb-1 truncate">
                          {resource.title}
                        </h4>
                        <p className="text-xs text-gray-400 mb-1">{resource.course}</p>
                        <p className="text-xs text-gray-500">{resource.size}</p>
                      </div>
                    </div>

                    {resource.unlocked ? (
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full py-2 rounded-lg bg-gradient-to-r from-green-400 to-emerald-500 text-white text-sm font-semibold flex items-center justify-center gap-2 hover:from-green-300 hover:to-emerald-400 transition-all"
                      >
                        <Download className="w-4 h-4" />
                        Download
                      </motion.button>
                    ) : (
                      <div className="flex gap-2">
                        <button className="flex-1 py-2 rounded-lg bg-white/5 border border-white/10 text-gray-400 text-sm font-medium flex items-center justify-center gap-2">
                          <Eye className="w-4 h-4" />
                          View Only
                        </button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleUnlockResource(resource)}
                          className="px-4 py-2 rounded-lg bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-sm font-bold flex items-center gap-2"
                        >
                          <Lock className="w-4 h-4" />
                          {resource.coins}
                        </motion.button>
                      </div>
                    )}
                  </motion.div>
                ))}
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
                      <div className="text-xl font-bold text-white">{enrolledCourses}</div>
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
                      <div className="text-sm text-gray-400">Learning Hours</div>
                      <div className="text-xl font-bold text-white">{learningHours}h</div>
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
            <button className="text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-1 text-sm font-medium">
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
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${course.gradient} text-white`}>
                      Bestseller
                    </span>
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
                  <p className="text-sm text-gray-400 mb-4">by {course.instructor}</p>

                  <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      <span className="text-white font-medium">{course.rating}</span>
                    </div>
                    <span>{course.students} students</span>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{course.duration}</span>
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
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