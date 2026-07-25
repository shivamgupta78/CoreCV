import { useNavigate, Link } from 'react-router';
import { useState } from 'react';
import "../../Auth/form.scss";
import { useAuth } from "../hooks/useAuth.js";
import FullLoader from '../components/FullLoader.jsx';

const Signup = () => {
    const navigate = useNavigate();
    const { loading, handleRegister } = useAuth();
    const [firstName, setfirstName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // Real-time password rules checklist
    const validations = {
        length: password.length >= 8,
        uppercase: /[A-Z]/.test(password),
        lowercase: /[a-z]/.test(password),
        number: /[0-9]/.test(password),
        symbol: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password),
    };

    const isPasswordValid = Object.values(validations).every(Boolean);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isPasswordValid) {
            alert("Please fulfill all password criteria!");
            return;
        }

        try { 
            await handleRegister({ firstName, email, password });
            navigate("/dashboard");
        } catch(err) {
            console.error(err);
        }
    }

    if (loading) {
        return <FullLoader />;
    }

    return (
        <main>
            <div className="form-container">
                <h1>Register</h1>
                <form onSubmit={handleSubmit}>
                    <div className="input-group"> 
                        <label htmlFor="username">Username</label>
                        <input 
                            onChange={(e) => { setfirstName(e.target.value) }} 
                            type="text" 
                            id="username" 
                            placeholder="Username" 
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input 
                            onChange={(e) => { setEmail(e.target.value) }} 
                            type="email" 
                            id="email" 
                            placeholder="Email" 
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input 
                            onChange={(e) => { setPassword(e.target.value) }} 
                            type="password" 
                            id="password" 
                            placeholder="Password" 
                        />

                        {/* Real-time Validation Checklist */}
                        <div className="password-checklist">
                            <p className="checklist-title">Password Requirements:</p>
                            <ul>
                                <li className={validations.length ? 'valid' : 'invalid'}>
                                    {validations.length ? '✓' : '✗'} At least 8 characters
                                </li>
                                <li className={validations.uppercase ? 'valid' : 'invalid'}>
                                    {validations.uppercase ? '✓' : '✗'} At least one uppercase letter (A-Z)
                                </li>
                                <li className={validations.lowercase ? 'valid' : 'invalid'}>
                                    {validations.lowercase ? '✓' : '✗'} At least one lowercase letter (a-z)
                                </li>
                                <li className={validations.number ? 'valid' : 'invalid'}>
                                    {validations.number ? '✓' : '✗'} At least one number (0-9)
                                </li>
                                <li className={validations.symbol ? 'valid' : 'invalid'}>
                                    {validations.symbol ? '✓' : '✗'} At least one symbol (!@#$%^&*)
                                </li>
                            </ul>
                        </div>
                    </div>

                    <button 
                        className="button primary-button" 
                        type="submit"
                        disabled={!isPasswordValid}
                    >
                        Register
                    </button>
                </form>

                <p>Already have an account? <Link to="/login">Login</Link></p>
            </div>
        </main>
    );
};

export default Signup;