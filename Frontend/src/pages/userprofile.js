import React, {useEffect, useState} from "react";
import '../css/userprofile.css'
import { useNavigate } from "react-router-dom";
import { findUser, deleteUser, findUserByEmail, getTicketByEmail } from "../data/repository";


//TODO: styling
//TODO: add in confirmation fo deletion



const UserProfile = (props) => {

    const [user, setUser] = useState({});
    const [tickets, setTickets] = useState([]);

    useEffect(() => {
        const getData = async () => {
            try {
                const email = JSON.parse(localStorage.getItem("loggedUser")).email;
                const fetchedUser = await findUserByEmail(email);
                setUser(fetchedUser);
                const tickets = await getTicketByEmail(email);
                setTickets(tickets);
            } catch {
                console.log("error fetching user, using test user instead")
                const testUser = {
                    name: "June",
                    email: "s3947118@student.rmit.edu.au",
                    joined: "10/10/23"
                }
                setUser(testUser);
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

    return (
        <div className = "page">
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
                        <div className="ticket-list">
                            {/* map tickets */}
                            {tickets.map((ticket, index) => (
                                <div key={index} className="ticket">
                                <h3 className = "ticketmovie">{ticket.movie}</h3>
                                <div className="details">
                                    <p className="quantity">{ticket.ticket_quantity} seats</p>
                                    <p className="day">{ticket.ticket_day}</p>
                                    <p className="time">{ticket.ticket_time}</p>
                                </div>
                                </div>
                            ))}
                            </div>

            </div>
        </div>
        );
};

export default UserProfile;