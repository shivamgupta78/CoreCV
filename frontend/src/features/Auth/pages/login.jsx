import "../../Auth/form.scss";
import { useState } from "react";
import {useNavigate, Link } from 'react-router';
import { useAuth } from "../hooks/useAuth.js";
import FullLoader from '../components/FullLoader.jsx';


const Login = () => {
    const navigate = useNavigate();

    const { loading,handleLogin } = useAuth();
    const [email ,setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try { 
            await handleLogin({email,password});
            navigate("/dashbaord");
        } catch(err){
            console.error(err);
        }
    }
    if (loading) {
  return <FullLoader />;
}
   

    return (
        <>
        <main>
            <div className="form-container">
                <h1>Login</h1>
                <form onSubmit={handleSubmit}>
                    
                    <div className="input-group">
                    <label htmlFor="email">Email</label>
                    <input onChange={(e)=> {setEmail(e.target.value)}}  type="email" id="email" placeholder="Email" />
                    </div>
                    <div className="input-group">
                    <label htmlFor="password">Password</label>
                    <input onChange={(e)=> {setPassword(e.target.value)}} type="password" id="password" placeholder="Password" />
                    </div>
                    <button  className="button primary-button"type="submit">Login</button>
                </form>
                 <p>Do not have an account? <Link to="/signup">Sign Up</Link></p>
            </div>
        </main>
        </>
    )
}

export default Login