const User = require('../models/user'); 
const validator = require('../utils/validation.js'); 
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const redisClient = require('../config/redis.js');

/** 
 * @route /auth/register
 * @name register 
 * @description Register a new user, firstName, email and password are must
 * @access public 
 * 
 */

const register = async (req,res)=>{
    try{
        const {firstName,email,password} = req.body;
        await validator(req.body);
        req.body.password = await bcrypt.hash(password,10);

        const user = await User.create(req.body);

        const token = jwt.sign({_id:user._id,email:user.email,role:'user'}, process.env.JWT_SECRET, {expiresIn:3600});
           const reply = {
            firstName:user.firstName,
            email:user.email,
            _id:user._id,
            role:user.role
        }

   res.cookie("token",token,{httpOnly:true, secure:true, sameSite:"strict"});

        res.status(201).json({
            message:"User created successfully", 
            user:reply,
            token:token
        });

    } catch(err){

            res.status(400).json({message:"Error creating user", err: err.message});
    }
}

/** 
 * @route /auth/login
 * @name login 
 * @description Login an existing user,email and password are must
 * @access public 
 * 
 */

const login = async (req,res)=>{
    try{
        const {email,password} = req.body;
        if(!email || !password){
          throw new Error("Email and password are required");
        }
        const user = await User.findOne({email});
        if(!user){
            throw new Error("User not found");
        }
        const match = await bcrypt.compare(password, user.password);
        if(!match){
            throw new Error("Invalid Credentials");
        }

        const reply = {
            firstName:user.firstName,
            email:user.email,
            _id:user._id,
            role:user.role
        }
        const token = jwt.sign({_id:user._id,email:email, role:user.role}, process.env.JWT_SECRET, {expiresIn:"1h"});
        res.cookie("token",token,{httpOnly:true, secure:true, sameSite:"strict"});
        res.status(200).json({
            user:reply,
            token:token,
            message:"user logged in successfully"
        })
    } catch(err){
         res.status(400).json({message:"Error logging user", err: err.message});
    }
}

/** 
 * @route /auth/logout
 * @name logout 
 * @description Logout an existing user
 * @access public 
 * 
 */

const logout = async (req,res) => {
    try{
        const authHeader = req.headers.authorization;
        const token = authHeader?.startsWith("Bearer ") ? authHeader.split(" ")[1] : null;
        if(!token){
            throw new Error("No token found");
        }

        const payload = jwt.decode(token);
        if(!payload){
            throw new Error("Invalid token");
        }

        await redisClient.set(`token:${token}`,"blocked");
        await redisClient.expireAt(`token:${token}`,payload.exp);
        res.cookie("token",null,new Date(Date.now()));
        res.status(200).json({message:"Logged out successfully"});
        
    } catch (err){
        res.status(500).json({message:"Error logging out", err: err.message});

    }
}

/** 
 * @route /auth/profile
 * @name getProfile 
 * @description Get the profile of the logged-in user
 * @access public 
 * 
 */


const getProfile = async (req,res) => {
    try{
        const user = await User.findById(req.user._id);
        if(!user){
            return res.status(404).json({message:"User not found"});
        }
       

    res.status(200).json({
        message: "User details fetched successfully",
        user: {
            id: user._id,
            username: user.firstName,
            email: user.email,
            role:user.role
        }
    })
    }
     catch(err){
        res.status(500).json({message:"Error getting user profile", err: err.message});
    }

}



module.exports = {register, login,logout,getProfile};