import axiosClient from "../../../utils/axiosClients";

/**
 * 
 * @description Service to generate interview report based on user self description, resume and job Desciption
 */

export const generateInterviewReport = async ({jobDescription,selfDescription,resumeFile}) => {
    const formData = new FormData()
    formData.append("jobDescription",jobDescription)
    formData.append("selfDescription",selfDescription)
    if(resumeFile){
        formData.append("resume",resumeFile);
    }

    const response = await axiosClient.post("/interview/",formData,{
        headers:{
            "Content-Type": "multipart/form-data"
        }
    })
    return response.data;
}

/**
 * 
 * @description Service to get interview report via interview id
 */

export const getInterviewReportById = async (interviewId) =>{
    const response = await axiosClient.get(`/interview/report/${interviewId}`)
    return response.data
}

/**
 * 
 * @description Service to get all the interview reports of  a specific user
 */

export const getAllInterview = async () => {
    const response = await axiosClient.get("/interview/")

    return response.data
}

/**
 * @description Service to generate resume pdf based on user self description, resume content and job description.
 */
export const generateResumePdf = async ({ interviewReportId }) => {
    const response = await axiosClient.post(`/interview/resume/pdf/${interviewReportId}`,{} , {
        responseType: "blob"
    })

    return response.data
}