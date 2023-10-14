import React, { useContext } from "react";
import "../css/movies.css";
import { TabContext, MovieContext } from "./dashboard.js";

const Movies = () => {
    const setTab = useContext(TabContext)
    const handleClick = () => {
        setTab("edit")
    }

    const { movies } = useContext(MovieContext);
        
    return (
        <div className = "movie-container">
            {movies?.map(movie => 
                <div key = {movie.movie_name} className = "movie" onClick = {handleClick}>
                    <div className = "overlay">Edit</div>
                    <div className = "movie-poster">
                        <div className = "movie-name">{movie.movie_name}</div>
                    </div>
                    <div className = "movie-stats">
                        <div>Ticket Sales Today:</div>
                        <div>No. of Reviews:</div>
                        <div>Average Rating:</div>
                        <div>Total Page Views:</div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Movies