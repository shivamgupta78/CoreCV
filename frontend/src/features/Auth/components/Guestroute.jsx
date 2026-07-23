import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router";
import FullLoader from '../components/FullLoader.jsx';



const GuestRoute = ({children}) => {
    const { loading,user} = useAuth();
    if (loading) {
        return <FullLoader />;
        }
   

    if(user){
        return <Navigate to="/dashboard" replace />
    }
    return children;
}


export default GuestRoute;