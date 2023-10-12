import React, { useContext } from "react";
import "../css/movies.css";
import { TabContext } from "./dashboard.js";

const Movies = () => {
    const movies = [
        {name: "barbie"},
        {name: "avengers"},
        {name: "oppenheimer"},
        {name: "lotr"},
    ]

    const setTab = useContext(TabContext)
    const handleClick = () => {
        setTab("edit")
    }
        
    return (
        <div className = "movie-container">
            {movies.map(movie => 
                <div className = "movie" onClick = {handleClick}>
                    <div className = "overlay">Edit</div>
                    <div className = "movie-poster">
                        <div className = "movie-name">{movie.name}</div>
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