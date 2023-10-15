// imports
import React, { createContext, useReducer } from 'react';
import {BrowserRouter} from "react-router-dom";
import AdminRouting from "./Routing/routing.js";
import "./index.css";

// logincontext keeps track of logged in state
export const LoginContext = createContext();

const App = () => {
    // loginreducer runs login, keeping track of variables, functions and states
    const loginReducer = (prevState, action) => {
        switch (action.type) {
            // set email
            case 'EMAIL':
                return {
                    ...prevState,
                    email: action.payload,
                };
            // set password
            case 'PASSWORD':
                return {
                    ...prevState,
                    password: action.payload,
                };
            // currently logging in
            case 'LOGGED_IN':
                return {
                    ...prevState,
                    isLoggedIn: true,
                };
            // log out
            case 'LOGGED_OUT':
                return {
                    ...prevState,
                    isLoggedIn: false,
                    username: '',
                    password: '',
                };
            // currently waiting on logging in
            case 'LOADING':
                return {
                    ...prevState,
                    isLoading: true,
                };
            // not waiting on log in
            case 'NOT_LOADING':
                return {
                    ...prevState,
                    isLoading: false,
                };
            // error has occured in log in
            case 'ERROR':
                return {
                    ...prevState,
                    isError: true,
                    isLoading: false,
                };
            default:
                break;
        }
    };
    
    // define default values for reducer
    const initialState = {
        email: '',
        password: '',
        isLoggedIn: false,
        isLoading: false,
        isError: false,
    };

    const [state, dispatcher] = useReducer(loginReducer, initialState);
    return (
        <LoginContext.Provider value = {{ state, dispatcher }}>
            <BrowserRouter>
                <AdminRouting />
            </BrowserRouter>
        </LoginContext.Provider>
    );
};

export default App; //export app component to be used in index.js

//data to add to readme below

//<a href="https://www.flaticon.com/free-icons/cinema" title="cinema icons">Cinema icons created by Freepik - Flaticon</a>
//<a href="https://www.flaticon.com/free-icons/cinema" title="cinema icons">Cinema icons created by Freepik - Flaticon</a>
//https://www.w3schools.com/css/tryit.asp?filename=trycss_grid
//https://www.w3schools.com/css/tryit.asp?filename=trycss_link_advanced2