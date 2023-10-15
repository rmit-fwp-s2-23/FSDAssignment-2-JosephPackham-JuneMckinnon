import React, { useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { loginUser } from '../data/repository';
import "../css/login.css";
import { LoginContext } from '../App.js';

const Login = () => {
    const { state, dispatcher } = useContext(LoginContext);

    const usernameHandler = (e) => {
        dispatcher({ type: 'USERNAME', payload: e.target.value });
    };
    
    const passwordHandler = (e) => {
        dispatcher({ type: 'PASSWORD', payload: e.target.value });
    };
    
    const navigate = useNavigate();
    const submitHandler = async (e) => {
        e.preventDefault();

        dispatcher({ type: 'IS_LOADING' });
        const loginData = await loginUser(state.username, state.password);

        if (loginData.success === true) {
            dispatcher({ type: 'IS_NOT_LOADING' });
            dispatcher({ type: 'LOGGED_IN' });
            navigate('/home');
        } else {
            dispatcher({ type: 'ERROR' });
            alert("login failed: " + loginData.message);
        }
    };

    return (
        <div className = "login-bkg">
            <div className = "login-form">
                <div id = "login-title">Admin Login</div>
                <input id = "login-email" className = "login-input" placeholder="Username" required onChange = {usernameHandler}></input>
                <input id = "login-password" className = "login-input" placeholder="Password" required onChange = {passwordHandler}></input>
                <div className = "flex-between">
                    <div>
                        <input id = "remember-me" type = "checkbox"></input>
                        <label htmlFor = "remember-me">Remember Me</label>
                    </div>
                    <button className = "login-button" onClick = {(e) => submitHandler(e)}>Login</button>
                </div>
            </div>
        </div>
    );
}

export default Login;