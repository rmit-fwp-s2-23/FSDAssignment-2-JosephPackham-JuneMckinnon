import React, {useContext, useEffect} from 'react';
import "../css/home.css"
import Dashboard from '../components/dashboard.js';
import { LoginContext } from '../App.js';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const { loggedIn } = useContext(LoginContext);
    
    const navigate = useNavigate();
    useEffect(() => {
        if (loggedIn === false) {
            navigate('/');
        }
    });

    return (
        <div className = "home-bkg">
            <Dashboard />
        </div>
    );
}

export default Home;