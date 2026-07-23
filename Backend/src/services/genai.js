const { GoogleGenAI, Type } = require('@google/genai');
const { z } = require("zod")
const { zodToJsonSchema } = require("zod-to-json-schema")
const puppeteer = require('puppeteer-core');

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

const interviewReportSchema = {
    type: Type.OBJECT,
    properties: {
        matchScore: {
            type: Type.INTEGER,
            description: "A Score between 0 to 100 indicating how well the candidate's profile matches the job description"
        },
        title: {
            type: Type.STRING,
            description: "A Title of the job for which the interview report generated"
        },
        technicalQuestions: {
            type: Type.ARRAY,
            description: "Technical questions that can be asked by the interviewer",
            items: {
                type: Type.OBJECT,
                properties: {
                    questions: { type: Type.STRING, description: "The technical questions can be asked in the interview" },
                    intention: { type: Type.STRING, description: "The intention of interviewer behind asking this questions" },
                    answer: { type: Type.STRING, description: "How to answer this question, what points to cover, what approach to follow" }
                },
                required: ["questions", "intention", "answer"]
            }
        },
        behavioralQuestions: {
            type: Type.ARRAY,
            description: "Behavioral questions that can be asked by the interviewer",
            items: {
                type: Type.OBJECT,
                properties: {
                    questions: { type: Type.STRING, description: "The behavioral questions can be asked in the interview" },
                    intention: { type: Type.STRING, description: "The intention of interviewer behind asking this questions" },
                    answer: { type: Type.STRING, description: "How to answer this question, what points to cover, what approach to follow" }
                },
                required: ["questions", "intention", "answer"]
            }
        },
        skillGaps: {
            type: Type.ARRAY,
            description: "List of skills gaps along with their severity",
            items: {
                type: Type.OBJECT,
                properties: {
                    skills: { type: Type.STRING, description: "The skills which the candidate is lacking" },
                    severity: { 
                        type: Type.STRING, 
                        enum: ["low", "medium", "high"],
                        description: "The severity of the skill gap" 
                    }
                },
                required: ["skills", "severity"]
            }
        },
        preparationPlan: {
            type: Type.ARRAY,
            description: "A structured day-wise preparation plan for the candidate to follow",
            items: {
                type: Type.OBJECT,
                properties: {
                    day: { type: Type.INTEGER, description: "The day number in the preparation schedule, starting from 1" },
                    focusArea: { type: Type.STRING, description: "The primary architectural layer or concept" },
                    tasks: { 
                        type: Type.ARRAY, 
                        items: { type: Type.STRING },
                        description: "A list of specific tasks or exercises to be completed on this day" 
                    }
                },
                required: ["day", "focusArea", "tasks"]
            }
        }
    },
    required: ["matchScore","title" ,"technicalQuestions", "behavioralQuestions", "skillGaps", "preparationPlan"]
};

async function generatedInterviewReport({ resume, selfDescription, jobDescription }) {
    const prompt = `Generate an interview report for a candidate with the following details:
                    Resume: ${resume}
                    self Description: ${selfDescription}
                    job Description: ${jobDescription}`;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: interviewReportSchema, 
            }
        });
        return JSON.parse(response.text);
    } catch (error) {
        console.error("API Error:", error);
        return { error: "Failed to generate interview report" };
    }
}


async function generatePdfFromHtml(htmlContent) {
  if (!htmlContent) {
        throw new Error("HTML content is missing for PDF generation!");
    }

    const isProduction = process.env.NODE_ENV === 'production' || process.env.RENDER;

    let browser;

    if (isProduction) {
        browser = await puppeteer.launch({
            args: chromium.args,
            defaultViewport: chromium.defaultViewport,
            executablePath: await chromium.executablePath(),
            headless: chromium.headless,
        });
    } else {
        browser = await puppeteer.launch({
            headless: "new",
            executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });
    }
    const page = await browser.newPage();
    const strictOnePageStyle = `
        <style>
            @page {
                size: A4 portrait;
                margin: 8mm 10mm; /* Reduced margins */
            }
            html, body {
                height: 100%;
                overflow: hidden;
                box-sizing: border-box;
                font-size: 11px; /* Small readable font */
            }
            * {
                box-sizing: border-box;
                page-break-inside: avoid !important;
            }
        </style>
    `;
    const fullHtml = htmlContent.includes("<html>") 
        ? htmlContent 
        : `<!DOCTYPE html><html><head><meta charset="UTF-8"><style>body{font-family:sans-serif;padding:20px;}</style></head><body>${htmlContent}</body></html>`;

    await page.setContent(fullHtml, { waitUntil: ["domcontentloaded", "networkidle0"] });
    const pdfBuffer = await page.pdf({
        format: "A4", 
        printBackground:true,
        margin: {
            top: "20mm",
            bottom: "20mm",
            left: "15mm",
            right: "15mm"
        }
    })

    await browser.close()

    return pdfBuffer
}

async function generateResumePdf({ resume, selfDescription, jobDescription }) {
    try{
    const resumePdfSchema = z.object({
        html: z.string().describe("The HTML content of the resume which can be converted to PDF using any library like puppeteer")
    })

    const prompt = `Generate resume for a candidate with the following details:
                        Resume: ${resume}
                        Self Description: ${selfDescription}
                        Job Description: ${jobDescription}

            STRICT FORMATTING REQUIREMENTS FOR PDF PRINTING:
            1. MUST FIT EXACTLY ON A SINGLE A4 PAGE. Do NOT let content spill over to page 2.
            2. Keep margins compact, paddings small, font sizes between 10px-12px, and line-height tight.
            3. Use CSS Flexbox/Grid efficiently (e.g., two-column layout for skills & experience).
            4. Do not write long paragraphs; use concise, high-impact bullet points for experience.
            5. Return valid JSON with a single field "html" containing the complete HTML structure with embedded <style> tags.
                        `
                        
                        const response = await ai.models.generateContent({
                            model: "gemini-2.5-flash",
                            contents: prompt,
                            config: {
                                responseMimeType: "application/json",
                                responseSchema: zodToJsonSchema(resumePdfSchema),
                            }
    })
    
    const responseText = typeof response.text === 'function' ? response.text() : response.text;
    const jsonContent = JSON.parse(responseText)
    if(!jsonContent || !jsonContent.html){
        throw new Error("Gemini failed to generate HTML content");
    }
    
    const pdfBuffer = await generatePdfFromHtml(jsonContent.html)
    
    return pdfBuffer
}catch(error){
    console.error("Error in generateResumePdf:", error.message);
    throw error;
}

}



module.exports = {
    generatedInterviewReport,
    generateResumePdf
};


