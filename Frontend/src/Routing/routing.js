import {Route, Routes} from "react-router-dom"; //import Route and Routes components from react-router-dom
import LandingPage from "../pages/landingpage"; //import LandingPage component
import SignIn from "../pages/signin"; //import SignIn component
import SignUp from "../pages/signup"; //import SignUp component
import UserProfile from "../pages/userprofile"; //import UserProfile component
import Signout from "../pages/signout";    //import Signout component
import EditProfile from "../pages/editprofile"; //import EditProfile component
import OppenheimerReview from "../pages/reviewpages/oppenheimerreviews"; //import Review component
import AvengersReviews from "../pages/reviewpages/avengersreviews";
import Barbiereviews from "../pages/reviewpages/barbiereviews";
import LotrReviews from "../pages/reviewpages/lotrreviews";

const Routing = (props) => { 
    return(
        <Routes> {/* Routes component contains all the routes for the app */}
            <Route path="/" element={<LandingPage user = {props.user}/>} /> {/* if path is /, render LandingPage component */}
            <Route path = "/signin" element = {<SignIn user = {props.user} setUser = {props.setUser}/>}/> {/* if path is /signin, render SignIn component */}
            <Route path="/signup" element={<SignUp user = {props.user} setUser = {props.setUser}/>} /> {/* if path is /signup, render SignUp component */}
            <Route path="/userprofile" element={<UserProfile user = {props.user} setUser = {props.setUser}/>} /> {/* if path is /userprofile, render UserProfile component */}
            <Route path="/signout" element={<Signout user = {props.user} setUser = {props.setUser}/>} /> {/* if path is /signout, render Signout component */}
            <Route path = "/editprofile" element = {<EditProfile user = {props.user} setUser = {props.setUser}/>}/> {/* if path is /editprofile, render EditProfile component */}
            <Route path  = "/oppenheimerreview" element = {<OppenheimerReview user = {props.user} setUser = {props.setUser}/>}/> {/* if path is /review, render Review component */}
            <Route path  = "/avengersreview" element = {<AvengersReviews user = {props.user} setUser = {props.setUser}/>}/> {/* if path is /review, render Review component */}
            <Route path  = "/barbiereview" element = {<Barbiereviews user = {props.user} setUser = {props.setUser}/>}/> {/* if path is /review, render Review component */}
            <Route path  = "/lotrreview" element = {<LotrReviews user = {props.user} setUser = {props.setUser}/>}/> {/* if path is /review, render Review component */}
        </Routes>
        );
    };

export default Routing;
    
    