const { Router } = require('express');
const authUser = require('../middlewares/authMiddlewares.js');
const authRouter = Router();
const {register,login,logout,getProfile} = require('../controllers/userAuth.js');

authRouter.post("/register",register);
authRouter.post("/login",login);
authRouter.post("/logout",authUser,logout);
authRouter.get("/profile",authUser,getProfile);



/** 
 * @route /auth/check
 * @name check 
 * @description Check the authentication status of the user
 * @access public 
 * 
 */



module.exports = authRouter;