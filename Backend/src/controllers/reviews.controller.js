const db = require("../database");

// Select all posts from the database.
exports.all = async (req, res) => {
  const reviews = await db.reviews.findAll();

  // Can use eager loading to join tables if needed, for example:
  // const posts = await db.post.findAll({ include: db.user });

  // Learn more about eager loading here: https://sequelize.org/master/manual/eager-loading.html

  res.json(reviews);
};

// Create a post in the database.
exports.create = async (req, res) => {
  console.log(req.body);
  const reviews = await db.reviews.create({
    author_name: req.body.author_name,
    author_email: req.body.author_email,
    review_rating: req.body.review_rating,
    review_text: req.body.review_text,
    review_date: new Date()
  
  });

  res.json(reviews);
};
