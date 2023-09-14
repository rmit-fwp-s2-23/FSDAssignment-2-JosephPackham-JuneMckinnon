import React from 'react';
import Logo from '../images/movie-clapper-open.png'
import Navbar from '../components/navbar.js';



const Header = (props) => { 
    return (

        <div>
            <div className = "header">
                <img className = "logo" src= {Logo} alt = "Logo" /> 
                <h1 className = "title">Loop Cinemas</h1> 
            </div>
            <div>
                <Navbar user = {props.user} /> {/*  pass user data to navbar */}
            </div> 
        </div>
        


    ); 
        
    
};

export default Header;