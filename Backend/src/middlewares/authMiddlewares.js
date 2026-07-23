const jwt = require('jsonwebtoken');
const redisClient = require('../config/redis.js');
const User = require('../models/user.js');

const authUser = async (req,res,next) => {
    try {
       const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(' ')[1];
        if(!token){
            return res.status(401).json({message:"Invalid token", err:"No token provided"})
        }

        //checking user in redis blocklist
        const isBlocked = await redisClient.exists(`token:${token}`);
        if(isBlocked){
            throw new Error("Token is blocked");
        }


        const payload = jwt.verify(token, process.env.JWT_SECRET,)
        const {_id} = payload;
        if(!_id){   
            throw new Error("Invalid token");
        }
       

        req.user = payload;
        next();

    }catch(err){
        res.status(401).json({message:"Invalid token", err: err.message});
    }
}

module.exports = authUser; 