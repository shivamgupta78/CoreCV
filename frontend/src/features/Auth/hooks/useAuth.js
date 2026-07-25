import { useContext, useEffect } from "react";
import { AuthContext } from "../auth.context";
import { register, login , logout,getProfile } from "../services/auth.api";


export const useAuth = () => {
    const context = useContext(AuthContext);
    
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    const { user,setuser,loading,setloading} = context
    
    
    const handleLogin = async({email,password}) => {
        setloading(true)
        try {
            const response = await login({email,password})
            if(response && response.token){
                localStorage.setItem('token',response.token)
            }
            setuser(response?.user || response);
        } catch (error) {
            throw new Error("Error logging in:" + error.message);
        } finally{
            setloading(false)
        }
    }
    
    const handleRegister = async({firstName,email,password}) => {
        setloading(true)
        try {
            const response = await register({firstName,email,password})
            if(response && response.token){
                localStorage.setItem('token',response.token);
            }
            setuser(response.data)
        } catch (error) {
            throw new Error("Error registering:" + error.message);
        } finally{
            setloading(false)
        }
    }
    
    const handleLogout = async() => {
        setloading(true)
        try {
            await logout()
            localStorage.removeItem('token')
            setuser(null)
        } catch (error) {
            throw new Error("Error logging out:" + error.message);
        } finally {
            setloading(false)
        }
        

    }

    return { user,loading,handleLogin,handleRegister,handleLogout}

}