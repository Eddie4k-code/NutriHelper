import React, { HTMLAttributes, useState } from 'react';
import useRegister from '../hooks/useRegister';
import { useNavigate } from 'react-router-dom';

/* Page where users will register to the site */

const Register = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const navigate = useNavigate();

    //Custom register hook
    const { register, isLoading, error } = useRegister();

    
    const handleRegister = async (e: React.MouseEvent<HTMLButtonElement>) => {
        await register(email, password, () => navigate('/'));
    }
    


    return (
        <div className="register-container">
            <h1>Start Searching for Recipes Now!</h1>
            <div className="form-container">
                <input onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email" className="input-field" />
                <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" className="input-field" />
                <button onClick={handleRegister} className="login-button">Register</button>
            </div>

            {error && <h1 className="error-msg">{error}</h1>}
        </div>
    );
};

export default Register;
