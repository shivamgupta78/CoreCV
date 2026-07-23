const mongoose = require('mongoose');

/**
 * --From user side--
 * Job report schema:string
 * resume text:string
 * self description:string
 * 
 * 
 * --from our side--
 * matchScore:number
 * technical questions:[]
 * Behavioral questions:[]
 * skills gaps:[]
 * preparation plan:[]
 */
const technicalQuestions = new mongoose.Schema({
    questions:{
        type:String,
        required:[true,"Technical questions is required"]
    },
    intention:{
        type:String,
        required:[true,"Intention is required"]
    },
    answer:{
        type:String,
        required:[true,"Answer is required"]
    }
},{
    _id: false
})

const behavioralQuestions = new mongoose.Schema({
     questions:{
        type:String,
        required:[true,"Technical questions is required"]
    },
    intention:{
        type:String,
        required:[true,"Intention is required"]
    },
    answer:{
        type:String,
        required:[true,"Answer is required"]
    }
},{
    _id: false

})

const skillGaps = new mongoose.Schema({
    skills:{
        type:String,
        required:[true,"Skills is required"]
    
    },
    severity:{
        type:String,
        enum:["low","medium","high"],
        required:[true,"Severity is required"]
    },

},{
    _id:false
})

const preparationPlan = new mongoose.Schema({
    day:{
        type:Number,
        required:[true,"Day is required"]
    },
    focusArea:{
        type:String,
        required:[true,"focusArea is required"]
    },
    tasks:[{
        type:String,
        required:[true,"Tasks are required "]
    }]
},{
    _id:false
})

const interviewReportSchema = new mongoose.Schema({
    jobDescription:{
        type:String,
        required:[true,"job Description is required"]
    },
    resume:{
        type:String,
    },
    selfDescription:{
        type:String,
    },
    matchScore:{
        type:Number,
        min:0,
        max:100
    },
    technicalQuestions:[technicalQuestions],
    behavioralQuestions:[behavioralQuestions],
    skillGaps:[skillGaps],
    preparationPlan:[preparationPlan],
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    title:{
        type:String,
        required:[true,"title is required"]
    }
},{
    timestamps:true
})


const interviewReportModel = mongoose.model("InterviewReport",interviewReportSchema);

module.exports = interviewReportModel;