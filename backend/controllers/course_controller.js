import Course from "../models/course.js";
import courseSection from "../models/course_module.js";
import Lesson from "../models/course_lessons.js";

// CREATE COURSE
export const createCourse = async (req, res, next) => {
  try {
    const instructorId = req.user._id;

    const { 
      title, 
      description, 
      thumbnail, 
      category, 
      level, 
      learnings, 
      requirements 
    } = req.body;

    const course = await Course.create({
      title,
      description,
      thumbnail,
      category,
      level,
      instructor: instructorId,
      learnings,
      requirements
    });

    res.status(201).json({
      success: true,
      message: "Course created successfully",
      course
    });

  } catch (error) {
    next(error);
  }
};


// ADD SECTION TO COURSE

export const addSection = async (req, res, next) => {
  try {
    const { courseId } = req.params;
    const { title, order } = req.body;

    const section = await courseSection.create({
      courseId,
      title,
      order
    });

    res.status(201).json({
      success: true,
      message: "Section added successfully",
      section
    });

  } catch (error) {
    next(error);
  }
};


// ADD LESSON TO SECTION
export const addLesson = async (req, res, next) => {
  try {
    const { courseId, sectionId } = req.params;
    const { title, videoUrl, duration, order } = req.body;

    const lesson = await Lesson.create({
      courseId,
      sectionId,
      title,
      videoUrl,
      duration,
      order
    });

    res.status(201).json({
      success: true,
      message: "Lesson added successfully",
      lesson
    });

  } catch (error) {
    next(error);
  }
};

// GET ALL COURSES
//  used mongodb aggregators to optimize db queries
export const getCourses = async (req, res, next) => {
  try {
    const courses = await Course.aggregate([
      // Join lessons
      {
        $lookup: {
          from: "lessons",            
          localField: "_id",
          foreignField: "courseId",
          as: "lessons"
        }
      },

      // Compute total duration
      {
        $addFields: {
          lesson_length: { $size: "$lessons" },
          duration: {
            $sum: "$lessons.duration"
          }
        }
      },

      // Join instructor
      {
        $lookup: {
          from: "users",
          localField: "instructor",
          foreignField: "_id",
          as: "instructor"
        }
      },

      // Convert instructor array → object
      {
        $unwind: {
          path: "$instructor",
          preserveNullAndEmptyArrays: true
        }
      },

      // Select only required instructor fields
      {
        $project: {
          "instructor.password": 0,
          "lessons": 0            
        }
      }
    ]);

    if (!courses.length) {
      return res.status(404).json({
        success: false,
        message: "No courses found"
      });
    }

    res.status(200).json({
      success: true,
      courses
    });

  } catch (error) {
    next(error);
  }
};


// GET COURSE CURRICULUM

export const getCourseCurriculum = async (req, res, next) => {
  try {
    const { courseId } = req.params;

    const course = await Course.findById(courseId).populate("instructor", "name email expertise");

    if (!course) {
      const error = new Error("Course not found");
      error.statusCode = 404;
      throw error;
    }

    const sections = await courseSection.find({ courseId }).sort({ order: 1 });
    // console.log(sections.length)

    const lessons = await Lesson.find({ courseId }).sort({ order: 1 });
    // console.log(lessons.length)
    const duration = lessons.reduce((total, lesson) => total + lesson.duration, 0);
    // console.log("Total Duration:", duration);

    // Group lessons under each section
    const curriculum = sections.map(section => ({
      _id: section._id,
      title: section.title,
      order: section.order,
      lessons: lessons.filter(lesson => lesson.sectionId.toString() === section._id.toString()),
      lesson_length : lessons.length,
      duration : duration
    }));

    res.status(200).json({
      success: true,
      course,
      curriculum
    });

  } catch (error) {
    next(error);
  }
};


// UPDATE COURSE
export const updateCourse = async (req, res, next) => {
  try {
    const { courseId } = req.params;
    const instructorId = req.user._id;

    const course = await Course.findOne({
      _id: courseId,
      instructor: instructorId
    });

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found or unauthorized"
      });
    }

    const updates = req.body;

    const updatedCourse = await Course.findByIdAndUpdate(
      courseId,
      updates,
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: "Course updated successfully",
      course: updatedCourse
    });

  } catch (error) {
    next(error);
  }
};



// DELETE COURSE
export const deleteCourse = async (req, res, next) => {
  try {
    const { courseId } = req.params;
    const instructorId = req.user._id;

    const course = await Course.findOne({
      _id: courseId,
      instructor: instructorId
    });

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found or unauthorized"
      });
    }

    // delete lessons
    await Lesson.deleteMany({ courseId });

    // delete sections
    await courseSection.deleteMany({ courseId });

    // delete course
    await Course.findByIdAndDelete(courseId);

    res.status(200).json({
      success: true,
      message: "Course deleted successfully"
    });

  } catch (error) {
    next(error);
  }
};


// UPDATE SECTION

export const updateSection = async (req, res, next) => {
  try {
    const { sectionId } = req.params;
    const { title, order } = req.body;

    const section = await courseSection.findByIdAndUpdate(
      sectionId,
      { title, order },
      { new: true, runValidators: true }
    );

    if (!section) {
      return res.status(404).json({
        success: false,
        message: "Section not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Section updated successfully",
      section
    });

  } catch (error) {
    next(error);
  }
};


// DELETE SECTION
export const deleteSection = async (req, res, next) => {
  try {
    const { sectionId } = req.params;

    const section = await courseSection.findById(sectionId);

    if (!section) {
      return res.status(404).json({
        success: false,
        message: "Section not found"
      });
    }

    // delete lessons in this section
    await Lesson.deleteMany({ sectionId });

    // delete section
    await courseSection.findByIdAndDelete(sectionId);

    res.status(200).json({
      success: true,
      message: "Section deleted successfully"
    });

  } catch (error) {
    next(error);
  }
};


// UPDATE LESSON
export const updateLesson = async (req, res, next) => {
  try {
    const { lessonId } = req.params;
    const { title, videoUrl, duration, order } = req.body;

    const lesson = await Lesson.findByIdAndUpdate(
      lessonId,
      { title, videoUrl, duration, order },
      { new: true, runValidators: true }
    );

    if (!lesson) {
      return res.status(404).json({
        success: false,
        message: "Lesson not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Lesson updated successfully",
      lesson
    });

  } catch (error) {
    next(error);
  }
};

// DELETE LESSON

export const deleteLesson = async (req, res, next) => {
  try {
    const { lessonId } = req.params;

    const lesson = await Lesson.findByIdAndDelete(lessonId);

    if (!lesson) {
      return res.status(404).json({
        success: false,
        message: "Lesson not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Lesson deleted successfully"
    });

  } catch (error) {
    next(error);
  }
};

