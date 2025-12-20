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

    learnings: [
      {
        type: String,
        required: true,
      },
    ],

    requirements: [
      {
        type: String,
      },
    ],

    

    enrolledCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Course = mongoose.model("Course", courseSchema);

export default Course
