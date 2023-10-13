import React, { useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { loginUser } from '../data/repository';
import "../css/login.css";
import { LoginContext } from '../App.js';

const Login = () => {
    const { setLoggedIn } = useContext(LoginContext);

    const navigate = useNavigate();
    const handleLogin = async () => {
        const email = document.getElementById("login-email").value;
        const password = document.getElementById("login-password").value;
        if (email === "" || password === "") {
            alert("make sure you enter a username and password")
            return;
        }

        const loginData = await loginUser(email, password);

        if (loginData.success === true) {
            setLoggedIn(true);
            navigate('/home');
        } else {
            alert("login failed: " + loginData.message);
        }
    }

    return (
        <div className = "login-bkg">
            <div className = "login-form">
                <div id = "login-title">Admin Login</div>
                <input id = "login-email" className = "login-input" placeholder="Username" required></input>
                <input id = "login-password" className = "login-input" placeholder="Password" required></input>
                <div className = "flex-between">
                    <div>
                        <input id = "remember-me" type = "checkbox"></input>
                        <label htmlFor = "remember-me">Remember Me</label>
                    </div>
                    <button className = "login-button" onClick = {handleLogin}>Login</button>
                </div>
            </div>
        </div>
    );
}

export default Login;