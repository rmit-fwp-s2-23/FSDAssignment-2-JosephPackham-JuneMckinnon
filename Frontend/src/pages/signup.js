import React from "react";
import '../css/signinup.css'
import { useNavigate } from "react-router";

// TODO: add in validation for strong password - just need to do special characters, password already has validation for length and number


const SignUp = (props) => {

    const navigate = useNavigate(); //used to navigate to different pages
    let error;


    const validation = (user) => {

        let users = JSON.parse(localStorage.getItem('users')); //get all registered users from local storage
        for(let i = 0; i < users.length; i++){ //loop through all registered users
            if(user.email === users[i].email){ //if email is already registered
                return 'Email is already in use';
            }
        }

        
        if(user.password.length < 8){ //if password is less than 8 characters
            console.log(user.password);
            return 'Password must be at least 8 characters long';

        }
        else if(user.password.search(/[0-9]/i) < 0){ //if password does not contain a number
            return 'Password must contain at least one number';
        }else if(user.password.search(/[!@#$%^&*]/i) < 0){ //if password does not contain a special character
            return 'Password must contain at least one special character';
        }
        
    };

    const handleSubmit = (e) => {  //when form is submitted, run handleSubmit function
        e.preventDefault(); //prevents page from refreshing
        let date = new Date(); //defined here so i can use the .tolocaledatesting function later
        const user = { //create user object with name, email, password and date joined
            name: e.target[0].value,
            email:  e.target[1].value,
            password: e.target[2].value,
            joined: date.toLocaleDateString(),//instead of getting the whole date, only use d/m/y

        }

        error = validation(user); //validate user data

        if(error){ //if there is an error, display error message
            console.log(error);
            let errormsg = document.getElementById('error');
            errormsg.innerHTML = error;
            return;
        }
        else{
            let registered = JSON.parse(localStorage.getItem('users')); //get all registered users from local storage
            if(registered=== null){ //if there are no registered users, create an empty array
                registered = []
            };

            registered.push(user); //add new user to array of registered users
            localStorage.setItem('users', JSON.stringify(registered)); //set local storage to new array of registered users
            localStorage.setItem('loggedUser' , JSON.stringify(user)); //set loggedUser in local storage to new user
            props.setUser({name: user.name, password: user.password, email: user.email, joined: user.joined }); //set user state to new user
            navigate('/'); //navigate to landing page
            alert('Account created successfully!'); //alert user that account was created
            
        };


    }



    //return sign up page
    return (
        <div className="page">
            <div className = "content">
                <div className = "background">
                    <div id = "header">
                        Welcome to Loop Cinemas!
                    </div>
                    <form onSubmit={e => handleSubmit(e)}>
                        <div>
                            <input className = "input" type = "name" id = "name" placeholder = "Name"></input>
                        </div>
                        <div>
                            <input className = "input" type = "email" id = "email" placeholder = "Email"></input>
                        </div>
                        <div>
                            <input className = "input" type = "password" id = "password" placeholder = "Password"></input>
                        </div>
                        <div className = "flex-center">
                            <button className = "button" id = "signin" type = "submit">Sign In</button>
                        </div>
                        <div id = {'error'}></div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignUp;