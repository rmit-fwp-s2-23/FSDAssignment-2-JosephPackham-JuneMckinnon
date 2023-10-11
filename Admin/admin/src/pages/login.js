import React from 'react';
import { useNavigate } from "react-router-dom";
import "../css/login.css";

const Login = () => {

    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/home')
    }

    return (
        <div className = "login-bkg">
            <div className = "login-form">
                <div id = "login-title">Admin Login</div>
                <input id = "login-username" className = "login-input" placeholder="Username"></input>
                <input id = "login-password" className = "login-input" placeholder="Password"></input>
                <div className = "flex-between">
                    <div>
                        <input id = "remember-me" type = "checkbox"></input>
                        <label for = "remember-me">Remember Me</label>
                    </div>
                    <button className = "login-button" onClick = {handleClick}>Login</button>
                </div>
            </div>
        </div>
    );
}

export default Login;