const db = require("../database");
const argon2 = require("argon2");

// Select all users from the database.
exports.all = async (req, res) => {
  const users = await db.user.findAll();

  res.json(users);
};

// Select one user from the database by ID.
exports.one = async (req, res) => {
  const user = await db.user.findByPk(req.params.id);

  res.json(user);
};

// Select one user from the database by email.
exports.oneByEmail = async (req, res) => {
  const user = await db.user.findByPk(req.query.email);

  res.json(user);
};

// Select one user from the database if email and password are a match.
exports.login = async (req, res) => {
  const user = await db.user.findByPk(req.query.email);
  
  if(user === null || await argon2.verify(user.password_hash, req.query.password) === false)
    // Login failed.
  
    res.json(null);
  else
    res.json(user);
};

// Create a user in the database.
exports.create = async (req, res) => {
  const hash = await argon2.hash(req.body.password, { type: argon2.argon2id });
  
  const user = await db.user.create({
    name: req.body.name,
    password_hash: hash,
    email: req.body.email,
    joined: new Date(),
    blocked: false,
    admin: false
  });

  res.json(user);
};

// Delete a user from the database by ID.
exports.delete = async (req, res) => {
  try {
    const user = await db.user.findByPk(req.params.id);

    if (!user) {
      res.status(400).json({ error: "User not found" });
    }

    await user.destroy();
    res.status(200).json({ message: "User deleted successfully" });

  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: "Internal server error" })
  }
}

// Update a user in the database by email.
exports.update = async (req, res) => {
  // fetch user from db
  const user = await db.user.findByPk(req.body.email);
  console.log(user, req.body.email);

  // check if the correct password was given
  if (await argon2.verify(user.password_hash, req.body.old_password) === false) {
    res.status(401).json({ message: "Incorrect password" });
  } else {
    // create new hashed password
    const hashed_password = await argon2.hash(req.body.new_password, { type: argon2.argon2id });

    // update user details
    user.name = req.body.name;
    user.password_hash = hashed_password;

    // save user to db
    await user.save();

    // return HTTP 200 ok response
    res.status(200).json({ message: "Successfully updated details" });
  }
}