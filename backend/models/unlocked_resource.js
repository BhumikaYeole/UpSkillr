import mongoose from "mongoose";

const unlockedResourceSchema = new mongoose.Schema(
  {
    learner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    resource: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Resource",
      required: true,
    },
    unlockedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// prevent duplicate unlocks
unlockedResourceSchema.index(
  { learner: 1, resource: 1 },
  { unique: true }
);

export default mongoose.model("UnlockedResource", unlockedResourceSchema);
