import User from "../models/user.js";
import Course from "../models/course.js";
import Enrollment from "../models/enrollment.js";

export const getUserProfile = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const user = await User.findById(userId).select(
      "-password"
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    let extraData = {};

    // Instructor-specific data
    if (user.role === "instructor") {
      const courses = await Course.find({ instructor: userId }).select(
        "title thumbnail enrolledCount"
      );

      extraData = {
        publishedCourses: courses,
        expertise: user.expertise,
      };
    }

    // Learner-specific data
    if (user.role === "learner") {
      const enrollments = await Enrollment.find({ learner: userId })
        .populate("course", "title thumbnail");

      extraData = {
        enrolledCourses: enrollments.map((e) => e.course),
      };
    }

    res.status(200).json({
      success: true,
      profile: {
        user,
        ...extraData,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const updateUserProfile = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const allowedUpdates = ["name", "about", "location", "email"];
    const updates = {};

    for (let key of allowedUpdates) {
      if (req.body[key] !== undefined) {
        updates[key] = req.body[key];
      }
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      updates,
      { new: true, runValidators: true }
    ).select("-password");

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: updatedUser,
    });
    
  } catch (error) {
    next(error);
  }
};
