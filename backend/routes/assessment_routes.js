import express from 'express';
const router = express.Router();
import * as assessmentController from '../controllers/assessment_controller.js';
import authorize from '../middlewares/auth_middleware.js';

// ✅ CORRECTED VERSION - All specific routes before wildcards
router.post('/', authorize, assessmentController.createAssessment);
router.post('/upload-json', authorize, assessmentController.createAssessmentFromJSON);
router.post('/submit', authorize, assessmentController.submitAssessment);

// ✅ Protected GET routes
router.get('/submission/:courseId', authorize, assessmentController.checkUserSubmission);
router.get('/course/:courseId', authorize, assessmentController.getAssessmentsByCourse); // ✅ ONE DECLARATION ONLY

// ✅ Protected update/delete routes
router.put('/:id', authorize, assessmentController.updateAssessment);
router.delete('/:id', authorize, assessmentController.deleteAssessment);

// ✅ Generic /:id route LAST
router.get('/:id', assessmentController.getAssessmentById);

export default router;