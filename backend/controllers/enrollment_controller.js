import Course from "../models/course.js";
import Enrollment from "../models/enrollment.js";
import User from "../models/user.js";

export const enrollCourse = async (req, res, next) => {
  try {
    const learnerId = req.user._id;
    const { courseId } = req.params;

    const enrollment = await Enrollment.create({
      learner: learnerId,
      course: courseId,
    });

    await User.findByIdAndUpdate(learnerId, {
          $inc: { coins: 10 },
        });
    
    await Course.findByIdAndUpdate(courseId,{
      $inc : {enrolledCount : 1},
    });

    res.status(201).json({
      success: true,
      message: "Enrolled successfully",
      enrollment,
    });

  } catch (error) {
    // duplicate enrollment
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Already enrolled in this course",
      });
    }
    next(error);
  }
};

export const getUserEnrollments = async (req, res, next) => {
  try {
    const learnerId = req.user._id;

    const enrollments = await Enrollment.find({ learner: learnerId })
      .populate("course");

    res.status(200).json({
      success: true,
      enrollments,
    });
  } catch (error) {
    next(error);
  }
};

export const isEnrolled = async (req, res, next) => {
  try {
    const learnerId = req.user._id;
    const { courseId } = req.params;

    const enrolled = await Enrollment.exists({
      learner: learnerId,
      course: courseId,
    });

    res.status(200).json({
      success: true,
      enrolled: Boolean(enrolled),
    });
  } catch (error) {
    next(error);
  }
};


