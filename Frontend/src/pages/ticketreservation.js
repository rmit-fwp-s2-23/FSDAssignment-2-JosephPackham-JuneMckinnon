import React from "react";
import { useState, useEffect } from "react";
import '../css/signinup.css'
import { useNavigate} from "react-router";
import { getSessionTimeByDay, updateSessionTime, updateAvailableSeats, createTicket } from "../data/repository";
import '../css/ticketreservation.css'

//Ticket reservation page

const TicketReservation = (props) => {
    
    const movie = props.movie; //get movie from props
    const navigate = useNavigate(); //used to navigate to different pages
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
            return;
        }
        else{
            let newAvailableSeats = available_seats - seats;
            console.log('Available seats: ' + available_seats + ' seats: ' + seats + ' new available seats: ' + newAvailableSeats);

            await updateAvailableSeats(id, newAvailableSeats);
            window.location.reload();
            return true;
            
        }
    }

    //handle reservation
    const handleReservation = async (time, available_seats,id) => {
        if (props.user === null){
            alert("Please sign in to reserve a ticket");
            return;
        }
        else if (available_seats === 0){
            alert("Sorry this session is fully booked");
            return;
        }
        
        
        let seats = prompt("How many seats would you like to reserve?");
        if(!seats){
            alert("Please enter a number");
            
        }
        else{
            const seatAvailability = await handleSeatAvailability(available_seats, seats, id);
            if (seatAvailability === false){
                alert("There are not enough seats available");
                return;
            } else {
                const ticket = {
                movie: movie,
                author_name: props.user.name,
                author_email: props.user.email,
                ticket_quantity: seats,
                ticket_day: props.day,
                ticket_time: time}
                //add reservation to database
            await createTicket(ticket);


            alert("You have reserved " + seats + " seats for " + time);
            

            }

            

            
        }
    }

    


    return (
        <div className="ticketpage">
            <div className="ticketpagecontent">
            <h1 className="sessionpageHeading">Session times for {movie} on {session_day.replace(/-/g, '/')}</h1>
            <div className = "SessionTimes">
                {sessionTimes.map((sessiontime) => (
                    <div className="small-background" >
                        <h2>Time: {sessiontime.sessiontime_time}</h2>
                        <p>{sessiontime.sessiontime_available_seats} seats available</p>
                        <button className = 'button' onClick={() => handleReservation(sessiontime.sessiontime_time, sessiontime.sessiontime_available_seats, sessiontime.sessiontime_id)}>Reserve</button>
                    </div>
                ))}
                </div>
        </div>
        </div>
    );



}

export default TicketReservation;