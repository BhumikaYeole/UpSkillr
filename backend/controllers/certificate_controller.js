import Progress from "../models/progress.js";
import Course from "../models/course.js";
import User from "../models/user.js";
import Certificate from "../models/certificate.js";
import Submission from "../models/submission.js";

const generateCertificateId = () => {
  const year = new Date().getFullYear();
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `USK-${year}-${random}`;
};

// API just returns certificate data as JSON
export const generateCertificate = async (req, res, next) => {
  try {
    const learnerId = req.user._id;
    const { courseId } = req.params;

    // Validate submission
    const submission = await Submission.findOne({
      userId: learnerId,
      courseId: courseId
    });

    if (!submission) {
      return res.status(404).json({
        success: false,
        message: "Assessment submission not found"
      });
    }

    // Validate progress
    const progress = await Progress.findOne({
      learner: learnerId,
      course: courseId,
      certificateUnlocked: true
    });

    if (!progress) {
      return res.status(403).json({
        success: false,
        message: "Complete the course to unlock certificate"
      });
    }

    // Fetch user and course data
    const learner = await User.findById(learnerId);
    const course = await Course.findById(courseId).populate("instructor", "name");

    // Check if certificate already exists
    let certificate = await Certificate.findOne({
      learner: learner._id,
      course: course._id
    });

    // Generate new certificate if doesn't exist
    if (!certificate) {
      const certificateId = generateCertificateId();
      
      certificate = await Certificate.create({
        certificateId,
        learner: learner._id,
        course: course._id,
        instructorName: course.instructor.name,
        score: submission.percentage || 95
      });
    }

    // Return certificate data as JSON
    // Frontend will use this to render the certificate and generate PDF
    return res.status(200).json({
      success: true,
      data: {
        certificateId: certificate.certificateId,
        learnerName: learner.name,
        courseTitle: course.title,
        instructorName: course.instructor.name,
        dateIssued: certificate.createdAt,
        score: submission.percentage || 95,
        status: submission.status || "Distinction"
      }
    });

  } catch (error) {
    console.error("Certificate generation error:", error);
    next(error);
  }
};

// Optional: Get existing certificate
export const getCertificate = async (req, res, next) => {
  try {
    const learnerId = req.user._id;
    const { courseId } = req.params;

    const certificate = await Certificate.findOne({
      learner: learnerId,
      course: courseId
    }).populate('course', 'title')
      .populate('learner', 'name');

    if (!certificate) {
      return res.status(404).json({
        success: false,
        message: "Certificate not found"
      });
    }

    const submission = await Submission.findOne({
      userId: learnerId,
      courseId: courseId
    });

    return res.status(200).json({
      success: true,
      data: {
        certificateId: certificate.certificateId,
        learnerName: certificate.learner.name,
        courseTitle: certificate.course.title,
        instructorName: certificate.instructorName,
        dateIssued: certificate.createdAt,
        score: certificate.score,
        status: submission?.status || "Pass"
      }
    });

  } catch (error) {
    console.error("Get certificate error:", error);
    next(error);
  }
};

export const verifyCertificate = async (req, res) => {
  const { certificateId } = req.params;

  const certificate = await Certificate.findOne({ certificateId })
    .populate("learner", "name")
    .populate("course", "title");

  if (!certificate) {
    return res.status(404).json({
      success: false,
      message: "Invalid certificate ID"
    });
  }

  res.json({
    success: true,
    data: {
      name: certificate.learner.name,
      course: certificate.course.title,
      instructor: certificate.instructorName,
      score: certificate.score,
      date: certificate.issuedAt
    }
  });
};

