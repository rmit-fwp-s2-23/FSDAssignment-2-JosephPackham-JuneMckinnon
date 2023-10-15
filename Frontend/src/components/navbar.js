import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/navbar.css';
import { Link } from 'react-router-dom';


const Navbar = (props) => {
    const navigate = useNavigate(); //used to navigate to different pages
    const handleLogout = () =>{ //if log out button is clicked, remove loggedUser from local storage and set user state to null
        if (window.confirm('Are you sure you want to logout?')) {
            localStorage.removeItem('loggedUser')
            props.setUser(JSON.parse(localStorage.getItem('loggedUser'))) 
            navigate('/'); //navigate to landing page
        }
    }

    if(!props.user){
        return (
            <>
                <nav className = 'nav' data-testid='Navbar-guest'>
                    <Link to='/' className='nav-left' id = 'nav-item'>
                        <div className=''>
                            LOOP CINEMAS
                        </div>
                    </Link>
                    <div className='nav-center' id='search-box'>
                        Welcome Guest
                    </div>
                    <div className='nav-right'>
                        <Link to='/signin' className='' id = 'nav-item'>
                            Sign In
                        </Link>
                        <Link to='/signup' className='' id = 'nav-item'>
                            Sign Up
                        </Link>
                    </div>
                </nav>
            </>
        );
        
    }
    return (
        <>
            <nav className = 'nav' data-testid='Navbar'>
                <Link to='/' className='nav-left' id = 'nav-item'>
                    <div className=''>
                        LOOP CINEMAS
                    </div>
                </Link>
                <div className='nav-center' id='search-box'>
                    Welcome {props.user.name}
                </div>
                <div className='nav-right'>
                    <Link to='/userprofile' className='' id = 'nav-item'>
                        Profile
                    </Link>
                    <div id = 'nav-item' onClick = {handleLogout}>
                        Log Out
                    </div>
                </div>
            </nav>
        </>
    );

    
} 
    
export default Navbar;

//need to add 2 nav bars eventually, one for signed in users and one for non-signed in users
 