import React, {useContext, useEffect} from 'react';
import "../css/home.css"
import Dashboard from '../components/dashboard.js';
import { LoginContext } from '../App.js';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const { state, dispatcher } = useContext(LoginContext);
    
    const navigate = useNavigate();
    useEffect(() => {
        if (state.isLoggedIn === false) {
            navigate('/');
        }
    });

    const LogoutButton = () => {
        const logoutHandler = (e) => {
            dispatcher({ type: 'LOGGED_OUT' });
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