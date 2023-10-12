import React from "react";
import { useState, useEffect } from "react";
import '../css/signinup.css'
import { useNavigate , useLocation} from "react-router";
import { getSessionTimeByDay } from "../data/repository";


const TicketReservation = (props) => {
    const location = useLocation();
    const movie = props.movie;
    const navigate = useNavigate();
    const session_day = props.day;
    

    //get sessiontimes by movie and day
    const [sessionTimes, setSessionTimes] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const response = await getSessionTimeByDay(session_day, movie);
            setSessionTimes(response);
        }
        fetchData();
    }, []);

    


    return (
        <div>
            <h1>Session times for {movie} on {session_day.replace(/-/g, '/')}</h1>
        </div>
    );



}

export default TicketReservation;