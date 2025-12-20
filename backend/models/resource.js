import mongoose from "mongoose";

const resourceSchema = new mongoose.Schema(
  {
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    type: {
      type: String,
      enum: ["pdf", "doc", "ppt", "cheatsheet", "link"],
      required: true,
    },

    fileUrl: {
      type: String,
      required: true,
    },

    fileSize: {
      type: Number,
    },

    //  Coins needed to download
    requiredCoins: {
      type: Number,
      default: 0,
    },

    isDownloadable: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Resource", resourceSchema);
