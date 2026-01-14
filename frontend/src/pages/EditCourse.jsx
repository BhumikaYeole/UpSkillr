import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
    Plus,
    Trash2,
    Video,
    Layers,
    Save
} from "lucide-react";

import {
    getCourseCurriculumApi,
    updateCourseApi,
    addSectionApi,
    updateSectionApi,
    deleteSectionApi,
    addLessonApi,
    updateLessonApi,
    deleteLessonApi
} from "../api/course";

export default function EditCourse() {
    const { courseId } = useParams();

    const [course, setCourse] = useState(null);
    const [sections, setSections] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadCourse() {
            try {
                const res = await getCourseCurriculumApi(courseId);
                setCourse(res.course);
                setSections(res.curriculum);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }
        loadCourse();
    }, [courseId]);

    const updateCourse = async () => {
        await updateCourseApi(courseId, {
            title: course.title,
            description: course.description,
            thumbnail: course.thumbnail,
            category: course.category,
            level: course.level
        });
        alert("Course updated");
        window.location.href = "/instructor-dashboard"
    };

    const addSection = async () => {
        const order = sections.length + 1;
        const res = await addSectionApi(courseId, {
            title: `Section ${order}`,
            order
        });
        setSections([...sections, { ...res.section, lessons: [] }]);
    };

    const updateSection = async (sectionId, title) => {
        await updateSectionApi(sectionId, { title });
    };

    const removeSection = async (sectionId) => {
        await deleteSectionApi(sectionId);
        setSections(sections.filter(s => s._id !== sectionId));
    };

    const addLesson = async (sectionId) => {
        const sectionIndex = sections.findIndex(s => s._id === sectionId);
        const order = sections[sectionIndex].lessons.length + 1;

        const res = await addLessonApi(courseId, sectionId, {
            title: `Lesson ${order}`,
            videoUrl: "xyz",
            duration: 0,
            order
        });
        console.log(res)

        const updated = [...sections];
        updated[sectionIndex].lessons.push(res.lesson);
        setSections(updated);
    };

    const updateLesson = async (lessonId, payload) => {
        await updateLessonApi(lessonId, payload);
    };

    const removeLesson = async (sectionId, lessonId) => {
        await deleteLessonApi(lessonId);
        setSections(sections.map(section =>
            section._id === sectionId
                ? { ...section, lessons: section.lessons.filter(l => l._id !== lessonId) }
                : section
        ));
    };

    if (loading) return <p className="text-white">Loading...</p>;

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#0a1525] via-[#050b14] to-[#0f1a2a] px-6 py-10">
            <div className="max-w-5xl mx-auto space-y-6">

                {/* HEADER */}
                <motion.h1 className="text-4xl font-bold text-white">
                    Edit Course
                </motion.h1>

                {/* COURSE INFO */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
                    <input
                        value={course.title}
                        onChange={e => setCourse({ ...course, title: e.target.value })}
                        className="w-full p-3 rounded bg-white/10 text-white"
                        placeholder="Title"
                    />

                    <textarea
                        value={course.description}
                        onChange={e => setCourse({ ...course, description: e.target.value })}
                        className="w-full p-3 rounded bg-white/10 text-white"
                        placeholder="Description"
                    />

                    <input
                        value={course.thumbnail}
                        onChange={e => setCourse({ ...course, thumbnail: e.target.value })}
                        className="w-full p-3 rounded bg-white/10 text-white"
                        placeholder="Thumbnail URL"
                    />

                    <div className="flex gap-4">
                        <select
                            value={course.category}
                            onChange={e => setCourse({ ...course, category: e.target.value })}
                            className="w-full p-3 rounded bg-white/10 text-white"
                        >
                            <option className="text-black">Development</option>
                            <option className="text-black">Design</option>
                            <option className="text-black">Data Science</option>
                            <option className="text-black">Marketing</option>
                            <option className="text-black">Cloud</option>
                            <option className="text-black">Security</option>
                        </select>

                        <select
                            value={course.level}
                            onChange={e => setCourse({ ...course, level: e.target.value })}
                            className="w-full p-3 rounded bg-white/10 text-white"
                        >
                            <option className="text-black">Beginner</option>
                            <option className="text-black">Intermediate</option>
                            <option className="text-black">Advanced</option>
                        </select>
                    </div>
                </div>

                {/* SECTIONS */}
                <button
                    onClick={addSection}
                    className="px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 text-white flex items-center gap-2"
                >
                    <Layers className="w-4 h-4" /> Add Section
                </button>

                {sections.map(section => (
                    <div key={section._id} className="bg-white/5 border border-white/10 rounded-2xl p-5">
                        <div className="flex gap-2 mb-3">
                            <input
                                defaultValue={section.title}
                                onBlur={e => updateSection(section._id, e.target.value)}
                                className="flex-1 p-2 bg-white/10 rounded text-white"
                            />
                            <Trash2
                                onClick={() => removeSection(section._id)}
                                className="w-5 h-5 text-red-400 cursor-pointer"
                            />
                        </div>

                        <button
                            onClick={() => addLesson(section._id)}
                            className="text-cyan-400 flex items-center gap-1 mb-3"
                        >
                            <Plus className="w-4 h-4" /> Add Lesson
                        </button>

                        {section.lessons.map(lesson => (
                            <div key={lesson._id} className="bg-white/5 p-3 rounded mb-2 space-y-2">
                                <input
                                    defaultValue={lesson.title}
                                    onBlur={e =>
                                        updateLesson(lesson._id, { title: e.target.value })
                                    }
                                    className="w-full p-2 bg-white/10 rounded text-white"
                                />

                                <input
                                    defaultValue={lesson.videoUrl}
                                    onBlur={e =>
                                        updateLesson(lesson._id, { videoUrl: e.target.value })
                                    }
                                    className="w-full p-2 bg-white/10 rounded text-white"
                                    placeholder="Video URL"
                                />

                                <div className="flex justify-between items-center">
                                    <div>
                                        <span className="text-white">Duration (in mins) : </span>

                                    <input
                                        type="number"
                                        defaultValue={lesson.duration}
                                        onBlur={e =>
                                            updateLesson(lesson._id, { duration: Number(e.target.value) })
                                        }
                                        className="w-32 p-2 bg-white/10 rounded text-white"
                                        placeholder="Duration"
                                    />
                                    </div>

                                    <Trash2
                                        onClick={() => removeLesson(section._id, lesson._id)}
                                        className="w-4 h-4 text-red-400 cursor-pointer"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>

                ))}
                <button
                    onClick={updateCourse}
                    className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 text-white font-semibold"
                >
                    <Save className="w-4 h-4" /> Save Course
                </button>
            </div>
        </div>
    );
}
