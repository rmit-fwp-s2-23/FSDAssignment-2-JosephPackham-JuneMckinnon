import React, { useState, createContext } from "react";
import Movies from "./movies";
import EditMovie from "./editmovie";
import UserList from "./users";
import "../css/dash.css";

export const TabContext = createContext();

const Dashboard = () => {
    const [tab, setTab] = useState("movies");
    const tabSwitch = (curTab) => {
        if (curTab !== tab) {
            setTab(curTab);
        }
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
                    {tab === "users" && <UserList />}
                    {tab === "stats" && <div>stats</div>}
                </div>
            </div>
        </TabContext.Provider>
    )
}

export default Dashboard;