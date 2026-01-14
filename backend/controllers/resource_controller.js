import Resource from "../models/resource.js";
import Course from "../models/course.js";
import User from "../models/user.js";
import UnlockedResource from "../models/unlocked_resource.js";

export const addResource = async (req, res, next) => {
  try {
    const instructorId = req.user._id;
    const { courseId } = req.params;
    const { title, type, fileUrl, fileSize, requiredCoins, isDownloadable } = req.body;

    // verify course ownership
    const course = await Course.findOne({
      _id: courseId,
      instructor: instructorId,
    });

    if (!course) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized or course not found",
      });
    }

    const resource = await Resource.create({
      course: courseId,
      title,
      type,
      fileUrl,
      fileSize,
      requiredCoins,
      isDownloadable,
    });

    res.status(201).json({
      success: true,
      message: "Resource added successfully",
      resource,
    });
  } catch (error) {
    next(error);
  }
};


export const deleteResource = async (req, res, next) => {
  try {
    const { resourceId } = req.params;

    const resource = await Resource.findByIdAndDelete(resourceId);

    if (!resource) {
      return res.status(404).json({
        success: false,
        message: "Resource not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Resource deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};


export const downloadResource = async (req, res, next) => {
  try {
    const { resourceId } = req.params;
    const learnerId = req.user._id;

    const resource = await Resource.findById(resourceId);
    const user = await User.findById(learnerId);

    if (!resource) {
      return res.status(404).json({
        success: false,
        message: "Resource not found",
      });
    }

    if (!resource.isDownloadable) {
      return res.status(403).json({
        success: false,
        message: "Download not allowed",
      });
    }

    // Check if already unlocked
    const alreadyUnlocked = await UnlockedResource.findOne({
      learner: learnerId,
      resource: resourceId,
    });

    //  If already unlocked → allow download
    if (alreadyUnlocked) {
      return res.status(200).json({
        success: true,
        fileUrl: resource.fileUrl,
        alreadyUnlocked: true,
      });
    }

    //  Not unlocked → check coins
    if (user.coins < resource.requiredCoins) {
      return res.status(403).json({
        success: false,
        message: "Not enough coins to unlock this resource",
      });
    }

    //  Deduct coins
    user.coins -= resource.requiredCoins;
    await user.save();

    //  Save unlock record
    await UnlockedResource.create({
      learner: learnerId,
      resource: resourceId,
    });

    res.status(200).json({
      success: true,
      fileUrl: resource.fileUrl,
      unlockedNow: true,
    });

  } catch (error) {
    next(error);
  }
};


export const getCourseResources = async (req, res, next) => {
  try {
    const { courseId } = req.params;
    const learnerId = req.user._id;

    const user = await User.findById(learnerId);
    const resources = await Resource.find({ course: courseId });

    const unlocked = await UnlockedResource.find({
      learner: learnerId,
      resource: { $in: resources.map(r => r._id) },
    });

    const unlockedSet = new Set(
      unlocked.map(u => u.resource.toString())
    );

    const formatted = resources.map(r => ({
      _id: r._id,
      title: r.title,
      fileUrl : r.fileUrl,
      type: r.type,
      size: r.fileSize,
      requiredCoins: r.requiredCoins,
      unlocked: unlockedSet.has(r._id.toString()),
      canDownload:
        unlockedSet.has(r._id.toString()) ||
        user.coins >= r.requiredCoins,
    }));

    res.status(200).json({
      success: true,
      resources: formatted,
    });

  } catch (error) {
    next(error);
  }
};
