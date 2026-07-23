const express = require('express');
const authUser = require('../middlewares/authMiddlewares.js')
const reportGenController = require('../controllers/interview.controller')
const interviewRouter = express.Router();
const upload = require('../middlewares/fileMiddleware');
const interviewController = require('../controllers/interview.controller')

/**
 * @route POST /interview
 * @description generate new interview report on the basis of user self description,resume pdf and job description
 * @access private
 */

interviewRouter.post("/",authUser,upload.single("resume"),interviewController.reportGenController);

/**
 * @route GET /interview/report/:interviewId
 * @description get interview report by interviewId
 * @access private
 */

interviewRouter.get("/report/:interviewId",authUser,interviewController.getInterviewReportById)

/**
 * @route GET /interview/
 * @description get all interview reports of logged in user
 * @access private
 */

interviewRouter.get("/",authUser,interviewController.getAllInterview)

/**
 * @route GET /interview/resume/pdf
 * @description generate resume pdf on the basis of user self description, resume content and job description.
 * @access private
 */
interviewRouter.post("/resume/pdf/:interviewReportId", authUser, interviewController.generateResumePdfController)


module.exports = interviewRouter;