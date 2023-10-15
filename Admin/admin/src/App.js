import React, { createContext, useReducer } from 'react'; //import react to use react components
import {BrowserRouter} from "react-router-dom"; //import BrowserRouter to use routing
import AdminRouting from "./Routing/routing.js";
import "./index.css";

export const LoginContext = createContext();

const App = () => {
    const loginReducer = (prevState, action) => {
        switch (action.type) {
            case 'EMAIL':
                return {
                    ...prevState,
                    email: action.payload,
                };
            case 'PASSWORD':
                return {
                    ...prevState,
                    password: action.payload,
                };
            case 'LOGGED_IN':
                return {
                    ...prevState,
                    isLoggedIn: true,
                };
            case 'LOGGED_OUT':
                return {
                    ...prevState,
                    isLoggedIn: false,
                    username: '',
                    password: '',
                };
            case 'LOADING':
                return {
                    ...prevState,
                    isLoading: true,
                };
            case 'NOT_LOADING':
                return {
                    ...prevState,
                    isLoading: false,
                };
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