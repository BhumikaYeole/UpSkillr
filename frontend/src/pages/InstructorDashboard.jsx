import { useState } from "react";
import { motion } from "framer-motion";
import { 
  BookOpen, 
  Users, 
  TrendingUp, 
  DollarSign,
  Star,
  Search,
  Bell,
  Calendar,
  PlayCircle,
  Eye,
  ChevronRight,
  Plus,
  BarChart3,
  MessageSquare,
  Award,
  Clock,
  Edit,
  MoreVertical,
  ThumbsUp,
  Download
} from "lucide-react";

export default function InstructorDashboard() {
  const [timeRange, setTimeRange] = useState("month");
  
  // INSTRUCTOR DATA - Connect to backend
  const [totalCourses, setTotalCourses] = useState(0);
  const [totalStudents, setTotalStudents] = useState(0);
  const [averageRating, setAverageRating] = useState(0);
  const [newEnrollments, setNewEnrollments] = useState(0);

  const stats = [
    {
      icon: <BookOpen className="w-6 h-6" />,
      label: "Total Courses",
      value: totalCourses,
      change: totalCourses > 0 ? `+${totalCourses} published` : "+0%",
      gradient: "from-blue-400 to-cyan-500"
    },
    {
      icon: <Users className="w-6 h-6" />,
      label: "Total Students",
      value: totalStudents.toLocaleString(),
      change: newEnrollments > 0 ? `+${newEnrollments} this month` : "+0%",
      gradient: "from-purple-400 to-pink-500"
    },
    {
      icon: <Star className="w-6 h-6" />,
      label: "Average Rating",
      value: averageRating > 0 ? averageRating.toFixed(1) : "0.0",
      change: averageRating > 0 ? `${averageRating >= 4.5 ? "Excellent" : "Good"}` : "No reviews",
      gradient: "from-orange-400 to-red-500"
    }
  ];

  // My Courses - empty by default
  const myCourses = [
    // {
    //   title: "Complete React Development Masterclass",
    //   students: 1234,
    //   rating: 4.8,
    //   reviews: 456,
    //   revenue: 45600,
    //   image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800",
    //   status: "Published"
    // }
  ];

  // Recent Activity
  const recentActivity = [
    // Empty by default
  ];

  // Top performing courses
  const topCourses = [
    // Empty by default
  ];

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
                Instructor Dashboard 👨‍🏫
              </h1>
              <p className="text-gray-400">Manage your courses and track your performance</p>
            </div>
            
            <div className="flex items-center gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 text-white font-semibold hover:from-cyan-300 hover:to-blue-400 transition-all inline-flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Create New Course
              </motion.button>
              
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
              placeholder="Search courses, students, or analytics..."
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400/50 transition-all"
            />
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
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
            {/* My Courses */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-white">My Courses</h2>
                <button className="text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-1 text-sm font-medium">
                  View All
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {myCourses.length > 0 ? (
                <div className="grid md:grid-cols-2 gap-6">
                  {myCourses.map((course, idx) => (
                    <motion.div
                      key={idx}
                      whileHover={{ y: -5 }}
                      className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden hover:border-cyan-400/50 transition-all"
                    >
                      <div className="relative h-40">
                        <img
                          src={course.image}
                          alt={course.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-3 right-3 flex gap-2">
                          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-400 text-white">
                            {course.status}
                          </span>
                        </div>
                      </div>
                      
                      <div className="p-6">
                        <h3 className="text-lg font-bold text-white mb-4">{course.title}</h3>
                        
                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div>
                            <div className="text-2xl font-bold text-white">{course.students}</div>
                            <div className="text-xs text-gray-400">Students</div>
                          </div>
                          <div>
                            <div className="text-2xl font-bold text-white">${course.revenue.toLocaleString()}</div>
                            <div className="text-xs text-gray-400">Revenue</div>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                            <span className="text-white font-medium text-sm">{course.rating}</span>
                            <span className="text-gray-400 text-sm">({course.reviews})</span>
                          </div>
                        </div>
                        
                        <div className="flex gap-2">
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="flex-1 py-2 rounded-lg bg-gradient-to-r from-cyan-400 to-blue-500 text-white text-sm font-semibold hover:from-cyan-300 hover:to-blue-400 transition-all flex items-center justify-center gap-2"
                          >
                            <Edit className="w-4 h-4" />
                            Edit
                          </motion.button>
                          <button className="p-2 rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:bg-white/10 transition-all">
                            <MoreVertical className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 border-dashed rounded-2xl p-12 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-cyan-400/20 to-blue-400/20 flex items-center justify-center">
                    <BookOpen className="w-8 h-8 text-cyan-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">No Courses Yet</h3>
                  <p className="text-gray-400 mb-6">Create your first course and start teaching!</p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 text-white font-semibold hover:from-cyan-300 hover:to-blue-400 transition-all inline-flex items-center gap-2"
                  >
                    <Plus className="w-5 h-5" />
                    Create Your First Course
                  </motion.button>
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
            {/* Quick Actions */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 text-white font-semibold hover:from-cyan-300 hover:to-blue-400 transition-all flex items-center justify-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  New Course
                </motion.button>
              </div>
            </div>

            {/* Top Performing Courses */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white mb-4">Top Performing</h3>
              
              {topCourses.length > 0 ? (
                <div className="space-y-4">
                  {topCourses.map((course, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <img
                        src={course.image}
                        alt={course.title}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-semibold text-white truncate">{course.title}</h4>
                        <div className="flex items-center gap-2 text-xs text-gray-400">
                          <Users className="w-3 h-3" />
                          <span>{course.students}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-bold text-green-400">${course.revenue}</div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Award className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                  <p className="text-sm text-gray-500">No data available yet</p>
                </div>
              )}
            </div>

            {/* Performance Stats */}
            <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-400/20 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white mb-4">This Month</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-400/10 flex items-center justify-center">
                      <Eye className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-400">Course Views</div>
                      <div className="text-xl font-bold text-white">{totalCourses > 0 ? "2.5K" : "0"}</div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-green-400/10 flex items-center justify-center">
                      <Users className="w-5 h-5 text-green-400" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-400">New Students</div>
                      <div className="text-xl font-bold text-white">{newEnrollments}</div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-purple-400/10 flex items-center justify-center">
                      <ThumbsUp className="w-5 h-5 text-purple-400" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-400">New Reviews</div>
                      <div className="text-xl font-bold text-white">{averageRating > 0 ? "12" : "0"}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}