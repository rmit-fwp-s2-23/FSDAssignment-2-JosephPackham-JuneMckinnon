import React from "react";
import '../css/userprofile.css'
import { useNavigate } from "react-router";


const EditProfile = (props) => {
    const navigate = useNavigate(); //used to navigate to different pages
    

    const handleBack = (e) => {
        navigate('/userprofile');
    }

    const handleSubmit = (e) => {
        e.preventDefault() //prevents page from refreshing
        const old_password = e.target[2].value; //get old password from form
        const error = document.getElementById('error'); //get error element
        
        if(props.user.password === old_password){ //if old password is correct
            const newname = e.target[0].value; //get new name from form
            const newpassword = e.target[1].value; //get new password from form
            let users = JSON.parse(localStorage.getItem('users')); //get all registered users from local storage

            for(let i = 0; i < users.length; i++){ //loop through all registered users
                if(users[i].username === props.user.username){ //if user is found
                    users[i].name = newname; //update name
                    users[i].password = newpassword; //update password
                    localStorage.setItem('users', JSON.stringify(users)); //update local storage
                    props.setUser(users[i]); //update user state
                }
            }
            
            localStorage.setItem('users', JSON.stringify(users)); //update local storage
            alert('Profile Updated')
            navigate('/userprofile');

        }
        else{
            error.innerHTML = 'Incorrect Password';}
    
    }




    return (
        <div className = "page">
            <div className = "content">
                <div className = "background">
                    <div id = "header">
                        Edit Profile
                    </div>
                    <form onSubmit = {e => handleSubmit(e)}>
                        <input className="input" id = 'newname' placeholder = 'New Name'></input>
                        <br></br>
                        <input className="input" id = 'newpassword' type = 'Password' placeholder = 'New Password'></input>
                        <br></br>
                        <input className="input" id = 'oldpassword' type = 'Password' placeholder = 'Confirm Old Password'></input>
                        <br></br> 
                        <div className = "flex-center">
                            <button className = 'button' type = 'submit'>Update</button>
                            <button className = 'button' onClick = {e => handleBack(e)}>Back</button>
                        </div>
                        <p id = 'error'></p>
                    </form>
                </div>
            </div>
        </div>

    );
}; 

export default EditProfile;