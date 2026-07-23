import { useState,Children, createContext,useEffect } from "react";
import { getProfile } from "./services/auth.api";




export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user,setuser] = useState(null);
    const [loading,setloading] = useState(true);
    useEffect(() => {
        const verifyUserToken = async () => {
            const token = localStorage.getItem('token');
            
            if (!token) {
                setuser(null);
                setloading(false);
                return;
            }

            try {
                const data = await getProfile();
               setuser(data?.user || data);
            } catch (err) {
                console.error("Session verification failed:", err.message);
                localStorage.removeItem('token'); 
                setuser(null);
            } finally {
                setloading(false);
            }
        };

        verifyUserToken();
    }, []);
    return (
        <AuthContext.Provider value={{user,setuser,loading,setloading}}>{children}</AuthContext.Provider>
    )
}