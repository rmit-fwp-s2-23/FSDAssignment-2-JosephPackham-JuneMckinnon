import React from "react";
import '../css/signinup.css'
import { useNavigate , useLocation} from "react-router";


const TicketReservation = (props) => {
    const location = useLocation();
    const movie = props.movie;
    const navigate = useNavigate();
    const session_day = props.day;

    return (
        <div>
            <p>{movie}</p>
            <p>{session_day}</p>
        </div>
    );



}

export default TicketReservation;