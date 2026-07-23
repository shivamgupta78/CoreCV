const { mongoose } = require('mongoose');
const {Schema} = mongoose;

const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        minLength:3,
        maxLength:20
    },
    lastName:{
        type:String,
        minLength:3,
        maxLength:20
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        immutable:true,
    },
    age:{
        type:Number,
        min:6,
        max:80,
    },
    role:{
        type:String,
        enum:["admin","user"],
        default:"user"
    },    
    password:{
        type:String,
        required:true,
    }

},{
    timestamps:true
})

const User = mongoose.model("User", userSchema);

module.exports = User;