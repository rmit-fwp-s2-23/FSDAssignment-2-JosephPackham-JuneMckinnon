import React, { useContext, useState } from "react";
import { TabContext, MovieContext } from "./dashboard.js"
import "../css/edit.css";
import { updateMovie } from "../data/repository.js";

const EditMovie = () => {
    const { movie } = useContext(MovieContext);
    const [editedMovie, setEditedMovie] = useState(movie);

    const reviews = [
        {
            review_id: 1,
            movie: "barbie",
            author_name: "June",
            author_email: "june@email.com",
            review_rating: 5,
            review_text: "i love this movie",
            review_date: "10/10/2023"
        },
        {
            review_id: 2,
            movie: "barbie",
            author_name: "Astrid",
            author_email: "astrid@email.com",
            review_rating: 4,
            review_text: "this is a good movie",
            review_date: "10/10/2023"
        }
    ]

    const setTab = useContext(TabContext);
    const handleClick = () => {
        setTab("movies")
    }

    const handleInputChange = (key, value) => {
        setEditedMovie(prevState => ({
          ...prevState,
          [key]: value,
        }));
      };

    const saveChanges = async () => {
        const response = await updateMovie(editedMovie.movie_name, editedMovie.movie_image);
        console.log(response);
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
                                            <div key = {session.sessiontime_time} className = "session-entry">
                                                <div>Time: {session.sessiontime_time}</div>
                                                <div>Day: {session.sessiontime_day}</div>
                                                <div>Seats Left: {session.sessiontime_available_seats}</div>
                                            </div>
                                        )}
                                    </div>
                                </>
                            ) : (
                                <div key={key} className="movie-entry">
                                    <div className="movie-key">{key}:</div>
                                    <input className="movie-val" type="text" defaultValue={value} onChange = {(ev) => handleInputChange(key, ev.target.value)} />
                                </div>
                            )
                        )
                    )}
                    <button className = "edit-save" onClick = {() => saveChanges()}>Save</button>
                </div>
                <div id = "edit-review" className = "edit-items">
                    {reviews.map(review => 
                        <div key = {review.id} className = "review">
                            <div>{review.author_name}: {review.review_rating}/5</div>
                            <div>{review.review_text}</div>
                            <div>Posted on: {review.review_date}</div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default EditMovie;