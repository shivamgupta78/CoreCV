const pdfParse = require('pdf-parse');
const {generatedInterviewReport,generateResumePdf} = require('../services/genai')
const interviewReportModel = require('../models/Report')

/**
 * @description controller to generate interview report based on user self description,resume and job description
 *  
 */

async function reportGenController(req, res) {
try{

    let resumeText = "";
        if (req.file && req.file.buffer) {
            const parsedPdf = await (new pdfParse.PDFParse(Uint8Array.from(req.file.buffer))).getText();
            resumeText = parsedPdf.text;
        }

    const { selfDescription, jobDescription } = req.body;
    const genaiReport = await generatedInterviewReport({resume:resumeText,selfDescription,jobDescription});
    const interviewReport = await interviewReportModel.create({
        user:req.user._id,
        resume:resumeText,
        selfDescription,
        jobDescription,
        ...genaiReport

    })

    res.status(201).json({
        message:"Interview Report generated successfully",
        interviewReport
    })
}catch(err){
        return console.error("there is a problem in reportgen controller function",err.message)
    }

}

/**
 * @description controller to fetch the interview report from the database
 */

async function getInterviewReportById(req,res) {
    const {interviewId} = req.params
    try{
        const interviewReport = await interviewReportModel.findOne({_id:interviewId,user:req.user._id})
        if(!interviewReport){
            return res.status(404).json({
                message:"Interview Report not found."
            })
        }

        res.status(200).json({
            message:"interview report fetched successfully",
            interviewReport
        })
    } catch(err){
        console.error("there is a problem with fetching",error.message)
        return res.status(500).json({message:"Failed to fetch reportsbyId",error: err.message})
    }

    
}

/**
 * @description Controller to get all interview reports of loggec in user
 */

async function getAllInterview(req,res){
try {

    const interviewReports = await interviewReportModel
        .find({user:req.user._id})
        .sort({createdAt: -1})
        .select("-resume -selfDescription -jobDescription -technicalQuestions -behavioralQuestions -skillGaps -preparationPlan");
    
    res.status(200).json({
        message:"interview reports fetched successfully",
        interviewReports
    })
} catch(err){
    console.error("Error in getAllInterview:", err);
    return res.status(500).json({message:"Failed to fetch reports",error: err.message})
}
}


/**
 * @description Controller to generate resume PDF based on user self description, resume and job description.
 */
async function generateResumePdfController(req, res) {
    try{
    const { interviewReportId } = req.params

    const interviewReport = await interviewReportModel.findById(interviewReportId)

    if (!interviewReport) {
        return res.status(404).json({
            message: "Interview report not found."
        })
    }

    const { resume, jobDescription, selfDescription } = interviewReport

    const pdfBuffer = await generateResumePdf({ resume, jobDescription, selfDescription })
    if (!pdfBuffer || pdfBuffer.length === 0) {
            return res.status(500).json({ message: "PDF generation returned empty buffer" });
        }

        // Set response headers properly
        res.setHeader("Content-Type", "application/pdf");
        res.setHeader("Content-Disposition", `attachment; filename=resume_${interviewReportId}.pdf`);
        res.setHeader("Content-Length", pdfBuffer.length);

        // Send binary buffer directly
        return res.end(pdfBuffer, 'binary');
        }catch(err){
            console.error("error generating resume pdf", err)
            return res.status(500).json({message:"Failed to generate PDF",error:err.message})
        }
   
}





module.exports = {reportGenController,getInterviewReportById,getAllInterview,generateResumePdfController}