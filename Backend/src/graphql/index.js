const { buildSchema } = require("graphql");
const db = require("../database");
const argon2 = require("argon2");
const { GraphQLDate } = require('graphql-scalars');

const graphql = { };

// GraphQL.
// Construct a schema, using GraphQL schema language
graphql.schema = buildSchema(`
	# The GraphQL types are declared first.

	type User {
		email: String!,
		name: String!,
		password_hash: String,
		joined: String,
		blocked: Boolean,
		admin: Boolean
	}

	type Review {
		review_id: Int,
		movie: String,
		author_name: String,
		author_email: String,
		review_rating: Int,
		review_text: String,
		review_date: String
	}

	type Movie {
		movie_name: String
		movie_image: String
		sessiontimes: [SessionTime]
	}
	  
	type SessionTime {
		sessiontime_id: Int
		sessiontime_time: String
		sessiontime_day: String
		sessiontime_available_seats: Int
	}

	# The input type can be used for incoming data.
	input UserInput {
		email: String,
		first_name: String,
		last_name: String,
		joined: String,
		blocked: Boolean,
		admin: Boolean
	}

	input ReviewInput {
		review_id: Int,
		movie: String,
		author_name: String,
		author_email: String,
		review_rating: Int,
		review_text: String,
		review_date: String
	}

	input MovieInput {
		movie_name: String,
		movie_image: String,
		session_times: [SessionTimeInput]
	}

	input SessionTimeInput {
		sessiontime_id: Int,
		sessiontime_time: String,
		sessiontime_day: String,
		sessiontime_available_seats: Int
	  }

	# Queries (read-only operations).
	type Query {
		all_users: [User],
		user(email: String): User,
		user_exists(email: String): Boolean,
		all_reviews(movie: String): [Review],
		reviews_by_user(email: String): [Review],
		all_movies: [Movie],
		movie(movie_name: String): Movie
	}

	# Mutations (modify data in the underlying data-source, i.e., the database).
	type Mutation {
		create_user(input: UserInput): User,
		update_user(input: UserInput): User,
		delete_user(email: String): Boolean,
		create_review(input: ReviewInput): AuthResponse,
		update_review(input: ReviewInput): Review,
		delete_review(review_id: Int): AuthResponse,
		verify_user(email: String, password: String): AuthResponse,
		set_admin(email: String, admin: Boolean): AuthResponse,
		set_blocked(email: String, blocked: Boolean): AuthResponse,
		create_movie(input: MovieInput): AuthResponse,
		update_movie(input: MovieInput): AuthResponse,
		delete_movie(input: MovieInput): AuthResponse,
		update_sessiontime(input: SessionTimeInput): AuthResponse
	}

	type AuthResponse {
		success: Boolean,
		message: String
	}
`);

// The root provides a resolver function for each API endpoint.
graphql.root = {
	// Queries.
	all_users: async () => {
		return await db.user.findAll();
	},
	user: async (args) => {
		return await db.user.findByPk(args.email);
	},
	user_exists: async (args) => {
		const count = await db.user.count({ where: { email: args.email } });

		return count === 1;
	},
	all_reviews: async (args) => {
		const reviews = await db.reviews.findAll({ where: {movie: args.movie} });

		return reviews.map(review => ({
			...review.dataValues,
			review_date: review.review_date.toISOString()
		}));
	},
	reviews_by_user: async (args) => {
		const allReviews = await db.reviews.findAll();
		let userReviews = [];
		allReviews.forEach(review => {
			if (review.author_email === args.email) {
				userReviews.push(review);
			}
		});

		return userReviews;
	},
	all_movies: async () => {
		try {
		  	const movies = await db.movies.findAll({ include: { model: db.sessiontimes, as: "sessiontimes"} });
		  	return movies;
		} catch (error) {
		  	console.error(error);
		  	throw new Error('Error fetching movies with session times');
		}
	  },

	// Mutations.
	create_user: async (args) => {
		const user = await db.user.create(args.input);

		return user;
	},
	update_user: async (args) => {
		const user = await db.user.findByPk(args.input.email);
	
		user.name = args.input.name;
		user.email = args.input.email;

		await user.save();

		return user;
	},
	delete_user: async (args) => {
		const user = await db.user.findByPk(args.email);
	
		if(user === null)
			return false;

		await user.destroy();

		return true;
	},
	create_review: async (args) => {
		try {
			const review = await db.review.create(args.input);

			return {
				success: true,
				message: "Successfully created review"
			}
		} catch {
			return {
				success: false,
				message: "Error in creation"
			}
		}
	},
	update_review: async (args) => {
		try {
			const review = await db.review.findByPk(args.input.review_id);
	
			review.movie = args.input.movie;
			review.author_name = args.input.author_name;
			review.author_email = args.input.author_email;
			review.review_rating = args.input.review_rating;
			review.review_text = args.input.review_text;

			await review.save();

			return {
				success: true,
				message: "Successfully updated review"
			}
		} catch {
			return {
				success: false,
				message: "Error in updating"
			}
		}
	},
	delete_review: async (args) => {
		try {
			const review = await db.review.findByPk(args.review_id);
	
			if (review === null) {
				return {
					success: false,
					message: "Review not found"
				}
			}
	
			await review.destroy();
	
			return {
				success: true,
				message: "Review deleted"
			}
		} catch {
			return {
				success: false,
				message: "Error in deleting"
			}
		}
	},
	verify_user: async (args) => {
		const user = await db.user.findByPk(args.email);
  
		if(!user) {
			return {
				success: false,
				message: "User not found"
			}
		}

		if (await argon2.verify(user.password_hash, args.password) === false) {
			return {
				success: false,
				message: "Incorrect password"
			}
		}

		if (user.blocked === true) {
			return {
				success: false,
				message: "Blocked users cannot sign in"
			}
		}

		if (user.admin === false) {
			return {
				success: false,
				message: "You are not an admin"
			}
		}

		return {
			success: true,
			message: "Login Success"
		}

	},
	set_admin: async (args) => {
		try {
			const user = await db.user.findByPk(args.email);
			const allUsers = await db.user.findAll();

			// check number of admins in database
			let adminCount = 0;
			for (let i = 0; i < allUsers.length; i++) {
				if (allUsers[i].admin === true) {
					adminCount++;
				}
			}
			// if number of admins is 1 or less then you cannot remove admin
			if (adminCount <= 1 && args.admin === false) {
				return {
					success: false,
					message: "There needs to be 1 admin account"
				}
			}

			// if user is blocked they cannot be admin
			if (user.blocked === true) {
				return {
					success: false,
					message: "A blocked user cannot be admin"
				}
			}

			user.admin = args.admin;
			await user.save();

			return {
				success: true,
				message: "Admin status updated"
			}
		} catch (err) {
			return {
				success: false,
				message: "An error has occurred"
			}
		}
	},
	set_blocked: async (args) => {
		try {
			const user = await db.user.findByPk(args.email);

			if (user.admin === true) {
				return {
					success: false,
					message: "You cannot block an admin"
				}
			}

			user.blocked = args.blocked;
			await user.save();

			return {
				success: true,
				message: "User has been blocked"
			}
		} catch {
			return {
				success: false,
				message: "An error has occured"
			}
		}
	},
	create_movie: async (args) => {
		try {
			const movie = await db.movies.create(args.input);
			return {
				success: true,
				message: "Movie created"
			}
		} catch {
			return {
				success: false,
				message: "An error has occurred in creation"
			}
		}
	},
	update_movie: async (args) => {
		try {
			const movie = await db.movies.findByPk(args.input.movie_name);

			movie.movie_image = args.input.movie_image;
			movie.save();

			return {
				success: true,
				message: "Movie updated"
			}
		} catch (error) {
			return {
				success: false,
				message: error
			}
		}
	},
	delete_movie: async (args) => {
		try {
			const movie = await db.movies.findByPk(args.movie_name);

			await movie.destroy();

			return {
				success: true,
				message: "Movie deleted"
			}
		} catch {
			return {
				success: false,
				message: "Failed to delete movie"
			}
		}
	},
	update_sessiontime: async (args) => {
		try {
			const session = await db.sessiontimes.findByPk(args.input.sessiontime_id);

			session.sessiontime_time = args.input.sessiontime_time;
			session.sessiontime_day = args.input.sessiontime_day;
			session.sessiontime_available_seats = args.input.sessiontime_available_seats;

			await session.save();

			return {
				success: true,
				message: "Successfully updated session time"
			}
		} catch (error) {
			return {
				success: false,
				message: error
			}
		}
	}
};

module.exports = graphql;

// Below are some sample queries that can be used to test GraphQL in GraphiQL.
// Access the GraphiQL web-interface when the server is running here: http://localhost:4000/graphql
/*

{
	all_owners {
		email,
		first_name,
		last_name,
		pets {
			pet_id,
			name
		}
	}
}

{
	owner(email: "matthew@rmit.edu.au") {
		email,
		first_name,
		last_name
	}
}

{
	owner_exists(email: "matthew@rmit.edu.au")
}

mutation {
	create_owner(input: {
		email: "newuser@rmit.edu.au",
		first_name: "New",
		last_name: "User"
	}) {
		email,
		first_name,
		last_name
	}
}

mutation {
	update_owner(input: {
		email: "matthew@rmit.edu.au",
		first_name: "Matthew",
		last_name: "Bolger"
	}) {
		email,
		first_name,
		last_name
	}
}

mutation {
	delete_owner(email: "newuser@rmit.edu.au")
}

*/
