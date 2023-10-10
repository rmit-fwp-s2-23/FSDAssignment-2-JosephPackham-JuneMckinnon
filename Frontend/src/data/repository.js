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
    return response.data;
}
    
async function updateUser(id, user) {
    const response = await axios.put(API_HOST + `/api/users/${id}`, user);

    return response.data;
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
};



