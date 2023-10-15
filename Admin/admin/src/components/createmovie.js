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
                sessiontimes: [...prevState.sessiontimes, action.payload],
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
        console.log(state.movie_name, state.movie_image, state.sessiontimes)
    }

    const createSession = (e) => {
        e.preventDefault();
        const session = {
            sessiontime_time: e.target[0].value,
            sessiontime_day: e.target[1].value,
            sessiontime_available_seats: e.target[2].value
        }
        dispatcher({ type: 'SESSION', payload: session });
    }

    return (
        <div className = "create-bkg">
            <div className = "create-left">
                <label className = "create-label" htmlFor = "create-name">Movie Name</label>
                <input className = "create-input" id = "create-name" onChange={(e) => handleName(e)}></input>
                <label className = "create-label" htmlFor = "create-name">Movie Image</label>
                <input className = "create-input" id = "create-name" onChange={(e) => handleImage(e)}></input>
                <button className = "create-button" onClick = {handleCreate}>Create Movie</button>
            </div>
            <div className = "create-right">
                <form className = "create-top" onSubmit = {(e) => {createSession(e)}}>
                    <label className = "create-session-label" htmlFor = "create-session-name">Session Time</label>
                    <input className = "create-session-input" id = "create-session-name"></input>
                    <label className = "create-session-label" htmlFor = "create-session-name">Session Day</label>
                    <input className = "create-session-input" id = "create-session-name"></input>
                    <label className = "create-session-label" htmlFor = "create-session-name">Session Seats</label>
                    <input className = "create-session-input" id = "create-session-name"></input>
                    <input type = "submit" value = "Submit" className = "session-submit"></input>
                </form>
                <div className = "create-bottom">
                    {state.sessiontimes.map(session =>
                        <div className = "grid-item">
                            <div className = "session-time">
                                <div>Day: {session.sessiontime_day}</div>
                                <div>Time: {session.sessiontime_time}</div>
                                <div>Seats: {session.sessiontime_available_seats}</div>
                            </div>   
                        </div> 
                    )}
                </div>
            </div>
        </div>
    )
}

export default CreateMovie;