import React, {useState} from 'react'; //import react to use react components
import './css/App.css';
import {BrowserRouter} from "react-router-dom"; //import BrowserRouter to use routing
import Routing from "./Routing/routing.js";
import Navbar from "./components/navbar.js";
import Header from "./components/header.js";
import Footer from './components/footer.js'; 

const App = () => { 
    //get user data from local storage and set user state to logged in user
    const [user, setUser] = useState( JSON.parse(localStorage.getItem('loggedUser'))); 
    //set movie title for reviews and ticket reservation
    const [movie, setMovie] = useState(localStorage.getItem('movie'));
    //set day for ticket reservation
    const [day, setDay] = useState();
    return (
        //return page with header, footer and routing
        <BrowserRouter>
        {/* use user as prop data for header and routing */}
            <Navbar user={user} setUser={setUser}  />
            <div className='page'> 
                <Routing user={user} setUser={setUser} movie={movie} setMovie={setMovie} day={day} setDay={setDay} />
            </div>
            <Footer />
        </BrowserRouter>
    );
};

export default App; //export app component to be used in index.js

//data to add to readme below

//<a href="https://www.flaticon.com/free-icons/cinema" title="cinema icons">Cinema icons created by Freepik - Flaticon</a>
//<a href="https://www.flaticon.com/free-icons/cinema" title="cinema icons">Cinema icons created by Freepik - Flaticon</a>
//https://www.w3schools.com/css/tryit.asp?filename=trycss_grid
//https://www.w3schools.com/css/tryit.asp?filename=trycss_link_advanced2