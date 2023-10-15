import React, {useEffect, useState} from "react";
import '../css/userprofile.css'
import { useNavigate } from "react-router-dom";
import { findUser, deleteUser, findUserByEmail, getTicketByEmail } from "../data/repository";


//TODO: styling
//TODO: add in confirmation fo deletion



const UserProfile = (props) => {

    const [user, setUser] = useState({}); // state for user data
    const [tickets, setTickets] = useState([]); // state for user's ticket reservations
    const [activeIndex, setActiveIndex] = useState(0); // state for the index of the currently displayed ticket reservation



    useEffect(() => {
        const getData = async () => {
            try {
                const email = JSON.parse(localStorage.getItem("loggedUser")).email; // get the email of the logged in user from local storage
                const fetchedUser = await findUserByEmail(email); // fetch the user data from the server using the email
                setUser(fetchedUser); // set the user state to the fetched user data
                const tickets = await getTicketByEmail(email); // fetch the user's ticket reservations from the server using the email
                setTickets(tickets); // set the ticket reservations state to the fetched ticket reservations
            } catch {
                console.log("error fetching user, using test user instead")
                const testUser = {
                    name: "June",
                    email: "s3947118@student.rmit.edu.au",
                    joined: "10/10/23"
                }
                setUser(testUser); // if there is an error fetching the user data, set the user state to a test user
            }
        }

        getData();
    }, [])

    const navigate = useNavigate(); //used to navigate to different pages
    const handleEdit = () => { //when edit button is clicked, navigate to edit profile page
        navigate('/editprofile');
    }
    
    const handleDelete = async (id) => { //when delete button is clicked, delete account
        if(window.confirm('Are you sure you want to delete your account?') === true){ //confirm deletion

            // delete user, and retreive the status from attempting this
            const deleteStatus = await deleteUser(id);

            if (deleteStatus === 500) { // HTTP 500 refers to a server error
                alert('Internal Server Error');
            } else if (deleteStatus === 404) { // HTTP 404 error not found
                alert('User not found')
            } else if (deleteStatus === 200) { // HTTP 204 success, no additional response sent
                alert('Account Deleted')
                navigate('/')
            }
        }
    }
    const handlePrevClick = () => { // when the "Prev" button is clicked, display the previous ticket reservation
        setActiveIndex((prevIndex) => (prevIndex === 0 ? tickets.length - 1 : prevIndex - 1));
      };
    
      const handleNextClick = () => { // when the "Next" button is clicked, display the next ticket reservation
        setActiveIndex((prevIndex) => (prevIndex === tickets.length - 1 ? 0 : prevIndex + 1));
      };
    return (
        <div className = "userprofilepage">
            <div className = "content">
                <div className = "background">
                    <div className = "user-profile">
                        <div id = "header">
                            {user.name}'s Profile
                        </div>
                        <br></br>
                        <div>
                        <div className = "small-background">
                            Username: {user.name}
                        </div>
                        <div className = "small-background">
                            Email: {user.email}
                        </div>
                        <div className = "small-background">
                            Joined: {user.joined}
                        </div>
                        <div className = "button-container">
                            <button className="button" id = 'edit' onClick = {handleEdit}>Edit</button>
                            <button className="button" id = 'delete' onClick = {handleDelete}>Delete</button>
                        </div>
                        </div>
                        </div> 
                                      
                        </div>
                        {tickets.length > 0 && ( // if the user has ticket reservations, display them
        <div className="ticket-container">
            <div id = "header">
                            Ticket Reservations
                        </div>
                        <br></br>
          <div className="ticket">
            <h3 className="ticketmovie">{tickets[activeIndex].movie}</h3>
            <div className="details">
              <p className="quantity">{tickets[activeIndex].ticket_quantity} seats</p>
              <p className="day">{tickets[activeIndex].ticket_day}</p>
              <p className="time">{tickets[activeIndex].ticket_time}</p>
            </div>
          </div>
          <div className="navigation">
            <button className="prev" onClick={handlePrevClick}>Prev</button>
            <button className="next" onClick={handleNextClick}>Next</button>
          </div>
        </div>
      )}
            </div>
        </div>
        );
};

export default UserProfile;