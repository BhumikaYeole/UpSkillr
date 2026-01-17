import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Username is required"],
      trim: true,
      minLength: 1,
      maxLength: 50,
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      unique: true,
      lowercase: true,
      match: [/\S+@\S+\.\S+/, "Please enter a valid email address"],
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minLength: 6,
    },

    role: {
      type: String,
      enum: ["learner", "instructor"],
      required: [true, "Please select user role"],
      lowercase: true,
    },

    coins: {
      type: Number,
      default: 0,
    },

    // ✅ CHANGE THIS - Make expertise accept both String and Array
    expertise: {
      type: [String], // Array of strings
      default: [],
    },

    experience: {
      type: String,
      default: null,
      trim: true,
    },

    about: {
      type: String,
      trim: true,
      maxLength: 1000,
    },

    location: {
      type: String,
      trim: true,
    },

    // instructor profile
    title: {
      type: String,
      trim: true,
    },

    website: {
      type: String,
      trim: true,
    },

    languages: {
      type: [String],
      default: ["English"],
    },

    linkedIn: {
      type: String,
      trim: true,
    },

    github: {
      type: String,
      trim: true,
    },

    twitter: {
      type: String,
      trim: true,
    },

    joinedOn: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;