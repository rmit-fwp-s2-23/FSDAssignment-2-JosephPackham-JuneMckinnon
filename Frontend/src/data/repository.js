import axios from "axios";

// --- Constants ----------------------------------------------------------------------------------
const API_HOST = "http://localhost:4000";
const USER_KEY = "user";

// --- User -----------------------------------------------------------------------------
async function findUser(id) {
    const response = await axios.get(API_HOST + `/api/users/select/${id}`);

    return response.data;
}

//verify user
async function verifyUser(email, password) {
    const response = await axios.get(API_HOST + "/api/users/login", { params: { email, password } });
    const user = response.data;
    
    return user;
  }


//get user by email
async function findUserByEmail(email) {
    const response = await axios.get(API_HOST + `/api/users/select/${email}`);

    return response.data;
}

async function getAllUsers() {
    const response = await axios.get(API_HOST + "/api/users");

    return response.data;
}

async function createUser(user) {
    const response = await axios.post(API_HOST + "/api/users", user);

    return response.data;
}

async function deleteUser(id) {
    const response = await axios.delete(API_HOST + `/api/users/${id}`); 
    return response.status;
}
    
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
//create a review
async function createReview(review) {
    const response = await axios.post(API_HOST + "/api/reviews", review);

    return response.data;
}

//get reviews by movie name
async function getReviewsByMovie(movie) {
    const response = await axios.get(API_HOST + `/api/reviews/${movie}`);

    return response.data;
    
}

//delete review
async function deleteReview(review_id) {
    const response = await axios.delete(API_HOST + `/api/reviews/${review_id}`); 
    return response.data;
}
//update review
async function updateReview(review_id, review) {
    const response = await axios.put(API_HOST + `/api/reviews/${review_id}`, review);

    return response.data;
}

// --- Movies -----------------------------------------------------------------------------------
// get all movies
async function getAllMovies() {
    const response = await axios.get(API_HOST + "/api/movies");

    return response.data;
}

// get movie by movie name
async function getMovie(movie_name) {
    const response = await axios.get(API_HOST + `/api/movies/${movie_name}`);

    return response.data;
}

// create a movie
async function createMovie(movie) {
    const response = await axios.post(API_HOST + "/api/movies", movie);

    return response.data;
}

// delete a movie
async function deleteMovie(movie_id) {
    const response = await axios.delete(API_HOST + `/api/movies/${movie_id}`);

    return response.data;
}

// update a movie
async function updateMovie(movie_id, movie) {
    const response = await axios.put(API_HOST + `/api/movies/${movie_id}`, movie);

    return response.data;
}

// --- Session Times ----------------------------------------------------------------------------------
// get all session times
async function getAllSessionTimes() {
    const response = await axios.get(API_HOST + "/api/sessiontimes");

    return response.data;
}

// get session time by movie name
async function getSessionTime(movie) {
    const response = await axios.get(API_HOST + `/api/sessiontimes/${movie}`);

    return response.data;
}

// create a session time
async function createSessionTime(sessiontime) {
    const response = await axios.post(API_HOST + "/api/sessiontimes", sessiontime);

    return response.data;
}

// delete a session time
async function deleteSessionTime(sessiontime_id) {
    const response = await axios.delete(API_HOST + `/api/sessiontimes/${sessiontime_id}`);

    return response.data;
}

// update a session time
async function updateSessionTime(sessiontime_id, sessiontime) {
    const response = await axios.put(API_HOST + `/api/sessiontimes/${sessiontime_id}`, sessiontime);

    return response.data;
}

// get session times by day and movie name
async function getSessionTimeByDay(day, movie) {
    const response = await axios.get(API_HOST + `/api/sessiontimes/${movie}/${day}`);

    return response.data;
}

// --- Tickets ----------------------------------------------------------------------------------
// get all tickets
async function getAllTickets() {
    const response = await axios.get(API_HOST + "/api/tickets");

    return response.data;
}

// get ticket by movie name
async function getTicket(movie) {
    const response = await axios.get(API_HOST + `/api/tickets/${movie}`);

    return response.data;
}

// get ticket by email
async function getTicketByEmail(email) {
    const response = await axios.get(API_HOST + `/api/tickets/${email}`);

    return response.data;
}

// create a ticket
async function createTicket(ticket) {
    const response = await axios.post(API_HOST + "/api/tickets", ticket);

    return response.data;
}

// delete a ticket
async function deleteTicket(ticket_id) {
    const response = await axios.delete(API_HOST + `/api/tickets/${ticket_id}`);

    return response.data;
}

// update a ticket
async function updateTicket(ticket_id, ticket) {
    const response = await axios.put(API_HOST + `/api/tickets/${ticket_id}`, ticket);

    return response.data;
}

// --- Exports ----------------------------------------------------------------------------------








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
    createSessionTime,
    deleteSessionTime,
    updateSessionTime,
    getSessionTimeByDay,
    getAllTickets,
    getTicket,
    getTicketByEmail,
    createTicket,
    deleteTicket,
    updateTicket
    
};



