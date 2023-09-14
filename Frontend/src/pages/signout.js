import React from "react";
import { useNavigate } from "react-router";
import '../css/signout.css'

const Signout = (props) => {
    
    const navigate = useNavigate(); //used to navigate to different pages
    const handleCancel = () => { //if cancel button is clicked, navigate to landing page
        navigate('/');
    }
    const handleLogout = () =>{ //if log out button is clicked, remove loggedUser from local storage and set user state to null
        localStorage.removeItem('loggedUser')
        props.setUser(JSON.parse(localStorage.getItem('loggedUser'))) 
        navigate('/'); //navigate to landing page
    }
    return (
        <>
            <div className = 'page'>
                <h1 className="heading">Are you sure you want to log out?</h1>
                <button className="button" onClick = {handleLogout}>Log Out</button>
                <button className="button" onClick = {handleCancel}>Cancel</button>
            </div>
        </>
        
        );
}

export default Signout
