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
import { getAllMovies, getMovie, getAllSessionTimes, getSessionTime, getSessionTimeByDay, getSessionTimeByMovie } from '../data/repository';
import { all } from 'axios';

//this is the landing page

const LandingPage = (props) => { //props are passed in from app.js
    const navigate = useNavigate(); //used to navigate to different pages
    const { setMovie, movie } = props; //get movie and setMovie from props
    const [imgSrc, setImgSrc] = useState(movie); //set imgSrc to movie
    const [sessionTimes, setSessionTimes] = useState([]); //set sessionTimes to empty array
    const [movies, setMovies] = useState([]); //set movies to empty array -- this is the array of movies that will be displayed on the landing page, where as movie is the prop

  
    
  
    useEffect(() => { //useEffect is used to fetch data from the database
      async function fetchData() { //async function to fetch data
        const AllsessionTimes = await getAllSessionTimes(); //get all session times
        const allMovies = await getAllMovies(); //get all movies
        const filteredMovies = allMovies.filter((movie) => movie.movie_name !== "Movie1"); // exclude movie with movie_name "Movie1" -- test movie
        const sessionTimes = await getSessionTimeByMovie(filteredMovies[1].movie_name);// get session times for the first movie in the filtered movies array
        setSessionTimes(sessionTimes); //set session times state
        setMovies(filteredMovies); //set movies state
        setMovie(filteredMovies[1].movie_name); //set movie state
        setImgSrc(filteredMovies[1].movie_image); //set imgSrc state
      }
      fetchData(); //call the async function
    }, []); //empty array means useEffect will only run once

    let sessionTimesByMovie = []; //create empty array to store session times for the selected movie
  
    const changeImg = async (movie) => { //change the image when a movie is clicked
      
      setImgSrc(movie.movie_image); //set imgSrc state
      setMovie(movie.movie_name);  //set movie state

        // fetch session times for the selected movie
      const response = await getSessionTimeByMovie(movie.movie_name);
      sessionTimesByMovie = response; //set sessionTimesByMovie to the response

      // update the session times state
      setSessionTimes(sessionTimesByMovie); 
      console.log(sessionTimesByMovie);

      
      
      

    };
  
    const handleReview = () => {
      localStorage.setItem('movie', props.movie); //set movie in local storage to the selected movie
      navigate('/reviews'); //navigate to reviews page
    };
  
    const handleSessionTime = (sessionTime) => { //handle session time
      localStorage.setItem('movie', props.movie); //set movie in local storage to the selected movie
      props.setDay(sessionTime.replace(/\//g, '-')); //set day state to the selected session time
      localStorage.setItem('day', sessionTime.replace(/\//g, '-')); //set day in local storage to the selected session time
      navigate('/ticket'); //navigate to ticket reservation page
    };

  
    return (
      <div className='page' data-testid="LandingPage">
        <div className="movie-container" id="movie-container">
          <div className="contain-left">
            <div id="movie-title" data-testid="MovieTitle">
              {movie}
            </div>
            <img src={imgSrc} alt={movie.movie_name} id="movie-poster" data-testid="MoviePoster"></img>
            
            <div className="handle-review" onClick={handleReview} data-testid="ReviewButton">
              Leave a Review
            </div>
          </div>
          <div className="contain-right">
            <div id="sessiontimes">
              <div className="header" data-testid="SessionTimesHeading">Session Times</div>
              <div className="session-times" data-testid="SessionTimes">
                  {/* display session times and filter out duplicate days */}
  {sessionTimes
    .filter(
      (sessionTime, index, self) => //filter out duplicate days
        index === 
        self.findIndex((t) => t.sessiontime_day === sessionTime.sessiontime_day) 
    )
    .map((sessionTime) => { //map through session times
      const [day, date] = sessionTime.sessiontime_day.split(" "); //split the session time day into day and date
      const formattedDate = date.replace(/-/g, "/"); //replace - with /
      return (
        <div
          key={sessionTime.sessiontime_id} //set key to session time id
          className="session-time"
          onClick={() => handleSessionTime(sessionTime.sessiontime_day)} //handle session time
        >
        <div className="session-day">{sessionTime.sessiontime_day.split(" ")[0]}</div> {/* split the session time day into day and date */}
        <br></br>
   
        <div className="session-day">{sessionTime.sessiontime_day.split(" ")[1].replace(/-/g, "/")}</div> {/* split the session time day into day and date */}
        </div>
      );
    })}

              </div>
            </div>
            <div id="movies" className='movie-list-container' data-testid="movies-container">
              
              {movies.map((movie) => (
                <div key = {movie.movie_name} data-testid="movie" className="movie" onClick={() => changeImg(movie)} >
                  <img className='poster' src={movie.movie_image} alt={movie.movie_name} />
                  <div className = "moviename">{movie.movie_name}</div>
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