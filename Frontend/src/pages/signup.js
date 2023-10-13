import React from "react";
import '../css/signinup.css'
import { useNavigate } from "react-router";
import { createUser, getAllUsers, findUser} from "../data/repository";


// TODO: add in validation for strong password - just need to do special characters, password already has validation for length and number


const SignUp = (props) => {

    const navigate = useNavigate(); //used to navigate to different pages
    let error;

    async function checkEmailAvailability(user) {
        try {
          const users = await getAllUsers();
          for (let i = 0; i < users.length; i++) {
            if (user.email === users[i].email) {
              return 'Email is already in use';
            }
          }
          return 'Email is available';
        } catch (error) {
          console.error(error);
          return 'Error checking email availability';
        }
      }


    const validation = async (user) => {

        const emailAvailability = await checkEmailAvailability(user);
        if (emailAvailability === 'Email is already in use') {
          return emailAvailability;
        } else if (user.name.length < 1) {
          return 'Name cannot be empty';
        } else if (user.email.length < 1) {
          return 'Email cannot be empty';
        } else if (user.password.length < 1) {
          return 'Password cannot be empty';
        } else if (user.password.length < 8) {
          return 'Password must be at least 8 characters long';
        } else if (user.password.search(/[0-9]/i) < 0) {
          return 'Password must contain at least one number';
        } else if (user.password.search(/[!@#$%^&*]/i) < 0) {
          return 'Password must contain at least one special character';
        } else {
          return null;
        }
      };

    const handleSubmit = async (e) => {  //when form is submitted, run handleSubmit function
        e.preventDefault(); //prevents page from refreshing
        let date = new Date(); //defined here so i can use the .tolocaledatesting function later
        const user = { //create user object with name, email, password and date joined
            name: e.target[0].value,
            email:  e.target[1].value,
            password: e.target[2].value,
            joined: date.toLocaleDateString(),//instead of getting the whole date, only use d/m/y

        }

        error = await validation(user); //validate user data

        if(error != null){ //if there is an error, display error message
            console.log(error);
            let errormsg = document.getElementById('error');
            errormsg.innerHTML = error;
            return;
        }
        else{
            const createdUser = await createUser(user);
            localStorage.setItem('loggedUser' , JSON.stringify(createdUser)); //set loggedUser in local storage to new user
            props.setUser({name: user.name, password: user.password, email: user.email, joined: user.joined }); //set user state to new user
            navigate('/');
            // createUser(user).then((response) => {
            //     
            // })

            
            
            // let registered = JSON.parse(localStorage.getItem('users')); //get all registered users from local storage
            // if(registered=== null){ //if there are no registered users, create an empty array
            //     registered = []
            // };

            // registered.push(user); //add new user to array of registered users
            // localStorage.setItem('users', JSON.stringify(registered)); //set local storage to new array of registered users
            // localStorage.setItem('loggedUser' , JSON.stringify(user)); //set loggedUser in local storage to new user
            // props.setUser({name: user.name, password: user.password, email: user.email, joined: user.joined }); //set user state to new user
            // navigate('/'); //navigate to landing page
            // alert('Account created successfully!'); //alert user that account was created
            
        };


    }



    //return sign up page
    return (
        <div className="page">
            <div className = "content">
                <div className = "background">
                    <div id = "header" data-testid = 'Heading'>
                        Welcome to Loop Cinemas!
                    </div>
                    <form onSubmit={e => handleSubmit(e)}>
                        <div>
                            <input data-testid = 'Name' className = "input" type = "name" id = "name" placeholder = "Name"></input>
                        </div>
                        <div>
                            <input data-testid = 'Email' className = "input" type = "email" id = "email" placeholder = "Email"></input>
                        </div>
                        <div>
                            <input data-testid = 'Password' className = "input" type = "password" id = "password" placeholder = "Password"></input>
                        </div>
                        <div className = "flex-center">
                            <button data-testid = 'SignUp' className = "button" id = "signin" type = "submit">Sign In</button>
                        </div>
                        <div id = {'error'}></div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignUp;