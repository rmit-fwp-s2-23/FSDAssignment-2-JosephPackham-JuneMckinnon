import React, { useContext } from "react";
import { TabContext } from "./dashboard.js"
import "../css/edit.css";

const EditMovie = () => {
    const movie = {
        name: "Barbie",
        image: "https://url.com",
        tickets: 10
    }

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

    return (
        <div className = "edit-col">
            <div>Editing: {movie.name}</div>
            <br />
            <div className = "edit-container">
                <div id = "edit-movie" className = "edit-items">
                    {Object.entries(movie).map(([key, value]) => 
                        <div key = {key} className = "movie-entry">
                            <div className = "movie-key">{key}:</div>
                            <input className = "movie-val" type = "text" defaultValue = {value} />
                        </div>
                    )}
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