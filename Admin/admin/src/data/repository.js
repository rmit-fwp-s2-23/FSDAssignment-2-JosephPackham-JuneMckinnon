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

export {
    getUsers
}