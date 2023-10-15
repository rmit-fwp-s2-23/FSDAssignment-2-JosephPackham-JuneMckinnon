// imports
import React, { useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { loginUser } from '../data/repository';
import "../css/login.css";
import { LoginContext } from '../App.js';

const Login = () => {
    // retrieve reducer from context
    const { state, dispatcher } = useContext(LoginContext);

    // when email input is changed update state
    const emailHandler = (e) => {
        dispatcher({ type: 'EMAIL', payload: e.target.value });
        console.log(e.target.value)
    };
    
    // when password input is changed update state
    const passwordHandler = (e) => {
        dispatcher({ type: 'PASSWORD', payload: e.target.value });
    };
    
    // attempt to login when button is pressed
    const navigate = useNavigate();
    const submitHandler = async (e) => {
        e.preventDefault(); // prevent page from reloading

        dispatcher({ type: 'IS_LOADING' }); // set status to loading
        const loginData = await loginUser(state.email, state.password); // attempt login

        // test if login was successful
        if (loginData.success === true) { 
            // change states and navigate to home
            dispatcher({ type: 'IS_NOT_LOADING' });
            dispatcher({ type: 'LOGGED_IN' });
            navigate('/home');
        } else {
            // alert the user of an error
            dispatcher({ type: 'ERROR' });
            alert("login failed: " + loginData.message);
        }
    };

    return (
        <div className = "login-bkg">
            <div className = "login-form">
                <div id = "login-title">Admin Login</div>
                <input id = "login-email" className = "login-input" placeholder="Username" required onChange = {emailHandler}></input>
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