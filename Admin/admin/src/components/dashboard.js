// imports
import React, { useState, createContext, useEffect } from "react";
import Movies from "./movies";
import EditMovie from "./editmovie";
import UserList from "./users";
import StatsPage from "./stats";
import CreateMovie from "./createmovie";
import "../css/dash.css";
import { getMovies } from "../data/repository.js";

// create contexts for components
export const TabContext = createContext(); // keeps track of current tab (to navigate between tabs)
export const MovieContext = createContext(); // keeps track of selected movie (for movies and editmovie)
export const MoviesContext = createContext(); // stores all movies from the database

const Dashboard = () => {
    // define states
    const [movie, setMovie] = useState(null);
    const [tab, setTab] = useState("movies");
    const [movies, setMovies] = useState(null);

    // when called switch tab to selected tab
    const tabSwitch = (curTab) => {
        if (curTab !== tab) { // make sure current tab isn't the selected tab
            setTab(curTab);
        }
    }
    
    // on first load, retrieve all movies
    useEffect( () => {
        const retrieveMovies = async () => {
            const allMovies = await getMovies();
            setMovies(allMovies);
        }
        retrieveMovies();
    }, [])
    
    return (
        <MoviesContext.Provider value = {{movies}} >
            <MovieContext.Provider value = {{movie, setMovie}} >
                <TabContext.Provider value = {setTab}>
                    <div className = "flex-col">
                        <div className = "dash-toggles">
                            <div id = "dash-toggle" className = {tab === "movies" ? 'active' : tab === "edit" ? 'active' : tab === "create" ? 'active' : 'inactive'} onClick = {() => tabSwitch("movies")}>Movies</div>
                            <div id = "dash-toggle" className = {tab === "users" ? 'active' : 'inactive'} onClick = {() => tabSwitch("users")}>Users</div>
                            <div id = "dash-toggle" className = {tab === "stats" ? 'active' : 'inactive'} onClick = {() => tabSwitch("stats")}>Stats</div>
                        </div>
                        <div className = "dash-bkg">
                            {tab === "movies" && <Movies />}
                            {tab === "edit" && <EditMovie />}
                            {tab === "users" && <UserList />}
                            {tab === "stats" && <StatsPage />}
                            {tab === "create" && <CreateMovie />}
                        </div>
                    </div>
                </TabContext.Provider>
            </MovieContext.Provider>
        </MoviesContext.Provider>
    )
}

export default Dashboard;