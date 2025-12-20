import mongoose from "mongoose";

const courseSectionSchema = new mongoose.Schema(
  {
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    order: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const courseSection = mongoose.model("CourseSection", courseSectionSchema);
export default courseSection
