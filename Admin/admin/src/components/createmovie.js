import React from "react";
import "../css/create.css";

const CreateMovie = () => {
    return (
        <div className = "create-bkg">
            <label className = "create-label" htmlFor = "create-name">Movie Name</label>
            <input className = "create-input" id = "create-name"></input>
            <label className = "create-label" htmlFor = "create-name">Movie Image</label>
            <input className = "create-input" id = "create-name"></input>
            <button className = "create-button">Create Movie</button>
        </div>
    )
}

export default CreateMovie;