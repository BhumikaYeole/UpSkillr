import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";
import Progress from "../models/progress.js";
import Course from "../models/course.js";
import User from "../models/user.js";


export const generateCertificate = async (req, res, next) => {
  try {
    const learnerId = req.user._id;
    const { courseId } = req.params;

    const progress = await Progress.findOne({
      learner: learnerId,
      course: courseId,
      certificateUnlocked: true,
    });

    if (!progress) {
      return res.status(403).json({
        success: false,
        message: "Complete the course to unlock certificate",
      });
    }

    const learner = await User.findById(learnerId);
    const course = await Course.findById(courseId).populate(
      "instructor",
      "name"
    );

    // Create PDF
    const doc = new PDFDocument({
      size: "A4",
      layout: "landscape",
    });

    // File name
    const fileName = `certificate-${learner._id}-${course._id}.pdf`;

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=${fileName}`
    );

    doc.pipe(res);

    // Certificate Design
    doc
      .fontSize(30)
      .text("Certificate of Completion", { align: "center" })
      .moveDown(1);

    doc
      .fontSize(18)
      .text("This certifies that", { align: "center" })
      .moveDown(0.5);

    doc
      .fontSize(26)
      .text(learner.name, { align: "center", underline: true })
      .moveDown(0.5);

    doc
      .fontSize(18)
      .text("has successfully completed the course", {
        align: "center",
      })
      .moveDown(0.5);

    doc
      .fontSize(22)
      .text(course.title, { align: "center" })
      .moveDown(1);

    doc
      .fontSize(16)
      .text(`Instructor: ${course.instructor.name}`, {
        align: "center",
      })
      .moveDown(0.5);

    doc
      .fontSize(14)
      .text(`Date: ${new Date().toDateString()}`, {
        align: "center",
      });

    doc.end();
  } catch (error) {
    next(error);
  }
};
