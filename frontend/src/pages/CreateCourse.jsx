import { useState } from "react";
import { motion } from "framer-motion";
import {
  Plus,
  Trash2,
  Video,
  Layers,
  Edit2
} from "lucide-react";
import {
  createCourseApi,
  addSectionApi,
  addLessonApi,
  updateSectionApi,
  updateLessonApi,
  deleteLessonApi
} from "../api/course";

export default function CreateCourse() {
  const [step, setStep] = useState(1);
  const [courseId, setCourseId] = useState(null);

  const [courseData, setCourseData] = useState({
    title: "",
    description: "",
    thumbnail: "",
    category: "",
    level: "Beginner",
    learnings: [],
    requirements: [],
  });

  const [sections, setSections] = useState([]);

  const [editingSectionId, setEditingSectionId] = useState(null);
  const [editingLessonId, setEditingLessonId] = useState(null);
  const [tempTitle, setTempTitle] = useState("");
  const [videoInputs, setVideoInputs] = useState({});


  const handleCreateCourse = async () => {
    const res = await createCourseApi(courseData);
    setCourseId(res.course._id);
    setStep(2);
  };

  const addSection = async () => {
    const order = sections.length + 1;
    const res = await addSectionApi(courseId, {
      title: `Section ${order}`,
      order,
    });

    setSections([...sections, { ...res.section, lessons: [] }]);
  };

  const saveSectionTitle = async (sectionId) => {
    await updateSectionApi(sectionId, { title: tempTitle });

    setSections(sections.map(s =>
      s._id === sectionId ? { ...s, title: tempTitle } : s
    ));

    setEditingSectionId(null);
  };


  const addLesson = async (sectionId) => {
    if (!videoInputs[sectionId]) {
      alert("Video URL is required");
      return;
    }

    console.log(videoInputs[sectionId])
    const sectionIndex = sections.findIndex(s => s._id === sectionId);
    const order = sections[sectionIndex].lessons.length + 1;

    const res = await addLessonApi(courseId, sectionId, {
      title: `Lesson ${order}`,
      videoUrl: videoInputs[sectionId],
      duration: 0,
      order,
    });

    const updated = [...sections];
    updated[sectionIndex].lessons.push(res.lesson);
    setSections(updated);
    setVideoInputs({ ...videoInputs, [sectionId]: "" });
  };


  const saveLessonTitle = async (lessonId) => {
    await updateLessonApi(lessonId, { title: tempTitle });

    setSections(sections.map(section => ({
      ...section,
      lessons: section.lessons.map(lesson =>
        lesson._id === lessonId ? { ...lesson, title: tempTitle } : lesson
      )
    })));

    setEditingLessonId(null);
  };

  const deleteLesson = async (lessonId) => {
    await deleteLessonApi(lessonId);

    setSections(sections.map(section => ({
      ...section,
      lessons: section.lessons.filter(l => l._id !== lessonId)
    })));
  };

  const handleClick = ()=>{
    alert("Course created successfully")
    window.location.href = "/instructor-dashboard"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a1525] via-[#050b14] to-[#0f1a2a] px-6 py-10">
      <div className="max-w-5xl mx-auto">

        <motion.h1 className="text-4xl font-bold text-white mb-6">
          Create a New Course
        </motion.h1>

        {/* STEP 1 */}
        {step === 1 && (
          <motion.div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
            <input
              placeholder="Course Title"
              className="w-full p-3 rounded bg-white/10 text-white"
              onChange={(e) => setCourseData({ ...courseData, title: e.target.value })}
            />
            <textarea
              placeholder="Course Description"
              className="w-full p-3 rounded bg-white/10 text-white"
              onChange={(e) => setCourseData({ ...courseData, description: e.target.value })}
            />
            <input
              placeholder="Thumbnail URL"
              className="w-full p-3 rounded bg-white/10 text-white"
              onChange={(e) => setCourseData({ ...courseData, thumbnail: e.target.value })}
            />
            <select
              className="w-full p-3 rounded bg-white/10 text-white"
              onChange={(e) => setCourseData({ ...courseData, category: e.target.value })}
            >
              <option className="text-black">Select Category</option>
              <option className="text-black">Development</option>
              <option className="text-black">Design</option>
              <option className="text-black">Data Science</option>
              <option className="text-black">Marketing</option>
              <option className="text-black">Cloud</option>
              <option className="text-black">Security</option>
            </select>
            <button
              onClick={handleCreateCourse}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 text-white font-semibold"
            >
              Create Course
            </button>
          </motion.div>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <div className="space-y-6">
            <button
              onClick={addSection}
              className="px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 text-white flex items-center gap-2"
            >
              <Layers className="w-4 h-4" />
              Add Section
            </button>

            {sections.map((section) => (
              <div key={section._id} className="bg-white/5 border border-white/10 rounded-2xl p-5">
                {/* Section Title */}
                <div className="flex justify-between items-center mb-3">
                  {editingSectionId === section._id ? (
                    <input
                      autoFocus
                      value={tempTitle}
                      onChange={(e) => setTempTitle(e.target.value)}
                      onBlur={() => saveSectionTitle(section._id)}
                      onKeyDown={(e) => e.key === "Enter" && saveSectionTitle(section._id)}
                      className="bg-white/10 text-white px-3 py-1 rounded w-full"
                    />
                  ) : (
                    <>
                      <h3 className="text-lg font-bold text-white">{section.title}</h3>
                      <Edit2
                        className="w-4 h-4 text-gray-400 cursor-pointer"
                        onClick={() => {
                          setEditingSectionId(section._id);
                          setTempTitle(section.title);
                        }}
                      />
                    </>
                  )}
                </div>

                {/* Add Lesson */}
                <div className="flex gap-2 mb-3">
                  <input
                    placeholder="Video URL"
                    value={videoInputs[section._id] || ""}
                    onChange={(e) =>
                      setVideoInputs({ ...videoInputs, [section._id]: e.target.value })
                    }
                    className="flex-1 p-2 rounded bg-white/10 text-white"
                  />
                  <button
                    onClick={() => addLesson(section._id)}
                    className="px-3 rounded bg-cyan-500 text-white"
                  >
                    <Plus />
                  </button>
                </div>

                {/* Lessons */}
                {section.lessons.map((lesson) => (
                  <div key={lesson._id} className="flex justify-between items-center bg-white/5 p-3 rounded mb-2">
                    {editingLessonId === lesson._id ? (
                      <input
                        autoFocus
                        value={tempTitle}
                        onChange={(e) => setTempTitle(e.target.value)}
                        onBlur={() => saveLessonTitle(lesson._id)}
                        onKeyDown={(e) => e.key === "Enter" && saveLessonTitle(lesson._id)}
                        className="bg-white/10 text-white px-3 py-1 rounded w-full"
                      />
                    ) : (
                      <>
                        <div className="flex items-center gap-2 text-white">
                          <Video className="w-4 h-4 text-cyan-400" />
                          {lesson.title}
                        </div>
                        <div className="flex gap-3">
                          <Edit2
                            className="w-4 h-4 text-gray-400 cursor-pointer"
                            onClick={() => {
                              setEditingLessonId(lesson._id);
                              setTempTitle(lesson.title);
                            }}
                          />
                          <Trash2
                            className="w-4 h-4 text-red-400 cursor-pointer"
                            onClick={() => deleteLesson(lesson._id)}
                          />
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            ))}
            <div className="flex justify-end mb-6">
              <button
              onClick={handleClick}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500
               text-white font-semibold shadow-lg shadow-cyan-500/20
               hover:from-cyan-300 hover:to-blue-400
               transition-all duration-300"
              >
                Create
              </button>
            </div>

          </div>
        )}


      </div>
    </div>
  );
}
