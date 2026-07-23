const express = require('express');
const app = express();
const cookiesparser = require('cookie-parser');
const authRouter = require('./routes/auth.js');
const interviewRouter = require('./routes/interview.js');
const cors = require('cors');

app.use(cors({
    origin: "true", 
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept']
}));

app.use(express.json());
app.use(cookiesparser());

/**
 * @description Routes for backend
 */
app.use('/auth', authRouter);
app.use('/interview',interviewRouter);


module.exports = app;