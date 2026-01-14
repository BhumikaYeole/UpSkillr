import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    thumbnail: {
      type: String, // URL
      required: true,
    },

    category: {
      type: String,
      trim: true,
    },

    level: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
      default: "Beginner",
    },

    instructor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    learnings: {
      type: [String],
      default: [
        "Understand core concepts",
        "Apply knowledge through practice",
        "Build real-world skills"
      ],
    },

    requirements: {
      type: [String],
      default: [
        "Basic computer knowledge",
        "Willingness to learn"
      ],
    },

    enrolledCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Course = mongoose.model("Course", courseSchema);

export default Course
