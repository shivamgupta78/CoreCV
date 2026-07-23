import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router";


const GuestRoute = ({children}) => {
    const { loading,user} = useAuth();
    if(loading){
        return <div>Loading....</div>
    }

    if(user){
        return <Navigate to="/dashboard" replace />
    }
    return children;
}


export default GuestRoute;