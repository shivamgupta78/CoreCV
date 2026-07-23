const express = require('express');
const app = express();
const cookiesparser = require('cookie-parser');
const authRouter = require('./routes/auth.js');
const interviewRouter = require('./routes/interview.js');
const cors = require('cors');

app.use(cors({
    origin: "core-cv.vercel.app", 
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept']
}));

// Health Check Route (Isse browser mein "Cannot GET /" nahi aayega)
app.get('/', (req, res) => {
    res.status(200).send("CoreCV Backend is live and running! 🚀");
});

app.use(express.json());
app.use(cookiesparser());

/**
 * @description Routes for backend
 */
app.use('/auth', authRouter);
app.use('/interview',interviewRouter);


module.exports = app;