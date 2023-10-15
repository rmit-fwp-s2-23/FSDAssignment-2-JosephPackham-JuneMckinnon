import React from "react";
import '../css/signinup.css';
import { useNavigate } from "react-router";
import { useState } from "react";
import { findUserByEmail, verifyUser } from "../data/repository";

// Define the SignIn component
const SignIn = (props) => {
    const navigate = useNavigate(); //used to navigate to different pages

    // Define the handleSubmit function
    const handleSubmit = async (e) => {
        e.preventDefault(); //prevents page from refreshing
        const uservalues = { //create user object with email and password
            email: e.target[0].value,
            password: e.target[1].value
        }

        const user = await verifyUser(uservalues.email, uservalues.password); //verify user details
        console.log(user);

        //log user in if user details are correct
        if (user !== null) {
            localStorage.setItem('loggedUser', JSON.stringify(user)) //set loggedUser in local storage to logged in user
            props.setUser({name: user.name, email: user.email, password: user.password }); //set user state to logged in user
            alert('Logged in successfully! Welcome back ' + user.name)
            navigate('/'); //navigate to landing page
        } else {
            document.getElementById('error').innerText = "Email or Password is incorrect";
        }
    }

    // Define the SignIn component's return statement
    return (
        <div className="page">
            <div className = "content">
                <div className = "background">
                    <div data-testid = "Heading" id = "header">
                        Good to see you again!
                    </div>
                    <form onSubmit={e => handleSubmit(e)}>
                        <div>
                            <input data-testid = "Email" className = "input" type = "email" id = "email" placeholder = "Email"></input>
                        </div>
                        <div>
                            <input data-testid = "Password" className = "input" type = "password" id = "password" placeholder = "Password"></input>
                        </div>
                        <div className = "flex-center">
                            <button data-testid = "SignIn" className = "button" id = "signin" type = "submit">Sign In</button>
                        </div>
                        <div id = {'error'}></div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignIn;

