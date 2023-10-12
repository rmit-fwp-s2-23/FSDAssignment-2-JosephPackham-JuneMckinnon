import React, { useState } from "react";
import "../css/dash.css";

const Dashboard = () => {
    const [tab, setTab] = useState(true); // true = movies, false = users
    const tabSwitch = (curTab) => {
        if (curTab !== "movie" && tab !== false) {
            setTab(!tab);
        } else if (curTab !== "user" && tab !== true) {
            setTab(!tab);
        }
    }
    return (
        <div className = "flex-col">
            <div className = "dash-toggles">
                <div id = "dash-toggle" className = {tab ? 'active' : 'inactive'} onClick = {() => tabSwitch("movie")}>Movies</div>
                <div id = "dash-toggle" className = {tab ? 'inactive' : 'active'} onClick = {() => tabSwitch("user")}>Users</div>
            </div>
            <div className = "dash-bkg">
                {tab ? (
                    <div>movies</div>
                ) : (
                    <div>users</div>
                )}
            </div>
        </div>
    )
}

export default Dashboard;