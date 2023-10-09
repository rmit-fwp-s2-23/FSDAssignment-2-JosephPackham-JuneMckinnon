import axios from "axios";

// --- Constants ----------------------------------------------------------------------------------
const API_HOST = "http://localhost:4000";
const USER_KEY = "user";

// --- User -----------------------------------------------------------------------------
async function findUser(id) {
    const response = await axios.get(API_HOST + `/api/users/select/${id}`);

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
    
async function updateUser(id, user) {
    const response = await axios.put(API_HOST + `/api/users/${id}`, user);

    return response.data;
}





// --- Reviews -----------------------------------------------------------------------------

export {
    findUser,
    createUser,
    deleteUser,
    updateUser,
    getAllUsers,
};



