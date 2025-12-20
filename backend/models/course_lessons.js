import mongoose from "mongoose";

const lessonSchema = new mongoose.Schema(
  {
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },

    sectionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CourseSection",
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    videoUrl: {
      type: String,
      required: true,
    },

    duration: {
      type: Number, 
    },

    order: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Lesson = mongoose.model("Lesson", lessonSchema);
export default Lesson
