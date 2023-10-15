// imports
import React, { useContext, useState, useEffect } from "react";
import { TabContext, MovieContext } from "./dashboard.js"
import "../css/edit.css";
import { updateMovie, getReviewsByMovie, deleteReviewById, updateSessionById } from "../data/repository.js";

const EditMovie = () => {
    // retrieve selected movie from context (chosen from movies.js)
    const { movie } = useContext(MovieContext);

    // define states
    const [editedMovie, setEditedMovie] = useState(movie); // currently edited movie
    const [editedSessions, setEditedSessions] = useState({}); // currrently edited sessions
    const [reviews, setReviews] = useState(null); // reviews from database

    // get all reviews and sessions on first load
    useEffect(() => {
        const getReviewsAndSessions = async () => {
            // retrive reviews and store in state
            const retrievedReviews = await getReviewsByMovie(movie.movie_name);
            setReviews(retrievedReviews);

            // gather all sessions from the movie and store in state
            const sessionData = {};
            for (const session of movie.sessiontimes) {
                sessionData[session.sessiontime_id] = {
                    time: session.sessiontime_time,
                    day: session.sessiontime_day,
                    seats: session.sessiontime_available_seats,
                };
            }
            setEditedSessions(sessionData);
        }
        getReviewsAndSessions();
    }, [movie.movie_name, movie.sessiontimes])

    // change tab if clicked
    const setTab = useContext(TabContext);
    const handleClick = () => {
        setTab("movies")
    }

    // when value input is updated, update movie in state
    const handleMovieChange = (key, value) => {
        setEditedMovie(prevState => ({
            ...prevState,
            [key]: value,
        }));
    };

    // when session is updated, update session in state
    const handleSessionChange = (sessionId, field, value) => {
        setEditedSessions((prevValues) => ({
            ...prevValues,
            [sessionId]: {
                ...prevValues[sessionId],
                [field]: value,
            },
        }));
    }

    const saveChanges = async () => {
        const response = await updateMovie(editedMovie.movie_name, editedMovie.movie_image);
        alert(response.message)
    }

    const saveSession = async (sessionId) => {
        const { time, day, seats } = editedSessions[sessionId];
        const response = await updateSessionById(sessionId, time, day, parseInt(seats));
        alert(response.message);
    }

    const deleteReview = async (reviewID) => {
        const response = await deleteReviewById(reviewID);
        alert(response.message);
    }  

    return (
        <div className = "edit-col">
            <div onClick = {handleClick}>Editing: {movie.movie_name}</div>
            <br />
            <div className = "edit-container">
                <div id = "edit-movie" className = "edit-items">
                    {Object.entries(movie).map(([key, value]) => 
                        key === "movie_name" ? null : (
                            key === "sessiontimes" ? (
                                <>
                                    <div className = "movie-key">Session Times:</div>
                                    <div key = {key} className = "session-container">
                                        {value.map(session => 
                                            <div key = {session.sessiontime_id} className = "session-entry">
                                                <div className = "input-container">
                                                    <label htmlFor = "time">Time: </label>
                                                    <input 
                                                        id = "time" 
                                                        className = "session-input" 
                                                        defaultValue = {session.sessiontime_time}
                                                        onChange={(e) => handleSessionChange(session.sessiontime_id, 'time', e.target.value)}
                                                    ></input>
                                                </div>
                                                <div className = "input-container">
                                                    <label htmlFor = "day">Day: </label>
                                                    <input 
                                                        id = "day" 
                                                        className = "session-input" 
                                                        defaultValue = {session.sessiontime_day}
                                                        onChange={(e) => handleSessionChange(session.sessiontime_id, 'day', e.target.value)}
                                                    ></input>
                                                </div>
                                                <div className = "input-container">
                                                    <label htmlFor = "seats">Seats: </label>
                                                    <input 
                                                        id = "seats" 
                                                        className = "session-input" 
                                                        defaultValue = {session.sessiontime_available_seats}
                                                        onChange={(e) => handleSessionChange(session.sessiontime_id, 'seats', e.target.value)}
                                                    ></input>
                                                </div>
                                                <button className = "save-session" onClick = {() => saveSession(session.sessiontime_id)}>Save</button>
                                            </div>
                                        )}
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div key={key} className="movie-entry">
                                        <div className="movie-key">{key}:</div>
                                        <input 
                                            className="movie-val" 
                                            type="text" defaultValue={value} 
                                            onChange = {(ev) => handleMovieChange(key, ev.target.value)} 
                                        />
                                    </div>
                                    <button className = "edit-save" onClick = {() => saveChanges()}>Save</button>
                                </>
                            )
                        )
                    )}
                </div>
                <div id = "edit-review" className = "edit-items">
                    {reviews?.map(review => 
                        <div key = {review.id} className = "review">
                            <div>{review.author_name}: {review.review_rating}/5</div>
                            <div>{review.review_text}</div>
                            <div>Posted on: {review.review_date.slice(0, 10)}</div>
                            <button className = "delete-review" onClick = {() => deleteReview(review.id)}>Delete</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default EditMovie;