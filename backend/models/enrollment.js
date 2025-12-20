import mongoose from "mongoose";

const enrollmentSchema = new mongoose.Schema(
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

    enrolledAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// prevent duplicate enrollment
enrollmentSchema.index({ learner: 1, course: 1 }, { unique: true });

const Enrollment = mongoose.model("Enrollment", enrollmentSchema);
export default Enrollment;
