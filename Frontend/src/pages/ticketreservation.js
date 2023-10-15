import React from "react";
import { useState, useEffect } from "react";
import '../css/signinup.css'
import { useNavigate} from "react-router";
import { getSessionTimeByDay, updateSessionTime, updateAvailableSeats, createTicket } from "../data/repository";
import '../css/ticketreservation.css'

//Ticket reservation page
const TicketReservation = (props) => {
    
    const movie = props.movie; // Get the selected movie from props
    const navigate = useNavigate(); // Used to navigate to different pages
    const session_day = props.day; // Get the selected day from props
    
    // Get session times by movie and day
    const [sessionTimes, setSessionTimes] = useState([]);

    useEffect(() => {
        async function fetchData() {
            // Fetch session times from the database using the selected movie and day
            const response = await getSessionTimeByDay(session_day, movie);
            // Update the sessionTimes state variable with the fetched session times
            setSessionTimes(response);
            console.log(response);
        }
        fetchData();
    }, []);

    // Handle seat availability
    const handleSeatAvailability = async (available_seats, seats, id) => {
        // Check if there are enough seats available for the reservation
        if(seats > available_seats){
            alert("There are not enough seats available");
            return;
        }
        else{
            // Calculate the new number of available seats after the reservation
            let newAvailableSeats = available_seats - seats;
            console.log('Available seats: ' + available_seats + ' seats: ' + seats + ' new available seats: ' + newAvailableSeats);

            // Update the available seats in the database
            await updateAvailableSeats(id, newAvailableSeats);
            
            return true;
        }
    }

    // Handle reservation
    const handleReservation = async (time, available_seats,id,e) => {
        // Check if the user is signed in
        if (props.user === null){
            alert("Please sign in to reserve a ticket");
            return;
        }
        // Check if there are any seats available for the selected session time
        else if (available_seats === 0){
            alert("Sorry this session is fully booked");
            return;
        }
        
        // Prompt the user to enter the number of seats they want to reserve
        let seats = prompt("How many seats would you like to reserve?");
        if(!seats){
            alert("Please enter a number");
        }
        // Check if the input is a number
        else if (isNaN(seats)){
            alert("Invalid input, please enter a number");
            return;
        }
        else{
            // Check if there are enough seats available for the reservation
            const seatAvailability = await handleSeatAvailability(available_seats, seats, id);
            if (seatAvailability === false){
                alert("There are not enough seats available");
                return;
            } else {
                // Create a ticket object with the reservation details
                const ticket = {
                movie: movie,
                author_name: props.user.name,
                author_email: props.user.email,
                ticket_quantity: seats,
                ticket_day: props.day,
                ticket_time: time
                }
                // Add the reservation to the database
                await createTicket(ticket).then(() => {
                    alert("Ticket reserved for " + movie + " on " + session_day.replace(/-/g, '/') + " at " + time + " for " + seats + " seats");
                    window.location.reload();
                });
                return;
            }
        }
    }

    // Render the component
    return (
        <div className="ticketpage">
            <div className="ticketpagecontent">
                {/* Display session times for the selected movie and day */}
                <h1 className="sessionpageHeading">Session times for {movie} on {session_day.replace(/-/g, '/')}</h1>
                <div className = "SessionTimes">
                    {sessionTimes.map((sessiontime) => (
                        <div className="small-background" >
                            {/* Display session time and available seats */}
                            <h2>Time: {sessiontime.sessiontime_time}</h2>
                            <p>{sessiontime.sessiontime_available_seats} seats available</p>
                            {/* Button to reserve seats for the session */}
                            <button className = 'button' onClick={(e) => handleReservation(sessiontime.sessiontime_time, sessiontime.sessiontime_available_seats, sessiontime.sessiontime_id,e)}>Reserve</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default TicketReservation;