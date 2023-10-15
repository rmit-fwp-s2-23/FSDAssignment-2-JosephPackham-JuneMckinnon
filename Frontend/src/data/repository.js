import axios from "axios";

// --- Constants ----------------------------------------------------------------------------------
// Define the API host URL and the user key for localStorage
const API_HOST = "http://localhost:4000";
const USER_KEY = "user";

// --- User ----------------------------------------------------------------------------- 
// Find a user by ID
async function findUser(id) {
    const response = await axios.get(API_HOST + `/api/users/select/${id}`);

    return response.data;
}

// Verify a user's email and password
async function verifyUser(email, password) {
    const response = await axios.get(API_HOST + "/api/users/login", { params: { email, password } });
    const user = response.data;
    
    return user;
}

// Find a user by email
async function findUserByEmail(email) {
    const response = await axios.get(API_HOST + `/api/users/select/${email}`);

    return response.data;
}

// Get all users
async function getAllUsers() {
    const response = await axios.get(API_HOST + "/api/users");

    return response.data;
}

// Create a new user
async function createUser(user) {
    const response = await axios.post(API_HOST + "/api/users", user);

    return response.data;
}

// Delete a user by ID
async function deleteUser(id) {
    const response = await axios.delete(API_HOST + `/api/users/${id}`); 
    return response.status;
}
    
// Update a user's information
async function updateUser(email, updateData) {
    const response = await axios.put(API_HOST + `/api/users/update`, {
        name: updateData.name,
        email: email,
        old_password: updateData.old_password,
        new_password: updateData.new_password
    });
    console.log(response);
    return response.status;
}

// --- Reviews ----------------------------------------------------------------------------- 
// Create a new review
async function createReview(review) {
    const response = await axios.post(API_HOST + "/api/reviews", review);

    return response.data;
}

// Get all reviews for a given movie
async function getReviewsByMovie(movie) {
    const response = await axios.get(API_HOST + `/api/reviews/${movie}`);

    return response.data;
}

// Delete a review by ID
async function deleteReview(review_id) {
    const response = await axios.delete(API_HOST + `/api/reviews/${review_id}`); 
    return response.data;
}

// Update a review's information
async function updateReview(review_id, review) {
    const response = await axios.put(API_HOST + `/api/reviews/${review_id}`, review);

    return response.data;
}

// --- Movies -----------------------------------------------------------------------------------
// Get all movies
async function getAllMovies() {
    const response = await axios.get(API_HOST + "/api/movies");

    return response.data;
}

// Get a movie by name
async function getMovie(movie_name) {
    const response = await axios.get(API_HOST + `/api/movies/${movie_name}`);

    return response.data;
}

// Create a new movie
async function createMovie(movie) {
    const response = await axios.post(API_HOST + "/api/movies", movie);

    return response.data;
}

// Delete a movie by ID
async function deleteMovie(movie_id) {
    const response = await axios.delete(API_HOST + `/api/movies/${movie_id}`);

    return response.data;
}

// Update a movie's information
async function updateMovie(movie_id, movie) {
    const response = await axios.put(API_HOST + `/api/movies/${movie_id}`, movie);

    return response.data;
}

// --- Session Times ----------------------------------------------------------------------------------
// Get all session times
async function getAllSessionTimes() {
    const response = await axios.get(API_HOST + "/api/sessiontimes");

    return response.data;
}

// Get a session time by ID
async function getSessionTime(sessiontime_id) {
    const response = await axios.get(API_HOST + `/api/sessiontimes/id/${sessiontime_id}`);

    return response.data;
}

// Get all session times for a given movie
async function getSessionTimeByMovie(movie) {
    const response = await axios.get(API_HOST + `/api/sessiontimes/movie/${movie}`);

    return response.data;
}

// Get all session times for a given day and movie
async function getSessionTimeByDay(sessiontime_day, movie) {
    const response = await axios.get(API_HOST + `/api/sessiontimes/day/${sessiontime_day}/${movie}`);

    return response.data;
}

// Create a new session time
async function createSessionTime(sessiontime) {
    const response = await axios.post(API_HOST + "/api/sessiontimes", sessiontime);

    return response.data;
}

// Delete a session time by ID
async function deleteSessionTime(sessiontime_id) {
    const response = await axios.delete(API_HOST + `/api/sessiontimes/${sessiontime_id}`);

    return response.data;
}

// Update a session time's information
async function updateSessionTime(sessiontime_id, sessiontime) {
    const response = await axios.put(API_HOST + `/api/sessiontimes/${sessiontime_id}`, sessiontime);

    return response.data;
}

// Update the available seats for a session time
async function updateAvailableSeats(sessiontime_id, sessiontime_available_seats) {
    const response = await axios.put(API_HOST + `/api/sessiontimes/availableseats/${sessiontime_id}`, {sessiontime_available_seats});

    return response.data;
}

// --- Tickets ----------------------------------------------------------------------------------
// Get all tickets
async function getAllTickets() {
    const response = await axios.get(API_HOST + "/api/tickets");

    return response.data;
}

// Get a ticket by movie name
async function getTicket(movie) {
    const response = await axios.get(API_HOST + `/api/tickets/movie/${movie}`);

    return response.data;
}

// Get a ticket by email
async function getTicketByEmail(email) {
    const response = await axios.get(API_HOST + `/api/tickets/email/${email}`);

    return response.data;
}

// Create a new ticket
async function createTicket(ticket) {
    const response = await axios.post(API_HOST + "/api/tickets", ticket);

    return response.data;
}

// Delete a ticket by ID
async function deleteTicket(ticket_id) {
    const response = await axios.delete(API_HOST + `/api/tickets/${ticket_id}`);

    return response.data;
}

// Update a ticket's information
async function updateTicket(ticket_id, ticket) {
    const response = await axios.put(API_HOST + `/api/tickets/${ticket_id}`, ticket);

    return response.data;
}

// --- Exports ----------------------------------------------------------------------------------
// Export all functions as named exports
export {
    findUser,
    createUser,
    deleteUser,
    updateUser,
    getAllUsers,
    findUserByEmail,
    verifyUser,
    createReview,
    getReviewsByMovie,
    deleteReview,
    updateReview,
    getAllMovies,
    getMovie,
    createMovie,
    deleteMovie,
    updateMovie,
    getAllSessionTimes,
    getSessionTime,
    getSessionTimeByMovie,
    getSessionTimeByDay,
    createSessionTime,
    deleteSessionTime,
    updateSessionTime,
    updateAvailableSeats,
    getAllTickets,
    getTicket,
    getTicketByEmail,
    createTicket,
    deleteTicket,
    updateTicket,
};