import React, { useState, createContext, useEffect } from "react";
import Movies from "./movies";
import EditMovie from "./editmovie";
import UserList from "./users";
import StatsPage from "./stats";
import "../css/dash.css";
import { getMovies } from "../data/repository.js";

export const TabContext = createContext();
export const MovieContext = createContext();
export const MoviesContext = createContext();

const Dashboard = () => {
    const [movie, setMovie] = useState(null);
    const [tab, setTab] = useState("movies");
    const tabSwitch = (curTab) => {
        if (curTab !== tab) {
            setTab(curTab);
        }
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
        <MoviesContext.Provider value = {{movies}} >
            <MovieContext.Provider value = {{movie, setMovie}} >
                <TabContext.Provider value = {setTab}>
                    <div className = "flex-col">
                        <div className = "dash-toggles">
                            <div id = "dash-toggle" className = {tab === "movies" ? 'active' : tab === "edit" ? 'active' : 'inactive'} onClick = {() => tabSwitch("movies")}>Movies</div>
                            <div id = "dash-toggle" className = {tab === "users" ? 'active' : 'inactive'} onClick = {() => tabSwitch("users")}>Users</div>
                            <div id = "dash-toggle" className = {tab === "stats" ? 'active' : 'inactive'} onClick = {() => tabSwitch("stats")}>Stats</div>
                        </div>
                        <div className = "dash-bkg">
                            {tab === "movies" && <Movies />}
                            {tab === "edit" && <EditMovie />}
                            {/* {users?.map(user => <div key = {user.name}>{user.name}</div>)} */}
                            {tab === "users" && <UserList />}
                            {tab === "stats" && <StatsPage />}
                        </div>
                    </div>
                </TabContext.Provider>
            </MovieContext.Provider>
        </MoviesContext.Provider>
    )
}

export default Dashboard;