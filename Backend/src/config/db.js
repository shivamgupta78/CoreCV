const mongoose = require('mongoose');
const dotenv = require('dotenv');

async function connectDB(){
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("server connected successfully");
} catch (error){
    console.error("Error connecting to MongoDB:", error.message);
}
}

module.exports = connectDB;