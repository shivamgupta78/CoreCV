import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router";
import React from 'react';
import FullLoader from '../components/FullLoader';



const Protected = ({children}) => {
  const { loading, user } = useAuth();

if (loading) {
  return <FullLoader />;
}
  
  if(!user){
    return <Navigate to="/login"  replace />
  }
  
  return children;

}

export default Protected;