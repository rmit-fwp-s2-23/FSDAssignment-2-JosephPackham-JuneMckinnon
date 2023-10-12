import { request, gql } from "graphql-request";

const GRAPH_QL_URL = "http://localhost:4000/graphql";

async function getUsers() {
    const query = gql`
        {
            all_users {
                email,
                name,
                joined,
                password_hash
            }
        }
    `;

    const data = await request(GRAPH_QL_URL, query);

    return data.all_users;
}

async function loginUser(email, password) {
    const mutation = gql`
        mutation VerifyUser($email: String, $password: String) {
            verify_user(email: $email, password: $password) {
                success
                message
            }
        }
    `;

    const data = await request(GRAPH_QL_URL, mutation, {
        email: email,
        password: password
    });

    return data.verify_user;
}

export {
    getUsers, loginUser
}