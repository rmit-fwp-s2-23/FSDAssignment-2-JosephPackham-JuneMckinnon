import {Route, Routes} from "react-router-dom"; //import Route and Routes components from react-router-dom
import LandingPage from "../pages/landingpage"; //import LandingPage component
import SignIn from "../pages/signin"; //import SignIn component
import SignUp from "../pages/signup"; //import SignUp component
import UserProfile from "../pages/userprofile"; //import UserProfile component
import Signout from "../pages/signout";    //import Signout component
import EditProfile from "../pages/editprofile"; //import EditProfile component
import Reviews from "../pages/reviews";
import TicketReservation from "../pages/ticketreservation";

const Routing = (props) => { 
    return(
        <Routes> {/* Routes component contains all the routes for the app */}
            <Route path="/" element={<LandingPage user = {props.user} movie = {props.movie} setMovie = {props.setMovie} day = {props.day} setDay = {props.setDay}/>}/> {/* if path is /, render LandingPage component */}
            <Route path = "/signin" element = {<SignIn user = {props.user} setUser = {props.setUser}/>}/> {/* if path is /signin, render SignIn component */}
            <Route path="/signup" element={<SignUp user = {props.user} setUser = {props.setUser}/>} /> {/* if path is /signup, render SignUp component */}
            <Route path="/userprofile" element={<UserProfile user = {props.user} setUser = {props.setUser}/>} /> {/* if path is /userprofile, render UserProfile component */}
            <Route path="/signout" element={<Signout user = {props.user} setUser = {props.setUser}/>} /> {/* if path is /signout, render Signout component */}
            <Route path = "/editprofile" element = {<EditProfile user = {props.user} setUser = {props.setUser}/>}/> {/* if path is /editprofile, render EditProfile component */}
           
            <Route path  = "/reviews" element = {<Reviews user = {props.user} setUser = {props.setUser} movie = {props.movie} setMovie = {props.setMovie}/>}/> {/* if path is /review, render Review component */}
            <Route path = "/ticket" element = {<TicketReservation user = {props.user} setUser = {props.setUser} movie = {props.movie} setMovie = {props.setMovie} day = {props.day} setDay = {props.setDay}/>}/> {/* if path is /ticket, render TicketReservation component */}
        </Routes>
        );
    };

export default Routing;
    