import React, { useReducer } from "react";
import "../css/create.css";
import { createMovie } from "../data/repository";

const createReducer = (prevState, action) => {
    switch (action.type) {
        case 'NAME':
            return {
                ...prevState,
                movie_name: action.payload,
            };
        case 'IMAGE':
            return {
                ...prevState,
                movie_image: action.payload,
            };
        case 'SESSION':
            return {
                ...prevState,
                isLoggedIn: true,
            };
        default:
            break;
    }
};

const initialState = {
    movie_name: '',
    movie_image: '',
    sessiontimes: [],
};


const CreateMovie = () => {
    const [state, dispatcher] = useReducer(createReducer, initialState);

    const handleName = (e) => {
        dispatcher({ type: 'NAME', payload: e.target.value });
    }
    
    const handleImage = (e) => {
        dispatcher({ type: 'IMAGE', payload: e.target.value });
    }

    const handleCreate = (e) => {
        console.log(state.movie_name, state.movie_image)
    }

    return (
        <div className = "create-bkg">
            <label className = "create-label" htmlFor = "create-name">Movie Name</label>
            <input className = "create-input" id = "create-name" onChange={(e) => handleName(e)}></input>
            <label className = "create-label" htmlFor = "create-name">Movie Image</label>
            <input className = "create-input" id = "create-name" onChange={(e) => handleImage(e)}></input>
            <button className = "create-button" onClick = {handleCreate}>Create Movie</button>
        </div>
    )
}

export default CreateMovie;