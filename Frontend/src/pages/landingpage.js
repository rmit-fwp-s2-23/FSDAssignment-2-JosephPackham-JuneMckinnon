import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/landingpage.css';
import barbie from '../images/barbie/barbie-poster.jpg';
import barbie_bkg from '../images/barbie/barbie-bkg.webp';
import oppenheimer from '../images/Oppenheimer.jpg';
import oppenheimer_bkg from '../images/oppenheimer/oppenheimer-bkg.jpg';
import avengers from '../images/avengersendgame_lob_crd_05.jpg';
import avengers_bkg from '../images/avengers/avengers-bkg.jpeg';
import lotr from '../images/lordoftherings.jpg'
import lotr_bkg from '../images/lotr/lotr-bkg.jpeg';

//this is the landing page

const LandingPage = (props) => {
    const navigate = useNavigate();

    const [imgSrc, setImgSrc] = useState(barbie);
    const changeImg = (movie) => {
        switch (movie) {
            case "barbie":
                setImgSrc(barbie);
                document.getElementById('movie-title').innerText = "Barbie (2023)";
                break;
            case "oppenheimer":
                setImgSrc(oppenheimer);
                document.getElementById('movie-title').innerText = "Oppenheimer";
                break;
            case "avengers":
                setImgSrc(avengers);
                document.getElementById('movie-title').innerText = "Avengers";
                break;
            case "lotr":
                setImgSrc(lotr);
                document.getElementById('movie-title').innerText = "LOTR";
                break;
            default:
                setImgSrc(barbie);
                document.getElementById('movie-title').innerText = "Barbie";
                break;
        }
    }

    const handleReview = () => {
        const cur_movie = document.getElementById('movie-title').innerText;
        console.log(cur_movie);
        switch (cur_movie) {
            case 'Barbie':
                navigate('/barbiereview');
                break;
            case 'Oppenheimer':
                navigate('/oppenheimerreview');
                break;
            case 'Avengers':
                navigate('/avengersreview');
                break;
            case 'LOTR':
                navigate('/lotrreview');
                break;
            default:
                navigate('/');
        }
    }


    return (
        <div className  = 'page'>
            {/* shows a grid of movies with buttons underneath for session times and reviews */}
            <div className = "movie-container" id = "movie-container">
                <div className = "contain-left">
                    <div id = "movie-title">
                        Barbie
                    </div>
                    <img src = {imgSrc} alt = "barbie" id = "movie-poster" />
                    <div className = "handle-review" onClick = {handleReview}>
                        Leave a Review
                    </div>
                </div>
                <div className = "contain-right">
                    <div id = "movie-times">
                        <div className = "header">Session Times</div>
                        <div className = "session-day">Wednesday 23/08/2023</div>
                        <div className = "session-times">
                            <div className = "session-time">9:00</div>
                            <div className = "session-time">13:00</div>
                            <div className = "session-time">16:00</div>
                            <div className = "session-time">19:00</div>
                        </div>
                        <div className = "session-day">Thursday 24/08/2023</div>
                        <div className = "session-times">
                            <div className = "session-time">9:00</div>
                            <div className = "session-time">11:00</div>
                            <div className = "session-time">14:00</div>
                            <div className = "session-time">16:00</div>
                        </div>
                        <div className = "session-day">Friday 25/08/2023</div>
                        <div className = "session-times">
                            <div className = "session-time">7:00</div>
                            <div className = "session-time">12:00</div>
                            <div className = "session-time">16:00</div>
                            <div className = "session-time">19:00</div>
                        </div>
                        <div className = "session-day">Saturday 26/08/2023</div>
                        <div className = "session-times">
                            <div className = "session-time">8:00</div>
                            <div className = "session-time">15:00</div>
                            <div className = "session-time">16:00</div>
                            <div className = "session-time">20:00</div>
                        </div>
                        <div className = "session-day">Sunday 27/08/2023</div>
                        <div className = "session-times">
                            <div className = "session-time">9:00</div>
                            <div className = "session-time">12:00</div>
                            <div className = "session-time">15:00</div>
                            <div className = "session-time">18:00</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className = "flex-center">
                <div id = "movie-select">
                    <div className = "movie" onClick = {() => changeImg("barbie")}></div>
                    <div className = "movie" onClick = {() => changeImg("oppenheimer")}></div>
                    <div className = "movie" onClick = {() => changeImg("avengers")}></div>
                    <div className = "movie" onClick = {() => changeImg("lotr")}></div>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;

//data to add to readme below

//<a href="https://www.flaticon.com/free-icons/cinema" title="cinema icons">Cinema icons created by Freepik - Flaticon</a>
//<a href="https://www.flaticon.com/free-icons/cinema" title="cinema icons">Cinema icons created by Freepik - Flaticon</a>
//https://www.w3schools.com/css/tryit.asp?filename=trycss_grid
//https://www.w3schools.com/css/tryit.asp?filename=trycss_link_advanced2