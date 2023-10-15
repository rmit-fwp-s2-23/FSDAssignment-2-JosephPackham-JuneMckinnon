import React, { useContext } from "react";
import "../css/movies.css";
import { TabContext, MoviesContext, MovieContext } from "./dashboard.js";

const Movies = () => {
    const setTab = useContext(TabContext)
    const { movies } = useContext(MoviesContext);
    const { setMovie } = useContext(MovieContext);

    const handleClick = (movie) => {
        setMovie(movie);
        setTab("edit");
    }

    const createMovie = () => {
        setTab("create");
    }
        
    return (
        <div className = "movie-container">
            {movies?.map(movie => 
                <div key = {movie.movie_name} className = "movie" onClick = {() => handleClick(movie)}>
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
            <div key = "create-movie" className = "movie" onClick = {() => createMovie()}>
                    <div className = "overlay"><h1>+</h1></div>
                    <h1>+</h1>
                </div>
        </div>
    )
}

export default Movies