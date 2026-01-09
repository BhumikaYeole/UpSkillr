import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  MapPin,
  Calendar,
  Edit2,
  BookOpen,
  Trophy,
  Target,
  Clock,
  Award,
  TrendingUp,
  Star,
  Sparkles,
  Zap,
  Flame,
  Shield,
  Rocket
} from "lucide-react";
import { useProfile } from "../hooks/useProfile";
import { useNavigate } from "react-router-dom";

export default function StudentProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState(null);
  const [editForm, setEditForm] = useState(null);
  const { user, enrolledCourses, loading, updateProfile, lessonsCompleted,completedCourses, learningTime } = useProfile();

  const navigate = useNavigate();

  useEffect(() => {
    if(loading) return;
    if (!user) return;
    

    const mappedUserData = {
      name: user.name,
      role: user.role,
      email: user.email,
      location: user.location || "—",
      joinedDate: user.createdAt
        ? new Date(user.createdAt).toLocaleDateString("en-US", {
            month: "long",
            year: "numeric"
          })
        : "—",
      bio: user.about || "",
      coins: user.coins || 0,
      enrolledCourses: enrolledCourses,
      completedCourses: completedCourses || 0,
      lessonsCompleted: lessonsCompleted || 0,
      learningTime: learningTime || "0h",
    };

    setUserData(mappedUserData);
    setEditForm(mappedUserData);
  }, [user, enrolledCourses, completedCourses, lessonsCompleted, learningTime]);

  const handleEdit = () => {
    setEditForm(userData);
    setIsEditing(true);
  };

  const handleSave = async () => {
  try {
    const payload = {
      name: editForm.name,
      email: editForm.email,
      location: editForm.location,
      about: editForm.bio
    };

    const updatedUser = await updateProfile(payload);

    setUserData(prev => ({
      ...prev,
      name: updatedUser.name,
      email: updatedUser.email,
      location: updatedUser.location,
      bio: updatedUser.about
    }));

    setIsEditing(false);
  } catch (err) {
    console.error("Profile update failed", err);
  }
};

  const handleCancel = () => {
    setEditForm(userData);
    setIsEditing(false);
  };

  const handleChange = (field, value) => {
    setEditForm(prev => ({ ...prev, [field]: value }));
  };


  const stats = [
    {
      icon: BookOpen,
      label: "Enrolled Courses",
      value: enrolledCourses.length,
      color: "from-blue-400 to-cyan-500",
      bgColor: "from-blue-50 to-cyan-50"
    },
    {
      icon: Trophy,
      label: "Completed",
      value: completedCourses,
      color: "from-emerald-400 to-green-500",
      bgColor: "from-emerald-50 to-green-50"
    },
    {
      icon: Target,
      label: "Lessons Completed",
      value: lessonsCompleted,
      color: "from-amber-400 to-orange-500",
      bgColor: "from-amber-50 to-orange-50"
    },
    {
      icon: Clock,
      label: "Learning Time",
      value: learningTime,
      color: "from-purple-400 to-pink-500",
      bgColor: "from-purple-50 to-pink-50"
    }
  ];

  //  safe render guard
  if (loading || !userData || !editForm) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0e27] via-[#1a1f3a] to-[#0f1729] py-8 px-4 sm:px-6 lg:px-8">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }}></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "2s" }}></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Profile Header Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl border border-white/20 rounded-3xl shadow-2xl overflow-hidden mb-8"
        >
          {/* Cover Banner with Mesh Gradient */}
          <div className="h-48 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLW9wYWNpdHk9IjAuMSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20"></div>
            
            {/* Floating particles */}
            <div className="absolute top-10 left-10 w-2 h-2 bg-white rounded-full animate-ping"></div>
            <div className="absolute top-20 right-20 w-2 h-2 bg-white rounded-full animate-ping" style={{animationDelay: '0.5s'}}></div>
            <div className="absolute bottom-10 left-1/3 w-2 h-2 bg-white rounded-full animate-ping" style={{animationDelay: '1s'}}></div>
          </div>

          {/* Profile Info */}
          <div className="relative px-8 pb-8">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between -mt-20 mb-6">
              <div className="flex flex-col sm:flex-row items-center sm:items-end gap-6">
                {/* Avatar with glow effect */}
                <motion.div
                  whileHover={{ scale: 1.05, rotate: -5 }}
                  className="relative group"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-pink-500 rounded-3xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity"></div>
                  <div className="relative w-40 h-40 rounded-3xl bg-gradient-to-br from-blue-400 via-purple-500 to-pink-600 flex items-center justify-center text-white text-6xl font-bold shadow-2xl border-4 border-white/20">
                    {userData.name.charAt(0)}
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center border-4 border-[#0a0e27]">
                      <Rocket className="w-4 h-4 text-white" />
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
                        className="text-4xl font-bold text-white bg-white/10 backdrop-blur-xl border-2 border-white/20 rounded-2xl px-4 py-2 focus:border-blue-400 focus:outline-none"
                      />
                    ) : (
                      <h1 className="text-4xl md:text-5xl font-bold text-white">
                        {userData.name}
                      </h1>
                    )}
                  </div>
                  <p className="text-xl text-gray-300 capitalize mb-3">{userData.role}</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 items-center">
                {/* Coins Display */}
                <motion.div 
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="flex items-center gap-3 px-6 py-3 bg-gradient-to-br from-amber-500/20 to-yellow-500/20 backdrop-blur-xl rounded-2xl border-2 border-amber-400/50 shadow-lg"
                >
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-full blur-lg opacity-50"></div>
                    <div className="relative w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-yellow-500 flex items-center justify-center shadow-lg">
                      <Award className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold bg-gradient-to-r from-amber-300 to-yellow-400 bg-clip-text text-transparent">{userData.coins}</div>
                    <div className="text-xs text-amber-200 font-semibold">Coins</div>
                  </div>
                </motion.div>

                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleEdit}
                  className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold rounded-2xl shadow-lg hover:shadow-blue-500/50 transition-all flex items-center gap-2 border border-blue-400/50"
                >
                  <Edit2 className="w-5 h-5" />
                  Edit Profile
                </motion.button>
              </div>
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
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white">About</h2>
              </div>
              
              {isEditing ? (
                <textarea
                  value={editForm.bio}
                  onChange={(e) => handleChange('bio', e.target.value)}
                  className="w-full p-4 border-2 border-white/20 rounded-2xl focus:border-blue-400 focus:outline-none text-gray-300 bg-white/5 backdrop-blur-xl mb-6 min-h-[100px]"
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
                  {isEditing ? (
                    <input
                      type="email"
                      value={editForm.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      className="flex-1 px-3 py-2 border-2 border-white/20 rounded-lg focus:border-blue-400 focus:outline-none text-sm bg-white/5 text-white"
                    />
                  ) : (
                    <span className="text-sm">{userData.email}</span>
                  )}
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
                      className="flex-1 px-3 py-2 border-2 border-white/20 rounded-lg focus:border-blue-400 focus:outline-none text-sm bg-white/5 text-white"
                    />
                  ) : (
                    <span className="text-sm">{userData.location}</span>
                  )}
                </motion.div>
                
                <motion.div whileHover={{ x: 5 }} className="flex items-center gap-3 text-gray-300 p-3 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-400 to-pink-600 flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-sm">Joined {userData.joinedDate}</span>
                </motion.div>
              </div>

              {isEditing && (
                <div className="flex gap-3 mt-6">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleSave}
                    className="flex-1 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-blue-500/50 transition-all"
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
            {/* Learning Stats */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl border border-white/20 rounded-3xl shadow-xl p-8"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-white">Learning Stats</h2>
                </div>
                <div className="flex items-center gap-2 text-gray-400 bg-white/5 px-4 py-2 rounded-full backdrop-blur-xl">
                  <Flame className="w-4 h-4 text-orange-400" />
                  <span className="text-sm font-medium">Your Progress</span>
                </div>
              </div>

              {userData.enrolledCourses === 0 ? (
                <div className="text-center py-16">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", duration: 0.5 }}
                    className="relative w-32 h-32 mx-auto mb-6"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-500 rounded-3xl blur-2xl opacity-50"></div>
                    <div className="relative w-full h-full rounded-3xl bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center shadow-2xl">
                      <BookOpen className="w-16 h-16 text-white" />
                    </div>
                  </motion.div>
                  <h3 className="text-3xl font-bold text-white mb-3">
                    Start Your Learning Journey
                  </h3>
                  <p className="text-gray-400 mb-8 max-w-md mx-auto text-lg">
                    You haven't enrolled in any courses yet. Browse our catalog and start learning something new today!
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={()=>navigate("/courses")}
                    className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold rounded-2xl shadow-lg hover:shadow-blue-500/50 transition-all border border-blue-400/50"
                  >
                    Browse Courses
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
