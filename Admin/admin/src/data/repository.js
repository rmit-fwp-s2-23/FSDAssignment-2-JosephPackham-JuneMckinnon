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

async function getMovies() {
    const query = gql`
        {
            all_movies {
                movie_name,
                movie_image,
                sessiontimes {
                    sessiontime_id
                    sessiontime_time
                    sessiontime_day
                    sessiontime_available_seats
                }
            }
        }
    `;

    const data = await request(GRAPH_QL_URL, query);
    return data.all_movies;
}

async function updateMovie(movie_name, movie_image) {
    const mutation = gql`
        mutation UpdateMovie($input: MovieInput) {
            update_movie(input: $input) {
                success
                message
            }
        }
    `;
  
    const data = await request(GRAPH_QL_URL, mutation, {
        input: {
            movie_name: movie_name,
            movie_image: movie_image
        }
    });
  
    return data.update_movie;
}

async function getReviewsByMovie(movie_name) {
    const query = gql`
      query GetReviews($movieName: String!) {
        all_reviews(movie: $movieName) {
          author_name
          review_rating
          review_text
          review_date
        }
      }
    `;
  
    const variables = { movieName: movie_name }; // Define the variable here
  
    const data = await request(GRAPH_QL_URL, query, variables);
    return data.all_reviews;
}

async function deleteReviewById(review_id) {
    const mutation = gql`
        mutation DeleteReview($reviewID: Int) {
            delete_review(review_id: $reviewID) {
                success
                message
            }
        }
    `;

    const data = await request(GRAPH_QL_URL, mutation, {
        reviewID: review_id
    });

    return data.delete_review;
}

async function updateSessionById(id, time, day, seats) {
    const mutation = gql`
        mutation UpdateSession($sessionID: Int, $sessionTime: String, $sessionDay: String, $sessionSeats: Int) {
            update_sessiontime(input: {
                sessiontime_id: $sessionID,
                sessiontime_time: $sessionTime,
                sessiontime_day: $sessionDay,
                sessiontime_available_seats: $sessionSeats
            }) {
                success
                message
            }
        }
    `;

    const data = await request(GRAPH_QL_URL, mutation, {
        sessionID: id,
        sessionTime: time,
        sessionDay: day,
        sessionSeats: seats
    });

    return data.update_sessiontime;
}

async function reviewCountByMovie(movie_name) {
    const query = gql`
        query GetCount($movie: String) {
            reviews_count(movie: $movie)
        }
    `;

    const data = await request(GRAPH_QL_URL, query, {
        movie: movie_name
    });

    return data.reviews_count;
}

async function getTickets() {
    const query = gql`
        {
            all_tickets {
                ticket_id,
                movie,
                createdAt
            }
        }
    `;

    const data = await request(GRAPH_QL_URL, query);
    return data.all_tickets;
}

async function createMovie(movie, sessiontimes) {
    const mutation = gql`
        mutation CreateMovie($input: MovieInput) {
            create_movie(input: $input) {
                success
                message
            }
        }
    `;

    const data = request(GRAPH_QL_URL, mutation, {
        input: {
            movie_name: movie.movie_name,
            movie_image: movie.movie_image,
            session_times: sessiontimes.map(session => ({
                sessiontime_time: session.sessiontime_time,
                sessiontime_day: session.sessiontime_day,
                sessiontime_available_seats: session.sessiontime_available_seats,
            })),
          },
    });

    return data.create_movie;
}

export {
    getUsers, loginUser, setAdmin, setBlocked, 
    getMovies, updateMovie, createMovie,
    getReviewsByMovie, deleteReviewById, reviewCountByMovie,
    updateSessionById,
    getTickets
}