import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Play,
  Check,
  Clock,
  Users,
  Award,
  BookOpen,
  Share2,
  ChevronDown,
  ChevronUp,
  ArrowLeft,
  ClipboardCopy
} from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import { useProfile } from "../hooks/useProfile";
import { completeLessonApi, courseProgressApi, enrollApi, isEnrolledApi } from "../api/auth";



export default function CourseDetailPage() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { refetchProfile } = useProfile();
  const [course, setCourse] = useState(null);
  const [curriculum, setCurriculum] = useState([]);
  const [activeTab, setActiveTab] = useState("overview");
  const [expandedModule, setExpandedModule] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [completedLessons, setCompletedLessons] = useState([]);
  const [progressLoading, setProgressLoading] = useState(false);
  const { user, isAuthorized } = useAuth()
  const [isEnrolled, setIsEnrolled] = useState(false)

  const BASE_URL = "http://localhost:5000/api";

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchCourse = async () => {
      try {
        const res = await fetch(`${BASE_URL}/courses/${courseId}/curriculum`);
        const data = await res.json();

        setCourse(data.course);
        setCurriculum(data.curriculum);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [courseId])

  useEffect(() => {
    const fetchEnrollment = async () => {
      const data = await isEnrolledApi(courseId)
      setIsEnrolled(data.enrolled)
      refetchProfile();
    }
    fetchEnrollment();

    if (!isEnrolled || !courseId) return;

    const fetchProgress = async () => {
      try {
        const res = await courseProgressApi(courseId);
        setCompletedLessons(
          res.progress.completedLessons.map(l => l._id)
        );
      } catch (err) {
        console.error("Failed to fetch progress");
      }
    };

    fetchProgress();
  }, [isEnrolled, courseId])


  const toggleLessonProgress = async (lessonId) => {
    if (!isEnrolled) {
      alert("Enroll to track progress");
      return;
    }
    if (completedLessons.includes(lessonId)) return;
    try {
      setProgressLoading(true);
      const res = await completeLessonApi(courseId, lessonId);
      setCompletedLessons(prev => [...prev, lessonId]);
      alert(res.message)
    } catch (err) {
      alert(err.message);
    } finally {
      setProgressLoading(false);
      refetchProfile();
    }
  };



  const formatDuration = (minutes) => {
    if (!minutes) return "0 min";
    if (minutes < 60) return `${minutes} min`;
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return m === 0 ? `${h}h` : `${h}h ${m}m`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0a1525] via-[#050b14] to-[#0f1a2a] flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0a1525] via-[#050b14] to-[#0f1a2a] flex items-center justify-center px-6">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-white mb-4">404</h1>
          <p className="text-gray-400 text-xl mb-8">Course not found</p>
          <button
            onClick={() => navigate("/courses")}
            className="px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-400 to-cyan-500 text-[#0a1525] font-semibold hover:shadow-lg hover:shadow-cyan-400/50 transition-all"
          >
            Back to Courses
          </button>
        </div>
      </div>
    );
  }

  const totalDuration = curriculum.reduce((sum, s) => sum + s.duration, 0);
  const totalLessons = curriculum.reduce((sum, s) => sum + s.lessons.length, 0);


  const courseUrl = window.location.href;

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: course.title,
          text: `Check out this course: ${course.title}`,
          url: courseUrl
        });
      } catch (err) {
        console.error("Share cancelled");
      }
    } else {
      await navigator.clipboard.writeText(courseUrl);
      alert("Link copied to clipboard");
    }
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(courseUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleEnrollment = async () => {
    if (!user) {
      alert("Login Required")
      return
    }

    await enrollApi(courseId);
    setIsEnrolled(true)
  }


  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a1525] via-[#050b14] to-[#0f1a2a]">

      {/* Back Button */}
      <div className="pt-24 px-6">
        <button
          onClick={() => navigate("/courses")}
          className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors mb-4"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Courses
        </button>
      </div>

      {/* SECTION 1 */}
      <section className="relative pb-16 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <span className="px-4 py-2 rounded-full bg-cyan-400/10 border border-cyan-400/20 text-cyan-400 text-sm font-semibold">
              {course.category}
            </span>

            <h1 className="text-4xl md:text-5xl font-bold text-white my-6">
              {course.title}
            </h1>

            <p className="text-gray-400 text-lg mb-6">
              {course.description}
            </p>

            <div className="flex flex-wrap gap-6 mb-8">
              <div className="flex items-center gap-2 text-cyan-400">
                <Users className="w-5 h-5" />
                <span className="text-white">{course.enrolledCount} students</span>
              </div>

              <div className="flex items-center gap-2 text-purple-400">
                <Clock className="w-5 h-5" />
                <span className="text-white">{formatDuration(totalDuration)}</span>
              </div>

              <div className="flex items-center gap-2 text-green-400">
                <BookOpen className="w-5 h-5" />
                <span className="text-white">{totalLessons} lessons</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full border-2 border-cyan-400 flex items-center justify-center text-white font-bold">
                {course.instructor.name.charAt(0)}
              </div>
              <div>
                <p className="text-white font-semibold text-lg">{course.instructor.name}</p>
                <p className="text-gray-400">{course.instructor.expertise}</p>
              </div>
            </div>
          </div>

          {/* Enrollment Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-6">
              <div className="relative rounded-2xl overflow-hidden mb-6">
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-cyan-400 flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
                    <Play className="w-8 h-8 text-[#0a1525] ml-1" />
                  </div>
                </div>
              </div>

              <p className="text-4xl font-bold text-white text-center mb-2">FREE</p>
              <p className="text-gray-400 text-center mb-6">Full lifetime access</p>

              {isEnrolled ? (<button className="w-full py-4 rounded-2xl bg-gradient-to-r from-green-400 to-green-500 text-[#0a1525] font-bold text-lg mb-4 hover:shadow-lg hover:shadow-green-400/50 transition-all">
                Enrolled !
              </button>) :
                (<button
                  onClick={handleEnrollment}
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-cyan-400 to-cyan-500 text-[#0a1525] font-bold text-lg mb-4 hover:shadow-lg hover:shadow-cyan-400/50 transition-all">
                  Enroll Now - It's Free!
                </button>)
              }
              <div className="space-y-3 mb-6">
                {["Lifetime access", "Certificate of completion", "Download resources", "Mobile & TV access"].map(item => (
                  <div key={item} className="flex items-center gap-3 text-gray-300">
                    <Check className="w-5 h-5 text-green-400" />
                    <span className="text-sm">{item}</span>
                  </div>
                ))}
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleShare}
                  className="flex-1 py-3 rounded-xl border border-white/20 bg-white/5 text-white font-semibold hover:bg-white/10 transition-all flex items-center justify-center gap-2"
                >
                  <Share2 className="w-4 h-4" />
                  Share
                </button>

                <button
                  onClick={handleCopy}
                  className="flex-1 py-3 rounded-xl border border-white/20 bg-white/5 text-white font-semibold hover:bg-white/10 transition-all flex items-center justify-center gap-2"
                >
                  <ClipboardCopy className="w-4 h-4" />
                  {copied ? "Copied!" : "Copy"}
                </button>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2 */}
      <section className="px-6 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex gap-4 mb-8 border-b border-white/10 overflow-x-auto">
            {["overview", "curriculum", "instructor"].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 font-semibold capitalize whitespace-nowrap ${activeTab === tab
                  ? "text-cyan-400 border-b-2 border-cyan-400"
                  : "text-gray-400 hover:text-white"
                  }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-8">

            {/* OVERVIEW */}
            {activeTab === "overview" && (
              <>
                <h2 className="text-2xl font-bold text-white mb-6">What You'll Learn</h2>
                <div className="grid md:grid-cols-2 gap-4 mb-12">
                  {course.learnings.map((point, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-cyan-400 mt-1" />
                      <p className="text-gray-300">{point}</p>
                    </div>
                  ))}
                </div>

                <h2 className="text-2xl font-bold text-white mb-6">Requirements</h2>
                <div className="space-y-3">
                  {course.requirements.map((req, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-cyan-400 mt-2" />
                      <p className="text-gray-300">{req}</p>
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* CURRICULUM */}
            {activeTab === "curriculum" && (
              <div className="space-y-4">
                {curriculum.map((section, idx) => (
                  <div key={section._id} className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
                    <button
                      onClick={() => setExpandedModule(expandedModule === idx ? null : idx)}
                      className="w-full flex items-center justify-between p-6 hover:bg-white/5 transition-all"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-cyan-400/20 flex items-center justify-center">
                          <BookOpen className="w-5 h-5 text-cyan-400" />
                        </div>
                        <div className="text-left">
                          <h3 className="text-white font-semibold">{section.title}</h3>
                          <p className="text-sm text-gray-400">
                            {section.lessons.length} lessons • {formatDuration(section.duration)}
                          </p>
                        </div>
                      </div>
                      {expandedModule === idx ? (
                        <ChevronUp className="w-5 h-5 text-gray-400" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                      )}
                    </button>

                    {expandedModule === idx && (
                      <div className="border-t border-white/10">
                        {section.lessons.map((lesson) => (
                          <div
                            key={lesson._id}
                            className="group flex items-center justify-between p-4 hover:bg-white/5 border-b border-white/5 last:border-0"
                          >
                            <div className="flex items-center gap-3">

                              {/* CHECKBOX */}
                              <input
                                type="checkbox"
                                checked={completedLessons.includes(lesson._id)}
                                disabled={!isEnrolled || progressLoading}
                                title={!isEnrolled ? "Enroll to track progress" : ""}
                                onChange={() => toggleLessonProgress(lesson._id)}
                                onClick={(e) => e.stopPropagation()}
                                className="w-4 h-4 accent-cyan-400 cursor-pointer disabled:opacity-50"
                              />

                              {/* PLAY + TITLE */}
                              <div
                                onClick={() => window.open(lesson.videoUrl, "_blank")}
                                title="Click to watch video"
                                className="flex items-center gap-3 cursor-pointer"
                              >
                                <Play className="w-4 h-4 text-gray-400 group-hover:text-cyan-400 transition-colors" />
                                <span className="text-gray-300">{lesson.title}</span>
                              </div>
                            </div>

                            <span className="text-gray-400 text-sm">
                              {formatDuration(lesson.duration)}
                            </span>
                          </div>

                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* INSTRUCTOR */}
            {activeTab === "instructor" && (
              <div>
                <div className="flex items-start gap-6 mb-8">
                  <div className="w-24 h-24 rounded-full border-4 border-cyan-400 flex items-center justify-center text-white text-2xl font-bold">
                    {course.instructor.name.charAt(0)}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-2">
                      {course.instructor.name}
                    </h2>
                    <p className="text-cyan-400 mb-4">
                      {course.instructor.expertise}
                    </p>
                  </div>
                </div>

                <p className="text-gray-300 leading-relaxed">
                  {course.instructor.name} is a passionate educator with industry experience,
                  dedicated to helping learners build real-world skills through practical,
                  hands-on learning.
                </p>
              </div>
            )}

          </div>
        </div>
      </section>
    </div>
  );
}
