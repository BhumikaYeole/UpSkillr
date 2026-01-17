import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";
import Progress from "../models/progress.js";
import Course from "../models/course.js";
import User from "../models/user.js";
import Certificate from "../models/certificate.js";

const generateCertificateId = () => {
  const year = new Date().getFullYear();
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `USK-${year}-${random}`;
};


export const generateCertificate = async (req, res, next) => {
  try {
    const learnerId = req.user._id;
    const { courseId } = req.params;

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

    const learner = await User.findById(learnerId);
    const course = await Course.findById(courseId).populate("instructor", "name");

    const certificateId = generateCertificateId();

    await Certificate.create({
      certificateId,
      learner: learner._id,
      course: course._id,
      instructorName: course.instructor.name,
      score: progress.score || 95
    });

    const doc = new PDFDocument({ size: "A4", layout: "landscape" });

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=certificate-${certificateId}.pdf`
    );

    doc.pipe(res);

    doc.fontSize(30).text("Certificate of Completion", { align: "center" });
    doc.moveDown();

    doc.fontSize(18).text("This certifies that", { align: "center" });
    doc.moveDown(0.5);

    doc.fontSize(26).text(learner.name, {
      align: "center",
      underline: true
    });

    doc.moveDown(0.5);
    doc.fontSize(18).text("has successfully completed", { align: "center" });

    doc.moveDown(0.5);
    doc.fontSize(22).text(course.title, { align: "center" });

    doc.moveDown();
    doc.fontSize(16).text(`Instructor: ${course.instructor.name}`, {
      align: "center"
    });

    doc.fontSize(14).text(`Issued on: ${new Date().toDateString()}`, {
      align: "center"
    });

    doc.moveDown(1.5);
  
    doc.fontSize(12).text(`Certificate ID: ${certificateId}`, {
      align: "center"
    });

    doc.end();

    
    res.json({
      success : true,
      data : certificateId
    });
  } catch (error) {
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

