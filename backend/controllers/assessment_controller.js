import Assessment from '../models/assessment.js';
import Course from '../models/course.js';
import Submission from '../models/submission.js';

// Create assessment from JSON
export const createAssessmentFromJSON = async (req, res) => {
  try {
    const { courseId, assessmentData } = req.body;
    
    // Validate JSON structure
    if (!assessmentData || !assessmentData.questions || !Array.isArray(assessmentData.questions)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid assessment data format'
      });
    }

    // Transform JSON to match schema
    const assessment = new Assessment({
      courseId: courseId,
      title: assessmentData.courseTitle || assessmentData.title || 'Course Assessment',
      description: assessmentData.courseSubject || 'Assessment Test',
      duration: assessmentData.duration || 15,
      totalMarks: assessmentData.totalMarks || assessmentData.questions.length * 2,
      passingPercentage: assessmentData.passingPercentage || 50,
      questions: assessmentData.questions.map(q => ({
        question: q.question,
        options: q.options,
        answer: q.correctAnswer
      })),
      createdBy: req.user._id,
      isActive: true
    });

    await assessment.save();

    // Update course with assessment reference
    await Course.findByIdAndUpdate(courseId, {
      assessment: assessment._id
    });

    res.status(201).json({
      success: true,
      message: 'Assessment created successfully',
      data: assessment
    });
  } catch (error) {
    console.error('Error creating assessment:', error);
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Create a new assessment (existing method - keep it)
export const createAssessment = async (req, res) => {
  try {
    const assessment = new Assessment({
      ...req.body,
      createdBy: req.user._id
    });
    await assessment.save();
    
    // Update course with assessment reference
    if (req.body.courseId) {
      await Course.findByIdAndUpdate(req.body.courseId, {
        assessment: assessment._id
      });
    }
    
    res.status(201).json({
      success: true,
      data: assessment
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Get all assessments for a course
export const getAssessmentsByCourse = async (req, res) => {
  try {
    const assessments = await Assessment.find({ 
      courseId: req.params.courseId,
      isActive: true 
    }).populate('createdBy', 'name email');
    
    res.json({
      success: true,
      count: assessments.length,
      data: assessments
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get a single assessment by ID
export const getAssessmentById = async (req, res) => {
  try {
    const assessment = await Assessment.findById(req.params.id)
      .populate('createdBy', 'name email');
    
    if (!assessment) {
      return res.status(404).json({
        success: false,
        message: 'Assessment not found'
      });
    }
    
    res.json({
      success: true,
      data: assessment
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Update an assessment
export const updateAssessment = async (req, res) => {
  try {
    const assessment = await Assessment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!assessment) {
      return res.status(404).json({
        success: false,
        message: 'Assessment not found'
      });
    }
    
    res.json({
      success: true,
      data: assessment
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Delete an assessment (soft delete)
export const deleteAssessment = async (req, res) => {
  try {
    const assessment = await Assessment.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );
    
    if (!assessment) {
      return res.status(404).json({
        success: false,
        message: 'Assessment not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Assessment deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const checkUserSubmission = async (req, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.user._id;

    const submission = await Submission.findOne({ 
      userId, 
      courseId 
    });

    if (!submission) {
      return res.json({
        success: true,
        hasSubmission: false,
        data: null
      });
    }

    res.json({
      success: true,
      hasSubmission: true,
      data: {
        score: submission.score,
        percentage: submission.percentage,
        status: submission.status,
        submittedAt: submission.createdAt,
        totalQuestions: submission.totalQuestions,
        correctAnswers: submission.correctAnswers
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Submit assessment and calculate score
export const submitAssessment = async (req, res) => {
  try {
    const { courseId, assessmentId, answers, score, percentage, totalQuestions, status } = req.body;
    const userId = req.user._id;

    // Check if already submitted
    const existingSubmission = await Submission.findOne({ userId, courseId });
    if (existingSubmission) {
      return res.status(400).json({
        success: false,
        message: 'You have already taken this assessment'
      });
    }

   const assessment = await Assessment.findOne({ courseId, isActive: true });
    if (!assessment) {
      return res.status(404).json({
        success: false,
        message: 'Assessment not found'
      });
    }

    // Create submission
    const submission = new Submission({
      userId,
      courseId,
      assessmentId: assessment._id,
      answers,
      score,
      totalMarks: score * 2,
      percentage,
      status,
      totalQuestions,
      correctAnswers: score
    });

    await submission.save();

    res.json({
      success: true,
      message: 'Assessment submitted successfully',
      data: {
        score,
        percentage,
        status
      }
    });
  } catch (error) {
    console.error('Submit assessment error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};