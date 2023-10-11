import React from 'react'; //import react to use react components
import "../css/login.css";

const Login = () => {
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
                    <button className = "login-button">Login</button>
                </div>
            </div>
        </div>
    );
}

export default Login;