const db = require("../database");

// Select all posts from the database.
exports.all = async (req, res) => {
  const reviews = await db.post.findAll();

  // Can use eager loading to join tables if needed, for example:
  // const posts = await db.post.findAll({ include: db.user });

  // Learn more about eager loading here: https://sequelize.org/master/manual/eager-loading.html

  res.json(reviews);
};

// Create a post in the database.
exports.create = async (req, res) => {
  const reviews = await db.reviews.create({
    author_name: req.body.author_name,
    author_email: req.body.author_email,
    title: req.body.title,
    content: req.body.content,
    date: new Date()
    
  });

  res.json(post);
};
