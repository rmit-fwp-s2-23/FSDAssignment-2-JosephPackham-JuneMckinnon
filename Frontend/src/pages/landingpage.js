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
import { getAllMovies, getMovie, getAllSessionTimes, getSessionTime, getSessionTimeByDay } from '../data/repository';
import { all } from 'axios';

//this is the landing page

const LandingPage = (props) => {
    const navigate = useNavigate();
  
    const [imgSrc, setImgSrc] = useState(barbie);
    const [sessionTimes, setSessionTimes] = useState([]);
    const [movies, setMovies] = useState([]);
  
    const { setMovie, movie } = props;
  
    useEffect(() => {
      async function fetchData() {
        const sessionTimes = await getAllSessionTimes();
        const movies = await getAllMovies();
        setSessionTimes(sessionTimes);
        setMovies(movies);
        setMovie("Barbie");
      }
      fetchData();
    }, []);
  
    const changeImg = (movie) => {
      console.log(movie);
      setImgSrc(movie.movie_image);
      setMovie(movie.movie_name);
      document.getElementById('movie-title').innerText = movie.movie_name;
    };
  
    const handleReview = () => {
      localStorage.setItem('movie', props.movie);
      navigate('/reviews');
    };
  
    const handleSessionTime = (sessionTime) => {
      localStorage.setItem('movie', props.movie);
      props.setDay(sessionTime.replace(/\//g, '-'));
      localStorage.setItem('day', sessionTime.replace(/\//g, '-'));
      navigate('/ticket');
    };
  
    return (
      <div className='page' data-testid="LandingPage">
        <div className="movie-container" id="movie-container">
          <div className="contain-left">
            <div id="movie-title" data-testid="MovieTitle">
              
            </div>
            <img src={imgSrc} alt="barbie" id="movie-poster" data-testid="MoviePoster"></img>
            <div className="handle-review" onClick={handleReview} data-testid="ReviewButton">
              Leave a Review
            </div>
          </div>
          <div className="contain-right">
            <div id="sessiontimes">
              <div className="header" data-testid="SessionTimesHeading">Session Times</div>
              <div className="session-times" data-testid="SessionTimes">
                {sessionTimes
                  .filter(
                    (sessionTime, index, self) =>
                      self.findIndex((t) => t.sessiontime_day === sessionTime.sessiontime_day) === index && sessionTime.sessiontime_day !== "Sample Day"
                  )
                  .map((sessionTime) => (
                    <button className="session-time" onClick={() => handleSessionTime(sessionTime.sessiontime_day)}>{sessionTime.sessiontime_day.replace(/-/g, '/')}</button>
                  ))}
              </div>
            </div>
            <div id="movies">
              {movies.map((movie) => (
                <div className="movie" onClick={() => changeImg(movie)}>
                  <img src={movie.movie_image} alt={movie.movie_name} />
                </div>
              ))}
            </div>
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