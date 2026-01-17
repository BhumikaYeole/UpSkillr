import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Mail, 
  MapPin, 
  Calendar, 
  Edit2, 
  BookOpen, 
  Users, 
  DollarSign,
  Award,
  TrendingUp,
  Star,
  Video,
  Globe,
  Linkedin,
  Github,
  Twitter,
  CheckCircle,
  Clock,
  Target,
  MessageSquare,
  Share2,
  Sparkles,
  Zap,
  Trophy,
  GraduationCap,
  GitGraph,
  ChartSpline
} from "lucide-react";
import { 
  getMeApi, 
  getInstructorDashboardApi, 
  updateInstructorProfileApi 
} from "../api/auth";

export default function InstructorProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState(null);
  const [editForm, setEditForm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch instructor profile data
  useEffect(() => {
    fetchInstructorProfile();
  }, []);

  const fetchInstructorProfile = async () => {
  try {
    setLoading(true);
    setError(null);
    
    const [userResponse, dashboardResponse] = await Promise.all([
      getMeApi(),
      getInstructorDashboardApi()
    ]);
    
    const user = userResponse.profile?.user || userResponse.user || userResponse;
    const dashboard = dashboardResponse;

    console.log(dashboard)
    
    const mappedUserData = {
      name: user.name || "Instructor",
      role: user.role || "instructor",
      title: user.title || "Senior Full-Stack Developer & Educator",
      email: user.email || "",
      location: user.location || "—",
      joinedDate: user.createdAt || user.timestamps?.createdAt
        ? new Date(user.createdAt || user.timestamps.createdAt).toLocaleDateString("en-US", {
            month: "long",
            year: "numeric"
          })
        : new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" }),
      bio: user.about || user.bio || "Passionate educator with years of industry experience.",
      website: user.website || "—",
      experience : user.experience || "Begineer",
      expertise: userResponse.profile?.expertise || user.expertise || ["Web Development", "Programming"],
      totalCourses: dashboard.dashboard.totalCourses || 0,
      totalStudents: dashboard.dashboard.totalStudents || 0,
    };


    setUserData(mappedUserData);
    setEditForm(mappedUserData);
  } catch (err) {
    console.error("Error fetching instructor profile:", err);
    setError(err.message);
  } finally {
    setLoading(false);
  }
};

  const handleEdit = () => {
    setEditForm(userData);
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      const payload = {
        name: editForm.name,
        title: editForm.title,
        // email: editForm.email,
        location: editForm.location,
        bio: editForm.bio,
        website: editForm.website,
        expertise: editForm.expertise,
      };

      await updateInstructorProfileApi(payload);
      
      setUserData(prev => ({
        ...prev,
        ...payload
      }));

      setIsEditing(false);
    } catch (err) {
      console.error("Profile update failed:", err);
      alert("Failed to update profile. Please try again.");
    }
  };

  const handleCancel = () => {
    setEditForm(userData);
    setIsEditing(false);
  };

  const handleChange = (field, value) => {
    setEditForm(prev => ({ ...prev, [field]: value }));
  };

  // Loading state
  if (loading || !userData || !editForm) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0a0e27] via-[#1a1f3a] to-[#0f1729] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-xl">Loading profile...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0a0e27] via-[#1a1f3a] to-[#0f1729] flex items-center justify-center">
        <div className="text-center bg-red-500/10 backdrop-blur-xl border border-red-500/20 rounded-3xl p-8 max-w-md">
          <p className="text-red-400 text-xl mb-4">Error loading profile</p>
          <p className="text-gray-400 mb-6">{error}</p>
          <button
            onClick={fetchInstructorProfile}
            className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold rounded-xl"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const stats = [
    {
      icon: BookOpen,
      label: "Total Courses",
      value: userData.totalCourses,
      color: "from-blue-400 to-cyan-500",
      bgColor: "from-blue-50 to-cyan-50",
      iconBg: "bg-blue-500"
    },
    {
      icon: Users,
      label: "Total Students",
      value: userData.totalStudents.toLocaleString(),
      color: "from-purple-400 to-pink-500",
      bgColor: "from-purple-50 to-pink-50",
      iconBg: "bg-purple-500"
    },
    {
      icon: GraduationCap,
      label: "Expertise",
      value: userData.expertise,
      color: "from-green-400 to-emerald-500",
      bgColor: "from-green-50 to-emerald-50",
      iconBg: "bg-green-500"
    },
    {
      icon: ChartSpline,
      label: "Experience",
      value: userData.experience ,
      color: "from-orange-400 to-yellow-500",
      bgColor: "from-orange-50 to-yellow-50",
      iconBg: "bg-orange-500"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0e27] via-[#1a1f3a] to-[#0f1729] py-8 px-4 sm:px-6 lg:px-8">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Profile Header Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl border border-white/20 rounded-3xl shadow-2xl overflow-hidden mb-8"
        >
          {/* Cover Banner with Mesh Gradient */}
          <div className="h-56 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLW9wYWNpdHk9IjAuMSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20"></div>
            
            {/* Floating particles effect */}
            <div className="absolute top-10 left-10 w-2 h-2 bg-white rounded-full animate-ping"></div>
            <div className="absolute top-20 right-20 w-2 h-2 bg-white rounded-full animate-ping" style={{animationDelay: '0.5s'}}></div>
            <div className="absolute bottom-10 left-1/3 w-2 h-2 bg-white rounded-full animate-ping" style={{animationDelay: '1s'}}></div>
            
            
          </div>

          {/* Profile Info */}
          <div className="relative px-8 pb-8">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between -mt-24 mb-6">
              <div className="flex flex-col sm:flex-row items-center sm:items-end gap-6">
                {/* Avatar with glow effect */}
                <motion.div
                  whileHover={{ scale: 1.05, rotate: 5 }}
                  className="relative group"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-3xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity"></div>
                  <div className="relative w-48 h-48 rounded-3xl bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 flex items-center justify-center text-white text-7xl font-bold shadow-2xl border-4 border-white/20">
                    {userData.name.charAt(0)}
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center border-4 border-[#0a0e27]">
                      <Sparkles className="w-4 h-4 text-white" />
                    </div>
                  </div>
                </motion.div>
                
                <div className="text-center sm:text-left mb-4 sm:mb-2">
                  <div className="flex items-center gap-3 mb-2 justify-center sm:justify-start flex-wrap">
                    {isEditing ? (
                      <input
                        type="text"
                        value={editForm.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                        className="text-4xl font-bold text-white bg-white/10 backdrop-blur-xl border-2 border-white/20 rounded-2xl px-4 py-2 focus:border-cyan-400 focus:outline-none"
                      />
                    ) : (
                      <h1 className="text-4xl md:text-5xl font-bold text-white">
                        {userData.name}
                      </h1>
                    )}
                    {userData.averageRating >= 4.5 && (
                      <motion.div 
                        whileHover={{ scale: 1.1 }}
                        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full shadow-lg"
                      >
                        <Award className="w-5 h-5 text-white" />
                        <span className="text-sm font-bold text-white">Top Rated</span>
                      </motion.div>
                    )}
                  </div>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editForm.title}
                      onChange={(e) => handleChange('title', e.target.value)}
                      className="text-xl text-gray-300 mb-3 bg-white/10 backdrop-blur-xl border-2 border-white/20 rounded-xl px-4 py-2 focus:border-cyan-400 focus:outline-none w-full"
                    />
                  ) : (
                    <p className="text-xl text-gray-300 mb-3">{userData.title}</p>
                  )}
                </div>
              </div>

              {!isEditing ? (
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleEdit}
                  className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold rounded-2xl shadow-lg hover:shadow-cyan-500/50 transition-all flex items-center gap-2 self-center lg:self-end border border-cyan-400/50"
                >
                  <Edit2 className="w-5 h-5" />
                  Edit Profile
                </motion.button>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleCancel}
                  className="px-8 py-4 bg-white/10 backdrop-blur-xl border border-white/20 text-white font-bold rounded-2xl hover:bg-white/20 transition-all flex items-center gap-2 self-center lg:self-end"
                >
                  Cancel
                </motion.button>
              )}
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-1 space-y-6">
            {/* About Section */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl border border-white/20 rounded-3xl shadow-xl p-8"
            >
              <div className="flex items-center gap-2 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white">About</h2>
              </div>
              
              {isEditing ? (
                <textarea
                  value={editForm.bio}
                  onChange={(e) => handleChange('bio', e.target.value)}
                  className="w-full p-4 border-2 border-white/20 rounded-2xl focus:border-cyan-400 focus:outline-none text-gray-300 bg-white/5 backdrop-blur-xl mb-6 min-h-[120px]"
                  placeholder="Tell us about yourself..."
                />
              ) : (
                <p className="text-gray-300 mb-6 leading-relaxed">{userData.bio}</p>
              )}
              
              <div className="space-y-3">
                <motion.div whileHover={{ x: 5 }} className="flex items-center gap-3 text-gray-300 p-3 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  {/*  ALWAYS SHOW EMAIL AS READ-ONLY */}
                  <span className="text-sm">{userData.email}</span>
                </motion.div>
                
                <motion.div whileHover={{ x: 5 }} className="flex items-center gap-3 text-gray-300 p-3 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editForm.location}
                      onChange={(e) => handleChange('location', e.target.value)}
                      className="flex-1 px-3 py-2 border-2 border-white/20 rounded-lg focus:border-cyan-400 focus:outline-none text-sm bg-white/5 text-white"
                    />
                  ) : (
                    <span className="text-sm">{userData.location}</span>
                  )}
                </motion.div>
                
                <motion.div whileHover={{ x: 5 }} className="flex items-center gap-3 text-gray-300 p-3 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-400 to-pink-600 flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-sm">Teaching since {userData.joinedDate}</span>
                </motion.div>

                <motion.div whileHover={{ x: 5 }} className="flex items-center gap-3 text-gray-300 p-3 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
                    <Clock className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-sm">Responds in 2hr</span>
                </motion.div>
              </div>

              {isEditing && (
                <div className="flex gap-3 mt-6">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleSave}
                    className="flex-1 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-cyan-500/50 transition-all"
                  >
                    Save Changes
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleCancel}
                    className="flex-1 py-3 bg-white/10 backdrop-blur-xl border border-white/20 text-white font-bold rounded-xl hover:bg-white/20 transition-all"
                  >
                    Cancel
                  </motion.button>
                </div>
              )}
            </motion.div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Teaching Stats */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl border border-white/20 rounded-3xl shadow-xl p-8"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-white">Teaching Stats</h2>
                </div>
                <div className="flex items-center gap-2 text-gray-400 bg-white/5 px-4 py-2 rounded-full backdrop-blur-xl">
                  <Sparkles className="w-4 h-4" />
                  <span className="text-sm font-medium">Your Impact</span>
                </div>
              </div>

              {userData.totalCourses === 0 ? (
                <div className="text-center py-16">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", duration: 0.5 }}
                    className="relative w-32 h-32 mx-auto mb-6"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-3xl blur-2xl opacity-50"></div>
                    <div className="relative w-full h-full rounded-3xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center shadow-2xl">
                      <BookOpen className="w-16 h-16 text-white" />
                    </div>
                  </motion.div>
                  <h3 className="text-3xl font-bold text-white mb-3">
                    Start Your Teaching Journey
                  </h3>
                  <p className="text-gray-400 mb-8 max-w-md mx-auto text-lg">
                    You haven't created any courses yet. Share your knowledge and start teaching today!
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={()=> window.location.href = "/create-course"}
                    className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold rounded-2xl shadow-lg hover:shadow-cyan-500/50 transition-all border border-cyan-400/50"
                  >
                    Create Your First Course
                  </motion.button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {stats.map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + index * 0.1 }}
                      whileHover={{ scale: 1.05, y: -5 }}
                      className={`bg-gradient-to-br ${stat.bgColor} backdrop-blur-xl rounded-2xl p-6 border-2 border-white/20 hover:border-white/40 transition-all cursor-pointer shadow-xl`}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg`}>
                          <stat.icon className="w-7 h-7 text-white" />
                        </div>
                      </div>
                      <div className="text-4xl font-bold text-gray-900 mb-1">
                        {stat.value}
                      </div>
                      <div className="text-sm font-medium text-gray-600">
                        {stat.label}
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>

           
          </div>
        </div>
      </div>
    </div>
  );
}