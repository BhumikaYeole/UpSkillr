import Progress from "../models/progress.js";
import Lesson from "../models/course_lessons.js";
import Course from "../models/course.js";
import User from "../models/user.js";

export const completeLesson = async (req, res, next) => {
  try {
    const learnerId = req.user._id;
    const { courseId, lessonId } = req.params;

    // find or create progress
    let progress = await Progress.findOne({
      learner: learnerId,
      course: courseId,
    });

    if (!progress) {
      progress = await Progress.create({
        learner: learnerId,
        course: courseId,
        completedLessons: [],
      });
    }

    // prevent duplicate completion
    if (progress.completedLessons.includes(lessonId)) {
      return res.status(400).json({
        success: false,
        message: "Lesson already completed",
      });
    }

    // add lesson
    progress.completedLessons.push(lessonId);

    // calculate progress
    const totalLessons = await Lesson.countDocuments({ courseId });
    const completedCount = progress.completedLessons.length;

    progress.progressPercentage = Math.round(
      (completedCount / totalLessons) * 100
    );

    // unlock certificate if completed
    if (progress.progressPercentage === 100) {
      progress.certificateUnlocked = true;

      //course completion = 50 coins 
      await User.findByIdAndUpdate(learnerId, {
      $inc: { coins: 50 },
    });
    }

    await progress.save();

    // increase coins (1 lesson = 10 coins)
    await User.findByIdAndUpdate(learnerId, {
      $inc: { coins: 10 },
    });

    res.status(200).json({
      success: true,
      message: "Lesson marked as completed",
      progress,
    });

  } catch (error) {
    next(error);
  }
};

// Get progress for a course
export const getCourseProgress = async (req, res, next) => {
  try {
    const learnerId = req.user._id;
    const { courseId } = req.params;

    const progress = await Progress.findOne({
      learner: learnerId,
      course: courseId,
    }).populate("completedLessons", "title");

    if (!progress) {
      return res.status(200).json({
        success: true,
        progress: {
          progressPercentage: 0,
          completedLessons: [],
        },
      });
    }

    res.status(200).json({
      success: true,
      progress,
    });

  } catch (error) {
    next(error);
  }
};


export const getLearnerDashboard = async (req, res, next) => {
  try {
    const learnerId = req.user._id;

    const progressData = await Progress.find({ learner: learnerId })
      .populate({
        path: "completedLessons",
        select: "duration"
      })
      .populate("course", "title thumbnail");

    let totalLessonsCompleted = 0;
    let completedCourses = 0;
    let totalLearningTime = 0; 

    progressData.forEach(progress => {
      const lessonsCount = progress.completedLessons.length;
      totalLessonsCompleted += lessonsCount;

      progress.completedLessons.forEach(lesson => {
        totalLearningTime += lesson.duration;
      });

      if (progress.progressPercentage === 100) {
        completedCourses++;
      }
    });

    res.status(200).json({
      success: true,
      dashboard: {
        enrolledCourses: progressData.length,
        completedCourses,
        lessonsCompleted: totalLessonsCompleted,
        learningTime: `${totalLearningTime} min`,
        progressData
      }
    });

  } catch (error) {
    next(error);
  }
};


