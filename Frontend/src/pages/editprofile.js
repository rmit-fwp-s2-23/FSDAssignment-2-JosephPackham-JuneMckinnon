import React from "react";
import '../css/userprofile.css'
import { useNavigate, } from "react-router";
import { updateUser } from "../data/repository";


const EditProfile = (props) => {
    const navigate = useNavigate(); //used to navigate to different pages
    

    const handleBack = (e) => {
        navigate('/userprofile');
    }

    const handleSubmit = async (e) => {
        e.preventDefault() //prevents page from refreshing

        // create variables
        const error = document.getElementById('error'); //get error element
        const email = JSON.parse(localStorage.getItem("loggedUser")).email;
        const updateData = { // this isn't a user but rather the information to update & the current password
            name: e.target[0].value,
            new_password: e.target[1].value,
            old_password: e.target[2].value
        }

        // attempt to update the details and return the reponse status
        const update_status = await updateUser(email, updateData);

        // check the HTTP status
        if (update_status === 401) { // HTTP 401 unauthorised
            error.value("Incorrect Password")
        } else if (update_status === 200) { // HTTP 200 ok
            alert('Profile Updated!')
            navigate('/userprofile');
        } else { // I don't know how you got here
            console.error("unexpected status:", update_status);
        }
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