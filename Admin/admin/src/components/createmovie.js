// imports
import React, { useReducer } from "react";
import "../css/create.css";
import { createMovie } from "../data/repository";

// new reducer for storing all movie data including sessiontimes
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

// initialise the state variables
const initialState = {
    movie_name: '',
    movie_image: '',
    sessiontimes: [],
};

const CreateMovie = () => {
    // retrieve reducer from context
    const [state, dispatcher] = useReducer(createReducer, initialState);

    // when movie name input is changed update state
    const handleName = (e) => {
        dispatcher({ type: 'NAME', payload: e.target.value });
    }
    
    // when movie image input is changed update state
    const handleImage = (e) => {
        dispatcher({ type: 'IMAGE', payload: e.target.value });
    }

    // when create is clicked, create the movie in the database
    const handleCreate = async (e) => {
        try {
            // get a response from the backend
            const response = await createMovie(state.movie_name, state.movie_image, state.sessiontimes);
            
            // alert the user of the response
            alert(response.message);
        } catch (error) {
            // if something went wrong alert the user
            alert("Error:", error);
        }
    }

    // when create session button is clicked, add a new session to the state
    const createSession = (e) => {
        e.preventDefault(); // prevent page reload

        // construct new session from inputs
        const session = {
            sessiontime_time: e.target[0].value,
            sessiontime_day: e.target[1].value,
            sessiontime_available_seats: parseInt(e.target[2].value) // important to parse as int
        }

        // update state
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