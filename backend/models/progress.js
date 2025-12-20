import mongoose from "mongoose";

const progressSchema = new mongoose.Schema(
  {
    learner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },

    completedLessons: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Lesson",
      },
    ],

    progressPercentage: {
      type: Number,
      default: 0,
    },

    certificateUnlocked: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// one progress per learner per course
progressSchema.index({ learner: 1, course: 1 }, { unique: true });

const Progress = mongoose.model("Progress", progressSchema);
export default Progress;
