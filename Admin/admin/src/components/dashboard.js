import React, { useState, createContext, useEffect } from "react";
import Movies from "./movies";
import EditMovie from "./editmovie";
import "../css/dash.css";
import { getUsers } from "../data/repository";

export const TabContext = createContext();

const Dashboard = () => {
    const [tab, setTab] = useState("movies");
    const [users, setUsers] = useState(null);
    const tabSwitch = (curTab) => {
        if (curTab !== tab) {
            setTab(curTab);
        }
    }
    useEffect(() => {
        loadUsers();
    }, []);
    
    const loadUsers = async () => {
        const currentUsers = await getUsers();
        setUsers(currentUsers);
    }
    
    return (
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
                    {tab === "users" && <div>{users?.map(user => <div key = {user.name}>{user.name}</div>)}</div>}
                    {tab === "stats" && <div>stats</div>}
                </div>
            </div>
        </TabContext.Provider>
    )
}

export default Dashboard;