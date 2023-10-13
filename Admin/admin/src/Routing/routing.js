import {Route, Routes} from "react-router-dom"; //import Route and Routes components from react-router-dom
import Login from "../pages/login";
import Home from "../pages/home";
import Test from "../pages/test";

const Routing = (props) => { 
    return (
        <Routes>
            <Route path = "/" element = { <Login /> } />
            <Route path = "/home" element = { <Home /> } />
            <Route path = "/test" element = { <Test /> } />
        </Routes>
    );
};

export default Routing;
    