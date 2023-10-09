import React from "react";
import '../css/signinup.css';
import { useNavigate } from "react-router";



const SignIn = (props) => {
    const navigate = useNavigate(); //used to navigate to different pages

    const handleSubmit = (e) => {
        e.preventDefault(); //prevents page from refreshing
        const user = { //create user object with email and password
            email: e.target[0].value,
            password: e.target[1].value

        }
        //generate all the users that have already signed up
        const users = JSON.parse(localStorage.getItem('users'))
        if (users !== null) {
            //loop through array of users to check if users details are correct, then log in
            for (let i = 0; i < users.length; i++){
                if (user.email === users[i].email && user.password === users[i].password){ //if user email and password match a user in the array
                    localStorage.setItem('loggedUser', JSON.stringify(users[i])) //set loggedUser in local storage to logged in user
                    props.setUser({name: users[i].name, email: users[i].email, password: users[i].password }); //set user state to logged in user
                    alert('Logged in successfully! Welcome back ' + users[i].name)
                    navigate('/userprofile'); //navigate to landing page
                    break;

                //if user email and password don't match a user in the array
                } else {
                    document.getElementById('error').innerText = "Email or Password is incorrect";
                }   
            }
        }

    }



    //return sign in page

    return (
        <div className="page">
            <div className = "content">
                <div className = "background">
                    <div id = "header">
                        Good to see you again!
                    </div>
                    <form onSubmit={e => handleSubmit(e)}>
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

export default SignIn;

/* 

<div>
    <h1 className="heading">S</h1>
</div>
<form onSubmit={e => handleSubmit(e)}>
<div>
    <input className="input" type = 'email' id="email" placeholder="Email"></input>
</div>
<div>
    <input className="input" type = 'password' id = 'password' placeholder="Password"></input>
</div>
<div>
    <button className="button" id = 'signin' type="submit"> Sign In</button>
</div>
<div id = {'error'}></div>
</form>
    

*/