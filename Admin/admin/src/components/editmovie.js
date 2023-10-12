import React, { useContext } from "react";
import { TabContext } from "./dashboard.js"

const EditMovie = () => {
    const setTab = useContext(TabContext);
    const handleClick = () => {
        setTab("movies")
    }

    return (
        <div onClick = {handleClick}>
            Edit movie
        </div>
    )
}

export default EditMovie;