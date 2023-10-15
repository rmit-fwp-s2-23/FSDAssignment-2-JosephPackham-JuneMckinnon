// imports
import React, {useContext, useEffect} from 'react';
import "../css/home.css"
import Dashboard from '../components/dashboard.js';
import { LoginContext } from '../App.js';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    // retrieve reducer from context
    const { state, dispatcher } = useContext(LoginContext);
    
    // if the user isn't logged in return back to main
    const navigate = useNavigate();
    useEffect(() => {
        if (state.isLoggedIn === false) {
            navigate('/');
        }
    });

    // logout button attached to the top right of the page
    const LogoutButton = () => {
        const logoutHandler = (e) => {
            dispatcher({ type: 'LOGGED_OUT' }); // when state is changed the above useEffect logs you out
        };

        return (
            <button className = "logout" onClick = {logoutHandler}>Logout</button>
        )
    }

    return (
        <div className = "home-bkg">
            <LogoutButton />
            <Dashboard />
        </div>
    );
}

export default Home;