const db = require("../database");

// Select all reviews from the database.
exports.all = async (req, res) => {
  const reviews = await db.reviews.findAll();

  // Can use eager loading to join tables if needed, for example:
  // const reviews = await db.reviews.findAll({ include: db.user });

  // Learn more about eager loading here: https://sequelize.org/master/manual/eager-loading.html

  res.json(reviews);
};

// Create a review in the database.
exports.create = async (req, res) => {
  console.log(req.body);
  const reviews = await db.reviews.create({
    movie: req.body.movie,
    author_name: req.body.author_name,
    author_email: req.body.author_email,
    review_rating: req.body.review_rating,
    review_text: req.body.review_text,
    review_date: new Date()
  
  });

  res.json(reviews);
};

// Select reviews by movie name.
exports.one = async (req, res) => {
  const reviews = await db.reviews.findAll({
    where: {
      movie: req.params.movie
    }
  });

  res.json(reviews);
}

// Delete a review by ID.
exports.delete = async (req, res) => {
  const reviews = await db.reviews.findByPk(req.params.id);
  await reviews.destroy();

  res.json(reviews);
}

// Update a review's information by ID.
exports.update = async (req, res) => {
  const reviews = await db.reviews.findByPk(req.params.id);
  reviews.movie = req.body.movie;
  reviews.author_name = req.body.author_name;
  reviews.author_email = req.body.author_email;
  reviews.review_rating = req.body.review_rating;
  reviews.review_text = req.body.review_text;

  await reviews.save();

  res.json(reviews);
}