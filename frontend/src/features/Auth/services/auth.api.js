import axiosClient from "../../../utils/axiosClients.js"



/** 
 * @name register 
 * @description Register a new user, firstName, email and password are must
 * @access public 
 * 
 */

export async function register({firstName,email,password}){
    try{
        const response = await axiosClient.post('/auth/register',{
                firstName,email,password
            })
        if(response.data && response.data.token){
                localStorage.setItem('token', response.data.token);
    }
    return response.data;
    }catch(err){
        throw new Error("Error registering:" + err.message);
    }
}


/** 
 * @name login 
 * @description Login an existing user,email and password are must
 * @access public 
 * 
 */

export async function login({email,password}){
    try{
        const response = await axiosClient.post('/auth/login',{
                email,password
            })
        if(response.data && response.data.token){
                localStorage.setItem('token', response.data.token);
            }
        return response.data;
    }catch(err){
        throw new Error("Error logging in:" + err.message);
    }
}

/** 
 * @name logout 
 * @description Logout an existing user
 * @access public 
 * 
 */


export async function logout(){
    try{
        const response = await axiosClient.post('/auth/logout',{
            })
        localStorage.removeItem('token');
        return response.data;
    }catch(err){
        throw new Error("Error logging out:" + err.message);
    }
}

/** 
 * @name getProfile 
 * @description Get the profile of the logged-in user
 * @access public 
 * 
 */



export async function getProfile(){
    try{
        const response = await axiosClient.get('/auth/profile')
    // try{
    //     const response = await axiosClient.get('/auth/profile')
        return response.data;
    }catch(err){
        throw new Error("getProfile mein error hai",err.message);
    }
}


