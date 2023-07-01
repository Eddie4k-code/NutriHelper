import React, { HTMLAttributes, useState } from 'react';
import useLogin from '../hooks/useLogin';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';


/* Page where users will register to the site */

const Login = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const navigate = useNavigate();
    const {authContextLogin} = useAuthContext();

    //Custom register hook
    const { login, isLoading, error } = useLogin();

    //Handles log in submission.
    const handleLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {

        //Make Request to backend
        await login(email, password, (data) => {   

            //Pass data into auth context
            authContextLogin(data.id, email);
            navigate('/');
            
        });
    }
    


    return (
        <div className="register-container">
            <h1>Welcome Back!</h1>
            <div className="form-container">
                <input onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email" className="input-field" />
                <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" className="input-field" />
                <button onClick={handleLogin} className="login-button">Login</button>
            </div>

            {error && <h1 className="error-msg">{error}</h1>}
        </div>
    );
};

export default Login;
