import { useNavigate, Link } from 'react-router';
import { useState } from 'react';
import "../../Auth/form.scss";
import { useAuth } from "../hooks/useAuth.js";
import FullLoader from '../components/FullLoader.jsx';

const Signup = () => {
    const navigate = useNavigate();
    const { loading, handleRegister } = useAuth();
    const [username,setUsername] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
     const handleSubmit = (e) => {
       e.preventDefault();
        try { 
            await handleRegister({username,email,password});
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
                <h1>Register</h1>
                <form onSubmit={handleSubmit}>
                    <div className="input-group"> 
                    <label htmlFor="username">Username</label>
                    <input onChange={(e)=> {setUsername(e.target.value)}} type="text" id="username" placeholder="Username" />
                    </div>
                    <div className="input-group">
                    <label htmlFor="email">Email</label>
                    <input onChange={(e)=> {setEmail(e.target.value)}} type="email" id="email" placeholder="Email" />
                    </div>
                    <div className="input-group">
                    <label htmlFor="password">Password</label>
                    <input onChange={(e)=> {setPassword(e.target.value)}} type="password" id="password" placeholder="Password" />
                    </div>
                    <button  className="button primary-button"type="submit" onSubmit={handleSubmit}>Register</button>
                </form>

                <p>Already have an account? <Link to="/login">Login</Link></p>
            </div>
        </main>
        </>
    )
}

export default Signup