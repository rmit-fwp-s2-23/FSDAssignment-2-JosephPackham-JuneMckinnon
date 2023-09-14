import React from "react";
import '../css/userprofile.css'
import { useNavigate } from "react-router";

//TODO: styling
//TODO: add in confirmation fo deletion



const UserProfile = (props) => {
    const navigate = useNavigate(); //used to navigate to different pages
    const handleEdit = () => { //when edit button is clicked, navigate to edit profile page
        navigate('/editprofile');
    }
    const handleDelete = () => { //when delete button is clicked, delete account
        if(window.confirm('Are you sure you want to delete your account?') === true){ //confirm deletion
            let users = JSON.parse(localStorage.getItem('users')); //get all registered users from local storage

            for(let i = 0; i < users.length; i++){ //loop through all registered users
            if(users[i].email === props.user.email){ //if user is found
                users.splice(i, 1); //remove user from array
                localStorage.setItem('users', JSON.stringify(users)); //update local storage
                localStorage.removeItem('loggedUser'); //remove logged user from local storage
                
                props.setUser(undefined) //set user state to undefined
                localStorage.removeItem('loggedUser') //remove logged user from local storage
                alert('Account Deleted')
                navigate('/')
                
            } else {
                console.log('user not found');
            }

        }
        }
        
    }
    return (
        <div className = "page">
            <div className = "content">
                <div className = "background">
                    <div id = "header">
                        {props.user.name}'s Profile
                    </div>
                    <br></br>
                    <div className = "small-background">
                        Username: {props.user.name}
                    </div>
                    <div className = "small-background">
                        Email: {props.user.email}
                    </div>
                    <div className = "small-background">
                        Joined: {props.user.joined}
                    </div>
                    <div className = "button-container">
                        <button className="button" id = 'edit' onClick = {handleEdit}>Edit</button>
                        <button className="button" id = 'delete' onClick = {handleDelete}>Delete</button>
                    </div>
                </div>
            </div>
        </div>
        );
};

export default UserProfile;