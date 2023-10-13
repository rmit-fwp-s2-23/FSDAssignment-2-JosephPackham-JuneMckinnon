import { request, gql } from "graphql-request";

const GRAPH_QL_URL = "http://localhost:4000/graphql";

async function getUsers() {
    const query = gql`
        {
            all_users {
                email,
                name,
                joined,
                blocked,
                admin
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

async function setAdmin(email, admin) {
    const mutation = gql`
        mutation SetAdmin($email: String, $admin: Boolean) {
            set_admin(email: $email, admin: $admin) {
                success
                message
            }
        }
    `;

    const data = await request(GRAPH_QL_URL, mutation, {
        email: email,
        admin: admin
    });

    return data.set_admin;
}

async function setBlocked(email, blocked) {
    const mutation = gql`
        mutation SetBlocked($email: String, $blocked: Boolean) {
            set_blocked(email: $email, blocked: $blocked) {
                success
                message
            }
        }
    `;

    const data = await request(GRAPH_QL_URL, mutation, {
        email: email,
        blocked: blocked
    });

    return data.set_blocked;
}

export {
    getUsers, loginUser, setAdmin, setBlocked
}