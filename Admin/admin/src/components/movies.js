import React, { useContext, useState, useEffect } from "react";
import "../css/movies.css";
import { TabContext, MovieContext } from "./dashboard.js";
import { getMovies } from "../data/repository.js";

const Movies = () => {
    const setTab = useContext(TabContext)
    const { setMovie } = useContext(MovieContext);
    const handleClick = (movie) => {
        setMovie(movie)
        setTab("edit")
    }

    const [movies, setMovies] = useState(null);
    useEffect( () => {
        const retrieveMovies = async () => {
            const allMovies = await getMovies();
            setMovies(allMovies);
            console.log(allMovies);
        }
        retrieveMovies();
    }, [])

        
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
        </div>
    )
}

export default Movies