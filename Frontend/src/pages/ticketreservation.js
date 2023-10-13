import React from "react";
import { useState, useEffect } from "react";
import '../css/signinup.css'
import { useNavigate , useLocation} from "react-router";
import { getSessionTimeByDay, updateSessionTime, updateAvailableSeats } from "../data/repository";
import '../css/ticketreservation.css'


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
            console.log(response);
        }
        fetchData();
    }, []);

    //handle seat availability
    const handleSeatAvailability = async (available_seats, seats, id) => {
        if(seats > available_seats){
            alert("There are not enough seats available");
        }
        else{
            let newAvailableSeats = available_seats - seats;
            console.log('Available seats: ' + available_seats + ' seats: ' + seats + ' new available seats: ' + newAvailableSeats);

            await updateAvailableSeats(id, newAvailableSeats);
            window.location.reload();
            
        }
    }

    //handle reservation
    const handleReservation = (time, available_seats,id) => {
        
        console.log("time: " + time + " available seats: " + available_seats + " id: " + id);
        let seats = prompt("How many seats would you like to reserve?");
        console.log(seats);
        if(!seats){
            alert("Please enter a number");
        }
        else{
            let error = handleSeatAvailability(available_seats, seats, id);
        }
    }

    


    return (
        <div className="page">
            <h1>Session times for {movie} on {session_day.replace(/-/g, '/')}</h1>
            <div >
                {sessionTimes.map((sessiontime) => (
                    <div>
                        <h3>{sessiontime.sessiontime_time}</h3>
                        <h3>{sessiontime.sessiontime_available_seats} seats available</h3>
                        <button onClick={() => handleReservation(sessiontime.sessiontime_time, sessiontime.sessiontime_available_seats, sessiontime.sessiontime_id)}>Reserve</button>
                    </div>
                ))}
                </div>
        </div>
    );



}

export default TicketReservation;