require("dotenv").config();
const connectDB = require("./src/config/db.js");
const app = require('./src/app.js');
const redisClient = require('./src/config/redis.js'); 

const startServer = async () => {
    try {
        await connectDB();

        await redisClient.connect();
        console.log("Redis Connected successfully to cloud! 🚀");

        app.listen(3000, () => {
            console.log("Server is running on port 3000");
        });
    } catch (err) {
        console.error("Failed to start server due to error:", err.message);
        process.exit(1); 
    }
};

startServer();