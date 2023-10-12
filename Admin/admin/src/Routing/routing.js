import {Route, Routes} from "react-router-dom"; //import Route and Routes components from react-router-dom
import Login from "../pages/login";
import Home from "../pages/home";

const Routing = (props) => { 
    return (
        <Routes>
            <Route path = "/" element = { <Login /> } />
            <Route path = "/home" element = { <Home /> } />
        </Routes>
    );
};

export default Routing;
    