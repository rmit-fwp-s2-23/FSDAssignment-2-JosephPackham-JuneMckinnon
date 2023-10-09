const db = require("../database");
const argon2 = require("argon2");

// Select all users from the database.
exports.all = async (req, res) => {
  const users = await db.user.findAll();

  res.json(users);
};

// Select one user from the database.
exports.one = async (req, res) => {
  const user = await db.user.findByPk(req.params.id);

  res.json(user);
};

// Select one user from the database if username and password are a match.
exports.login = async (req, res) => {
  const user = await db.user.findByPk(req.query.username);

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
    joined: new Date()

  });

  res.json(user);
};

//delete a user from the database
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

//update a user in the database
exports.update = async (req, res) => {
  const user = await db.user.findByPk(req.params.id);
  user.name = req.body.name;
  user.email = req.body.email;
  user.password_hash = req.body.password_hash;

  await user.save();

  res.json(user);
}


