const { buildSchema } = require("graphql");
const db = require("../database");
const argon2 = require("argon2");

const graphql = { };

// GraphQL.
// Construct a schema, using GraphQL schema language
graphql.schema = buildSchema(`
	# The GraphQL types are declared first.

	type User {
		email: String,
		name: String,
		password_hash: String
		joined: String,
	}

	# The input type can be used for incoming data.
	input UserInput {
		email: String,
		first_name: String,
		last_name: String,
		joined: String
	}

	# Queries (read-only operations).
	type Query {
		all_users: [User],
		user(email: String): User,
		user_exists(email: String): Boolean
	}

	# Mutations (modify data in the underlying data-source, i.e., the database).
	type Mutation {
		create_user(input: UserInput): User,
		update_user(input: UserInput): User,
		delete_user(email: String): Boolean,
		verify_user(email: String, password: String): AuthResponse
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

	// Mutations.
	create_user: async (args) => {
		const user = await db.user.create(args.input);

		return user;
	},
	update_user: async (args) => {
		const user = await db.user.findByPk(args.input.email);
	
		// Update owner fields.
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
	verify_user: async (args) => {
		const user = await db.user.findByPk(args.email);
  
		if(!user) {
			return {
				success: false,
				message: "User not found"
			}
		} else if (await argon2.verify(user.password_hash, args.password) === false) {
			return {
				success: false,
				message: "Incorrect password"
			}
		} else {
			return {
				success: true,
				message: "Login Success"
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
